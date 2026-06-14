import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { month: 'Jan', revenue: 42000, bookings: 320 },
    { month: 'Feb', revenue: 48000, bookings: 380 },
    { month: 'Mar', revenue: 51000, bookings: 420 },
    { month: 'Apr', revenue: 58000, bookings: 480 },
    { month: 'May', revenue: 62000, bookings: 510 },
    { month: 'Jun', revenue: 71000, bookings: 590 },
];

export function RevenueChart() {
    return (
        <div className="bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-xl p-6 backdrop-blur-xl">
            <div className="mb-6">
                <h3 className="text-[15px] font-medium text-[#e8e8ea] mb-1">Revenue Overview</h3>
                <p className="text-[13px] text-[#9a9aa3]">Last 6 months performance</p>
            </div>

            <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#c9a87c" stopOpacity={0.3} />
                            <stop offset="100%" stopColor="#c9a87c" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis
                        dataKey="month"
                        stroke="#9a9aa3"
                        tick={{ fill: '#9a9aa3', fontSize: 11 }}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="#9a9aa3"
                        tick={{ fill: '#9a9aa3', fontSize: 11 }}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value / 1000}k`}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#1a1a1e',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '8px',
                            fontSize: '12px'
                        }}
                        labelStyle={{ color: '#e8e8ea' }}
                        itemStyle={{ color: '#c9a87c' }}
                    />
                    <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#c9a87c"
                        strokeWidth={2}
                        fill="url(#revenueGradient)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
