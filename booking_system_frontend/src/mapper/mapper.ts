import type { ServiceResponse } from "../interfaces/Types";

export function toServices(someService: any): ServiceResponse {
    return {
        id: someService.id,
        serviceName: someService.serviceName,
        serviceLogoUrl: someService.serviceLogoUrl,
        status: someService.status,
        description: someService.description,
        duration: someService.description,
        price: someService.price,
        capacity: someService.capacity,
    } 
}