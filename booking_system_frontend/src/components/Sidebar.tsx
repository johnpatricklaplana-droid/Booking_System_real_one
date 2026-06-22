import { Link, useLocation, useNavigate } from 'react-router';
import { Calendar, BarChart3, Users, Settings, Grid3x3, Clock, Briefcase, TrendingUp, ArrowLeftRight } from 'lucide-react';
import { update } from '../api/api';
import { useUser } from '../provider/UserContext';

const navItems = [
    { icon: Grid3x3, label: 'Overview', path: '/business' },
    { icon: Calendar, label: 'Calendar', path: 'calendar' },
    { icon: Clock, label: 'Appointments', path: 'appointments' },
    { icon: Users, label: 'Customers', path: 'customers' },
    { icon: Briefcase, label: 'Services', path: 'services' },
    { icon: TrendingUp, label: 'Analytics', path: 'analytics' },
    { icon: BarChart3, label: 'Reports', path: 'reports' },
    { icon: BarChart3, label: 'job-postings', path: 'job-postings' },
    { icon: Settings, label: 'Settings', path: 'settings' },
];

export function Sidebar() {

    const { setUser } = useUser();

    const navigate = useNavigate();

    const location = useLocation();

    const swithToCustomer = async () => {
        const url = "http://localhost:8080/api/user/customer";
        const body = null;
        
        const result = await update(url, body);
        
        console.log(result);

        if(result.status === 200) {
            setUser?.(prev => ({ ...prev!, activeRole: "CUSTOMER" }));
        }
    };

    return (
        <div className="fixed left-0 top-0 h-full w-64 bg-[#0f0f11] border-r border-[rgba(255,255,255,0.06)] flex flex-col">
            <div className="p-6 border-b border-[rgba(255,255,255,0.06)]">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c9a87c] to-[#9d8fb5] flex items-center justify-center">
                        <span className="text-[#0a0a0c] font-semibold text-sm">A</span>
                    </div>
                    <div>
                        <h1 className="text-[15px] font-medium text-[#e8e8ea]">Apex</h1>
                        <p className="text-[11px] text-[#9a9aa3]">Booking Platform</p>
                    </div>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => (
                    <Link
                        key={item.label}
                        to={item.path}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${location.pathname === item.path
                                ? 'bg-[#1a1a1e] text-[#e8e8ea]'
                                : 'text-[#9a9aa3] hover:bg-[#1a1a1e] hover:text-[#e8e8ea]'
                            }`}
                    >
                        <item.icon size={18} strokeWidth={1.5} />
                        <span className="text-[13px] font-medium">{item.label}</span>
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-[rgba(255,255,255,0.06)] space-y-2">
                <button
                    onClick={swithToCustomer}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#1a1a1e] hover:bg-[#222226] border border-[rgba(255,255,255,0.06)] hover:border-[#9d8fb5]/40 transition-all group"
                >
                    <ArrowLeftRight size={15} className="text-[#9d8fb5]" />
                    <span className="text-[12px] font-medium text-[#9a9aa3] group-hover:text-[#9d8fb5] transition-colors">Customer View</span>
                </button>
                <div className="bg-[#1a1a1e] rounded-lg p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#c9a87c] to-[#b89c7e] flex items-center justify-center text-[13px] text-[#0a0a0c] font-medium">
                            JD
                        </div>
                        <div>
                            <p className="text-[13px] font-medium text-[#e8e8ea]">John Doe</p>
                            <p className="text-[11px] text-[#9a9aa3]">Admin</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
