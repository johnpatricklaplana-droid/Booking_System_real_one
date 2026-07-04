import dayjs from "dayjs";
import { get } from "../api/api";
import type { ServiceResponse } from "../interfaces/Types";
import  duration  from "dayjs/plugin/duration";
import { toZonedTime } from "date-fns-tz";

export async function getServices(businessId: string) {
    const url = `http://localhost:8080/api/business/services/${businessId}`;
    
    const services: ServiceResponse[] = await get(url);
    
    dayjs.extend(duration);
    
    return services.map((s: ServiceResponse) => {
        const dur = dayjs.duration(s.duration);

        return {
            id: s.id,
            serviceName: s.serviceName,
            description: s.description ?? "",
            duration: dur.asMinutes().toString(),
            price: s.price,
            status: s.status,
            serviceLogoUrl: s.serviceLogoUrl,
            capacity: s.capacity,
        }
    })

}

export async function getAllServices() {
    const url = `http://localhost:8080/api/services`;
    
    const services: ServiceResponse[] = await get(url);
    
    dayjs.extend(duration);
    
    return services.map((s: ServiceResponse) => {
        const dur = dayjs.duration(s.duration);

        return {
            id: s.id,
            serviceName: s.serviceName,
            description: s.description ?? "",
            duration: dur.asMinutes().toString(),
            price: s.price,
            status: s.status,
            serviceLogoUrl: s.serviceLogoUrl,
            capacity: s.capacity,
        }
    })

}

export function isToday(date: Date, timezone: string): boolean {

    const appointmentDate = toZonedTime(date, timezone);
    const now = toZonedTime(new Date(), timezone);

    return appointmentDate.getMonth() === now.getMonth()
        && appointmentDate.getDate() === now.getDate()
        && appointmentDate.getFullYear() === now.getFullYear();

}

export function hasAppointmentPassed(date: Date, timezone: string): boolean {

    const appointmentDate = toZonedTime(date, timezone);
    const now = toZonedTime(new Date(), timezone);

    return appointmentDate.getTime() < now.getTime();
}

export function durationAsMinutes(serviceDuration: string) {

    dayjs.extend(duration);

    const dur = dayjs.duration(serviceDuration);
    return dur.asMinutes().toString();

}