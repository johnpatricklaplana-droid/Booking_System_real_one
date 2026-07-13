import { useState, useRef, useEffect, act } from 'react';
import {
    Building2, Mail, Book, MapPin, Clock, Calendar, User,
    ChevronDown, Check, Plus, Camera, Pencil, ExternalLink,
    CircleDot, Tag, Sparkles,
} from 'lucide-react';
import { useUser } from '../../provider/UserContext';
import type { Business, ServiceStatus, ServiceWithRatings } from '../../interfaces/Types';
import { getServices } from '../../hooks/service';
import { useNavigate } from 'react-router-dom';
import { ServiceBox } from '../../components/ServiceBox';
import { update } from '../../api/api';

// ----------------------------------------------------------------------------
// Types
// ----------------------------------------------------------------------------

type BusinessStatus = 'ACTIVE' | 'SUSPENDED' | 'INACTIVE';


const STATUS_CONFIG: Record<BusinessStatus, { label: string; dot: string; text: string; bg: string; border: string }> = {
    ACTIVE: { label: 'Active', dot: 'bg-[#1d9e75]', text: 'text-[#5dcaa5]', bg: 'bg-[#0f6e56]/10', border: 'border-[#0f6e56]/30' },
    SUSPENDED: { label: 'Suspended', dot: 'bg-[#e24b4a]', text: 'text-[#f09595]', bg: 'bg-[#e24b4a]/10', border: 'border-[#e24b4a]/30' },
    INACTIVE: { label: 'Inactive', dot: 'bg-[#6b6b72]', text: 'text-[#9a9aa3]', bg: 'bg-[#1a1a1d]', border: 'border-[rgba(255,255,255,0.08)]' },
};

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function formatPrice(price: number) {
    return price.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
}

// ----------------------------------------------------------------------------
// Business switcher
// ----------------------------------------------------------------------------

function BusinessSwitcher({
    business,
    businesses,
}: {
    businesses: Business[];
    business: Business | null;
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const { setActiveBusiness } = useUser();

    const navigate = useNavigate();

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        }
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const switchBusiness = async (buss: Business) => {

        const url = `http://localhost:8080/api/user/business/${buss.businessId}`;

        const result = await update(url, null);

        if(result.status === 200) {
            setActiveBusiness(buss);
        } else {
            console.log("TODO");
        }

    };

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-3 pl-2 pr-3 py-2 rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#141416] hover:border-[rgba(255,255,255,0.16)] transition-colors"
            >
                <img src={business?.businessLogoUrl} alt={business?.businessId} className="w-7 h-7 rounded-md border border-[rgba(255,255,255,0.08)] shrink-0" />
                <div className="text-left">
                    <p className="text-[12px] text-[#6b6b72] leading-none">Viewing</p>
                    <p className="text-[13px] font-medium text-[#e8e8ea] leading-tight mt-0.5 max-w-40 truncate">
                        {business?.businessName}
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
                        {businesses?.map((b) => {
                            const currentOne = b.businessId === business?.businessId;
                            return (
                                <button
                                    key={b.businessId}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors ${currentOne ? 'bg-[#1a1a1d]' : 'hover:bg-[#1a1a1d]'}`}
                                    onClick={() => switchBusiness(b)}
                                >
                                    <img src={b.businessLogoUrl} className="w-8 h-8 rounded-md bg-[#101012] border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-[11px] font-medium text-[#d4af37] shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[13px] font-medium text-[#e8e8ea] truncate">{b.businessName}</p>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <span className={`w-1.5 h-1.5 rounded-full`} />
                                            <p className="text-[11px] text-[#9a9aa3]">{b.status}</p>
                                        </div>
                                    </div>
                                    {currentOne && <Check size={15} className="text-[#d4af37] shrink-0" />}
                                </button>
                            );
                        })}
                    </div>
                    <div className="border-t border-[rgba(255,255,255,0.06)] p-1.5">
                        <button
                            onClick={() => navigate('/create-business')}
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
                    <p className="text-[13px] text-[#e8e8ea] wrap-break-word">{value}</p>
                )}
            </div>
        </div>
    );
}

export default function BusinessProfilePage() {
    const [businesses, setBusinesses] = useState<Business[]>([]);
    const [activeBusiness, setActiveBusiness] = useState<Business | null>(null);
    const [services, setServices] = useState<ServiceWithRatings[]>([]);

    const user = useUser();

    useEffect(() => {

        if(!user) return;
        if(!user.business) return;
        
        setBusinesses(user.business);

        const activeByDefault = user.activeBusiness;

        setActiveBusiness(activeByDefault);

    }, [user]);

    useEffect(() => {
        
        if(!activeBusiness) return;
        const getIt = async () => {
            setServices(await getServices(activeBusiness.businessId));
        }

        getIt();

    }, [activeBusiness?.businessId]);

    return (
        <div className="min-h-screen h-screen p-6 lg:p-8 overflow-y-auto w-full bg-[#0a0a0c] text-[#e8e8ea]">
            <div className="mx-auto">

                {/* Top bar: switcher + edit action */}
                <div className="flex items-center justify-between mb-8">
                    <BusinessSwitcher
                        businesses={businesses}
                        business={activeBusiness}
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
                                    <img src={activeBusiness?.businessLogoUrl} alt='' className="w-full h-full object-cover" />
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
                                    <h1 className="text-[20px] font-semibold text-[#e8e8ea] tracking-tight">{activeBusiness?.businessName}</h1>
                                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border`}>
                                        <CircleDot size={9}  />
                                        <span className={`text-[11px] font-medium`}>{activeBusiness?.status}</span>
                                    </span>
                                </div>
                                <div className="flex items-center gap-1.5 mt-1.5 text-[#9a9aa3]">
                                    <Tag size={12} />
                                    <span className="text-[13px]">{activeBusiness?.type}</span>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="mt-4 text-[13px] leading-relaxed text-[#b5b5ba] max-w-xl">
                            {activeBusiness?.description}
                        </p>

                        {/* Meta strip: owner + created */}
                        <div className="mt-5 flex items-center gap-5 pt-4 border-t border-[rgba(255,255,255,0.06)]">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-[#1a1a1d] border border-[rgba(255,255,255,0.08)] flex items-center justify-center">
                                    <User size={11} className="text-[#9a9aa3]" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-[#6b6b72] leading-none">Owner</p>
                                    <p className="text-[12px] text-[#e8e8ea] leading-tight mt-0.5">{user.user?.firstName} {user.user?.lastName}</p>
                                </div>
                            </div>
                            <div className="w-px h-7 bg-[rgba(255,255,255,0.08)]" />
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-[#1a1a1d] border border-[rgba(255,255,255,0.08)] flex items-center justify-center">
                                    <Calendar size={11} className="text-[#9a9aa3]" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-[#6b6b72] leading-none">Started</p>
                                    <p className="text-[12px] text-[#e8e8ea] leading-tight mt-0.5">{activeBusiness ? formatDate(activeBusiness?.startedAt) : ''}</p>
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
                        <DetailRow icon={Mail} label="Business email" value={activeBusiness ? activeBusiness?.businessEmail : ''} />
                        {activeBusiness?.facebookPage && (
                            <DetailRow icon={Book} label="Facebook page" value={activeBusiness.facebookPage.replace('https://', '')} />
                        )}
                        <DetailRow icon={MapPin} label="Address" value={activeBusiness ? activeBusiness?.address.displayName : ''} />
                        <DetailRow icon={Clock} label="Timezone" value={activeBusiness ? activeBusiness?.timezone : ''} />
                    </div>
                </div>

                {/* Services */}
                <div className="mt-5">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <Sparkles size={14} className="text-[#d4af37]" />
                            <h2 className="text-[13px] font-medium text-[#e8e8ea]">Services</h2>
                            <span className="text-[12px] text-[#6b6b72]">{services.length}</span>
                        </div>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[rgba(255,255,255,0.08)] text-[12px] text-[#e8e8ea] hover:border-[#d4af37]/40 hover:text-[#d4af37] transition-colors">
                            <Plus size={13} />
                            Add service
                        </button>
                    </div>

                    {services.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-[rgba(255,255,255,0.1)] py-10 text-center">
                            <p className="text-[13px] text-[#9a9aa3]">No services added yet.</p>
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-4">
                            {services.map((s) => (
                                <ServiceBox key={s.services.id} servicesWithRatings={s} />
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}