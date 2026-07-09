import { format, parse } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

export function toISODuration (value: number, unit: 'min' | 'hr') {
    const totalMinutes = unit === 'hr' ? value * 60 : value;

    if(totalMinutes === 0) return 'PT0M';

    let iso = 'PT';
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if(hours > 0) iso += `${hours}H`;
    if(minutes > 0) iso += `${minutes}M`;

    return iso;

}

export function formatDuration(minutes: number) {
    if (minutes < 60) return `${minutes} min`;
    const hrs = Math.floor(minutes / 60);
    const rem = minutes % 60;
    return rem === 0 ? `${hrs} hr` : `${hrs} hr ${rem} min`;
}

export function TimezoneLabel(timezone: string): string {
    const now = new Date();
    const city = timezone.split("/").pop();
    const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        timeZoneName: "longOffset",
    });
    const parts = formatter.formatToParts(now);
    return `${city} ${parts.find(p => p.type === "timeZoneName")?.value}`;
}

export function buildBookingPayloadTime(date: Date, time: string, businessTimezone: string): string {

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const offset = formatInTimeZone(date, businessTimezone, "XXX");

    return `${year}-${month}-${day}T${time}:00${offset}`;
    
}

export function to24Hour(time12: string): string  {
    const parsed = parse(time12, 'hh:mm a', new Date());
    return format(parsed, 'HH:mm');

}