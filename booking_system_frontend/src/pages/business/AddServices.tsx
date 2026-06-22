import { useState } from 'react';
import {
    ArrowLeft, Clock, DollarSign, Tag, FileText, Users, Image as ImageIcon,
    Plus, X, ChevronDown, Info, Sparkles, type LucideIcon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * Add / Edit Service — full page layout
 * Matches Apex design tokens: --bg, --surface, --gold, --teal
 * No state management wired up beyond local UI toggles — this is UI scaffolding only.
 * Sections are split so new fields (capacity, deposit, buffer time, etc.)
 * can slot into an existing card without restructuring the page.
 */

const categories = ['Beauty', 'Wellness', 'Fitness', 'Professional'];
const staffMembers = ['Sarah Mitchell', 'Emma Davis', 'Alex Rivera', 'Jordan Lee', 'David Kim', 'Mike Thompson'];
const accentOptions = ['#c9a87c', '#9d8fb5', '#6b9fa3', '#b89c7e', '#c97c7c', '#7cc9a8'];

const inputClass =
    'w-full px-4 py-2.5 bg-[#101012] border border-[rgba(255,255,255,0.08)] rounded-lg text-[13px] text-[#e8e8ea] placeholder-[#6a6a73] focus:outline-none focus:border-[#c9a87c]/40 transition-all disabled:cursor-not-allowed';

export default function ServiceForm() {
    const [selectedStaff, setSelectedStaff] = useState<string[]>(['Sarah Mitchell']);
    const [selectedCategory, setSelectedCategory] = useState<string>('Beauty');
    const [accent, setAccent] = useState<string>('#c9a87c');

    const toggleStaff = (name: string) => {
        setSelectedStaff((prev) =>
            prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
        );
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
                        <button className="px-5 py-2.5 bg-gradient-to-br from-[#c9a87c] to-[#b89c7e] rounded-lg text-[13px] font-medium text-[#0a0a0c] hover:shadow-lg hover:shadow-[#c9a87c]/20 transition-all">
                            Save service
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-8 py-8 grid grid-cols-[1fr_320px] gap-6">
                {/* Main column */}
                <div className="space-y-6">
                    {/* Basics */}
                    <Section icon={FileText} title="Basics" subtitle="Name and describe what customers are booking">
                        <Field label="Service name" required>
                            <input
                                type="text"
                                placeholder="e.g. Deep Tissue Massage"
                                className={inputClass}
                            />
                        </Field>

                        <Field label="Description">
                            <textarea
                                rows={3}
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
                                    <input type="number" placeholder="45" className={inputClass} />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[12px] text-[#9a9aa3]">min</span>
                                </div>
                            </Field>
                            <Field label="Price" required>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[13px] text-[#9a9aa3]">$</span>
                                    <input type="number" placeholder="85.00" className={`${inputClass} pl-8`} />
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
                                <input type="number" placeholder="1" className={inputClass} />
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

                    {/* Staff */}
                    <Section icon={Users} title="Staff" subtitle="Who can perform this service">
                        <div className="flex flex-wrap gap-2">
                            {staffMembers.map((name) => {
                                const active = selectedStaff.includes(name);
                                return (
                                    <button
                                        key={name}
                                        onClick={() => toggleStaff(name)}
                                        className={`px-3.5 py-2 rounded-lg text-[12px] font-medium border transition-all flex items-center gap-1.5 ${active
                                                ? 'bg-[#1a1a1e] border-[rgba(255,255,255,0.15)] text-[#e8e8ea]'
                                                : 'bg-[#101012] border-[rgba(255,255,255,0.06)] text-[#9a9aa3] hover:border-[rgba(255,255,255,0.12)] hover:text-[#e8e8ea]'
                                            }`}
                                    >
                                        {name}
                                        {active && <X size={12} />}
                                    </button>
                                );
                            })}
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
                        <button className="w-full aspect-[4/3] rounded-lg border border-dashed border-[rgba(255,255,255,0.12)] bg-[#101012] flex flex-col items-center justify-center gap-2 text-[#9a9aa3] hover:border-[rgba(255,255,255,0.2)] hover:text-[#e8e8ea] transition-all">
                            <ImageIcon size={22} strokeWidth={1.5} />
                            <span className="text-[12px] font-medium">Upload image</span>
                            <span className="text-[11px] text-[#6a6a73]">PNG, JPG up to 5MB</span>
                        </button>
                    </SidePanel>

                    {/* Color tag */}
                    <SidePanel title="Color tag" subtitle="Used on cards and calendar">
                        <div className="flex gap-2">
                            {accentOptions.map((color) => (
                                <button
                                    key={color}
                                    onClick={() => setAccent(color)}
                                    className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                                    style={{
                                        backgroundColor: color,
                                        boxShadow: accent === color ? `0 0 0 2px #0a0a0c, 0 0 0 4px ${color}` : 'none',
                                    }}
                                />
                            ))}
                        </div>
                    </SidePanel>

                    {/* Status */}
                    <SidePanel title="Status">
                        <button className="w-full flex items-center justify-between px-4 py-3 bg-[#101012] border border-[rgba(255,255,255,0.08)] rounded-lg text-[13px] text-[#e8e8ea] hover:border-[rgba(255,255,255,0.15)] transition-all">
                            <span className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#7cc9a8]" />
                                Active
                            </span>
                            <ChevronDown size={14} className="text-[#9a9aa3]" />
                        </button>
                        <p className="text-[11px] text-[#6a6a73] mt-2 flex items-start gap-1.5">
                            <Info size={12} className="mt-0.5 flex-shrink-0" />
                            Inactive services are hidden from the booking flow but keep their history
                        </p>
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