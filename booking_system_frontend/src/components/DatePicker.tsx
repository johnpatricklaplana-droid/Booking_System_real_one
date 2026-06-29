import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export function BookingDatePicker({ selectDate }: { selectDate: (date: Date) => void }) {
    const [selected, setSelected] = useState<Date>();

    return (
        <DayPicker
            mode="single"
            selected={selected}
            onSelect={(date) => {
                selectDate(date ?? new Date());
                setSelected(date);
            }}
            disabled={{ before: new Date() }} // can't book past dates
            className="bg-(--surface) text-(--text-2) border border-(--border) rounded-2xl p-4"
        />
    );
}