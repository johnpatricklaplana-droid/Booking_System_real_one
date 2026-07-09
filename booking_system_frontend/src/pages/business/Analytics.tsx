import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Users, Calendar, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useUser } from '../../provider/UserContext';
import { get } from '../../api/api';
import { fillMonths } from '../../hooks/service';
import type { BusinessTotals, FullAnalytics, MonthlyStats } from '../../interfaces/Types';

interface ServiceData  {
    name: string;
    value: number;
    color: string;
};

interface HourlyData {
    hour: string;
    bookings: number;
}

export function Analytics() {

    const business = useUser().activeBusiness;

    const [monthlyStats, setMonthlyStats] = useState<MonthlyStats[]>();
    const [totals, setTotals] = useState<BusinessTotals | null>(null);
    const [averageRating, setAverageRating] = useState<number | null>(null);
    const [serviceData, setServiceData] = useState<ServiceData[]>([]);
    const [hourlyData, setHourlyData] = useState<HourlyData[]>([]);

    useEffect(() => {

        if(!business?.businessId) return;

        const CHART_COLORS = ['#c9a87c', '#9d8fb5', '#6b9fa3', '#b89c7e', '#a3766b', '#7c9ac9'];

        const url = `http://localhost:8080/api/business/${business.businessId}`;

        const getIt = async () => {
            const result: FullAnalytics = await get(url);
            console.log(result);
            setMonthlyStats(fillMonths(result.monthlyStats));
            setTotals(result.businessTotals);
            setAverageRating(result.averageRating);
            const total = result.serviceDistribution.reduce((prev, cur) => 
                prev + cur.bookingCount , 0);
            setServiceData(result.serviceDistribution.map((sd, i) => {
                    return {
                        name: sd.serviceName,
                        value: Math.round((sd.bookingCount / total) * 100),
                        color: CHART_COLORS[i]
                    }
                }
            ));
            setHourlyData(result.peakHour.map(ph => {
                return {
                    hour: new Date(2000, 0, 1, ph.hour).toLocaleString('en-US', { hour: '2-digit', hour12: true }),
                    bookings: ph.bookingCount
                }
            }));
        };

        getIt();

    }, [business?.businessId]);

    return (
        <div className="space-y-6 p-8 overflow-y-auto h-screen">
            <div>
                <h2 className="text-[20px] font-medium text-[#e8e8ea] mb-1">Analytics</h2>
                <p className="text-[13px] text-[#9a9aa3]">Performance insights and metrics</p>
            </div>

            <div className="grid grid-cols-4 gap-6">
                <div className="bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-[#c9a87c] to-transparent opacity-5 blur-3xl" />
                    <div className="relative">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 rounded-lg bg-[#c9a87c]/10 flex items-center justify-center">
                                <DollarSign size={20} className="text-[#c9a87c]" strokeWidth={1.5} />
                            </div>
                            <div className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full text-[11px] font-medium flex items-center gap-1">
                                <TrendingUp size={12} />
                                +15.3%
                            </div>
                        </div>
                        <p className="text-[13px] text-[#9a9aa3] mb-1">All time Revenue</p>
                        <p className="text-[28px] font-medium text-[#e8e8ea] tracking-tight">₱{totals?.totalRevenue ? totals?.totalRevenue.toLocaleString() : '0'}</p>
                    </div>
                </div>

                <div className="bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-[#9d8fb5] to-transparent opacity-5 blur-3xl" />
                    <div className="relative">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 rounded-lg bg-[#9d8fb5]/10 flex items-center justify-center">
                                <Calendar size={20} className="text-[#9d8fb5]" strokeWidth={1.5} />
                            </div>
                            <div className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full text-[11px] font-medium flex items-center gap-1">
                                <TrendingUp size={12} />
                                +12.5%
                            </div>
                        </div>
                        <p className="text-[13px] text-[#9a9aa3] mb-1">Total Bookings</p>
                        <p className="text-[28px] font-medium text-[#e8e8ea] tracking-tight">{totals?.totalBookings}</p>
                    </div>
                </div>

                <div className="bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-[#6b9fa3] to-transparent opacity-5 blur-3xl" />
                    <div className="relative">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 rounded-lg bg-[#6b9fa3]/10 flex items-center justify-center">
                                <Users size={20} className="text-[#6b9fa3]" strokeWidth={1.5} />
                            </div>
                            <div className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full text-[11px] font-medium flex items-center gap-1">
                                <TrendingUp size={12} />
                                +8.2%
                            </div>
                        </div>
                        <p className="text-[13px] text-[#9a9aa3] mb-1">Total Customers</p>
                        <p className="text-[28px] font-medium text-[#e8e8ea] tracking-tight">{totals?.totalCustomer ? totals?.totalCustomer.toLocaleString() : '0'}</p>
                    </div>
                </div>

                <div className="bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-[#b89c7e] to-transparent opacity-5 blur-3xl" />
                    <div className="relative">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 rounded-lg bg-[#b89c7e]/10 flex items-center justify-center">
                                <Star size={20} className="text-[#b89c7e]" strokeWidth={1.5} />
                            </div>
                            <div className="px-2 py-0.5 bg-red-500/10 text-red-400 rounded-full text-[11px] font-medium flex items-center gap-1">
                                <TrendingDown size={12} />
                                -2.1%
                            </div>
                        </div>
                        <p className="text-[13px] text-[#9a9aa3] mb-1">Avg. Rating</p>
                        <p className="text-[28px] font-medium text-[#e8e8ea] tracking-tight">{averageRating ?? '0'}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-xl p-6">
                    <div className="mb-6">
                        <h3 className="text-[15px] font-medium text-[#e8e8ea] mb-1">Revenue & Bookings</h3>
                        <p className="text-[13px] text-[#9a9aa3]">12-month trend analysis</p>
                    </div>
                    <ResponsiveContainer width="100%" height={280}>
                        <AreaChart data={monthlyStats}>
                            <defs>
                                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#c9a87c" stopOpacity={0.3} />
                                    <stop offset="100%" stopColor="#c9a87c" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="bookingsGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#9d8fb5" stopOpacity={0.3} />
                                    <stop offset="100%" stopColor="#9d8fb5" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                            <XAxis dataKey="month" stroke="#9a9aa3" tick={{ fill: '#9a9aa3', fontSize: 11 }} tickLine={false} axisLine={false} />
                            <YAxis stroke="#9a9aa3" tick={{ fill: '#9a9aa3', fontSize: 11 }} tickLine={false} axisLine={false} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1a1a1e',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '8px',
                                    fontSize: '12px'
                                }}
                            />
                            <Area type="monotone" dataKey="revenueOfTheMonth" stroke="#c9a87c" strokeWidth={2} fill="url(#revenueGrad)" />
                            <Area type="monotone" dataKey="bookingsOfTheMonth" stroke="#9d8fb5" strokeWidth={2} fill="url(#bookingsGrad)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-xl p-6">
                    <div className="mb-6">
                        <h3 className="text-[15px] font-medium text-[#e8e8ea] mb-1">Service Distribution</h3>
                        <p className="text-[13px] text-[#9a9aa3]">By booking volume</p>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie
                                data={serviceData}
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={80}
                                paddingAngle={2}
                                dataKey="value"
                            >
                                {serviceData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="space-y-2 mt-6">
                        {serviceData.map((service) => (
                            <div key={service.name} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded" style={{ backgroundColor: service.color }} />
                                    <span className="text-[12px] text-[#9a9aa3]">{service.name}</span>
                                </div>
                                <span className="text-[12px] font-medium text-[#e8e8ea]">{service.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-xl p-6">
                <div className="mb-6">
                    <h3 className="text-[15px] font-medium text-[#e8e8ea] mb-1">Peak Hours</h3>
                    <p className="text-[13px] text-[#9a9aa3]">Booking distribution by time of day</p>
                </div>
                <ResponsiveContainer width="100%" height={240}>
                    <BarChart data={hourlyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis dataKey="hour" stroke="#9a9aa3" tick={{ fill: '#9a9aa3', fontSize: 11 }} tickLine={false} axisLine={false} />
                        <YAxis stroke="#9a9aa3" tick={{ fill: '#9a9aa3', fontSize: 11 }} tickLine={false} axisLine={false} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#1a1a1e',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '8px',
                                fontSize: '12px'
                            }}
                        />
                        <Bar dataKey="bookings" fill="#6b9fa3" radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
