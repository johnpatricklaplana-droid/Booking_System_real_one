import { Search, Filter, CalendarX2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useUser } from '../../provider/UserContext';
import { get } from '../../api/api';
import type { Appointment } from '../../interfaces/Types';
import { durationAsMinutes } from '../../hooks/service';
import AppointmentCard from '../../components/AppointmentCard';
import { API_URL } from '../../api/config';

export function Appointments() {

    const business = useUser().activeBusiness;

    const [appointments, setAppointments] = useState<Appointment[] | null>(null);

    useEffect(() => {
        if(!business) return;

        const getIt = async () => {
            const url = `${API_URL}/api/schedule/business/${business.businessId}`;

            const result: Appointment[] = await get(url);

            result.forEach(r => {
                r.service.duration = durationAsMinutes(r.service.duration);
            });

            console.log(result);
            setAppointments(result);
        };

        getIt();

    }, [business?.businessId]);

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
        <div className="space-y-6">

            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-[20px] font-medium text-[#e8e8ea] mb-1">Appointments</h2>
                    <p className="text-[13px] text-[#9a9aa3]">Manage all bookings and reservations</p>
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
                <div className="grid gap-4 grid-cols-1 lg:grid-cols-3 sm:grid-cols-2">
                    {pendingAppointments?.map((apt) => {
                        return <AppointmentCard setAppointments={setAppointments} key={apt.schedule.id} apt={apt} />
                    })}
                </div>
            </div>

            <div>
                <h1 className='text-[22px] text-(--text-2) mb-4 tracking-wide font-medium'>Upcoming appointments</h1>
                <div className="grid gap-4 grid-cols-1 lg:grid-cols-3 sm:grid-cols-2">
                    {upcomingAppointment?.map((apt) => {
                        return <AppointmentCard setAppointments={setAppointments} key={apt.schedule.id} apt={apt} />
                    })}
                </div>
            </div>

            <div>
                <h1 className='text-[22px] text-(--text-2) mb-4 tracking-wide font-medium'>Completed appointments</h1>
                <div className="grid gap-4 grid-cols-1 lg:grid-cols-3 sm:grid-cols-2">
                    {completedAppointments?.map((apt) => {
                        return <AppointmentCard setAppointments={setAppointments} key={apt.schedule.id} apt={apt} />
                    })}
                </div>
            </div>

            <div>
                <h1 className='text-[22px] text-(--text-2) mb-4 tracking-wide font-medium'>Missed appointments</h1>
                <div className="grid gap-4 grid-cols-1 lg:grid-cols-3 sm:grid-cols-2">
                    {missedAppointments?.map((apt) => {
                        return <AppointmentCard setAppointments={setAppointments} key={apt.schedule.id} apt={apt} />
                    })}
                </div>
            </div>

            <div>
                <h1 className='text-[22px] text-(--text-2) mb-4 tracking-wide font-medium'>Cancelled appointments</h1>
                <div className="grid gap-4 grid-cols-1 lg:grid-cols-3 sm:grid-cols-2">
                    {cancelledAppointments?.map((apt) => {
                        return <AppointmentCard setAppointments={setAppointments} key={apt.schedule.id} apt={apt} />
                    })}
                </div>
            </div>

        </div>
    );

}
