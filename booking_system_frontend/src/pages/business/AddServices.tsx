import { useEffect, useState } from 'react';
import {
    ArrowLeft, Clock, DollarSign, Tag, FileText, Users, Image as ImageIcon,
    Plus, X, ChevronDown, Info, Sparkles, type LucideIcon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toISODuration } from '../../helper/convertSome';
import { PostFormData } from '../../api/api';
import { useUser } from '../../provider/UserContext';

/**
 * Add / Edit Service — full page layout
 * Matches Apex design tokens: --bg, --surface, --gold, --teal
 * No state management wired up beyond local UI toggles — this is UI scaffolding only.
 * Sections are split so new fields (capacity, deposit, buffer time, etc.)
 * can slot into an existing card without restructuring the page.
 */

const categories = ['Beauty', 'Wellness', 'Fitness', 'Professional'];

const inputClass =
    'w-full px-4 py-2.5 bg-[#101012] border border-[rgba(255,255,255,0.08)] rounded-lg text-[13px] text-[#e8e8ea] placeholder-[#6a6a73] focus:outline-none focus:border-[#c9a87c]/40 transition-all disabled:cursor-not-allowed';

interface Services {
    businessId: string;
    serviceName: string;
    description: string;
    duration: string | number;
    price: number; 
    capacity: number;
};

export default function ServiceForm() {
    const [selectedCategory, setSelectedCategory] = useState<string>('Beauty');
    const [service, setService] = useState<Services>({
        businessId: "",
        serviceName: "",
        description: "",
        duration: "",
        price: 0,
        capacity: 0
    });
    const [serviceLogo, setServiceLogo] = useState<File | undefined>(undefined);
    const [durationUnit, setDurationUnit] = useState<'min' | 'hr'>("min");

    const bussId = useUser().activeBusiness?.businessId;

    useEffect(() => {
        if(!bussId) return;

        setService(prev => ({...prev, businessId: bussId}));

    }, [bussId]);

    const handleInputsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const id = e.target.id;
        const value = e.target.value;

        setService(prev => ({...prev, [id]: value}));

    };

    const handleServiceLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newImage = e.target.files?.[0];

        setServiceLogo(newImage);
    };

    const saveService = async () => {

        if(!serviceLogo) return;

        const url = "http://localhost:8080/api/user/business/services";

        service.duration = toISODuration(Number(service.duration), durationUnit);

        console.log(service);

        const body = new FormData();
        body.append('body', new Blob([JSON.stringify(service)], { type: 'application/json' }));
        body.append('file', serviceLogo);

        const result = await PostFormData(url, body);
      
        if(result.status === 201) {
            console.log("good one");
        }

    };

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#0a0a0c]">
            {/* Top bar — sticky, consistent with app shell */}
            <div className="sticky top-0 z-10 bg-[#0a0a0c]/95 backdrop-blur-sm border-b border-[rgba(255,255,255,0.08)]">
                <div className="max-w-5xl mx-auto px-8 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button 
                            className="w-9 h-9 rounded-lg flex items-center justify-center text-[#9a9aa3] hover:bg-[#151518] hover:text-[#e8e8ea] transition-all"
                            onClick={() => navigate('/business/services')}
                        >
                            <ArrowLeft size={18} strokeWidth={2} />
                        </button>
                        <div>
                            <h1 className="text-[16px] font-medium text-[#e8e8ea]">New Service</h1>
                            <p className="text-[12px] text-[#9a9aa3]">Services / Add new</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="px-4 py-2.5 text-[13px] font-medium text-[#9a9aa3] hover:text-[#e8e8ea] transition-all">
                            Discard
                        </button>
                        <button 
                            className="px-5 py-2.5 bg-gradient-to-br from-[#c9a87c] to-[#b89c7e] rounded-lg text-[13px] font-medium text-[#0a0a0c] hover:shadow-lg hover:shadow-[#c9a87c]/20 transition-all"
                            onClick={saveService}
                        >
                            Save service
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-8 py-8 grid lg:grid-cols-[1fr_320px] gap-6">
                {/* Main column */}
                <div className="space-y-6">
                    {/* Basics */}
                    <Section icon={FileText} title="Basics" subtitle="Name and describe what customers are booking">
                        <Field label="Service name" required>
                            <input
                                type="text"
                                id='serviceName'
                                value={service.serviceName}
                                onChange={(e) => handleInputsChange(e)}
                                placeholder="e.g. Deep Tissue Massage"
                                className={inputClass}
                            />
                        </Field>

                        <Field label="Description">
                            <textarea
                                rows={3}
                                id='description'
                                value={service.description}
                                onChange={(e) => handleInputsChange(e)}
                                placeholder="What's included, what to expect, any prep needed..."
                                className={`${inputClass} resize-none`}
                            />
                        </Field>

                        <Field label="Category" required>
                            <div className="flex flex-wrap gap-2">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-4 py-2 rounded-lg text-[13px] font-medium border transition-all ${selectedCategory === cat
                                                ? 'bg-[#c9a87c]/10 border-[#c9a87c]/40 text-[#c9a87c]'
                                                : 'bg-[#151518] border-[rgba(255,255,255,0.08)] text-[#9a9aa3] hover:border-[rgba(255,255,255,0.15)] hover:text-[#e8e8ea]'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                                <button className="px-4 py-2 rounded-lg text-[13px] font-medium border border-dashed border-[rgba(255,255,255,0.15)] text-[#9a9aa3] hover:text-[#e8e8ea] hover:border-[rgba(255,255,255,0.25)] transition-all flex items-center gap-1.5">
                                    <Plus size={14} />
                                    New category
                                </button>
                            </div>
                        </Field>
                    </Section>

                    {/* Duration & Pricing */}
                    <Section icon={Clock} title="Duration & pricing" subtitle="How long it takes and what it costs">
                        <div className="grid grid-cols-2 gap-4">
                            <Field label="Duration" required>
                                <div className="relative">
                                    <input 
                                        onChange={(e) => handleInputsChange(e)} 
                                        id='duration'
                                        value={service.duration}
                                        type="text" 
                                        placeholder="45" 
                                        className={inputClass} 
                                    />
                                    <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex bg-[#1a1a1d] border border-[rgba(255,255,255,0.06)] rounded-md p-0.5">
                                        <button
                                            type="button"
                                            onClick={() => setDurationUnit('min')}
                                            className={`px-2 py-1 text-[11px] rounded-sm transition-colors ${durationUnit === 'min'
                                                    ? 'bg-[#2a2a2e] text-[#e8e8ea]'
                                                    : 'text-[#9a9aa3]'
                                                }`}
                                        >
                                            min
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setDurationUnit('hr')}
                                            className={`px-2 py-1 text-[11px] rounded-sm transition-colors ${durationUnit === 'hr'
                                                    ? 'bg-[#2a2a2e] text-[#e8e8ea]'
                                                    : 'text-[#9a9aa3]'
                                                }`}
                                        >
                                            hr
                                        </button>
                                    </div>
                                </div>
                            </Field>
                            <Field label="Price" required>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[13px] text-[#9a9aa3]">$</span>
                                    <input 
                                        type="number" 
                                        placeholder="85.00" 
                                        className={`${inputClass} pl-8`} 
                                        id='price'
                                        value={service.price}
                                        onChange={(e) => handleInputsChange(e)}
                                    />
                                </div>
                            </Field>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Field label="Buffer time" hint="Gap before next booking">
                                <div className="relative">
                                    <input type="number" placeholder="0" className={inputClass} />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[12px] text-[#9a9aa3]">min</span>
                                </div>
                            </Field>
                            <Field label="Capacity" hint="Customers per slot">
                                <input 
                                    type="number" 
                                    placeholder="1" 
                                    className={inputClass} 
                                    id='capacity'
                                    value={service.capacity}
                                    onChange={(e) => handleInputsChange(e)}
                                />
                            </Field>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-[#101012] border border-[rgba(255,255,255,0.06)] rounded-lg">
                            <div className="flex items-center gap-3">
                                <DollarSign size={16} className="text-[#9a9aa3]" />
                                <div>
                                    <p className="text-[13px] font-medium text-[#e8e8ea]">Require a deposit</p>
                                    <p className="text-[11px] text-[#9a9aa3]">Customers pay a portion upfront to confirm</p>
                                </div>
                            </div>
                            <Toggle />
                        </div>
                    </Section>

                    {/* Availability — placeholder section for future fields */}
                    <Section
                        icon={Sparkles}
                        title="Availability"
                        subtitle="Booking windows for this service"
                        badge="Coming soon"
                    >
                        <div className="grid grid-cols-2 gap-4 opacity-40 pointer-events-none">
                            <Field label="Max advance booking">
                                <input type="text" placeholder="e.g. 30 days" className={inputClass} disabled />
                            </Field>
                            <Field label="Min advance booking">
                                <input type="text" placeholder="e.g. 2 hours" className={inputClass} disabled />
                            </Field>
                        </div>
                    </Section>
                </div>

                {/* Side column */}
                <div className="space-y-6">
                    {/* Image */}
                    <SidePanel title="Image">
                        <label htmlFor='serviceLogo' className="relative overflow-hidden w-full aspect-[4/3] rounded-lg border border-dashed border-[rgba(255,255,255,0.12)] bg-[#101012] flex flex-col items-center justify-center gap-2 text-[#9a9aa3] hover:border-[rgba(255,255,255,0.2)] hover:text-[#e8e8ea] transition-all">
                            <img className='absolute top-0 left-0 w-full h-full' src={serviceLogo === undefined ? '' : URL.createObjectURL(serviceLogo)} alt="" />
                            <ImageIcon size={22} strokeWidth={1.5} />
                            <span className="text-[12px] font-medium">Upload image</span>
                            <span className="text-[11px] text-[#6a6a73]">PNG, JPG up to 5MB</span>
                        </label>
                        <input onChange={(e) => handleServiceLogoChange(e)} id='serviceLogo' type="file" hidden />
                    </SidePanel>

                    {/* Tags — placeholder for future field */}
                    <SidePanel title="Tags" badge="Optional">
                        <div className="flex flex-wrap gap-1.5 mb-2">
                            <span className="px-2.5 py-1 bg-[#1a1a1e] rounded-md text-[11px] text-[#e8e8ea] flex items-center gap-1">
                                <Tag size={10} />
                                Popular
                                <X size={10} className="text-[#9a9aa3] cursor-pointer" />
                            </span>
                        </div>
                        <button className="text-[12px] text-[#9a9aa3] hover:text-[#e8e8ea] transition-all flex items-center gap-1">
                            <Plus size={12} />
                            Add tag
                        </button>
                    </SidePanel>
                </div>
            </div>
        </div>
    );
}

/* ---------- Typed subcomponents ---------- */

interface SectionProps {
    icon: LucideIcon;
    title: string;
    subtitle?: string;
    badge?: string;
    children: React.ReactNode;
}

function Section({ icon: Icon, title, subtitle, badge, children }: SectionProps) {
    return (
        <div className="bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-xl p-6">
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#1a1a1e] flex items-center justify-center">
                        <Icon size={16} className="text-[#9a9aa3]" strokeWidth={1.5} />
                    </div>
                    <div>
                        <h3 className="text-[14px] font-medium text-[#e8e8ea]">{title}</h3>
                        {subtitle && <p className="text-[12px] text-[#9a9aa3]">{subtitle}</p>}
                    </div>
                </div>
                {badge && (
                    <span className="px-2.5 py-1 bg-[#1a1a1e] rounded-md text-[10px] font-medium text-[#9a9aa3] uppercase tracking-wide">
                        {badge}
                    </span>
                )}
            </div>
            <div className="space-y-4">{children}</div>
        </div>
    );
}

interface SidePanelProps {
    title: string;
    subtitle?: string;
    badge?: string;
    children: React.ReactNode;
}

function SidePanel({ title, subtitle, badge, children }: SidePanelProps) {
    return (
        <div className="bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
                <div>
                    <h3 className="text-[13px] font-medium text-[#e8e8ea]">{title}</h3>
                    {subtitle && <p className="text-[11px] text-[#9a9aa3]">{subtitle}</p>}
                </div>
                {badge && (
                    <span className="px-2 py-0.5 bg-[#1a1a1e] rounded-md text-[9px] font-medium text-[#9a9aa3] uppercase tracking-wide">
                        {badge}
                    </span>
                )}
            </div>
            {children}
        </div>
    );
}

interface FieldProps {
    label: string;
    required?: boolean;
    hint?: string;
    children: React.ReactNode;
}

function Field({ label, required, hint, children }: FieldProps) {
    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <label className="text-[12px] font-medium text-[#9a9aa3]">
                    {label} {required && <span className="text-[#c97c7c]">*</span>}
                </label>
                {hint && <span className="text-[11px] text-[#6a6a73]">{hint}</span>}
            </div>
            {children}
        </div>
    );
}

function Toggle() {
    return (
        <button className="w-10 h-6 rounded-full bg-[#1a1a1e] border border-[rgba(255,255,255,0.08)] relative transition-all">
            <span className="absolute left-1 top-1 w-4 h-4 rounded-full bg-[#9a9aa3] transition-all" />
        </button>
    );
}