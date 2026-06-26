import { useMemo, useState } from "react";
import {
    Plus,
    Search,
    Pencil,
    Trash2,
    X,
    Check,
    Loader2,
    Users,
    ChevronDown,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types — mirrors the staff / services / staff_services junction     */
/* ------------------------------------------------------------------ */

export interface Service {
    id: string;
    name: string;
    emoji: string;
}

export interface Staff {
    id: string;
    fullName: string;
    position?: string;
    avatarUrl?: string;
    isActive: boolean;
    serviceIds: string[];
}

/* ------------------------------------------------------------------ */
/*  Mock data — swap for Spring Boot API calls                         */
/* ------------------------------------------------------------------ */

const ALL_SERVICES: Service[] = [
    { id: "s1", name: "Haircut", emoji: "https://picsum.photos/200/300?random=11" },
    { id: "s2", name: "Coloring", emoji: "https://picsum.photos/200/300?random=12" },
    { id: "s3", name: "Massage", emoji: "https://picsum.photos/200/300?random=10" },
    { id: "s4", name: "Manicure", emoji: "https://picsum.photos/200/300?random=100" },
    { id: "s5", name: "Facial", emoji: "https://picsum.photos/200/300?random=90" },
    { id: "s6", name: "Beard Trim", emoji: "https://picsum.photos/200/300?random=109" },
];

const INITIAL_STAFF: Staff[] = [
    {
        id: "1",
        fullName: "Sarah Jimenez",
        position: "Senior Stylist",
        avatarUrl: "https://picsum.photos/200/300?random=1",
        isActive: true,
        serviceIds: ["s1", "s2"],
    },
    {
        id: "2",
        fullName: "Marco Dela Cruz",
        position: "Massage Therapist",
        avatarUrl: "https://picsum.photos/200/300?random=2",
        isActive: true,
        serviceIds: ["s3"],
    },
    {
        id: "3",
        fullName: "Joy Tan",
        position: "Nail Technician",
        avatarUrl: "https://picsum.photos/200/300?random=3",
        isActive: false,
        serviceIds: ["s4", "s5"],
    },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getInitials(name: string) {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((p) => p[0]?.toUpperCase())
        .join("");
}

type FilterValue = "all" | "active" | "inactive";

/* ------------------------------------------------------------------ */
/*  Toast                                                               */
/* ------------------------------------------------------------------ */

function Toast({ message }: { message: string }) {
    return (
        <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-2 rounded-xl border border-[--teal]/30 bg-[--surface] px-4 py-3 shadow-lg shadow-black/30 animate-in fade-in slide-in-from-bottom-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[--teal]/20 text-[--teal]">
                <Check className="h-3.5 w-3.5" />
            </span>
            <p className="text-sm text-white">{message}</p>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Status Toggle                                                      */
/* ------------------------------------------------------------------ */

function StatusToggle({
    checked,
    onChange,
    label,
}: {
    checked: boolean;
    onChange: (next: boolean) => void;
    label: string;
}) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={label}
            onClick={() => onChange(!checked)}
            className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--gold] focus-visible:ring-offset-2 focus-visible:ring-offset-[--bg] ${checked ? "bg-emerald-500" : "bg-white/15"
                }`}
        >
            <span
                className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${checked ? "translate-x-5" : "translate-x-0"
                    }`}
            />
        </button>
    );
}

/* ------------------------------------------------------------------ */
/*  Filter segmented control                                           */
/* ------------------------------------------------------------------ */

function FilterTabs({
    value,
    onChange,
}: {
    value: FilterValue;
    onChange: (v: FilterValue) => void;
}) {
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

/* ------------------------------------------------------------------ */
/*  Multi-select services combobox (for the modal)                     */
/* ------------------------------------------------------------------ */

function ServiceMultiSelect({
    selected,
    onChange,
}: {
    selected: string[];
    onChange: (ids: string[]) => void;
}) {
    const [open, setOpen] = useState(false);

    function toggle(id: string) {
        onChange(
            selected.includes(id)
                ? selected.filter((s) => s !== id)
                : [...selected, id]
        );
    }

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-white/10 bg-(--bg) px-3 py-2 text-left text-sm text-white"
            >
                <span className={selected.length ? "text-white" : "text-white/40"}>
                    {selected.length
                        ? `${selected.length} service${selected.length > 1 ? "s" : ""} selected`
                        : "Select services offered by this staff member"}
                </span>
                <ChevronDown
                    className={`h-4 w-4 text-white/50 transition-transform ${open ? "rotate-180" : ""}`}
                />
            </button>

            {open && (
                <div className="absolute z-20 mt-1 w-full rounded-lg border border-white/10 bg-(--surface) py-1 shadow-xl shadow-black/40">
                    {ALL_SERVICES.map((service) => {
                        const checked = selected.includes(service.id);
                        return (
                            <label
                                key={service.id}
                                className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm text-white hover:bg-white/5"
                            >
                                <span
                                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${checked
                                            ? "border-(--teal) bg-(--teal)"
                                            : "border-white/30"
                                        }`}
                                >
                                    {checked && <Check className="h-3 w-3 text-black" />}
                                </span>
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={checked}
                                    onChange={() => toggle(service.id)}
                                />
                                <span>
                                    {service.emoji} {service.name}
                                </span>
                            </label>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Staff Card                                                         */
/* ------------------------------------------------------------------ */

function StaffCard({
    staff,
    services,
    onToggleActive,
    onEdit,
    onArchive,
}: {
    staff: Staff;
    services: Service[];
    onToggleActive: (next: boolean) => void;
    onEdit: () => void;
    onArchive: () => void;
}) {
    const assignedServices = services.filter((s) =>
        staff.serviceIds.includes(s.id)
    );

    return (
        <div
            className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-[--surface] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/30 ${staff.isActive ? "" : "opacity-60"
                }`}
        >
            <div className="flex flex-col items-center px-6 pt-6">
                <div className="relative">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[--bg] text-xl font-semibold text-[--gold] ring-2 ring-[--gold]/40 ring-offset-2 ring-offset-[--surface] overflow-hidden">
                        {staff.avatarUrl ? (
                            <img
                                src={staff.avatarUrl}
                                alt={staff.fullName}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            getInitials(staff.fullName)
                        )}
                    </div>
                    {!staff.isActive && (
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white/70">
                            Inactive
                        </span>
                    )}
                </div>

                <h3 className="mt-4 text-center text-lg font-semibold text-white">
                    {staff.fullName}
                </h3>
                <p className="text-center text-sm text-white/50">
                    {staff.position || "Staff"}
                </p>
            </div>

            <p className="text-(--text-2) px-6 text-[12px] mt-4 font-semibold">Services</p>

            <div className="mt-2 px-6">
                {assignedServices.length > 0 ? (
                    <div className="hide-scrollbar gap-2 flex overflow-x-auto pb-1">
                        {assignedServices.map((service) => (
                            <span
                                key={service.id}
                                className="shrink-0 flex items-center gap-2 whitespace-nowrap text-xs bg-(--teal)/15 rounded-full px-4 py-1 font-medium text-(--teal)"
                            >
                                <img className="w-4 h-4 rounded-[50%]" src={service.emoji} alt="" /> {service.name}
                            </span>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-xs text-white/30">
                        No services assigned
                    </p>
                )}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-white/10 px-6 py-4">
                <StatusToggle
                    checked={staff.isActive}
                    onChange={onToggleActive}
                    label={`Toggle ${staff.fullName} active status`}
                />

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
                        onClick={onArchive}
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

/* ------------------------------------------------------------------ */
/*  Add / Edit Modal                                                   */
/* ------------------------------------------------------------------ */

function StaffModal({
    initial,
    onClose,
    onSave,
}: {
    initial: Staff | null;
    onClose: () => void;
    onSave: (staff: Omit<Staff, "id"> & { id?: string }) => Promise<void>;
}) {
    const [fullName, setFullName] = useState(initial?.fullName ?? "");
    const [position, setPosition] = useState(initial?.position ?? "");
    const [avatarUrl, setAvatarUrl] = useState(initial?.avatarUrl ?? "");
    const [serviceIds, setServiceIds] = useState<string[]>(
        initial?.serviceIds ?? []
    );
    const [isActive, setIsActive] = useState(initial?.isActive ?? true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit() {
        if (!fullName.trim()) {
            setError("Full name is required.");
            return;
        }
        setError("");
        setSaving(true);
        try {
            await onSave({
                id: initial?.id,
                fullName: fullName.trim(),
                position: position.trim() || undefined,
                avatarUrl: avatarUrl.trim() || undefined,
                serviceIds,
                isActive,
            });
        } finally {
            setSaving(false);
        }
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
            role="dialog"
            aria-modal="true"
            aria-label={initial ? "Edit staff member" : "Add staff member"}
        >
            <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-(--surface) shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                    <h2 className="text-lg font-semibold text-white">
                        {initial ? "Edit Staff Member" : "Add Staff Member"}
                    </h2>
                    <button
                        onClick={onClose}
                        aria-label="Close"
                        className="cursor-pointer rounded-lg p-1.5 text-white/50 hover:bg-white/5 hover:text-white"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <div className="max-h-[70vh] space-y-4 overflow-y-auto px-6 py-5">
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-(--bg) text-sm font-semibold text-(--gold) ring-1 ring-white/10">
                            {avatarUrl ? (
                                <img
                                    src={avatarUrl}
                                    alt="Avatar preview"
                                    className="h-full w-full object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = "none";
                                    }}
                                />
                            ) : (
                                getInitials(fullName || "?")
                            )}
                        </div>
                        <div className="flex-1">
                            <label className="mb-1 block text-xs font-medium text-white/60">
                                Avatar URL
                            </label>
                            <input
                                type="text"
                                value={avatarUrl}
                                onChange={(e) => setAvatarUrl(e.target.value)}
                                placeholder="https://..."
                                className="w-full rounded-lg border border-white/10 bg-(--bg) px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-(--gold)/60 focus:outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-medium text-white/60">
                            Full Name <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="e.g. Sarah Jimenez"
                            className="w-full rounded-lg border border-white/10 bg-(--bg) px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-(--gold)/60 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-medium text-white/60">
                            Position / Title
                        </label>
                        <input
                            type="text"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                            placeholder="e.g. Senior Stylist"
                            className="w-full rounded-lg border border-white/10 bg-(--bg) px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-(--gold)/60 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-medium text-white/60">
                            Services Offered
                        </label>
                        <ServiceMultiSelect selected={serviceIds} onChange={setServiceIds} />
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-white/10 bg-(--bg) px-3 py-3">
                        <div>
                            <p className="text-sm font-medium text-white">Active Status</p>
                            <p className="text-xs text-white/50">
                                Inactive staff won't appear in booking flows.
                            </p>
                        </div>
                        <StatusToggle
                            checked={isActive}
                            onChange={setIsActive}
                            label="Toggle active status"
                        />
                    </div>

                    {error && <p className="text-sm text-red-400">{error}</p>}
                </div>

                <div className="flex items-center justify-end gap-3 border-t border-white/10 px-6 py-4">
                    <button
                        onClick={onClose}
                        disabled={saving}
                        className="cursor-pointer rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/5 disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={saving}
                        className="flex cursor-pointer items-center gap-2 rounded-lg bg-(--gold) px-4 py-2 text-sm font-semibold text-black transition-opacity hover:opacity-90 disabled:opacity-60"
                    >
                        {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                        Save Staff
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Empty State                                                         */
/* ------------------------------------------------------------------ */

function EmptyState({ onAdd }: { onAdd: () => void }) {
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

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export default function StaffManagementPage() {
    const [staffList, setStaffList] = useState<Staff[]>(INITIAL_STAFF);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<FilterValue>("all");
    const [modalState, setModalState] = useState<
        { mode: "add" } | { mode: "edit"; staff: Staff } | null
    >(null);
    const [toast, setToast] = useState<string | null>(null);

    function showToast(message: string) {
        setToast(message);
        setTimeout(() => setToast(null), 3000);
    }

    const filteredStaff = useMemo(() => {
        return staffList.filter((s) => {
            const matchesSearch = s.fullName
                .toLowerCase()
                .includes(search.trim().toLowerCase());
            const matchesFilter =
                filter === "all" ||
                (filter === "active" && s.isActive) ||
                (filter === "inactive" && !s.isActive);
            return matchesSearch && matchesFilter;
        });
    }, [staffList, search, filter]);

    function handleToggleActive(id: string, next: boolean) {
        setStaffList((prev) =>
            prev.map((s) => (s.id === id ? { ...s, isActive: next } : s))
        );
    }

    function handleArchive(id: string) {
        const target = staffList.find((s) => s.id === id);
        setStaffList((prev) => prev.filter((s) => s.id !== id));
        if (target) showToast(`${target.fullName} removed from your team.`);
    }

    async function handleSave(input: Omit<Staff, "id"> & { id?: string }) {
        // Simulate network latency — replace with real Spring Boot API call.
        await new Promise((resolve) => setTimeout(resolve, 600));

        if (input.id) {
            setStaffList((prev) =>
                prev.map((s) =>
                    s.id === input.id ? { ...(input as Staff), id: input.id! } : s
                )
            );
            showToast(`${input.fullName} updated successfully!`);
        } else {
            const newStaff: Staff = { ...input, id: crypto.randomUUID() };
            setStaffList((prev) => [newStaff, ...prev]);
            showToast(`${input.fullName} added successfully!`);
        }
        setModalState(null);
    }

    return (
        <div className="min-h-screen bg-[--bg] text-white">
            <div className="mx-auto max-w-7xl px-6 py-8">
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
                    {staffList.length === 0 ? (
                        <EmptyState onAdd={() => setModalState({ mode: "add" })} />
                    ) : filteredStaff.length === 0 ? (
                        <div className="rounded-2xl border border-white/10 px-6 py-16 text-center text-sm text-white/50">
                            No staff match your search or filter.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 grid-cols-2 sm:grid-cols-3">
                            {filteredStaff.map((staff) => (
                                <StaffCard
                                    key={staff.id}
                                    staff={staff}
                                    services={ALL_SERVICES}
                                    onToggleActive={(next) => handleToggleActive(staff.id, next)}
                                    onEdit={() => setModalState({ mode: "edit", staff })}
                                    onArchive={() => handleArchive(staff.id)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {modalState && (
                <StaffModal
                    initial={modalState.mode === "edit" ? modalState.staff : null}
                    onClose={() => setModalState(null)}
                    onSave={handleSave}
                />
            )}

            {toast && <Toast message={toast} />}
        </div>
    );
}

/*
  Notes for wiring to the Spring Boot backend:

  - GET    /api/staff                -> populate staffList (filter by businessId server-side)
  - POST   /api/staff                -> handleSave (input.id undefined)
  - PUT    /api/staff/{id}           -> handleSave (input.id present)
  - PATCH  /api/staff/{id}/status    -> handleToggleActive
  - DELETE /api/staff/{id}           -> handleArchive
  - GET    /api/services             -> replace ALL_SERVICES with a fetched list
  - staff_services join rows are derived from Staff.serviceIds on save;
    send as a plain string[] in the request body and let the backend
    reconcile the junction table.

  Add to your global stylesheet if not already present:
    .hide-scrollbar::-webkit-scrollbar { display: none; }
    .hide-scrollbar { scrollbar-width: none; }
*/