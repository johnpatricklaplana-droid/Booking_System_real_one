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
}

export interface Time {
    value: string;
    label: string;
}

export interface UserPublic {
    avatarUrl: string;
    firstName: string;
    lastName: string;
}

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
    id: string;
    fullName: string;
    title: string;
    avatarUrl: string;
    active: boolean;
    createdAt: string;
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