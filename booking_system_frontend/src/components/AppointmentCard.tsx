interface AppointmentCardProps {
    time: string;
    duration: string;
    customer: string;
    service: string;
    staff: string;
    status: 'confirmed' | 'pending' | 'completed';
    accent: string;
}

export function AppointmentCard({ time, duration, customer, service, staff, status, accent }: AppointmentCardProps) {
    const statusColors = {
        confirmed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        completed: 'bg-[#9a9aa3]/10 text-[#9a9aa3] border-[#9a9aa3]/20'
    };

    return (
        <div className="bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-lg p-4 hover:border-[rgba(255,255,255,0.12)] transition-all group">
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                    <div className="w-1 h-12 rounded-full" style={{ backgroundColor: accent }} />
                    <div>
                        <p className="text-[15px] font-medium text-[#e8e8ea] mb-0.5">{time}</p>
                        <p className="text-[12px] text-[#9a9aa3]">{duration}</p>
                    </div>
                </div>
                <div className={`px-2.5 py-1 rounded-md border text-[11px] font-medium ${statusColors[status]}`}>
                    {status}
                </div>
            </div>

            <div className="space-y-2 ml-4">
                <div>
                    <p className="text-[13px] text-[#9a9aa3]">Customer</p>
                    <p className="text-[14px] text-[#e8e8ea]">{customer}</p>
                </div>
                <div className="flex gap-4">
                    <div>
                        <p className="text-[11px] text-[#9a9aa3]">Service</p>
                        <p className="text-[13px] text-[#e8e8ea]">{service}</p>
                    </div>
                    <div>
                        <p className="text-[11px] text-[#9a9aa3]">Staff</p>
                        <p className="text-[13px] text-[#e8e8ea]">{staff}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
