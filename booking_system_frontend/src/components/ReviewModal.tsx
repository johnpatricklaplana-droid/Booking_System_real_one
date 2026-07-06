import React, { useState } from "react";
import { Star, X } from "lucide-react";
import type { Appointment, CustomerAppointments, ServiceResponse } from "../interfaces/Types";
import { post } from "../api/api";
import { ErrorMessage } from "./BottomErrorMessage";

export default function ReviewModal({ 
    onClose, 
    service,
    schedId,
    setBooking
}: 
    { 
        onClose: any, 
        service: ServiceResponse | null,
        schedId: string,
        setBooking: any,
}) {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState("");
    const [ratingSuccess, setRatingSuccess] = useState<boolean>(false);

    const addReview = async () => {

        const url = "http://localhost:8080/api/review";

        const body = {
            rating: rating,
            comment: comment,
            scheduleId: schedId,
        };

        const result = await post(url, body);

        if(result.status === 201) {
            console.log("good one");
            setRatingSuccess(true);

            setBooking((prev: CustomerAppointments[]) => prev.map(p => {
                if(p.schedule.id !== body.scheduleId) return p;
                return {
                    ...p,
                    isAlreadyRatedByYou: true,
                    review: {
                        rating: rating,
                        comment: comment,
                        createdAt: String(Date.now())
                    }
                }
            }));

            setTimeout(() => {
                setRatingSuccess(false);
                onClose(false);
            }, 4000);
        } else {
            console.log("bad one");
        }

    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <button
                className="absolute inset-0 z-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-(--surface) p-6 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.6)]">
                <button
                    className="absolute right-4 top-4 rounded-lg p-1.5 text-neutral-500 transition-colors hover:bg-white/5 hover:text-neutral-200"
                    onClick={onClose}
                >
                    <X className="h-4 w-4" />
                </button>

                <h3 className="text-lg font-semibold text-white">Leave a Review</h3>
                <p className="mt-1 text-sm text-neutral-400">{service?.serviceName}</p>

                {/* Stars */}
                <div className="mt-6 flex items-center justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => {
                        const filled = star <= (hoverRating || rating);
                        return (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                className="p-1 transition-transform duration-150 hover:scale-110"
                            >
                                <Star
                                    className={`h-8 w-8 transition-colors duration-150 ${filled
                                            ? "fill-(--gold) text-(--gold)"
                                            : "fill-transparent text-neutral-600"
                                        }`}
                                />
                            </button>
                        );
                    })}
                </div>

                <p className="mt-2 text-center text-xs text-neutral-500">
                    {rating === 0
                        ? "Tap a star to rate"
                        : ["Poor", "Fair", "Good", "Very Good", "Excellent"][rating - 1]}
                </p>

                {/* Comment */}
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share details of your experience (optional)"
                    rows={4}
                    className="mt-5 w-full resize-none rounded-xl border border-white/10 bg-white/[0.02] p-3.5 text-sm text-neutral-200 placeholder:text-neutral-500 transition-colors duration-200 focus:border-(--gold)/50 focus:outline-none focus:ring-1 focus:ring-(--gold)/30"
                />

                {/* Actions */}
                <div className="mt-6 flex gap-3">
                    <button
                        className="flex-1 rounded-xl border border-white/15 bg-white/2 px-4 py-2.5 text-sm font-medium text-neutral-200 transition-all duration-200 hover:border-white/25 active:scale-[0.98]"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        disabled={rating === 0}
                        onClick={addReview}
                        className="flex-1 rounded-xl bg-(--gold) px-4 py-2.5 text-sm font-semibold text-black transition-all duration-200 hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:brightness-100"
                    >
                        Submit Review
                    </button>
                </div>
            </div>
            {ratingSuccess && <ErrorMessage success={true} message={"rated K"} head="successful one" />}
        </div>
    );
}