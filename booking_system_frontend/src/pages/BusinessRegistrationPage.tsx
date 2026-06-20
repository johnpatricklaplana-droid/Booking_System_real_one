import React, { useState, useMemo, useRef, useEffect } from "react";
import {
    Building2,
    Store,
    ShoppingBag,
    Scissors,
    Wrench,
    Stethoscope,
    Dumbbell,
    Camera,
    GraduationCap,
    MoreHorizontal,
    Mail,
    Phone,
    MapPin,
    Search,
    Check,
    ChevronLeft,
    ChevronRight,
    Clock,
    Globe,
    Upload,
    Image as ImageIcon,
    X,
    AlertCircle,
    CheckCircle2,
    Loader2,
    type LucideIcon,
} from "lucide-react";
import  EmojiFlag, { CountryFlag }  from "ts-react-emoji-flag";
import { get } from "../api/api";

/* ------------------------------------------------------------------ */
/* Types                                                                */
/* ------------------------------------------------------------------ */

type BusinessType =
    | "retail"
    | "salon_spa"
    | "home_services"
    | "health_wellness"
    | "fitness"
    | "photography"
    | "education"
    | "other";

interface BusinessTypeOption {
    value: BusinessType;
    label: string;
    description: string;
    icon: LucideIcon;
}

interface BusinessInfoData {
    businessName: string;
    businessType: BusinessType | "";
    description: string;
}

interface ContactInfoData {
    email: string;
    phone: string;
}

interface LocationData {
    addressSearch: string;
    addressLine: string;
    postalCode: string;
    city: string;
    province: string;
    country: string;
    timezone: string;
}

interface LogoData {
    file: File | null;
    previewUrl: string | null;
    width: number | null;
    height: number | null;
    sizeBytes: number | null;
}

type StepIndex = 0 | 1 | 2 | 3;
type Direction = "forward" | "backward";

interface AddressSuggestion {
    address: string;
    postalCode: string;
    city: string;
    province: string;
    country: string;
    timezone: string;
}

/* ------------------------------------------------------------------ */
/* Mock data                                                            */
/* ------------------------------------------------------------------ */

const MOCK_ADDRESSES: AddressSuggestion[] = [
    {
        address: "SM City Rosales",
        postalCode: "2441",
        city: "Rosales",
        province: "Pangasinan",
        country: "Philippines",
        timezone: "Asia/Manila",
    },
    {
        address: "Dagupan City Hall",
        postalCode: "2400",
        city: "Dagupan",
        province: "Pangasinan",
        country: "Philippines",
        timezone: "Asia/Manila",
    },
    {
        address: "Robinsons Place Dagupan",
        postalCode: "2400",
        city: "Dagupan",
        province: "Pangasinan",
        country: "Philippines",
        timezone: "Asia/Manila",
    },
    {
        address: "Times Square",
        postalCode: "10036",
        city: "New York",
        province: "New York",
        country: "United States",
        timezone: "America/New_York",
    },
    {
        address: "Tower Bridge",
        postalCode: "SE1 2UP",
        city: "London",
        province: "Greater London",
        country: "United Kingdom",
        timezone: "Europe/London",
    },
];

const BUSINESS_TYPES: BusinessTypeOption[] = [
    { value: "retail", label: "Retail & Shop", description: "Storefronts, boutiques, and product sellers", icon: ShoppingBag },
    { value: "salon_spa", label: "Salon & Spa", description: "Hair, beauty, and grooming services", icon: Scissors },
    { value: "home_services", label: "Home Services", description: "Repairs, cleaning, and on-site work", icon: Wrench },
    { value: "health_wellness", label: "Health & Wellness", description: "Clinics, therapy, and care providers", icon: Stethoscope },
    { value: "fitness", label: "Fitness & Training", description: "Gyms, coaches, and studios", icon: Dumbbell },
    { value: "photography", label: "Photography & Media", description: "Photographers, studios, videographers", icon: Camera },
    { value: "education", label: "Education & Tutoring", description: "Lessons, courses, and mentoring", icon: GraduationCap },
    { value: "other", label: "Other", description: "Doesn't fit the categories above", icon: MoreHorizontal },
];

const TIMEZONE_OPTIONS = [
    "Asia/Manila",
    "America/New_York",
    "America/Los_Angeles",
    "America/Chicago",
    "Europe/London",
    "Europe/Paris",
    "Europe/Berlin",
    "Asia/Tokyo",
    "Asia/Singapore",
    "Asia/Hong_Kong",
    "Australia/Sydney",
    "UTC",
];

const STEPS: { id: StepIndex; label: string; description: string }[] = [
    { id: 0, label: "Business Info", description: "Tell us about your business" },
    { id: 1, label: "Contact", description: "How customers reach you" },
    { id: 2, label: "Location", description: "Where you operate" },
    { id: 3, label: "Logo", description: "Your brand identity" },
];

const DESCRIPTION_LIMIT = 500;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[\d\s().-]{7,20}$/;

/* ------------------------------------------------------------------ */
/* Validation                                                           */
/* ------------------------------------------------------------------ */

function validateBusinessInfo(data: BusinessInfoData) {
    const errors: Partial<Record<keyof BusinessInfoData, string>> = {};
    if (!data.businessName.trim()) errors.businessName = "Business name is required.";
    else if (data.businessName.trim().length < 2) errors.businessName = "Name must be at least 2 characters.";
    if (!data.businessType) errors.businessType = "Choose a business type.";
    if (!data.description.trim()) errors.description = "Add a short description.";
    else if (data.description.length > DESCRIPTION_LIMIT) errors.description = `Keep it under ${DESCRIPTION_LIMIT} characters.`;
    return errors;
}

function validateContactInfo(data: ContactInfoData) {
    const errors: Partial<Record<keyof ContactInfoData, string>> = {};
    if (!data.email.trim()) errors.email = "Email is required.";
    else if (!EMAIL_REGEX.test(data.email.trim())) errors.email = "Enter a valid email address.";
    if (!data.phone.trim()) errors.phone = "Phone number is required.";
    else if (!PHONE_REGEX.test(data.phone.trim())) errors.phone = "Enter a valid phone number.";
    return errors;
}

function formatBytes(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/* ------------------------------------------------------------------ */
/* Shared field components                                             */
/* ------------------------------------------------------------------ */

function FieldLabel({
    icon: Icon,
    label,
    description,
    required,
}: {
    icon?: LucideIcon;
    label: string;
    description?: string;
    required?: boolean;
}) {
    return (
        <div className="mb-1.5">
            <label className="flex items-center gap-2 text-sm font-medium text-(--text-1)">
                {Icon && <Icon className="h-4 w-4 text-(--gold)" />}
                {label}
                {required && <span className="text-(--gold)">*</span>}
            </label>
            {description && <p className="mt-0.5 text-xs text-(--text-3)">{description}</p>}
        </div>
    );
}

function FieldError({ message }: { message?: string }) {
    if (!message) return null;
    return (
        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-400">
            <AlertCircle className="h-3.5 w-3.5" />
            {message}
        </p>
    );
}

interface IconInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon: LucideIcon;
    error?: string;
    valid?: boolean;
}

function IconInput({ icon: Icon, error, valid, className = "", ...props }: IconInputProps) {
    return (
        <div className="relative">
            <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-(--text-3)" />
            <input
                {...props}
                className={`w-full rounded-xl border bg-(--surface) py-2.5 pl-10 pr-10 text-sm text-(--text-1) placeholder:text-(--text-3)/70 outline-none transition-all duration-200
          ${error
                        ? "border-rose-500/60 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                        : valid
                            ? "border-(--teal)/50 focus:border-[var(--teal)] focus:ring-2 focus:ring-[var(--teal)]/20"
                            : "border-(--border) focus:border-(--gold) focus:ring-2 focus:ring-(--gold)/20"
                    } ${className}`}
            />
            {valid && !error && <CheckCircle2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-(--teal)" />}
            {error && <AlertCircle className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-rose-400" />}
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Progress indicator                                                  */
/* ------------------------------------------------------------------ */

function StepIndicator({
    currentStep,
    completedSteps,
    onStepClick,
}: {
    currentStep: StepIndex;
    completedSteps: Set<StepIndex>;
    onStepClick: (step: StepIndex) => void;
}) {
    return (
        <ol className="mb-3 flex w-full items-center">
            {STEPS.map((step, idx) => {
                const isCompleted = completedSteps.has(step.id);
                const isCurrent = step.id === currentStep;
                const isClickable = isCompleted || isCurrent;

                return (
                    <li key={step.id} className="flex flex-1 items-center last:flex-none">
                        <button
                            type="button"
                            disabled={!isClickable}
                            onClick={() => isClickable && onStepClick(step.id)}
                            className={`group flex items-center gap-3 ${isClickable ? "cursor-pointer" : "cursor-not-allowed opacity-60"}`}
                        >
                            <span
                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition-all duration-300 ${isCompleted
                                        ? "border-(--gold) bg-(--gold) text-(--bg)"
                                        : isCurrent
                                            ? "scale-110 border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--gold)] shadow-[0_0_0_4px_rgba(212,175,55,0.15)]"
                                            : "border-[var(--border)] text-[var(--text-3)]"
                                    }`}
                            >
                                {isCompleted ? <Check className="h-4 w-4" /> : step.id + 1}
                            </span>
                            <span className="hidden flex-col text-left sm:flex">
                                <span className={`text-sm font-medium transition-colors ${isCurrent || isCompleted ? "text-(--text-1)" : "text-(--text-3)"}`}>
                                    {step.label}
                                </span>
                            </span>
                        </button>

                        {idx < STEPS.length - 1 && (
                            <span className="relative mx-3 h-px flex-1 overflow-hidden rounded-full bg-(--border) sm:mx-4">
                                <span
                                    className="absolute inset-y-0 left-0 bg-(--gold) transition-all duration-500 ease-out"
                                    style={{ width: isCompleted ? "100%" : "0%" }}
                                />
                            </span>
                        )}
                    </li>
                );
            })}
        </ol>
    );
}

/* ------------------------------------------------------------------ */
/* Step 1 — Business Information                                       */
/* ------------------------------------------------------------------ */

function BusinessInfoStep({
    data,
    errors,
    onChange,
}: {
    data: BusinessInfoData;
    errors: Partial<Record<keyof BusinessInfoData, string>>;
    onChange: (patch: Partial<BusinessInfoData>) => void;
}) {
    const charCount = data.description.length;

    return (
        <div className="space-y-6">
            <div>
                <FieldLabel icon={Building2} label="Business name" required description="This is how customers will see your business." />
                <IconInput
                    icon={Store}
                    placeholder="e.g. Northbay Studio"
                    value={data.businessName}
                    onChange={(e) => onChange({ businessName: e.target.value })}
                    error={errors.businessName}
                />
                <FieldError message={errors.businessName} />
            </div>

            <div>
                <FieldLabel label="Business type" required description="Pick the category that best describes what you offer." />
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {BUSINESS_TYPES.map((type) => {
                        const Icon = type.icon;
                        const selected = data.businessType === type.value;
                        return (
                            <button
                                key={type.value}
                                type="button"
                                onClick={() => onChange({ businessType: type.value })}
                                className={`flex items-start gap-3 rounded-xl border p-4 text-left transition-all duration-200 ${selected
                                        ? "border-(--gold) bg-(--gold)/10 shadow-[0_0_0_1px_rgba(212,175,55,0.4)]"
                                        : "border-(--border) bg-(--surface) hover:border-(--gold)/40 hover:bg-(--gold)/5"
                                    }`}
                            >
                                <span
                                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${selected ? "bg-(--gold) text-(--bg)" : "bg-(--bg) text-(--gold)"
                                        }`}
                                >
                                    <Icon className="h-5 w-5" />
                                </span>
                                <span>
                                    <span className="block text-sm font-medium text-(--text-1)">{type.label}</span>
                                    <span className="mt-0.5 block text-xs text-(--text-3)">{type.description}</span>
                                </span>
                            </button>
                        );
                    })}
                </div>
                <FieldError message={errors.businessType} />
            </div>

            <div>
                <FieldLabel label="Description" required description="A short summary customers will see on your profile." />
                <textarea
                    rows={4}
                    maxLength={DESCRIPTION_LIMIT}
                    value={data.description}
                    onChange={(e) => onChange({ description: e.target.value })}
                    placeholder="Tell customers what makes your business worth booking..."
                    className={`w-full resize-none rounded-xl border bg-(--surface) p-3.5 text-sm text-(--text-1) placeholder:text-(--text-3)/70 outline-none transition-all duration-200 ${errors.description
                            ? "border-rose-500/60 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                            : "border-(--border) focus:border-(--gold) focus:ring-2 focus:ring-(--gold)/20"
                        }`}
                />
                <div className="mt-1.5 flex items-center justify-between">
                    <FieldError message={errors.description} />
                    <span className={`text-xs ${charCount > DESCRIPTION_LIMIT * 0.9 ? "text-amber-400" : "text-(--text-3)"}`}>
                        {charCount}/{DESCRIPTION_LIMIT}
                    </span>
                </div>
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Step 2 — Contact Information                                        */
/* ------------------------------------------------------------------ */

function ContactStep({
    data,
    errors,
    touched,
    onChange,
}: {
    data: ContactInfoData;
    errors: Partial<Record<keyof ContactInfoData, string>>;
    touched: Partial<Record<keyof ContactInfoData, boolean>>;
    onChange: (patch: Partial<ContactInfoData>) => void;
}) {
    return (
        <div className="space-y-6">
            <div>
                <FieldLabel icon={Mail} label="Business email" required description="Used for booking confirmations and customer messages." />
                <IconInput
                    icon={Mail}
                    type="email"
                    placeholder="hello@yourbusiness.com"
                    value={data.email}
                    onChange={(e) => onChange({ email: e.target.value })}
                    error={touched.email ? errors.email : undefined}
                    valid={Boolean(touched.email && !errors.email && data.email.length > 0)}
                />
                <FieldError message={touched.email ? errors.email : undefined} />
            </div>

            <div>
                <FieldLabel icon={Phone} label="Phone number" required description="Customers may call or text for urgent requests." />
                <IconInput
                    icon={Phone}
                    type="tel"
                    placeholder="+63 912 345 6789"
                    value={data.phone}
                    onChange={(e) => onChange({ phone: e.target.value })}
                    error={touched.phone ? errors.phone : undefined}
                    valid={Boolean(touched.phone && !errors.phone && data.phone.length > 0)}
                />
                <FieldError message={touched.phone ? errors.phone : undefined} />
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Step 3 — Business Location                                          */
/* ------------------------------------------------------------------ */

interface SearchResult {
    city: string;
    country: string;
    countryCode: string;
    displayName: string;
    postalCode: string;
    province: string;
    region: string;
    street: string;
    timezone: string;
    village: string;
};

function validateLocation(data: SearchResult) {
    const errors: Partial<Record<keyof LocationData, string>> = {};
    if (!data.street) errors.addressLine = "Address line is required.";
    if (!data.city) errors.city = "City is required.";
    if (!data.province) errors.province = "Province/state is required.";
    if (!data.postalCode) errors.postalCode = "Postal code is required.";
    if (!data.country) errors.country = "Country is required.";
    if (!data.timezone) errors.timezone = "Select a timezone.";
    return errors;
}

function LocationStep({
    data,
    errors,
    onChange,
}: {
    data: SearchResult;
    errors: Partial<Record<keyof SearchResult, string>>;
    onChange: (patch: Partial<SearchResult>) => void;
}) {
    const [query, setQuery] = useState<string>("");
    const [open, setOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState<SearchResult | null>(null);
    const [searchResult, setSearchResult] = useState<SearchResult[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const timeRef = useRef<any>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    function handleSelect(suggestion: SearchResult) {
        setSelectedAddress(suggestion);
        setOpen(false);
        onChange({
            city: suggestion.city,
            country: suggestion.country,
            countryCode: suggestion.countryCode,
            displayName: suggestion.displayName,
            postalCode: suggestion.postalCode,
            province: suggestion.province,
            region: suggestion.region,
            street: suggestion.street,
            timezone: suggestion.timezone,
            village: suggestion.village,
        });
    }

    const hanldleSearchInputChange = async (e: any) => {

        const { value } = e.target;

        setQuery(value);

        if(timeRef.current) clearTimeout(timeRef.current);

        timeRef.current = setTimeout(async () => {
            const url = `http://localhost:8080/api/public/search-test/${value}`;

            const result = await get(url);

            console.log(result);

            const addresses = result.map((r: any) => {
                return {
                    city: r.city,
                    country: r.country,
                    countryCode: r.countryCode,
                    displayName: r.displayName,
                    postalCode: r.postalCode,
                    province: r.province,
                    region: r.region,
                    street: r.road,
                    timezone: r.timezone,
                    village: r.village
                }
            });
            
            setSearchResult(addresses);
        }, 1000);

    };

    return (
        <div className="space-y-6">
            <div ref={containerRef} className="relative">
                <FieldLabel icon={MapPin} label="Search for your address" description="Start typing to find your business location." />
                <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-(--text-3)" />
                    <input
                        value={query}
                        onChange={(e) => {
                            hanldleSearchInputChange(e)
                            setOpen(true);
                        }}
                        onFocus={() => query && setOpen(true)}
                        placeholder="Search a place, mall, or landmark..."
                        className="w-full rounded-xl border border-(--border) bg-(--surface) py-2.5 pl-10 pr-4 text-sm text-(--text-1) placeholder:text-(--text-3)/70 outline-none transition-all duration-200 focus:border-(--gold) focus:ring-2 focus:ring-(--gold)/20"
                    />
                </div>

                {open && searchResult.length > 0 && (
                    <ul className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-(--border) bg-(--surface) shadow-2xl shadow-black/40">
                        {searchResult.map((s: any, i:any) => (
                            <li key={i}>
                                <button
                                    type="button"
                                    onClick={() => handleSelect(s)}
                                    className={`flex w-full items-start gap-3 px-4 py-3 text-left transition-colors duration-150 hover:bg-(--gold)/10 ${selectedAddress === s.address ? "bg-(--gold)/10" : ""
                                        }`}
                                >
                                    <CountryFlag countryCode={s.countryCode} title="United states"></CountryFlag>
                                    {/* <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-(--gold)" /> */}
                                    <span>
                                        <span className="block text-sm font-medium text-(--text-1)">{s.displayName}</span>
                                        <span className="block text-xs text-(--text-3)">
                                            {s.city} {s.province} {s.country}
                                        </span>
                                    </span>
                                    {selectedAddress === s.displayName && <Check className="ml-auto h-4 w-4 shrink-0 text-(--gold)" />}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

                {open && query && searchResult.length === 0 && (
                    <div className="absolute z-20 mt-2 w-full rounded-xl border border-(--border) bg-(--surface) p-4 text-center text-sm text-(--text-3) shadow-2xl shadow-black/40">
                        No matches yet — fill in the details manually below.
                    </div>
                )}
            </div>

            {selectedAddress && (
                <div className="flex items-center gap-2 rounded-lg border border-(--gold)/30 bg-(--gold)/5 px-3 py-2 text-xs text-(--gold)">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Location selected — details filled in below. You can still edit them.
                </div>
            )}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                    <FieldLabel label="Address line" required />
                    <IconInput
                        icon={MapPin}
                        value={data.street}
                        onChange={(e) => onChange({ street: e.target.value })}
                        error={errors.street}
                        placeholder="Street, building, unit"
                    />
                    <FieldError message={errors.street} />
                </div>
                <div>
                    <FieldLabel label="City" required />
                    <IconInput icon={Building2} value={data.city} onChange={(e) => onChange({ city: e.target.value })} error={errors.city} placeholder="City" />
                    <FieldError message={errors.city} />
                </div>
                <div>
                    <FieldLabel label="Province / State" required />
                    <IconInput
                        icon={MapPin}
                        value={data.province}
                        onChange={(e) => onChange({ province: e.target.value })}
                        error={errors.province}
                        placeholder="Province or state"
                    />
                    <FieldError message={errors.province} />
                </div>
                <div>
                    <FieldLabel label="Postal code" required />
                    <IconInput
                        icon={MapPin}
                        value={data.postalCode}
                        onChange={(e) => onChange({ postalCode: e.target.value })}
                        error={errors.postalCode}
                        placeholder="Postal code"
                    />
                    <FieldError message={errors.postalCode} />
                </div>
                <div>
                    <FieldLabel label="Country" required />
                    <IconInput icon={Globe} value={data.country} onChange={(e) => onChange({ country: e.target.value })} error={errors.country} placeholder="Country" />
                    <FieldError message={errors.country} />
                </div>
                <div className="sm:col-span-2">
                    <FieldLabel icon={Clock} label="Timezone" required description="Detected automatically when available — adjust if needed." />
                    <div className="relative">
                        <Clock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-(--text-3)" />
                        <select
                            value={data.timezone}
                            onChange={(e) => onChange({ timezone: e.target.value })}
                            className={`w-full appearance-none rounded-xl border bg-(--surface) py-2.5 pl-10 pr-4 text-sm text-(--text-1) outline-none transition-all duration-200 ${errors.timezone ? "border-rose-500/60" : "border-(--border) focus:border-(--gold) focus:ring-2 focus:ring-(--gold)/20"
                                }`}
                        >
                            <option value="" disabled>
                                Select a timezone
                            </option>
                            {TIMEZONE_OPTIONS.map((tz) => (
                                <option key={tz} value={tz}>
                                    {tz}
                                </option>
                            ))}
                        </select>
                    </div>
                    <FieldError message={errors.timezone} />
                </div>
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Step 4 — Business Logo                                              */
/* ------------------------------------------------------------------ */

function LogoStep({ data, onChange }: { data: LogoData; onChange: (patch: Partial<LogoData>) => void }) {
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    function processFile(file: File) {
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => {
            onChange({ file, previewUrl: url, width: img.width, height: img.height, sizeBytes: file.size });
        };
        img.src = url;
    }

    function handleDrop(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        setDragActive(false);
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith("image/")) processFile(file);
    }

    function handleSelect(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) processFile(file);
    }

    function handleRemove() {
        if (data.previewUrl) URL.revokeObjectURL(data.previewUrl);
        onChange({ file: null, previewUrl: null, width: null, height: null, sizeBytes: null });
        if (inputRef.current) inputRef.current.value = "";
    }

    return (
        <div className="space-y-5">
            <FieldLabel
                icon={ImageIcon}
                label="Business logo"
                description="Square images work best. Recommended at least 512×512px, PNG or JPG, up to 5MB."
            />

            {!data.previewUrl ? (
                <div
                    onDragOver={(e) => {
                        e.preventDefault();
                        setDragActive(true);
                    }}
                    onDragLeave={() => setDragActive(false)}
                    onDrop={handleDrop}
                    onClick={() => inputRef.current?.click()}
                    className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-12 text-center transition-all duration-200 ${dragActive
                            ? "scale-[1.01] border-[var(--gold)] bg-[var(--gold)]/10"
                            : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--gold)]/50 hover:bg-[var(--gold)]/5"
                        }`}
                >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--gold)]/10 text-[var(--gold)]">
                        <Upload className="h-6 w-6" />
                    </span>
                    <div>
                        <p className="text-sm font-medium text-(--text-1)">Drag and drop your logo here</p>
                        <p className="mt-1 text-xs text-(--text-3)">
                            or <span className="text-(--gold) underline">click to browse</span> · PNG, JPG, SVG up to 5MB
                        </p>
                    </div>
                    <input ref={inputRef} type="file" accept="image/*" onChange={handleSelect} className="hidden" />
                </div>
            ) : (
                <div className="flex flex-col gap-4 rounded-2xl border border-(--border) bg-(--surface) p-5 sm:flex-row sm:items-center">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-(--border) bg-(--bg)">
                        {data.previewUrl && <img src={data.previewUrl} alt="Logo preview" className="h-full w-full object-cover" />}
                        <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-(--teal) text-(--bg)">
                            <Check className="h-3 w-3" />
                        </span>
                    </div>
                    <div className="flex-1">
                        <p className="flex items-center gap-1.5 text-sm font-medium text-(--teal)">
                            <CheckCircle2 className="h-4 w-4" /> Logo uploaded
                        </p>
                        <p className="mt-1 text-xs text-(--text-3)">
                            {data.width}×{data.height}px · {data.sizeBytes ? formatBytes(data.sizeBytes) : ""}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => inputRef.current?.click()}
                            className="rounded-lg border border-(--border) px-3 py-1.5 text-xs font-medium text-(--text-1) transition-colors hover:border-(--gold)/50 hover:bg-(--gold)/5"
                        >
                            Replace
                        </button>
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="flex items-center gap-1 rounded-lg border border-(--border) px-3 py-1.5 text-xs font-medium text-rose-400 transition-colors hover:border-rose-500/50 hover:bg-rose-500/5"
                        >
                            <X className="h-3.5 w-3.5" /> Remove
                        </button>
                    </div>
                    <input ref={inputRef} type="file" accept="image/*" onChange={handleSelect} className="hidden" />
                </div>
            )}
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Step transition wrapper                                             */
/* ------------------------------------------------------------------ */

function StepTransition({ stepKey, direction, children }: { stepKey: number; direction: Direction; children: React.ReactNode }) {
    const [entered, setEntered] = useState(false);

    useEffect(() => {
        setEntered(false);
        const raf = requestAnimationFrame(() => setEntered(true));
        return () => cancelAnimationFrame(raf);
    }, [stepKey]);

    return (
        <div
            className={`transition-all duration-300 ease-out ${entered ? "translate-x-0 opacity-100" : direction === "forward" ? "translate-x-4 opacity-0" : "-translate-x-4 opacity-0"
                }`}
        >
            {children}
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Main wizard                                                          */
/* ------------------------------------------------------------------ */

export function BusinessOnboardingWizard() {
    const [currentStep, setCurrentStep] = useState<StepIndex>(0);
    const [completedSteps, setCompletedSteps] = useState<Set<StepIndex>>(new Set());
    const [direction, setDirection] = useState<Direction>("forward");
    const [submitting, setSubmitting] = useState(false);

    const [businessInfo, setBusinessInfo] = useState<BusinessInfoData>({ businessName: "", businessType: "", description: "" });
    const [contactInfo, setContactInfo] = useState<ContactInfoData>({ email: "", phone: "" });
    const [location, setLocation] = useState<SearchResult>({
        city: "",
        country: "",
        countryCode: "",
        displayName: "",
        postalCode: "",
        province: "",
        region: "",
        street: "",
        timezone: "",
        village: "",
    });
    const [logo, setLogo] = useState<LogoData>({ file: null, previewUrl: null, width: null, height: null, sizeBytes: null });

    const [contactTouched, setContactTouched] = useState<Partial<Record<keyof ContactInfoData, boolean>>>({});
    const [showStep1Errors, setShowStep1Errors] = useState(false);
    const [showStep3Errors, setShowStep3Errors] = useState(false);

    const businessInfoErrors = useMemo(() => validateBusinessInfo(businessInfo), [businessInfo]);
    const contactErrors = useMemo(() => validateContactInfo(contactInfo), [contactInfo]);
    const locationErrors = useMemo(() => validateLocation(location), [location]);

    const stepValidity: Record<StepIndex, boolean> = {
        0: Object.keys(businessInfoErrors).length === 0,
        1: Object.keys(contactErrors).length === 0,
        2: Object.keys(locationErrors).length === 0,
        3: true,
    };

    function goToStep(step: StepIndex) {
        setDirection(step > currentStep ? "forward" : "backward");
        setCurrentStep(step);
    }

    function handleContinue() {
        if (currentStep === 0) {
            setShowStep1Errors(true);
            if (!stepValidity[0]) return;
        }
        if (currentStep === 1) {
            setContactTouched({ email: true, phone: true });
            if (!stepValidity[1]) return;
        }
        if (currentStep === 2) {
            setShowStep3Errors(true);
            if (!stepValidity[2]) return;
        }
        setCompletedSteps((prev) => new Set(prev).add(currentStep));
        setDirection("forward");
        setCurrentStep((s) => Math.min(s + 1, 3) as StepIndex);
    }

    function handleBack() {
        setDirection("backward");
        setCurrentStep((s) => Math.max(s - 1, 0) as StepIndex);
    }

    function handleCreateBusiness() {
        setSubmitting(true);
        // Mock submission — wire this up to your API when ready.
        globalThis.setTimeout(() => {
            setSubmitting(false);
            setCompletedSteps((prev) => new Set(prev).add(3));
            console.log("Business onboarding payload", { businessInfo, contactInfo, location, logo });
        }, 1200);
    }

    return (
        <div className="min-h-screen bg-(--bg) px-4 py-10 sm:py-16">
            <div className="mx-auto w-full max-w-2xl">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-semibold text-(--text-1) sm:text-3xl">Set up your business</h1>
                    <p className="mt-2 text-sm text-(--text-3)">A few steps to get you ready to take bookings.</p>
                </div>

                <StepIndicator currentStep={currentStep} completedSteps={completedSteps} onStepClick={goToStep} />
                <p className="mb-6 text-center text-xs font-medium text-(--text-3) sm:hidden">
                    Step {currentStep + 1} of {STEPS.length} · {STEPS[currentStep].label}
                </p>

                <div className="rounded-2xl border border-(--border) bg-(--surface)/60 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:p-8">
                    <StepTransition stepKey={currentStep} direction={direction}>
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-(--text-1)">{STEPS[currentStep].label}</h2>
                            <p className="text-sm text-(--text-3)">{STEPS[currentStep].description}</p>
                        </div>

                        {currentStep === 0 && (
                            <BusinessInfoStep
                                data={businessInfo}
                                errors={showStep1Errors ? businessInfoErrors : {}}
                                onChange={(patch) => setBusinessInfo((prev) => ({ ...prev, ...patch }))}
                            />
                        )}

                        {currentStep === 1 && (
                            <ContactStep
                                data={contactInfo}
                                errors={contactErrors}
                                touched={contactTouched}
                                onChange={(patch) => {
                                    setContactInfo((prev) => ({ ...prev, ...patch }));
                                    setContactTouched((prev) => ({
                                        ...prev,
                                        ...(patch.email !== undefined ? { email: true } : {}),
                                        ...(patch.phone !== undefined ? { phone: true } : {}),
                                    }));
                                }}
                            />
                        )}

                        {currentStep === 2 && (
                            <LocationStep
                                data={location}
                                errors={showStep3Errors ? locationErrors : {}}
                                onChange={(patch) => setLocation((prev) => ({ ...prev, ...patch }))}
                            />
                        )}

                        {currentStep === 3 && <LogoStep data={logo} onChange={(patch) => setLogo((prev) => ({ ...prev, ...patch }))} />}
                    </StepTransition>

                    <div className="mt-8 flex items-center justify-between border-t border-(--border) pt-6">
                        {currentStep > 0 ? (
                            <button
                                type="button"
                                onClick={handleBack}
                                className="flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-medium text-(--text-muted) transition-colors hover:text-(--text-1)"
                            >
                                <ChevronLeft className="h-4 w-4" /> Back
                            </button>
                        ) : (
                            <span />
                        )}

                        {currentStep < 3 ? (
                            <button
                                type="button"
                                onClick={handleContinue}
                                className="flex items-center gap-1.5 rounded-xl bg-(--gold) px-5 py-2.5 text-sm font-semibold text-(--bg) shadow-lg shadow-(--gold)/20 transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
                            >
                                Continue <ChevronRight className="h-4 w-4" />
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleCreateBusiness}
                                disabled={submitting}
                                className="flex items-center gap-2 rounded-xl bg-(--gold) px-5 py-2.5 text-sm font-semibold text-(--bg) shadow-lg shadow-(--gold)/20 transition-all duration-200 hover:brightness-110 active:scale-[0.98] disabled:opacity-60"
                            >
                                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                                {submitting ? "Creating..." : "Create Business"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}