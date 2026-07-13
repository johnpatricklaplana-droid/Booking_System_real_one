import { User, Building2, Bell, Shield, Palette, Globe, CreditCard, Users } from 'lucide-react';

const settingsSections = [
    {
        icon: User,
        title: 'Profile',
        description: 'Manage your personal information and preferences',
        accent: '#c9a87c',
    },
    {
        icon: Building2,
        title: 'Business',
        description: 'Configure your business details and operating hours',
        accent: '#9d8fb5',
    },
    {
        icon: Users,
        title: 'Team & Staff',
        description: 'Manage staff members, roles, and permissions',
        accent: '#6b9fa3',
    },
    {
        icon: Bell,
        title: 'Notifications',
        description: 'Configure email and push notification preferences',
        accent: '#b89c7e',
    },
    {
        icon: CreditCard,
        title: 'Billing & Plans',
        description: 'View subscription details and payment methods',
        accent: '#c9a87c',
    },
    {
        icon: Shield,
        title: 'Security',
        description: 'Two-factor authentication and security settings',
        accent: '#9d8fb5',
    },
    {
        icon: Palette,
        title: 'Appearance',
        description: 'Customize theme, colors, and branding',
        accent: '#6b9fa3',
    },
    {
        icon: Globe,
        title: 'Integrations',
        description: 'Connect third-party apps and services',
        accent: '#b89c7e',
    },
];

export function Settings() {
    return (
        <div className="space-y-6 h-screen overflow-y-auto p-6 lg:p-8">
            <div>
                <h2 className="text-[20px] font-medium text-[#e8e8ea] mb-1">Settings</h2>
                <p className="text-[13px] text-[#9a9aa3]">Manage your account and preferences</p>
            </div>

            <div className="bg-[#151518] relative border border-[rgba(255,255,255,0.08)] rounded-xl p-6">
                <div className="flex items-center justify-between gap-4">
                    <div className="w-16 h-16 rounded-full bg-linear-to-br from-[#c9a87c] to-[#b89c7e] flex items-center justify-center text-[20px] font-medium text-[#0a0a0c]">
                        JD
                    </div>
                    <div className="flex-1">
                        <h3 className="text-[15px] font-medium text-[#e8e8ea] mb-0.5">John Doe</h3>
                        <p className="text-[13px] max-w-0  text-[#9a9aa3]">john.doe@apexbooking.com</p>
                    </div>
                    <button className="px-4 py-2 bg-[#1a1a1e] sm:static lg:static absolute top-2 right-2 hover:bg-[#2a2a2f] rounded-lg text-[13px] font-medium text-[#e8e8ea] transition-all">
                        Edit Profile
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {settingsSections.map((section) => (
                    <div
                        key={section.title}
                        className="bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-xl p-6 hover:border-[rgba(255,255,255,0.12)] transition-all cursor-pointer group"
                    >
                        <div className="flex items-start gap-4">
                            <div
                                className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                                style={{ backgroundColor: `${section.accent}20` }}
                            >
                                <section.icon size={20} style={{ color: section.accent }} strokeWidth={1.5} />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-[14px] font-medium text-[#e8e8ea] mb-1">{section.title}</h3>
                                <p className="text-[12px] text-[#9a9aa3] leading-relaxed">{section.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-xl p-6">
                <h3 className="text-[15px] font-medium text-[#e8e8ea] mb-4">Quick Actions</h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-[#1a1a1e] rounded-lg hover:bg-[#2a2a2f] transition-all cursor-pointer">
                        <div>
                            <p className="text-[13px] font-medium text-[#e8e8ea] mb-0.5">Email Notifications</p>
                            <p className="text-[11px] text-[#9a9aa3]">Receive booking confirmations and reminders</p>
                        </div>
                        <div className="w-11 h-6 bg-[#c9a87c] rounded-full relative cursor-pointer">
                            <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-[#0a0a0c] rounded-full transition-all" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[#1a1a1e] rounded-lg hover:bg-[#2a2a2f] transition-all cursor-pointer">
                        <div>
                            <p className="text-[13px] font-medium text-[#e8e8ea] mb-0.5">SMS Reminders</p>
                            <p className="text-[11px] text-[#9a9aa3]">Send text message reminders to customers</p>
                        </div>
                        <div className="w-11 h-6 bg-[#27272b] rounded-full relative cursor-pointer">
                            <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-[#9a9aa3] rounded-full transition-all" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[#1a1a1e] rounded-lg hover:bg-[#2a2a2f] transition-all cursor-pointer">
                        <div>
                            <p className="text-[13px] font-medium text-[#e8e8ea] mb-0.5">Auto-confirm Bookings</p>
                            <p className="text-[11px] text-[#9a9aa3]">Automatically confirm new appointments</p>
                        </div>
                        <div className="w-11 h-6 bg-[#c9a87c] rounded-full relative cursor-pointer">
                            <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-[#0a0a0c] rounded-full transition-all" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20 rounded-xl p-6">
                <h3 className="text-[15px] font-medium text-red-400 mb-2">Danger Zone</h3>
                <p className="text-[13px] text-[#9a9aa3] mb-4">
                    Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <button className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-lg text-[13px] font-medium text-red-400 transition-all">
                    Delete Account
                </button>
            </div>
        </div>
    );
}
