import { MapPin } from "lucide-react";
import type { ServiceResponse } from "../interfaces/Types";
import { useUser } from "../provider/UserContext";

export function ServiceBox( { services } : { services:  ServiceResponse }) {

    const business = useUser().activeBusiness;

    return (
        
        <div className="bg-(--surface) border border-(--border) rounded-(radius-lg) rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 relative">
            <img src={services.serviceLogoUrl} className="h-40 object-contain w-full relative" />
            <div className="pt-4 px-4.5 pb-4.5">
                <p className="text-[0.75rem] text-(--text-3) mb-1 font-medium">{business?.businessName}</p>
                <h1 className="text-[0.9375rem] text-(--text-1) font-semibold mb-2">{services.serviceName}</h1>
                <div className="flex items-center gap-2.5 text-[0.8125rem] text-(--text-2) mb-3.5">
                    <div className="flex gap-0.5"><span className="text-(--gold) text-[0.8125rem]">★</span><span className="text-(--gold)">★</span><span
                        className="text-[0.8125rem] text-(-gold)">★</span><span className="text-[0.8125rem] text-(--text-3)">★</span><span className="text-[0.8125rem] text-(--text-3)">★</span></div>
                    4.9 (218)
                </div>
                <span className="text-(--text-3) flex items-start gap-1 text-[0.8125rem] "><MapPin color="lightblue" />{business?.address} · 0.8 km</span>
                <div className="flex items-center mt-4 justify-between">
                    <div className="text-[1rem] text-(--gold) font-semibold">₱{services.price.toLocaleString()}</div>
                    <div className="text-[0.75rem] text-(--teal) font-medium">todo: Today 3:00 PM</div>
                </div>
            </div>
            <div className="absolute inset-0 flex items-end p-4.5 opacity-0 transition-opacity duration-200 bg-[linear-gradient(to_top,rgba(10,10,12,0.95)0%,transparent_60%)]">
                <button className="btn btn-primary w-full justify-center">Book now</button>
            </div>
        </div>
    );
}