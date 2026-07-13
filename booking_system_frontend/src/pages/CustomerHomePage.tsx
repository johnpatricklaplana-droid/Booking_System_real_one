import { useEffect, useState } from "react";
import { useUser } from "../provider/UserContext";
import { useNavigate } from "react-router-dom";
import { Search, MapPin } from "lucide-react";

// TODO: replace with real category list from backend (service.category enum / distinct query)
const CATEGORIES = [
    { key: "beauty", label: "Beauty", emoji: "💆" },
    { key: "fitness", label: "Fitness", emoji: "🏋️" },
    { key: "wellness", label: "Wellness", emoji: "🧘" },
    { key: "consulting", label: "Consulting", emoji: "💼" },
    { key: "medical", label: "Medical", emoji: "🩺" },
    { key: "home", label: "Home", emoji: "🔧" },
];

type BusinessCard = {
    id: string;
    name: string;
    category: string;
    city: string;
    priceFrom: number;
    imageUrl: string;
};

// TODO: replace with GET /api/businesses?limit=6 (or whatever the real listing endpoint ends up being)
// Deliberately NOT showing rating/distance/"available now" here — there's no review-aggregation
// or geolocation ranking built yet, and faking those numbers is worse than omitting them.
const MOCK_BUSINESSES: BusinessCard[] = [
    { id: "1", name: "Lumière Beauty Studio", category: "Beauty", city: "BGC, Taguig", priceFrom: 450, imageUrl: "https://picsum.photos/400/300?random=1" },
    { id: "2", name: "Serenity Wellness Spa", category: "Wellness", city: "Makati", priceFrom: 800, imageUrl: "https://picsum.photos/400/300?random=2" },
    { id: "3", name: "Forge Performance Gym", category: "Fitness", city: "Ortigas", priceFrom: 350, imageUrl: "https://picsum.photos/400/300?random=4" },
];

export function HomePage() {
    const user = useUser()?.user;
    const navigate = useNavigate();

    const [query, setQuery] = useState("");
    const [location, setLocation] = useState("");

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    function handleSearch() {
        // TODO: wire to /search route once query params are decided (q, location)
        navigate(`/search?q=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}`);
    }

    return (
        <div className="bg-(--bg)">
            <div className="page active" id="page-home">
                {/* Hero */}
                <div className="py-25 pb-[80px] text-center relative overflow-hidden">
                    <div className="max-w-280 mx-auto px-8">
                        <div className="hero-eyebrow bg-none">
                            <span className="w-1.5 h-1.5 rounded-[50%] bg-(--teal) shadow-[0_0_8px_var(--teal)]"></span>
                            Book local services in a few taps
                        </div>
                        <h1 className="animate-[fade-in_1s_ease-out_forwards] opacity-0 text-[clamp(2.5rem,6vw,4.25rem)] font-bold tracking-[-0.04em] leading-[1.1] mb-5 text-(--text-1)">
                            Book services<br /><em className="font-normal bg-[linear-gradient(135deg,var(--gold-light),var(--gold))] bg-clip-text text-transparent">instantly, anywhere.</em>
                        </h1>
                        <p className="text-[1.25rem] animate-[fade-in_1.5s_ease-out_forwards] opacity-0 text-(--text-2) mb-11 max-w-125 mx-auto">
                            Discover local businesses and reserve your spot in seconds. No phone calls, no waiting.
                        </p>

                        <div className="max-w-160 animate-[fade-in_1.7s_ease-out_forwards] opacity-0 mt-0 mx-auto mb-11 p-2 flex items-center gap-2 shadow-[0_8px_40px_rgba(0,0,0,0.4)] bg-(--surface) border border-(--border-2) rounded-xl">
                            <div className="flex-1 flex items-center gap-2.5 px-3.5">
                                <Search className="text-(--text-3) shrink-0" size={18} strokeWidth={2} />
                                <input
                                    className="text-[1rem] text-(--text-1) placeholder:text-(--text-2) w-full outline-0 py-2 border-none focus:border-transparent"
                                    type="text"
                                    placeholder="Search services, salons, clinics…"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                />
                            </div>
                            <div className="w-px h-8 bg-(--border)"></div>
                            <div className="flex-1 flex items-center gap-2.5 px-3.5 max-w-45">
                                <MapPin className="text-(--text-2)" size={16} strokeWidth={2} />
                                <input
                                    className="text-[1rem] text-(--text-1) placeholder:text-(--text-2) w-full outline-0 py-2 border-none focus:border-transparent"
                                    type="text"
                                    placeholder="Manila, PH"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                />
                            </div>
                            <button
                                onClick={handleSearch}
                                className="hover:shadow-[0_2px_16px_rgba(201,169,110,0.25)] hover:scale-105 transition-all duration-200 bg-[linear-gradient(135deg,var(--gold-light),var(--gold))] text-(--bg) font-bold text-[0.9375rem] rounded-[18px] py-3 px-6 shrink-0"
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>

                {/* Categories */}
                <section className="section-sm py-12">
                    <div className="max-w-280 mx-auto px-8">
                        <p className="text-[0.75rem] font-semibold leading-[0.1em] uppercase text-(--gold) mb-3">Browse by category</p>
                        <div className="flex items-end justify-between mb-7">
                            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] flex items-center justify-between text-(--text-1) font-bold tracking-[-0.03em] leading-[1.2]">What are you looking for?</h2>
                        </div>
                        <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat.key}
                                    onClick={() => navigate(`/search?category=${cat.key}`)}
                                    className="bg-(--surface) hover:-translate-y-1 border border-(--border) rounded-lg pt-6 px-4 pb-5 text-center cursor-pointer transition-all duration-200 flex flex-col items-center gap-3"
                                >
                                    <div className="text-[1.5rem]">{cat.emoji}</div>
                                    <div className="text-[0.8125rem] font-semibold text-(--text-2) transition-colors duration-200">{cat.label}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                <div className="h-px border-(--border) border"></div>

                {/* Businesses */}
                <section className="py-20">
                    <div className="max-w-280 mx-auto px-8">
                        <p className="text-[0.75rem] font-semibold leading-[0.1em] uppercase text-(--gold) mb-3">Discover</p>
                        <div className="flex items-end justify-between mb-7">
                            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] flex items-center justify-between text-(--text-1) font-bold tracking-[-0.03em] leading-[1.2]">Businesses on Apex</h2>
                            <button onClick={() => navigate("/search")} className="btn btn-ghost btn-sm">See all →</button>
                        </div>

                        {MOCK_BUSINESSES.length === 0 ? (
                            <div className="text-center py-16 text-(--text-3)">
                                No businesses listed yet.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                                {MOCK_BUSINESSES.map((biz) => (
                                    <div
                                        key={biz.id}
                                        onClick={() => navigate(`/business/${biz.id}`)}
                                        className="bg-(--surface) border hover:-translate-y-1 border-(--border) rounded-lg overflow-hidden cursor-pointer transition-all duration-200"
                                    >
                                        <div className="h-45 relative overflow-hidden flex items-center justify-center">
                                            <img className="object-cover w-full h-full" src={biz.imageUrl} alt={biz.name} />
                                        </div>
                                        <div className="py-4.5 px-5">
                                            <div className="flex items-center gap-2 text-[1rem] text-(--text-1) mb-1 font-semibold">{biz.name}</div>
                                            <div className="flex items-center gap-2 text-(--text-2) mb-4">
                                                <MapPin size={12} strokeWidth={2} />
                                                {biz.city}
                                            </div>
                                            <div className="text-[0.875rem] text-(--text-2)">
                                                From <strong className="text-(--gold)">₱{biz.priceFrom}</strong>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                <footer className="bg-(--surface) border border-(--border) py-10 text-center">
                    <div className="text-[1.125rem] font-bold bg-[linear-gradient(135deg,var(--gold-light),var(--gold))] mb-3 bg-clip-text text-transparent">Apex</div>
                    <p className="text-[0.8125rem] text-(--text-3)">© 2026 Apex Technologies. Premium booking for modern life.</p>
                </footer>
            </div>
        </div>
    );
}