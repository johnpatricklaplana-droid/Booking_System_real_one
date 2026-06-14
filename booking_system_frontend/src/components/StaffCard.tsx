interface StaffCardProps {
    name: string;
    role: string;
    appointments: number;
    revenue: string;
    availability: 'available' | 'busy' | 'offline';
    initials: string;
    accent: string;
}

export function StaffCard({ name, role, appointments, revenue, availability, initials, accent }: StaffCardProps) {
    const statusColors = {
        available: 'bg-emerald-500',
        busy: 'bg-amber-500',
        offline: 'bg-[#9a9aa3]'
    };

    return (
        <div className="bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-xl p-5 hover:border-[rgba(255,255,255,0.12)] transition-all group">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div
                            className="w-12 h-12 rounded-full flex items-center justify-center text-[14px] font-medium text-[#0a0a0c]"
                            style={{ background: `linear-gradient(135deg, ${accent}, ${accent}dd)` }}
                        >
                            {initials}
                        </div>
                        <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-[#151518] ${statusColors[availability]}`} />
                    </div>
                    <div>
                        <p className="text-[14px] font-medium text-[#e8e8ea]">{name}</p>
                        <p className="text-[12px] text-[#9a9aa3]">{role}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <p className="text-[11px] text-[#9a9aa3] mb-1">Today's appointments</p>
                    <p className="text-[18px] font-medium text-[#e8e8ea]">{appointments}</p>
                </div>
                <div>
                    <p className="text-[11px] text-[#9a9aa3] mb-1">Revenue (MTD)</p>
                    <p className="text-[18px] font-medium text-[#e8e8ea]">{revenue}</p>
                </div>
            </div>
        </div>
    );
}
