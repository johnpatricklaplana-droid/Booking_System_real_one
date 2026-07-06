import dayjs from "dayjs";
import { get } from "../api/api";
import type { ServiceWithBusiness, ServiceWithRatings } from "../interfaces/Types";
import  duration  from "dayjs/plugin/duration";
import { toZonedTime } from "date-fns-tz";

export async function getServices(businessId: string): Promise<ServiceWithRatings[]> {
    const url = `http://localhost:8080/api/business/services/${businessId}`;
    
    const servicesWithRatings: ServiceWithRatings[] = await get(url);
    
    dayjs.extend(duration);
    
    return servicesWithRatings.map((swr: ServiceWithRatings) => {
        const dur = dayjs.duration(swr.services.duration);

        return {
            services: {
                id: swr.services.id,
                serviceName: swr.services.serviceName,
                description: swr.services.description ?? "",
                duration: dur.asMinutes().toString(),
                price: swr.services.price,
                status: swr.services.status,
                serviceLogoUrl: swr.services.serviceLogoUrl,
                capacity: swr.services.capacity,
            },
            review: swr.review.map(rev => ({ comment: rev.comment, createdAt: rev.createdAt, rating: rev.rating }))
        }
    })

}

dayjs.extend(duration);

export async function getAllServices(): Promise<ServiceWithBusiness[]> {
    const url = `http://localhost:8080/api/services`;
    
    const services: ServiceWithBusiness[] = await get(url);
    
    return services.map((s: ServiceWithBusiness) => {
        const dur = dayjs.duration(s.services.duration);

        return {
            services: {
                id: s.services.id,
                serviceName: s.services.serviceName,
                description: s.services.description ?? "",
                duration: dur.asMinutes().toString(),
                price: s.services.price,
                status: s.services.status,
                serviceLogoUrl: s.services.serviceLogoUrl,
                capacity: s.services.capacity,
            },
            business: {
                address: s.business.address,
                businessEmail: s.business.businessEmail,
                businessId: s.business.businessId,
                businessLogoUrl: s.business.businessLogoUrl,
                businessName: s.business.businessName,
                description: s.business.description,
                facebookPage: s.business.facebookPage,
                ownerName: s.business.ownerName,
                startedAt: s.business.startedAt,
                timezone: s.business.timezone,
                type: s.business.type
            },
            review: s.review.map(r => ({ comment: r.comment, createdAt: r.createdAt, rating: r.rating }))
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

export function getAverageRating(rating: number[]): number {

    const totalRating = rating.reduce((prev, cur) => {
        return prev + cur;
    }, 0);

    return totalRating / rating.length;
}