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
    address: string;
    businessName: string;
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