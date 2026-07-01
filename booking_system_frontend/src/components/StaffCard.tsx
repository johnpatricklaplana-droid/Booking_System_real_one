import { Pencil, Trash2 } from "lucide-react";
import type { ServiceResponse, Staff } from "../interfaces/Types";
import { useUser } from "../provider/UserContext";

export function StaffCard({
    staff,
    onEdit,
}: {
    staff: Staff;
    onEdit: () => void;
}) {

    const businessId = useUser().activeBusiness?.businessId;

    function getInitials(name: string) {
        return name
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map((p) => p[0]?.toUpperCase())
            .join("");
    }

    return (
        <div
            className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-[--surface] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/30 ${staff.active ? "" : "opacity-60"
                }`}
        >
            <div className="flex flex-col items-center px-6 pt-6">
                <div className="relative">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[--bg] text-xl font-semibold text-[--gold] ring-2 ring-[--gold]/40 ring-offset-2 ring-offset-[--surface] overflow-hidden">
                        {staff.avatarUrl ? (
                            <img
                                src={`http://localhost:8080/api/staff/${staff.avatarUrl}`}
                                alt={staff.fullName}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            getInitials(staff.fullName)
                        )}
                    </div>
                    {!staff.active && (
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white/70">
                            Inactive
                        </span>
                    )}
                </div>

                <h3 className="mt-4 text-center text-lg font-semibold text-white">
                    {staff.fullName}
                </h3>
                <p className="text-center text-sm text-white/50">
                    {staff.title || "Staff"}
                </p>
            </div>

            <p className="text-(--text-2) px-6 text-[12px] mt-4 font-semibold">Services</p>

            <div className="mt-2 px-6"> 
                <p className="text-center text-xs text-white/30">
                    No services assigned
                </p>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-white/10 px-6 py-4">

                <div className="flex items-center gap-1">
                    <button
                        onClick={onEdit}
                        title="Edit"
                        aria-label={`Edit ${staff.fullName}`}
                        className="cursor-pointer rounded-lg p-2 text-white/50 transition-colors hover:bg-white/5 hover:text-[--gold]"
                    >
                        <Pencil className="h-4 w-4" />
                    </button>
                    <button
                        title="Archive"
                        aria-label={`Archive ${staff.fullName}`}
                        className="cursor-pointer rounded-lg p-2 text-white/50 transition-colors hover:bg-red-500/10 hover:text-red-400"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}