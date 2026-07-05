import React, { useEffect, useMemo, useState } from "react";
import {
    Calendar,
    Clock,
    MapPin,
    User,
    CheckCircle,
    XCircle,
    AlertCircle,
    ChevronRight,
    Search,
    Filter,
    ArrowUpDown,
    Navigation,
    QrCode,
    RotateCcw,
    MessageSquarePlus,
    CalendarX,
} from "lucide-react";
import { get } from "../api/api";
import type { CustomerAppointments, ServiceResponse } from "../interfaces/Types";
import { durationAsMinutes, isToday } from "../hooks/service";
import { formatDuration } from "../helper/convertSome";
import ReviewModal from "../components/ReviewModal";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type BookingStatus = "CONFIRMED" | "PENDING" | "COMPLETED" | "CANCELLED" | "MISSED";


/* ------------------------------------------------------------------ */
/*  Dummy data                                                         */
/* ------------------------------------------------------------------ */



/* ------------------------------------------------------------------ */
/*  Small UI atoms                                                     */
/* ------------------------------------------------------------------ */

const STATUS_META: Record<
    BookingStatus,
    { label: string; icon: React.ElementType; className: string }
> = {
    CONFIRMED: {
        label: "Upcoming",
        icon: Clock,
        className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
    },
    PENDING: {
        label: "Today",
        icon: AlertCircle,
        className: "bg-[var(--gold)]/15 text-[var(--gold)] border-[var(--gold)]/40",
    },
    COMPLETED: {
        label: "Completed",
        icon: CheckCircle,
        className: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    },
    CANCELLED: {
        label: "Cancelled",
        icon: XCircle,
        className: "bg-red-500/10 text-red-400/90 border-red-500/20",
    }, 
    MISSED: {
        label: "Missed",
        icon: XCircle,
        className: "bg-red-500/10 text-red-400/90 border-red-500/20",
    }
};

function StatusBadge({ status }: { status: BookingStatus }) {
    const meta = STATUS_META[status];
    const Icon = meta.icon;
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium tracking-wide ${meta.className}`}
        >
            <Icon className="h-3.5 w-3.5" />
            {meta.label}
        </span>
    );
}

function IconRow({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) {
    return (
        <div className="flex items-center gap-2 text-sm text-neutral-400">
            <Icon className="h-4 w-4 shrink-0 text-neutral-500" />
            <span className="truncate">{children}</span>
        </div>
    );
}

function OutlinedButton({
    children,
    className = "",
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={`inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.02] px-4 py-2.5 text-sm font-medium text-neutral-200 transition-all duration-200 hover:border-[var(--gold)]/50 hover:bg-[var(--gold)]/[0.06] hover:text-[var(--gold)] active:scale-[0.98] ${className}`}
        >
            {children}
        </button>
    );
}

function GoldButton({
    children,
    className = "",
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={`inline-flex items-center justify-center gap-2 rounded-xl bg-(--gold) px-4 py-2.5 text-sm font-semibold text-black transition-all duration-200 hover:shadow-[0_0_24px_-4px_var(--gold)] hover:brightness-110 active:scale-[0.98] ${className}`}
        >
            {children}
        </button>
    );
}

function GhostDangerButton({
    children,
    className = "",
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={`inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-transparent px-4 py-2.5 text-sm font-medium text-neutral-400 transition-all duration-200 hover:border-red-500/40 hover:text-red-400 active:scale-[0.98] ${className}`}
        >
            {children}
        </button>
    );
}

/* ------------------------------------------------------------------ */
/*  Today's Booking — boarding-pass style hero card                    */
/* ------------------------------------------------------------------ */

function TodayBookingCard({ booking }: { booking: CustomerAppointments }) {
    return (
        <section className="relative overflow-hidden rounded-2xl border border-(--gold)/25 bg-(--surface) shadow-[0_0_60px_-20px_rgba(212,175,55,0.25)]">
            <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1.4fr]">
                {/* Image side */}
                <div className="relative h-56 md:h-full">
                    <img
                        src={booking.service.serviceLogoUrl}
                        alt="fkljfklsaf"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent md:bg-linear-to-r" />
                    <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full border border-(--gold)/50 bg-black/60 px-3.5 py-1.5 text-xs font-bold tracking-[0.15em] text-(--gold) backdrop-blur-sm">
                        TODAY
                    </span>
                    <div className="absolute bottom-5 left-5 flex items-center gap-3 md:hidden">
                        <img
                            src={booking.business.businessLogoUrl}
                            alt=""
                            className="h-10 w-10 rounded-full border border-white/20 object-cover"
                        />
                        <div>
                            <p className="text-sm font-medium text-white">{booking.business.businessName}</p>
                        </div>
                    </div>
                </div>

                {/* Details side */}
                <div className="relative flex flex-col justify-between p-6 md:p-8">
                    <div>
                        <div className="hidden items-center gap-3 md:flex">
                            <img
                                src={booking.business.businessLogoUrl}
                                alt=""
                                className="h-9 w-9 rounded-full border border-white/15 object-cover"
                            />
                            <p className="text-sm font-medium text-neutral-300">{booking.business.businessName}</p>
                        </div>

                        <h3 className="mt-3 text-2xl font-semibold text-white md:text-[1.75rem]">
                            {booking.service.serviceName}
                        </h3>

                        <div className="mt-1.5 flex items-center gap-2 text-sm">
                            <span className="text-(--gold) font-medium">{new Date(booking.schedule.startsAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            <span className="text-neutral-600">·</span>
                            <span className="text-neutral-400">Starts TODO: countdown</span>
                        </div>

                        {/* Perforated divider, boarding-pass feel */}
                        <div className="relative my-6 h-px bg-white/10">
                            <div className="absolute -left-6 -top-2 h-4 w-4 rounded-full bg-(--bg) md:-left-8" />
                            <div className="absolute -right-6 -top-2 h-4 w-4 rounded-full bg-(--bg) md:-right-8" />
                        </div>

                        <div className="grid grid-cols-2 gap-x-4 gap-y-3.5">
                            <IconRow icon={MapPin}>{booking.business.address.displayName}</IconRow>
                            <IconRow icon={User}>{booking.staff.fullName}</IconRow>
                            <IconRow icon={Clock}>{formatDuration(Number(durationAsMinutes(booking.service.duration)))}</IconRow>
                            <IconRow icon={QrCode}>IDK: confirmationCode</IconRow>
                        </div>
                    </div>

                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                        <GoldButton className="flex-1">
                            <CheckCircle className="h-4 w-4" />
                            Check In
                        </GoldButton>
                        <OutlinedButton className="flex-1">
                            <Navigation className="h-4 w-4" />
                            Get Directions
                        </OutlinedButton>
                        <OutlinedButton className="flex-1">
                            View Booking
                            <ChevronRight className="h-4 w-4" />
                        </OutlinedButton>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/*  Booking card — single reusable design for Upcoming + History       */
/* ------------------------------------------------------------------ */

/** Border tint shifts subtly by status; structure never changes. */
const CARD_ACCENT: Record<BookingStatus, string> = {
    CONFIRMED: "border-white/10 hover:border-white/20",
    PENDING: "border-white/10 hover:border-white/20",
    COMPLETED: "border-emerald-500/15 hover:border-emerald-500/30",
    CANCELLED: "border-red-500/10 hover:border-red-500/25",
    MISSED: "border-red-500/10 hover:border-red-500/25"
};

function BookingCard({ 
    booking, 
    setOpenReview, 
    setServiceToReview, 
    service,
    schedId,
    setSchedId,
}: { 
    booking: CustomerAppointments, 
    setOpenReview: any,
    setServiceToReview: any,
    service: ServiceResponse | null,
    schedId: string;
    setSchedId: any;
}) {
    return (
        <article
            className={`group flex flex-col overflow-hidden rounded-2xl border bg-(--surface) transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-16px_rgba(0,0,0,0.6)] sm:flex-row sm:items-stretch ${CARD_ACCENT[booking.schedule.status]}`}
        >
            {/* Image */}
            <div className="h-40 w-full shrink-0 overflow-hidden sm:h-auto sm:w-36">
                <img
                    src={booking.service.serviceLogoUrl}
                    alt={booking.service.serviceName}
                    className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                />
            </div>

            {/* Core info */}
            <div className="flex flex-1 flex-col justify-center gap-1.5 p-4 sm:p-5">
                <h3 className="text-base font-semibold text-white sm:text-lg">{booking.service.serviceName}</h3>
                <p className="text-sm text-neutral-400">{booking.business.businessName}</p>
                <div className="mt-1.5 flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-4">
                    <IconRow icon={Calendar}>
                        {new Date(booking.schedule.startsAt).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit' })} · {new Date(booking.schedule.startsAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </IconRow>
                    <IconRow icon={MapPin}>{booking.business.address.displayName}</IconRow>
                </div>
            </div>

            {/* Status, price & actions */}
            <div className="flex shrink-0 flex-col justify-center gap-3 border-t border-white/10 p-4 sm:w-52 sm:border-l sm:border-t-0 sm:p-5">
                <div className="flex items-center justify-between sm:flex-col sm:items-end sm:gap-2">
                    <StatusBadge status={booking.schedule.status} />
                    <span className="text-lg font-semibold text-white">₱{booking.service.price}</span>
                </div>
                <OutlinedButton className="w-full">
                    View Booking
                    <ChevronRight className="h-4 w-4" />
                </OutlinedButton>
                {booking.schedule.status === "CONFIRMED" && 
                    <div className="flex gap-2">
                        <OutlinedButton className="flex-1 px-3! text-xs">Reschedule</OutlinedButton>
                        <GhostDangerButton className="flex-1 px-3! text-xs">Cancel</GhostDangerButton>
                    </div>
                }
                {booking.schedule.status === "COMPLETED" && 
                    <div className="flex gap-2">
                        <OutlinedButton className="flex-1 px-3! text-xs">
                            <RotateCcw className="h-3.5 w-3.5" />
                            Book Again
                        </OutlinedButton>
                        <OutlinedButton
                            className="flex-1 px-3! text-xs"
                            onClick={() => {
                                    setOpenReview(true)
                                    setServiceToReview(service)
                                    setSchedId(schedId)
                                }
                            }
                        >
                            <MessageSquarePlus className="h-3.5 w-3.5" />
                            Review
                        </OutlinedButton>
                    </div>
                }
                {booking.schedule.status === "CANCELLED" && 
                    <OutlinedButton className="w-full px-3! text-xs">
                        <RotateCcw className="h-3.5 w-3.5" />
                        Book Again
                    </OutlinedButton>
                }
            </div>
        </article>
    );
}

/* ------------------------------------------------------------------ */
/*  Skeleton loaders                                                    */
/* ------------------------------------------------------------------ */

function Shimmer({ className = "" }: Readonly<{ className?: string }>) {
    return (
        <div
            className={`relative overflow-hidden rounded-lg bg-white/5 ${className}`}
        >
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-linear-to-r from-transparent via-white/6 to-transparent" />
        </div>
    );
}

function SkeletonBookingCard() {
    return (
        <div className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-(--surface) sm:flex-row">
            <Shimmer className="h-40 w-full rounded-none sm:h-auto sm:w-36" />
            <div className="flex-1 space-y-3 p-5">
                <Shimmer className="h-5 w-2/3" />
                <Shimmer className="h-4 w-1/3" />
                <Shimmer className="h-4 w-1/2" />
            </div>
            <div className="w-full space-y-3 border-t border-white/10 p-5 sm:w-52 sm:border-l sm:border-t-0">
                <Shimmer className="h-6 w-20" />
                <Shimmer className="h-9 w-full" />
                <Shimmer className="h-9 w-full" />
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Empty state                                                        */
/* ------------------------------------------------------------------ */

function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[var(--surface)] px-6 py-20 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-[var(--gold)]/25 bg-[var(--gold)]/[0.06]">
                <CalendarX className="h-9 w-9 text-(--gold)" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-semibold text-white">No bookings yet</h3>
            <p className="mt-2 max-w-sm text-sm text-neutral-400">
                Discover premium local services and reserve your first appointment.
            </p>
            <GoldButton className="mt-7 px-6">
                Explore Services
                <ChevronRight className="h-4 w-4" />
            </GoldButton>
        </div>
    );
}


const TABS: { key: "all" | BookingStatus; label: string }[] = [
    { key: "all", label: "All" },
    { key: "CONFIRMED", label: "Upcoming" },
    { key: "COMPLETED", label: "Completed" },
    { key: "CANCELLED", label: "Cancelled" },
];

function StatusTabs({
    active,
    onChange,
}: {
    active: string;
    onChange: (key: string) => void;
}) {
    return (
        <div className="flex flex-wrap gap-2">
            {TABS.map((tab) => {
                const isActive = active === tab.key;
                return (
                    <button
                        key={tab.key}
                        onClick={() => onChange(tab.key)}
                        className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${isActive
                                ? "border-(--gold)/60 bg-(--gold)/12 text-white shadow-[0_0_16px_-6px_var(--gold)]"
                                : "border-white/10 bg-(--surface) text-neutral-400 hover:border-white/25 hover:text-neutral-200"
                            }`}
                    >
                        {tab.label}
                    </button>
                );
            })}
        </div>
    );
}

function SearchAndFilters() {
    return (
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                <input
                    type="text"
                    placeholder="Search bookings..."
                    className="w-full rounded-xl border border-white/10 bg-(--surface) py-2.5 pl-10 pr-4 text-sm text-neutral-200 placeholder:text-neutral-500 transition-all duration-200 focus:border-(--gold)/50 focus:outline-none focus:ring-1 focus:ring-[var(--gold)]/30"
                />
            </div>

            <div className="flex gap-3">
                <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-(--surface) px-4 py-2.5 text-sm text-neutral-300 transition-all duration-200 hover:border-white/25 lg:w-44">
                    <Calendar className="h-4 w-4 text-neutral-500" />
                    Date
                </button>

                <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-(--surface) px-4 py-2.5 text-sm text-neutral-300 transition-all duration-200 hover:border-white/25 lg:w-44">
                    <Filter className="h-4 w-4 text-neutral-500" />
                    Category
                </button>

                <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-[var(--surface)] px-4 py-2.5 text-sm text-neutral-300 transition-all duration-200 hover:border-white/25 lg:w-52">
                    <ArrowUpDown className="h-4 w-4 text-neutral-500" />
                    Newest first
                </button>
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Main page                                                          */
/* ------------------------------------------------------------------ */

export default function MyBookingsPage() {
    const [activeTab, setActiveTab] = useState<string>("all");
    const [isLoading] = useState(false);
    const [appointments, setAppointments] = useState<CustomerAppointments[] | null>(null);
    const [openReview, setOpenReview] = useState<boolean>(false);
    const [serviceToReview, setServiceToReview] = useState<ServiceResponse | null>(null);
    const [schedIdToReview, setSchedIdToReview] = useState<string>("");

    useEffect(() => {
        
        const getIt = async () => {
            const url = "http://localhost:8080/api/schedule";

            const result: CustomerAppointments[] = await get(url);

            setAppointments(result);

        };

        getIt();

    }, []);

    const upcomingBooking = useMemo(() => {

        if (!appointments) return [];

        return appointments.filter(apt => apt.schedule.status === "CONFIRMED") ?? [];

    }, [appointments]);

    const filteredHistory = useMemo(() => {

        if(!appointments) return [];

        return appointments.filter((apt) => apt.schedule.status === "COMPLETED") ?? [];
    }, [appointments]);

    const todayBooking = useMemo(() => {
        if(!appointments) return [];

        return appointments.filter(apt => isToday(new Date(apt.schedule.startsAt), apt.business.timezone));
        
    }, [appointments]);

    const hasAnyBookings =
        todayBooking.length > 0 || upcomingBooking.length > 0 || filteredHistory.length > 0;

    console.log(serviceToReview);

    const showToday: boolean = (activeTab === "all" || activeTab === "today") && todayBooking.length > 0;

    return (
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <style>{`
        @keyframes shimmer { 100% { transform: translateX(100%); } }
      `}</style>

            {openReview && <ReviewModal schedId={schedIdToReview}  service={serviceToReview} onClose={() => setOpenReview(false)} />}

            {/* Header */}
            <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-3xl font-semibold text-white sm:text-4xl">My Bookings</h1>
                    <p className="mt-2 text-[0.95rem] text-neutral-400">
                        Manage your upcoming appointments and review your previous bookings.
                    </p>
                </div>
                <OutlinedButton className="w-full sm:w-auto">
                    Explore Services
                    <ChevronRight className="h-4 w-4" />
                </OutlinedButton>
            </div>

            {/* Tabs */}
            <div className="mt-8">
                <StatusTabs active={activeTab} onChange={setActiveTab} />
            </div>

            {/* Search & filters */}
            <div className="mt-5">
                <SearchAndFilters />
            </div>

            {isLoading ? (
                <div className="mt-10 space-y-6">
                    <SkeletonBookingCard />
                    <SkeletonBookingCard />
                </div>
            ) : !hasAnyBookings ? (
                <div className="mt-10">
                    <EmptyState />
                </div>
            ) : (
                <>
                    {/* Today's booking */}
                    {showToday && (
                        <div className="mt-10 space-y-4">
                            {todayBooking.map(tod => 
                                <TodayBookingCard key={tod.schedule.id} booking={tod} />
                            )}
                        </div>
                    )}

                    {/* Upcoming */}
                    {upcomingBooking.length > 0 && (
                        <div className="mt-12">
                            <h2 className="text-xl font-semibold text-white">Upcoming Bookings</h2>
                            <div className="mt-5 space-y-4">
                                {upcomingBooking.map((ub) => (
                                    <BookingCard schedId="" setSchedId={null} service={null} setServiceToReview={null} key={ub.schedule.id} setOpenReview={() => setOpenReview(true)} booking={ub} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* History */}
                    {filteredHistory.length > 0 && (
                        <div className="mt-12">
                            <h2 className="text-xl font-semibold text-white">Booking History</h2>
                            <div className="mt-5 space-y-4">
                                {filteredHistory.map((b) => (
                                    <BookingCard schedId={b.schedule.id} setSchedId={() => setSchedIdToReview(b.schedule.id)} service={b.service} setServiceToReview={() => setServiceToReview(b.service)} setOpenReview={() => setOpenReview(true)} key={b.schedule.id} booking={b} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Nothing matches current tab */}
                    {!showToday && upcomingBooking.length === 0 && filteredHistory.length === 0 && (
                        <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[var(--surface)] px-6 py-16 text-center">
                            <AlertCircle className="mb-4 h-8 w-8 text-neutral-600" />
                            <p className="text-neutral-400">No bookings match this filter.</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}