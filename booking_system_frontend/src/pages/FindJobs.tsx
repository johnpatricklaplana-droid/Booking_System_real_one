import { useState } from 'react';
import {
    Search, MapPin, Clock, DollarSign, Briefcase, Filter,
    Bookmark, ArrowUpRight, Sparkles, ChevronDown
} from 'lucide-react';

/**
 * Jobs page — customers browsing/applying to work for businesses.
 * Matches CustomerNavBar tokens: black/85 bg, gold gradient (#e8c98a -> #c9a96e),
 * muted text #9b9898, hover surface #1c1c21, light text #f0ede8.
 * UI only — no state management wired to real data.
 */

const categories = ['All', 'Beauty', 'Wellness', 'Fitness', 'Hospitality', 'Professional'];

const jobs = [
    {
        id: '1',
        title: 'Massage Therapist',
        business: 'Serenity Wellness Spa',
        category: 'Wellness',
        location: 'Makati City',
        type: 'Part-time',
        pay: '₱400–600 / session',
        posted: '2 days ago',
        description: 'Looking for a licensed massage therapist to join our growing team. You\'ll work with a steady client base built through the app — no need to bring your own clients.',
        tags: ['Licensed RMT', 'Flexible hours'],
        featured: true,
    },
    {
        id: '2',
        title: 'Hair Stylist',
        business: 'The Gilded Chair',
        category: 'Beauty',
        location: 'BGC, Taguig',
        type: 'Full-time',
        pay: '₱18,000–25,000 / mo',
        posted: '5 days ago',
        description: 'A modern salon seeking a stylist comfortable with color work and walk-in traffic. Booth space and product line provided.',
        tags: ['Color specialist', 'Walk-in clients'],
        featured: false,
    },
    {
        id: '3',
        title: 'Personal Trainer',
        business: 'Forge Fitness Studio',
        category: 'Fitness',
        location: 'Quezon City',
        type: 'Contract',
        pay: '₱500 / session',
        posted: '1 week ago',
        description: 'Certified trainer wanted for one-on-one sessions. Bring your own clients or build a roster through the studio\'s booking platform.',
        tags: ['Certified', 'Own clientele welcome'],
        featured: false,
    },
    {
        id: '4',
        title: 'Esthetician',
        business: 'Lumière Skin Studio',
        category: 'Beauty',
        location: 'Ortigas, Pasig',
        type: 'Part-time',
        pay: '₱350–550 / session',
        posted: '3 days ago',
        description: 'Join our skincare team performing facials and treatments. Weekend availability required; training provided on our product line.',
        tags: ['Facials', 'Weekends required'],
        featured: false,
    },
    {
        id: '5',
        title: 'Yoga Instructor',
        business: 'Still Point Studio',
        category: 'Fitness',
        location: 'Alabang',
        type: 'Part-time',
        pay: '₱450 / class',
        posted: '4 days ago',
        description: 'Seeking a vinyasa instructor for early morning classes. Small, intimate studio with a loyal regular following.',
        tags: ['Vinyasa', 'Morning sessions'],
        featured: true,
    },
];

export default function JobsPage() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [savedJobs, setSavedJobs] = useState<string[]>([]);

    const toggleSave = (id: string) => {
        setSavedJobs((prev) =>
            prev.includes(id) ? prev.filter((j) => j !== id) : [...prev, id]
        );
    };

    const filteredJobs =
        activeCategory === 'All' ? jobs : jobs.filter((j) => j.category === activeCategory);

    return (
        <div className="min-h-screen bg-black">
            {/* Hero */}
            <div className="relative px-8 pt-16 pb-12 border-b border-white/10 overflow-hidden">
                <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[radial-gradient(circle,_rgba(201,169,110,0.12)_0%,_transparent_70%)]" />
                <div className="relative max-w-3xl">
                    <div className="inline-flex items-center gap-1.5 text-[0.75rem] font-medium text-[#c9a96e] mb-4">
                        <Sparkles size={13} />
                        Work where you book
                    </div>
                    <h1 className="text-[2.5rem] font-bold tracking-tight text-[#f0ede8] mb-3 leading-[1.1]">
                        Find your next role,<br />on your own time.
                    </h1>
                    <p className="text-[0.95rem] text-[#9b9898] max-w-lg mb-7">
                        Businesses on Daddy's home are hiring stylists, trainers, and specialists.
                        Apply directly — no resumes buried in inboxes.
                    </p>

                    {/* Search bar */}
                    <div className="flex items-center gap-2.5 max-w-xl">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9b9898]" size={16} />
                            <input
                                type="text"
                                placeholder="Job title, business, or skill..."
                                className="w-full pl-11 pr-4 py-3 bg-[#111114] border border-white/10 rounded-xl text-[0.875rem] text-[#f0ede8] placeholder-[#6e6c6c] focus:outline-none focus:border-[#c9a96e]/40 transition-all"
                            />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-3 bg-[#111114] border border-white/10 rounded-xl text-[0.875rem] font-medium text-[#9b9898] hover:text-[#f0ede8] hover:border-white/20 transition-all">
                            <MapPin size={15} />
                            Location
                        </button>
                        <button className="px-5 py-3 rounded-xl text-[0.875rem] font-semibold text-black bg-[linear-gradient(135deg,var(--gold-light,#e8c98a)_0%,var(--gold,#c9a96e)_100%)] shadow-[0_2px_16px_rgba(201,169,110,0.25)] hover:shadow-[0_4px_24px_rgba(201,169,110,0.4)] hover:-translate-y-px transition-all">
                            Search
                        </button>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="px-8 py-10 max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 rounded-lg text-[0.8rem] font-medium transition-all ${activeCategory === cat
                                        ? 'bg-[#1c1c21] text-[#f0ede8]'
                                        : 'text-[#9b9898] hover:bg-[#1c1c21] hover:text-[#f0ede8]'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-[0.8rem] font-medium text-[#9b9898] hover:bg-[#1c1c21] hover:text-[#f0ede8] transition-all border border-white/10">
                        <Filter size={14} />
                        Sort: Newest
                        <ChevronDown size={13} />
                    </button>
                </div>

                <p className="text-[0.8rem] text-[#6e6c6c] mb-6">{filteredJobs.length} open positions</p>

                {/* Job list */}
                <div className="space-y-3">
                    {filteredJobs.map((job) => (
                        <div
                            key={job.id}
                            className="group relative bg-[#0d0d0f] border border-white/10 rounded-2xl p-6 hover:border-[#c9a96e]/30 transition-all cursor-pointer"
                        >
                            {job.featured && (
                                <div className="absolute top-6 right-6 flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#c9a96e]/10 text-[#c9a96e] text-[0.7rem] font-medium">
                                    <Sparkles size={10} />
                                    Featured
                                </div>
                            )}

                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-4 flex-1">
                                    <div className="w-12 h-12 rounded-xl bg-[#1c1c21] flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Briefcase size={18} className="text-[#c9a96e]" strokeWidth={1.5} />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-[1.05rem] font-semibold text-[#f0ede8] mb-0.5 group-hover:text-[#e8c98a] transition-colors">
                                            {job.title}
                                        </h3>
                                        <p className="text-[0.85rem] text-[#9b9898] mb-3">{job.business}</p>

                                        <p className="text-[0.8rem] text-[#9b9898]/80 leading-relaxed mb-3 max-w-xl line-clamp-2">
                                            {job.description}
                                        </p>

                                        <div className="flex items-center gap-4 text-[0.8rem] text-[#9b9898] mb-3">
                                            <span className="flex items-center gap-1.5">
                                                <MapPin size={13} />
                                                {job.location}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Clock size={13} />
                                                {job.type}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <DollarSign size={13} />
                                                {job.pay}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            {job.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-2.5 py-1 bg-[#1c1c21] rounded-md text-[0.7rem] text-[#9b9898]"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-2.5 flex-shrink-0">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleSave(job.id);
                                        }}
                                        className="w-9 h-9 rounded-lg flex items-center justify-center text-[#9b9898] hover:bg-[#1c1c21] hover:text-[#f0ede8] transition-all"
                                    >
                                        <Bookmark
                                            size={16}
                                            fill={savedJobs.includes(job.id) ? '#c9a96e' : 'none'}
                                            stroke={savedJobs.includes(job.id) ? '#c9a96e' : 'currentColor'}
                                        />
                                    </button>
                                    <span className="text-[0.7rem] text-[#6e6c6c]">{job.posted}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-end mt-4 pt-4 border-t border-white/5">
                                <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[0.8rem] font-semibold text-black bg-[linear-gradient(135deg,#e8c98a_0%,#c9a96e_100%)] hover:shadow-[0_4px_20px_rgba(201,169,110,0.3)] hover:-translate-y-px transition-all">
                                    Apply now
                                    <ArrowUpRight size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}