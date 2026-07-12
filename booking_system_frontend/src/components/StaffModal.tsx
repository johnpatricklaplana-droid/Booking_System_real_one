import { useEffect, useState } from "react";
import { ChevronDown, Loader2, X, Image } from "lucide-react";
import { ServiceMultiSelect } from "./MultiSelect";
import { useUser } from "../provider/UserContext";
import type { ServiceWithRatings } from "../interfaces/Types";
import { getServices } from "../hooks/service";
import { PostFormData } from "../api/api";

export function StaffModal({
    onClose,
}: {
    onClose: () => void;
}) {
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [selected, setSelected] = useState<string[]>([]);
    const [open, setOpen] = useState(false);
    const [services, setServices] = useState<ServiceWithRatings[]>([]);
    const [image, setImage] = useState(null);
    const [inputs, setInputs] = useState({
        fullName: "",
        title: ""
    });

    const businessId = useUser().activeBusiness?.businessId;

    useEffect(() => {

        if (!businessId) return;

        const getIt = async () => {

            const result: ServiceWithRatings[] = await getServices(businessId);

            setServices(result);

        };

        getIt();

    }, [businessId]);

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];

        setImage(file);
    };

    const saveStaff = async () => {

        if(!image) return;

        const body = {
            businessId: businessId,
            serviceId: selected,
            fullName: inputs.fullName,
            title: inputs.title
        };

        const url = "http://localhost:8080/api/staff";
        const requestBody = new FormData();
        requestBody.append('body', new Blob([JSON.stringify(body)], { type: 'application/json' }));
        requestBody.append('image', image);

        setSaving(true);

        const result = await PostFormData(url, requestBody);

        if(result.status === 201) {
            setSaving(false);
        } else {
            setError("bad one");
            setSaving(false);
        }

    }

    const handleInputChange = (e: any) => {
        const id = e.target.id;
        const value = e.target.value;

        setInputs(prev => ({...prev, [id]: value}));

    }

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

                <div className="max-h-[70vh] overflow-y-auto space-y-4 px-6 py-5">
                    <div className="flex items-center gap-4">
                        <div className="flex h-36 w-36 mx-auto relative group shrink-0 items-center justify-center overflow-hidden rounded-full bg-(--bg) text-sm font-semibold text-(--gold) ring-1 ring-white/10">
                            {image !== null 
                            && <img
                                src={URL.createObjectURL(image)}
                                alt="Avatar preview"
                                className="h-full w-full z-10 object-cover"
                                onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = "none";
                                }}
                            />}
                            <label htmlFor="imageInput" className="flex justify-center top-[50%] group-hover:backdrop-blur-2xl group-hover:z-20 left-[50%] translate-x-[-50%] translate-y-[-50%] w-full absolute h-full flex-col items-center">
                                <Image />
                                <p>upload some</p>
                                <input type="file" onChange={handleImageChange} hidden id="imageInput" />
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-medium text-white/60">
                            Full Name <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            value={inputs.fullName}
                            onChange={handleInputChange}
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
                            id="title"
                            value={inputs.title}
                            onChange={handleInputChange}
                            placeholder="e.g. Senior Stylist"
                            className="w-full rounded-lg border border-white/10 bg-(--bg) px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-(--gold)/60 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-medium text-white/60">
                            Services Offered
                        </label>
                        <div
                            className="relative"
                        >
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
                                <div className="absolute z-20 mt-1 w-full overflow-hidden rounded-lg border border-white/10 bg-(--surface) py-1 shadow-xl shadow-black/40">
                                    {services.map(s => 
                                        <button
                                            className="w-full"
                                            key={s.services.id}
                                            onClick={() => setSelected(prev => {
                                                const isSelected = prev.find(p => s.services.id === p);

                                                return isSelected
                                                    ? prev.filter(p => s.services.id !== p)
                                                    : [...prev, s.services.id];
                                            })}
                                        >
                                            <ServiceMultiSelect service={s.services} checked={selected.includes(s.services.id)} />
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
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
                        onClick={saveStaff}
                    >
                        {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                        Save Staff
                    </button>
                </div>
            </div>
        </div>
    );
}