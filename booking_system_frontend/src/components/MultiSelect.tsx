import { Check, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import type { ServiceResponse } from "../interfaces/Types";
import { getServices } from "../hooks/service";
import { useUser } from "../provider/UserContext";

export function ServiceMultiSelect({
    service,
    checked = true
}: {
    service: ServiceResponse,
    checked: boolean
}) {

    return <div
            key={service.id}
                className="flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-sm text-white hover:bg-white/5"
            >
                <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border
                                    ${checked ? 'border-(--teal) bg-(--teal)' : 'border-white/30'}`
                    }
                >
                    {checked && <Check className="h-3 w-3 text-black" />}
                </span>
                <input
                    type="checkbox"
                    className="hidden"
                />
                <span className="flex items-center gap-2">
                    <img className="w-8 h-8 rounded-[50%]" src={service.serviceLogoUrl} alt="" /> {service.serviceName}
                </span>
    </div>
}