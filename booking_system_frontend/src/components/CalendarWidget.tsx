export function CalendarWidget() {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const dates = [
        [null, null, null, 1, 2, 3, 4],
        [5, 6, 7, 8, 9, 10, 11],
        [12, 13, 14, 15, 16, 17, 18],
        [19, 20, 21, 22, 23, 24, 25],
        [26, 27, 28, 29, 30, null, null],
    ];

    const bookedDates = [6, 8, 12, 14, 15, 20, 22, 27];
    const today = 15;

    return (
        <div className="bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-xl p-6 backdrop-blur-xl">
            <div className="mb-6">
                <h3 className="text-[15px] font-medium text-[#e8e8ea] mb-1">June 2026</h3>
                <p className="text-[13px] text-[#9a9aa3]">Booking calendar</p>
            </div>

            <div className="space-y-2">
                <div className="grid grid-cols-7 gap-2">
                    {days.map((day) => (
                        <div key={day} className="text-center text-[11px] text-[#9a9aa3] font-medium">
                            {day}
                        </div>
                    ))}
                </div>

                {dates.map((week, i) => (
                    <div key={i} className="grid grid-cols-7 gap-2">
                        {week.map((date, j) => (
                            <div
                                key={j}
                                className={`aspect-square flex items-center justify-center rounded-lg text-[13px] transition-all ${date === null
                                        ? ''
                                        : date === today
                                            ? 'bg-gradient-to-br from-[#c9a87c] to-[#b89c7e] text-[#0a0a0c] font-medium shadow-lg shadow-[#c9a87c]/20'
                                            : bookedDates.includes(date)
                                                ? 'bg-[#1a1a1e] text-[#e8e8ea] border border-[#c9a87c]/30 hover:border-[#c9a87c]/50 cursor-pointer'
                                                : 'text-[#9a9aa3] hover:bg-[#1a1a1e] hover:text-[#e8e8ea] cursor-pointer'
                                    }`}
                            >
                                {date}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div className="mt-6 pt-6 border-t border-[rgba(255,255,255,0.06)] flex items-center gap-4 text-[11px]">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-gradient-to-br from-[#c9a87c] to-[#b89c7e]" />
                    <span className="text-[#9a9aa3]">Today</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded border border-[#c9a87c]/30 bg-[#1a1a1e]" />
                    <span className="text-[#9a9aa3]">Booked</span>
                </div>
            </div>
        </div>
    );
}
