import {
    CheckCircle2,
    XCircle,
    Clock,
    Ban,
    Sparkles,
    ChevronRight,
} from 'lucide-react';
import { useUser } from '../provider/UserContext';
import type { Appointment } from '../interfaces/Types';
import { hasAppointmentPassed } from '../hooks/service';
import { formatDuration } from '../helper/convertSome';
import { useState } from 'react';
import { update } from '../api/api';
import { API_URL } from '../api/config';


export default function AppointmentCard({ 
    apt,
    setAppointments
}: Readonly<{ 
    apt: Appointment;
    setAppointments: React.Dispatch<React.SetStateAction<Appointment[] | null>>;
}>) {
    const business = useUser().activeBusiness;

    const [updating, setUpdating] = useState<'CONFIRMED' | 'MISSED' | 'CANCELLED' | 'COMPLETED' | null>(null);
    const [error, setError] = useState<string | null>(null);

    const passed = hasAppointmentPassed(new Date(apt.schedule.startsAt), business?.timezone!);
    const date = new Date(apt.schedule.startsAt).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    const time = new Date(apt.schedule.startsAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const customer = `${apt.user.firstName} ${apt.user.lastName}`;

    const setSchedule = async (next: 'CONFIRMED' | 'MISSED' | 'CANCELLED' | 'COMPLETED', schedId: string) => {
        setUpdating(next);
        setError(null);
        try {
             await update(`${API_URL}/api/schedule/${schedId}/${next}`, null);
             
            setAppointments(prev => prev!.map(ap => {
                if (ap.schedule.id !== schedId) return ap;
                return {
                    ...ap,
                    schedule: {
                        ...ap.schedule,
                        status: next
                    }
                };
            }));

        } catch (err: any) {
            setError(err.message ?? 'Something went wrong');
            setTimeout(() => setError(null), 4000);
        } finally {
            setUpdating(null);
        }
    };

    if (apt.schedule.status === 'PENDING') {
        return (
            <div className="relative flex flex-col gap-4 rounded-lg bg-linear-to-b from-[#1a1712] to-[#151518] border border-(--gold)/30 p-4 shadow-[0_0_0_1px_rgba(201,168,124,0.06)]">
                <div className="absolute -top-2 left-4 flex items-center gap-1.5 rounded-full bg-(--gold) px-2.5 py-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0a0a0c] animate-pulse" />
                    <span className="text-[10px] font-bold tracking-wide uppercase text-[#0a0a0c]">Awaiting response</span>
                </div>

                <div className="flex items-center gap-3 mt-2">
                    <img src={apt.user.avatarUrl} alt="" className="w-11 h-11 rounded-full border border-(--gold)/50 object-cover" />
                    <div className="min-w-0">
                        <p className="text-(--text-1) font-semibold text-[15px] truncate">{customer}</p>
                        <p className="text-(--text-3) text-xs">{date} · {time}</p>
                    </div>
                    <p className="ml-auto text-(--gold) font-semibold text-[15px] shrink-0">₱{apt.service.price}</p>
                </div>

                <div className="rounded-md bg-black/20 border border-(--border) px-3 py-2">
                    <p className="text-(--text-1) text-sm font-medium">{apt.service.serviceName}</p>
                    <p className="text-(--text-3) text-xs">with {apt.staff.fullName} · {formatDuration(Number(apt.service.duration))}</p>
                </div>

                {error && <p className="text-red-400 text-xs">{error}</p>}

                <div className="flex gap-2">
                    <button
                        onClick={() => setSchedule('CONFIRMED', apt.schedule.status)}
                        disabled={updating !== null}
                        className="flex-1 flex items-center justify-center gap-1.5 rounded-md bg-(--gold) py-2 text-[13px] font-bold text-[#0a0a0c] hover:brightness-110 transition-all disabled:opacity-50"
                    >
                        {updating === 'CONFIRMED' ? (
                            <span className="w-4 h-4 rounded-full border-2 border-[#0a0a0c]/30 border-t-[#0a0a0c] animate-spin" />
                        ) : (
                            <>Confirm <ChevronRight size={14} /></>
                        )}
                    </button>
                    <button
                        onClick={() => setSchedule('CANCELLED', apt.schedule.status)}
                        disabled={updating !== null}
                        className="flex-1 rounded-md border border-(--border) py-2 text-[13px] font-medium text-(--text-2) hover:border-(--text-3) transition-all disabled:opacity-50"
                    >
                        {updating === 'CANCELLED' ? (
                            <span className="w-4 h-4 mx-auto rounded-full border-2 border-(--text-3)/30 border-t-(--text-2) animate-spin block" />
                        ) : 'Decline'}
                    </button>
                </div>
            </div>
        );
    }

    // ── CONFIRMED — premium boarding-pass ticket ─────────────────────────
    if (apt.schedule.status === 'CONFIRMED') {
        return (
            <div className="relative flex flex-col rounded-lg bg-[#151518] border border-(--teal)/25 overflow-hidden">
                <div className="flex items-center justify-between bg-linear-to-r from-(--teal)/15 to-transparent px-4 py-2.5 border-b border-dashed border-(--border)">
                    <span className="flex items-center gap-1.5 text-(--teal) text-[11px] font-bold uppercase tracking-wide">
                        <Sparkles size={12} /> Confirmed
                    </span>
                    <span className="text-(--text-1) font-semibold text-sm">₱{apt.service.price}</span>
                </div>

                <div className="flex items-center gap-3 px-4 pt-4">
                    <img src={apt.user.avatarUrl} alt="" className="w-11 h-11 rounded-full border border-(--teal)/50 object-cover" />
                    <div className="min-w-0">
                        <p className="text-(--text-1) font-semibold text-[15px] truncate">{customer}</p>
                        <p className="text-(--text-3) text-xs">{apt.service.serviceName} · {apt.staff.fullName}</p>
                    </div>
                </div>

                <div className="relative flex px-4 py-4 my-3">
                    <div className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#0a0a0c]" />
                    <div className="absolute -right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#0a0a0c]" />
                    <div className="absolute left-3 right-3 top-1/2 -translate-y-1/2 border-t border-dashed border-(--border)" />
                    <div className="flex-1 text-center">
                        <p className="text-(--text-3) text-[10px] uppercase font-medium">Date</p>
                        <p className="text-(--text-1) text-sm">{date}</p>
                    </div>
                    <div className="flex-1 text-center border-x border-(--border)/60">
                        <p className="text-(--text-3) text-[10px] uppercase font-medium">Time</p>
                        <p className="text-(--text-1) text-sm">{time}</p>
                    </div>
                    <div className="flex-1 text-center">
                        <p className="text-(--text-3) text-[10px] uppercase font-medium">Duration</p>
                        <p className="text-(--text-1) text-sm">{formatDuration(Number(apt.service.duration))}</p>
                    </div>
                </div>

                {error && <p className="text-red-400 text-xs px-4">{error}</p>}

                <div className="px-4 pb-4">
                    {passed ? (
                        <div className="flex gap-2">
                            <button
                                onClick={() => setSchedule('MISSED', apt.schedule.status)}
                                disabled={updating !== null}
                                className="flex-1 rounded-md border border-red-500/30 bg-red-500/10 py-2 text-[13px] font-medium text-red-400 hover:bg-red-500/20 transition-all disabled:opacity-50"
                            >
                                {updating === 'MISSED' ? <span className="w-4 h-4 mx-auto rounded-full border-2 border-red-400/30 border-t-red-400 animate-spin block" /> : 'No-show'}
                            </button>
                            <button
                                onClick={() => setSchedule('COMPLETED', apt.schedule.status)}
                                disabled={updating !== null}
                                className="flex-1 rounded-md bg-(--teal) py-2 text-[13px] font-bold text-[#0a0a0c] hover:brightness-110 transition-all disabled:opacity-50"
                            >
                                {updating === 'COMPLETED' ? <span className="w-4 h-4 mx-auto rounded-full border-2 border-[#0a0a0c]/30 border-t-[#0a0a0c] animate-spin block" /> : 'Mark complete'}
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center gap-1.5 rounded-md bg-(--teal)/10 py-2 text-[13px] font-medium text-(--teal)">
                            <Clock size={13} /> Upcoming
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // ── COMPLETED — quiet receipt, archived ──────────────────────────────
    if (apt.schedule.status === 'COMPLETED') {
        return (
            <div className="flex items-center gap-3 rounded-lg bg-[#121214] border border-(--border) px-4 py-3.5 opacity-80">
                <div className="w-9 h-9 rounded-full bg-(--teal)/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={16} className="text-(--teal)" strokeWidth={1.5} />
                </div>
                <div className="min-w-0 flex-1">
                    <p className="text-(--text-1) text-sm font-medium truncate">{customer} · {apt.service.serviceName}</p>
                    <p className="text-(--text-3) text-xs">{date} · with {apt.staff.fullName}</p>
                </div>
                <p className="text-(--text-2) text-sm font-medium shrink-0">₱{apt.service.price}</p>
            </div>
        );
    }

    // ── MISSED / CANCELLED — dimmed alert state ──────────────────────────
    const isMissed = apt.schedule.status === 'MISSED';
    return (
        <div className="flex items-center gap-3 rounded-lg bg-[#151112] border border-dashed border-red-500/20 px-4 py-3.5 opacity-70">
            <div className="w-9 h-9 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                {isMissed ? <XCircle size={16} className="text-red-400" strokeWidth={1.5} /> : <Ban size={16} className="text-(--text-3)" strokeWidth={1.5} />}
            </div>
            <div className="min-w-0 flex-1">
                <p className="text-(--text-2) text-sm font-medium truncate line-through decoration-(--text-3)/40">{customer} · {apt.service.serviceName}</p>
                <p className="text-(--text-3) text-xs">{date} · {isMissed ? 'No-show' : 'Cancelled'}</p>
            </div>
            <p className="text-(--text-3) text-sm shrink-0">₱{apt.service.price}</p>
        </div>
    );
}