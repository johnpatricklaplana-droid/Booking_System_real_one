import { Search, Filter, Plus, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ServiceBox } from '../../components/ServiceBox';
import { useEffect, useState } from 'react';
import type { ServiceWithRatings } from '../../interfaces/Types';
import { useUser } from '../../provider/UserContext';
import { getServices } from '../../hooks/service';

const categories = ['All', 'Beauty', 'Wellness', 'Fitness', 'Professional'];

export function Services() {

    const business = useUser().activeBusiness;

    const [services, setServices] = useState<ServiceWithRatings[] | null>(null);

    useEffect(() => {

        if(!business?.businessId) return;

        const getIt = async () => {
            setServices(await getServices(business.businessId));
        };

        getIt();

    }, [business?.businessId]);

    const navigate = useNavigate();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-[20px] font-medium text-[#e8e8ea] mb-1">Services</h2>
                    <p className="text-[13px] text-[#9a9aa3]">Manage your service offerings</p>
                </div>
                <button 
                    className="flex items-center gap-2 px-4 py-2.5 bg-linear-to-br from-[#c9a87c] to-[#b89c7e] rounded-lg text-[13px] font-medium text-[#0a0a0c] hover:shadow-lg hover:shadow-[#c9a87c]/20 transition-all"
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

            <div className="flex gap-2 overflow-x-auto scrollbar-none">
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

            {services?.length === 0 && (
                <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
                    <div className="w-14 h-14 rounded-full bg-[#151518] border border-(--border) flex items-center justify-center">
                        <Users size={22} className="text-(--text-3)" strokeWidth={1.5} />
                    </div>
                    <div>
                        <p className="text-(--text-1) text-[15px] font-medium">No customers yet</p>
                        <p className="text-(--text-2) text-[13px] mt-1">Customer data will appear here once bookings come in</p>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {services?.map((service) => (
                    <div
                        key={service.services.id}
                        onClick={() => navigate(`/business/manage-service/${service.services.id}`)}
                    >
                        <ServiceBox servicesWithRatings={service} />
                    </div>
                ))}
            </div>
        </div>
    );
}
