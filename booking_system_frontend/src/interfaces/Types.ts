export type ServiceStatus = 'ACTIVE' | 'DRAFT' | 'PAUSED';

export interface ServiceResponse {
    capacity: number;
    description: string;
    duration: string,
    id: string;
    price: number;
    serviceLogoUrl: string;
    serviceName: string;
    status: ServiceStatus;
    address: BusinessAddress;
    businessName: string;
    timezone: string;
}

export interface Staff {
    id: string;
    fullName: string;
    title: string;
    avatarUrl: string;
    active: boolean;
    createdAt: string;
    services: ServiceResponse[];
}

export interface BusinessAddress {
    houseNumber: string;
    road: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    countryCode: string;
}