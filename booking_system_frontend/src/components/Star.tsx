import { Star } from "lucide-react";

function StarRating({
    rating,
    max = 5,
    size = "h-4 w-4",
}: Readonly<{
    rating: number;
    max?: number;
    size?: string;
}>) {
    return (
        <div className="flex items-center gap-0.5">
            {Array.from({ length: max }, (_, i) => {
                const filled = i < Math.floor(rating);
                const half = !filled && i < rating;
                return (
                    <div key={i} className="relative">
                        <Star
                            className={size}
                            stroke="var(--gold)"
                            strokeWidth={1.5}
                            fill={filled ? "var(--gold)" : "transparent"}
                        />
                        {half && (
                            <div className="absolute inset-0 overflow-hidden w-1/2">
                                <Star
                                    className={size}
                                    stroke="var(--gold)"
                                    strokeWidth={1.5}
                                    fill="var(--gold)"
                                />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default StarRating;