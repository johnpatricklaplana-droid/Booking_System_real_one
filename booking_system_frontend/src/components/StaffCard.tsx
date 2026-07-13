import { Star, BadgeCheck, Anchor } from "lucide-react";
import { useUser } from "../provider/UserContext";
import type { Staff } from "../interfaces/Types";

export function StaffCard({ 
    staff 
}: { 
    staff: Staff 
}) {
    const staffName = "Miguel Santos";
    const staffTitle = "Senior Boat Captain";
    const staffPhotoUrl = "";
    const rating = 4.9;
    const ratingCount = 214;
    const staffId = "DH-2091";
    const filledStars = Math.round(rating);
    const initials = staffName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((n) => n[0]?.toUpperCase())
        .join("");

    const business = useUser().activeBusiness;

    return (
        <div className="relative rounded-[22px] border border-[var(--border)] bg-gradient-to-b from-[var(--surface)] to-[#081f30] px-6 pb-7 pt-6 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.65),0_0_40px_-10px_rgba(232,200,120,0.12)] overflow-hidden">
            <div className="pointer-events-none absolute -top-[60%] -left-[20%] h-[220%] w-[60%] rotate-[18deg] bg-gradient-to-tr from-transparent via-white/[0.06] to-transparent" />

            <div className="absolute left-2.5 top-2.5 h-6.5 w-[26px] rounded-tl-[10px] border-t-2 border-l-2 border-[var(--gold-dim)]/70" />
            <div className="absolute right-2.5 top-2.5 h-6.5 w-[26px] rounded-tr-[10px] border-t-2 border-r-2 border-[var(--gold-dim)]/70" />
            <div className="absolute bottom-2.5 left-2.5 h-[26px] w-[26px] rounded-bl-[10px] border-b-2 border-l-2 border-[var(--gold-dim)]/70" />
            <div className="absolute bottom-2.5 right-2.5 h-[26px] w-[26px] rounded-br-[10px] border-b-2 border-r-2 border-[var(--gold-dim)]/70" />

            <div className="relative z-10 flex flex-col items-center gap-1.5">
                <div className="flex h-13 w-13 items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#fbf0cf,var(--gold)_45%,var(--gold-dim)_100%)] shadow-[0_0_0_3px_rgba(232,200,120,0.15),0_6px_16px_-4px_rgba(0,0,0,0.5)]">
                    {business?.businessLogoUrl ? (
                        <img
                            src={business?.businessLogoUrl}
                            alt={business?.businessName}
                            className="h-7 w-7 rounded-full object-cover"
                        />
                    ) : (
                        <Anchor className="h-6 w-6 text-[#062018]" strokeWidth={2} />
                    )}
                </div>
                <div className="mt-0.5 text-center font-[Baloo_2] text-[15px] font-bold uppercase tracking-[2.5px] text-[var(--gold)]">
                    {business?.businessName}
                </div>
                <div className="text-[10px] uppercase tracking-[3px] text-(--text-3)">
                    Staff Identification
                </div>
            </div>

            <div className="relative z-10 my-4 h-px w-full bg-linear-to-r from-transparent via-(--border) to-transparent" />

            <div className="relative z-10 mb-3.5 flex justify-center">
                <div className="h-32 w-32 rounded-full bg-[conic-gradient(from_180deg,#fbf0cf,var(--gold),var(--gold-dim),var(--gold),#fbf0cf)] p-[5px] shadow-[0_8px_24px_-6px_rgba(0,0,0,0.55)]">
                    <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full border-[3px] border-[var(--surface)] bg-gradient-to-br from-[#123449] to-[#0a2436]">
                        {staff.avatarUrl ? (
                            <img
                                src={staff.avatarUrl}
                                alt={staff.fullName}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <span className="font-[Baloo_2] text-[34px] font-bold text-(--gold)">
                                {initials}
                            </span>
                        )}
                    </div>
                </div>
                <div className="absolute -bottom-0.5 right-[calc(50%-64px-4px)] flex h-7.5 w-7.5 items-center justify-center rounded-full border-[3px] border-[var(--surface)] bg-[radial-gradient(circle_at_35%_30%,var(--teal),var(--teal-dim))]">
                    <BadgeCheck className="h-3.5 w-3.5 text-[#eafff9]" strokeWidth={2.5} />
                </div>
            </div>

            <div className="relative z-10 mb-2 text-center font-[Baloo_2] text-[22px] font-bold text-(--text-1)">
                {staff.fullName}
            </div>

            <div className="relative z-10 mx-auto mb-4 flex justify-center">
                <svg viewBox="0 0 220 34" className="block h-auto w-full">
                    <defs>
                        <linearGradient id="dhc-ribbon" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#fbf0cf" />
                            <stop offset="55%" stopColor="#e8c878" />
                            <stop offset="100%" stopColor="#8a6f3a" />
                        </linearGradient>
                    </defs>
                    <polygon points="0,8 14,17 0,26 10,17" fill="#8a6f3a" />
                    <polygon points="220,8 206,17 220,26 210,17" fill="#8a6f3a" />
                    <rect x="8" y="2" width="204" height="30" rx="4" fill="url(#dhc-ribbon)" />
                </svg>
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[11px] font-bold uppercase tracking-[2.5px] text-[#062018]">
                    {staff.title}
                </span>
            </div>

            <div className="relative z-10 mb-4 flex items-center justify-center gap-1.5">
                <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                            key={i}
                            className="h-[15px] w-[15px]"
                            fill="#e8c878"
                            stroke="none"
                            opacity={i < filledStars ? 1 : 0.35}
                        />
                    ))}
                </div>
                <span className="font-[Baloo_2] text-sm font-bold text-[var(--gold)]">
                    {rating.toFixed(1)}
                </span>
                <span className="text-[11px] text-[var(--text-3)]">
                    ({ratingCount} bookings)
                </span>
            </div>

            <div className="relative z-10 flex items-center justify-center gap-2.5">
                <svg width="34" height="18" viewBox="0 0 34 18" className="opacity-80">
                    <path
                        d="M17 17c-6 0-11-4-11-9 3 2 6 3 11 3s8-1 11-3c0 5-5 9-11 9z"
                        fill="#8a6f3a"
                    />
                </svg>
                <span className="whitespace-nowrap text-[10px] uppercase tracking-[2px] text-[var(--text-3)]">
                    ID &middot; {staffId}
                </span>
                <svg width="34" height="18" viewBox="0 0 34 18" className="opacity-80">
                    <path
                        d="M17 17c6 0 11-4 11-9-3 2-6 3-11 3s-8-1-11-3c0 5 5 9 11 9z"
                        fill="#8a6f3a"
                    />
                </svg>
            </div>
        </div>
    );
}