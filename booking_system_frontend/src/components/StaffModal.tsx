import { useState } from "react";
import type { Staff } from "../interfaces/Types";
import { Loader2, X } from "lucide-react";
import { ServiceMultiSelect } from "./MultiSelect";

export function StaffModal({
    onClose,
}: {
    onClose: () => void;
}) {
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
            role="dialog"
            aria-modal="true"
            aria-label="Add staff member"
        >
            <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-(--surface) shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                    <h2 className="text-lg font-semibold text-white">
                        Add Staff Member
                    </h2>
                    <button
                        onClick={onClose}
                        aria-label="Close"
                        className="cursor-pointer rounded-lg p-1.5 text-white/50 hover:bg-white/5 hover:text-white"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <div className="max-h-[70vh] space-y-4 px-6 py-5">
                    <div className="flex items-center gap-4">
                        <div className="flex h-36 w-36 mx-auto shrink-0 items-center justify-center overflow-hidden rounded-full bg-(--bg) text-sm font-semibold text-(--gold) ring-1 ring-white/10">
                            <img
                                src="https://picsum.photos/200/300?random=1"
                                alt="Avatar preview"
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = "none";
                                }}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-medium text-white/60">
                            Full Name <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
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
                            placeholder="e.g. Senior Stylist"
                            className="w-full rounded-lg border border-white/10 bg-(--bg) px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-(--gold)/60 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-medium text-white/60">
                            Services Offered
                        </label>
                        <ServiceMultiSelect />
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