import { BookingDatePicker } from "../components/DatePicker";

export function ServiceDetails() {
    return (
    //     height: 340px;
    //     display: flex;
    //     align-items: center;
    // justify - content: center;
    // font - size: 6rem;
    // position: relative;
    // overflow: hidden;
    // border - bottom: 1px solid var(--border);
        <div className="min-h-screen">
            <div className="h-85 flex items-center justify-center text-[6rem] relative overflow-hidden border-b border-(--border) bg-[linear-gradient(135deg,#140e20,#1e1530,#0f1e1c)]">💅</div>

            <div className="min-h-screen max-w-280 mx-auto">
                <div className="grid grid-cols-[1fr_340px] gap-12 pt-12 px-0 pb-20 items-start">
                    <div>
                        <div className="inline-flex items-center gap-1.5 text-[0.875rem] text-[--text-3] hover:text-(--text-2) mb-7 cursor-pointer transition-colors duration-200">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2">
                                <path d="M19 12H5M12 5l-7 7 7 7" />
                            </svg>
                            Back to results
                        </div>
                        <div className="text-[2rem] font-bold tracking-[0.3em] mb-2.5">Lumière Beauty Studio</div>
                        <div className="flex items-center gap-3.5 mb-6">
                            <div className="flex items-center gap-1.25">
                                <div className="flex gap-0.5"><span className="star">★</span><span className="star">★</span><span
                                    className="star">★</span><span className="star">★</span><span className="star">★</span></div>
                                <span className="text-[0.8125rem] font-semibold">4.9</span>
                                <span className="text-[0.75rem] text-(--text-3)">(218 reviews)</span>
                            </div>
                            <span className="inline-flex items-center gap-1 text-[0.75rem] font-bold py-0.75 px-2.25 rounded-[100px] tracking-widest bg-(--teal-dim) text-(--teal)">Open now</span>
                            <span className="text-[0.8125rem] text-(--text-3)">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2" className="inline mr-1">
                                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0Z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                                BGC, Taguig · 0.8 km away
                            </span>
                        </div>
                        <p className="text-[1rem] text-[--text-2] leading-[1.7] mb-10 max-w-140">
                            Lumière is a boutique beauty studio specializing in nail artistry, lash extensions, and
                            skincare. Every appointment is treated as a creative collaboration — your style, elevated. Walk
                            in for a quick polish or stay for a full transformation session.
                        </p>
                        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.8em] text-(--text-3) mb-3.5">Services offered</p>
                        <div className="flex flex-col gap-2.5 mb-10">
                            {/* selected item design */}
                            {/* border-color: rgba(201, 169, 110, 0.4);
                            background: var(--gold-dim); */}
                            <div className="bg-(--surface) hover:border-(--border-2) hover:bg-(--surface-2) border border-(--border) justify-between cursor-pointer transition-all duration-200 rounded-(--border) py-4 px-4.5 flex items-center">
                                <div className="flex flex-col gap-0.75">
                                    <div className="text-[0.9375rem] font-semibold">Gel Manicure + Nail Art</div>
                                    <div className="text-[0.8125rem] text-(--text-3)">60 min · includes design consultation</div>
                                </div>
                                <div className="text-[1rem] font-semibold">₱550</div>
                            </div>
                            <div className="bg-(--surface) hover:border-(--border-2) hover:bg-(--surface-2) border border-(--border) justify-between cursor-pointer transition-all duration-200 rounded-(--border) py-4 px-4.5 flex items-center">
                                <div className="flex flex-col gap-0.75">
                                    <div className="text-[0.9375rem] font-semibold">Gel Manicure + Nail Art</div>
                                    <div className="text-[0.8125rem] text-(--text-3)">60 min · includes design consultation</div>
                                </div>
                                <div className="text-[1rem] font-semibold">₱550</div>
                            </div>
                            <div className="bg-(--surface) hover:border-(--border-2) hover:bg-(--surface-2) border border-(--border) justify-between cursor-pointer transition-all duration-200 rounded-(--border) py-4 px-4.5 flex items-center">
                                <div className="flex flex-col gap-0.75">
                                    <div className="text-[0.9375rem] font-semibold">Gel Manicure + Nail Art</div>
                                    <div className="text-[0.8125rem] text-(--text-3)">60 min · includes design consultation</div>
                                </div>
                                <div className="text-[1rem] font-semibold">₱550</div>
                            </div>
                            <div className="bg-(--surface) hover:border-(--border-2) hover:bg-(--surface-2) border border-(--border) justify-between cursor-pointer transition-all duration-200 rounded-(--border) py-4 px-4.5 flex items-center">
                                <div className="flex flex-col gap-0.75">
                                    <div className="text-[0.9375rem] font-semibold">Gel Manicure + Nail Art</div>
                                    <div className="text-[0.8125rem] text-(--text-3)">60 min · includes design consultation</div>
                                </div>
                                <div className="text-[1rem] font-semibold">₱550</div>
                            </div>
                        </div>
                        <p className="text-[0.75rem] font-semibold uppercase leading-[0.8em] text-(--text-3) mb-3.5">Pick a date</p>
                        <BookingDatePicker />
                        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.8em] text-(--text-3) mb-3.5">Available times</p>
                        <div className="grid grid-cols-3 gap-2 mb-8">
                            {/* DESIGN IF BOOKED : 
                                opacity: 0.35;
                                cursor: not-allowed;
                                text-decoration: line-through; 
                            */}
                            {/* DESIGN IF SELECTED 
                            border-color: rgba(201, 169, 110, 0.4);
                            background: var(--gold-dim); 
                            */}
                            <div className="bg-(--surface-2) text-center text-[0.8125rem] font-medium cursor-pointer transition-all duration-150 text-(--text-2) border border-(--border) rounded-(---radius-sm) py-2.25 px-1.5">9:00 AM</div> 
                            <div className="bg-(--surface-2) text-center text-[0.8125rem] font-medium cursor-pointer transition-all duration-150 text-(--text-2) border border-(--border) rounded-(---radius-sm) py-2.25 px-1.5">10:00 AM</div>
                            <div className="bg-(--surface-2) text-center text-[0.8125rem] font-medium cursor-pointer transition-all duration-150 text-(--text-2) border border-(--border) rounded-(---radius-sm) py-2.25 px-1.5">11:00 AM</div>
                            <div className="bg-(--surface-2) text-center text-[0.8125rem] font-medium cursor-pointer transition-all duration-150 text-(--text-2) border border-(--border) rounded-(---radius-sm) py-2.25 px-1.5">12:00 PM</div>
                            <div className="bg-(--surface-2) text-center text-[0.8125rem] font-medium cursor-pointer transition-all duration-150 text-(--text-2) border border-(--border) rounded-(---radius-sm) py-2.25 px-1.5">1:00 PM</div>
                            <div className="bg-(--surface-2) text-center text-[0.8125rem] font-medium cursor-pointer transition-all duration-150 text-(--text-2) border border-(--border) rounded-(---radius-sm) py-2.25 px-1.5">2:00 PM</div>
                            <div className="bg-(--surface-2) text-center text-[0.8125rem] font-medium cursor-pointer transition-all duration-150 text-(--text-2) border border-(--border) rounded-(---radius-sm) py-2.25 px-1.5">3:00 PM</div>
                            <div className="bg-(--surface-2) text-center text-[0.8125rem] font-medium cursor-pointer transition-all duration-150 text-(--text-2) border border-(--border) rounded-(---radius-sm) py-2.25 px-1.5">4:00 PM</div>
                            <div className="bg-(--surface-2) text-center text-[0.8125rem] font-medium cursor-pointer transition-all duration-150 text-(--text-2) border border-(--border) rounded-(---radius-sm) py-2.25 px-1.5">5:00 PM</div>
                        </div>
                        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.8em] text-(--text-3) mb-3.5 mt-10">What clients say</p>
                        <div className="flex flex-col gap-5">
                            <div className="pb-5 border-b border-b-(--border)">
                                <div className="gap-2.5 mb-2.5 flex items-center">
                                    <img className="w-9 h-9 rounded-[50%] border border-(--border)" src="https://picsum.photos/200/300?random=2" alt="" />
                                    <div>
                                        <div className="text-[0.9rem] font-semibold">Aika C.</div>
                                        <div className="text-[0.75rem] mt-0.5 text-(--text-3)">May 2026</div>
                                    </div>
                                    <div className="flex gap-0.5 ml-auto"><span className="star">★</span><span
                                        className="star">★</span><span className="star">★</span><span className="star">★</span><span
                                            className="star">★</span></div>
                                </div>
                                <p className="text-[0.875rem] text-(--text-2) tracking-wide">The nail art was absolutely stunning. The technician listened to
                                    exactly what I wanted and delivered something even better. Clean studio, great vibes.
                                </p>
                            </div>
                            <div className="pb-5 border-b border-b-(--border)">
                                <div className="gap-2.5 mb-2.5 flex items-center">
                                    <img className="w-9 h-9 rounded-[50%] border border-(--border)" src="https://picsum.photos/200/300?random=1" alt="" />
                                    <div>
                                        <div className="text-[0.9rem] font-semibold">Aika C.</div>
                                        <div className="text-[0.75rem] mt-0.5 text-(--text-3)">May 2026</div>
                                    </div>
                                    <div className="flex gap-0.5 ml-auto"><span className="star">★</span><span
                                        className="star">★</span><span className="star">★</span><span className="star">★</span><span
                                            className="star">★</span></div>
                                </div>
                                <p className="text-[0.875rem] text-(--text-2) tracking-wide">The nail art was absolutely stunning. The technician listened to
                                    exactly what I wanted and delivered something even better. Clean studio, great vibes.
                                </p>
                            </div>
                            <div className="pb-5 border-b border-b-(--border)">
                                <div className="gap-2.5 mb-2.5 flex items-center">
                                    <img className="w-9 h-9 rounded-[50%] border border-(--border)" src="https://picsum.photos/200/300?random=4" alt="" />
                                    <div>
                                        <div className="text-[0.9rem] font-semibold">Aika C.</div>
                                        <div className="text-[0.75rem] mt-0.5 text-(--text-3)">May 2026</div>
                                    </div>
                                    <div className="flex gap-0.5 ml-auto"><span className="star">★</span><span
                                        className="star">★</span><span className="star">★</span><span className="star">★</span><span
                                            className="star">★</span></div>
                                </div>
                                <p className="text-[0.875rem] text-(--text-2) tracking-wide">The nail art was absolutely stunning. The technician listened to
                                    exactly what I wanted and delivered something even better. Clean studio, great vibes.
                                </p>
                            </div>
                            
                        </div>
                    </div>
                    <div>
                        <div className="bg-(--surface) border border-(--border) rounded-xl p-7 sticky top-21">
                            <div className="text-[1rem] font-semibold mb-5">Reserve your spot</div>
                            <div className="bg-(--surface-2) border border-(--border) rounded-(--radius) py-3.5 px-4 mb-4">
                                <div className="text-[0.75rem] text-(--text-3) mb-0.5">Service</div>
                                <div className="text-[0.9375rem] font-semibold" id="sidebarService">Gel Manicure + Nail Art</div>
                            </div>
                            <div className="sidebar-selection">
                                <div className="text-[0.75rem] text-(--text-3) mb-0.5">Date & time</div>
                                <div className="text-[0.9375rem] font-semibold">Tue, Jun 9 · 1:00 PM</div>
                            </div>
                            <div className="flex justify-between items-center py-4 px-0 border-t border-t-(--border) mb-5">
                                <div className="text-[0.875rem] text-(--text-2)">Total</div>
                                <div className="text-[1.375rem] font-bold">₱550</div>
                            </div>
                            <button className="btn btn-primary btn-lg w-full">
                                Book now
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2.5">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </button>
                            <p className="text-[0.75rem] text-(--text-3) text-center mt-3">Free
                                cancellation up to 2 hours before</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}