import { useState, useEffect } from "react";
import { CustomerNavBar } from "../components/custumerNavBar";

// ── Types ─────────────────────────────────────────────────────
type Page = "home" | "explore" | "detail" | "booking" | "profile";
type ProfileTab = "upcoming" | "past" | "settings";
type BookingStep = 1 | 2 | 3 | "success";

// ── Tailwind token helpers (maps CSS vars to Tailwind arbitrary) ──
// bg: #0a0a0c  surface: #151518  surface2: #1c1c21  surface3: #242429
// gold: #c9a96e  goldLight: #e8c98a  violet: #9b8cdb  teal: #5ec4b0
// text1: #f0ede8  text2: #9b9898  text3: #5c5b60
// border: rgba(255,255,255,0.07)  border2: rgba(255,255,255,0.12)

export function HomePage() {

    return (
        <div className="bg-(--bg)">
            <CustomerNavBar />
            <div className="page active" id="page-home">
                <div className="py-25 pb-[80px] text-center relative overflow-hidden">
                    <div className="max-w-280 mx-auto px-8">
                        <div className="hero-eyebrow bg-none">
                            <span className="w-1.5 h-1.5 rounded-[50%] bg-(--teal) shadow-[0_0_8px_var(--teal)]"></span>
                            Over 12,000 services available near you
                        </div>
                        <h1 className="animate-[fade-in_1s_ease-out_forwards] opacity-0 text-[clamp(2.5rem,6vw,4.25rem)] font-bold tracking-[-0.04em] leading-[1.1] mb-5 text-(--text-1)">
                            Book services<br/><em className="font-normal bg-[linear-gradient(135deg,var(--gold-light),var(--gold))] bg-clip-text text-transparent">instantly, anywhere.</em>
                        </h1>
                        <p className="text-[1.25rem] animate-[fade-in_1.5s_ease-out_forwards] opacity-0 text-(--text-2) mb-11 max-w-125 mx-auto">Discover top-rated local businesses and reserve your spot in seconds. No phone
                            calls, no waiting.</p>

                        <div className="max-w-160 animate-[fade-in_1.7s_ease-out_forwards] opacity-0 mt-0 mx-auto mb-11 p-2 flex items-center gap-2 shadow-[0_8px_40px_rgba(0,0,0,0.4)] bg-(--surface) border border-(--border-2) rounded-xl">
                            <div className="flex-1 flex items-center gap-2.5 px-3.5">
                                <svg className="text-(--text-3) shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2">
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="m21 21-4.35-4.35" />
                                </svg>
                                <input className="text-[1rem] text-(--text-1) placeholder:text-(--text-2) w-full outline-0 py-2 border-none focus:border-transparent" type="text" placeholder="Search services, salons, clinics…" />
                            </div>
                            <div className="w-px h-8 bg-(--border)"></div>
                            <div className="flex-1 flex items-center gap-2.5 px-3.5 max-w-45">
                                <svg className="text-(--text-2)" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2">
                                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0Z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                                <input className="text-[1rem] text-(--text-1) placeholder:text-(--text-2) w-full outline-0 py-2 border-none focus:border-transparent" type="text" placeholder="Manila, PH" />
                            </div>
                            <button className="hover:shadow-[0_2px_16px_rgba(201,169,110,0.25)] hover:scale-105 transition-all duration-200 bg-[linear-gradient(135deg,var(--gold-light),var(--gold))] text-(--bg) font-bold text-[0.9375rem] rounded-[18px] py-3 px-6 shrink-0">
                                Search
                            </button>
                        </div>

                        <div className="flex gap-10 justify-center text-[0.875rem] text-(--text-3)">
                            <div className="hero-stat"><strong className="text-(--text-1) font-semibold block text-[1.125rem]">12,400+</strong> services listed</div>
                            <div className="hero-stat"><strong className="text-(--text-1) font-semibold block text-[1.125rem]">4.8★</strong> average rating</div>
                            <div className="hero-stat"><strong className="text-(--text-1) font-semibold block text-[1.125rem]">48 sec</strong> avg booking time</div>
                        </div>
                    </div>
                </div>

                <section className="section-sm py-12">
                    <div className="max-w-280 mx-auto px-8">
                        <p className="text-[0.75rem] font-semibold leading-[0.1em] uppercase text-(--gold) mb-3">Browse by category</p>
                        <div className="flex items-end justify-between mb-7">
                            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] flex items-center justify-between text-(--text-1) font-bold tracking-[-0.03em] leading-[1.2]">What are you looking for?</h2>
                            <button className="btn btn-ghost btn-sm">View all →</button>
                        </div>
                        <div className="grid grid-cols-6 gap-3">
                            <div className="bg-(--surface) hover:-translate-y-1 border border-(--border) rounded-lg pt-6 px-4 pb-5 text-center cursor-pointer transition-all duration-200 flex flex-col items-center gap-3">
                                <div className="">💆</div>
                                <div>
                                    <div className="text-[0.8125rem] font-semibold text-(--text-2) transition-colors duration-200">Beauty</div>
                                    <div className="text-[0.7rem] text-(--text-3)">1,240 services</div>
                                </div>
                            </div>
                            <div className="bg-(--surface) hover:-translate-y-1 border border-(--border) rounded-lg pt-6 px-4 pb-5 text-center cursor-pointer transition-all duration-200 flex flex-col items-center gap-3">
                                <div className="w-12 h-12 rounded-[14px] flex items-center justify-center text-[1.5rem] bg-[rgba(94,196,176,0.12)]">🏋️</div>
                                <div>
                                    <div className="text-[0.8125rem] font-semibold text-(--text-2) transition-colors duration-200">Fitness</div>
                                    <div className="text-[0.7rem] text-(--text-3)">840 services</div>
                                </div>
                            </div>
                            <div className="bg-(--surface) hover:-translate-y-1 border border-(--border) rounded-lg pt-6 px-4 pb-5 text-center cursor-pointer transition-all duration-200 flex flex-col items-center gap-3">
                                <div className="w-12 h-12 rounded-[14px] flex items-center justify-center text-[1.5rem] bg-[rgba(155,140,219,0.12)]">🧘</div>
                                <div>
                                    <div className="text-[0.8125rem] font-semibold text-(--text-2) transition-colors duration-200">Wellness</div>
                                    <div className="text-[0.7rem] text-(--text-3)">620 services</div>
                                </div>
                            </div>
                            <div className="bg-(--surface) hover:-translate-y-1 border border-(--border) rounded-lg pt-6 px-4 pb-5 text-center cursor-pointer transition-all duration-200 flex flex-col items-center gap-3">
                                <div className="w-12 h-12 rounded-[14px] flex items-center justify-center text-[1.5rem] bg-[rgba(201,169,110,0.12)]">💼</div>
                                <div>
                                    <div className="text-[0.8125rem] font-semibold text-(--text-2) transition-colors duration-200">Consulting</div>
                                    <div className="text-[0.7rem] text-(--text-3)">390 services</div>
                                </div>
                            </div>
                            <div className="bg-(--surface) hover:-translate-y-1 border border-(--border) rounded-lg pt-6 px-4 pb-5 text-center cursor-pointer transition-all duration-200 flex flex-col items-center gap-3">
                                <div className="w-12 h-12 rounded-[14px] flex items-center justify-center text-[1.5rem] bg-[rgba(100,180,255,0.1)]">🩺</div>
                                <div>
                                    <div className="text-[0.8125rem] font-semibold text-(--text-2) transition-colors duration-200">Medical</div>
                                    <div className="text-[0.7rem] text-(--text-3)">510 services</div>
                                </div>
                            </div>
                            <div className="bg-(--surface) hover:-translate-y-1 border border-(--border) rounded-lg pt-6 px-4 pb-5 text-center cursor-pointer transition-all duration-200 flex flex-col items-center gap-3">
                                <div className="w-12 h-12 rounded-[14px] flex items-center justify-center text-[1.5rem] bg-[rgba(255,220,100,0.1)]">🔧</div>
                                <div>
                                    <div className="text-[0.8125rem] font-semibold text-(--text-2) transition-colors duration-200">Home</div>
                                    <div className="text-[0.7rem] text-(--text-3)">780 services</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="h-px border-(--border) border"></div>

                <section className="py-20">
                    <div className="max-w-[1120px] mx-auto px-8">
                        <p className="text-[0.75rem] font-semibold leading-[0.1em] uppercase text-(--gold) mb-3">Featured</p>
                        <div className="flex items-end justify-between mb-7">
                            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] flex items-center justify-between text-(--text-1) font-bold tracking-[-0.03em] leading-[1.2]">Businesses you'll love</h2>
                            <button className="">See all →</button>
                        </div>
                        <div className="grid grid-cols-3 gap-5">
                            <div className="bg-(--surface) border hover:-translate-y-1 border-(--border) rounded-lg overflow-hidden cursor-pointer transition-all duration-200">
                                <div className="h-45 relative overflow-hidden flex items-center justify-center text-[3rem]">
                                    <img className="object-contain max-w-full" src="https://picsum.photos/200/300?random=1" />
                                    <div className="absolute left-0.5 py-2 px-4"><span className="text-[0.75rem] font-bold bg-(--gold-dim) py-1 px-2 rounded-lg text-(--gold)">★ 4.9</span></div>
                                </div>
                                <div className="py-4.5 px-5">
                                    <div className="flex items-center gap-2 text-[1rem] text-(--text-1) mb-1 font-semibold">Lumière Beauty Studio</div>
                                    <div className="flex items-center gap-2 text-(--text-2) mb-4">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                            stroke-width="2">
                                            <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0Z" />
                                            <circle cx="12" cy="10" r="3" />
                                        </svg>
                                        BGC, Taguig · 0.8 km
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="text-[0.875rem] text-(--text-2)">From <strong className="text-(--gold)">₱450</strong></div>
                                        <div className="text-[0.75rem] font-medium text-(--teal)">● Available today</div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-(--surface) border hover:-translate-y-1 border-(--border) rounded-lg overflow-hidden cursor-pointer transition-all duration-200">
                                <div className="h-45 relative overflow-hidden flex items-center justify-center text-[3rem]">
                                    <img className="object-contain max-w-full" src="https://picsum.photos/200/300?random=2" />
                                    <div className="absolute left-0.5 py-2 px-4"><span className="text-[0.75rem] font-bold bg-(--gold-dim) py-1 px-2 rounded-lg text-(--gold)">★ 4.9</span></div>
                                </div>
                                <div className="py-4.5 px-5">
                                    <div className="flex items-center gap-2 text-[1rem] text-(--text-1) mb-1 font-semibold">Serenity Wellness Spa</div>
                                    <div className="flex items-center gap-2 text-(--text-2) mb-4">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                            stroke-width="2">
                                            <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0Z" />
                                            <circle cx="12" cy="10" r="3" />
                                        </svg>
                                        Makati · 1.4 km
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="text-[0.875rem] text-(--text-2)">From <strong>₱800</strong></div>
                                        <div className="text-[0.75rem] font-medium text-(--teal)">● Next: 2:00 PM</div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-(--surface) border hover:-translate-y-1 border-(--border) rounded-lg overflow-hidden cursor-pointer transition-all duration-200">
                                <div className="h-45 relative overflow-hidden flex items-center justify-center text-[3rem]">
                                    <img className="object-contain max-w-full" src="https://picsum.photos/200/300?random=4" />
                                    <div className="absolute left-0.5 py-2 px-4"><span className="text-[0.75rem] font-bold bg-(--gold-dim) py-1 px-2 rounded-lg text-(--gold)">★ 4.9</span></div>
                                </div>
                                <div className="py-4.5 px-5">
                                    <div className="flex items-center gap-2 text-[1rem] text-(--text-1) mb-1 font-semibold">Forge Performance Gym</div>
                                    <div className="flex items-center gap-2 text-(--text-2) mb-4">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                            stroke-width="2">
                                            <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0Z" />
                                            <circle cx="12" cy="10" r="3" />
                                        </svg>
                                        Ortigas · 2.1 km
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="text-[0.875rem] text-(--text-2)">From <strong>₱350</strong></div>
                                        <div className="text-[0.75rem] font-medium text-(--teal)">● Available now</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="h-px border-(--border) border"></div>

                <section className="py-20">
                    <div className="mx-auto px-8 max-w-280">
                        <p className="text-[0.75rem] font-semibold leading-[0.1em] uppercase text-(--gold) mb-3">Near you</p>
                        <div className="flex items-end justify-between mb-7">
                            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] flex items-center justify-between text-(--text-1) font-bold tracking-[-0.03em] leading-[1.2]">Top rated in your area</h2>
                            <button className="">Explore more →</button>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            <div className="toprated-card">
                                <img className="toprated-avatar" src="https://picsum.photos/200/300?random=23" alt="" />
                                <div>
                                    <div className="text-[0.9375rem] font-semibold text-(--text-1)">Noir Barber Co.</div>
                                    <div className="toprated-cat">Barbershop · BGC</div>
                                </div>
                                <div className="toprated-footer">
                                    <div className="rating-row">
                                        <div className="text-(--gold)"><span className="star">★</span><span className="star">★</span><span
                                            className="star">★</span><span className="star">★</span><span className="star">★</span>
                                        </div>
                                        <span className="font-bold text-(--text-1)">5.0</span>
                                        <span className="rating-count">(218)</span>
                                    </div>
                                    <span className="bg-teal-200/15 text-(--teal) font-semibold py-0.75 px-2.25 text-[0.75rem] rounded-lg">Open</span>
                                </div>
                            </div>
                            <div className="toprated-card">
                                <img className="toprated-avatar" src="https://picsum.photos/200/300?random=89" alt="" />
                                <div>
                                    <div className="text-[0.9375rem] font-semibold text-(--text-1)">Pure Skin Manila</div>
                                    <div className="toprated-cat">Skincare · Makati</div>
                                </div>
                                <div className="toprated-footer">
                                    <div className="rating-row">
                                        <div className="stars"><span className="text-(--gold)">★</span><span className="text-(--gold)">★</span><span
                                            className="text-(--gold)">★</span><span className="text-(--text-2)">★</span><span className="text-(--text-2)">★</span>
                                        </div>
                                        <span className="font-bold text-(--text-1)">3.0</span>
                                        <span className="rating-count">(184)</span>
                                    </div>
                                    <span className="bg-teal-200/15 text-(--teal) py-0.75 px-2.25 text-[0.75rem] font-semibold rounded-lg">Open</span>
                                </div>
                            </div>
                            <div className="toprated-card">
                                <img className="toprated-avatar" src="https://picsum.photos/200/300?random=208" alt="" />
                                <div>
                                    <div className="text-[0.9375rem] font-semibold text-(--text-1)">HealthFirst Clinic</div>
                                    <div className="toprated-cat">Medical · Ortigas</div>
                                </div>
                                <div className="toprated-footer">
                                    <div className="rating-row">
                                        <div className="stars"><span className="text-(--gold)">★</span><span className="text-(--gold)">★</span><span
                                            className="text-(--gold)">★</span><span className="text-(--gold)">★</span><span className="text-(--text-2)">★</span>
                                        </div>
                                        <span className="font-bold text-(--text-1)">4.9</span>
                                        <span className="rating-count">(307)</span>
                                    </div>
                                    <span className="bg-teal-200/15 text-(--teal) py-0.75 px-2.25 text-[0.75rem] rounded-lg font-semibold">Open</span>
                                </div>
                            </div>
                            <div className="toprated-card">
                                <img className="toprated-avatar" src="https://picsum.photos/200/300?random=100" alt="" />
                                <div>
                                    <div className="text-[0.9375rem] font-semibold text-(--text-1)">Tranquil Massage</div>
                                    <div className="toprated-cat">Massage · Pasig</div>
                                </div>
                                <div className="toprated-footer">
                                    <div className="rating-row">
                                        <div className="stars"><span className="text-(--gold)">★</span><span className="text-(--text-2)">★</span><span
                                            className="text-(--text-2)">★</span><span className="text-(--text-2)">★</span><span
                                                className="text-(--text-2)">★</span></div>
                                        <span className="font-bold text-(--text-1)">4.8</span>
                                        <span className="rating-count">(142)</span>
                                    </div>
                                    <span className="text-(--gold) text-[0.75rem] py-0.75 px-2.25 bg-amber-200/15 rounded-lg font-semibold">Busy</span>
                                </div>
                            </div>
                        </div>
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

