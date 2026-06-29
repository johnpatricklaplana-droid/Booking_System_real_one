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

export interface Time {
    value: string;
    label: string;
}

export interface ServiceDetails {
    serviceName: string;
    business: Business;
    capacity: number;
    description: string;
    duration: string;
    price: number;
    serviceLogoUrl: string;
    staffs: Staff[]
};

export interface Business {
    address: BusinessAddress;
    businessEmail: string;
    businessId: string;
    businessLogoUrl: string;
    businessName: string;
    description: string;
    facebookPage: string;
    ownerName: string;
    startedAt: string;
    timezone: string;
    type: string;
}

export interface Staff {
    staffId: string;
    fullName: string;
    title: string;
    avatarUrl: string;
    active: boolean;
    createdAt: string;
    services: ServiceResponse[];
    unavailable: Unavailable[];
}

export interface Unavailable {
    start: string;
    end: string;
}

export interface BusinessAddress {
    displayName: string;
    houseNumber: string;
    road: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    countryCode: string;
}