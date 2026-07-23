import { useEffect, useMemo, useState } from "react";
import {
    CalendarCheck, Users, BarChart3, ShieldCheck, Clock3,
    Sparkles, ArrowRight, Menu, X as XIcon, CheckCircle2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "./provider/UserContext";

/**
 * Daddy's Home — marketing landing page.
 *
 * Assumes the same design tokens already used across the app
 * (defined in your global stylesheet): --bg, --surface, --surface-2,
 * --surface-3, --border, --text-1, --text-2, --text-3, --gold,
 * --gold-light, --gold-dim, --teal, --teal-dim, --violet.
 *
 * The hero reuses the illustrated boat/water/father scene from
 * DaddysHomeLoader — trimmed down to live inline in a section
 * instead of as a fixed fullscreen overlay — so the very first
 * thing a visitor sees is the same character that greets them
 * while the app loads.
 */

interface Sparkle {
    id: number;
    top: number;
    left: number;
    size: number;
    duration: number;
    delay: number;
}

const features = [
    {
        icon: CalendarCheck,
        title: "Real-time availability",
        desc: "Customers see exactly when you're free and book straight into your calendar — no back-and-forth messages.",
    },
    {
        icon: Users,
        title: "Staff & roles",
        desc: "Add staff, assign services, and let each person manage their own schedule without stepping on anyone else's.",
    },
    {
        icon: ShieldCheck,
        title: "No double bookings",
        desc: "Two customers can never grab the same slot. Ever. It's enforced at the database, not just the UI.",
    },
    {
        icon: BarChart3,
        title: "Analytics that matter",
        desc: "Revenue, bookings, peak hours, and repeat customers — all in one dashboard, updated as it happens.",
    },
    {
        icon: Clock3,
        title: "Timezone-aware",
        desc: "Every booking, reminder, and report is shown in the right timezone for whoever's looking at it.",
    },
    {
        icon: Sparkles,
        title: "Built for multi-business",
        desc: "Run one location or ten from a single account, each with its own services, staff, and branding.",
    },
];

const steps = [
    {
        n: "01",
        title: "Set up your business",
        desc: "A short onboarding wizard gets your business, hours, and branding live in minutes.",
    },
    {
        n: "02",
        title: "Add services & availability",
        desc: "Name your services, set prices and duration, and pick the days and hours you're open for each one.",
    },
    {
        n: "03",
        title: "Let bookings come home",
        desc: "Share your booking page. Customers book themselves in, you keep track of everything in one place.",
    },
];

export function Landing() {
    const [navOpen, setNavOpen] = useState(false);
    const [heroIn, setHeroIn] = useState(false);
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    const user = useUser();

    useEffect(() => {

        if(!user) return;

        setLoggedIn(true);

    }, [user]);

    useEffect(() => {
        const existing = document.getElementById("daddys-home-loader-fonts");
        if (!existing) {
            const preconnect1 = document.createElement("link");
            preconnect1.rel = "preconnect";
            preconnect1.href = "https://fonts.googleapis.com";
            const preconnect2 = document.createElement("link");
            preconnect2.rel = "preconnect";
            preconnect2.href = "https://fonts.gstatic.com";
            preconnect2.crossOrigin = "anonymous";
            const stylesheet = document.createElement("link");
            stylesheet.id = "daddys-home-loader-fonts";
            stylesheet.rel = "stylesheet";
            stylesheet.href =
                "https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Quicksand:wght@400;500;600&display=swap";
            document.head.appendChild(preconnect1);
            document.head.appendChild(preconnect2);
            document.head.appendChild(stylesheet);
        }
        const t = requestAnimationFrame(() => setHeroIn(true));
        return () => cancelAnimationFrame(t);
    }, []);

    const sparkles = useMemo<Sparkle[]>(
        () =>
            Array.from({ length: 18 }, (_, i) => ({
                id: i,
                top: 58 + Math.random() * 34,
                left: Math.random() * 100,
                size: Math.random() * 1 + 0.35,
                duration: 2 + Math.random() * 3,
                delay: Math.random() * 5,
            })),
        []
    );

    const navigate = useNavigate();

    const goToApp = () => {

        if (user.user?.activeRole === "CUSTOMER") {
            navigate('/customer/home');
        } else {
            navigate('/business');
        }

    };

    return (
        <div className="bg-(--bg) min-h-screen">
            <style>{CSS}</style>

            {/* ---------------- NAV ---------------- */}
            <header className="sticky top-0 z-50 bg-(--bg)/90 backdrop-blur-sm border-b border-(--border)">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="dh-logo-mark">⛵</span>
                        <span className="text-(--text-1) font-semibold text-[15px] tracking-tight">
                            Daddy&apos;s Home
                        </span>
                    </div>

                    <nav className="hidden md:flex items-center gap-8 text-[13px] text-(--text-2)">
                        <a className="hover:text-(--text-1) transition-colors" href="#features">Features</a>
                        <a className="hover:text-(--text-1) transition-colors" href="#how-it-works">How it works</a>
                        <a className="hover:text-(--text-1) transition-colors" href="#pricing">Pricing</a>
                    </nav>

                    <div className="hidden md:flex items-center gap-3">
                        {loggedIn 
                            ?   <button
                                    className="px-4 py-2 bg-linear-to-br cursor-pointer from-(--gold) to-(--gold-light) rounded-lg text-[13px] font-medium text-(--bg) hover:shadow-lg hover:shadow-(--gold)/20 transition-all"
                                    onClick={goToApp}
                                >
                                    Go to app <ArrowRight size={14} className="inline ml-1" strokeWidth={2.5} />
                                </button>
                            : <>
                                    <Link
                                        className="px-4 py-2 text-[13px] font-medium text-(--text-2) hover:text-(--text-1) transition-colors"
                                        to={'login'}
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        className="px-4 py-2 bg-linear-to-br cursor-pointer from-(--gold) to-(--gold-light) rounded-lg text-[13px] font-medium text-(--bg) hover:shadow-lg hover:shadow-(--gold)/20 transition-all"
                                        to={'signup'}
                                    >
                                        Get started free
                                    </Link>
                                </>
                        }
                    </div>

                    <button
                        className="md:hidden text-(--text-1)"
                        onClick={() => setNavOpen((v) => !v)}
                        aria-label="Toggle menu"
                    >
                        {navOpen ? <XIcon size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                {navOpen && (
                    <div className="md:hidden border-t border-(--border) px-6 py-4 flex flex-col gap-4 text-[13px] text-(--text-2)">
                        <a href="#features" onClick={() => setNavOpen(false)}>Features</a>
                        <a href="#how-it-works" onClick={() => setNavOpen(false)}>How it works</a>
                        <a href="#pricing" onClick={() => setNavOpen(false)}>Pricing</a>
                        {loggedIn
                            ? <button
                                className="px-4 py-2 bg-linear-to-br cursor-pointer from-(--gold) to-(--gold-light) rounded-lg text-[13px] font-medium text-(--bg) hover:shadow-lg hover:shadow-(--gold)/20 transition-all"
                                onClick={goToApp}
                            >
                                Go to app <ArrowRight size={14} className="inline ml-1" strokeWidth={2.5} />
                            </button>
                            : <button className="mt-2 px-4 py-2.5 bg-linear-to-br from-(--gold) to-(--gold-light) rounded-lg text-[13px] font-medium text-(--bg) text-left">
                                Get started free
                            </button>
                        }
                    </div>
                )}
            </header>

            {/* ---------------- HERO ---------------- */}
            <section className="dh-hero">
                <div className="dh-hero-sky">
                    <div className="dh-hero-sunburst" />
                    <div className="dh-hero-glow" />
                </div>

                <div className="dh-hero-water">
                    <div className="dh-hero-sheen" />
                    <div className="dh-hero-wave">
                        <svg viewBox="0 0 800 40" preserveAspectRatio="none">
                            <path d="M0,20 Q50,0 100,20 T200,20 T300,20 T400,20 T500,20 T600,20 T700,20 T800,20 V0 H0 Z" fill="rgba(255,255,255,0.08)" />
                        </svg>
                        <svg viewBox="0 0 800 40" preserveAspectRatio="none">
                            <path d="M0,20 Q50,0 100,20 T200,20 T300,20 T400,20 T500,20 T600,20 T700,20 T800,20 V0 H0 Z" fill="rgba(255,255,255,0.08)" />
                        </svg>
                    </div>

                    <div className="dh-boat-wrap">
                        <svg viewBox="0 0 100 100" style={{ position: "absolute", top: "60%", left: "50%", width: "150%", transform: "translate(-50%, -50%)" }}>
                            <circle className="dh-ripple dh-r1" cx={50} cy={50} r={14} />
                            <circle className="dh-ripple dh-r2" cx={50} cy={50} r={14} />
                        </svg>
                        <div className="dh-bob-group">
                            <svg viewBox="0 0 200 200" width="100%" height="100%">
                                <defs>
                                    <linearGradient id="dhHullGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#3fcfc0" />
                                        <stop offset="100%" stopColor="#075a70" />
                                    </linearGradient>
                                </defs>
                                <path d="M30 132 Q100 168 170 132 L158 112 Q100 128 42 112 Z" fill="#5e3720" />
                                <path d="M34 128 Q100 158 166 128 L156 110 Q100 124 44 110 Z" fill="#96633a" />
                                <path d="M30 132 Q100 148 170 132 Q100 168 30 132 Z" fill="url(#dhHullGrad)" opacity={0.6} />
                                <g transform="translate(100,72)">
                                    <g className="dh-torso-breathe">
                                        <path d="M-22 8 Q-26 46 -18 58 L18 58 Q26 46 22 8 Q0 -4 -22 8Z" fill="#c2543b" />
                                    </g>
                                    <circle cx={0} cy={-14} r={16} fill="#e7b184" />
                                    <path d="M-7 -8 Q0 -2 7 -8" stroke="#7a4a30" strokeWidth={1.8} fill="none" strokeLinecap="round" />
                                    <circle cx={-6} cy={-16} r={1.6} fill="#3a2416" />
                                    <circle cx={6} cy={-16} r={1.6} fill="#3a2416" />
                                    <g className="dh-hat-sway">
                                        <ellipse cx={0} cy={-27} rx={19} ry={4.4} fill="#bd9950" />
                                        <path d="M-11 -27 Q0 -46 11 -27 Q0 -32 -11 -27Z" fill="#e8c583" />
                                    </g>
                                    <path d="M-20 20 Q-34 30 -30 44" stroke="#c2543b" strokeWidth={9} strokeLinecap="round" fill="none" />
                                    <circle cx={-30} cy={44} r={5} fill="#e7b184" />
                                    <g className="dh-arm-group">
                                        <path d="M18 20 Q34 26 40 40" stroke="#c2543b" strokeWidth={10} strokeLinecap="round" fill="none" />
                                    </g>
                                    <g className="dh-paddle-group">
                                        <circle cx={40} cy={40} r={5.4} fill="#e7b184" />
                                        <rect x={38} y={6} width={4.4} height={70} rx={2.2} fill="#c69361" />
                                        <ellipse cx={40} cy={4} rx={9} ry={14} fill="#96633a" />
                                    </g>
                                </g>
                            </svg>
                        </div>
                    </div>

                    <div className="dh-sparkles">
                        {sparkles.map((s) => (
                            <div
                                key={s.id}
                                className="dh-spark"
                                style={{
                                    width: `${s.size}vmin`,
                                    height: `${s.size}vmin`,
                                    top: `${s.top}%`,
                                    left: `${s.left}%`,
                                    animationDuration: `${s.duration}s`,
                                    animationDelay: `${s.delay}s`,
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div className="dh-hero-vignette" />

                <div className={`dh-hero-copy ${heroIn ? "dh-in" : ""}`}>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-(--gold-dim) border border-(--gold-light) text-(--gold) text-[12px] font-medium mb-5">
                        <Sparkles size={13} /> Now welcoming new businesses
                    </div>
                    <h1 className="dh-hero-title">Every booking,<br />welcomed home.</h1>
                    <p className="dh-hero-sub">
                        Daddy&apos;s Home is the booking platform for service businesses —
                        schedule staff, manage availability, and never double-book again.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
                        {loggedIn 
                            ?   <button
                                    className="dh-btn-primary"
                                    onClick={goToApp}
                                >
                                    Go to app <ArrowRight size={14} className="inline ml-1" strokeWidth={2.5} />
                                </button>
                            :   <button className="dh-btn-primary">
                                    Get started free <ArrowRight size={16} strokeWidth={2.5} />
                                </button>
                        }
                        <a href="#how-it-works" className="dh-btn-ghost">
                            See how it works
                        </a>
                    </div>
                </div>
            </section>

            {/* ---------------- FEATURES ---------------- */}
            <section id="features" className="max-w-6xl mx-auto px-6 py-24">
                <div className="text-center max-w-xl mx-auto mb-14">
                    <p className="text-(--gold) text-[12px] font-semibold tracking-wide uppercase mb-3">Features</p>
                    <h2 className="text-(--text-1) text-[28px] md:text-[34px] font-semibold tracking-tight">
                        Everything a service business needs, nothing it doesn&apos;t
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {features.map((f) => (
                        <div
                            key={f.title}
                            className="bg-(--surface) border border-(--border) rounded-2xl p-6 hover:border-(--gold-light) transition-colors"
                        >
                            <div className="w-10 h-10 rounded-lg bg-(--teal-dim) flex items-center justify-center mb-4">
                                <f.icon size={18} className="text-(--teal)" />
                            </div>
                            <h3 className="text-(--text-1) text-[15px] font-medium mb-2">{f.title}</h3>
                            <p className="text-(--text-2) text-[13px] leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ---------------- HOW IT WORKS ---------------- */}
            <section id="how-it-works" className="bg-(--surface-2)/30 border-y border-(--border)">
                <div className="max-w-6xl mx-auto px-6 py-24">
                    <div className="text-center max-w-xl mx-auto mb-14">
                        <p className="text-(--gold) text-[12px] font-semibold tracking-wide uppercase mb-3">How it works</p>
                        <h2 className="text-(--text-1) text-[28px] md:text-[34px] font-semibold tracking-tight">
                            Live in three steps
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {steps.map((s) => (
                            <div key={s.n} className="relative">
                                <div className="text-(--gold-light)/40 text-[42px] font-bold leading-none mb-3 font-[Baloo_2]">
                                    {s.n}
                                </div>
                                <h3 className="text-(--text-1) text-[16px] font-medium mb-2">{s.title}</h3>
                                <p className="text-(--text-2) text-[13px] leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------------- PRICING TEASER ---------------- */}
            <section id="pricing" className="max-w-6xl mx-auto px-6 py-24">
                <div className="bg-(--surface) border border-(--border) rounded-3xl p-10 md:p-14 text-center">
                    <p className="text-(--gold) text-[12px] font-semibold tracking-wide uppercase mb-3">Pricing</p>
                    <h2 className="text-(--text-1) text-[26px] md:text-[30px] font-semibold tracking-tight mb-4">
                        Start free. Grow when you&apos;re ready.
                    </h2>
                    <p className="text-(--text-2) text-[13px] max-w-md mx-auto mb-8">
                        One business, unlimited bookings, no credit card required to start.
                    </p>
                    <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-(--text-2) text-[13px] mb-8">
                        {["Unlimited services", "Staff scheduling", "Analytics dashboard", "Email support"].map((i) => (
                            <li key={i} className="flex items-center gap-2">
                                <CheckCircle2 size={14} className="text-(--teal)" /> {i}
                            </li>
                        ))}
                    </ul>
                    {loggedIn
                        ? <button
                            className="dh-btn-primary"
                            onClick={goToApp}
                        >
                            Go to app <ArrowRight size={14} className="inline ml-1" strokeWidth={2.5} />
                        </button>
                        : <button className="dh-btn-primary">
                            Get started free <ArrowRight size={16} strokeWidth={2.5} />
                        </button>
                    }
                </div>
            </section>

            {/* ---------------- FOOTER ---------------- */}
            <footer className="border-t border-(--border)">
                <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <span className="dh-logo-mark text-[16px]">⛵</span>
                        <span className="text-(--text-1) text-[13px] font-medium">Daddy&apos;s Home</span>
                    </div>
                    <p className="text-(--text-2) text-[12px]">© {new Date().getFullYear()} Daddy&apos;s Home. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

const CSS = `
  .dh-logo-mark{ display:inline-block; transform: rotate(-8deg); }

  .dh-hero{
    position:relative; overflow:hidden;
    height:min(88vh, 760px);
    min-height:520px;
  }
  .dh-hero-sky{ position:absolute; inset:0; background: linear-gradient(180deg, #ffe3ae 0%, #ffd9a8 38%, #bdeee7 68%, #3fcfc0 100%); }
  .dh-hero-sunburst{
    position:absolute; top:10%; left:50%; width:120vmax; height:120vmax; transform:translate(-50%,-50%);
    background: conic-gradient(from 0deg, rgba(255,230,168,0.14) 0deg, rgba(255,230,168,0) 20deg,
      rgba(255,230,168,0.14) 40deg, rgba(255,230,168,0) 60deg, rgba(255,230,168,0.14) 80deg,
      rgba(255,230,168,0) 100deg, rgba(255,230,168,0.14) 120deg, rgba(255,230,168,0) 140deg,
      rgba(255,230,168,0.14) 160deg, rgba(255,230,168,0) 180deg, rgba(255,230,168,0.14) 200deg,
      rgba(255,230,168,0) 220deg, rgba(255,230,168,0.14) 240deg, rgba(255,230,168,0) 260deg,
      rgba(255,230,168,0.14) 280deg, rgba(255,230,168,0) 300deg, rgba(255,230,168,0.14) 320deg,
      rgba(255,230,168,0) 340deg, rgba(255,230,168,0.14) 360deg);
    mix-blend-mode:screen; opacity:0.7; animation: dh-rayRotate 100s linear infinite;
  }
  @keyframes dh-rayRotate{ to{ transform:translate(-50%,-50%) rotate(360deg); } }
  .dh-hero-glow{
    position:absolute; top:10%; left:50%; width:30vmin; height:30vmin; transform:translate(-50%,-50%);
    background: radial-gradient(circle, rgba(255,236,190,0.9) 0%, rgba(255,222,150,0.45) 32%, rgba(255,222,150,0) 70%);
    filter:blur(2px); animation: dh-sunPulse 6s ease-in-out infinite;
  }
  @keyframes dh-sunPulse{ 0%,100%{opacity:0.85;} 50%{opacity:1;} }

  .dh-hero-water{ position:absolute; left:0; right:0; bottom:0; top:56%; overflow:hidden;
    background: linear-gradient(180deg, #3fcfc0 0%, #0e93a6 45%, #075a70 100%); }
  .dh-hero-sheen{
    position:absolute; inset:0;
    background: repeating-linear-gradient(115deg, rgba(255,255,255,0.09) 0 2px, rgba(255,255,255,0) 2px 46px);
    background-size:220% 220%; animation: dh-sheenMove 14s linear infinite; mix-blend-mode:screen; opacity:0.7;
  }
  @keyframes dh-sheenMove{ from{ background-position:0 0; } to{ background-position:-600px 300px; } }
  .dh-hero-wave{ position:absolute; top:-2vmin; left:0; width:220%; height:6vmin; animation: dh-waveScroll 18s linear infinite; }
  .dh-hero-wave svg{ width:50%; height:100%; float:left; }
  @keyframes dh-waveScroll{ from{ transform:translateX(0); } to{ transform:translateX(-50%); } }

  .dh-sparkles{ position:absolute; inset:0; pointer-events:none; }
  .dh-spark{
    position:absolute; border-radius:50%;
    background: radial-gradient(circle, #fff 0%, rgba(255,255,255,0) 70%);
    animation-name: dh-twinkle; animation-timing-function: ease-in-out; animation-iteration-count: infinite;
  }
  @keyframes dh-twinkle{ 0%,100%{ opacity:0; transform:scale(0.4);} 50%{ opacity:0.85; transform:scale(1);} }

  .dh-boat-wrap{
    position:absolute; top:60%; left:50%; width:22vmin; height:22vmin; transform:translate(-50%,-50%);
    filter: drop-shadow(0 1.2vmin 1.4vmin rgba(10,40,45,0.35));
  }
  .dh-bob-group{ width:100%; height:100%; animation: dh-boatBob 4.2s cubic-bezier(.45,.05,.55,.95) infinite; transform-origin:50% 60%; }
  @keyframes dh-boatBob{
    0%{ transform: translateY(0) rotate(-1.4deg); }
    25%{ transform: translateY(-1.1vmin) rotate(0.6deg); }
    50%{ transform: translateY(0.3vmin) rotate(1.6deg); }
    75%{ transform: translateY(-0.8vmin) rotate(-0.4deg); }
    100%{ transform: translateY(0) rotate(-1.4deg); }
  }
  .dh-paddle-group{ transform-origin: 63% 46%; animation: dh-paddleStroke 5s ease-in-out infinite; }
  @keyframes dh-paddleStroke{
    0%,72%{ transform: rotate(-6deg); } 80%{ transform: rotate(20deg); }
    88%{ transform: rotate(34deg); } 94%{ transform: rotate(6deg); } 100%{ transform: rotate(-6deg); }
  }
  .dh-arm-group{ transform-origin: 60% 47%; animation: dh-armStroke 5s ease-in-out infinite; }
  @keyframes dh-armStroke{
    0%,72%{ transform: rotate(-4deg); } 80%{ transform: rotate(10deg); }
    88%{ transform: rotate(16deg); } 94%{ transform: rotate(2deg); } 100%{ transform: rotate(-4deg); }
  }
  .dh-torso-breathe{ animation: dh-breathe 3.6s ease-in-out infinite; transform-origin:50% 100%; }
  @keyframes dh-breathe{ 0%,100%{ transform:scaleY(1);} 50%{ transform:scaleY(1.025);} }
  .dh-hat-sway{ animation: dh-hatSway 3.2s ease-in-out infinite; transform-origin:50% 90%; }
  @keyframes dh-hatSway{ 0%,100%{ transform:rotate(-2deg);} 50%{ transform:rotate(2.5deg);} }

  .dh-ripple{ fill:none; stroke:rgba(255,255,255,0.5); stroke-width:2.2; transform-origin:50% 50%; animation: dh-rippleOut 5s ease-out infinite; opacity:0; }
  .dh-ripple.dh-r2{ animation-delay:0.28s; }
  @keyframes dh-rippleOut{ 0%,78%{ transform:scale(0.15); opacity:0; } 82%{ opacity:0.6; } 100%{ transform:scale(2.6); opacity:0; } }

  .dh-hero-vignette{ position:absolute; inset:0; pointer-events:none; background: radial-gradient(ellipse at 50% 55%, rgba(0,0,0,0) 45%, rgba(6,20,25,0.32) 100%); }

  .dh-hero-copy{
    position:relative; z-index:2; height:100%;
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    text-align:center; padding:0 1.5rem;
    opacity:0; transform: translateY(10px);
    transition: opacity 1s ease-out, transform 1s ease-out;
  }
  .dh-hero-copy.dh-in{ opacity:1; transform:translateY(0); }
  .dh-hero-title{
    font-family:'Baloo 2', cursive; font-weight:700; color:#fff8ec;
    font-size:clamp(2.4rem, 6vw, 4.2rem); line-height:1.05; letter-spacing:0.5px;
    text-shadow: 0 0.3vmin 0 rgba(147,63,44,0.3), 0 1.2vmin 2vmin rgba(20,20,20,0.28);
  }
  .dh-hero-sub{
    margin-top:1.1rem; font-family:'Quicksand', sans-serif; font-weight:500;
    font-size:clamp(0.95rem, 2vw, 1.15rem); color:#fff8ec; opacity:0.95; max-width:34rem;
    text-shadow: 0 0.2vmin 1vmin rgba(0,0,0,0.3);
  }

  .dh-btn-primary{
    display:inline-flex; align-items:center; gap:0.5rem;
    padding:0.85rem 1.6rem; border-radius:999px; border:none; cursor:pointer;
    background: linear-gradient(135deg, #c9a87c, #b89c7e); color:#0a0a0c;
    font-family:'Quicksand', sans-serif; font-weight:700; font-size:0.9rem;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }
  .dh-btn-primary:hover{ transform: translateY(-1px); box-shadow: 0 0.6vmin 1.4vmin rgba(201,168,124,0.35); }
  .dh-btn-ghost{
    display:inline-flex; align-items:center; gap:0.5rem;
    padding:0.85rem 1.6rem; border-radius:999px; border:1px solid rgba(255,248,236,0.5);
    color:#fff8ec; font-family:'Quicksand', sans-serif; font-weight:600; font-size:0.9rem;
    backdrop-filter: blur(4px); transition: background 0.15s ease;
  }
  .dh-btn-ghost:hover{ background: rgba(255,248,236,0.12); }

  @media (prefers-reduced-motion: reduce){
    .dh-hero *{ animation-duration:0.001ms !important; animation-iteration-count:1 !important; transition-duration:0.001ms !important; }
  }
`;