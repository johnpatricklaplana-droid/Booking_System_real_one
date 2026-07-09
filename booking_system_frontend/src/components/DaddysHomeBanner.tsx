import React, { useEffect, useMemo, useState, type ReactNode } from "react";

interface DaddysHomeBannerProps {
    /** Rendered centered on top of the scene — e.g. the business logo. */
    children?: ReactNode;
    /** Tailwind height class for the banner. Defaults to the existing h-85. */
    heightClassName?: string;
}

interface Sparkle {
    id: number;
    top: number;
    left: number;
    size: number;
    duration: number;
    delay: number;
}

/**
 * Compact version of the DaddysHomeLoader boat/water scene, sized to sit
 * inline as a page header banner instead of a fullscreen overlay. The boat
 * stays visible off to one side so it doesn't fight with whatever's
 * centered on top (business logo, avatar, etc).
 */
export default function DaddysHomeBanner({ children, heightClassName = "h-85" }: DaddysHomeBannerProps) {
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

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        const t = requestAnimationFrame(() => setMounted(true));
        return () => cancelAnimationFrame(t);
    }, []);

    const sparkles = useMemo<Sparkle[]>(
        () =>
            Array.from({ length: 14 }, (_, i) => ({
                id: i,
                top: 55 + Math.random() * 38,
                left: Math.random() * 100,
                size: Math.random() * 0.9 + 0.35,
                duration: 2 + Math.random() * 3,
                delay: Math.random() * 5,
            })),
        []
    );

    return (
        <div className={`dhb-scene relative overflow-hidden border-b border-(--border) ${heightClassName}`}>
            <style>{CSS}</style>

            <div className="dhb-sky">
                <div className="dhb-sunburst" />
                <div className="dhb-glow" />
                <div className="dhb-cloud dhb-c1" />
                <div className="dhb-cloud dhb-c2" />
            </div>

            <div className="dhb-water">
                <div className="dhb-sheen" />
                <div className="dhb-wave">
                    <svg viewBox="0 0 800 40" preserveAspectRatio="none">
                        <path d="M0,20 Q50,0 100,20 T200,20 T300,20 T400,20 T500,20 T600,20 T700,20 T800,20 V0 H0 Z" fill="rgba(255,255,255,0.09)" />
                    </svg>
                    <svg viewBox="0 0 800 40" preserveAspectRatio="none">
                        <path d="M0,20 Q50,0 100,20 T200,20 T300,20 T400,20 T500,20 T600,20 T700,20 T800,20 V0 H0 Z" fill="rgba(255,255,255,0.09)" />
                    </svg>
                </div>

                <div className="dhb-boat-wrap">
                    <svg viewBox="0 0 100 100" style={{ position: "absolute", top: "60%", left: "50%", width: "170%", transform: "translate(-50%, -50%)" }}>
                        <circle className="dhb-ripple dhb-r1" cx={50} cy={50} r={14} />
                        <circle className="dhb-ripple dhb-r2" cx={50} cy={50} r={14} />
                    </svg>
                    <div className="dhb-bob-group">
                        <svg viewBox="0 0 200 200" width="100%" height="100%">
                            <defs>
                                <linearGradient id="dhbHullGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#3fcfc0" />
                                    <stop offset="100%" stopColor="#075a70" />
                                </linearGradient>
                            </defs>
                            <path d="M30 132 Q100 168 170 132 L158 112 Q100 128 42 112 Z" fill="#5e3720" />
                            <path d="M34 128 Q100 158 166 128 L156 110 Q100 124 44 110 Z" fill="#96633a" />
                            <path d="M30 132 Q100 148 170 132 Q100 168 30 132 Z" fill="url(#dhbHullGrad)" opacity={0.6} />
                            <g transform="translate(100,72)">
                                <g className="dhb-torso-breathe">
                                    <path d="M-22 8 Q-26 46 -18 58 L18 58 Q26 46 22 8 Q0 -4 -22 8Z" fill="#c2543b" />
                                </g>
                                <circle cx={0} cy={-14} r={16} fill="#e7b184" />
                                <path d="M-7 -8 Q0 -2 7 -8" stroke="#7a4a30" strokeWidth={1.8} fill="none" strokeLinecap="round" />
                                <circle cx={-6} cy={-16} r={1.6} fill="#3a2416" />
                                <circle cx={6} cy={-16} r={1.6} fill="#3a2416" />
                                <g className="dhb-hat-sway">
                                    <ellipse cx={0} cy={-27} rx={19} ry={4.4} fill="#bd9950" />
                                    <path d="M-11 -27 Q0 -46 11 -27 Q0 -32 -11 -27Z" fill="#e8c583" />
                                </g>
                                <path d="M-20 20 Q-34 30 -30 44" stroke="#c2543b" strokeWidth={9} strokeLinecap="round" fill="none" />
                                <circle cx={-30} cy={44} r={5} fill="#e7b184" />
                                <g className="dhb-arm-group">
                                    <path d="M18 20 Q34 26 40 40" stroke="#c2543b" strokeWidth={10} strokeLinecap="round" fill="none" />
                                </g>
                                <g className="dhb-paddle-group">
                                    <circle cx={40} cy={40} r={5.4} fill="#e7b184" />
                                    <rect x={38} y={6} width={4.4} height={70} rx={2.2} fill="#c69361" />
                                    <ellipse cx={40} cy={4} rx={9} ry={14} fill="#96633a" />
                                </g>
                            </g>
                        </svg>
                    </div>
                </div>

                <div className="dhb-sparkles">
                    {sparkles.map((s) => (
                        <div
                            key={s.id}
                            className="dhb-spark"
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

            <div className="dhb-vignette" />

            {children && (
                <div className={`dhb-content ${mounted ? "dhb-in" : ""}`}>
                    {children}
                </div>
            )}
        </div>
    );
}

const CSS = `
  .dhb-scene, .dhb-scene *{ box-sizing:border-box; }
  .dhb-scene{ background:#0e93a6; }

  .dhb-sky{ position:absolute; inset:0; background: linear-gradient(180deg, #ffe3ae 0%, #ffd9a8 38%, #bdeee7 68%, #3fcfc0 100%); }
  .dhb-sunburst{
    position:absolute; top:0%; left:38%; width:90vmax; height:90vmax; transform:translate(-50%,-50%);
    background: conic-gradient(from 0deg, rgba(255,230,168,0.14) 0deg, rgba(255,230,168,0) 20deg,
      rgba(255,230,168,0.14) 40deg, rgba(255,230,168,0) 60deg, rgba(255,230,168,0.14) 80deg,
      rgba(255,230,168,0) 100deg, rgba(255,230,168,0.14) 120deg, rgba(255,230,168,0) 140deg,
      rgba(255,230,168,0.14) 160deg, rgba(255,230,168,0) 180deg, rgba(255,230,168,0.14) 200deg,
      rgba(255,230,168,0) 220deg, rgba(255,230,168,0.14) 240deg, rgba(255,230,168,0) 260deg,
      rgba(255,230,168,0.14) 280deg, rgba(255,230,168,0) 300deg, rgba(255,230,168,0.14) 320deg,
      rgba(255,230,168,0) 340deg, rgba(255,230,168,0.14) 360deg);
    mix-blend-mode:screen; opacity:0.65; animation: dhb-rayRotate 100s linear infinite;
  }
  @keyframes dhb-rayRotate{ to{ transform:translate(-50%,-50%) rotate(360deg); } }
  .dhb-glow{
    position:absolute; top:2%; left:38%; width:22vmin; height:22vmin; transform:translate(-50%,-50%);
    background: radial-gradient(circle, rgba(255,236,190,0.9) 0%, rgba(255,222,150,0.4) 32%, rgba(255,222,150,0) 70%);
    filter:blur(2px); animation: dhb-sunPulse 6s ease-in-out infinite;
  }
  @keyframes dhb-sunPulse{ 0%,100%{opacity:0.85;} 50%{opacity:1;} }

  .dhb-cloud{
    position:absolute; border-radius:50%; filter:blur(0.5px); opacity:0.8;
    background: radial-gradient(ellipse at 30% 30%, #fff 0%, rgba(255,255,255,0.85) 55%, rgba(255,255,255,0.5) 100%);
  }
  .dhb-c1{ width:9vmin; height:3.6vmin; top:10%; left:-12vmin; animation: dhb-drift 50s linear infinite; }
  .dhb-c2{ width:6vmin; height:2.6vmin; top:20%; left:-10vmin; animation: dhb-drift 65s linear infinite; animation-delay:-15s; opacity:0.6; }
  @keyframes dhb-drift{ from{ transform:translateX(0); } to{ transform:translateX(140vw); } }

  .dhb-water{ position:absolute; left:0; right:0; bottom:0; top:52%; overflow:hidden;
    background: linear-gradient(180deg, #3fcfc0 0%, #0e93a6 45%, #075a70 100%); }
  .dhb-sheen{
    position:absolute; inset:0;
    background: repeating-linear-gradient(115deg, rgba(255,255,255,0.08) 0 2px, rgba(255,255,255,0) 2px 46px);
    background-size:220% 220%; animation: dhb-sheenMove 13s linear infinite; mix-blend-mode:screen; opacity:0.7;
  }
  @keyframes dhb-sheenMove{ from{ background-position:0 0; } to{ background-position:-600px 300px; } }
  .dhb-wave{ position:absolute; top:-2vmin; left:0; width:220%; height:5vmin; animation: dhb-waveScroll 16s linear infinite; }
  .dhb-wave svg{ width:50%; height:100%; float:left; }
  @keyframes dhb-waveScroll{ from{ transform:translateX(0); } to{ transform:translateX(-50%); } }

  .dhb-sparkles{ position:absolute; inset:0; pointer-events:none; }
  .dhb-spark{
    position:absolute; border-radius:50%;
    background: radial-gradient(circle, #fff 0%, rgba(255,255,255,0) 70%);
    animation-name: dhb-twinkle; animation-timing-function: ease-in-out; animation-iteration-count: infinite;
  }
  @keyframes dhb-twinkle{ 0%,100%{ opacity:0; transform:scale(0.4);} 50%{ opacity:0.8; transform:scale(1);} }

  /* boat sits off to the right third so it stays clear of centered content */
  .dhb-boat-wrap{
    position:absolute; top:64%; left:78%; width:14vmin; height:14vmin; transform:translate(-50%,-50%);
    filter: drop-shadow(0 1vmin 1.2vmin rgba(10,40,45,0.35));
    min-width:88px; min-height:88px;
  }
  .dhb-bob-group{ width:100%; height:100%; animation: dhb-boatBob 4.2s cubic-bezier(.45,.05,.55,.95) infinite; transform-origin:50% 60%; }
  @keyframes dhb-boatBob{
    0%{ transform: translateY(0) rotate(-1.4deg); }
    25%{ transform: translateY(-0.9vmin) rotate(0.6deg); }
    50%{ transform: translateY(0.25vmin) rotate(1.6deg); }
    75%{ transform: translateY(-0.7vmin) rotate(-0.4deg); }
    100%{ transform: translateY(0) rotate(-1.4deg); }
  }
  .dhb-paddle-group{ transform-origin: 63% 46%; animation: dhb-paddleStroke 5s ease-in-out infinite; }
  @keyframes dhb-paddleStroke{
    0%,72%{ transform: rotate(-6deg); } 80%{ transform: rotate(20deg); }
    88%{ transform: rotate(34deg); } 94%{ transform: rotate(6deg); } 100%{ transform: rotate(-6deg); }
  }
  .dhb-arm-group{ transform-origin: 60% 47%; animation: dhb-armStroke 5s ease-in-out infinite; }
  @keyframes dhb-armStroke{
    0%,72%{ transform: rotate(-4deg); } 80%{ transform: rotate(10deg); }
    88%{ transform: rotate(16deg); } 94%{ transform: rotate(2deg); } 100%{ transform: rotate(-4deg); }
  }
  .dhb-torso-breathe{ animation: dhb-breathe 3.6s ease-in-out infinite; transform-origin:50% 100%; }
  @keyframes dhb-breathe{ 0%,100%{ transform:scaleY(1);} 50%{ transform:scaleY(1.025);} }
  .dhb-hat-sway{ animation: dhb-hatSway 3.2s ease-in-out infinite; transform-origin:50% 90%; }
  @keyframes dhb-hatSway{ 0%,100%{ transform:rotate(-2deg);} 50%{ transform:rotate(2.5deg);} }

  .dhb-ripple{ fill:none; stroke:rgba(255,255,255,0.5); stroke-width:2; transform-origin:50% 50%; animation: dhb-rippleOut 5s ease-out infinite; opacity:0; }
  .dhb-ripple.dhb-r2{ animation-delay:0.28s; }
  @keyframes dhb-rippleOut{ 0%,78%{ transform:scale(0.15); opacity:0; } 82%{ opacity:0.6; } 100%{ transform:scale(2.4); opacity:0; } }

  .dhb-vignette{ position:absolute; inset:0; pointer-events:none; background: radial-gradient(ellipse at 38% 45%, rgba(0,0,0,0) 40%, rgba(6,20,25,0.4) 100%); }

  .dhb-content{
    position:relative; z-index:5; height:100%;
    display:flex; align-items:center; justify-content:center;
    opacity:0; transform: translateY(8px) scale(0.97);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  }
  .dhb-content.dhb-in{ opacity:1; transform: translateY(0) scale(1); }

  @media (prefers-reduced-motion: reduce){
    .dhb-scene *{ animation-duration:0.001ms !important; animation-iteration-count:1 !important; transition-duration:0.001ms !important; }
  }
`;