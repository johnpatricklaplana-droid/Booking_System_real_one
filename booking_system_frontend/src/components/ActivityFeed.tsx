import { UserPlus, Calendar, DollarSign, Star } from 'lucide-react';

const activities = [
    {
        icon: UserPlus,
        title: 'New customer registered',
        description: 'Sarah Johnson joined via website',
        time: '2 min ago',
        accent: '#c9a87c',
    },
    {
        icon: Calendar,
        title: 'Appointment booked',
        description: 'Michael Chen - Hair Styling',
        time: '15 min ago',
        accent: '#9d8fb5',
    },
    {
        icon: DollarSign,
        title: 'Payment received',
        description: '$85.00 from Emma Davis',
        time: '1 hour ago',
        accent: '#6b9fa3',
    },
    {
        icon: Star,
        title: 'New review',
        description: 'Lisa Anderson gave 5 stars',
        time: '2 hours ago',
        accent: '#b89c7e',
    },
];

export function ActivityFeed() {
    return (
        <div className="bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-xl p-6 backdrop-blur-xl">
            <div className="mb-6">
                <h3 className="text-[15px] font-medium text-[#e8e8ea] mb-1">Recent Activity</h3>
                <p className="text-[13px] text-[#9a9aa3]">Latest updates from all businesses</p>
            </div>

            <div className="space-y-4">
                {activities.map((activity, i) => (
                    <div key={i} className="flex items-start gap-3 group cursor-pointer">
                        <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                            style={{ backgroundColor: `${activity.accent}15` }}
                        >
                            <activity.icon size={16} strokeWidth={1.5} style={{ color: activity.accent }} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[13px] font-medium text-[#e8e8ea] mb-0.5">{activity.title}</p>
                            <p className="text-[12px] text-[#9a9aa3] truncate">{activity.description}</p>
                        </div>
                        <span className="text-[11px] text-[#9a9aa3] flex-shrink-0">{activity.time}</span>
                    </div>
                ))}
            </div>

            <button className="mt-6 w-full py-2.5 text-[13px] font-medium text-[#9a9aa3] hover:text-[#e8e8ea] hover:bg-[#1a1a1e] rounded-lg transition-all">
                View all activity
            </button>
        </div>
    );
}
