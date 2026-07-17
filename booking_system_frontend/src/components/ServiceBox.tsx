import { MapPin } from "lucide-react";
import type { ServiceWithRatings } from "../interfaces/Types";
import { useUser } from "../provider/UserContext";
import StarRating from "./Star";
import { getAverageRating } from "../hooks/service";
import { TimezoneLabel } from "../helper/convertSome";

// NOTE: business-view only. Pulls business context from useUser().activeBusiness,
// so this will break/show wrong data if rendered on a customer-facing screen.
// TODO: fetch and pass in the necessary business data (name, address, timezone)
// as props instead of relying on activeBusiness, so this component can be
// reused for customer view too.
export function ServiceBox({ servicesWithRatings }: Readonly<{ servicesWithRatings:  ServiceWithRatings }>) {

    const business = useUser().activeBusiness;

    return (
        <div className="bg-(--surface) border border-(--border) rounded-(radius-lg) rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 relative">
            <img src={servicesWithRatings.services.serviceLogoUrl} className="h-40 object-contain w-full relative" />
            <div className="pt-4 px-4.5 pb-4.5">
                <p className="text-[0.75rem] text-(--text-3) mb-1 font-medium">{business?.businessName}</p>
                <h1 className="text-[0.9375rem] text-(--text-1) font-semibold mb-2">{servicesWithRatings.services.serviceName}</h1>
                <div className="flex items-center gap-2.5 text-[0.8125rem] text-(--text-2) mb-3.5">
                    <div className="flex gap-0.5"><StarRating rating={getAverageRating(servicesWithRatings.review.map(rev => rev.rating))} /></div>
                    {servicesWithRatings.review.length > 0 ? getAverageRating(servicesWithRatings.review.map(rev => rev.rating)) : 'no rating'} ({servicesWithRatings.review.length})
                </div>
                <span className="text-(--text-3) flex items-start gap-1 text-[0.8125rem] "><MapPin color="lightblue" />{business?.address.displayName}</span>
                <div className="flex items-center mt-4 justify-between">
                    <div className="text-[1rem] text-(--gold) font-semibold">₱{servicesWithRatings.services.price.toLocaleString()}</div>
                    <div className="text-[0.75rem] text-(--teal) font-medium">{TimezoneLabel(business?.timezone!)}</div>
                </div>
            </div>
        </div>
    );
}