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
    Navigation,
    QrCode,
    RotateCcw,
    MessageSquarePlus,
    CalendarX,
    ShieldCheck,
    CalendarClock,
    AlertTriangle,
    Ban,
    MessageSquareWarning,
    X,
} from "lucide-react";
import { get, update } from "../api/api";
import type { CustomerAppointments, ServiceResponse } from "../interfaces/Types";
import { durationAsMinutes, isToday } from "../hooks/service";
import { formatDuration } from "../helper/convertSome";
import ReviewModal from "../components/ReviewModal";
import StarRating from "../components/Star";
import { useNavigate } from "react-router-dom";
import { SpinnerLoading } from "../components/SpinnerLoading";

type BookingStatus = "CONFIRMED" | "PENDING" | "COMPLETED" | "CANCELLED" | "MISSED";

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
        label: "Pending",
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
    },
};

const CARD_ACCENT: Record<BookingStatus, string> = {
    CONFIRMED: "border-white/10 hover:border-white/20",
    PENDING: "border-white/10 hover:border-white/20",
    COMPLETED: "border-emerald-500/15 hover:border-emerald-500/30",
    CANCELLED: "border-red-500/10 hover:border-red-500/25",
    MISSED: "border-red-500/10 hover:border-red-500/25",
};

function StatusBadge({ status }: Readonly<{ status: BookingStatus }>) {
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

function IconRow({ icon: Icon, children }: Readonly<{ icon: React.ElementType; children: React.ReactNode }>) {
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
}: Readonly<React.ButtonHTMLAttributes<HTMLButtonElement>>) {
    return (
        <button
            {...props}
            className={`inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/2 px-4 py-2.5 text-sm font-medium text-neutral-200 transition-all duration-200 hover:border-(--gold)/50 hover:bg-(--gold)/6 hover:text-(--gold) active:scale-[0.98] ${className}`}
        >
            {children}
        </button>
    );
}

function GoldButton({
    children,
    className = "",
    ...props
}: Readonly<React.ButtonHTMLAttributes<HTMLButtonElement>>) {
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
}: Readonly<React.ButtonHTMLAttributes<HTMLButtonElement>>) {
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

function TodayBookingCard({ booking }: Readonly<{ booking: CustomerAppointments }>) {
    return (
        <section className="relative overflow-hidden rounded-2xl border border-(--gold)/25 bg-(--surface) shadow-[0_0_60px_-20px_rgba(212,175,55,0.25)]">
            <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1.4fr]">
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
                            <span className="text-(--gold) font-medium">
                                {new Date(booking.schedule.startsAt).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </span>
                            <span className="text-neutral-600">·</span>
                            <span className="text-neutral-400">Starts TODO: countdown</span>
                        </div>

                        <div className="relative my-6 h-px bg-white/10">
                            <div className="absolute -left-6 -top-2 h-4 w-4 rounded-full bg-(--bg) md:-left-8" />
                            <div className="absolute -right-6 -top-2 h-4 w-4 rounded-full bg-(--bg) md:-right-8" />
                        </div>

                        <div className="grid grid-cols-2 gap-x-4 gap-y-3.5">
                            <IconRow icon={MapPin}>{booking.business.address.displayName}</IconRow>
                            <IconRow icon={User}>{booking.staff.fullName}</IconRow>
                            <IconRow icon={Clock}>
                                {formatDuration(Number(durationAsMinutes(booking.service.duration)))}
                            </IconRow>
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
/*  Shared card shell — image + core info + status/price. Each status  */
/*  component below supplies its own action area, nothing else        */
/*  branches on status inside a single mega-function anymore.          */
/* ------------------------------------------------------------------ */

function BookingCardShell({
    booking,
    actions,
}: Readonly<{ booking: CustomerAppointments; actions: React.ReactNode }>) {
    return (
        <article
            className={`group flex flex-col overflow-hidden rounded-2xl border bg-(--surface) transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-16px_rgba(0,0,0,0.6)] sm:flex-row sm:items-stretch ${CARD_ACCENT[booking.schedule.status]
                }`}
        >
            <div className="h-40 w-full shrink-0 overflow-hidden sm:h-auto sm:w-36">
                <img
                    src={booking.service.serviceLogoUrl}
                    alt={booking.service.serviceName}
                    className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                />
            </div>

            <div className="flex flex-1 flex-col justify-center gap-1.5 p-4 sm:p-5">
                <h3 className="text-base font-semibold text-white sm:text-lg">{booking.service.serviceName}</h3>
                <p className="text-sm text-neutral-400">{booking.business.businessName}</p>
                <div className="mt-1.5 flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-4">
                    <IconRow icon={Calendar}>
                        {new Date(booking.schedule.startsAt).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "2-digit",
                        })}{" "}
                        · {new Date(booking.schedule.startsAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </IconRow>
                    <IconRow icon={MapPin}>{booking.business.address.displayName}</IconRow>
                </div>
            </div>

            <div className="flex shrink-0 flex-col justify-center gap-3 border-t border-white/10 p-4 sm:w-75 sm:border-l sm:border-t-0 sm:p-5">
                <div className="flex items-center justify-between sm:flex-col sm:items-end sm:gap-2">
                    <StatusBadge status={booking.schedule.status} />
                    <span className="text-lg font-semibold text-white">₱{booking.service.price}</span>
                </div>
                <OutlinedButton className="w-full">
                    View Booking
                    <ChevronRight className="h-4 w-4" />
                </OutlinedButton>
                {actions}
            </div>
        </article>
    );
}

/* ------------------------------------------------------------------ */
/*  CONFIRMED — reschedule / cancel, owns its own cancel-modal state   */
/* ------------------------------------------------------------------ */

function ConfirmedBookingCard({ booking, setAppointments }: 
    Readonly<{
        booking: CustomerAppointments;
        setAppointments: any;
    }>) 
{

    const [showCancel, setShowCancel] = useState<boolean>(false);

    return (
        <>
            <BookingCardShell
                booking={booking}
                actions={
                    <div className="flex gap-2">
                        <OutlinedButton className="flex-1 px-3! text-xs">Reschedule</OutlinedButton>
                        <GhostDangerButton
                            className="flex-1 px-3! text-xs"
                            onClick={() => setShowCancel(true)}
                        >
                            Cancel
                        </GhostDangerButton>
                    </div>
                }
            />
            {showCancel && <CancelBookingModal setAppointments={setAppointments} onClose={() => setShowCancel(false)} appointment={booking} />}
        </>
    );
}

/* ------------------------------------------------------------------ */
/*  PENDING — awaiting business confirmation, nothing to action yet    */
/* ------------------------------------------------------------------ */

function PendingBookingCard({ booking }: Readonly<{ booking: CustomerAppointments }>) {
    return <BookingCardShell booking={booking} actions={null} />;
}


function CompletedBookingCard({
    booking,
    onOpenReview,
}: Readonly<{
    booking: CustomerAppointments;
    onOpenReview: (service: ServiceResponse, schedId: string) => void;
}>) {
    const navigate = useNavigate();

    return (
        <BookingCardShell
            booking={booking}
            actions={
                <div className="flex gap-2">
                    <OutlinedButton
                        className="flex-1 px-3! text-xs"
                        onClick={() => navigate(`/customer/service/${booking.service.id}`)}
                    >
                        <RotateCcw className="h-3.5 w-3.5" />
                        Book Again
                    </OutlinedButton>
                    {booking.isAlreadyRatedByYou ? (
                        <StarRating rating={booking.review.rating} />
                    ) : (
                        <OutlinedButton
                            className="flex-1 px-3! text-xs"
                            onClick={() => onOpenReview(booking.service, booking.schedule.id)}
                        >
                            <MessageSquarePlus className="h-3.5 w-3.5" />
                            Review
                        </OutlinedButton>
                    )}
                </div>
            }
        />
    );
}

/* ------------------------------------------------------------------ */
/*  CANCELLED — just book again                                        */
/* ------------------------------------------------------------------ */

// function CancelledBookingCard({ booking }: Readonly<{ booking: CustomerAppointments }>) {
//     const navigate = useNavigate();

//     return (
//         <BookingCardShell
//             booking={booking}
//             actions={
//                 <OutlinedButton
//                     className="w-full px-3! text-xs"
//                     onClick={() => navigate(`/customer/service/${booking.service.id}`)}
//                 >
//                     <RotateCcw className="h-3.5 w-3.5" />
//                     Book Again
//                 </OutlinedButton>
//             }
//         />
//     );
// }

/* ------------------------------------------------------------------ */
/*  MISSED — no special action, just the shell                         */
/* ------------------------------------------------------------------ */

function MissedBookingCard({ booking }: Readonly<{ booking: CustomerAppointments }>) {
    return <BookingCardShell booking={booking} actions={null} />;
}

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

export default function MyBookingsPage() {
    const [appointments, setAppointments] = useState<CustomerAppointments[] | null>(null);
    const [openReview, setOpenReview] = useState<boolean>(false);
    const [serviceToReview, setServiceToReview] = useState<ServiceResponse | null>(null);
    const [schedIdToReview, setSchedIdToReview] = useState<string>("");
    const [filters] = useState<['all', 'today', 'completed', 'missed', 'upcoming', 'cancelled', 'pending']>(['all', 'today', 'completed', 'missed', 'upcoming', 'cancelled', 'pending']);
    const [filter, setFilter] = useState<'all' | 'today' | 'completed' | 'upcoming' | 'cancelled' | 'pending' | 'missed'>('all');

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
        return appointments.filter((apt) => apt.schedule.status === "CONFIRMED") ?? [];
    }, [appointments]);

    const filteredHistory = useMemo(() => {
        if (!appointments) return [];
        return appointments.filter((apt) => apt.schedule.status === "COMPLETED") ?? [];
    }, [appointments]);

    const missedBookings = useMemo(() => {
        if (!appointments) return [];
        return appointments.filter((apt) => apt.schedule.status === "MISSED") ?? [];
    }, [appointments]);

    const todayBooking = useMemo(() => {
        if (!appointments) return [];
        return appointments.filter(
            (apt) => isToday(new Date(apt.schedule.startsAt), apt.business.timezone) && apt.schedule.status === "CONFIRMED"
        );
    }, [appointments]);

    const hasAnyBookings = todayBooking.length > 0 || upcomingBooking.length > 0 || filteredHistory.length > 0;

    const pendingBookings = useMemo(() => {
        if (!appointments) return [];
        return appointments.filter((apt) => apt.schedule.status === "PENDING") ?? [];
    }, [appointments]);

    const openReviewFor = (service: ServiceResponse, schedId: string) => {
        setServiceToReview(service);
        setSchedIdToReview(schedId);
        setOpenReview(true);
    };

    return (
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            {openReview && (
                <ReviewModal
                    setBooking={setAppointments}
                    schedId={schedIdToReview}
                    service={serviceToReview}
                    onClose={() => setOpenReview(false)}
                />
            )}

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

            <div className="mt-8 flex flex-wrap gap-2">
                {filters.map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`py-2 px-4 border cursor-pointer active:text-(--gold) active:bg-(--gold-light) transition-colors rounded-2xl ${filter === f ? "border-(--gold) text-(--gold) shadow shadow-amber-200" : "text-(--text-2) border-(--gold)"
                            }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <div className="mt-5">
                <div className="relative flex-1">
                    <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                    <input
                        type="text"
                        placeholder="Search bookings..."
                        className="w-full rounded-xl border border-white/10 bg-(--surface) py-2.5 pl-10 pr-4 text-sm text-neutral-200 placeholder:text-neutral-500 transition-all duration-200 focus:border-(--gold)/50 focus:outline-none focus:ring-1 focus:ring-(--gold)/30"
                    />
                </div>
            </div>

            {!hasAnyBookings ? (
                <div className="mt-10">
                    <EmptyState />
                </div>
            ) : (
                <>
                    {todayBooking && (filter === "all" || filter === "today") && (
                        <div className="mt-10 space-y-4">
                            {todayBooking.map((tod) => (
                                <TodayBookingCard key={tod.schedule.id} booking={tod} />
                            ))}
                        </div>
                    )}

                    {upcomingBooking.length > 0 && (filter === "all" || filter === "upcoming") && (
                        <div className="mt-12">
                            <h2 className="text-xl font-semibold text-white">Upcoming Bookings</h2>
                            <div className="mt-5 space-y-4">
                                {upcomingBooking.map((ub) => (
                                    <ConfirmedBookingCard 
                                        setAppointments={setAppointments}
                                        key={ub.schedule.id} 
                                        booking={ub} 
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {upcomingBooking.length === 0 && (filter === "all" || filter === "upcoming") && (
                        <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-(--surface) px-6 py-16 text-center">
                            <AlertCircle className="mb-4 h-8 w-8 text-neutral-600" />
                            <p className="text-neutral-400">No bookings match this filter.</p>
                        </div>
                    )}

                    {pendingBookings.length > 0 && (filter === "all" || filter === "pending") && (
                        <div className="mt-12">
                            <h2 className="text-xl font-semibold text-white">Pending Bookings</h2>
                            <div className="mt-5 space-y-4">
                                {pendingBookings.map((pb) => (
                                    <PendingBookingCard key={pb.schedule.id} booking={pb} />
                                ))}
                            </div>
                        </div>
                    )}

                    {filteredHistory.length > 0 && (filter === "all" || filter === "completed") && (
                        <div className="mt-12">
                            <h2 className="text-xl font-semibold text-white">Booking History</h2>
                            <div className="mt-5 space-y-4">
                                {filteredHistory.map((b) => (
                                    <CompletedBookingCard key={b.schedule.id} booking={b} onOpenReview={openReviewFor} />
                                ))}
                            </div>
                        </div>
                    )}

                    {missedBookings.length > 0 && (filter === "all" || filter === "missed") && (
                        <div className="mt-12">
                            <h2 className="text-xl font-semibold text-white">Missed Bookings</h2>
                            <div className="mt-5 space-y-4">
                                {missedBookings.map((mb) => (
                                    <MissedBookingCard key={mb.schedule.id} booking={mb} />
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

function CancelBookingModal({ 
    appointment, 
    onClose,
    setAppointments
}: Readonly<{ 
    appointment: CustomerAppointments;
    onClose: any; 
    setAppointments: React.Dispatch<React.SetStateAction<CustomerAppointments[] | null>>;
}>) {
    const startsAt = new Date(appointment.schedule.startsAt);
    const status: string = "CONFIRMED"; 
    const now = new Date();

    // 24 hours in miliseconds
    const freeCancelationHours = 86400000;
    // 2 hours in miliseconds
    const lockCancelHours = 7200000;
    const milisecondsUntil = startsAt.getTime() - now.getTime();

    const isFree = milisecondsUntil > freeCancelationHours || status === "PENDING";
    const isRequestable = !isFree && milisecondsUntil > lockCancelHours;
    const isLocked = !isFree && !isRequestable;

    const [sending, setSending] = useState<boolean>(false);
    const [message, setMessage] = useState<string | null>(null);
    const [cancellationRequestResult, setCancellationRequestResult] = useState<{ success: boolean, message: string } | null>(null);

    const sendCancellationRequest = async () => {
        setSending(true);

        const url = `http://localhost:8080/api/user/schedule/${appointment.schedule.id}/CANCELLED`;

        try {
            const result = await update(url, message);

            if(result.status === 200) {
                setSending(false);
                setCancellationRequestResult({ success: true, message: 'successful one' });
                setAppointments(prev => prev?.filter(app => app.schedule.id !== appointment.schedule.id) ?? []);
            }
        } catch (error) {
            console.error(error);
        }

        setTimeout(() => {
            onClose();
        }, 3000);

    };

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm">
            <div
                className={`w-full max-w-md rounded-2xl border bg-(--surface) p-6 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.6)] ${isLocked ? "border-red-500/20" : "border-(--gold)/20"
                    }`}
            >
                <div className="mb-5 flex items-start gap-3">
                    <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${isLocked ? "bg-red-500/15 text-red-400" : "bg-(--gold)/15 text-(--gold)"
                            }`}
                    >
                        {isFree && <ShieldCheck className="h-5 w-5" />}
                        {isRequestable && <CalendarClock className="h-5 w-5" />}
                        {isLocked && <AlertTriangle className="h-5 w-5" />}
                    </div>
                    <div className="flex-1">
                        <h3 className="text-[17px] font-semibold text-white">
                            {isFree && "Cancel this booking?"}
                            {isRequestable && "Request cancellation"}
                            {isLocked && "This booking can't be cancelled"}
                        </h3>
                        <p className="mt-0.5 text-[13px] leading-snug text-neutral-400">
                            {isFree &&
                                "This appointment is outside the 24-hour window, so it can be cancelled free of charge."}
                            {isRequestable &&
                                "This appointment is within 24 hours, so the business needs to review and approve your cancellation."}
                            {isLocked && "Cancellations are locked within 2 hours of the scheduled time."}
                        </p>
                    </div>
                    <button
                        aria-label="Close"
                        className="-mr-1 -mt-1 shrink-0 rounded-lg p-1.5 text-neutral-500 hover:bg-white/5 hover:text-white"
                        onClick={onClose}
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <div className="mb-5 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-[13.5px]">
                    <div className="flex justify-between py-1">
                        <span className="text-neutral-500">Service</span>
                        <strong className="text-neutral-200">{appointment.service.serviceName} · {formatDuration(Number(durationAsMinutes(appointment.service.duration)))}</strong>
                    </div>
                    <div className="flex justify-between py-1">
                        <span className="text-neutral-500">Staff</span>
                        <strong className="text-neutral-200">{appointment.staff.fullName}</strong>
                    </div>
                    <div className="flex justify-between py-1">
                        <span className="text-neutral-500">Appointment</span>
                        <strong className="text-neutral-200">
                            {new Date(appointment.schedule.startsAt).toLocaleDateString()} · {new Date(appointment.schedule.startsAt).toLocaleTimeString()}
                        </strong>
                    </div>
                </div>

                {isFree && (
                    <>
                        <div className="mb-6 flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/6 px-3.5 py-2.5 text-[13px] text-emerald-300">
                            <Clock className="h-4 w-4 shrink-0" />
                            No cancellation fee applies for this booking.
                        </div>
                        <div className="flex flex-col items-end gap-2.5">
                            <button
                                className="inline-flex w-fit items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-400 transition-all duration-200 hover:border-red-500/50 hover:bg-red-500/15 active:scale-[0.98]"
                                onClick={sendCancellationRequest}
                                disabled={sending}
                            >
                                <Ban className="h-4 w-4" />
                                {sending ? <SpinnerLoading color="white" size={22} /> : 'Confirm cancellation'}
                            </button>
                            {cancellationRequestResult !== null && cancellationRequestResult.success && <p className="text-(--teal) text-sm text-center">request sent</p>}
                        </div>
                    </>
                )}

                {isRequestable && (
                    <>
                        <label
                            htmlFor="cancel-request-message"
                            className="mb-2 block text-[12.5px] font-semibold text-neutral-300"
                        >
                            Reason for cancellation <span className="font-medium text-neutral-500">(required)</span>
                        </label>
                        <textarea
                            id="cancel-request-message"
                            rows={3}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Let the business know why you need to cancel…"
                            className="mb-4 w-full resize-y rounded-xl border border-white/10 bg-black/20 px-3.5 py-3 text-sm text-neutral-200 placeholder:text-neutral-500 focus:border-(--gold)/50 focus:outline-none focus:ring-1 focus:ring-(--gold)/30"
                        />
                        <div className="mb-6 flex items-start gap-2 rounded-xl border border-(--gold)/25 bg-(--gold)/[0.06] px-3.5 py-2.5 text-[13px]">
                            <MessageSquareWarning className="mt-0.5 h-4 w-4 shrink-0 text-(--gold)" />
                            <span className="text-neutral-300">
                                Your booking stays <strong className="text-(--gold)">active</strong> until the
                                business approves this request.
                            </span>
                        </div>
                        <div className="flex justify-end gap-2.5">
                            <button 
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-(--gold) px-4 py-2.5 text-sm font-semibold text-black transition-all duration-200 hover:shadow-[0_0_24px_-4px_var(--gold)] hover:brightness-110 active:scale-[0.98]"
                                onClick={sendCancellationRequest}
                                disabled={sending}
                            >
                                <CalendarClock className="h-4 w-4" />
                                {sending ? <SpinnerLoading color="black" size={22} /> : 'Send cancellation request'}
                            </button>
                        </div>
                    </>
                )}

                {isLocked && (
                    <>
                        <div className="mb-6 flex items-start gap-2 rounded-xl border border-red-500/25 bg-red-500/[0.06] px-3.5 py-3 text-[13px] text-red-300">
                            <Ban className="mt-0.5 h-4 w-4 shrink-0" />
                            <span>
                                This appointment starts in under 2 hours, so it&apos;s too late to cancel online.
                                Please contact the business directly if something has come up.
                            </span>
                        </div>
                        <div className="flex justify-end">
                            <button 
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/2 px-4 py-2.5 text-sm font-medium text-neutral-200 transition-all duration-200 hover:border-(--gold)/50 hover:bg-(--gold)/6 hover:text-(--gold) active:scale-[0.98]"
                                onClick={onClose}
                            >
                                Close
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}