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

export interface ServiceWithRatings {
    services: ServiceResponse;
    review: Review[];
}

export interface ServiceWithBusiness {
    services: ServiceResponse;
    business: Business;
    review: Review[];
}

export interface FullAnalytics {
    monthlyStats: MonthlyStats[];
    businessTotals: BusinessTotals;
    averageRating: number;
    peakHour: PeakHour[];
    serviceDistribution: ServiceDistribution[];
}

export interface ServiceDistribution {
    bookingCount: number;
    serviceName: string;
}

export interface PeakHour {
    bookingCount: number;
    hour: number;
}

export interface MonthlyStats {
    bookingsOfTheMonth: number;
    month: string;
    revenueOfTheMonth: number;
}

export interface BusinessTotals {
    totalBookings: number;
    totalCustomer: number;
    totalRevenue: number;
}

export interface Review {
    comment: string;
    createdAt: string;
    rating: number;
}

export interface ReviewWithUser {
    review: Review;
    user: UserPublic;
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
    status: string;
    ownerName: string;
    startedAt: string;
    timezone: string;
    type: string;
}

export interface ServiceAvailability {
    day: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';
    endTime: string;
    startTime: string;
}

export interface Staff {
    id: string;
    fullName: string;
    title: string;
    avatarUrl: string;
    active: boolean;
    createdAt: string;
}

export interface StaffWithServices {
    staff: Staff;
    services: ServiceResponse[]
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

export interface Customer {
    email: string;
    firstName: string;
    lastName: string;
    lastVisit: string;
    totalSpent: number;
    visitCount: number;
    avatarUrl: string;
}

export interface CustomerAppointments {
    schedule: Schedule;
    service: ServiceResponse;
    staff: Staff;
    business: Business;
    isAlreadyRatedByYou: boolean;
    review: Review;
}

export interface Schedule {
    createdAt: string;
    id: string;
    startsAt: string;
    status: 'COMPLETED' | 'CANCELLED' | 'CONFIRMED' | 'PENDING' | 'MISSED';
}

export interface Appointment {
    schedule: Schedule;
    service: ServiceResponse;
    staff: Staff;
    user: UserPublic;
}