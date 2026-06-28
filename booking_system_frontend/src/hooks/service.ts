import dayjs from "dayjs";
import { get } from "../api/api";
import type { ServiceResponse } from "../interfaces/Types";
import  duration  from "dayjs/plugin/duration";
import { TimezoneLabel } from "../helper/convertSome";

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
            address: s.address,
            businessName: s.businessName,
            timezone: TimezoneLabel(s.timezone)
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
            address: s.address,
            businessName: s.businessName,
            timezone: TimezoneLabel(s.timezone) ?? ""
        }
    })

}

