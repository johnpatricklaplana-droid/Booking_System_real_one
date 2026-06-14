import type { LucideIcon } from 'lucide-react';

interface MetricsCardProps {
    title: string;
    value: string;
    change: string;
    trend: 'up' | 'down';
    icon: LucideIcon;
    accent: string;
}

export function MetricsCard({ title, value, change, trend, icon: Icon, accent }: MetricsCardProps) {
    return (
        <div className="relative bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-xl p-6 backdrop-blur-xl overflow-hidden group hover:border-[rgba(255,255,255,0.12)] transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-5 blur-3xl transition-opacity group-hover:opacity-10" style={{ background: `radial-gradient(circle, ${accent}, transparent)` }} />

            <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${accent}15` }}>
                        <Icon size={20} strokeWidth={1.5} style={{ color: accent }} />
                    </div>
                    <div className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${trend === 'up' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                        {change}
                    </div>
                </div>

                <h3 className="text-[13px] text-[#9a9aa3] mb-1">{title}</h3>
                <p className="text-[28px] font-medium text-[#e8e8ea] tracking-tight">{value}</p>
            </div>
        </div>
    );
}
