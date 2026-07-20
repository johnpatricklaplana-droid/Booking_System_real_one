import { useEffect, useState } from "react";
import {
    Plus,
    Search,
    Users,
} from "lucide-react";
import type { Staff, StaffWithServices } from "../../interfaces/Types";
import { useUser } from "../../provider/UserContext";
import { get } from "../../api/api";
import { StaffCard } from "../../components/StaffCard";
import { StaffModal } from "../../components/StaffModal";
import { API_URL } from "../../api/config";

type FilterValue = "all" | "active" | "inactive";

function FilterTabs({
    value,
    onChange,
}: Readonly<{
    value: FilterValue;
    onChange: (v: FilterValue) => void;
}>) {
    const options: { value: FilterValue; label: string }[] = [
        { value: "all", label: "All" },
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
    ];

    return (
        <div className="flex items-center gap-1 rounded-full border border-white/10 bg-[--surface] p-1">
            {options.map((opt) => (
                <button
                    key={opt.value}
                    onClick={() => onChange(opt.value)}
                    className={`cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-150 ${value === opt.value
                            ? "bg-[--gold] text-black"
                            : "text-white/60 hover:text-white"
                        }`}
                >
                    {opt.label}
                </button>
            ))}
        </div>
    );
}

function EmptyState({ onAdd }: Readonly<{ onAdd: () => void }>) {
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 px-6 py-20 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[--gold]/10">
                <Users className="h-8 w-8 text-[--gold]" />
            </div>
            <h2 className="mt-5 text-lg font-semibold text-white">
                No team members yet
            </h2>
            <p className="mt-1 max-w-sm text-sm text-white/50">
                Invite or add your first staff member to start scheduling.
            </p>
            <button
                onClick={onAdd}
                className="mt-6 flex cursor-pointer items-center gap-2 rounded-lg bg-(--gold) px-5 py-2.5 text-sm font-semibold text-black transition-opacity hover:opacity-90"
            >
                <Plus className="h-4 w-4" />
                Add Staff Member
            </button>
        </div>
    );
}

export default function StaffManagementPage() {
    const [staffList, setStaffList] = useState<Staff[]>([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<FilterValue>("all");
    const [modalState, setModalState] = useState<
        { mode: "add" } | { mode: "edit"; staff: StaffWithServices } | null
    >(null);

    const businessId = useUser().activeBusiness?.businessId;

    useEffect(() => {

        if(!businessId) return;

        const getStaff = async () => {
            const url = `${API_URL}/api/staff/business/${businessId}`;

            const result: Staff[] = await get(url);

            console.log(result);

            if(result) {
                setStaffList(result.map((staff: Staff) => {
                    return {
                        id: staff.id,
                        fullName: staff.fullName,
                        title: staff.title,
                        avatarUrl: staff.avatarUrl,
                        active: staff.active,
                        createdAt: staff.createdAt,
                        staffUnavailable: staff.staffUnavailable
                    }
                }))
            }

        };

        getStaff();

    }, [businessId]);

    return (
        <div className="min-h-screen bg-[--bg]">
            <div className="mx-auto">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Team Members</h1>
                        <p className="mt-1 text-sm text-white/50">
                            Manage your staff, services, and availability.
                        </p>
                    </div>
                    <button
                        onClick={() => setModalState({ mode: "add" })}
                        className="flex cursor-pointer items-center gap-2 rounded-lg bg-(--gold) px-4 py-2.5 text-sm font-semibold text-black transition-opacity hover:opacity-90"
                    >
                        <Plus className="h-4 w-4" />
                        Add Staff Member
                    </button>
                </div>

                {/* Filter & search */}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                    <div className="relative w-full max-w-xs">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search staff by name..."
                            className="w-full rounded-lg border border-white/10 bg-[--surface] py-2 pl-9 pr-3 text-sm text-white placeholder:text-white/40 focus:border-[--gold]/60 focus:outline-none"
                        />
                    </div>
                    <FilterTabs value={filter} onChange={setFilter} />
                </div>

                {/* Grid / Empty state */}
                <div className="mt-6">
                    {staffList.length === 0 && <EmptyState onAdd={() => setModalState({ mode: "add" })} />}
                    
                    {staffList.length === 0 &&
                        <div className="rounded-2xl border border-white/10 px-6 py-16 text-center text-sm text-white/50">
                            No staff match your search or filter.
                        </div>}
                    
                    {staffList.length !== 0 && <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 sm:grid-cols-3">
                        {staffList.map((staff) => (
                            <button
                                key={staff.id}
                            >
                                <StaffCard
                                    staff={staff}
                                />
                            </button>
                        ))}
                    </div>}
                   
                </div>
            </div>

            {modalState && (
                <StaffModal
                    onClose={() => setModalState(null)}
                />
            )}
        </div>
    );
}
