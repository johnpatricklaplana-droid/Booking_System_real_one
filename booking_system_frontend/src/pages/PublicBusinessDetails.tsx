import { useNavigate, useParams } from "react-router-dom";
import {
    Mail,
    Link2,
    MapPin,
    Briefcase,
    Clock,
    Calendar,
    CheckCircle2,
    XCircle,
} from "lucide-react";
import type { BusinessPublic, ServiceWithBusiness } from "../interfaces/Types";
import { TimezoneLabel } from "../helper/convertSome";
import { get } from "../api/api";
import { API_URL } from "../api/config";
import { useState, useEffect } from "react";
import { getAverageRating } from "../hooks/service";
import StarRating from "../components/Star";

export function BusinessDetailsPage() {
    const navigate = useNavigate();

    const [ businessWithOwner, setBusinessWithOwner ] = useState<BusinessPublic | null>(null);
    const [services, setServices] = useState<ServiceWithBusiness[]>([]);
    const isActive = businessWithOwner?.business.status.toUpperCase() === "ACTIVE";

    const { businessId } = useParams();

    useEffect(() => {

        if(!businessId) return;

        const getIt = async () => {

            const result = await get(`${API_URL}/api/public/business/${businessId}`);

            setBusinessWithOwner(result.message);

        };

        getIt();

    }, [businessId]);

    useEffect(() => {

        if(!businessId) return;

        const getIt = async () => {

            const result = await get(`${API_URL}/api/business/services/${businessId}`);

            setServices(result);

        };

        getIt();

    }, [businessId]);

    return (
        <div className="min-h-screen bg-(--bg) pb-16">
            {/* Hero */}
            <section className="relative overflow-hidden border-b border-(--border)">
                <div
                    className="absolute inset-0 bg-linear-to-b from-(--surface) via-(--bg) to-(--bg) opacity-90"
                    aria-hidden="true"
                />
                <div className="relative max-w-5xl mx-auto px-6 pt-14 pb-10">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                        <img
                            src={businessWithOwner?.business.businessLogoUrl}
                            alt={businessWithOwner?.business.businessName}
                            className="w-50 rounded-2xl object-cover border border-(--border) shadow-lg"
                        />
                        <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-3">
                                <h1 className="text-[1.75rem] font-semibold text-(--text-1) leading-tight">
                                    {businessWithOwner?.business.businessName}
                                </h1>
                                <span
                                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[0.75rem] font-medium border ${isActive
                                            ? "text-(--teal) border-(--teal)/40 bg-(--teal)/10"
                                            : "text-(--text-3) border-(--border) bg-(--surface)"
                                        }`}
                                >
                                    {isActive ? (
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                    ) : (
                                        <XCircle className="w-3.5 h-3.5" />
                                    )}
                                    {businessWithOwner?.business.status}
                                </span>
                            </div>
                            <p className="mt-1 text-[0.9375rem] text-(--gold-light) font-medium">
                                {businessWithOwner?.business.type}
                            </p>
                            <p className="mt-3 text-(--text-2) text-sm leading-relaxed max-w-2xl">
                                {businessWithOwner?.business.description}
                            </p>
                            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[0.8125rem] text-(--text-3)">
                                <span className="flex items-center gap-1.5">
                                    <Calendar className="w-3.5 h-3.5" />
                                    Started {new Date(businessWithOwner?.business.startedAt!).toLocaleDateString(undefined, {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5" />
                                    {businessWithOwner ? TimezoneLabel(businessWithOwner?.business.timezone) : ''}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex items-center gap-3 pt-6 border-t border-(--border)">
                        <img
                            src={businessWithOwner?.user.avatarUrl}
                            alt={`${businessWithOwner?.user.firstName} ${businessWithOwner?.user.lastName}`}
                            className="w-10 h-10 rounded-full object-cover border border-(--border)"
                        />
                        <div>
                            <p className="text-[0.6875rem] uppercase tracking-wide text-(--text-3)">
                                Owned by
                            </p>
                            <p className="text-[0.9375rem] text-(--text-1) font-medium">
                                {businessWithOwner?.user.firstName} {businessWithOwner?.user.lastName}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-5xl mx-auto px-6 mt-10">
                <h2 className="text-[1.125rem] font-semibold text-(--text-1) mb-4">
                    Business Information
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3 bg-(--surface) border border-(--border) rounded-xl p-4">
                        <Mail className="w-4.5 h-4.5 text-(--gold-light) mt-0.5" />
                        <div>
                            <p className="text-[0.6875rem] uppercase tracking-wide text-(--text-3)">Email</p>
                            <p className="text-[0.875rem] text-(--text-1)">{businessWithOwner?.business.businessEmail}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 bg-(--surface) border border-(--border) rounded-xl p-4">
                        <Link2 className="w-4.5 h-4.5 text-(--gold-light) mt-0.5" />
                        <div>
                            <p className="text-[0.6875rem] uppercase tracking-wide text-(--text-3)">
                                Facebook Page
                            </p>
                            <p className="text-[0.875rem] text-(--text-1)">{businessWithOwner?.business.facebookPage}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 bg-(--surface) border border-(--border) rounded-xl p-4">
                        <MapPin className="w-4.5 h-4.5 text-(--gold-light) mt-0.5" />
                        <div>
                            <p className="text-[0.6875rem] uppercase tracking-wide text-(--text-3)">Address</p>
                            <p className="text-[0.875rem] text-(--text-1)">{businessWithOwner?.business.address.displayName}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 bg-(--surface) border border-(--border) rounded-xl p-4">
                        <Briefcase className="w-4.5 h-4.5 text-(--gold-light) mt-0.5" />
                        <div>
                            <p className="text-[0.6875rem] uppercase tracking-wide text-(--text-3)">
                                Business Type
                            </p>
                            <p className="text-[0.875rem] text-(--text-1)">{businessWithOwner?.business.type}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 bg-(--surface) border border-(--border) rounded-xl p-4">
                        <Clock className="w-4.5 h-4.5 text-(--gold-light) mt-0.5" />
                        <div>
                            <p className="text-[0.6875rem] uppercase tracking-wide text-(--text-3)">Timezone</p>
                            <p className="text-[0.875rem] text-(--text-1)">{businessWithOwner ? TimezoneLabel(businessWithOwner?.business.timezone) : ''}</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-5xl mx-auto px-6 mt-10">
                <h2 className="text-[1.125rem] font-semibold text-(--text-1) mb-4">Services</h2>
                {services.length === 0 
                    && <div className="flex flex-col items-center justify-center text-center py-16 px-6 bg-(--surface) border border-(--border) rounded-2xl">
                        <Briefcase className="w-8 h-8 text-(--text-3) mb-3" />
                        <p className="text-(--text-1) text-[0.9375rem] font-medium">No services yet</p>
                        <p className="text-(--text-2) text-sm mt-1">This business hasn't added any services.</p>
                    </div>
                }
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {services.map((swb) => (
                        <button
                            className="service-card group relative bg-(--surface) border border-(--border) rounded-2xl overflow-hidden transition-transform duration-200 cursor-pointer hover:-translate-y-1.5"
                            key={swb.services.id}
                            onClick={() => navigate(`/customer/service/${swb.services.id}`)}
                        >
                            <img
                                src={swb.services.serviceLogoUrl}
                                alt={swb.services.id}
                                className="h-40 w-full object-contain"
                            />
                            <div className="pt-4 px-4.5 pb-4.5">
                                <div className="flex gap-2 items-center">
                                    <img
                                        className="w-5.5 h-5.5 mb-2 rounded-[50%]"
                                        src={swb.business.businessLogoUrl}
                                        alt={swb.business.businessName}
                                    />
                                    <div className="text-[0.75rem] text-(--text-3) mb-1 font-medium">
                                        {swb.business.businessName}
                                    </div>
                                </div>
                                <div className="text-[0.9375rem] text-start text-(--text-1)">
                                    {swb.services.serviceName}
                                </div>
                                <p className="text-(--text-2) text-start text-sm">
                                    capacity: {swb.services.capacity}
                                </p>
                                <div className="mt-2 flex items-center gap-2">
                                    <StarRating rating={getAverageRating(swb.review.map((rev) => rev.rating))} />
                                    <p className="text-(--text-2) text-xs">
                                        {swb.review.length > 0 ? getAverageRating(swb.review.map((rev) => rev.rating)) : "no"}{" "}
                                        rating ({swb.review.length})
                                    </p>
                                </div>
                                <p className="flex items-center text-start gap-2.5 text-[0.8125rem] text-(--text-2) mt-2">
                                    {swb.business.address.displayName}
                                </p>
                                <div className="flex mt-2 items-center justify-between">
                                    <div className="font-semibold text-(--gold-light) text-[1rem]">
                                        ₱{swb.services.price.toLocaleString()}
                                    </div>
                                    <div className="text-[0.75rem] text-(--teal) font-medium">
                                        {swb.business ? TimezoneLabel(swb.business.timezone) : ""}
                                    </div>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </section>
        </div>
    );
}