import { ChevronLeft, ChevronRight, Filter, Plus } from 'lucide-react';

const timeSlots = Array.from({ length: 12 }, (_, i) => `${i + 8}:00`);
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const dates = [5, 6, 7, 8, 9, 10, 11];

const appointments = [
    { day: 0, time: '09:00', duration: 2, title: 'Emma Wilson', service: 'Hair Styling', color: '#c9a87c' },
    { day: 1, time: '10:00', duration: 2, title: 'Michael Chen', service: 'Massage', color: '#9d8fb5' },
    { day: 2, time: '13:00', duration: 1, title: 'Lisa Anderson', service: 'Consultation', color: '#6b9fa3' },
    { day: 3, time: '11:00', duration: 3, title: 'James Taylor', service: 'Training', color: '#b89c7e' },
    { day: 4, time: '09:00', duration: 1, title: 'Sarah Johnson', service: 'Facial', color: '#c9a87c' },
    { day: 4, time: '14:00', duration: 2, title: 'David Lee', service: 'Therapy', color: '#9d8fb5' },
];

export function CalendarPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-[20px] font-medium text-[#e8e8ea] mb-1">Calendar</h2>
                    <p className="text-[13px] text-[#9a9aa3]">Weekly schedule view</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2.5 bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-lg text-[13px] font-medium text-[#e8e8ea] hover:border-[rgba(255,255,255,0.15)] transition-all flex items-center gap-2">
                        <Filter size={16} />
                        Filter
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-br from-[#c9a87c] to-[#b89c7e] rounded-lg text-[13px] font-medium text-[#0a0a0c] hover:shadow-lg hover:shadow-[#c9a87c]/20 transition-all">
                        <Plus size={16} strokeWidth={2} />
                        New Event
                    </button>
                </div>
            </div>

            <div className="bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-xl overflow-hidden">
                <div className="p-6 border-b border-[rgba(255,255,255,0.08)] flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button className="w-8 h-8 flex items-center justify-center hover:bg-[#1a1a1e] rounded-lg transition-all">
                            <ChevronLeft size={18} className="text-[#9a9aa3]" />
                        </button>
                        <h3 className="text-[15px] font-medium text-[#e8e8ea]">June 5-11, 2026</h3>
                        <button className="w-8 h-8 flex items-center justify-center hover:bg-[#1a1a1e] rounded-lg transition-all">
                            <ChevronRight size={18} className="text-[#9a9aa3]" />
                        </button>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 bg-[#1a1a1e] text-[#e8e8ea] rounded-lg text-[13px] font-medium">
                            Week
                        </button>
                        <button className="px-3 py-1.5 text-[#9a9aa3] hover:bg-[#1a1a1e] rounded-lg text-[13px] font-medium transition-all">
                            Day
                        </button>
                        <button className="px-3 py-1.5 text-[#9a9aa3] hover:bg-[#1a1a1e] rounded-lg text-[13px] font-medium transition-all">
                            Month
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <div className="min-w-[1000px]">
                        <div className="grid grid-cols-8 border-b border-[rgba(255,255,255,0.08)]">
                            <div className="p-4" />
                            {days.map((day, i) => (
                                <div key={i} className="p-4 text-center border-l border-[rgba(255,255,255,0.08)]">
                                    <p className="text-[11px] text-[#9a9aa3] mb-1">{day}</p>
                                    <p className={`text-[15px] font-medium ${i === 3 ? 'text-[#c9a87c]' : 'text-[#e8e8ea]'}`}>
                                        {dates[i]}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-8">
                            <div className="space-y-0">
                                {timeSlots.map((time) => (
                                    <div key={time} className="h-20 p-3 border-b border-[rgba(255,255,255,0.08)]">
                                        <span className="text-[11px] text-[#9a9aa3]">{time}</span>
                                    </div>
                                ))}
                            </div>

                            {days.map((_, dayIndex) => (
                                <div key={dayIndex} className="border-l border-[rgba(255,255,255,0.08)] relative">
                                    {timeSlots.map((_, timeIndex) => (
                                        <div
                                            key={timeIndex}
                                            className="h-20 border-b border-[rgba(255,255,255,0.08)] hover:bg-[#1a1a1e]/30 transition-all cursor-pointer"
                                        />
                                    ))}

                                    {appointments
                                        .filter((apt) => apt.day === dayIndex)
                                        .map((apt, i) => {
                                            const startHour = parseInt(apt.time.split(':')[0]);
                                            const top = (startHour - 8) * 80;
                                            const height = apt.duration * 80 - 8;

                                            return (
                                                <div
                                                    key={i}
                                                    className="absolute left-1 right-1 rounded-lg p-2 cursor-pointer hover:scale-[1.02] transition-transform"
                                                    style={{
                                                        top: `${top + 4}px`,
                                                        height: `${height}px`,
                                                        backgroundColor: `${apt.color}20`,
                                                        borderLeft: `3px solid ${apt.color}`,
                                                    }}
                                                >
                                                    <p className="text-[12px] font-medium text-[#e8e8ea] mb-0.5">{apt.title}</p>
                                                    <p className="text-[10px] text-[#9a9aa3]">{apt.service}</p>
                                                    <p className="text-[10px] text-[#9a9aa3] mt-1">{apt.time}</p>
                                                </div>
                                            );
                                        })}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
