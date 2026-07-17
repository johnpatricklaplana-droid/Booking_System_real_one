import React, { useEffect, useState } from "react";
import {
    Briefcase,
    UserCheck,
    Calendar,
    Clock,
    Quote,
    CheckCircle2,
    XCircle,
    Eye,
    X,
    Sparkles,
    AlertTriangle,
    Check,
} from "lucide-react";
import { useUser } from "../../provider/UserContext";
import { get, update } from "../../api/api";
import type { CancellationRequest } from "../../interfaces/Types";
import { differenceInMinutes, isBefore } from "date-fns";
import { formatDuration } from "../../helper/convertSome";
import { SpinnerLoading } from "../../components/SpinnerLoading";
import { API_URL } from "../../api/config";

interface RejectDialogProps {
    request: CancellationRequest;
    onClose: () => void;
    onConfirm: (reason: string) => void;
}

type UrgencyTone = "urgent" | "soon" | "normal";

const URGENCY_CLASSES: Record<UrgencyTone, string> = {
    urgent: "bg-red-500/15 text-red-300 border-red-500/35",
    soon: "bg-[var(--gold)]/15 text-[var(--gold)] border-[var(--gold)]/35",
    normal: "bg-[var(--teal)]/15 text-[var(--teal)] border-[var(--teal)]/35",
};


function ApproveDialog({ request, onClose, setCansellationRequests }: Readonly<{
    request: CancellationRequest,
    onClose: any,
    setCansellationRequests: React.Dispatch<React.SetStateAction<CancellationRequest[]>>
}>) {

    const [approving, setApproving] = useState<boolean>(false);
    const [approved, setApproved] = useState<boolean>(false);

    const approveCancellationRequest = async () => {
        setApproving(true);
        
        const url = `${API_URL}/api/business/cancellation-request/${request.cancellationRequest.id}`;

        try {
            const result = await update(url, null);

            if(result.status === 200) {
                setApproving(false);
                setApproved(true);
                setCansellationRequests(prev => prev.filter(cr => cr.cancellationRequest.id !== request.cancellationRequest.id));
            }
        } catch (error) {
            console.error(error);
        }

    };

    return (
        <div
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 backdrop-blur-sm p-6"
        >
            <div className="w-full max-w-md rounded-2xl border border-(--border) bg-(--surface) p-6 shadow-2xl">
                <div className="flex items-start gap-3 mb-5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-(--teal)/20 text-(--teal)">
                        <CheckCircle2 size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-[17px] text-(--text-1)">
                            Approve cancellation
                        </h3>
                        <p className="text-[13px] text-(--text-3) leading-tight">
                            This will cancel the booking and notify {request.user.firstName} {request.user.lastName}.
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        aria-label="Close"
                        className="ml-auto shrink-0 rounded-lg p-1 text-(--text-3) hover:bg-(--surface-2) hover:text-(--text-1)"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="mb-5 rounded-xl border border-(--border) bg-(--surface-2) px-4 py-3 text-[13.5px]">
                    <div className="flex justify-between py-1">
                        <span className="text-(--text-3)">Booking reference</span>
                        <strong className="text-(--text-1)">{request.schedule.id}</strong>
                    </div>
                    <div className="flex justify-between py-1">
                        <span className="text-(--text-3)">Service</span>
                        <strong className="text-(--text-1)">{request.service.serviceName}</strong>
                    </div>
                    <div className="flex justify-between py-1">
                        <span className="text-(--text-3)">Appointment</span>
                        <strong className="text-(--text-1)">
                            {new Date(request.schedule.startsAt).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric'  })} · {new Date(request.schedule.startsAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}
                        </strong>
                    </div>
                    <div className="my-1.5 h-px bg-(--border)" />
                    <div className="flex justify-between py-1">
                        <span className="text-(--text-3)">Total booking value</span>
                        <strong className="text-(--text-1)">{request.service.price.toLocaleString()}</strong>
                    </div>
                    <div className="flex justify-between py-1">
                        <span className="text-(--text-3)">Amount paid</span>
                        <strong className="text-(--text-1)">0</strong>
                    </div>
                    <div className="flex justify-between py-1">
                        <span className="text-(--text-3)">Refund status</span>
                        <strong className={ "text-(--teal)"}>
                            no refund here
                        </strong>
                    </div>
                </div>

                <div className="mt-5 flex justify-end gap-2.5">
                    <button  
                        className="border border-(--border) py-2 px-4 rounded-sm cursor-pointer"
                        onClick={onClose}>
                        Go back
                    </button>
                    <button  
                        onClick={approveCancellationRequest}
                        disabled={approving || approved}
                        className="btn-primary py-2 px-4 flex cursor-pointer items-center gap-2 rounded-sm transition"
                    >
                        {approved ? <> <span>approved</span> <Check /> </> : <> <CheckCircle2 size={16} /> Confirm approval </>}
                        {approving && <SpinnerLoading color="black" /> }
                    </button>
                </div>
            </div>
        </div>
    );
}

function RejectDialog({ request, onClose, onConfirm }: Readonly<RejectDialogProps>) {
    const [reason, setReason] = useState<string>("");
    const [touched, setTouched] = useState<boolean>(false);
    const valid = reason.trim().length > 0;

    return (
        <div
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 backdrop-blur-sm p-6"
        >
            <div className="w-full max-w-md rounded-2xl border border-(--border) bg-(--surface) p-6 shadow-2xl">
                <div className="flex items-start gap-3 mb-5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-red-300">
                        <AlertTriangle size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-[17px] text-(--text-1)">
                            Reject cancellation request
                        </h3>
                        <p className="text-[13px] text-(--text-3) leading-tight">
                            {request.user.firstName} {request.user.lastName} will keep their booking and see your reason.
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        aria-label="Close"
                        className="ml-auto shrink-0 rounded-lg p-1 text-(--text-3) hover:bg-(--surface-2) hover:text-(--text-1)"
                    >
                        <X size={18} />
                    </button>
                </div>

                <label htmlFor="reject-reason" className="mb-2 block text-[12.5px] font-bold text-(--text-2)">
                    Reason for rejection <span className="text-[11px] font-semibold text-red-300">required</span>
                </label>
                <textarea
                    id="reject-reason"
                    rows={4}
                    placeholder="Explain why this cancellation request isn't being approved…"
                    value={reason}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setReason(e.target.value)}
                    onBlur={() => setTouched(true)}
                    className={`mb-1 w-full resize-y rounded-xl border bg-(--surface-2) px-3.5 py-3 text-sm text-(--text-1) focus:outline-none ${touched && !valid ? "border-red-500" : "border-[var(--border)] focus:border-[var(--gold)]"
                        }`}
                />
                {touched && !valid && (
                    <p className="mb-3 text-xs text-red-300">
                        A reason is required before you can reject this request.
                    </p>
                )}

                <div className="mt-5 flex justify-end gap-2.5">
                    <button  
                        onClick={onClose}
                        className="border border-(--border) py-2 px-4 rounded-sm cursor-pointer"
                    >
                        Go back
                    </button>
                    <button 
                        disabled={!valid} 
                        className="bg-transparent border-red-500/40 flex py-2 px-4 items-center border gap-2 rounded-sm text-red-300 hover:bg-red-500/10"
                        onClick={() => valid && onConfirm(reason)}
                    >
                        <XCircle size={16} />
                        Confirm rejection
                    </button>
                </div>
            </div>
        </div>
    );
}

function urgency(minutes: number, isPast: boolean): { label: string; tone: UrgencyTone } {
    if (isPast) return { label: `${formatDuration(minutes)} left`, tone: "urgent" };
    if (minutes <= 720) return { label: `${formatDuration(minutes)} left`, tone: "urgent" };
    if (minutes <= 2880)
        return { label: `${formatDuration(minutes) || 1} left`, tone: "soon" };
    return { label: `${formatDuration(minutes)}d left`, tone: "normal" };
}

function RequestCard({ 
    request, 
    setCansellationRequests 
}: Readonly<{ 
    request: CancellationRequest, 
    setCansellationRequests: React.Dispatch<React.SetStateAction<CancellationRequest[]>> 
}>) {

    const [openApproveDialog, setOpenApproveDialog] = useState<boolean>(false);
    const [openRejectDialog, setOpenRejectDialog] = useState<boolean>(false);
    
    const isPast = isBefore(request.schedule.startsAt, new Date());

    const u = urgency(differenceInMinutes(request.schedule.startsAt, new Date()), isPast);

    return (
        <article className="rounded-[20px] border border-(--border) bg-(--surface) p-7 shadow-lg shadow-black/20">

            {openApproveDialog && <ApproveDialog setCansellationRequests={setCansellationRequests} request={request} onClose={() => setOpenApproveDialog(false)} />}
            {openRejectDialog && <RejectDialog request={request} onConfirm={() => console.log("TODO")} onClose={() => setOpenRejectDialog(false)} />}

            <header className="mb-5 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-(--gold) font-bold text-[16px] text-[#241C08]">
                        {request.user.firstName}
                    </div>
                    <div>
                        <p className="font-semibold text-[17px] text-(--text-1)">{request.user.firstName} {request.user.lastName}</p>
                        <p className="flex items-center gap-1 text-[12.5px] text-(--text-3) tabular-nums">
                            requested at {new Date(request.cancellationRequest.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} {new Date(request.cancellationRequest.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}
                        </p>
                    </div>
                </div>
                <span
                    className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-[12.5px] font-semibold ${URGENCY_CLASSES[u.tone]}`}
                >
                    <Clock size={13} />
                    {isPast ? 'already passed buddy' : u.label}
                </span>
            </header>

            <div className="mb-5 grid grid-cols-1 gap-4 rounded-2xl border border-(--border) bg-(--surface-2) px-5 py-4 sm:grid-cols-3">
                <div className="flex items-start gap-2.5">
                    <Briefcase size={15} className="mt-0.5 shrink-0 text-(--teal)" />
                    <div>
                        <p className="mb-0.5 text-[11.5px] font-semibold uppercase tracking-wide text-(--text-3)">
                            Service
                        </p>
                        <p className="text-sm font-medium leading-tight text-(--text-1)">{request.service.serviceName}</p>
                    </div>
                </div>
                <div className="flex items-start gap-2.5">
                    <UserCheck size={15} className="mt-0.5 shrink-0 text-(--teal)" />
                    <div>
                        <p className="mb-0.5 text-[11.5px] font-semibold uppercase tracking-wide text-(--text-3)">
                            Staff assigned
                        </p>
                        <p className="text-sm font-medium leading-tight text-(--text-1)">{request.staff.fullName}</p>
                    </div>
                </div>
                <div className="flex items-start gap-2.5">
                    <Calendar size={15} className="mt-0.5 shrink-0 text-(--teal)" />
                    <div>
                        <p className="mb-0.5 text-[11.5px] font-semibold uppercase tracking-wide text-(--text-3)">
                            Appointment
                        </p>
                        <p className="text-sm font-medium leading-tight text-(--text-1)">
                            {new Date(request.schedule.startsAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })} · {new Date(request.schedule.startsAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                    </div>
                </div>
            </div>
            <div className="mb-6 rounded-2xl border border-(--gold)/30 bg-(--gold)/[0.07] px-5.5 py-5">
                <div className="mb-2.5 flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-wide text-(--gold)">
                    <Quote size={16} />
                    <span>Reason for cancellation</span>
                </div>
                <p className="text-[16.5px] font-medium leading-relaxed text-(--text-1)">{request.cancellationRequest.message}</p>
            </div>
            <footer className="flex flex-wrap gap-2.5">
                <button 
                    className="btn-primary border-transparent flex py-2 px-4 items-center gap-2 rounded-sm text-[#241C08] hover:brightness-105"
                    disabled={isPast}
                    onClick={() => setOpenApproveDialog(true)}
                >
                    <CheckCircle2 size={16} />
                    Approve cancellation
                </button>
                <button 
                    className="bg-transparent border-red-500/40 flex py-2 px-4 items-center border gap-2 rounded-sm text-red-300 hover:bg-red-500/10"
                    disabled={isPast}
                    onClick={() => setOpenRejectDialog(true)}
                >
                    <XCircle size={16} />
                    Reject request
                </button>
                <button className="bg-transparent flex py-2 px-4 items-center gap-2 rounded-sm border border-(--border) text-(--text-2) hover:bg-(--surface-2) hover:text-(--text-1)">
                    <Eye size={16} />
                    View booking details
                </button>
            </footer>
        </article>
    );
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */

export default function CancellationRequestsPage(): React.JSX.Element {
    const [cancellationRequest, setCancellationRequest] = useState<CancellationRequest[]>([]);

    const business = useUser().activeBusiness;

    useEffect(() => {

        if(!business?.businessId) return;

        const getIt = async () => {
            const result: CancellationRequest[] = await get(`${API_URL}/api/business/${business.businessId}/schedule`);
            setCancellationRequest(result);
        }

        getIt();

    }, [business?.businessId]);

    return (
        <div className="min-h-screen bg-(--bg) font-sans text-(--text-1)">
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
                    <strong className="font-bold text-(--text-1)">{cancellationRequest.length}</strong>
                    requests awaiting review
                </div>
            </div>

            <div className="mx-auto flex flex-col gap-5">
                {cancellationRequest.map((cr) => (
                    <RequestCard setCansellationRequests={setCancellationRequest} key={cr.schedule.id} request={cr} />
                ))}
            </div>
        </div>
    );
}