import { Search, Filter, Download, Plus, Mail, Phone, CalendarX2, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useUser } from '../../provider/UserContext';
import { get } from '../../api/api';
import type { Customer } from '../../interfaces/Types';
import { formatDistanceToNow } from 'date-fns';

export function Customers() {

    const business = useUser().activeBusiness;

    const [customer, setCustomer] = useState<Customer[]>([]);

    useEffect(() => {

        if(!business?.businessId) return;

        const getIt = async () => {
            const url = `http://localhost:8080/api/business/customer/${business.businessId}`;

            const result: Customer[] = await get(url);

            console.log(result);
            setCustomer(result);

        };

        getIt();

    }, [business?.businessId]);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-[20px] font-medium text-[#e8e8ea] mb-1">Customers</h2>
                    <p className="text-[13px] text-[#9a9aa3]">Manage your customer database</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2.5 bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-lg text-[13px] font-medium text-[#e8e8ea] hover:border-[rgba(255,255,255,0.15)] transition-all flex items-center gap-2">
                        <Download size={16} />
                        Export
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-linear-to-br from-[#c9a87c] to-[#b89c7e] rounded-lg text-[13px] font-medium text-[#0a0a0c] hover:shadow-lg hover:shadow-[#c9a87c]/20 transition-all">
                        <Plus size={16} strokeWidth={2} />
                        Add Customer
                    </button>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9a9aa3]" size={16} />
                    <input
                        type="text"
                        placeholder="Search customers..."
                        className="w-full pl-10 pr-4 py-2.5 bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-lg text-[13px] text-[#e8e8ea] placeholder-[#9a9aa3] focus:outline-none focus:border-[rgba(255,255,255,0.15)] transition-all"
                    />
                </div>
                <button className="px-4 py-2.5 bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-lg text-[13px] font-medium text-[#e8e8ea] hover:border-[rgba(255,255,255,0.15)] transition-all flex items-center gap-2">
                    <Filter size={16} />
                    Filter
                </button>
            </div>

            {customer.length === 0 && (
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

            <div className="grid grid-cols-3 gap-6">
                {customer.map((customer) => (
                    <div
                        key={customer.email}
                        className="bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-xl p-6 hover:border-[rgba(255,255,255,0.12)] transition-all group cursor-pointer"
                    >
                        <div className="flex items-start justify-between mb-5">
                            <div className="flex items-center gap-3">
                                <img
                                    src={customer.avatarUrl}
                                    alt='todo'
                                    className="w-12 h-12 rounded-full flex items-center justify-center text-[14px] font-medium text-[#0a0a0c]"
                                />
                                <div>
                                    <h3 className="text-[14px] font-medium text-[#e8e8ea] mb-0.5">{customer.firstName} {customer.lastName}</h3>
                                    <p className="text-[11px] text-[#9a9aa3]">Joined Feb 3, 2025</p>
                                </div>
                            </div>
                            {/* {customer.status === 'inactive' && (
                                <div className="px-2 py-0.5 bg-[#9a9aa3]/20 rounded-full text-[10px] font-medium text-[#9a9aa3]">
                                    Inactive
                                </div>
                            )} */}
                        </div>

                        <div className="space-y-3 mb-5">
                            <div className="flex items-center gap-2 text-[#9a9aa3] group-hover:text-[#e8e8ea] transition-colors">
                                <Mail size={14} />
                                <span className="text-[12px]">{customer.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[#9a9aa3] group-hover:text-[#e8e8ea] transition-colors">
                                <Phone size={14} />
                                <span className="text-[12px]">+1 (555) 567-8901</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3 pt-5 border-t border-[rgba(255,255,255,0.06)]">
                            <div>
                                <p className="text-[11px] text-[#9a9aa3] mb-1">Visits</p>
                                <p className="text-[15px] font-medium text-[#e8e8ea]">{customer.visitCount}</p>
                            </div>
                            <div>
                                <p className="text-[11px] text-[#9a9aa3] mb-1">Spent</p>
                                <p className="text-[15px] font-medium text-(--gold-light)">₱{customer.totalSpent.toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-[11px] text-[#9a9aa3] mb-1">Last Visit</p>
                                <p className="text-[11px] font-medium text-[#e8e8ea]">{formatDistanceToNow(new Date(customer.lastVisit), { addSuffix: true })}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
