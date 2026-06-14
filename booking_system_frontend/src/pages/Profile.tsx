import { useState } from "react";
import { CustomerNavBar } from "../components/custumerNavBar";
import { useNavigate } from "react-router-dom";

type BookingTab = "upcoming" | "past";

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
    { id: 4, service: "Facial Treatment", business: "Pure Skin Manila", date: "May 28, 2026", price: "₱1,200", rating: 5, img: "https://picsum.photos/seed/facial/80/80" },
    { id: 5, service: "Full Body Massage", business: "Serenity Wellness Spa", date: "May 10, 2026", price: "₱900", rating: 4, img: "https://picsum.photos/seed/spa/80/80" },
    { id: 6, service: "Haircut", business: "Noir Barber Co.", date: "Apr 22, 2026", price: "₱350", rating: 5, img: "https://picsum.photos/seed/cut/80/80" },
    { id: 7, service: "Yoga Session", business: "Zen Studio MNL", date: "Apr 10, 2026", price: "₱500", rating: 5, img: "https://picsum.photos/seed/yoga/80/80" },
];

const STATUS_STYLES: Record<string, React.CSSProperties> = {
    confirmed: { background: "rgba(94,196,176,0.10)", color: "#5ec4b0" },
    pending: { background: "rgba(201,169,110,0.10)", color: "#c9a96e" },
    completed: { background: "rgba(255,255,255,0.06)", color: "#9b9898" },
    active: { background: "rgba(94,196,176,0.10)", color: "#5ec4b0" },
    paused: { background: "rgba(255,255,255,0.06)", color: "#9b9898" },
};

function StatusPill({ status }: { status: string }) {
    return (
        <span style={{
            ...STATUS_STYLES[status],
            fontSize: ".68rem", fontWeight: 700, padding: "2px 8px",
            borderRadius: 20, display: "inline-block",
        }}>
            {status}
        </span>
    );
}

function SectionHeader({
    title, action, onAction,
}: { title: string; action?: string; onAction?: () => void }) {
    return (
        <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "1.125rem 1.375rem",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
            <span style={{ fontSize: ".8rem", fontWeight: 600, color: "#9b9898", letterSpacing: ".05em", textTransform: "uppercase" }}>
                {title}
            </span>
            {action && (
                <button onClick={onAction} style={ghostBtn}>
                    {action}
                </button>
            )}
        </div>
    );
}

function RowItem({
    icon, label, desc, badge, arrow = true,
}: { icon: string; label: string; desc?: string; badge?: string; arrow?: boolean }) {
    return (
        <div className="row-item" style={{
            display: "flex", alignItems: "center", gap: "1rem",
            padding: ".875rem 1.375rem",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            cursor: "pointer",
        }}>
            <div style={rowIconStyle}>{icon}</div>
            <div style={{ flex: 1 }}>
                <div style={{ fontSize: ".9rem", color: "#e8e4de", fontWeight: 500, marginBottom: ".15rem" }}>{label}</div>
                {desc && <div style={{ fontSize: ".78rem", color: "#5c5b60" }}>{desc}</div>}
            </div>
            {badge && (
                <span style={{ fontSize: ".7rem", background: "rgba(201,169,110,0.12)", color: "#c9a96e", border: "1px solid rgba(201,169,110,0.2)", borderRadius: 20, padding: "2px 8px", fontWeight: 600 }}>
                    {badge}
                </span>
            )}
            {arrow && !badge && <span style={{ color: "#3a3a40", fontSize: 18, fontWeight: 300 }}>›</span>}
        </div>
    );
}

const sectionCard: React.CSSProperties = {
    background: "#111115",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: "1rem",
};

const ghostBtn: React.CSSProperties = {
    background: "none",
    border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: 7,
    padding: "4px 12px",
    color: "#9b9898",
    fontSize: ".78rem",
    cursor: "pointer",
    fontFamily: "inherit",
};

const primaryBtn: React.CSSProperties = {
    background: "linear-gradient(135deg,#e8c98a,#c9a96e)",
    border: "none",
    borderRadius: 10,
    padding: ".6rem 1.25rem",
    color: "#0a0a0d",
    fontWeight: 700,
    fontSize: ".85rem",
    cursor: "pointer",
    letterSpacing: ".01em",
    fontFamily: "inherit",
};

const rowIconStyle: React.CSSProperties = {
    width: 36, height: 36, borderRadius: 9,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.06)",
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0, color: "#9b9898", fontSize: 16,
};

/* ─── Personal Information Section (Customer Focused) ───── */
function PersonalInfoSection() {
    return (
        <div style={sectionCard}>
            <SectionHeader title="Personal information" action="Edit" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "rgba(255,255,255,0.05)" }}>
                {[
                    { label: "Full name", value: mockUser.name },
                    { label: "Phone", value: mockUser.phone },
                    { label: "Email", value: mockUser.email },
                    { label: "Location", value: mockUser.location },
                ].map(f => (
                    <div key={f.label} style={{ background: "#111115", padding: "1rem 1.375rem" }}>
                        <div style={{ fontSize: ".72rem", color: "#5c5b60", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: ".35rem" }}>{f.label}</div>
                        <div style={{ fontSize: ".875rem", color: "#e8e4de", fontWeight: 500 }}>{f.value}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ─── Notifications Section ─────────────────────────────── */
function NotificationsSection() {
    const [notifications, setNotifications] = useState([
        { label: "Booking confirmations", desc: "Immediate alerts for new bookings", defaultOn: true, key: "confirmations" },
        { label: "Reminders", desc: "24h before your appointment", defaultOn: true, key: "reminders" },
        { label: "Promotions", desc: "Deals from services you've used", defaultOn: false, key: "promotions" },
    ]);

    const handleToggle = (key: string) => {
        setNotifications(prev => prev.map(n =>
            n.key === key ? { ...n, defaultOn: !n.defaultOn } : n
        ));
    };

    const Toggle = ({ on, onChange }: { on: boolean; onChange: () => void }) => (
        <button
            onClick={onChange}
            aria-checked={on}
            role="switch"
            style={{
                width: 36, height: 20, borderRadius: 20, border: "none", cursor: "pointer",
                background: on ? "#5ec4b0" : "rgba(255,255,255,0.1)",
                position: "relative", flexShrink: 0, transition: "background .2s",
            }}
        >
            <span style={{
                position: "absolute", width: 14, height: 14, borderRadius: "50%",
                background: "#fff", top: 3, transition: "left .2s",
                left: on ? 19 : 3,
            }} />
        </button>
    );

    return (
        <div style={sectionCard}>
            <SectionHeader title="Notifications" />
            {notifications.map(n => (
                <div key={n.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: ".875rem 1.375rem", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <div>
                        <div style={{ fontSize: ".875rem", color: "#e8e4de", fontWeight: 500, marginBottom: ".2rem" }}>{n.label}</div>
                        <div style={{ fontSize: ".75rem", color: "#5c5b60" }}>{n.desc}</div>
                    </div>
                    <Toggle on={n.defaultOn} onChange={() => handleToggle(n.key)} />
                </div>
            ))}
        </div>
    );
}

/* ─── Privacy Section ───────────────────────────────────── */
function PrivacySection() {
    const [privacySettings, setPrivacySettings] = useState([
        { label: "Public profile", desc: "Sellers can see your profile", defaultOn: true, key: "publicProfile" },
        { label: "Booking history visible", desc: "Show past bookings to providers", defaultOn: false, key: "bookingHistory" },
        { label: "Analytics sharing", desc: "Help improve Apex with usage data", defaultOn: true, key: "analytics" },
    ]);

    const handleToggle = (key: string) => {
        setPrivacySettings(prev => prev.map(p =>
            p.key === key ? { ...p, defaultOn: !p.defaultOn } : p
        ));
    };

    const Toggle = ({ on, onChange }: { on: boolean; onChange: () => void }) => (
        <button
            onClick={onChange}
            aria-checked={on}
            role="switch"
            style={{
                width: 36, height: 20, borderRadius: 20, border: "none", cursor: "pointer",
                background: on ? "#5ec4b0" : "rgba(255,255,255,0.1)",
                position: "relative", flexShrink: 0, transition: "background .2s",
            }}
        >
            <span style={{
                position: "absolute", width: 14, height: 14, borderRadius: "50%",
                background: "#fff", top: 3, transition: "left .2s",
                left: on ? 19 : 3,
            }} />
        </button>
    );

    return (
        <div style={sectionCard}>
            <SectionHeader title="Privacy" />
            {privacySettings.map(p => (
                <div key={p.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: ".875rem 1.375rem", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <div>
                        <div style={{ fontSize: ".875rem", color: "#e8e4de", fontWeight: 500, marginBottom: ".2rem" }}>{p.label}</div>
                        <div style={{ fontSize: ".75rem", color: "#5c5b60" }}>{p.desc}</div>
                    </div>
                    <Toggle on={p.defaultOn} onChange={() => handleToggle(p.key)} />
                </div>
            ))}
        </div>
    );
}

/* ─── Bookings Section ──────────────────────────────────── */
function BookingsSection() {
    const [tab, setTab] = useState<BookingTab>("upcoming");
    const tabStyle = (active: boolean): React.CSSProperties => ({
        background: "none", border: "none", padding: ".75rem 1.25rem",
        color: active ? "#e8e4de" : "#5c5b60", fontSize: ".875rem",
        cursor: "pointer", borderBottom: active ? "2px solid #c9a96e" : "2px solid transparent",
        fontFamily: "inherit", transition: "all .2s", fontWeight: active ? 600 : 500,
    });
    const actionBtn = (variant: "reschedule" | "cancel" | "rebook"): React.CSSProperties => {
        const map = {
            reschedule: { bg: "rgba(255,255,255,0.04)", bc: "rgba(255,255,255,0.09)", color: "#9b9898" },
            cancel: { bg: "rgba(255,70,70,0.07)", bc: "rgba(255,70,70,0.15)", color: "#ff6b6b" },
            rebook: { bg: "rgba(201,169,110,0.08)", bc: "rgba(201,169,110,0.2)", color: "#c9a96e" },
        }[variant];
        return { fontSize: ".72rem", padding: "3px 10px", borderRadius: 6, cursor: "pointer", fontFamily: "inherit", fontWeight: 600, border: `1px solid ${map.bc}`, background: map.bg, color: map.color };
    };

    return (
        <div style={sectionCard}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.375rem" }}>
                <span style={{ fontSize: ".8rem", fontWeight: 600, color: "#9b9898", letterSpacing: ".05em", textTransform: "uppercase" }}>Bookings</span>
                <button style={primaryBtn}>+ New booking</button>
            </div>
            <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "0 1.375rem" }}>
                <button style={tabStyle(tab === "upcoming")} onClick={() => setTab("upcoming")}>Upcoming ({mockUpcoming.length})</button>
                <button style={tabStyle(tab === "past")} onClick={() => setTab("past")}>History ({mockPast.length})</button>
            </div>

            {tab === "upcoming" && mockUpcoming.map((b, i) => (
                <div key={b.id} style={{ display: "flex", alignItems: "center", gap: "1.125rem", padding: "1rem 1.375rem", borderBottom: i < mockUpcoming.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", cursor: "pointer" }}>
                    <img src={b.img} alt="" style={{ width: 48, height: 48, borderRadius: 10, objectFit: "cover", flexShrink: 0, background: "#1a1a20" }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: ".9rem", fontWeight: 600, color: "#e8e4de", marginBottom: ".2rem", display: "flex", alignItems: "center", gap: ".5rem" }}>
                            {b.service} <StatusPill status={b.status} />
                        </div>
                        <div style={{ fontSize: ".8rem", color: "#9b9898", marginBottom: ".25rem" }}>{b.business}</div>
                        <div style={{ fontSize: ".78rem", color: "#5c5b60", display: "flex", gap: ".75rem" }}>
                            <span>{b.date}</span><span>{b.time}</span><span>{b.category}</span>
                        </div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div style={{ fontSize: ".9375rem", fontWeight: 700, color: "#c9a96e", marginBottom: ".375rem" }}>{b.price}</div>
                        <div style={{ display: "flex", gap: ".375rem" }}>
                            <button style={actionBtn("reschedule")}>Reschedule</button>
                            <button style={actionBtn("cancel")}>Cancel</button>
                        </div>
                    </div>
                </div>
            ))}

            {tab === "past" && mockPast.map((b, i) => (
                <div key={b.id} style={{ display: "flex", alignItems: "center", gap: "1.125rem", padding: "1rem 1.375rem", borderBottom: i < mockPast.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", cursor: "pointer" }}>
                    <img src={b.img} alt="" style={{ width: 48, height: 48, borderRadius: 10, objectFit: "cover", flexShrink: 0, background: "#1a1a20", opacity: .75 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: ".9rem", fontWeight: 600, color: "#e8e4de", marginBottom: ".2rem" }}>{b.service}</div>
                        <div style={{ fontSize: ".8rem", color: "#9b9898", marginBottom: ".25rem" }}>{b.business} · {b.date}</div>
                        <div style={{ color: "#c9a96e", fontSize: ".8rem", letterSpacing: 1 }}>{"★".repeat(b.rating)}{"☆".repeat(5 - b.rating)}</div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div style={{ fontSize: ".9375rem", fontWeight: 700, color: "#9b9898", marginBottom: ".375rem" }}>{b.price}</div>
                        <button style={actionBtn("rebook")}>Rebook</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

/* ─── Profile Header (Customer Only) ────────────────────── */
function ProfileHeader({ onBecomeSellerClick }: { onBecomeSellerClick: () => void }) {
    const badgeBase: React.CSSProperties = {
        display: "inline-flex", alignItems: "center", gap: 5,
        fontSize: ".72rem", fontWeight: 600, padding: "4px 10px",
        borderRadius: 20, letterSpacing: ".02em",
    };
    const dot = (color: string) => (
        <span style={{ width: 5, height: 5, borderRadius: "50%", background: color, opacity: .7, display: "inline-block" }} />
    );

    return (
        <div style={{ paddingTop: "3rem", borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: "2.5rem" }}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "2rem", paddingBottom: "2rem" }}>
                {/* Avatar */}
                <div style={{ position: "relative", flexShrink: 0 }}>
                    <img src={mockUser.avatar} alt={mockUser.name} style={{ width: 96, height: 96, borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(201,169,110,0.3)", display: "block" }} />
                    <button style={{ position: "absolute", bottom: 2, right: 2, width: 28, height: 28, borderRadius: "50%", background: "#1a1a20", border: "2px solid #0a0a0d", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#9b9898", fontSize: 13 }}
                        aria-label="Change photo">
                        ✎
                    </button>
                </div>

                {/* Identity */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "1.625rem", fontWeight: 600, letterSpacing: "-.03em", color: "#f0ede8", marginBottom: ".375rem" }}>
                        {mockUser.name}
                    </div>
                    <div style={{ color: "#9b9898", fontSize: ".9rem", marginBottom: ".75rem" }}>
                        {mockUser.email} · {mockUser.phone}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem", alignItems: "center" }}>
                        <span style={{ ...badgeBase, background: "rgba(94,196,176,0.12)", color: "#5ec4b0", border: "1px solid rgba(94,196,176,0.2)" }}>
                            {dot("#5ec4b0")} Verified
                        </span>
                        <span style={{ ...badgeBase, background: "rgba(255,255,255,0.05)", color: "#9b9898", border: "1px solid rgba(255,255,255,0.08)" }}>
                            Member since {mockUser.joinedDate}
                        </span>
                        <span style={{ ...badgeBase, background: "rgba(255,255,255,0.05)", color: "#9b9898", border: "1px solid rgba(255,255,255,0.08)" }}>
                            {mockUser.location}
                        </span>
                    </div>
                </div>

                {/* CTAs */}
                <div style={{ display: "flex", gap: ".625rem", alignItems: "center", flexShrink: 0, paddingBottom: ".25rem" }}>
                    <button onClick={onBecomeSellerClick} style={ghostBtn}>
                        Become a seller
                    </button>
                    <button style={primaryBtn}>Edit profile</button>
                </div>
            </div>
        </div>
    );
}

/* ─── Root Component ────────────────────────────────────── */
export function ProfilePage() {
   
    const navigate = useNavigate();

    return (
        <div className="bg-[#0a0a0d] min-h-full text-[#e8e4de]" style={{ fontFamily: "system-ui,-apple-system,sans-serif" }}>
            <style>{`
                * { box-sizing: border-box; }
                input:focus, select:focus { border-color: rgba(201,169,110,.4) !important; outline: none; }
                ::-webkit-scrollbar { width: 4px; }
                ::-webkit-scrollbar-track { background: transparent; }
                ::-webkit-scrollbar-thumb { background: rgba(255,255,255,.08); border-radius: 4px; }
                button { transition: all 0.2s ease; }
                button:hover { opacity: 0.85; }
            `}</style>

            <CustomerNavBar />

            <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 2rem 4rem" }}>
                <ProfileHeader onBecomeSellerClick={() => navigate("/create-business")} />

                {/* Customer Profile Sections - Only Personal Info, Notifications, Privacy, Bookings */}
                <PersonalInfoSection />

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                    <NotificationsSection />
                    <PrivacySection />
                </div>

                <BookingsSection />

                {/* Footer / Danger zone */}
                <div style={{ ...sectionCard, marginTop: "1rem" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.375rem" }}>
                        <span style={{ fontSize: ".78rem", color: "#3a3a40" }}>Member since {mockUser.joinedDate}</span>
                        <div style={{ display: "flex", gap: ".625rem" }}>
                            <button style={{ ...ghostBtn, color: "#5c5b60" }}>Delete account</button>
                            <button style={{ background: "none", border: "1px solid rgba(255,70,70,.2)", borderRadius: 9, padding: ".55rem 1.125rem", color: "#ff6b6b", fontSize: ".83rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                                Sign out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}