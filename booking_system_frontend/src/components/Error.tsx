import React, { useEffect, useMemo, useState } from "react";
import { Check, X as XIcon, RotateCcw, ArrowRight, Copy, Edit3 } from "lucide-react";

interface DaddysHomeStatusProps {
    type: "success" | "error" | "conflict";
    /** Big headline. Defaults are provided per type. */
    title?: string;
    /** Supporting line beneath the title. */
    message?: string;
    /** Primary action — e.g. "Continue" on success, "Try again" on error. */
    onPrimaryAction?: () => void;
    primaryLabel?: string;
    /** Optional dismiss without action (e.g. click backdrop / close icon). */
    onDismiss?: () => void;
}

interface Particle {
    id: number;
    top: number;
    left: number;
    size: number;
    duration: number;
    delay: number;
    drift: number;
}

const DaddysHomeStatus: React.FC<DaddysHomeStatusProps> = ({
    type,
    title,
    message,
    onPrimaryAction,
    primaryLabel,
    onDismiss,
}) => {
    const isSuccess = type === "success";
    const isConflict = type === "conflict";

    useEffect(() => {
        const existing = document.getElementById("daddys-home-loader-fonts");
        if (existing) return;
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
    }, []);

    // Confetti (success), rain (error), or slow amber fireflies (conflict)
    const particles = useMemo<Particle[]>(() => {
        const count = isSuccess ? 22 : isConflict ? 14 : 34;
        return Array.from({ length: count }, (_, i) => ({
            id: i,
            top: isConflict ? 10 + Math.random() * 55 : -10 - Math.random() * 30,
            left: Math.random() * 100,
            size: isSuccess ? Math.random() * 0.9 + 0.5 : isConflict ? Math.random() * 0.5 + 0.3 : Math.random() * 0.35 + 0.15,
            duration: isSuccess ? 4 + Math.random() * 3 : isConflict ? 3 + Math.random() * 2.5 : 0.6 + Math.random() * 0.5,
            delay: Math.random() * 4,
            drift: (Math.random() - 0.5) * 40,
        }));
    }, [isSuccess, isConflict]);

    const confettiColors = ["#f5c36b", "#ffe6a8", "#3fcfc0", "#c2543b", "#eafffb"];

    const [mounted, setMounted] = useState(false);
    const [badgeIn, setBadgeIn] = useState(false);
    useEffect(() => {
        const t1 = requestAnimationFrame(() => setMounted(true));
        const t2 = setTimeout(() => setBadgeIn(true), 260);
        return () => {
            cancelAnimationFrame(t1);
            clearTimeout(t2);
        };
    }, []);

    const headline =
        title ?? (isSuccess ? "Made it home!" : isConflict ? "Someone's already here" : "Couldn't make it home");
    const sub =
        message ??
        (isSuccess
            ? "Everything saved safely."
            : isConflict
                ? "A service with this name already exists. Give this one a different name."
                : "Something went wrong along the way. Give it another go.");
    const actionLabel = primaryLabel ?? (isSuccess ? "Continue" : isConflict ? "Rename service" : "Try again");
    const themeClass = isSuccess ? "dhs-success" : isConflict ? "dhs-conflict" : "dhs-error";

    return (
        <div
            className={`dhs-scene ${themeClass}`}
            role="status"
            aria-live="assertive"
            aria-label={headline}
        >
            <style>{CSS}</style>

            {onDismiss && (
                <button className="dhs-close" onClick={onDismiss} aria-label="Dismiss">
                    <XIcon size={16} strokeWidth={2.5} />
                </button>
            )}

            <div className="dhs-sky">
                <div className="dhs-sunburst" />
                <div className="dhs-glow" />
                <div className="dhs-cloud dhs-c1" />
                <div className="dhs-cloud dhs-c2" />
                {!isSuccess && !isConflict && <div className="dhs-lightning" />}
            </div>

            <div className="dhs-water">
                <div className="dhs-water-sheen" />
                <div className="dhs-wave-edge">
                    <svg viewBox="0 0 800 40" preserveAspectRatio="none">
                        <path
                            d="M0,20 Q50,0 100,20 T200,20 T300,20 T400,20 T500,20 T600,20 T700,20 T800,20 V0 H0 Z"
                            fill="rgba(255,255,255,0.14)"
                        />
                    </svg>
                    <svg viewBox="0 0 800 40" preserveAspectRatio="none">
                        <path
                            d="M0,20 Q50,0 100,20 T200,20 T300,20 T400,20 T500,20 T600,20 T700,20 T800,20 V0 H0 Z"
                            fill="rgba(255,255,255,0.14)"
                        />
                    </svg>
                </div>

                {(isSuccess || isConflict) && (
                    <svg className="dhs-dock" viewBox="0 0 220 60" preserveAspectRatio="xMidYMax meet">
                        <rect x="10" y="18" width="8" height="34" fill="#5e3720" />
                        <rect x="200" y="18" width="8" height="34" fill="#5e3720" />
                        <rect x="0" y="10" width="220" height="10" rx="2" fill="#96633a" />
                        <rect x="0" y="10" width="220" height="3.5" fill="#c69361" opacity="0.6" />
                    </svg>
                )}

                {isConflict && (
                    <div className="dhs-echo-wrap">
                        <div className="dhs-echo-ring" />
                        <svg viewBox="0 0 200 200" width="100%" height="100%">
                            <path d="M30 132 Q100 168 170 132 L158 112 Q100 128 42 112 Z" fill="var(--dhs-wood-dark)" />
                            <path d="M34 128 Q100 158 166 128 L156 110 Q100 124 44 110 Z" fill="var(--dhs-wood)" />
                            <g transform="translate(100,72)">
                                <path d="M-22 8 Q-26 46 -18 58 L18 58 Q26 46 22 8 Q0 -4 -22 8Z" fill="var(--dhs-shirt)" />
                                <circle cx={0} cy={-14} r={16} fill="var(--dhs-skin)" />
                                <ellipse cx={0} cy={-27} rx={19} ry={4.4} fill="var(--dhs-hat-dark)" />
                                <path d="M-11 -27 Q0 -46 11 -27 Q0 -32 -11 -27Z" fill="var(--dhs-hat)" />
                            </g>
                        </svg>
                    </div>
                )}

                {/* boat + father, same silhouette family as the loader */}
                <div className="dhs-boat-wrap">
                    <svg
                        viewBox="0 0 100 100"
                        style={{ position: "absolute", top: "60%", left: "50%", width: "150%", transform: "translate(-50%, -50%)" }}
                    >
                        <circle className="dhs-ripple dhs-r1" cx={50} cy={50} r={14} />
                        <circle className="dhs-ripple dhs-r2" cx={50} cy={50} r={14} />
                    </svg>

                    <div className="dhs-bob-group">
                        <svg viewBox="0 0 200 200" width="100%" height="100%">
                            <defs>
                                <linearGradient id="dhsHullWaterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="var(--dhs-water-bright)" />
                                    <stop offset="100%" stopColor="var(--dhs-water-deep)" />
                                </linearGradient>
                            </defs>

                            <path d="M30 132 Q100 168 170 132 L158 112 Q100 128 42 112 Z" fill="var(--dhs-wood-dark)" />
                            <path d="M34 128 Q100 158 166 128 L156 110 Q100 124 44 110 Z" fill="var(--dhs-wood)" />
                            <path d="M30 132 Q100 148 170 132 Q100 168 30 132 Z" fill="url(#dhsHullWaterGrad)" opacity={0.62} />

                            <g transform="translate(100,72)">
                                <g className="dhs-torso-breathe">
                                    <path d="M-22 8 Q-26 46 -18 58 L18 58 Q26 46 22 8 Q0 -4 -22 8Z" fill="var(--dhs-shirt)" />
                                </g>
                                <circle cx={0} cy={-14} r={16} fill="var(--dhs-skin)" />
                                <path d="M-7 -8 Q0 -2 7 -8" stroke="#7a4a30" strokeWidth={1.8} fill="none" strokeLinecap="round" />
                                <circle cx={-6} cy={-16} r={1.6} fill="#3a2416" />
                                <circle cx={6} cy={-16} r={1.6} fill="#3a2416" />
                                <g className="dhs-hat-sway">
                                    <ellipse cx={0} cy={-27} rx={19} ry={4.4} fill="var(--dhs-hat-dark)" />
                                    <path d="M-11 -27 Q0 -46 11 -27 Q0 -32 -11 -27Z" fill="var(--dhs-hat)" />
                                </g>
                                <path d="M-20 20 Q-34 30 -30 44" stroke="var(--dhs-shirt)" strokeWidth={9} strokeLinecap="round" fill="none" />
                                <circle cx={-30} cy={44} r={5} fill="var(--dhs-skin)" />
                                <path d="M18 20 Q34 26 40 40" stroke="var(--dhs-shirt)" strokeWidth={10} strokeLinecap="round" fill="none" />
                                <circle cx={40} cy={40} r={5.4} fill="var(--dhs-skin)" />
                                <rect x={38} y={6} width={4.4} height={70} rx={2.2} fill="var(--dhs-wood-light)" />
                                <ellipse cx={40} cy={4} rx={9} ry={14} fill="var(--dhs-wood)" />
                            </g>
                        </svg>

                        {/* status badge, pinned to the boat */}
                        <div className={`dhs-badge ${badgeIn ? "dhs-badge-in" : ""}`}>
                            {isSuccess ? (
                                <Check size={22} strokeWidth={3} />
                            ) : isConflict ? (
                                <Copy size={20} strokeWidth={2.5} />
                            ) : (
                                <XIcon size={22} strokeWidth={3} />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="dhs-particles">
                {particles.map((p) =>
                    isSuccess ? (
                        <div
                            key={p.id}
                            className="dhs-confetti"
                            style={{
                                left: `${p.left}%`,
                                width: `${p.size}vmin`,
                                height: `${p.size * 1.6}vmin`,
                                background: confettiColors[p.id % confettiColors.length],
                                animationDuration: `${p.duration}s`,
                                animationDelay: `${p.delay}s`,
                                // @ts-ignore custom property for horizontal drift
                                "--drift": `${p.drift}px`,
                            }}
                        />
                    ) : isConflict ? (
                        <div
                            key={p.id}
                            className="dhs-firefly"
                            style={{
                                left: `${p.left}%`,
                                top: `${p.top}%`,
                                width: `${p.size}vmin`,
                                height: `${p.size}vmin`,
                                animationDuration: `${p.duration}s`,
                                animationDelay: `${p.delay}s`,
                            }}
                        />
                    ) : (
                        <div
                            key={p.id}
                            className="dhs-rain"
                            style={{
                                left: `${p.left}%`,
                                top: `${p.top}%`,
                                width: `${p.size}vmin`,
                                animationDuration: `${p.duration}s`,
                                animationDelay: `${p.delay}s`,
                            }}
                        />
                    )
                )}
            </div>

            <div className="dhs-vignette" />

            <div className={`dhs-text-overlay ${mounted ? "dhs-in" : ""}`}>
                <h1 className="dhs-title">{headline}</h1>
                <p className="dhs-message">{sub}</p>
                {onPrimaryAction && (
                    <button className="dhs-action" onClick={onPrimaryAction}>
                        {isSuccess ? (
                            <ArrowRight size={16} strokeWidth={2.5} />
                        ) : isConflict ? (
                            <Edit3 size={16} strokeWidth={2.5} />
                        ) : (
                            <RotateCcw size={16} strokeWidth={2.5} />
                        )}
                        {actionLabel}
                    </button>
                )}
            </div>
        </div>
    );
};

export default DaddysHomeStatus;

const CSS = `
  .dhs-scene, .dhs-scene *{ box-sizing:border-box; }
  .dhs-scene{
    --dhs-wood-dark:#5e3720; --dhs-wood:#96633a; --dhs-wood-light:#c69361;
    --dhs-skin:#e7b184; --dhs-shirt:#c2543b; --dhs-hat:#e8c583; --dhs-hat-dark:#bd9950;
    --dhs-cream:#fff8ec;
    position:fixed; inset:0; width:100vw; height:100vh; overflow:hidden; z-index:999;
    font-family:'Quicksand', sans-serif;
  }
  .dhs-success{
    --dhs-water-deep:#075a70; --dhs-water-mid:#0e93a6; --dhs-water-bright:#3fcfc0;
    background:#0e93a6;
  }
  .dhs-error{
    --dhs-water-deep:#122233; --dhs-water-mid:#1c3a4d; --dhs-water-bright:#2c5568;
    background:#1c3a4d;
  }
  .dhs-conflict{
    --dhs-water-deep:#7a4419; --dhs-water-mid:#b06a2c; --dhs-water-bright:#e8a35c;
    background:#b06a2c;
  }

  .dhs-close{
    position:absolute; top:1.6rem; right:1.6rem; z-index:20;
    width:2.2rem; height:2.2rem; border-radius:999px; border:none; cursor:pointer;
    background:rgba(255,255,255,0.14); color:#fff8ec;
    display:flex; align-items:center; justify-content:center;
    backdrop-filter: blur(4px);
    transition: background 0.15s ease;
  }
  .dhs-close:hover{ background:rgba(255,255,255,0.26); }

  .dhs-sky{ position:absolute; inset:0; }
  .dhs-success .dhs-sky{ background: linear-gradient(180deg,#ffe3ae 0%, #ffd9a8 38%, #bdeee7 68%, var(--dhs-water-bright) 100%); }
  .dhs-error .dhs-sky{ background: linear-gradient(180deg,#3a4a58 0%, #2b3c4a 40%, #1e3040 70%, var(--dhs-water-bright) 100%); }
  .dhs-conflict .dhs-sky{ background: linear-gradient(180deg,#6b3f7a 0%, #b0602f 42%, #e8a35c 70%, var(--dhs-water-bright) 100%); }

  .dhs-glow{
    position:absolute; top:14%; left:50%; width:34vmin; height:34vmin; transform:translate(-50%,-50%);
    filter:blur(2px); animation: dhs-pulse 5s ease-in-out infinite;
  }
  .dhs-success .dhs-glow{ background: radial-gradient(circle, rgba(255,236,190,0.95) 0%, rgba(255,222,150,0.5) 32%, rgba(255,222,150,0) 70%); }
  .dhs-error .dhs-glow{ background: radial-gradient(circle, rgba(120,150,170,0.4) 0%, rgba(120,150,170,0.15) 40%, rgba(120,150,170,0) 70%); animation-duration:3s; }
  .dhs-conflict .dhs-glow{ background: radial-gradient(circle, rgba(255,206,140,0.9) 0%, rgba(255,180,110,0.45) 32%, rgba(255,180,110,0) 70%); animation-duration:4s; }
  .dhs-conflict .dhs-sunburst{
    background: conic-gradient(from 0deg, rgba(255,190,130,0.14) 0deg, rgba(255,190,130,0) 20deg,
      rgba(255,190,130,0.14) 40deg, rgba(255,190,130,0) 60deg, rgba(255,190,130,0.14) 80deg,
      rgba(255,190,130,0) 100deg, rgba(255,190,130,0.14) 120deg, rgba(255,190,130,0) 140deg,
      rgba(255,190,130,0.14) 160deg, rgba(255,190,130,0) 180deg, rgba(255,190,130,0.14) 200deg,
      rgba(255,190,130,0) 220deg, rgba(255,190,130,0.14) 240deg, rgba(255,190,130,0) 260deg,
      rgba(255,190,130,0.14) 280deg, rgba(255,190,130,0) 300deg, rgba(255,190,130,0.14) 320deg,
      rgba(255,190,130,0) 340deg, rgba(255,190,130,0.14) 360deg);
    opacity:0.5;
  }
  @keyframes dhs-pulse{ 0%,100%{opacity:0.85; transform:translate(-50%,-50%) scale(1);} 50%{opacity:1; transform:translate(-50%,-50%) scale(1.06);} }

  .dhs-sunburst{
    position:absolute; top:14%; left:50%; width:140vmax; height:140vmax; transform:translate(-50%,-50%);
    mix-blend-mode:screen; opacity:0.6; animation: dhs-rayRotate 90s linear infinite;
  }
  .dhs-success .dhs-sunburst{
    background: conic-gradient(from 0deg, rgba(255,230,168,0.16) 0deg, rgba(255,230,168,0) 20deg,
      rgba(255,230,168,0.16) 40deg, rgba(255,230,168,0) 60deg, rgba(255,230,168,0.16) 80deg,
      rgba(255,230,168,0) 100deg, rgba(255,230,168,0.16) 120deg, rgba(255,230,168,0) 140deg,
      rgba(255,230,168,0.16) 160deg, rgba(255,230,168,0) 180deg, rgba(255,230,168,0.16) 200deg,
      rgba(255,230,168,0) 220deg, rgba(255,230,168,0.16) 240deg, rgba(255,230,168,0) 260deg,
      rgba(255,230,168,0.16) 280deg, rgba(255,230,168,0) 300deg, rgba(255,230,168,0.16) 320deg,
      rgba(255,230,168,0) 340deg, rgba(255,230,168,0.16) 360deg);
  }
  @keyframes dhs-rayRotate{ to{ transform:translate(-50%,-50%) rotate(360deg); } }

  .dhs-cloud{ position:absolute; border-radius:50%; filter:blur(0.5px); }
  .dhs-success .dhs-cloud{ background: radial-gradient(ellipse at 30% 30%, #fff 0%, rgba(255,255,255,0.85) 55%, rgba(255,255,255,0.55) 100%); opacity:0.85; }
  .dhs-error .dhs-cloud{ background: radial-gradient(ellipse at 30% 30%, #6b7f8c 0%, rgba(70,88,100,0.85) 55%, rgba(70,88,100,0.5) 100%); opacity:0.8; }
  .dhs-conflict .dhs-cloud{ background: radial-gradient(ellipse at 30% 30%, #f6cfa0 0%, rgba(230,170,120,0.85) 55%, rgba(200,140,100,0.5) 100%); opacity:0.75; }
  .dhs-c1{ width:14vmin; height:5.5vmin; top:10%; left:-15vmin; animation: dhs-drift 60s linear infinite; }
  .dhs-c2{ width:10vmin; height:4vmin; top:20%; left:-12vmin; animation: dhs-drift 80s linear infinite; animation-delay:-18s; opacity:0.7; }
  @keyframes dhs-drift{ from{ transform:translateX(0); } to{ transform:translateX(130vw); } }

  .dhs-lightning{
    position:absolute; inset:0; background:#eaf6ff; opacity:0;
    animation: dhs-flash 6s ease-in-out infinite;
    mix-blend-mode:screen;
  }
  @keyframes dhs-flash{
    0%,92%,100%{ opacity:0; }
    93%{ opacity:0.55; } 94%{ opacity:0.05; } 95%{ opacity:0.4; } 96%{ opacity:0; }
  }

  .dhs-water{ position:absolute; left:0; right:0; bottom:0; top:56%; overflow:hidden; }
  .dhs-water{ background: linear-gradient(180deg, var(--dhs-water-bright) 0%, var(--dhs-water-mid) 45%, var(--dhs-water-deep) 100%); }
  .dhs-water-sheen{
    position:absolute; inset:0;
    background: repeating-linear-gradient(115deg, rgba(255,255,255,0.10) 0 2px, rgba(255,255,255,0) 2px 46px);
    background-size:220% 220%; animation: dhs-sheenMove 12s linear infinite; mix-blend-mode:screen; opacity:0.8;
  }
  .dhs-error .dhs-water-sheen{ opacity:0.35; animation-duration:2.5s; }
  @keyframes dhs-sheenMove{ from{ background-position:0 0; } to{ background-position:-600px 300px; } }

  .dhs-wave-edge{ position:absolute; top:-2vmin; left:0; width:220%; height:6vmin; animation: dhs-waveScroll 14s linear infinite; }
  .dhs-error .dhs-wave-edge{ animation-duration:5s; }
  .dhs-wave-edge svg{ width:50%; height:100%; float:left; }
  @keyframes dhs-waveScroll{ from{ transform:translateX(0); } to{ transform:translateX(-50%); } }

  .dhs-dock{ position:absolute; bottom:0; left:50%; width:44vmin; transform:translateX(-32%); opacity:0.95; }

  .dhs-particles{ position:absolute; inset:0; pointer-events:none; overflow:hidden; z-index:5; }
  .dhs-confetti{
    position:absolute; top:-8%; border-radius:2px; opacity:0;
    animation-name: dhs-confettiFall; animation-timing-function: ease-in; animation-iteration-count: infinite;
  }
  @keyframes dhs-confettiFall{
    0%{ opacity:0; transform: translate(0,0) rotate(0deg); }
    8%{ opacity:1; }
    100%{ opacity:0.9; transform: translate(var(--drift), 115vh) rotate(340deg); }
  }
  .dhs-firefly{
    position:absolute; border-radius:50%; opacity:0;
    background: radial-gradient(circle, #fff2cf 0%, rgba(255,206,120,0.6) 45%, rgba(255,206,120,0) 75%);
    animation-name: dhs-fireflyDrift; animation-timing-function: ease-in-out; animation-iteration-count: infinite;
  }
  @keyframes dhs-fireflyDrift{
    0%,100%{ opacity:0; transform: translate(0,0) scale(0.6); }
    15%{ opacity:0.9; }
    50%{ opacity:0.5; transform: translate(1.5vmin, -2vmin) scale(1); }
    85%{ opacity:0.85; }
  }
  .dhs-rain{
    position:absolute; height:3.4vmin; background:linear-gradient(180deg, rgba(220,236,245,0) 0%, rgba(220,236,245,0.55) 100%);
    border-radius:2px; opacity:0; animation-name: dhs-rainFall; animation-timing-function: linear; animation-iteration-count: infinite;
  }
  @keyframes dhs-rainFall{
    0%{ opacity:0; transform: translateY(0); }
    6%{ opacity:0.7; }
    95%{ opacity:0.5; }
    100%{ opacity:0; transform: translateY(60vh); }
  }

  .dhs-echo-wrap{
    position:absolute; top:60%; left:29%; width:18vmin; height:18vmin; transform:translate(-50%,-50%);
    opacity:0.4; filter: drop-shadow(0 1vmin 1.2vmin rgba(60,30,0,0.3)) grayscale(0.15);
    animation: dhs-boatBobCalm 3.6s cubic-bezier(.45,.05,.55,.95) infinite; animation-delay:-1.1s;
  }
  .dhs-echo-ring{
    position:absolute; top:38%; left:50%; width:15vmin; height:15vmin; transform:translate(-50%,-50%);
    border-radius:999px; border:2px dashed rgba(255,244,225,0.65);
    animation: dhs-echoPulse 2.6s ease-in-out infinite;
  }
  @keyframes dhs-echoPulse{ 0%,100%{ transform:translate(-50%,-50%) scale(0.94); opacity:0.7; } 50%{ transform:translate(-50%,-50%) scale(1.06); opacity:0.35; } }

  .dhs-boat-wrap{
    position:absolute; top:63%; left:50%; width:26vmin; height:26vmin; transform:translate(-50%,-50%);
    filter: drop-shadow(0 1.2vmin 1.4vmin rgba(10,40,45,0.35));
  }
  .dhs-conflict .dhs-boat-wrap{ left:58%; }
  .dhs-bob-group{ width:100%; height:100%; position:relative; transform-origin:50% 60%; }
  .dhs-success .dhs-bob-group{ animation: dhs-boatBobCalm 4.2s cubic-bezier(.45,.05,.55,.95) infinite; }
  .dhs-error .dhs-bob-group{ animation: dhs-boatBobRough 1.3s cubic-bezier(.45,.05,.55,.95) infinite; }
  .dhs-conflict .dhs-bob-group{ animation: dhs-boatBobNudge 2.8s cubic-bezier(.45,.05,.55,.95) infinite; }
  @keyframes dhs-boatBobNudge{
    0%{ transform: translateY(0) rotate(-1.4deg); }
    45%{ transform: translateY(0.5vmin) rotate(1.4deg); }
    52%{ transform: translateY(0.3vmin) translateX(-0.4vmin) rotate(-2.5deg); }
    60%{ transform: translateY(0.5vmin) rotate(1deg); }
    100%{ transform: translateY(0) rotate(-1.4deg); }
  }
  @keyframes dhs-boatBobCalm{
    0%{ transform: translateY(0) rotate(-1.4deg); }
    50%{ transform: translateY(0.6vmin) rotate(1.6deg); }
    100%{ transform: translateY(0) rotate(-1.4deg); }
  }
  @keyframes dhs-boatBobRough{
    0%{ transform: translateY(0) rotate(-5deg); }
    50%{ transform: translateY(1.6vmin) rotate(6deg); }
    100%{ transform: translateY(0) rotate(-5deg); }
  }

  .dhs-torso-breathe{ animation: dhs-breathe 3.6s ease-in-out infinite; transform-origin:50% 100%; }
  @keyframes dhs-breathe{ 0%,100%{ transform:scaleY(1);} 50%{ transform:scaleY(1.025);} }
  .dhs-hat-sway{ animation: dhs-hatSway 3.2s ease-in-out infinite; transform-origin:50% 90%; }
  @keyframes dhs-hatSway{ 0%,100%{ transform:rotate(-2deg);} 50%{ transform:rotate(2.5deg);} }

  .dhs-ripple{ fill:none; stroke:rgba(255,255,255,0.5); stroke-width:2.2; transform-origin:50% 50%; animation: dhs-rippleOut 5s ease-out infinite; opacity:0; }
  .dhs-ripple.dhs-r2{ animation-delay:0.3s; }
  @keyframes dhs-rippleOut{ 0%,78%{ transform:scale(0.15); opacity:0; } 82%{ opacity:0.6; } 100%{ transform:scale(2.6); opacity:0; } }

  .dhs-badge{
    position:absolute; top:8%; left:64%; width:3.4rem; height:3.4rem; border-radius:999px;
    display:flex; align-items:center; justify-content:center; color:#fff;
    transform: scale(0) rotate(-30deg); opacity:0;
    transition: transform 0.55s cubic-bezier(.34,1.56,.64,1), opacity 0.35s ease;
    box-shadow: 0 0.6vmin 1.4vmin rgba(0,0,0,0.35);
    border: 3px solid var(--dhs-cream);
  }
  .dhs-success .dhs-badge{ background: linear-gradient(160deg,#3fcfc0,#0e93a6); }
  .dhs-error .dhs-badge{ background: linear-gradient(160deg,#e6604a,#a3382a); }
  .dhs-conflict .dhs-badge{ background: linear-gradient(160deg,#ffcf8a,#c9781f); }
  .dhs-conflict .dhs-badge{ top:6%; left:71%; }
  .dhs-badge-in{ transform: scale(1) rotate(0deg); opacity:1; }
  .dhs-error .dhs-badge-in{ animation: dhs-badgeShake 0.5s ease 0.55s; }
  @keyframes dhs-badgeShake{ 0%,100%{ transform:rotate(0deg);} 25%{ transform:rotate(-8deg);} 75%{ transform:rotate(8deg);} }

  .dhs-vignette{ position:absolute; inset:0; pointer-events:none; background: radial-gradient(ellipse at 50% 55%, rgba(0,0,0,0) 45%, rgba(6,20,25,0.35) 100%); }

  .dhs-text-overlay{
    position:absolute; left:50%; bottom:7%; transform:translateX(-50%); text-align:center;
    width:min(90vw, 560px); opacity:0; transition: opacity 0.9s ease-out;
    display:flex; flex-direction:column; align-items:center; gap:0.5rem;
  }
  .dhs-text-overlay.dhs-in{ opacity:1; }
  .dhs-title{
    margin:0; font-family:'Baloo 2', cursive; font-weight:700;
    font-size:clamp(1.9rem, 5vw, 3rem); color:var(--dhs-cream); letter-spacing:0.5px;
    text-shadow: 0 0.3vmin 0 rgba(20,20,20,0.25), 0 1.2vmin 2vmin rgba(0,0,0,0.28);
  }
  .dhs-message{
    margin:0; font-weight:500; font-size:clamp(0.9rem, 2vw, 1.05rem);
    color:var(--dhs-cream); opacity:0.92; text-shadow: 0 0.2vmin 1vmin rgba(0,0,0,0.35);
  }
  .dhs-action{
    margin-top:0.6rem; display:flex; align-items:center; gap:0.5rem;
    padding:0.7rem 1.4rem; border-radius:999px; border:none; cursor:pointer;
    font-family:'Quicksand', sans-serif; font-weight:600; font-size:0.9rem;
    pointer-events:auto;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }
  .dhs-success .dhs-action{ background: var(--dhs-cream); color:#075a70; }
  .dhs-error .dhs-action{ background: var(--dhs-cream); color:#a3382a; }
  .dhs-conflict .dhs-action{ background: var(--dhs-cream); color:#8a4f16; }
  .dhs-action:hover{ transform: translateY(-1px); box-shadow: 0 0.5vmin 1.2vmin rgba(0,0,0,0.25); }

  @media (prefers-reduced-motion: reduce){
    .dhs-scene *{ animation-duration:0.001ms !important; animation-iteration-count:1 !important; transition-duration:0.001ms !important; }
  }
`;