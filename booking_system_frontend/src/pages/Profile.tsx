import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckIcon, CircleUser, ArrowBigLeftDash } from "lucide-react";
import { useUser } from "../provider/UserContext";
import { PostFormData, update } from "../api/api";
import { API_URL } from "../api/config";

const mockUser = {
    name: "Juan dela Cruz",
    email: "juan@email.com",
    avatar: "https://i.pravatar.cc/150?img=11",
    joinedDate: "March 2025",
    location: "BGC, Taguig",
    phone: "+63 912 345 6789",
};

function SectionHeader({
    title, action, onAction,
}: Readonly<{ title: string; action?: string; onAction?: () => void }>) {
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


function PersonalInfoSection() {

    const user = useUser()?.user;

    return (
        <div style={sectionCard}>
            <SectionHeader title="Personal information" action="Edit" />
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-0.5 bg-[rgba(255,255,255,0.05)]">
                {[
                    { label: "Full name", value: user?.firstName + " " + user?.lastName },
                    { label: "Phone", value: mockUser.phone },
                    { label: "Email", value: user?.email },
                    { label: "Location", value: user?.addres },
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

/* ─── Profile Header (Customer Only) ────────────────────── */
function ProfileHeader({ onBecomeSellerClick }: { onBecomeSellerClick: () => void }) {

    const user = useUser()?.user;
    const setUser = useUser()?.setUser;

    interface UpdateProfileSuccess {
        open: boolean;
        closeIn: number
    };

    const [closeOpen, setCloseOpen] = useState(false);
    const [profilePic, setProfilePic] = useState<File | null>(null);
    const [showPreview, setShowPreview] = useState(false);
    const [saving, setSaving] = useState(false);
    const [updateProfileSuccess, setUpdateProfileSuccess] = useState<UpdateProfileSuccess>({open: false, closeIn: 3});

    const handleCloseOpen = () => {
        setCloseOpen(cp => cp ? false : true);
    };

    const handleProfilePicChange = (e: any) => {
        const file = e.target.files[0];
        setProfilePic(file);
        setShowPreview(true);
    };

    const saveProfilePicChange = async (e: any) => {
        e.stopPropagation();

        if(!profilePic) return;

        setSaving(true);

        const formData = new FormData();
        formData.append('file', profilePic);

        const url = `${API_URL}/api/user/profile`;

        const result = await PostFormData(url, formData);

        if(result.status === 201) {
            setUser?.(prev => ({...prev!,  profilePic: result.message }));
            setTimeout(() => {
                setSaving(false);
                setShowPreview(false);
                showUpdateProfileSuccess();
            }, 2000);
        }

    };

    const showUpdateProfileSuccess = () => {
        setUpdateProfileSuccess(prev => ({...prev, open: true}));

        const interval = setInterval(() => {
            setUpdateProfileSuccess(prev => ({ ...prev, closeIn: prev.closeIn - 1 }));
        }, 1000);

        setTimeout(() => {
            setUpdateProfileSuccess({ open: false, closeIn: 3});
            clearInterval(interval);
        }, 3000);
    };

    const switchToBusiness = async () => {

        const url = `${API_URL}/api/user/business`;
        const body = null;

        const result = await update(url, body);

        if(result.status === 200) {
            setUser?.(prev => ({ ...prev!, activeRole: "BUSINESS_OWNER" }));
        }
    };

    return (
        <div className="pt-12 border-b border-b-[rgba(225,225,225,0.06)] mb-10">
            <div className="flex flex-col items-center lg:flex-row lg:items-end gap-8 pb-8">
                <div className="relative shrink-0">
                    {user?.profilePic === null ? <CircleUser className="w-24 h-24 rounded-[50%] object-contain border-2 border-[rgba(201,169,110,0.3)] block" /> : <img src={user?.profilePic} alt={mockUser.name} style={{ width: 96, height: 96, borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(201,169,110,0.3)", display: "block" }} />}
                    <button 
                        className="absolute items-center justify-center cursor-pointer text-[#9b9898] text-[13px] bottom-0.5 right-0.5 w-7 h-7 rounded-[50%] bg-[#1a1a20] border-2 border-[#0a0a0d] flex"
                        aria-label="Change photo"
                        onClick={handleCloseOpen}
                    >
                        ✎
                    </button>
                    {closeOpen && <div className="absolute top-[105%] left-[60%] z-50 bg-[#18181f] border border-white/10 rounded-xl p-1.5 w-48">
                        <div className="absolute -top-1.5 left-4 w-3 h-3 bg-[#18181f] border-l border-t border-white/10 rotate-45" />

                        <label htmlFor="profile_file_input" className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-[#e8e4de] text-sm hover:bg-white/5">
                            <i className="ti ti-upload text-[#c9a96e] text-base" />
                            Upload photo
                        </label>
                        
                        <input onChange={handleProfilePicChange} type="file" hidden id="profile_file_input" />

                        <button className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-[#e8e4de] text-sm hover:bg-white/5">
                            <i className="ti ti-camera text-[#9b9898] text-base" />
                            Take photo
                        </button>

                        <div className="h-px bg-white/[0.07] my-1 mx-1" />

                        <button className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-[#ff6b6b] text-sm hover:bg-red-500/5">
                            <i className="ti ti-trash text-base" />
                            Remove photo
                        </button>
                    </div>}
                </div>

                {/* Identity */}
                <div className="flex-1 min-w-0">
                    <div className="text-[1.625rem] lg:text-start font-semibold tracking-wide text-center text-[#f0ede8] mb-1.5">
                        {user?.firstName + " " + user?.lastName}
                    </div>
                    <div className="text-center lg:text-start text-[#9b9898] text-[0.9rem] mb-3">
                        {user?.email} · {user?.phone}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem", alignItems: "center" }}>
                        <span className="inline-flex items-center gap-1.25 text-[0.72rem] font-semibold py-1 px-2.5 rounded-[20px] tracking-[0.02rem] bg-[rgba(255,255,255,0.05)] text-[#9b9898] border border-[rgba(255,255,255,0.08)]">
                            Member since {mockUser.joinedDate}
                        </span>
                        <span className="inline-flex items-center gap-1.25 text-[0.72rem] font-semibold py-1 px-2.5 rounded-[20px] tracking-[0.02rem] bg-[rgba(255,255,255,0.05)] text-[#9b9898] border border-[rgba(255,255,255,0.08)]">
                            {mockUser.location}
                        </span>
                    </div>
                </div>

                <div className="flex gap-2.5 items-center shrink-0 mb-1">
                    {!user?.roles.includes("BUSINESS_OWNER") 
                    ? <button onClick={onBecomeSellerClick} style={ghostBtn}>
                        Create some business
                    </button> 
                        : <button 
                            className="border border-[rgba(255,255,255,0.09)] flex py-2 px-4 gap-1 items-center rounded-2xl cursor-pointer text-sm"
                            onClick={switchToBusiness}
                        >
                        <ArrowBigLeftDash></ArrowBigLeftDash> Switch to business
                    </button>}
                    <button className="btn-primary py-2 px-4 rounded-sm border border-(--border)">Edit profile</button>
                </div>
            </div>

            {showPreview && <div
                className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
                onClick={() => setShowPreview(false)} 
            >
                <div className="bg-[#111115] border border-white/[0.08] rounded-2xl p-7 w-80 flex flex-col items-center gap-4">

                    <div className="relative">
                        <img
                            src={profilePic === null ? undefined : URL.createObjectURL(profilePic)}
                            className="w-24 h-24 rounded-full object-cover border-[2.5px] border-[#c9a96e]"
                        />
                        <div className="absolute inset-[-4px] rounded-full border border-dashed border-[#c9a96e]/40" />
                    </div>

                    <div className="text-center">
                        <p className="text-[#e8e4de] font-semibold text-base mb-1">Preview new photo</p>
                        <p className="text-[#5c5b60] text-sm">Looks good? Go ahead and save it.</p>
                    </div>

                    <div className="flex gap-3 w-full">
                        <button className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-[#5c5b60] bg-transparent border border-white/10">
                            Cancel
                        </button>
                        <button 
                            className="flex-1 py-2.5 rounded-xl text-sm font-bold text-[#0a0a0d] bg-linear-to-br from-[#e8c98a] to-[#c9a96e] border-none"
                            onClick={saveProfilePicChange}
                        >
                            Save photo
                        </button>
                    </div>
                </div>
            </div>}
            
            {/* saving state */}
            {saving && <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
                <div className="bg-[#111115] border border-white/[0.08] rounded-2xl p-7 w-80 flex flex-col items-center gap-4">

                    <div className="relative w-24 h-24">
                        <img
                            src={profilePic === null ? undefined : URL.createObjectURL(profilePic)}
                            className="w-24 h-24 rounded-full object-cover opacity-30"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-8 h-8 rounded-full border-[2.5px] border-[#c9a96e]/20 border-t-[#c9a96e] animate-spin" />
                        </div>
                    </div>

                    <div className="text-center">
                        <p className="text-[#e8e4de] font-semibold text-base mb-1">Uploading…</p>
                        <p className="text-[#5c5b60] text-sm">Just a moment</p>
                    </div>

                    <div className="w-full h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
                        <div className="h-full w-2/3 bg-gradient-to-r from-[#e8c98a] to-[#c9a96e] rounded-full" />
                    </div>
                </div>
            </div>}

            {updateProfileSuccess.open && <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
                <div className="bg-[#111115] border border-white/8 rounded-2xl p-7 w-80 flex flex-col items-center gap-4">

                    <div className="relative">
                        <img
                            src="https://i.pravatar.cc/150?img=32"
                            className="w-24 h-24 rounded-full object-cover border-[2.5px] border-[#5ec4b0]/50"
                        />
                        <div className="absolute bottom-0.5 right-0.5 w-6 h-6 rounded-full bg-[#5ec4b0] border-2 border-[#0a0a0d] flex items-center justify-center">
                            <i className="ti ti-check text-[#0a0a0d] text-xs" />
                        </div>
                    </div>

                    <div className="text-center">
                        <p className="text-[#e8e4de] font-semibold text-base mb-1">Photo saved!</p>
                        <p className="text-[#5c5b60] text-sm">Your profile photo has been updated.</p>
                    </div>

                    <div className="w-full flex justify-center gap-2 bg-[#5ec4b0]/10 border border-[#5ec4b0]/20 rounded-lg py-2 text-center text-[#5ec4b0] text-sm font-medium">
                        <p>Successful one!</p>
                        <CheckIcon></CheckIcon>
                    </div>

                    <p>Close in {updateProfileSuccess.closeIn} super seconds</p>

                    <button className="w-full py-2.5 rounded-xl text-sm font-bold text-[#0a0a0d] bg-gradient-to-br from-[#e8c98a] to-[#c9a96e] border-none">
                        Close now!!
                    </button>
                </div>
            </div>}
        </div>
    );
}

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

            <div className="max-w-225 mx-auto pb-16 px-8">
                <ProfileHeader onBecomeSellerClick={() => navigate("/create-business")} />

                <PersonalInfoSection />

                <div className="grid grid-cols-1 gap-4 mb-4">
                    <NotificationsSection />
                    <PrivacySection />
                </div>

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