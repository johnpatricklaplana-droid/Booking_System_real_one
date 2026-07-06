import { useEffect, useRef, useState } from "react";
import { BookingDatePicker } from "../components/DatePicker";
import type { Business, Review, ReviewWithUser, ServiceResponse, Staff, Time } from "../interfaces/Types";
import { useParams } from "react-router-dom";
import { get, post } from "../api/api";
import { buildBookingPayloadTime, TimezoneLabel } from "../helper/convertSome";
import { getAverageRating } from "../hooks/service";

function BookingResultModal ({ 
    serviceDetails, 
    selectedStaff, 
    selectedTime, 
    selectedDate 
}: 
    { 
        serviceDetails: ServiceResponse | null, 
        selectedStaff: string, 
        selectedTime: Time | null, 
        selectedDate: Date 
    }) {
    return (
        <div className="bg-(--surface) w-[90%] top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] z-50 lg:w-[500px] fixed border border-(--teal)/30 rounded-xl p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-(--teal-dim) flex items-center justify-center mx-auto mb-4">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-(--teal)">
                    <path d="M20 6L9 17l-5-5" />
                </svg>
            </div>
            <div className="text-(--text-1) text-[1.125rem] font-semibold mb-1.5">You're all set</div>
            <p className="text-(--text-2) text-sm mb-1">{serviceDetails?.serviceName} with {selectedStaff}</p>
            <p className="text-(--text-3) text-[0.8125rem] mb-6">
                {selectedDate?.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} · {selectedTime?.label}
            </p>
            <button
                className="text-(--gold) text-sm font-medium hover:underline"
            >
                View my bookings →
            </button>
        </div> 
    );
}

export function ServiceDetails() {

    const [serviceDetails, setServiceDetails] = useState<ServiceResponse | null>(null);
    const [business, setBusiness] = useState<Business | null>(null);
    const [staff, setStaff] = useState<Staff[] | null>(null);
    const [rating, setRating] = useState<ReviewWithUser[] | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date>((new Date()));
    const [selectedTime, setSelectedTime] = useState<Time | null>(null);
    const [selectedStaff, setSelectedStaff] = useState<string>("");
    const [missingFields, setMissingFields] = useState<"time" | "staff" | null>(null);
    const [bookingResult, setBookingResult] = useState<{ success: boolean, message: string } | null>(null);

    const timeFieldRef = useRef<HTMLButtonElement>(null);
    const staffFieldRef = useRef<HTMLButtonElement>(null);
    
    const { serviceId } = useParams();

    const availableTime :Time[] = [
        { value: "09:00", label: "9:00 AM" },
        { value: "10:00", label: "10:00 AM" },
        { value: "11:00", label: "11:00 AM" },
        { value: "12:00", label: "12:00 AM" },
        { value: "13:00", label: "1:00 PM" },
        { value: "14:00", label: "2:00 PM" },
        { value: "15:00", label: "3:00 PM" },
        { value: "16:00", label: "4:00 PM" },
        { value: "17:00", label: "5:00 PM" },
    ]

    useEffect(() => {

        if(!serviceId) return;

        const getIt = async () => {
            const url = `http://localhost:8080/api/services/${serviceId}`;

            const result: any = await get(url);

            setBusiness(result.business);
            setStaff(result.staff);
            setServiceDetails(result.services);
        };
        
        getIt();

    }, [serviceId]);

    useEffect(() => {
        
        if(!serviceId) return;

        const url = `http://localhost:8080/api/review/services/${serviceId}`;

        const getIt = async () => {
            const result: ReviewWithUser[] = await get(url);

            setRating(result);

        };

        getIt();

    }, [serviceId]);

    const book = async () => {

        if(!selectedTime) {
            timeFieldRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
            setMissingFields("time");
            return;
        };

        if(!selectedStaff) {
            staffFieldRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
            setMissingFields("staff");
            return;
        }

        // TODO
        if(!selectedDate) return;

        const datetimeWithTimeZone = buildBookingPayloadTime(selectedDate, selectedTime?.value, business?.timezone ?? "");

        const body = {
            startsAt: datetimeWithTimeZone,
            staffId: selectedStaff,
            serviceId: serviceId
        }
        const url = "http://localhost:8080/api/schedule";

        try {
            const result = await post(url, body);

            if (result.status === 201) {
                console.log("good one");
                setBookingResult({ success: true, message: "super success" });
            }
        } catch (error) {
            console.log(error);
            setBookingResult({ success: false, message: "something went super wrong try again later" });
        }

        setTimeout(() => {
            setBookingResult(null);
        }, 2000);

    };

    return (
        <div className="min-h-screen">
            <div className="h-85 flex items-center justify-center text-[6rem] relative overflow-hidden border-b border-(--border) bg-[linear-gradient(135deg,#140e20,#1e1530,#0f1e1c)]">
                <img className="rounded-[50%] w-40 h-40" src={business?.businessLogoUrl} alt="" />
            </div>  

            {bookingResult && <BookingResultModal selectedTime={selectedTime} selectedDate={selectedDate} serviceDetails={serviceDetails} selectedStaff={selectedStaff} />}

            <div className="min-h-screen pb-20 max-w-280 mx-auto">
                <div className="grid grid-cols-[1fr_340px] gap-12 pt-12 px-0 items-start">
                    <div>
                        <div className="inline-flex items-center gap-1.5 text-[0.875rem] text-(--text-3) hover:text-(--text-2) mb-7 cursor-pointer transition-colors duration-200">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2">
                                <path d="M19 12H5M12 5l-7 7 7 7" />
                            </svg>
                            Back to results
                        </div>
                        <div className="text-[2rem] font-bold tracking-[0.3em] text-(--text-1) mb-2.5">{serviceDetails?.serviceName}</div>
                        <div className="flex items-center gap-3.5 mb-6">
                            <div className="flex items-center gap-1.25">
                                <div className="flex gap-0.5"><span className="star">★</span><span className="star">★</span><span
                                    className="star">★</span><span className="star">★</span><span className="star">★</span></div>
                                <span className="text-[0.8125rem] text-(--text-2) font-semibold">{rating ? getAverageRating(rating?.map(r => r.review.rating)) : 'no rating'}</span>
                                <span className="text-[0.75rem] text-(--text-3)">({rating?.length})</span>
                            </div>
                            <span className="inline-flex items-center gap-1 text-[0.75rem] font-bold py-0.75 px-2.25 rounded-[100px] tracking-widest bg-(--teal-dim) text-(--teal)">Open now</span>
                            <span className="text-[0.8125rem] text-(--text-3)">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    strokeWidth="2" className="inline mr-1">
                                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0Z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                                {business?.address.displayName}
                            </span>
                        </div>
                        <p className="text-[1rem] text-(--text-2) leading-[1.7] mb-10 max-w-140">
                            {serviceDetails?.description}
                        </p>
                        <p className="text-[0.75rem] font-semibold uppercase leading-[0.8em] text-(--text-3) mb-3.5">Pick a date</p>
                        <BookingDatePicker selectDate={setSelectedDate} />
                        <p className="text-[0.75rem] mt-8 font-semibold uppercase tracking-[0.8em] text-(--text-3) mb-3.5">Available times</p>
                        {missingFields === "time" && <p className="text-[0.8125rem] text-center text-red-600 mb-2 animate-bounce">
                            Please select a time to continue
                        </p>}
                        <div className="grid grid-cols-3 gap-2 mb-8">
                            {/* DESIGN IF BOOKED : 
                                opacity: 0.35;
                                cursor: not-allowed;
                                text-decoration: line-through; 
                            */}
                            {availableTime.map(time => {
                                const selectedOne = time.value === selectedTime?.value;
                                return <button
                                    ref={timeFieldRef}
                                    className={`hover:border-(--gold) ${missingFields === "time" ? 'ring-1 ring-red-600 ring-offset-2 ring-offset-(--bg)' : ""} ${selectedOne ? 'border-(--gold-light) text-(--gold) bg-(--gold-dim)' : 'border-(--border) bg-(--surface-2) text-(--text-2)'} text-center text-[0.8125rem] font-medium cursor-pointer transition-all duration-150 border rounded-sm py-2.25 px-1.5`}
                                    key={time.value}
                                    onClick={() => {
                                        setSelectedTime(time);
                                        if(missingFields === "time") {
                                            setMissingFields(null);
                                        }
                                    }}
                                >{time.label}</button> 
                            })}
                        </div>  
                        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.8em] text-(--text-3) mb-3.5 mt-10">Select Staff</p>
                        {missingFields === "staff" && <p className="text-[0.8125rem] text-center text-red-600 mb-2 animate-bounce">
                            Please select a staff to continue
                        </p>}
                        <div className="mb-8 grid grid-cols-3 gap-4">
                            {staff?.map(s => 
                                <button
                                    key={s.id}
                                    ref={staffFieldRef}
                                    className={`flex gap-2 ${missingFields === "staff" ? 'ring-1 ring-red-600 ring-offset-2 ring-offset-(--bg)' : ""} ${selectedStaff === s.id ? 'bg-(--gold-dim) border-(--gold-light)' : 'bg-(--surface-2)'} rounded-sm hover:border-(--gold-light) border border-(--border) cursor-pointer py-2 px-4`}
                                    onClick={() => {
                                        setSelectedStaff(s.id);
                                        setMissingFields(null);
                                    }}
                                >
                                    <img className="w-9 h-9 rounded-[50%]" src={`http://localhost:8080/api/staff/${s.avatarUrl}`} alt="" />
                                    <div>
                                        <h1 className="text-(--text-1) text-sm">{s.fullName}</h1>
                                        <p className="text-(--text-2) text-xs">{s.title}</p>
                                    </div>
                                </button>
                            )}
                        </div>
                        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.8em] text-(--text-3) mb-3.5 mt-10">What clients say</p>
                        <div className="flex flex-col mb-8 gap-5">
                            {rating?.map((r) => 
                                <div 
                                    className="pb-5 border-b border-b-(--border)"
                                    key={r.review.comment}
                                >
                                    <div className="gap-2.5 mb-2.5 flex items-center">
                                        <img className="w-9 h-9 rounded-[50%] border border-(--border)" src={r.user.avatarUrl} alt="" />
                                        <div>
                                            <div className="text-[0.9rem] text-(--text-1) font-semibold">{r.user.firstName} {r.user.lastName}</div>
                                            <div className="text-[0.75rem] mt-0.5 text-(--text-3)">{r.review.createdAt}</div>
                                        </div>
                                        <div className="flex gap-0.5 ml-auto"><span className="star">★</span><span
                                            className="star">★</span><span className="star">★</span><span className="star">★</span><span
                                                className="star">★</span></div>
                                    </div>
                                    <p className="text-[0.875rem] text-(--text-2) tracking-wide">{r.review.comment}</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="sticky top-[25%]">
                        <div className="bg-(--surface) border border-(--border) rounded-xl p-7 sticky top-21">
                            <div className="text-[1rem] text-(--text-1) font-semibold mb-5">Reserve your spot</div>
                            <div className="bg-(--surface-2) border border-(--border) rounded-(--radius) py-3.5 px-4 mb-4">
                                <div className="text-[0.75rem] text-(--text-3) mb-0.5">Service</div>
                                <div className="text-[0.9375rem] text-(--text-1) font-semibold" id="sidebarService">{serviceDetails?.serviceName}</div>
                            </div>
                            <div className="sidebar-selection">
                                <div className="text-[0.75rem] text-(--text-3) mb-0.5">Date & time</div>
                                <div className="text-[0.9375rem] text-(--text-2) font-semibold">
                                    <span className="text-(--text-1)">{selectedDate?.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })} </span>
                                    · 
                                    <span className="text-(--gold)"> {selectedTime?.label}</span>
                                    <span className="text-[0.75rem] ml-1.5 font-normal">{business?.timezone ? TimezoneLabel(business.timezone) : "enter some"}</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center py-4 px-0 border-t border-t-(--border) mb-5">
                                <div className="text-[0.875rem] text-(--text-2)">Total</div>
                                <div className="text-[1.375rem] text-(--teal) font-bold">₱{serviceDetails?.price.toLocaleString()}</div>
                            </div>
                            <button 
                                className="btn btn-primary btn-lg w-full"
                                onClick={book}
                            >
                                Book now
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2.5">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </button>
                            <p className="text-[0.75rem] text-(--text-3) text-center mt-3">Free
                                cancellation up to 2 hours before</p>
                        </div>
                    </div>
                </div>
                <p className="text-[0.75rem] font-semibold uppercase tracking-[0.8em] text-(--text-3) mb-4">Services From Lumiere studio</p>
                <div className="flex mb-16 overflow-x-auto px-4 gap-6">
                    {/* {featuredServices.map(service =>
                        <div 
                            key={service.id}
                            className="shrink-0 w-[32%]"
                        >
                            <ServiceBox services={service} />
                        </div>
                    )} */}
                </div>
                <p className="text-[0.75rem] font-semibold uppercase tracking-[0.8em] text-(--text-3) mb-4">Related Services</p>
                <div className="grid grid-cols-3 gap-6">
                    {/* {featuredServices.map(service =>
                        <ServiceBox key={service.id} services={service} />
                    )} */}
                </div>
            </div>
        </div>
    );
}