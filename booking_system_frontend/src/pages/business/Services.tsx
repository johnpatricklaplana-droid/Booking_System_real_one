import { Search, Filter, Plus, Clock, DollarSign, TrendingUp, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const services = [
    {
        id: '1',
        name: 'Hair Styling',
        category: 'Beauty',
        duration: '45 min',
        price: '$85',
        bookings: 124,
        revenue: '$10,540',
        popularity: 92,
        staff: ['Sarah Mitchell', 'Emma Davis'],
        accent: '#c9a87c',
    },
    {
        id: '2',
        name: 'Deep Tissue Massage',
        category: 'Wellness',
        duration: '60 min',
        price: '$120',
        bookings: 98,
        revenue: '$11,760',
        popularity: 88,
        staff: ['Alex Rivera', 'Jordan Lee'],
        accent: '#9d8fb5',
    },
    {
        id: '3',
        name: 'Consultation',
        category: 'Professional',
        duration: '30 min',
        price: '$60',
        bookings: 86,
        revenue: '$5,160',
        popularity: 75,
        staff: ['David Kim'],
        accent: '#6b9fa3',
    },
    {
        id: '4',
        name: 'Personal Training',
        category: 'Fitness',
        duration: '90 min',
        price: '$150',
        bookings: 142,
        revenue: '$21,300',
        popularity: 95,
        staff: ['Mike Thompson', 'Chris Wilson'],
        accent: '#b89c7e',
    },
    {
        id: '5',
        name: 'Facial Treatment',
        category: 'Beauty',
        duration: '60 min',
        price: '$95',
        bookings: 76,
        revenue: '$7,220',
        popularity: 82,
        staff: ['Sarah Mitchell'],
        accent: '#c9a87c',
    },
    {
        id: '6',
        name: 'Yoga Session',
        category: 'Fitness',
        duration: '45 min',
        price: '$70',
        bookings: 68,
        revenue: '$4,760',
        popularity: 78,
        staff: ['Mike Thompson'],
        accent: '#9d8fb5',
    },
];

const categories = ['All', 'Beauty', 'Wellness', 'Fitness', 'Professional'];

export function Services() {

    const navigate = useNavigate();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-[20px] font-medium text-[#e8e8ea] mb-1">Services</h2>
                    <p className="text-[13px] text-[#9a9aa3]">Manage your service offerings</p>
                </div>
                <button 
                    className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-br from-[#c9a87c] to-[#b89c7e] rounded-lg text-[13px] font-medium text-[#0a0a0c] hover:shadow-lg hover:shadow-[#c9a87c]/20 transition-all"
                    onClick={() => navigate('/business/add-services')}
                >
                    <Plus size={16} strokeWidth={2} />
                    Add Service
                </button>
            </div>

            <div className="flex items-center gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9a9aa3]" size={16} />
                    <input
                        type="text"
                        placeholder="Search services..."
                        className="w-full pl-10 pr-4 py-2.5 bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-lg text-[13px] text-[#e8e8ea] placeholder-[#9a9aa3] focus:outline-none focus:border-[rgba(255,255,255,0.15)] transition-all"
                    />
                </div>
                <button className="px-4 py-2.5 bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-lg text-[13px] font-medium text-[#e8e8ea] hover:border-[rgba(255,255,255,0.15)] transition-all flex items-center gap-2">
                    <Filter size={16} />
                    Filter
                </button>
            </div>

            <div className="flex gap-2">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-all ${cat === 'All'
                                ? 'bg-[#1a1a1e] text-[#e8e8ea]'
                                : 'text-[#9a9aa3] hover:bg-[#1a1a1e] hover:text-[#e8e8ea]'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-4 gap-6">
                <div className="bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-xl p-6">
                    <div className="w-10 h-10 rounded-lg bg-[#c9a87c]/10 flex items-center justify-center mb-4">
                        <DollarSign size={20} className="text-[#c9a87c]" strokeWidth={1.5} />
                    </div>
                    <p className="text-[13px] text-[#9a9aa3] mb-1">Total Revenue</p>
                    <p className="text-[24px] font-medium text-[#e8e8ea]">$60,740</p>
                </div>

                <div className="bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-xl p-6">
                    <div className="w-10 h-10 rounded-lg bg-[#9d8fb5]/10 flex items-center justify-center mb-4">
                        <Users size={20} className="text-[#9d8fb5]" strokeWidth={1.5} />
                    </div>
                    <p className="text-[13px] text-[#9a9aa3] mb-1">Total Bookings</p>
                    <p className="text-[24px] font-medium text-[#e8e8ea]">594</p>
                </div>

                <div className="bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-xl p-6">
                    <div className="w-10 h-10 rounded-lg bg-[#6b9fa3]/10 flex items-center justify-center mb-4">
                        <TrendingUp size={20} className="text-[#6b9fa3]" strokeWidth={1.5} />
                    </div>
                    <p className="text-[13px] text-[#9a9aa3] mb-1">Avg. Price</p>
                    <p className="text-[24px] font-medium text-[#e8e8ea]">$102</p>
                </div>

                <div className="bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-xl p-6">
                    <div className="w-10 h-10 rounded-lg bg-[#b89c7e]/10 flex items-center justify-center mb-4">
                        <Clock size={20} className="text-[#b89c7e]" strokeWidth={1.5} />
                    </div>
                    <p className="text-[13px] text-[#9a9aa3] mb-1">Avg. Duration</p>
                    <p className="text-[24px] font-medium text-[#e8e8ea]">65 min</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                {services.map((service) => (
                    <div
                        key={service.id}
                        className="bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-xl p-6 hover:border-[rgba(255,255,255,0.12)] transition-all group cursor-pointer"
                    >
                        <div className="flex items-start justify-between mb-5">
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: `${service.accent}20` }}
                                >
                                    <div className="w-6 h-6 rounded" style={{ backgroundColor: service.accent }} />
                                </div>
                                <div>
                                    <h3 className="text-[15px] font-medium text-[#e8e8ea] mb-0.5">{service.name}</h3>
                                    <p className="text-[12px] text-[#9a9aa3]">{service.category}</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-5 pb-5 border-b border-[rgba(255,255,255,0.06)]">
                            <div className="flex items-center gap-2">
                                <Clock size={16} className="text-[#9a9aa3]" />
                                <div>
                                    <p className="text-[11px] text-[#9a9aa3]">Duration</p>
                                    <p className="text-[13px] font-medium text-[#e8e8ea]">{service.duration}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <DollarSign size={16} className="text-[#9a9aa3]" />
                                <div>
                                    <p className="text-[11px] text-[#9a9aa3]">Price</p>
                                    <p className="text-[13px] font-medium text-[#e8e8ea]">{service.price}</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-5">
                            <div>
                                <p className="text-[11px] text-[#9a9aa3] mb-1">Bookings</p>
                                <p className="text-[18px] font-medium text-[#e8e8ea]">{service.bookings}</p>
                            </div>
                            <div>
                                <p className="text-[11px] text-[#9a9aa3] mb-1">Revenue</p>
                                <p className="text-[18px] font-medium text-[#e8e8ea]">{service.revenue}</p>
                            </div>
                            <div>
                                <p className="text-[11px] text-[#9a9aa3] mb-1">Popularity</p>
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 h-1.5 bg-[#1a1a1e] rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all"
                                            style={{ width: `${service.popularity}%`, backgroundColor: service.accent }}
                                        />
                                    </div>
                                    <span className="text-[11px] font-medium text-[#e8e8ea]">{service.popularity}%</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <p className="text-[11px] text-[#9a9aa3] mb-2">Staff</p>
                            <div className="flex gap-2">
                                {service.staff.map((staff, i) => (
                                    <div
                                        key={i}
                                        className="px-2.5 py-1 bg-[#1a1a1e] rounded-lg text-[11px] text-[#e8e8ea]"
                                    >
                                        {staff}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
