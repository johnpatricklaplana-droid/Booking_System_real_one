import { Calendar, MapPin } from "lucide-react";
import type { BusinessPublic } from "../interfaces/Types";
import { TimezoneLabel } from "../helper/convertSome";

export function BusinessCard ({ businessWithOwner }: { businessWithOwner: BusinessPublic} ) {
    return (
        <div className="bg-(--surface) rounded-2xl border relative border-(--border) overflow-hidden">
            <div className={`absolute right-4 top-4 text-sm bg-emerald-500/15 backdrop-blur-2xl border-2 border-(--teal) text-(--text-1) py-1 px-2 rounded-md font-medium`}>active</div>
            <img className="w-full object-contain h-60" src={businessWithOwner.business.businessLogoUrl} alt={businessWithOwner.business.businessName} />
            <div className="p-4">
                <h1 className="text-(--text-1) truncate text-md font-medium text-start">{businessWithOwner.business.businessName}</h1>
                <p className="truncate text-start text-(--text-2) text-sm">{businessWithOwner.business.description}</p>
                <div className="flex items-center gap-1 mt-2">
                    <img className="w-6 h-6 rounded-full" src={businessWithOwner.user.avatarUrl} alt={businessWithOwner.user.avatarUrl} />
                    <p className="text-start text-(--text-3) text-xs mt-1">{businessWithOwner.user.firstName} {businessWithOwner.user.lastName}</p>
                </div>
                <div className="flex items-center gap-1 mt-4">
                    <MapPin size={14} color="var(--text-3)"/>
                    <p className="text-(--text-3) truncate text-xs">{businessWithOwner.business.address.displayName}</p>
                </div>
                <div className="mt-2 flex items-center justify-between text-(--text-3)">
                    <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <p className="text-start text-xs">started at {new Date(businessWithOwner.business.startedAt).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                    <p className="text-xs text-(--teal) font-medium">{TimezoneLabel(businessWithOwner.business.timezone)}</p>
                </div>
            </div>
        </div>
    );
}