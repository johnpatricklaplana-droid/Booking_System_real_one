import { MetricsCard } from '../../components/MetricsCard';
import { AppointmentCard } from '../../components/AppointmentCard';
import { RevenueChart } from '../../components/RevenueChart';
import { CalendarWidget } from '../../components/CalendarWidget';
import { ActivityFeed } from '../../components/ActivityFeed';
import { StaffCard } from '../../components/StaffCard';
import { TrendingUp, Users, Calendar, DollarSign } from 'lucide-react';

export function Overview() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-4 gap-6">
                <MetricsCard
                    title="Total Bookings"
                    value="1,247"
                    change="+12.5%"
                    trend="up"
                    icon={Calendar}
                    accent="#c9a87c"
                />
                <MetricsCard
                    title="Active Customers"
                    value="3,842"
                    change="+8.2%"
                    trend="up"
                    icon={Users}
                    accent="#9d8fb5"
                />
                <MetricsCard
                    title="Revenue (MTD)"
                    value="$71,340"
                    change="+15.3%"
                    trend="up"
                    icon={DollarSign}
                    accent="#6b9fa3"
                />
                <MetricsCard
                    title="Conversion Rate"
                    value="68.4%"
                    change="+2.1%"
                    trend="up"
                    icon={TrendingUp}
                    accent="#b89c7e"
                />
            </div>

            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2">
                    <RevenueChart />
                </div>
                <CalendarWidget />
            </div>

            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 space-y-4">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-[15px] font-medium text-[#e8e8ea]">Today's Appointments</h3>
                        <button className="text-[13px] text-[#9a9aa3] hover:text-[#e8e8ea] transition-colors">
                            View all
                        </button>
                    </div>

                    <div className="grid gap-4">
                        <AppointmentCard
                            time="09:00 AM"
                            duration="45 min"
                            customer="Emma Wilson"
                            service="Hair Styling"
                            staff="Sarah M."
                            status="confirmed"
                            accent="#c9a87c"
                        />
                        <AppointmentCard
                            time="10:30 AM"
                            duration="60 min"
                            customer="Michael Chen"
                            service="Deep Tissue Massage"
                            staff="Alex R."
                            status="confirmed"
                            accent="#9d8fb5"
                        />
                        <AppointmentCard
                            time="12:00 PM"
                            duration="30 min"
                            customer="Lisa Anderson"
                            service="Consultation"
                            staff="David K."
                            status="pending"
                            accent="#6b9fa3"
                        />
                        <AppointmentCard
                            time="02:00 PM"
                            duration="90 min"
                            customer="James Taylor"
                            service="Personal Training"
                            staff="Mike T."
                            status="confirmed"
                            accent="#b89c7e"
                        />
                    </div>
                </div>

                <ActivityFeed />
            </div>

            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[15px] font-medium text-[#e8e8ea]">Staff Schedule</h3>
                    <button className="text-[13px] text-[#9a9aa3] hover:text-[#e8e8ea] transition-colors">
                        Manage staff
                    </button>
                </div>
{/* 
                <div className="grid grid-cols-4 gap-6">
                    <StaffCard/>
                    <StaffCard
                        name="Alex Rivera"
                        role="Massage Therapist"
                        appointments={5}
                        revenue="$620"
                        availability="busy"
                        initials="AR"
                        accent="#9d8fb5"
                    />
                    <StaffCard
                        name="David Kim"
                        role="Consultant"
                        appointments={4}
                        revenue="$580"
                        availability="available"
                        initials="DK"
                        accent="#6b9fa3"
                    />
                    <StaffCard
                        name="Mike Thompson"
                        role="Personal Trainer"
                        appointments={6}
                        revenue="$720"
                        availability="offline"
                        initials="MT"
                        accent="#b89c7e"
                    />
                </div> */}
            </div>
        </div>
    );
}
