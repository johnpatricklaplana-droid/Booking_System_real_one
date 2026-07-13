import { Search, Filter, Download, Plus, CheckCircle, XCircle, AlertCircle, Diamond, CalendarX2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useUser } from '../../provider/UserContext';
import { get, update } from '../../api/api';
import type { Appointment } from '../../interfaces/Types';
import { formatDuration } from '../../helper/convertSome';
import { durationAsMinutes, hasAppointmentPassed } from '../../hooks/service';
import { ErrorMessage } from '../../components/BottomErrorMessage';
import AppointmentCard from '../../components/AppointmentCard';

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

    const pendingAppointments = useMemo(() => {

        if(!appointments) return;

        return appointments.filter(app => app.schedule.status === 'PENDING');

    }, [appointments]);

    const upcomingAppointment = useMemo(() => {

        if (!appointments) return;

        return appointments.filter(app => app.schedule.status === 'CONFIRMED');

    }, [appointments]);

    const missedAppointments = useMemo(() => {

        if (!appointments) return;

        return appointments.filter(app => app.schedule.status === 'MISSED');

    }, [appointments]);

    const completedAppointments = useMemo(() => {

        if (!appointments) return;

        return appointments.filter(app => app.schedule.status === 'COMPLETED');

    }, [appointments]);

    const cancelledAppointments = useMemo(() => {

        if (!appointments) return;

        return appointments.filter(app => app.schedule.status === 'CANCELLED');

    }, [appointments]);

    return (
        <div className="space-y-6 h-screen overflow-y-auto p-8">

            {errorMessage ? <ErrorMessage success={false} message={errorMessage} head="Couldn' t complete appointment" /> : ''}

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

            {appointments?.length === 0 && (
                <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
                    <div className="w-14 h-14 rounded-full bg-[#151518] border border-(--border) flex items-center justify-center">
                        <CalendarX2 size={22} className="text-(--text-3)" strokeWidth={1.5} />
                    </div>
                    <div>
                        <p className="text-(--text-1) text-[15px] font-medium">No appointments yet</p>
                        <p className="text-(--text-2) text-[13px] mt-1">Bookings for this business will show up here</p>
                    </div>
                </div>
            )}

            <div>
                <h1 className='text-[22px] text-(--text-2) mb-4 tracking-wide font-medium'>Pending appointments</h1>
                <div className="grid gap-4 grid-cols-2 sm:grid-cols-3">
                    {pendingAppointments?.map((apt) => {
                        return <AppointmentCard apt={apt} />
                    })}
                </div>
            </div>

            <div>
                <h1 className='text-[22px] text-(--text-2) mb-4 tracking-wide font-medium'>Upcoming appointments</h1>
                <div className="grid gap-4 grid-cols-2 sm:grid-cols-3">
                    {upcomingAppointment?.map((apt) => {
                        return <AppointmentCard apt={apt} />
                    })}
                </div>
            </div>

            <div>
                <h1 className='text-[22px] text-(--text-2) mb-4 tracking-wide font-medium'>Completed appointments</h1>
                <div className="grid gap-4 grid-cols-2 sm:grid-cols-3">
                    {completedAppointments?.map((apt) => {
                        return <AppointmentCard apt={apt} />
                    })}
                </div>
            </div>

            <div>
                <h1 className='text-[22px] text-(--text-2) mb-4 tracking-wide font-medium'>Missed appointments</h1>
                <div className="grid gap-4 grid-cols-2 sm:grid-cols-3">
                    {missedAppointments?.map((apt) => {
                        return <AppointmentCard apt={apt} />
                    })}
                </div>
            </div>

            <div>
                <h1 className='text-[22px] text-(--text-2) mb-4 tracking-wide font-medium'>Cancelled appointments</h1>
                <div className="grid gap-4 grid-cols-2 sm:grid-cols-3">
                    {cancelledAppointments?.map((apt) => {
                        return <AppointmentCard apt={apt} />
                    })}
                </div>
            </div>

        </div>
    );

}
