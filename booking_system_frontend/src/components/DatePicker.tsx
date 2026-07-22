import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export const DAY_OF_WEEK_MAP: Record<string, number> = {
    SUNDAY: 0,
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6,
};

export function BookingDatePicker({ 
    selectDate,
    availableDay
}: Readonly<{ 
    selectDate: (date: Date) => void,
    availableDay: string[]
}>) {
    const [selected, setSelected] = useState<Date>();

    const availableDaysOfWeek: Set<number> = new Set(availableDay.map(
        (a) => DAY_OF_WEEK_MAP[a]
    ));

    return (
        <DayPicker
            mode="single"
            selected={selected}
            onSelect={(date) => {
                selectDate(date ?? new Date());
                setSelected(date);
            }}
            style={{
                '--rdp-day-width': '14.28%', // 100% / 7 days
                '--rdp-day-height': '40px',
            } as React.CSSProperties}
            disabled={(date) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                return !availableDaysOfWeek.has((date.getDay())) || date < today
            }}
            className="bg-(--surface) overflow-x-auto text-(--text-2) border border-(--border) rounded-2xl p-4"
        />
    );
}