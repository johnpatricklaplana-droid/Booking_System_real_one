import { Search, Filter, Download, Plus, CheckCircle, XCircle, AlertCircle, Diamond } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useUser } from '../../provider/UserContext';
import { get, update } from '../../api/api';
import type { Appointment } from '../../interfaces/Types';
import { formatDuration } from '../../helper/convertSome';
import { durationAsMinutes, hasAppointmentPassed } from '../../hooks/service';

const statusIcons = {
    CONFIRMED: CheckCircle,
    PENDING: AlertCircle,
    "0": CheckCircle,
    MISSED: XCircle,
    COMPLETED: CheckCircle,
};

const statusColors = {
    CONFIRMED: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    PENDING: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    "0": 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    MISSED: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export function Appointments() {

    const business = useUser().activeBusiness;

    const [appointments, setAppointments] = useState<Appointment[] | null>(null);
    const [updating, setUpdating] = useState<{ schedId: string,  buttonId: 'CONFIRMED' | 'MISSED' | 'CANCELLED' | 'PENDING' | 'COMPLETED' | 'REJECT', status: boolean } | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        if(!business) return;

        const getIt = async () => {
            const url = `http://localhost:8080/api/schedule/business/${business.businessId}`;

            const result: Appointment[] = await get(url);

            result.forEach(r => {
                r.service.duration = durationAsMinutes(r.service.duration);
            });

            console.log(result);
            setAppointments(result);
        };

        getIt();

    }, [business?.businessId]);

    const confirmAppointment = async (scheduleId: string, status: 'CONFIRMED' | 'MISSED' | 'CANCELLED' | 'PENDING') => {

        setUpdating({ schedId: scheduleId, buttonId: status, status: true });
        
        const url = `http://localhost:8080/api/schedule/${scheduleId}/${status}`;

        try {
            const result = await update(url, null);

            if (result.status === 200) {
                const sched: Appointment[] = appointments?.map(apt => {
                    if (apt.schedule.id === scheduleId) {
                        apt.schedule.status = status;
                    }
                    return apt;
                })!;
                setAppointments(sched);
                setUpdating(null);
            }
        } catch (error) {
            setUpdating(null);
            console.log(error);
        }

    }

    const completeAppointment = async (scheduleId: string) => {
        const url = `http://localhost:8080/api/schedule/${scheduleId}/COMPLETED`;

        setUpdating({ schedId: scheduleId, buttonId: 'COMPLETED', status: true });

        try {
            const result = await update(url, null);

            if (result.status === 200) {
                const sched: Appointment[] = appointments?.map(apt => {
                    if (apt.schedule.id === scheduleId) {
                        apt.schedule.status = "COMPLETED";
                    }
                    return apt;
                })!;
                setAppointments(sched);
                setUpdating(null);
            }
        } catch (error: any) {
            console.log(`TODO: ERROR message ${error}`);
            setErrorMessage(error.message);
            setUpdating(null);
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }

    };

    console.log("render");

    return (
        <div className="space-y-6">

            {errorMessage ? <ErrorMessage error={errorMessage} /> : ''}

            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-[20px] font-medium text-[#e8e8ea] mb-1">Appointments</h2>
                    <p className="text-[13px] text-[#9a9aa3]">Manage all bookings and reservations</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2.5 bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-lg text-[13px] font-medium text-[#e8e8ea] hover:border-[rgba(255,255,255,0.15)] transition-all flex items-center gap-2">
                        <Download size={16} />
                        Export
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-linear-to-br from-[#c9a87c] to-[#b89c7e] rounded-lg text-[13px] font-medium text-[#0a0a0c] hover:shadow-lg hover:shadow-[#c9a87c]/20 transition-all">
                        <Plus size={16} strokeWidth={2} />
                        New Appointment
                    </button>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9a9aa3]" size={16} />
                    <input
                        type="text"
                        placeholder="Search appointments..."
                        className="w-full pl-10 pr-4 py-2.5 bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-lg text-[13px] text-[#e8e8ea] placeholder-[#9a9aa3] focus:outline-none focus:border-[rgba(255,255,255,0.15)] transition-all"
                    />
                </div>
                <button className="px-4 py-2.5 bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-lg text-[13px] font-medium text-[#e8e8ea] hover:border-[rgba(255,255,255,0.15)] transition-all flex items-center gap-2">
                    <Filter size={16} />
                    Filter
                </button>
            </div>

            <div className="grid grid-cols-4 gap-4">
                <div className="bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                            <CheckCircle size={20} className="text-emerald-400" strokeWidth={1.5} />
                        </div>
                        <span className="text-[13px] text-[#9a9aa3]">Confirmed</span>
                    </div>
                    <p className="text-[24px] font-medium text-[#e8e8ea]">24</p>
                </div>

                <div className="bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                            <AlertCircle size={20} className="text-amber-400" strokeWidth={1.5} />
                        </div>
                        <span className="text-[13px] text-[#9a9aa3]">Pending</span>
                    </div>
                    <p className="text-[24px] font-medium text-[#e8e8ea]">8</p>
                </div>

                <div className="bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                            <CheckCircle size={20} className="text-blue-400" strokeWidth={1.5} />
                        </div>
                        <span className="text-[13px] text-[#9a9aa3]">Completed</span>
                    </div>
                    <p className="text-[24px] font-medium text-[#e8e8ea]">142</p>
                </div>

                <div className="bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                            <XCircle size={20} className="text-red-400" strokeWidth={1.5} />
                        </div>
                        <span className="text-[13px] text-[#9a9aa3]">Cancelled</span>
                    </div>
                    <p className="text-[24px] font-medium text-[#e8e8ea]">6</p>
                </div>
            </div>

            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3">
                {appointments?.map((apt) => {
                    const StatusIcon = statusIcons[apt.schedule.status as keyof typeof statusIcons] ?? AlertCircle;
                    const statusColor = statusColors[apt.schedule.status as keyof typeof statusColors] ?? statusColors["0"];
    
                    return (
                        <div
                            key={apt.schedule.id}
                            className="flex flex-col gap-5 rounded-xs bg-[#151518] border-(--border) border p-4 hover:bg-[#1a1a1e]/50 transition-all cursor-pointer group"
                        >
                                    
                            <div className='flex justify-between w-full'>
                                <p className="text-[14px] font-medium text-(--teal) shrink-0 text-right">
                                    ₱{apt.service.price}
                                </p>
                                <div className={`shrink-0 px-2.5 py-1 rounded-md border text-[11px] font-medium flex items-center gap-1.5 ${statusColor}`}>
                                    <StatusIcon size={12} />
                                        {apt.schedule.status}
                                </div>
                            </div>

                            <div className='flex items-center gap-2'>
                                <img className='rounded-[50%] border border-(--gold) w-11 h-11' src={apt.user.avatarUrl} alt="" />
                                <div>
                                    <h2 className='text-(--text-2) uppercase font-semibold text-xs'>Reserved for</h2>
                                    <h1 className='text-(--text-1) font-semibold text-[18px] tracking-tight'>{apt.user.firstName} {apt.user.lastName}</h1>
                                </div>
                            </div>

                            <div className='text-(--text-3) gap-2 flex items-center'>
                                <hr className='w-full' />
                                    <Diamond size={8} className='shrink-0' />
                                <hr className='w-full' />
                            </div>

                            <div>
                                <p className='text-xs uppercase font-semibold text-(--text-2)'>service</p>
                                <h1 className='text-base text-(--text-1)'>{apt.service.serviceName}</h1>
                                <p className='text-xs text-(--text-2)'>with {apt.staff.fullName}</p>
                            </div>

                            <div className='text-(--text-3) gap-2 flex items-center'>
                                <hr className='w-full' />
                                <Diamond size={8} className='shrink-0' />
                                <hr className='w-full' />
                            </div>

                            <div className='flex justify-between'>
                                <div>
                                    <p className='text-(--text-2) text-xs font-medium'>DATE</p>
                                    <p className='text-(--text-1) text-sm'>{new Date(apt.schedule.startsAt).toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                                </div>
                                <div>
                                    <p className='text-(--text-2) text-xs font-medium'>TIME</p>
                                    <p className='text-(--text-1) text-sm'>{new Date(apt.schedule.startsAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                </div>
                                <div>
                                    <p className='text-(--text-2) text-xs font-medium'>DURATION</p>
                                    <p className='text-(--text-1) text-sm'>{formatDuration(Number(apt.service.duration))}</p>
                                </div>
                            </div>

                            <div className='flex flex-col gap-2'>
                                {apt.schedule.status === "CONFIRMED" && 
                                    <>
                                    <button 
                                        className={`bg-[#c70000]/80 py-2 rounded-xs border ${hasAppointmentPassed(new Date(apt.schedule.startsAt), business?.timezone!) ? 'cursor-pointer' : 'cursor-not-allowed'} hover:border-[#c70000] flex justify-center items-center gap-2 text-(--text-1) font-semibold`}
                                        onClick={() => confirmAppointment(apt.schedule.id, "MISSED")}
                                        disabled={updating?.schedId === apt.schedule.id || !hasAppointmentPassed(new Date(apt.schedule.startsAt), business?.timezone!)}
                                    >
                                        {updating?.schedId === apt.schedule.id && updating?.buttonId === 'MISSED' && updating?.status ?
                                            <div
                                                className='rounded-[50%] mx-auto w-6 h-6 border-2 border-b-(--teal) animate-spin'
                                            >

                                            </div>
                                            : <span>missed appointment</span>}
                                    </button>
                                    <button
                                        className={`py-2 text-(--text-1) ${hasAppointmentPassed(new Date(apt.schedule.startsAt), business?.timezone!) ? 'cursor-pointer' : 'cursor-not-allowed'} font-semibold hover:border-(--teal) rounded-xs bg-emerald-500/80 border`}
                                        onClick={() => completeAppointment(apt.schedule.id)}
                                        disabled={updating?.schedId === apt.schedule.id || !hasAppointmentPassed(new Date(apt.schedule.startsAt), business?.timezone!)}
                                    >
                                        {updating?.schedId === apt.schedule.id && updating?.buttonId === 'COMPLETED' && updating?.status ?
                                            <div
                                                className='rounded-[50%] mx-auto w-6 h-6 border-2 border-b-(--teal) animate-spin'
                                            >

                                            </div>
                                            : <span>Mark as complete</span>}
                                    </button>
                                    </>
                                }
                                {apt.schedule.status === "PENDING" && 
                                <>
                                <button
                                    className={`btn-primary rounded-xs py-2 font-bold tracking-tight`}
                                    onClick={() => confirmAppointment(apt.schedule.id, "CONFIRMED")}
                                    disabled={(updating?.schedId === apt.schedule.id && updating?.buttonId === 'CONFIRMED' && updating.status)}
                                >
                                    {updating?.schedId === apt.schedule.id && updating?.buttonId === 'CONFIRMED' && updating?.status ? 
                                        <div
                                            className='rounded-[50%] mx-auto w-6 h-6 b border-2 border-b-(--teal) animate-spin'
                                        >

                                        </div>
                                        : <span>Confirm booking</span>}
                                </button>
                                <button className='btn-secondary rounded-xs py-2'>Reject</button>
                                </>
                                }
                            </div>

                        </div>
                    );
                })}
            </div>
        </div>
    );

}

function ErrorMessage ({ error }: Readonly<{ error: string }>) {
    return (
        <div className="w-95 rounded-2xl border bg-[#221214] border-[#6b1f28] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] p-5 flex gap-4 items-start fixed z-50 bottom-4 right-4 overflow-hidden opacity-0 translate-y-2 animate-[fade-in_0.4s_ease-out_forwards] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.75)] hover:-translate-y-0.5">
            <div className="absolute left-0 top-0 bottom-0 w-0.75 bg-linear-to-b from-[#e0453f]/80 via-[#c93a35] to-[#e0453f]/40" />

            <div className="absolute inset-0 rounded-2xl pointer-events-none ring-1 ring-inset ring-[#d4af37]/8" />

            <div className="shrink-0 mt-0.5">
                <div className="w-9 h-9 rounded-full bg-[#c93a35]/10 border border-[#c93a35]/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#e0645f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12.5" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                </div>
            </div>

            <div className="flex-1 min-w-0 pr-1">
                <h4 className="text-[14.5px] font-semibold text-[#f2f0ea] tracking-[-0.01em] leading-snug">
                    Couldn't complete appointment
                </h4>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#a8a5a0] font-normal">
                    {error}
                </p>
                <div className="mt-3 h-px w-full bg-linear-to-r from-[#d4af37]/20 via-[#d4af37]/5 to-transparent" />
            </div>

            <button className="shrink-0 mt-0.5 w-6 h-6 rounded-md flex items-center justify-center text-[#6b6864] hover:text-[#d4af37] hover:bg-white/4 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </button>
        </div>
    );
}