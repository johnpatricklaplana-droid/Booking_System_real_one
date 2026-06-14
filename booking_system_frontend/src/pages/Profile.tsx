import { useState } from "react";

type ProfileTab = "upcoming" | "past" | "settings";
type ActiveRole = "customer" | "seller";

const mockUser = {
    name: "Juan dela Cruz",
    email: "juan@email.com",
    avatar: "https://i.pravatar.cc/150?img=11",
    joinedDate: "March 2025",
    location: "BGC, Taguig",
    phone: "+63 912 345 6789",
};

const mockUpcoming = [
    { id: 1, service: "Haircut & Styling", business: "Noir Barber Co.", date: "Jun 15, 2026", time: "2:00 PM", price: "₱450", status: "confirmed", category: "Barbershop", img: "https://picsum.photos/seed/barber/80/80" },
    { id: 2, service: "Deep Tissue Massage", business: "Tranquil Massage", date: "Jun 20, 2026", time: "4:30 PM", price: "₱800", status: "pending", category: "Wellness", img: "https://picsum.photos/seed/massage/80/80" },
    { id: 3, service: "Personal Training", business: "Forge Performance Gym", date: "Jun 25, 2026", time: "7:00 AM", price: "₱600", status: "confirmed", category: "Fitness", img: "https://picsum.photos/seed/gym/80/80" },
];

const mockPast = [
    { id: 4, service: "Facial Treatment", business: "Pure Skin Manila", date: "May 28, 2026", time: "11:00 AM", price: "₱1,200", status: "completed", rating: 5, category: "Skincare", img: "https://picsum.photos/seed/facial/80/80" },
    { id: 5, service: "Full Body Massage", business: "Serenity Wellness Spa", date: "May 10, 2026", time: "3:00 PM", price: "₱900", status: "completed", rating: 4, category: "Wellness", img: "https://picsum.photos/seed/spa/80/80" },
    { id: 6, service: "Haircut", business: "Noir Barber Co.", date: "Apr 22, 2026", time: "1:00 PM", price: "₱350", status: "completed", rating: 5, category: "Barbershop", img: "https://picsum.photos/seed/cut/80/80" },
    { id: 7, service: "Yoga Session", business: "Zen Studio MNL", date: "Apr 10, 2026", time: "8:00 AM", price: "₱500", status: "completed", rating: 5, category: "Fitness", img: "https://picsum.photos/seed/yoga/80/80" },
];

const sellerListings = [
    { id: 1, service: "Men's Haircut", price: "₱350", bookings: 38, rating: 4.9, status: "active", img: "https://picsum.photos/seed/list1/80/80" },
    { id: 2, service: "Hair Color & Styling", price: "₱900", bookings: 21, rating: 4.8, status: "active", img: "https://picsum.photos/seed/list2/80/80" },
    { id: 3, service: "Beard Trim", price: "₱180", bookings: 14, rating: 5.0, status: "paused", img: "https://picsum.photos/seed/list3/80/80" },
];

const statusStyle: Record<string, React.CSSProperties> = {
    confirmed: { color: "#5ec4b0", background: "rgba(94,196,176,0.12)" },
    pending: { color: "#c9a96e", background: "rgba(201,169,110,0.12)" },
    completed: { color: "#9b9898", background: "rgba(155,152,152,0.10)" },
    active: { color: "#5ec4b0", background: "rgba(94,196,176,0.12)" },
    paused: { color: "#9b9898", background: "rgba(155,152,152,0.10)" },
};

export function ProfilePage() {
    const [tab, setTab] = useState<ProfileTab>("upcoming");
    const [activeRole, setActiveRole] = useState<ActiveRole>("customer");
    const [isSeller, setIsSeller] = useState(false);
    const [showSellerModal, setShowSellerModal] = useState(false);
    const [sellerStep, setSellerStep] = useState<1 | 2 | "done">(1);
    const [businessName, setBusinessName] = useState("");
    const [businessCategory, setBusinessCategory] = useState("");

    function handleRoleSwitch(role: ActiveRole) {
        if (role === "seller" && !isSeller) { setShowSellerModal(true); return; }
        setActiveRole(role);
    }

    function handleSellerSubmit() {
        if (sellerStep === 1) { setSellerStep(2); return; }
        setIsSeller(true);
        setActiveRole("seller");
        setSellerStep("done");
        setTimeout(() => { setShowSellerModal(false); setSellerStep(1); }, 1800);
    }

    const css = `
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.3s ease forwards; }
        .booking-card:hover { border-color: rgba(255,255,255,0.14) !important; transform: translateY(-1px); }
        .listing-card:hover { border-color: rgba(255,255,255,0.14) !important; }
        .setting-row:hover { background: rgba(255,255,255,0.03) !important; }
        .nav-tab:hover { color: #9b9898 !important; }
        input:focus, select:focus { border-color: rgba(201,169,110,0.4) !important; outline: none; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 4px; }
    `;

    return (
        <div style={{ background: "#0a0a0c", minHeight: "100vh", fontFamily: "system-ui,-apple-system,sans-serif", color: "#f0ede8" }}>
            <style>{css}</style>

            {/* ── Seller Modal ── */}
            {showSellerModal && (
                <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
                    <div style={{ background: "#151518", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "24px", padding: "2rem 2.25rem", width: "100%", maxWidth: "460px", position: "relative" }}>
                        {sellerStep !== "done" && (
                            <button onClick={() => setShowSellerModal(false)} style={{ position: "absolute", top: "1.25rem", right: "1.25rem", background: "rgba(255,255,255,0.06)", border: "none", borderRadius: "50%", width: "32px", height: "32px", cursor: "pointer", color: "#9b9898", fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
                        )}
                        {sellerStep === "done" ? (
                            <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
                                <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(94,196,176,0.15)", margin: "0 auto 1rem", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", color: "#5ec4b0" }}>✓</div>
                                <p style={{ color: "#5ec4b0", fontWeight: 700, fontSize: "1.125rem", margin: "0 0 0.4rem" }}>You're a seller now!</p>
                                <p style={{ color: "#9b9898", fontSize: "0.875rem", margin: 0 }}>Switching to seller mode…</p>
                            </div>
                        ) : (
                            <>
                                <div style={{ display: "flex", gap: "6px", marginBottom: "1.75rem" }}>
                                    {[1, 2].map(s => <div key={s} style={{ flex: 1, height: "3px", borderRadius: "2px", background: s <= sellerStep ? "#c9a96e" : "rgba(255,255,255,0.1)", transition: "background 0.3s" }} />)}
                                </div>
                                <p style={{ color: "#c9a96e", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 0.4rem" }}>{sellerStep === 1 ? "Step 1 of 2" : "Step 2 of 2"}</p>
                                <h2 style={{ color: "#f0ede8", fontSize: "1.5rem", fontWeight: 700, margin: "0 0 0.5rem", letterSpacing: "-0.025em" }}>{sellerStep === 1 ? "Tell us about your business" : "Review & agree"}</h2>
                                <p style={{ color: "#9b9898", fontSize: "0.875rem", lineHeight: 1.65, margin: "0 0 1.75rem" }}>{sellerStep === 1 ? "Set up your public seller profile to start receiving bookings on Apex." : "By proceeding, you accept the following seller commitments."}</p>

                                {sellerStep === 1 ? (
                                    <>
                                        <label style={{ display: "block", color: "#9b9898", fontSize: "0.8rem", marginBottom: "0.4rem" }}>Business name</label>
                                        <input value={businessName} onChange={e => setBusinessName(e.target.value)} placeholder="e.g. Lumière Beauty Studio"
                                            style={{ width: "100%", boxSizing: "border-box", background: "#1c1c21", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "0.8rem 1rem", color: "#f0ede8", fontSize: "0.9375rem", marginBottom: "1rem", transition: "border-color 0.2s" }} />
                                        <label style={{ display: "block", color: "#9b9898", fontSize: "0.8rem", marginBottom: "0.4rem" }}>Category</label>
                                        <select value={businessCategory} onChange={e => setBusinessCategory(e.target.value)}
                                            style={{ width: "100%", boxSizing: "border-box", background: "#1c1c21", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "0.8rem 1rem", color: businessCategory ? "#f0ede8" : "#5c5b60", fontSize: "0.9375rem", marginBottom: "1.75rem", appearance: "none", transition: "border-color 0.2s" }}>
                                            <option value="" disabled>Select a category</option>
                                            {["Beauty", "Fitness", "Wellness", "Medical", "Consulting", "Home Services"].map(c => <option key={c} value={c} style={{ background: "#1c1c21" }}>{c}</option>)}
                                        </select>
                                    </>
                                ) : (
                                    <div style={{ marginBottom: "1.75rem", background: "#1c1c21", borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)" }}>
                                        {["Respond to bookings within 2 hours", "Maintain a minimum 4.0 star rating", "Honor all confirmed appointments", "Apex takes a 10% platform fee per booking"].map((t, i, arr) => (
                                            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "0.875rem 1.125rem", borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                                                <span style={{ color: "#5ec4b0", fontSize: "14px", marginTop: "2px", flexShrink: 0 }}>✓</span>
                                                <span style={{ color: "#9b9898", fontSize: "0.875rem", lineHeight: 1.5 }}>{t}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <button onClick={handleSellerSubmit} disabled={sellerStep === 1 && (!businessName.trim() || !businessCategory)}
                                    style={{ width: "100%", padding: "0.9rem", background: "linear-gradient(135deg,#e8c98a,#c9a96e)", border: "none", borderRadius: "12px", color: "#0a0a0c", fontWeight: 700, fontSize: "0.9375rem", cursor: "pointer", opacity: sellerStep === 1 && (!businessName.trim() || !businessCategory) ? 0.4 : 1, transition: "opacity 0.2s" }}>
                                    {sellerStep === 1 ? "Continue →" : "Agree & Become a Seller"}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* ── Two-column layout ── */}
            <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", minHeight: "100vh", maxWidth: "1280px", margin: "0 auto" }}>

                {/* ══ LEFT SIDEBAR ══ */}
                <aside style={{ borderRight: "1px solid rgba(255,255,255,0.07)", padding: "2.5rem 1.75rem", display: "flex", flexDirection: "column", gap: "2rem", position: "sticky", top: 0, height: "100vh", overflowY: "auto" }}>

                    {/* Avatar + name */}
                    <div style={{ textAlign: "center" }}>
                        <div style={{ position: "relative", display: "inline-block", marginBottom: "1rem" }}>
                            <img src={mockUser.avatar} alt="avatar" style={{ width: "88px", height: "88px", borderRadius: "50%", border: "2px solid rgba(201,169,110,0.35)", objectFit: "cover", display: "block" }} />
                            {isSeller && <div style={{ position: "absolute", bottom: "2px", right: "2px", width: "22px", height: "22px", borderRadius: "50%", background: "#5ec4b0", border: "2.5px solid #0a0a0c", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", color: "#0a0a0c", fontWeight: 700 }}>✓</div>}
                        </div>
                        <h2 style={{ color: "#f0ede8", fontSize: "1.125rem", fontWeight: 700, margin: "0 0 0.3rem", letterSpacing: "-0.02em" }}>{mockUser.name}</h2>
                        <p style={{ color: "#9b9898", fontSize: "0.8125rem", margin: "0 0 0.25rem" }}>{mockUser.email}</p>
                        <p style={{ color: "#5c5b60", fontSize: "0.75rem", margin: 0 }}>📍 {mockUser.location}</p>
                    </div>

                    {/* Stats row */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                        {[{ label: "Bookings", value: mockPast.length + mockUpcoming.length }, { label: "Completed", value: mockPast.length }, { label: "Saved", value: "12" }, { label: "Reviews", value: "24" }].map(s => (
                            <div key={s.label} style={{ background: "#151518", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "0.875rem", textAlign: "center" }}>
                                <p style={{ color: "#f0ede8", fontWeight: 700, fontSize: "1.25rem", margin: "0 0 0.2rem" }}>{s.value}</p>
                                <p style={{ color: "#5c5b60", fontSize: "0.72rem", margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Role switcher */}
                    <div>
                        <p style={{ color: "#5c5b60", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 0.75rem" }}>Active mode</p>
                        <div style={{ background: "#151518", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "14px", padding: "5px", display: "flex", flexDirection: "column", gap: "4px" }}>
                            {(["customer", "seller"] as ActiveRole[]).map(role => {
                                const isActive = activeRole === role;
                                const locked = role === "seller" && !isSeller;
                                return (
                                    <button key={role} onClick={() => handleRoleSwitch(role)} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "0.75rem 1rem", borderRadius: "10px", border: "none", cursor: "pointer", background: isActive ? "linear-gradient(135deg,#e8c98a,#c9a96e)" : "transparent", color: isActive ? "#0a0a0c" : locked ? "#5c5b60" : "#9b9898", fontWeight: isActive ? 700 : 500, fontSize: "0.9rem", transition: "all 0.2s", textAlign: "left" }}>
                                        <span style={{ fontSize: "18px" }}>{role === "customer" ? "👤" : "🏪"}</span>
                                        <div style={{ flex: 1 }}>
                                            <span style={{ display: "block", fontWeight: isActive ? 700 : 500 }}>{role.charAt(0).toUpperCase() + role.slice(1)}</span>
                                            {locked && <span style={{ fontSize: "0.7rem", opacity: 0.7, fontWeight: 400 }}>Tap to set up</span>}
                                        </div>
                                        {isActive && <span style={{ fontSize: "12px" }}>●</span>}
                                    </button>
                                );
                            })}
                        </div>
                        {!isSeller && (
                            <p style={{ color: "#5c5b60", fontSize: "0.78rem", margin: "0.75rem 0 0", textAlign: "center" }}>
                                <button onClick={() => setShowSellerModal(true)} style={{ background: "none", border: "none", color: "#c9a96e", cursor: "pointer", fontSize: "0.78rem", fontWeight: 600, padding: 0 }}>Become a seller →</button>
                            </p>
                        )}
                    </div>

                    {/* Account info */}
                    <div>
                        <p style={{ color: "#5c5b60", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 0.75rem" }}>Account</p>
                        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                            {[
                                { icon: "🔔", label: "Notifications" },
                                { icon: "🔒", label: "Security" },
                                { icon: "💳", label: "Payment methods" },
                                { icon: "📍", label: "Saved addresses" },
                            ].map(item => (
                                <div key={item.label} className="setting-row" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "0.625rem 0.75rem", borderRadius: "10px", cursor: "pointer", transition: "background 0.15s" }}>
                                    <span style={{ fontSize: "16px", width: "24px", textAlign: "center" }}>{item.icon}</span>
                                    <span style={{ color: "#9b9898", fontSize: "0.875rem", flex: 1 }}>{item.label}</span>
                                    <span style={{ color: "#5c5b60", fontSize: "16px" }}>›</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginTop: "auto" }}>
                        <button style={{ width: "100%", padding: "0.75rem", background: "rgba(255,80,80,0.07)", border: "1px solid rgba(255,80,80,0.15)", borderRadius: "12px", color: "#ff6b6b", fontSize: "0.875rem", fontWeight: 600, cursor: "pointer" }}>Sign out</button>
                        <p style={{ color: "#5c5b60", fontSize: "0.72rem", textAlign: "center", margin: "0.75rem 0 0" }}>Member since {mockUser.joinedDate}</p>
                    </div>
                </aside>

                {/* ══ MAIN CONTENT ══ */}
                <main style={{ padding: "2.5rem 2.5rem", overflowY: "auto" }}>

                    {/* ── CUSTOMER VIEW ── */}
                    {activeRole === "customer" && (
                        <>
                            {/* Tab bar */}
                            <div style={{ display: "flex", gap: "0", borderBottom: "1px solid rgba(255,255,255,0.07)", marginBottom: "2rem" }}>
                                {(["upcoming", "past", "settings"] as ProfileTab[]).map(t => (
                                    <button key={t} className="nav-tab" onClick={() => setTab(t)} style={{ background: "none", border: "none", cursor: "pointer", padding: "0.875rem 1.5rem", color: tab === t ? "#f0ede8" : "#5c5b60", fontSize: "0.9rem", fontWeight: tab === t ? 600 : 400, borderBottom: tab === t ? "2px solid #c9a96e" : "2px solid transparent", transition: "all 0.2s", textTransform: "capitalize", letterSpacing: "0.01em" }}>
                                        {t}
                                    </button>
                                ))}
                            </div>

                            {/* Upcoming */}
                            {tab === "upcoming" && (
                                <div className="fade-up">
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
                                        <div>
                                            <h1 style={{ color: "#f0ede8", fontSize: "1.5rem", fontWeight: 700, margin: "0 0 0.25rem", letterSpacing: "-0.025em" }}>Upcoming bookings</h1>
                                            <p style={{ color: "#9b9898", fontSize: "0.875rem", margin: 0 }}>{mockUpcoming.length} reservations scheduled</p>
                                        </div>
                                        <button style={{ background: "linear-gradient(135deg,#e8c98a,#c9a96e)", border: "none", borderRadius: "10px", padding: "0.625rem 1.25rem", color: "#0a0a0c", fontWeight: 700, fontSize: "0.875rem", cursor: "pointer" }}>+ New booking</button>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                                        {mockUpcoming.map(b => (
                                            <div key={b.id} className="booking-card" style={{ background: "#151518", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", gap: "1.25rem", transition: "all 0.2s", cursor: "pointer" }}>
                                                <img src={b.img} alt="" style={{ width: "56px", height: "56px", borderRadius: "12px", objectFit: "cover", flexShrink: 0, background: "#1c1c21" }} />
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "0.3rem" }}>
                                                        <p style={{ color: "#f0ede8", fontWeight: 600, fontSize: "1rem", margin: 0 }}>{b.service}</p>
                                                        <span style={{ ...statusStyle[b.status], fontSize: "0.72rem", fontWeight: 700, padding: "2px 9px", borderRadius: "20px" }}>{b.status}</span>
                                                    </div>
                                                    <p style={{ color: "#9b9898", fontSize: "0.8375rem", margin: "0 0 0.25rem" }}>{b.business}</p>
                                                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                                        <span style={{ color: "#5c5b60", fontSize: "0.8rem" }}>📅 {b.date}</span>
                                                        <span style={{ color: "#5c5b60", fontSize: "0.8rem" }}>🕐 {b.time}</span>
                                                        <span style={{ color: "#5c5b60", fontSize: "0.8rem" }}>🏷 {b.category}</span>
                                                    </div>
                                                </div>
                                                <div style={{ textAlign: "right", flexShrink: 0 }}>
                                                    <p style={{ color: "#c9a96e", fontWeight: 700, fontSize: "1.125rem", margin: "0 0 0.5rem" }}>{b.price}</p>
                                                    <div style={{ display: "flex", gap: "6px" }}>
                                                        <button style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "5px 12px", color: "#9b9898", fontSize: "0.78rem", cursor: "pointer" }}>Reschedule</button>
                                                        <button style={{ background: "rgba(255,80,80,0.08)", border: "1px solid rgba(255,80,80,0.15)", borderRadius: "8px", padding: "5px 12px", color: "#ff6b6b", fontSize: "0.78rem", cursor: "pointer" }}>Cancel</button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Past */}
                            {tab === "past" && (
                                <div className="fade-up">
                                    <div style={{ marginBottom: "1.5rem" }}>
                                        <h1 style={{ color: "#f0ede8", fontSize: "1.5rem", fontWeight: 700, margin: "0 0 0.25rem", letterSpacing: "-0.025em" }}>Booking history</h1>
                                        <p style={{ color: "#9b9898", fontSize: "0.875rem", margin: 0 }}>{mockPast.length} completed sessions · ₱{mockPast.reduce((a, b) => a + parseInt(b.price.replace(/[₱,]/g, "")), 0).toLocaleString()} total spent</p>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                        {mockPast.map(b => (
                                            <div key={b.id} className="booking-card" style={{ background: "#151518", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "1.125rem 1.5rem", display: "flex", alignItems: "center", gap: "1.25rem", transition: "all 0.2s", cursor: "pointer" }}>
                                                <img src={b.img} alt="" style={{ width: "52px", height: "52px", borderRadius: "12px", objectFit: "cover", flexShrink: 0, background: "#1c1c21", opacity: 0.75 }} />
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <p style={{ color: "#f0ede8", fontWeight: 600, fontSize: "0.9375rem", margin: "0 0 0.2rem" }}>{b.service}</p>
                                                    <p style={{ color: "#9b9898", fontSize: "0.8125rem", margin: "0 0 0.3rem" }}>{b.business} · {b.date}</p>
                                                    <div style={{ color: "#c9a96e", fontSize: "0.85rem", letterSpacing: "1px" }}>{"★".repeat(b.rating)}{"☆".repeat(5 - b.rating)}</div>
                                                </div>
                                                <div style={{ textAlign: "right", flexShrink: 0 }}>
                                                    <p style={{ color: "#9b9898", fontWeight: 600, fontSize: "0.9375rem", margin: "0 0 0.5rem" }}>{b.price}</p>
                                                    <button style={{ background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.2)", borderRadius: "8px", padding: "5px 12px", color: "#c9a96e", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer" }}>Rebook</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Settings */}
                            {tab === "settings" && (
                                <div className="fade-up">
                                    <h1 style={{ color: "#f0ede8", fontSize: "1.5rem", fontWeight: 700, margin: "0 0 0.25rem", letterSpacing: "-0.025em" }}>Account settings</h1>
                                    <p style={{ color: "#9b9898", fontSize: "0.875rem", margin: "0 0 2rem" }}>Manage your preferences and personal information</p>

                                    {/* Profile info card */}
                                    <div style={{ background: "#151518", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "1.5rem", marginBottom: "1.25rem" }}>
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                                            <p style={{ color: "#c9a96e", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", margin: 0 }}>Personal information</p>
                                            <button style={{ background: "none", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "5px 14px", color: "#9b9898", fontSize: "0.8rem", cursor: "pointer" }}>Edit</button>
                                        </div>
                                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                                            {[{ label: "Full name", val: mockUser.name }, { label: "Email", val: mockUser.email }, { label: "Phone", val: mockUser.phone }, { label: "Location", val: mockUser.location }].map(f => (
                                                <div key={f.label} style={{ background: "#1c1c21", borderRadius: "10px", padding: "0.875rem 1rem", border: "1px solid rgba(255,255,255,0.06)" }}>
                                                    <p style={{ color: "#5c5b60", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.07em", margin: "0 0 0.3rem" }}>{f.label}</p>
                                                    <p style={{ color: "#f0ede8", fontSize: "0.9rem", margin: 0, fontWeight: 500 }}>{f.val}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Settings list */}
                                    <div style={{ background: "#151518", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", overflow: "hidden" }}>
                                        {[
                                            { icon: "🔔", label: "Notifications", desc: "Booking alerts, promotions, reminders" },
                                            { icon: "🔒", label: "Password & security", desc: "Update password, two-factor auth" },
                                            { icon: "💳", label: "Payment methods", desc: "GCash, Maya, credit cards" },
                                            { icon: "📍", label: "Saved addresses", desc: "Home, work, and custom locations" },
                                            { icon: "🌐", label: "Language & region", desc: "English (PH), Philippine Peso" },
                                            { icon: "🛡️", label: "Privacy", desc: "Data usage, visibility settings" },
                                        ].map((item, i, arr) => (
                                            <div key={item.label} className="setting-row" style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem 1.5rem", borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none", cursor: "pointer", transition: "background 0.15s" }}>
                                                <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0 }}>{item.icon}</div>
                                                <div style={{ flex: 1 }}>
                                                    <p style={{ color: "#f0ede8", fontWeight: 500, fontSize: "0.9375rem", margin: "0 0 0.15rem" }}>{item.label}</p>
                                                    <p style={{ color: "#5c5b60", fontSize: "0.8rem", margin: 0 }}>{item.desc}</p>
                                                </div>
                                                <span style={{ color: "#5c5b60", fontSize: "18px" }}>›</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {/* ── SELLER VIEW ── */}
                    {activeRole === "seller" && isSeller && (
                        <div className="fade-up">
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
                                <div>
                                    <p style={{ color: "#c9a96e", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 0.3rem" }}>Seller dashboard</p>
                                    <h1 style={{ color: "#f0ede8", fontSize: "1.5rem", fontWeight: 700, margin: 0, letterSpacing: "-0.025em" }}>Your business</h1>
                                </div>
                                <button style={{ background: "linear-gradient(135deg,#e8c98a,#c9a96e)", border: "none", borderRadius: "10px", padding: "0.625rem 1.25rem", color: "#0a0a0c", fontWeight: 700, fontSize: "0.875rem", cursor: "pointer" }}>+ Add listing</button>
                            </div>

                            {/* Stats */}
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "12px", marginBottom: "2rem" }}>
                                {[{ label: "Total bookings", val: "73", trend: "+12%" }, { label: "This month", val: "₱18,400", trend: "+8%" }, { label: "Avg rating", val: "4.9 ★", trend: "+0.1" }, { label: "Repeat clients", val: "68%", trend: "+5%" }].map(s => (
                                    <div key={s.label} style={{ background: "#151518", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "1.25rem" }}>
                                        <p style={{ color: "#5c5b60", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.07em", margin: "0 0 0.5rem" }}>{s.label}</p>
                                        <p style={{ color: "#f0ede8", fontWeight: 700, fontSize: "1.5rem", margin: "0 0 0.3rem", letterSpacing: "-0.02em" }}>{s.val}</p>
                                        <p style={{ color: "#5ec4b0", fontSize: "0.78rem", fontWeight: 600, margin: 0 }}>{s.trend} this month</p>
                                    </div>
                                ))}
                            </div>

                            {/* Listings */}
                            <div style={{ background: "#151518", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", overflow: "hidden", marginBottom: "1.5rem" }}>
                                <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <p style={{ color: "#f0ede8", fontWeight: 600, fontSize: "1rem", margin: 0 }}>Your listings</p>
                                    <button style={{ background: "none", border: "none", color: "#c9a96e", fontSize: "0.8rem", cursor: "pointer", fontWeight: 600 }}>Manage all →</button>
                                </div>
                                {sellerListings.map((l, i) => (
                                    <div key={l.id} className="listing-card" style={{ display: "flex", alignItems: "center", gap: "1.25rem", padding: "1.125rem 1.5rem", borderBottom: i < sellerListings.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none", transition: "all 0.2s", cursor: "pointer", border: "none", borderBottomWidth: i < sellerListings.length - 1 ? "1px" : "0", borderBottomStyle: "solid", borderBottomColor: "rgba(255,255,255,0.06)" }}>
                                        <img src={l.img} alt="" style={{ width: "52px", height: "52px", borderRadius: "12px", objectFit: "cover", flexShrink: 0, background: "#1c1c21" }} />
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "0.25rem" }}>
                                                <p style={{ color: "#f0ede8", fontWeight: 600, fontSize: "0.9375rem", margin: 0 }}>{l.service}</p>
                                                <span style={{ ...statusStyle[l.status], fontSize: "0.7rem", fontWeight: 700, padding: "2px 8px", borderRadius: "20px" }}>{l.status}</span>
                                            </div>
                                            <p style={{ color: "#9b9898", fontSize: "0.8rem", margin: 0 }}>{l.bookings} bookings · ★ {l.rating}</p>
                                        </div>
                                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                                            <p style={{ color: "#c9a96e", fontWeight: 700, fontSize: "1rem", margin: "0 0 0.4rem" }}>{l.price}</p>
                                            <button style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "4px 12px", color: "#9b9898", fontSize: "0.78rem", cursor: "pointer" }}>Edit</button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Recent bookings for seller */}
                            <div style={{ background: "#151518", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", overflow: "hidden" }}>
                                <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <p style={{ color: "#f0ede8", fontWeight: 600, fontSize: "1rem", margin: 0 }}>Incoming requests</p>
                                    <span style={{ ...statusStyle["confirmed"], fontSize: "0.72rem", fontWeight: 700, padding: "3px 10px", borderRadius: "20px" }}>2 pending</span>
                                </div>
                                {mockUpcoming.slice(0, 2).map((b, i) => (
                                    <div key={b.id} style={{ display: "flex", alignItems: "center", gap: "1.25rem", padding: "1rem 1.5rem", borderBottom: i === 0 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                                        <img src={b.img} alt="" style={{ width: "44px", height: "44px", borderRadius: "10px", objectFit: "cover", flexShrink: 0 }} />
                                        <div style={{ flex: 1 }}>
                                            <p style={{ color: "#f0ede8", fontWeight: 500, fontSize: "0.9rem", margin: "0 0 0.2rem" }}>{b.service}</p>
                                            <p style={{ color: "#9b9898", fontSize: "0.8rem", margin: 0 }}>{b.date} · {b.time}</p>
                                        </div>
                                        <div style={{ display: "flex", gap: "6px" }}>
                                            <button style={{ background: "rgba(94,196,176,0.1)", border: "1px solid rgba(94,196,176,0.2)", borderRadius: "8px", padding: "5px 14px", color: "#5ec4b0", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer" }}>Accept</button>
                                            <button style={{ background: "rgba(255,80,80,0.08)", border: "1px solid rgba(255,80,80,0.15)", borderRadius: "8px", padding: "5px 14px", color: "#ff6b6b", fontSize: "0.8rem", cursor: "pointer" }}>Decline</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
    
}