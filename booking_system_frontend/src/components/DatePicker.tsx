import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export function BookingDatePicker() {
    const [selected, setSelected] = useState();

    // const handleSelect = (date: any) => {
    //     setSelected(date);
    //     onSelect?.(date);
    // };

    return (
        <DayPicker
            mode="single"
            selected={selected}
            // onSelect={handleSelect}
            disabled={{ before: new Date() }} // can't book past dates
            className="bg-(--surface) border border-(--border) rounded-2xl p-4"
        />
    );
}