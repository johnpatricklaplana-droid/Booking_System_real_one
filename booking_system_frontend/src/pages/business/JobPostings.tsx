import { useState } from 'react';
import {
    Plus, Users, Briefcase, Eye, EyeOff, MoreHorizontal, Clock,
    MapPin, DollarSign, ChevronDown, X, ArrowUpRight, Pencil, Archive
} from 'lucide-react';

/**
 * Business — Job Postings page.
 * Renders inside the existing dashboard shell/sidebar (not included here).
 * Matches the Apex dashboard tokens used in Services.tsx:
 * bg #0a0a0c, surface #151518, border rgba(255,255,255,0.08), gold #c9a87c.
 * UI only — no state management wired to real data.
 */

type PostingStatus = 'open' | 'closed' | 'filled';

const postings: {
    id: string;
    title: string;
    category: string;
    type: string;
    pay: string;
    location: string;
    status: PostingStatus;
    applicants: number;
    newApplicants: number;
    posted: string;
}[] = [
        {
            id: '1',
            title: 'Massage Therapist',
            category: 'Wellness',
            type: 'Part-time',
            pay: '₱400–600 / session',
            location: 'Makati City',
            status: 'open',
            applicants: 14,
            newApplicants: 3,
            posted: '2 days ago',
        },
        {
            id: '2',
            title: 'Front Desk Receptionist',
            category: 'Operations',
            type: 'Full-time',
            pay: '₱16,000 / mo',
            location: 'Makati City',
            status: 'open',
            applicants: 31,
            newApplicants: 0,
            posted: '1 week ago',
        },
        {
            id: '3',
            title: 'Junior Esthetician',
            category: 'Beauty',
            type: 'Part-time',
            pay: '₱350 / session',
            location: 'Makati City',
            status: 'filled',
            applicants: 22,
            newApplicants: 0,
            posted: '3 weeks ago',
        },
        {
            id: '4',
            title: 'Weekend Spa Attendant',
            category: 'Wellness',
            type: 'Contract',
            pay: '₱500 / shift',
            location: 'Makati City',
            status: 'closed',
            applicants: 8,
            newApplicants: 0,
            posted: '1 month ago',
        },
    ];

const statusConfig: Record<PostingStatus, { label: string; dot: string; text: string }> = {
    open: { label: 'Open', dot: 'bg-[#7cc9a8]', text: 'text-[#7cc9a8]' },
    filled: { label: 'Filled', dot: 'bg-[#9d8fb5]', text: 'text-[#9d8fb5]' },
    closed: { label: 'Closed', dot: 'bg-[#6a6a73]', text: 'text-[#9a9aa3]' },
};

export default function BusinessJobPostings() {
    const [filter, setFilter] = useState<'all' | PostingStatus>('all');
    const [showComposer, setShowComposer] = useState(false);

    const filtered = filter === 'all' ? postings : postings.filter((p) => p.status === filter);
    const totalApplicants = postings.reduce((sum, p) => sum + p.applicants, 0);
    const newApplicants = postings.reduce((sum, p) => sum + p.newApplicants, 0);
    const openCount = postings.filter((p) => p.status === 'open').length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-[20px] font-medium text-[#e8e8ea] mb-1">Job postings</h2>
                    <p className="text-[13px] text-[#9a9aa3]">Hire staff to work at your business</p>
                </div>
                <button
                    onClick={() => setShowComposer(true)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-br from-[#c9a87c] to-[#b89c7e] rounded-lg text-[13px] font-medium text-[#0a0a0c] hover:shadow-lg hover:shadow-[#c9a87c]/20 transition-all"
                >
                    <Plus size={16} strokeWidth={2} />
                    Post a job
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-6">
                <StatCard icon={Briefcase} color="#c9a87c" label="Open postings" value={String(openCount)} />
                <StatCard icon={Users} color="#9d8fb5" label="Total applicants" value={String(totalApplicants)} />
                <StatCard icon={ArrowUpRight} color="#6b9fa3" label="New this week" value={String(newApplicants)} />
                <StatCard icon={Eye} color="#b89c7e" label="Posting views" value="1,204" />
            </div>

            {/* Filter tabs */}
            <div className="flex items-center justify-between">
                <div className="flex gap-2">
                    {(['all', 'open', 'filled', 'closed'] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-lg text-[13px] font-medium capitalize transition-all ${filter === f
                                    ? 'bg-[#1a1a1e] text-[#e8e8ea]'
                                    : 'text-[#9a9aa3] hover:bg-[#1a1a1e] hover:text-[#e8e8ea]'
                                }`}
                        >
                            {f === 'all' ? 'All postings' : f}
                        </button>
                    ))}
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-lg text-[13px] font-medium text-[#e8e8ea] hover:border-[rgba(255,255,255,0.15)] transition-all">
                    Sort: Newest
                    <ChevronDown size={14} className="text-[#9a9aa3]" />
                </button>
            </div>

            {/* Listings */}
            <div className="space-y-3">
                {filtered.map((job) => {
                    const cfg = statusConfig[job.status];
                    return (
                        <div
                            key={job.id}
                            className="bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-xl p-6 hover:border-[rgba(255,255,255,0.12)] transition-all"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-4 flex-1 min-w-0">
                                    <div className="w-11 h-11 rounded-lg bg-[#1a1a1e] flex items-center justify-center flex-shrink-0">
                                        <Briefcase size={18} className="text-[#c9a87c]" strokeWidth={1.5} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2.5 mb-1">
                                            <h3 className="text-[15px] font-medium text-[#e8e8ea]">{job.title}</h3>
                                            <span className={`flex items-center gap-1.5 text-[11px] font-medium ${cfg.text}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                                                {cfg.label}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 text-[12px] text-[#9a9aa3]">
                                            <span>{job.category}</span>
                                            <span className="flex items-center gap-1.5">
                                                <MapPin size={12} />
                                                {job.location}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Clock size={12} />
                                                {job.type}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <DollarSign size={12} />
                                                {job.pay}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 flex-shrink-0">
                                    <div className="text-right">
                                        <p className="text-[18px] font-medium text-[#e8e8ea]">
                                            {job.applicants}
                                            {job.newApplicants > 0 && (
                                                <span className="text-[11px] font-medium text-[#c9a87c] ml-1.5">
                                                    +{job.newApplicants} new
                                                </span>
                                            )}
                                        </p>
                                        <p className="text-[11px] text-[#9a9aa3]">applicants</p>
                                    </div>

                                    <button className="w-9 h-9 rounded-lg flex items-center justify-center text-[#9a9aa3] hover:bg-[#1a1a1e] hover:text-[#e8e8ea] transition-all">
                                        <MoreHorizontal size={16} />
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-5 pt-5 border-t border-[rgba(255,255,255,0.06)]">
                                <p className="text-[11px] text-[#6a6a73]">Posted {job.posted}</p>
                                <div className="flex items-center gap-2">
                                    <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[12px] font-medium text-[#9a9aa3] hover:bg-[#1a1a1e] hover:text-[#e8e8ea] transition-all">
                                        <Pencil size={13} />
                                        Edit
                                    </button>
                                    <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[12px] font-medium text-[#9a9aa3] hover:bg-[#1a1a1e] hover:text-[#e8e8ea] transition-all">
                                        {job.status === 'closed' ? <Eye size={13} /> : <EyeOff size={13} />}
                                        {job.status === 'closed' ? 'Reopen' : 'Close'}
                                    </button>
                                    <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[12px] font-medium text-[#0a0a0c] bg-gradient-to-br from-[#c9a87c] to-[#b89c7e] hover:shadow-lg hover:shadow-[#c9a87c]/20 transition-all">
                                        <Users size={13} />
                                        View applicants
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {filtered.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="w-12 h-12 rounded-lg bg-[#151518] border border-[rgba(255,255,255,0.08)] flex items-center justify-center mb-4">
                            <Archive size={18} className="text-[#9a9aa3]" strokeWidth={1.5} />
                        </div>
                        <p className="text-[13px] font-medium text-[#e8e8ea] mb-1">No postings here</p>
                        <p className="text-[12px] text-[#9a9aa3]">Try a different filter, or post a new job</p>
                    </div>
                )}
            </div>

            {/* Composer modal */}
            {showComposer && <JobComposer onClose={() => setShowComposer(false)} />}
        </div>
    );
}

function StatCard({
    icon: Icon,
    color,
    label,
    value,
}: {
    icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
    color: string;
    label: string;
    value: string;
}) {
    return (
        <div className="bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-xl p-6">
            <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: `${color}1a` }}
            >
                <Icon size={20} className="" strokeWidth={1.5} />
            </div>
            <p className="text-[13px] text-[#9a9aa3] mb-1">{label}</p>
            <p className="text-[24px] font-medium text-[#e8e8ea]">{value}</p>
        </div>
    );
}

function JobComposer({ onClose }: { onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-lg bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-2xl shadow-2xl">
                <div className="flex items-center justify-between px-6 py-5 border-b border-[rgba(255,255,255,0.06)]">
                    <h3 className="text-[15px] font-medium text-[#e8e8ea]">Post a job</h3>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-[#9a9aa3] hover:bg-[#1a1a1e] hover:text-[#e8e8ea] transition-all"
                    >
                        <X size={16} />
                    </button>
                </div>

                <div className="px-6 py-5 space-y-4 max-h-[60vh] overflow-y-auto">
                    <div>
                        <label className="text-[12px] font-medium text-[#9a9aa3] mb-2 block">Job title</label>
                        <input
                            type="text"
                            placeholder="e.g. Massage Therapist"
                            className="w-full px-4 py-2.5 bg-[#101012] border border-[rgba(255,255,255,0.08)] rounded-lg text-[13px] text-[#e8e8ea] placeholder-[#6a6a73] focus:outline-none focus:border-[#c9a87c]/40 transition-all"
                        />
                    </div>

                    <div>
                        <label className="text-[12px] font-medium text-[#9a9aa3] mb-2 block">Description</label>
                        <textarea
                            rows={3}
                            placeholder="What the role involves, who you're looking for..."
                            className="w-full px-4 py-2.5 bg-[#101012] border border-[rgba(255,255,255,0.08)] rounded-lg text-[13px] text-[#e8e8ea] placeholder-[#6a6a73] focus:outline-none focus:border-[#c9a87c]/40 transition-all resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-[12px] font-medium text-[#9a9aa3] mb-2 block">Employment type</label>
                            <button className="w-full flex items-center justify-between px-4 py-2.5 bg-[#101012] border border-[rgba(255,255,255,0.08)] rounded-lg text-[13px] text-[#e8e8ea]">
                                Part-time
                                <ChevronDown size={14} className="text-[#9a9aa3]" />
                            </button>
                        </div>
                        <div>
                            <label className="text-[12px] font-medium text-[#9a9aa3] mb-2 block">Link to service</label>
                            <button className="w-full flex items-center justify-between px-4 py-2.5 bg-[#101012] border border-[rgba(255,255,255,0.08)] rounded-lg text-[13px] text-[#e8e8ea]">
                                None
                                <ChevronDown size={14} className="text-[#9a9aa3]" />
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="text-[12px] font-medium text-[#9a9aa3] mb-2 block">Pay</label>
                        <input
                            type="text"
                            placeholder="e.g. ₱400–600 / session"
                            className="w-full px-4 py-2.5 bg-[#101012] border border-[rgba(255,255,255,0.08)] rounded-lg text-[13px] text-[#e8e8ea] placeholder-[#6a6a73] focus:outline-none focus:border-[#c9a87c]/40 transition-all"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 px-6 py-5 border-t border-[rgba(255,255,255,0.06)]">
                    <button
                        onClick={onClose}
                        className="px-4 py-2.5 text-[13px] font-medium text-[#9a9aa3] hover:text-[#e8e8ea] transition-all"
                    >
                        Cancel
                    </button>
                    <button className="px-5 py-2.5 bg-gradient-to-br from-[#c9a87c] to-[#b89c7e] rounded-lg text-[13px] font-medium text-[#0a0a0c] hover:shadow-lg hover:shadow-[#c9a87c]/20 transition-all">
                        Publish
                    </button>
                </div>
            </div>
        </div>
    );
}