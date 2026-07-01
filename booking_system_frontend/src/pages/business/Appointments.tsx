import { Search, Filter, Download, Plus, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useUser } from '../../provider/UserContext';
import { get } from '../../api/api';
import type { ServiceResponse, Staff } from '../../interfaces/Types';
import { formatDuration } from '../../helper/convertSome';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

// const appointments = [
//     {
//         id: '1',
//         time: '09:00 AM',
//         date: 'Jun 6, 2026',
//         customer: 'Emma Wilson',
//         email: 'emma.wilson@email.com',
//         service: 'Hair Styling',
//         staff: 'Sarah Mitchell',
//         duration: '45 min',
//         price: '$85',
//         status: 'confirmed',
//         accent: '#c9a87c',
//     },
//     {
//         id: '2',
//         time: '10:30 AM',
//         date: 'Jun 6, 2026',
//         customer: 'Michael Chen',
//         email: 'michael.chen@email.com',
//         service: 'Deep Tissue Massage',
//         staff: 'Alex Rivera',
//         duration: '60 min',
//         price: '$120',
//         status: 'confirmed',
//         accent: '#9d8fb5',
//     },
//     {
//         id: '3',
//         time: '12:00 PM',
//         date: 'Jun 6, 2026',
//         customer: 'Lisa Anderson',
//         email: 'lisa.anderson@email.com',
//         service: 'Consultation',
//         staff: 'David Kim',
//         duration: '30 min',
//         price: '$60',
//         status: 'pending',
//         accent: '#6b9fa3',
//     },
//     {
//         id: '4',
//         time: '02:00 PM',
//         date: 'Jun 6, 2026',
//         customer: 'James Taylor',
//         email: 'james.taylor@email.com',
//         service: 'Personal Training',
//         staff: 'Mike Thompson',
//         duration: '90 min',
//         price: '$150',
//         status: 'confirmed',
//         accent: '#b89c7e',
//     },
//     {
//         id: '5',
//         time: '03:30 PM',
//         date: 'Jun 6, 2026',
//         customer: 'Sarah Johnson',
//         email: 'sarah.j@email.com',
//         service: 'Facial Treatment',
//         staff: 'Sarah Mitchell',
//         duration: '60 min',
//         price: '$95',
//         status: 'completed',
//         accent: '#c9a87c',
//     },
//     {
//         id: '6',
//         time: '04:00 PM',
//         date: 'Jun 6, 2026',
//         customer: 'Robert Martinez',
//         email: 'r.martinez@email.com',
//         service: 'Yoga Session',
//         staff: 'Mike Thompson',
//         duration: '45 min',
//         price: '$70',
//         status: 'cancelled',
//         accent: '#9d8fb5',
//     },
// ];

const statusIcons = {
    CONFIRMED: CheckCircle,
    PENDING: AlertCircle,
    "0": CheckCircle,
    CANCELLED: XCircle,
};

const statusColors = {
    CONFIRMED: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    PENDING: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    "0": 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    CANCELLED: 'bg-red-500/10 text-red-400 border-red-500/20',
};

interface Schedule {
    createdAt: string;
    id: string;
    startsAt: string;
    status: string;
}

interface Appointment {
    schedule: Schedule;
    service: ServiceResponse;
    staff: Staff;
}

export function Appointments() {

    const business = useUser().activeBusiness;

    const [appointments, setAppointments] = useState<Appointment[] | null>(null);

    dayjs.extend(duration);

    useEffect(() => {
        if(!business) return;

        const getIt = async () => {
            const url = `http://localhost:8080/api/schedule/business/${business.businessId}`;

            const result: Appointment[] = await get(url);

            result.forEach(r => {
                const dur = dayjs.duration(r.service.duration);
                r.service.duration = dur.asMinutes().toString();
            });

            console.log(result);
            setAppointments(result);
        };

        getIt();

    }, [business?.businessId]);

    return (
        <div className="space-y-6">
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
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-br from-[#c9a87c] to-[#b89c7e] rounded-lg text-[13px] font-medium text-[#0a0a0c] hover:shadow-lg hover:shadow-[#c9a87c]/20 transition-all">
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

            <div className="bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-xl overflow-hidden">

                <div className="bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-xl overflow-hidden">
                    <div className="divide-y divide-[rgba(255,255,255,0.06)]">
                        {appointments?.map((apt) => {
                            const StatusIcon = statusIcons[apt.schedule.status as keyof typeof statusIcons] ?? AlertCircle;
                            const statusColor = statusColors[apt.schedule.status as keyof typeof statusColors] ?? statusColors["0"];
                            const accentColor = {
                                CONFIRMED: '#34d399',
                                PENDING: '#fbbf24',
                                "0": '#60a5fa',
                                CANCELLED: '#f87171',
                            }[apt.schedule.status] ?? '#60a5fa';

                            return (
                                <div
                                    key={apt.schedule.id}
                                    className="flex items-center gap-5 p-4 pl-0 hover:bg-[#1a1a1e]/50 transition-all cursor-pointer group"
                                >
                                    {/* status accent bar */}
                                    <div className="w-1 self-stretch rounded-r-full" style={{ backgroundColor: accentColor }} />

                                    {/* time — dominant */}
                                    <div className="w-[90px] shrink-0">
                                        <p className="text-[16px] font-semibold text-[#e8e8ea] leading-tight">
                                            {new Date(apt.schedule.startsAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                        <p className="text-[11px] text-[#9a9aa3] mt-0.5">
                                            {new Date(apt.schedule.startsAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                        </p>
                                    </div>

                                    {/* customer + service — primary content */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[14px] font-medium text-[#e8e8ea] truncate">TODO: CUSTOMER</p>
                                        <p className="text-[12px] text-[#9a9aa3] truncate">
                                            {apt.service.serviceName} · {apt.staff.fullName} · {formatDuration(Number(apt.service.duration))}
                                        </p>
                                    </div>

                                    {/* price — secondary but clear */}
                                    <p className="text-[14px] font-medium text-[#e8e8ea] shrink-0 w-16 text-right">
                                        ₱{apt.service.price}
                                    </p>

                                    {/* status — the "outcome", visually distinct */}
                                    <div className={`shrink-0 px-2.5 py-1 rounded-md border text-[11px] font-medium flex items-center gap-1.5 ${statusColor}`}>
                                        <StatusIcon size={12} />
                                        {apt.schedule.status}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
