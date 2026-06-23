import { useState, useRef, useEffect } from 'react';
import {
    Building2, Mail, Book, MapPin, Clock, Calendar, User,
    ChevronDown, Check, Plus, Camera, Pencil, ExternalLink,
    CircleDot, Tag, Image as ImageIcon, DollarSign, Sparkles,
} from 'lucide-react';

// ----------------------------------------------------------------------------
// Types
// ----------------------------------------------------------------------------

type BusinessStatus = 'active' | 'pending' | 'suspended' | 'inactive';

type ServiceStatus = 'active' | 'draft' | 'paused';

interface Service {
    id: string;
    businessId: string;
    name: string;
    description: string;
    durationMinutes: number;
    price: number;
    status: ServiceStatus;
    imageUrl?: string;
}

interface Business {
    id: string;
    name: string;
    category: string;
    description: string;
    email: string;
    facebookUrl?: string;
    address: string;
    timezone: string;
    status: BusinessStatus;
    createdAt: string; // ISO date
    ownerName: string;
    logoUrl?: string;
}

// ----------------------------------------------------------------------------
// Mock data — wire this up to your API later
// ----------------------------------------------------------------------------

const MOCK_BUSINESSES: Business[] = [
    {
        id: 'biz_1',
        name: "Daddy's Home Barbershop",
        category: 'Barbershop & Grooming',
        description:
            "A neighborhood barbershop built on craft and consistency. We've spent over a decade perfecting the classic fade and the modern beard line — same chair, same care, every visit.",
        email: 'hello@daddyshome.ph',
        facebookUrl: 'https://facebook.com/daddyshomebarbershop',
        address: '142 Rizal Avenue, Urdaneta, Pangasinan, Philippines',
        timezone: 'Asia/Manila (GMT+8)',
        status: 'active',
        createdAt: '2024-03-12',
        ownerName: 'Johny Reyes',
        logoUrl: '',
    },
    {
        id: 'biz_2',
        name: 'Lumen Skin Studio',
        category: 'Skincare & Aesthetics',
        description:
            'Clinical-grade facials and skin treatments in a calm, private setting. Every plan starts with a real consultation, not a menu.',
        email: 'contact@lumenskin.ph',
        facebookUrl: '',
        address: '88 Mabini Street, Urdaneta, Pangasinan, Philippines',
        timezone: 'Asia/Manila (GMT+8)',
        status: 'pending',
        createdAt: '2025-11-02',
        ownerName: 'Johny Reyes',
        logoUrl: '',
    },
];

const MOCK_SERVICES: Service[] = [
    {
        id: 'svc_1',
        businessId: 'biz_1',
        name: 'Classic fade & line-up',
        description: 'Precision fade with a clean hairline finish, hot towel included.',
        durationMinutes: 45,
        price: 85,
        status: 'active',
        imageUrl: '',
    },
    {
        id: 'svc_2',
        businessId: 'biz_1',
        name: 'Beard sculpt & hot towel shave',
        description: 'Full beard shaping with straight-razor edging and a traditional hot towel shave.',
        durationMinutes: 30,
        price: 60,
        status: 'active',
        imageUrl: '',
    },
    {
        id: 'svc_3',
        businessId: 'biz_1',
        name: 'Father & son combo',
        description: 'Two haircuts back-to-back, same chair, scheduled together.',
        durationMinutes: 75,
        price: 140,
        status: 'paused',
        imageUrl: '',
    },
    {
        id: 'svc_4',
        businessId: 'biz_1',
        name: 'Color & grey blending',
        description: 'Subtle grey blending designed to look natural, not dyed.',
        durationMinutes: 60,
        price: 110,
        status: 'draft',
        imageUrl: '',
    },
    {
        id: 'svc_5',
        businessId: 'biz_2',
        name: 'Signature hydrating facial',
        description: 'A 60-minute facial with extraction, mask, and LED finish.',
        durationMinutes: 60,
        price: 95,
        status: 'active',
        imageUrl: '',
    },
];



const STATUS_CONFIG: Record<BusinessStatus, { label: string; dot: string; text: string; bg: string; border: string }> = {
    active: { label: 'Active', dot: 'bg-[#1d9e75]', text: 'text-[#5dcaa5]', bg: 'bg-[#0f6e56]/10', border: 'border-[#0f6e56]/30' },
    pending: { label: 'Pending review', dot: 'bg-[#d4af37]', text: 'text-[#e0c46b]', bg: 'bg-[#d4af37]/10', border: 'border-[#d4af37]/30' },
    suspended: { label: 'Suspended', dot: 'bg-[#e24b4a]', text: 'text-[#f09595]', bg: 'bg-[#e24b4a]/10', border: 'border-[#e24b4a]/30' },
    inactive: { label: 'Inactive', dot: 'bg-[#6b6b72]', text: 'text-[#9a9aa3]', bg: 'bg-[#1a1a1d]', border: 'border-[rgba(255,255,255,0.08)]' },
};

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

const SERVICE_STATUS_CONFIG: Record<ServiceStatus, { label: string; text: string; bg: string; border: string }> = {
    active: { label: 'Active', text: 'text-[#5dcaa5]', bg: 'bg-[#0f6e56]/10', border: 'border-[#0f6e56]/30' },
    draft: { label: 'Draft', text: 'text-[#9a9aa3]', bg: 'bg-[#1a1a1d]', border: 'border-[rgba(255,255,255,0.08)]' },
    paused: { label: 'Paused', text: 'text-[#e0c46b]', bg: 'bg-[#d4af37]/10', border: 'border-[#d4af37]/30' },
};

function formatDuration(minutes: number) {
    if (minutes < 60) return `${minutes} min`;
    const hrs = Math.floor(minutes / 60);
    const rem = minutes % 60;
    return rem === 0 ? `${hrs} hr` : `${hrs} hr ${rem} min`;
}

function formatPrice(price: number) {
    return price.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
}

function initials(name: string) {
    return name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0])
        .join('')
        .toUpperCase();
}

// ----------------------------------------------------------------------------
// Business switcher
// ----------------------------------------------------------------------------

function BusinessSwitcher({
    businesses,
    activeId,
    onSelect,
    onAddNew,
}: {
    businesses: Business[];
    activeId: string;
    onSelect: (id: string) => void;
    onAddNew: () => void;
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const active = businesses.find((b) => b.id === activeId)!;

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        }
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-3 pl-2 pr-3 py-2 rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#141416] hover:border-[rgba(255,255,255,0.16)] transition-colors"
            >
                <div className="w-7 h-7 rounded-md bg-[#1a1a1d] border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-[10px] font-medium text-[#d4af37] shrink-0">
                    {initials(active.name)}
                </div>
                <div className="text-left">
                    <p className="text-[12px] text-[#6b6b72] leading-none">Viewing</p>
                    <p className="text-[13px] font-medium text-[#e8e8ea] leading-tight mt-0.5 max-w-[160px] truncate">
                        {active.name}
                    </p>
                </div>
                <ChevronDown size={14} className={`text-[#9a9aa3] transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && (
                <div className="absolute left-0 mt-2 w-72 rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#141416] shadow-[0_12px_32px_rgba(0,0,0,0.5)] overflow-hidden z-20">
                    <div className="px-3 pt-3 pb-2">
                        <p className="text-[11px] font-medium tracking-wide text-[#6b6b72] uppercase">Your businesses</p>
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                        {businesses.map((b) => {
                            const cfg = STATUS_CONFIG[b.status];
                            const isActive = b.id === activeId;
                            return (
                                <button
                                    key={b.id}
                                    onClick={() => { onSelect(b.id); setOpen(false); }}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors ${isActive ? 'bg-[#1a1a1d]' : 'hover:bg-[#1a1a1d]'}`}
                                >
                                    <div className="w-8 h-8 rounded-md bg-[#101012] border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-[11px] font-medium text-[#d4af37] shrink-0">
                                        {initials(b.name)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[13px] font-medium text-[#e8e8ea] truncate">{b.name}</p>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                                            <p className="text-[11px] text-[#9a9aa3]">{cfg.label}</p>
                                        </div>
                                    </div>
                                    {isActive && <Check size={15} className="text-[#d4af37] shrink-0" />}
                                </button>
                            );
                        })}
                    </div>
                    <div className="border-t border-[rgba(255,255,255,0.06)] p-1.5">
                        <button
                            onClick={() => { onAddNew(); setOpen(false); }}
                            className="w-full flex items-center gap-2 px-2.5 py-2 rounded-md text-[13px] text-[#9a9aa3] hover:text-[#e8e8ea] hover:bg-[#1a1a1d] transition-colors"
                        >
                            <Plus size={15} />
                            Add a new business
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

// ----------------------------------------------------------------------------
// Detail row
// ----------------------------------------------------------------------------

function DetailRow({
    icon: Icon,
    label,
    value,
    href,
}: {
    icon: typeof Mail;
    label: string;
    value: string;
    href?: string;
}) {
    return (
        <div className="flex items-start gap-3 py-3.5 first:pt-0 last:pb-0 border-b border-[rgba(255,255,255,0.06)] last:border-0">
            <div className="w-8 h-8 rounded-md bg-[#1a1a1d] border border-[rgba(255,255,255,0.06)] flex items-center justify-center shrink-0 mt-0.5">
                <Icon size={14} className="text-[#9a9aa3]" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-[11px] text-[#6b6b72] mb-0.5">{label}</p>
                {href ? (
                    <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[13px] text-[#e8e8ea] hover:text-[#d4af37] transition-colors inline-flex items-center gap-1.5 break-all"
                    >
                        {value}
                        <ExternalLink size={11} className="text-[#6b6b72] shrink-0" />
                    </a>
                ) : (
                    <p className="text-[13px] text-[#e8e8ea] break-words">{value}</p>
                )}
            </div>
        </div>
    );
}

// ----------------------------------------------------------------------------
// Service card — Facebook-post-style layout, only the fields requested
// ----------------------------------------------------------------------------

function ServiceCard({ service }: { service: Service }) {
    const cfg = SERVICE_STATUS_CONFIG[service.status];
    return (
        <div className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#101012] overflow-hidden">
            {/* Image block, like a post's media */}
            <div className="h-36 bg-[#141416] relative flex items-center justify-center">
                {service.imageUrl ? (
                    <img src={service.imageUrl} alt={service.name} className="w-full h-full object-cover" />
                ) : (
                    <ImageIcon size={22} className="text-[#3a3a3e]" />
                )}
                <span className={`absolute top-3 right-3 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border ${cfg.border} ${cfg.bg}`}>
                    <CircleDot size={8} className={cfg.text} />
                    <span className={`text-[10px] font-medium ${cfg.text}`}>{cfg.label}</span>
                </span>
            </div>

            {/* Content block, like a post's caption */}
            <div className="px-4 py-3.5">
                <h3 className="text-[14px] font-medium text-[#e8e8ea] leading-tight">{service.name}</h3>
                <p className="text-[12.5px] text-[#9a9aa3] leading-relaxed mt-1.5">{service.description}</p>

                <div className="flex items-center gap-4 mt-3.5 pt-3 border-t border-[rgba(255,255,255,0.06)]">
                    <div className="flex items-center gap-1.5">
                        <Clock size={12} className="text-[#6b6b72]" />
                        <span className="text-[12px] text-[#e8e8ea]">{formatDuration(service.durationMinutes)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <DollarSign size={12} className="text-[#6b6b72]" />
                        <span className="text-[12px] text-[#e8e8ea]">{formatPrice(service.price)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default function BusinessProfilePage() {
    const [businesses] = useState<Business[]>(MOCK_BUSINESSES);
    const [services] = useState<Service[]>(MOCK_SERVICES);
    const [activeId, setActiveId] = useState(businesses[0].id);
    const business = businesses.find((b) => b.id === activeId)!;
    const businessServices = services.filter((s) => s.businessId === activeId);
    const cfg = STATUS_CONFIG[business.status];

    return (
        <div className="min-h-screen bg-[#0a0a0c] text-[#e8e8ea]">
            <div className="max-w-5xl mx-auto px-6 py-10">

                {/* Top bar: switcher + edit action */}
                <div className="flex items-center justify-between mb-8">
                    <BusinessSwitcher
                        businesses={businesses}
                        activeId={activeId}
                        onSelect={setActiveId}
                        onAddNew={() => { }}
                    />
                    <button className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[rgba(255,255,255,0.08)] text-[13px] text-[#e8e8ea] hover:border-[#d4af37]/40 hover:text-[#d4af37] transition-colors">
                        <Pencil size={13} />
                        Edit profile
                    </button>
                </div>

                {/* Hero card */}
                <div className="relative rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#101012] overflow-hidden">
                    {/* Cover strip */}
                    <div className="h-24 bg-[#141416] relative">
                        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(212,175,55,0.10),transparent_60%)]" />
                        <div
                            className="absolute inset-0"
                            style={{ backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 14px)' }}
                        />
                    </div>

                    <div className="px-7 pb-7">
                        {/* Logo overlapping cover */}
                        <div className="flex items-end gap-4 -mt-10">
                            <div className="relative shrink-0">
                                <div className="w-20 h-20 rounded-xl bg-[#1a1a1d] border-2 border-[#101012] ring-1 ring-[rgba(255,255,255,0.08)] flex items-center justify-center overflow-hidden">
                                    {business.logoUrl ? (
                                        <img src={business.logoUrl} alt={`${business.name} logo`} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-[22px] font-semibold text-[#d4af37]">{initials(business.name)}</span>
                                    )}
                                </div>
                                <button
                                    aria-label="Change logo"
                                    className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-[#1a1a1d] border border-[rgba(255,255,255,0.12)] flex items-center justify-center hover:border-[#d4af37]/50 transition-colors"
                                >
                                    <Camera size={11} className="text-[#9a9aa3]" />
                                </button>
                            </div>
                        </div>

                        {/* Name, category, status */}
                        <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
                            <div>
                                <div className="flex items-center gap-2.5 flex-wrap">
                                    <h1 className="text-[20px] font-semibold text-[#e8e8ea] tracking-tight">{business.name}</h1>
                                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border ${cfg.border} ${cfg.bg}`}>
                                        <CircleDot size={9} className={cfg.text} />
                                        <span className={`text-[11px] font-medium ${cfg.text}`}>{cfg.label}</span>
                                    </span>
                                </div>
                                <div className="flex items-center gap-1.5 mt-1.5 text-[#9a9aa3]">
                                    <Tag size={12} />
                                    <span className="text-[13px]">{business.category}</span>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="mt-4 text-[13px] leading-relaxed text-[#b5b5ba] max-w-xl">
                            {business.description}
                        </p>

                        {/* Meta strip: owner + created */}
                        <div className="mt-5 flex items-center gap-5 pt-4 border-t border-[rgba(255,255,255,0.06)]">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-[#1a1a1d] border border-[rgba(255,255,255,0.08)] flex items-center justify-center">
                                    <User size={11} className="text-[#9a9aa3]" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-[#6b6b72] leading-none">Owner</p>
                                    <p className="text-[12px] text-[#e8e8ea] leading-tight mt-0.5">{business.ownerName}</p>
                                </div>
                            </div>
                            <div className="w-px h-7 bg-[rgba(255,255,255,0.08)]" />
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-[#1a1a1d] border border-[rgba(255,255,255,0.08)] flex items-center justify-center">
                                    <Calendar size={11} className="text-[#9a9aa3]" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-[#6b6b72] leading-none">Started</p>
                                    <p className="text-[12px] text-[#e8e8ea] leading-tight mt-0.5">{formatDate(business.createdAt)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Details card */}
                <div className="mt-5 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#101012] px-7 py-2">
                    <div className="flex items-center gap-2 pt-4 pb-1">
                        <Building2 size={14} className="text-[#d4af37]" />
                        <h2 className="text-[13px] font-medium text-[#e8e8ea]">Business details</h2>
                    </div>
                    <div className="pb-1">
                        <DetailRow icon={Mail} label="Business email" value={business.email} href={`mailto:${business.email}`} />
                        {business.facebookUrl && (
                            <DetailRow icon={Book} label="Facebook page" value={business.facebookUrl.replace('https://', '')} href={business.facebookUrl} />
                        )}
                        <DetailRow icon={MapPin} label="Address" value={business.address} />
                        <DetailRow icon={Clock} label="Timezone" value={business.timezone} />
                    </div>
                </div>

                {/* Services */}
                <div className="mt-5">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <Sparkles size={14} className="text-[#d4af37]" />
                            <h2 className="text-[13px] font-medium text-[#e8e8ea]">Services</h2>
                            <span className="text-[12px] text-[#6b6b72]">({businessServices.length})</span>
                        </div>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[rgba(255,255,255,0.08)] text-[12px] text-[#e8e8ea] hover:border-[#d4af37]/40 hover:text-[#d4af37] transition-colors">
                            <Plus size={13} />
                            Add service
                        </button>
                    </div>

                    {businessServices.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-[rgba(255,255,255,0.1)] py-10 text-center">
                            <p className="text-[13px] text-[#9a9aa3]">No services added yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-3 gap-4">
                            {businessServices.map((s) => (
                                <ServiceCard key={s.id} service={s} />
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}