import { Search, Filter, Download, Plus, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const appointments = [
    {
        id: '1',
        time: '09:00 AM',
        date: 'Jun 6, 2026',
        customer: 'Emma Wilson',
        email: 'emma.wilson@email.com',
        service: 'Hair Styling',
        staff: 'Sarah Mitchell',
        duration: '45 min',
        price: '$85',
        status: 'confirmed',
        accent: '#c9a87c',
    },
    {
        id: '2',
        time: '10:30 AM',
        date: 'Jun 6, 2026',
        customer: 'Michael Chen',
        email: 'michael.chen@email.com',
        service: 'Deep Tissue Massage',
        staff: 'Alex Rivera',
        duration: '60 min',
        price: '$120',
        status: 'confirmed',
        accent: '#9d8fb5',
    },
    {
        id: '3',
        time: '12:00 PM',
        date: 'Jun 6, 2026',
        customer: 'Lisa Anderson',
        email: 'lisa.anderson@email.com',
        service: 'Consultation',
        staff: 'David Kim',
        duration: '30 min',
        price: '$60',
        status: 'pending',
        accent: '#6b9fa3',
    },
    {
        id: '4',
        time: '02:00 PM',
        date: 'Jun 6, 2026',
        customer: 'James Taylor',
        email: 'james.taylor@email.com',
        service: 'Personal Training',
        staff: 'Mike Thompson',
        duration: '90 min',
        price: '$150',
        status: 'confirmed',
        accent: '#b89c7e',
    },
    {
        id: '5',
        time: '03:30 PM',
        date: 'Jun 6, 2026',
        customer: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        service: 'Facial Treatment',
        staff: 'Sarah Mitchell',
        duration: '60 min',
        price: '$95',
        status: 'completed',
        accent: '#c9a87c',
    },
    {
        id: '6',
        time: '04:00 PM',
        date: 'Jun 6, 2026',
        customer: 'Robert Martinez',
        email: 'r.martinez@email.com',
        service: 'Yoga Session',
        staff: 'Mike Thompson',
        duration: '45 min',
        price: '$70',
        status: 'cancelled',
        accent: '#9d8fb5',
    },
];

const statusIcons = {
    confirmed: CheckCircle,
    pending: AlertCircle,
    completed: CheckCircle,
    cancelled: XCircle,
};

const statusColors = {
    confirmed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    completed: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    cancelled: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export function Appointments() {
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
                <div className="grid grid-cols-[1fr,1.2fr,1fr,1fr,0.8fr,0.8fr,0.8fr] gap-4 p-4 border-b border-[rgba(255,255,255,0.08)]">
                    <div className="text-[11px] font-medium text-[#9a9aa3] uppercase tracking-wider">Time</div>
                    <div className="text-[11px] font-medium text-[#9a9aa3] uppercase tracking-wider">Customer</div>
                    <div className="text-[11px] font-medium text-[#9a9aa3] uppercase tracking-wider">Service</div>
                    <div className="text-[11px] font-medium text-[#9a9aa3] uppercase tracking-wider">Staff</div>
                    <div className="text-[11px] font-medium text-[#9a9aa3] uppercase tracking-wider">Duration</div>
                    <div className="text-[11px] font-medium text-[#9a9aa3] uppercase tracking-wider">Price</div>
                    <div className="text-[11px] font-medium text-[#9a9aa3] uppercase tracking-wider">Status</div>
                </div>

                <div className="divide-y divide-[rgba(255,255,255,0.08)]">
                    {appointments.map((apt) => {
                        const StatusIcon = statusIcons[apt.status as keyof typeof statusIcons];
                        return (
                            <div
                                key={apt.id}
                                className="grid grid-cols-[1fr,1.2fr,1fr,1fr,0.8fr,0.8fr,0.8fr] gap-4 p-4 hover:bg-[#1a1a1e]/50 transition-all cursor-pointer group"
                            >
                                <div>
                                    <p className="text-[13px] font-medium text-[#e8e8ea] mb-0.5">{apt.time}</p>
                                    <p className="text-[11px] text-[#9a9aa3]">{apt.date}</p>
                                </div>
                                <div>
                                    <p className="text-[13px] font-medium text-[#e8e8ea] mb-0.5">{apt.customer}</p>
                                    <p className="text-[11px] text-[#9a9aa3]">{apt.email}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-1 h-10 rounded-full" style={{ backgroundColor: apt.accent }} />
                                    <p className="text-[13px] text-[#e8e8ea]">{apt.service}</p>
                                </div>
                                <p className="text-[13px] text-[#e8e8ea] flex items-center">{apt.staff}</p>
                                <p className="text-[13px] text-[#9a9aa3] flex items-center">
                                    <Clock size={14} className="mr-1.5" />
                                    {apt.duration}
                                </p>
                                <p className="text-[13px] font-medium text-[#e8e8ea] flex items-center">{apt.price}</p>
                                <div className="flex items-center">
                                    <div className={`px-2.5 py-1 rounded-md border text-[11px] font-medium flex items-center gap-1.5 ${statusColors[apt.status as keyof typeof statusColors]}`}>
                                        <StatusIcon size={12} />
                                        {apt.status}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
