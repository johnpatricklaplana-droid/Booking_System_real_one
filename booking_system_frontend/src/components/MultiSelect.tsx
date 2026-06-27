import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import type { ServiceResponse } from "../interfaces/Types";

const ALL_SERVICES: ServiceResponse[] = [
    {
        capacity: 1,
        description: "flkajflkafj",
        duration: "1T1H",
        id: "kflaf",
        price: 20,
        serviceLogoUrl: "https://picsum.photos/200/300?random=1",
        serviceName: "michael jackson",
        status: "ACTIVE"
    }
]

export function ServiceMultiSelect({
}: {
  
}) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-white/10 bg-(--bg) px-3 py-2 text-left text-sm text-white"
            >
                {/* <span className={selected.length ? "text-white" : "text-white/40"}>
                    {selected.length
                        ? `${selected.length} service${selected.length > 1 ? "s" : ""} selected`
                        : "Select services offered by this staff member"}
                </span> */}
                <ChevronDown
                    className={`h-4 w-4 text-white/50 transition-transform ${open ? "rotate-180" : ""}`}
                />
            </button>

            {open && (
                <div className="absolute z-20 mt-1 w-full rounded-lg border border-white/10 bg-(--surface) py-1 shadow-xl shadow-black/40">
                    {ALL_SERVICES.map((service) => {
                        // const checked = selected.includes(service.id);
                        return (
                            <label
                                key={service.id}
                                className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm text-white hover:bg-white/5"
                            >
                                <span
                                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border`}
                                    // ? "border-(--teal) bg-(--teal)"
                                    //     : "border-white/30"
                                >
                                    {/* {checked && <Check className="h-3 w-3 text-black" />} */}
                                </span>
                                <input
                                    type="checkbox"
                                    className="hidden"
                                />
                                <span>
                                    {"kfjaf"} {service.serviceName}
                                </span>
                            </label>
                        );
                    })}
                </div>
            )}
        </div>
    );
}