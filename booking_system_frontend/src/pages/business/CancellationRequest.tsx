import React, { useState } from "react";
import {
    Hash,
    Briefcase,
    UserCheck,
    Calendar,
    Clock,
    Quote,
    CheckCircle2,
    XCircle,
    Eye,
    X,
    AlertTriangle,
    Sparkles,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

interface CancellationRequest {
    id: string;
    customerName: string;
    initials: string;
    bookingRef: string;
    service: string;
    staff: string;
    date: string;
    time: string;
    hoursUntil: number;
    reason: string;
    price: number;
    depositPaid: number;
    refundEligible: boolean;
}

type DecisionStatus = "approved" | "rejected";

interface ApproveDialogProps {
    request: CancellationRequest;
    onClose: () => void;
    onConfirm: (note: string) => void;
}

interface RejectDialogProps {
    request: CancellationRequest;
    onClose: () => void;
    onConfirm: (reason: string) => void;
}

interface RequestCardProps {
    request: CancellationRequest;
    onDecision?: (
        id: string,
        status: DecisionStatus,
        payload: { note?: string; reason?: string }
    ) => void;
}

type DialogKind = "approve" | "reject" | null;

/* ------------------------------------------------------------------ */
/* Mock data — swap for real props/query results in the app           */
/* ------------------------------------------------------------------ */

const REQUESTS: CancellationRequest[] = [
    {
        id: "req-1041",
        customerName: "Marisol Dela Cruz",
        initials: "MD",
        bookingRef: "APX-2291-JL",
        service: "Deep Tissue Massage · 60 min",
        staff: "Renz Bautista",
        date: "July 18, 2026",
        time: "2:30 PM",
        hoursUntil: 19,
        reason:
            "I have an unexpected family emergency and won't be able to attend my appointment. I sincerely apologize for the short notice.",
        price: 1800,
        depositPaid: 900,
        refundEligible: true,
    },
    {
        id: "req-1042",
        customerName: "Anton Reyes",
        initials: "AR",
        bookingRef: "APX-2288-QW",
        service: "Signature Facial · 45 min",
        staff: "Kaye Villanueva",
        date: "July 21, 2026",
        time: "10:00 AM",
        hoursUntil: 68,
        reason:
            "My work schedule changed last minute and I now have a mandatory meeting during this slot. Hoping to reschedule instead if that's easier.",
        price: 1500,
        depositPaid: 0,
        refundEligible: false,
    },
    {
        id: "req-1043",
        customerName: "Bea Santos",
        initials: "BS",
        bookingRef: "APX-2299-TN",
        service: "Manicure & Pedicure Combo",
        staff: "Grace Ibañez",
        date: "July 16, 2026",
        time: "4:00 PM",
        hoursUntil: 6,
        reason:
            "I'm feeling under the weather and don't want to risk passing anything on to the staff or other guests. Sorry for the very late notice.",
        price: 950,
        depositPaid: 950,
        refundEligible: true,
    },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

type UrgencyTone = "urgent" | "soon" | "normal";

function urgency(hoursUntil: number): { label: string; tone: UrgencyTone } {
    if (hoursUntil <= 12) return { label: `${hoursUntil}h left`, tone: "urgent" };
    if (hoursUntil <= 48)
        return { label: `${Math.round(hoursUntil / 24) || 1}d left`, tone: "soon" };
    return { label: `${Math.round(hoursUntil / 24)}d left`, tone: "normal" };
}

function currency(n: number): string {
    return `₱${n.toLocaleString("en-PH")}`;
}

const URGENCY_CLASSES: Record<UrgencyTone, string> = {
    urgent: "bg-red-500/15 text-red-300 border-red-500/35",
    soon: "bg-[var(--gold)]/15 text-[var(--gold)] border-[var(--gold)]/35",
    normal: "bg-[var(--teal)]/15 text-[var(--teal)] border-[var(--teal)]/35",
};

/* ------------------------------------------------------------------ */
/* Shared button                                                       */
/* ------------------------------------------------------------------ */

type ButtonVariant = "primary" | "danger" | "secondary" | "ghost";

interface CrButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant: ButtonVariant;
}

function CrButton({ variant, className = "", children, ...rest }: CrButtonProps) {
    const base =
        "inline-flex items-center gap-2 font-bold text-sm px-4 py-2.5 rounded-xl border transition active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed";
    const variants: Record<ButtonVariant, string> = {
        primary:
            "bg-[var(--gold)] border-transparent text-[#241C08] hover:brightness-105",
        danger:
            "bg-transparent border-red-500/40 text-red-300 hover:bg-red-500/10",
        secondary:
            "bg-[var(--surface-2)] border-[var(--border)] text-[var(--text-2)] hover:text-[var(--text-1)]",
        ghost:
            "bg-transparent border-[var(--border)] text-[var(--text-2)] hover:bg-[var(--surface-2)] hover:text-[var(--text-1)]",
    };
    return (
        <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
            {children}
        </button>
    );
}

/* ------------------------------------------------------------------ */
/* Approve dialog                                                      */
/* ------------------------------------------------------------------ */

function ApproveDialog({ request, onClose, onConfirm }: ApproveDialogProps) {
    const [note, setNote] = useState<string>("");

    return (
        <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-6"
        >
            <div className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-2xl">
                <div className="flex items-start gap-3 mb-5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--teal)]/20 text-[var(--teal)]">
                        <CheckCircle2 size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-[17px] text-[var(--text-1)]">
                            Approve cancellation
                        </h3>
                        <p className="text-[13px] text-[var(--text-3)] leading-tight">
                            This will cancel the booking and notify {request.customerName.split(" ")[0]}.
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        aria-label="Close"
                        className="ml-auto shrink-0 rounded-lg p-1 text-[var(--text-3)] hover:bg-[var(--surface-2)] hover:text-[var(--text-1)]"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="mb-5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 text-[13.5px]">
                    <div className="flex justify-between py-1">
                        <span className="text-[var(--text-3)]">Booking reference</span>
                        <strong className="text-[var(--text-1)]">{request.bookingRef}</strong>
                    </div>
                    <div className="flex justify-between py-1">
                        <span className="text-[var(--text-3)]">Service</span>
                        <strong className="text-[var(--text-1)]">{request.service}</strong>
                    </div>
                    <div className="flex justify-between py-1">
                        <span className="text-(--text-3)">Appointment</span>
                        <strong className="text-(--text-1)">
                            {request.date} · {request.time}
                        </strong>
                    </div>
                    <div className="my-1.5 h-px bg-(--border)" />
                    <div className="flex justify-between py-1">
                        <span className="text-(--text-3)">Total booking value</span>
                        <strong className="text-(--text-1)">{currency(request.price)}</strong>
                    </div>
                    <div className="flex justify-between py-1">
                        <span className="text-(--text-3)">Amount paid</span>
                        <strong className="text-(--text-1)">{currency(request.depositPaid)}</strong>
                    </div>
                    <div className="flex justify-between py-1">
                        <span className="text-(--text-3)">Refund status</span>
                        <strong className={request.refundEligible ? "text-(--teal)" : "text-(--text-3)"}>
                            {request.refundEligible
                                ? `${currency(request.depositPaid)} eligible for refund`
                                : "Not eligible — outside refund window"}
                        </strong>
                    </div>
                </div>

                <label htmlFor="approve-note" className="mb-2 block text-[12.5px] font-bold text-[var(--text-2)]">
                    Note to customer <span className="font-medium text-[var(--text-3)]">(optional)</span>
                </label>
                <textarea
                    id="approve-note"
                    rows={3}
                    placeholder="Let them know anything before the cancellation is finalized…"
                    value={note}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNote(e.target.value)}
                    className="mb-1 w-full resize-y rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-3.5 py-3 text-sm text-[var(--text-1)] focus:border-[var(--gold)] focus:outline-none"
                />

                <div className="mt-5 flex justify-end gap-2.5">
                    <CrButton variant="secondary" onClick={onClose}>
                        Go back
                    </CrButton>
                    <CrButton variant="primary" onClick={() => onConfirm(note)}>
                        <CheckCircle2 size={16} />
                        Confirm approval
                    </CrButton>
                </div>
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Reject dialog                                                       */
/* ------------------------------------------------------------------ */

function RejectDialog({ request, onClose, onConfirm }: RejectDialogProps) {
    const [reason, setReason] = useState<string>("");
    const [touched, setTouched] = useState<boolean>(false);
    const valid = reason.trim().length > 0;

    return (
        <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-6"
        >
            <div className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-2xl">
                <div className="flex items-start gap-3 mb-5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-red-300">
                        <AlertTriangle size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-[17px] text-[var(--text-1)]">
                            Reject cancellation request
                        </h3>
                        <p className="text-[13px] text-[var(--text-3)] leading-tight">
                            {request.customerName.split(" ")[0]} will keep their booking and see your reason.
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        aria-label="Close"
                        className="ml-auto shrink-0 rounded-lg p-1 text-[var(--text-3)] hover:bg-[var(--surface-2)] hover:text-[var(--text-1)]"
                    >
                        <X size={18} />
                    </button>
                </div>

                <label htmlFor="reject-reason" className="mb-2 block text-[12.5px] font-bold text-[var(--text-2)]">
                    Reason for rejection <span className="text-[11px] font-semibold text-red-300">required</span>
                </label>
                <textarea
                    id="reject-reason"
                    rows={4}
                    placeholder="Explain why this cancellation request isn't being approved…"
                    value={reason}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setReason(e.target.value)}
                    onBlur={() => setTouched(true)}
                    className={`mb-1 w-full resize-y rounded-xl border bg-[var(--surface-2)] px-3.5 py-3 text-sm text-[var(--text-1)] focus:outline-none ${touched && !valid ? "border-red-500" : "border-[var(--border)] focus:border-[var(--gold)]"
                        }`}
                />
                {touched && !valid && (
                    <p className="mb-3 text-xs text-red-300">
                        A reason is required before you can reject this request.
                    </p>
                )}

                <div className="mt-5 flex justify-end gap-2.5">
                    <CrButton variant="secondary" onClick={onClose}>
                        Go back
                    </CrButton>
                    <CrButton variant="danger" disabled={!valid} onClick={() => valid && onConfirm(reason)}>
                        <XCircle size={16} />
                        Confirm rejection
                    </CrButton>
                </div>
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Request card                                                        */
/* ------------------------------------------------------------------ */

function RequestCard({ request, onDecision }: RequestCardProps) {
    const [dialog, setDialog] = useState<DialogKind>(null);
    const [status, setStatus] = useState<DecisionStatus | null>(null);
    const u = urgency(request.hoursUntil);

    if (status) {
        return (
            <div className="flex items-center gap-3.5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-7 py-5 opacity-70">
                <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${status === "approved" ? "bg-[var(--teal)]/20 text-[var(--teal)]" : "bg-red-500/20 text-red-300"
                        }`}
                >
                    {status === "approved" ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                </div>
                <div>
                    <p className="text-[14.5px] font-bold text-[var(--text-1)]">
                        {status === "approved" ? "Cancellation approved" : "Request rejected"}
                    </p>
                    <p className="text-[13px] text-[var(--text-3)]">
                        {request.customerName} · {request.bookingRef}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <>
            <article className="rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-7 shadow-lg shadow-black/20">
                <header className="mb-5 flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--gold)] font-bold text-[16px] text-[#241C08]">
                            {request.initials}
                        </div>
                        <div>
                            <p className="font-semibold text-[17px] text-[var(--text-1)]">{request.customerName}</p>
                            <p className="flex items-center gap-1 text-[12.5px] text-[var(--text-3)] tabular-nums">
                                <Hash size={12} />
                                {request.bookingRef}
                            </p>
                        </div>
                    </div>
                    <span
                        className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-[12.5px] font-semibold ${URGENCY_CLASSES[u.tone]}`}
                    >
                        <Clock size={13} />
                        {u.label}
                    </span>
                </header>

                <div className="mb-5 grid grid-cols-1 gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] px-5 py-4 sm:grid-cols-3">
                    <div className="flex items-start gap-2.5">
                        <Briefcase size={15} className="mt-0.5 shrink-0 text-[var(--teal)]" />
                        <div>
                            <p className="mb-0.5 text-[11.5px] font-semibold uppercase tracking-wide text-[var(--text-3)]">
                                Service
                            </p>
                            <p className="text-sm font-medium leading-tight text-[var(--text-1)]">{request.service}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                        <UserCheck size={15} className="mt-0.5 shrink-0 text-[var(--teal)]" />
                        <div>
                            <p className="mb-0.5 text-[11.5px] font-semibold uppercase tracking-wide text-[var(--text-3)]">
                                Staff assigned
                            </p>
                            <p className="text-sm font-medium leading-tight text-[var(--text-1)]">{request.staff}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                        <Calendar size={15} className="mt-0.5 shrink-0 text-[var(--teal)]" />
                        <div>
                            <p className="mb-0.5 text-[11.5px] font-semibold uppercase tracking-wide text-[var(--text-3)]">
                                Appointment
                            </p>
                            <p className="text-sm font-medium leading-tight text-[var(--text-1)]">
                                {request.date} · {request.time}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mb-6 rounded-2xl border border-[var(--gold)]/30 bg-[var(--gold)]/[0.07] px-5.5 py-5">
                    <div className="mb-2.5 flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-wide text-[var(--gold)]">
                        <Quote size={16} />
                        <span>Reason for cancellation</span>
                    </div>
                    <p className="text-[16.5px] font-medium leading-relaxed text-[var(--text-1)]">{request.reason}</p>
                </div>

                <footer className="flex flex-wrap gap-2.5">
                    <CrButton variant="primary" onClick={() => setDialog("approve")}>
                        <CheckCircle2 size={16} />
                        Approve cancellation
                    </CrButton>
                    <CrButton variant="danger" onClick={() => setDialog("reject")}>
                        <XCircle size={16} />
                        Reject request
                    </CrButton>
                    <CrButton variant="ghost">
                        <Eye size={16} />
                        View booking details
                    </CrButton>
                </footer>
            </article>

            {dialog === "approve" && (
                <ApproveDialog
                    request={request}
                    onClose={() => setDialog(null)}
                    onConfirm={(note) => {
                        setDialog(null);
                        setStatus("approved");
                        onDecision?.(request.id, "approved", { note });
                    }}
                />
            )}
            {dialog === "reject" && (
                <RejectDialog
                    request={request}
                    onClose={() => setDialog(null)}
                    onConfirm={(reason) => {
                        setDialog(null);
                        setStatus("rejected");
                        onDecision?.(request.id, "rejected", { reason });
                    }}
                />
            )}
        </>
    );
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */

export default function CancellationRequestsPage(): React.JSX.Element {
    const [requests] = useState<CancellationRequest[]>(REQUESTS);

    return (
        <div className="min-h-screen bg-(--bg) px-6 pb-20 pt-12 font-sans text-(--text-1)">
            <div className="mx-auto mb-9 max-w-4xl">
                <span className="mb-2.5 inline-flex items-center gap-1.5 text-[12.5px] font-semibold uppercase tracking-wide text-[var(--gold)]">
                    <Sparkles size={13} />
                    Admin · Bookings
                </span>
                <h1 className="mb-2 text-[32px] font-bold tracking-tight text-(--text-1)">
                    Cancellation requests
                </h1>
                <p className="max-w-xl text-[15px] leading-relaxed text-(--text-2)">
                    Review incoming cancellation requests from customers and decide whether to
                    approve or reject each one before the appointment window closes.
                </p>
                <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-3.5 py-1.5 text-[13px] text-[var(--text-2)]">
                    <strong className="font-bold text-(--text-1)">{requests.length}</strong>
                    requests awaiting review
                </div>
            </div>

            <div className="mx-auto flex flex-col gap-5">
                {requests.map((r) => (
                    <RequestCard key={r.id} request={r} onDecision={() => { }} />
                ))}
            </div>
        </div>
    );
}