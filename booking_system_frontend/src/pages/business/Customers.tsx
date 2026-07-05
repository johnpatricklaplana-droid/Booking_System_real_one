import { Search, Filter, Download, Plus, Mail, Phone } from 'lucide-react';

const customers = [
    {
        id: '1',
        name: 'Emma Wilson',
        email: 'emma.wilson@email.com',
        phone: '+1 (555) 123-4567',
        joined: 'Jan 15, 2025',
        appointments: 24,
        spent: '$2,040',
        lastVisit: '2 days ago',
        status: 'active',
        initials: 'EW',
        accent: '#c9a87c',
    },
    {
        id: '2',
        name: 'Michael Chen',
        email: 'michael.chen@email.com',
        phone: '+1 (555) 234-5678',
        joined: 'Feb 3, 2025',
        appointments: 18,
        spent: '$2,160',
        lastVisit: '1 week ago',
        status: 'active',
        initials: 'MC',
        accent: '#9d8fb5',
    },
    {
        id: '3',
        name: 'Lisa Anderson',
        email: 'lisa.anderson@email.com',
        phone: '+1 (555) 345-6789',
        joined: 'Mar 12, 2025',
        appointments: 12,
        spent: '$720',
        lastVisit: '3 days ago',
        status: 'active',
        initials: 'LA',
        accent: '#6b9fa3',
    },
    {
        id: '4',
        name: 'James Taylor',
        email: 'james.taylor@email.com',
        phone: '+1 (555) 456-7890',
        joined: 'Apr 8, 2025',
        appointments: 32,
        spent: '$4,800',
        lastVisit: 'Today',
        status: 'vip',
        initials: 'JT',
        accent: '#b89c7e',
    },
    {
        id: '5',
        name: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        phone: '+1 (555) 567-8901',
        joined: 'May 20, 2025',
        appointments: 8,
        spent: '$560',
        lastVisit: '5 days ago',
        status: 'active',
        initials: 'SJ',
        accent: '#c9a87c',
    },
    {
        id: '6',
        name: 'Robert Martinez',
        email: 'r.martinez@email.com',
        phone: '+1 (555) 678-9012',
        joined: 'Jan 30, 2025',
        appointments: 4,
        spent: '$280',
        lastVisit: '2 months ago',
        status: 'inactive',
        initials: 'RM',
        accent: '#9d8fb5',
    },
];

export function Customers() {
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

            <div className="grid grid-cols-3 gap-6">
                {customers.map((customer) => (
                    <div
                        key={customer.id}
                        className="bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-xl p-6 hover:border-[rgba(255,255,255,0.12)] transition-all group cursor-pointer"
                    >
                        <div className="flex items-start justify-between mb-5">
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-12 h-12 rounded-full flex items-center justify-center text-[14px] font-medium text-[#0a0a0c]"
                                    style={{ background: `linear-gradient(135deg, ${customer.accent}, ${customer.accent}dd)` }}
                                >
                                    {customer.initials}
                                </div>
                                <div>
                                    <h3 className="text-[14px] font-medium text-[#e8e8ea] mb-0.5">{customer.name}</h3>
                                    <p className="text-[11px] text-[#9a9aa3]">Joined {customer.joined}</p>
                                </div>
                            </div>
                            {customer.status === 'vip' && (
                                <div className="px-2 py-0.5 bg-linear-to-br from-[#c9a87c] to-[#b89c7e] rounded-full text-[10px] font-medium text-[#0a0a0c]">
                                    VIP
                                </div>
                            )}
                            {customer.status === 'inactive' && (
                                <div className="px-2 py-0.5 bg-[#9a9aa3]/20 rounded-full text-[10px] font-medium text-[#9a9aa3]">
                                    Inactive
                                </div>
                            )}
                        </div>

                        <div className="space-y-3 mb-5">
                            <div className="flex items-center gap-2 text-[#9a9aa3] group-hover:text-[#e8e8ea] transition-colors">
                                <Mail size={14} />
                                <span className="text-[12px]">{customer.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[#9a9aa3] group-hover:text-[#e8e8ea] transition-colors">
                                <Phone size={14} />
                                <span className="text-[12px]">{customer.phone}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3 pt-5 border-t border-[rgba(255,255,255,0.06)]">
                            <div>
                                <p className="text-[11px] text-[#9a9aa3] mb-1">Visits</p>
                                <p className="text-[15px] font-medium text-[#e8e8ea]">{customer.appointments}</p>
                            </div>
                            <div>
                                <p className="text-[11px] text-[#9a9aa3] mb-1">Spent</p>
                                <p className="text-[15px] font-medium text-[#e8e8ea]">{customer.spent}</p>
                            </div>
                            <div>
                                <p className="text-[11px] text-[#9a9aa3] mb-1">Last Visit</p>
                                <p className="text-[11px] font-medium text-[#e8e8ea]">{customer.lastVisit}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
