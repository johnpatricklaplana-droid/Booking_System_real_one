import { Outlet, useLocation } from 'react-router';
import { Sidebar } from './components/Sidebar';
import { Search, Bell, Plus } from 'lucide-react';

const pageTitles: Record<string, { title: string; subtitle: string }> = {
    '/calendar': { title: 'Calendar', subtitle: 'Weekly schedule view' },
    '/appointments': { title: 'Appointments', subtitle: 'Manage all bookings' },
    '/customers': { title: 'Customers', subtitle: 'Customer database' },
    '/services': { title: 'Services', subtitle: 'Service offerings' },
    '/settings': { title: 'Settings', subtitle: 'Account preferences' },
};

export function Root() {
    const location = useLocation();
    const pageInfo = pageTitles[location.pathname] || { title: 'Overview', subtitle: 'Welcome back, John' };

    console.log("Root mounted/rendered");

    return (
        <div className="min-h-screen bg-[#0a0a0c] dark">
            <Sidebar />

            <div className="ml-64 min-h-screen">
                <header className="sticky top-0 z-10 bg-[#0a0a0c]/80 backdrop-blur-xl border-b border-[rgba(255,255,255,0.06)]">
                    <div className="flex items-center justify-between px-8 py-4">
                        <div>
                            <h2 className="text-[20px] font-medium text-[#e8e8ea] mb-1">{pageInfo.title}</h2>
                            <p className="text-[13px] text-[#9a9aa3]">{pageInfo.subtitle}</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9a9aa3]" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-64 pl-10 pr-4 py-2.5 bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-lg text-[13px] text-[#e8e8ea] placeholder-[#9a9aa3] focus:outline-none focus:border-[rgba(255,255,255,0.15)] transition-all"
                                />
                            </div>

                            <button className="w-10 h-10 flex items-center justify-center bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-lg hover:border-[rgba(255,255,255,0.15)] transition-all relative">
                                <Bell size={18} strokeWidth={1.5} className="text-[#9a9aa3]" />
                                <div className="absolute top-2 right-2 w-2 h-2 bg-[#c9a87c] rounded-full" />
                            </button>

                            <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-br from-[#c9a87c] to-[#b89c7e] rounded-lg text-[13px] font-medium text-[#0a0a0c] hover:shadow-lg hover:shadow-[#c9a87c]/20 transition-all">
                                <Plus size={16} strokeWidth={2} />
                                New Booking
                            </button>
                        </div>
                    </div>
                </header>

                <main className="p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
