import React, { useEffect, useMemo, useState } from "react";

interface DaddysHomeLoaderProps {
    /** The single status line shown beneath the title. */
    message?: string;
}

interface Sparkle {
    id: number;
    top: number;
    left: number;
    size: number;
    duration: number;
    delay: number;
}

const DaddysHomeLoader: React.FC<DaddysHomeLoaderProps> = ({
    message = "Preparing your home...",
}) => {
    // Load the display + body fonts once.
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

    // Ambient sparkle particles scattered across the water.
    const sparkles = useMemo<Sparkle[]>(() => {
        const count = 26;
        return Array.from({ length: count }, (_, i) => ({
            id: i,
            top: 56 + Math.random() * 40,
            left: Math.random() * 100,
            size: Math.random() * 1.1 + 0.35,
            duration: 2 + Math.random() * 3,
            delay: Math.random() * 5,
        }));
    }, []);

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        const t = requestAnimationFrame(() => setMounted(true));
        return () => cancelAnimationFrame(t);
    }, []);

    return (
        <div className="dhl-scene" role="status" aria-live="polite" aria-label="Loading Daddy's Home">
            <style>{CSS}</style>

            <div className="dhl-sky">
                <div className="dhl-sunburst" />
                <div className="dhl-sun-glow" />
                <div className="dhl-cloud dhl-c1" />
                <div className="dhl-cloud dhl-c2" />
                <div className="dhl-cloud dhl-c3" />

                <div className="dhl-bird dhl-b1">
                    <svg viewBox="0 0 40 20">
                        <g className="dhl-wing">
                            <path d="M0,14 Q10,0 20,10 Q30,0 40,14 Q30,8 20,13 Q10,8 0,14Z" fill="#ffffff" opacity={0.9} />
                        </g>
                    </svg>
                </div>
                <div className="dhl-bird dhl-b2">
                    <svg viewBox="0 0 40 20">
                        <g className="dhl-wing">
                            <path d="M0,14 Q10,0 20,10 Q30,0 40,14 Q30,8 20,13 Q10,8 0,14Z" fill="#ffffff" opacity={0.85} />
                        </g>
                    </svg>
                </div>
                <div className="dhl-bird dhl-b3">
                    <svg viewBox="0 0 40 20">
                        <g className="dhl-wing">
                            <path d="M0,14 Q10,0 20,10 Q30,0 40,14 Q30,8 20,13 Q10,8 0,14Z" fill="#ffffff" opacity={0.8} />
                        </g>
                    </svg>
                </div>
            </div>

            <div className="dhl-water">
                <div className="dhl-water-sheen" />
                <div className="dhl-sun-path" />

                <div className="dhl-wave-edge">
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

                <div className="dhl-reed dhl-rd1" />
                <div className="dhl-reed dhl-rd2" />
                <div className="dhl-reed dhl-rd3" />
                <div className="dhl-reed dhl-rd4" />

                {/* lily pads */}
                <svg className="dhl-float-item dhl-lily dhl-l1" viewBox="0 0 40 40">
                    <path d="M20 2 A18 18 0 1 1 19.9 2 L20 20 Z" fill="#3f7d4a" />
                    <path d="M20 2 A18 18 0 1 1 19.9 2 L20 20 Z" fill="#4f8f5b" style={{ transform: "scale(0.9)", transformOrigin: "20px 20px" }} />
                </svg>
                <svg className="dhl-float-item dhl-lily dhl-l2" viewBox="0 0 40 40">
                    <path d="M20 2 A18 18 0 1 1 19.9 2 L20 20 Z" fill="#3f7d4a" />
                    <path d="M20 2 A18 18 0 1 1 19.9 2 L20 20 Z" fill="#4f8f5b" style={{ transform: "scale(0.9)", transformOrigin: "20px 20px" }} />
                </svg>
                <svg className="dhl-float-item dhl-lily dhl-l3" viewBox="0 0 40 40">
                    <path d="M20 2 A18 18 0 1 1 19.9 2 L20 20 Z" fill="#3f7d4a" />
                    <path d="M20 2 A18 18 0 1 1 19.9 2 L20 20 Z" fill="#4f8f5b" style={{ transform: "scale(0.9)", transformOrigin: "20px 20px" }} />
                </svg>

                {/* ducks */}
                <svg className="dhl-float-item dhl-duck dhl-duck-bob dhl-d1" viewBox="0 0 60 40">
                    <ellipse cx={26} cy={26} rx={18} ry={12} fill="#fff7e6" />
                    <circle cx={42} cy={14} r={9} fill="#fff7e6" />
                    <path d="M50 14 L58 12 L50 18 Z" fill="#f2a93b" />
                    <circle cx={45} cy={11} r={1.4} fill="#3a2416" />
                </svg>
                <svg className="dhl-float-item dhl-duck dhl-duck-bob dhl-d2" viewBox="0 0 60 40">
                    <ellipse cx={26} cy={26} rx={16} ry={10.5} fill="#fff7e6" />
                    <circle cx={40} cy={15} r={8} fill="#fff7e6" />
                    <path d="M47 15 L54 13 L47 18 Z" fill="#f2a93b" />
                    <circle cx={43} cy={12} r={1.2} fill="#3a2416" />
                </svg>
                <svg className="dhl-float-item dhl-duck dhl-duck-bob dhl-d3" viewBox="0 0 60 40">
                    <ellipse cx={26} cy={26} rx={17} ry={11} fill="#fff7e6" />
                    <circle cx={41} cy={14} r={8.5} fill="#fff7e6" />
                    <path d="M49 14 L56 12 L49 17 Z" fill="#f2a93b" />
                    <circle cx={44} cy={11} r={1.3} fill="#3a2416" />
                </svg>

                {/* fish shadows beneath surface */}
                <svg className="dhl-float-item dhl-fish dhl-f1" viewBox="0 0 50 24">
                    <path d="M2 12 Q16 -2 40 12 Q16 26 2 12Z" fill="#0a4756" opacity={0.55} />
                    <path d="M40 12 L50 4 L48 12 L50 20 Z" fill="#0a4756" opacity={0.55} />
                </svg>
                <svg className="dhl-float-item dhl-fish dhl-f2" viewBox="0 0 50 24">
                    <path d="M2 12 Q16 -2 40 12 Q16 26 2 12Z" fill="#0a4756" opacity={0.5} />
                    <path d="M40 12 L50 4 L48 12 L50 20 Z" fill="#0a4756" opacity={0.5} />
                </svg>
                <svg className="dhl-float-item dhl-fish dhl-f3" viewBox="0 0 50 24">
                    <path d="M2 12 Q16 -2 40 12 Q16 26 2 12Z" fill="#0a4756" opacity={0.45} />
                    <path d="M40 12 L50 4 L48 12 L50 20 Z" fill="#0a4756" opacity={0.45} />
                </svg>

                <svg className="dhl-splash dhl-sp1" viewBox="0 0 40 40">
                    <circle cx={20} cy={20} r={4} fill="#eafffb" opacity={0.9} />
                    <circle cx={10} cy={14} r={2} fill="#eafffb" opacity={0.7} />
                    <circle cx={30} cy={12} r={2.4} fill="#eafffb" opacity={0.7} />
                </svg>
                <svg className="dhl-splash dhl-sp2" viewBox="0 0 40 40">
                    <circle cx={20} cy={20} r={4} fill="#eafffb" opacity={0.9} />
                    <circle cx={10} cy={14} r={2} fill="#eafffb" opacity={0.7} />
                    <circle cx={30} cy={12} r={2.4} fill="#eafffb" opacity={0.7} />
                </svg>
                <svg className="dhl-splash dhl-sp3" viewBox="0 0 40 40">
                    <circle cx={20} cy={20} r={4} fill="#eafffb" opacity={0.9} />
                    <circle cx={10} cy={14} r={2} fill="#eafffb" opacity={0.7} />
                    <circle cx={30} cy={12} r={2.4} fill="#eafffb" opacity={0.7} />
                </svg>

                {/* dragonflies */}
                <svg className="dhl-float-item dhl-dragonfly dhl-dg1" viewBox="0 0 40 20">
                    <ellipse cx={18} cy={10} rx={12} ry={1.6} fill="#2c7a6b" />
                    <g className="dhl-wing-flutter">
                        <ellipse cx={14} cy={6} rx={8} ry={2.4} fill="#bff0e6" opacity={0.7} />
                        <ellipse cx={14} cy={14} rx={8} ry={2.4} fill="#bff0e6" opacity={0.7} />
                    </g>
                </svg>
                <svg className="dhl-float-item dhl-dragonfly dhl-dg2" viewBox="0 0 40 20">
                    <ellipse cx={18} cy={10} rx={12} ry={1.6} fill="#2c7a6b" />
                    <g className="dhl-wing-flutter">
                        <ellipse cx={14} cy={6} rx={8} ry={2.4} fill="#bff0e6" opacity={0.7} />
                        <ellipse cx={14} cy={14} rx={8} ry={2.4} fill="#bff0e6" opacity={0.7} />
                    </g>
                </svg>

                {/* leaves */}
                <svg className="dhl-float-item dhl-leaf dhl-lf1" viewBox="0 0 30 30">
                    <path d="M15 2 C24 8 24 22 15 28 C6 22 6 8 15 2Z" fill="#7fae5c" />
                    <path d="M15 2 V28" stroke="#4f8f3a" strokeWidth={1} />
                </svg>
                <svg className="dhl-float-item dhl-leaf dhl-lf2" viewBox="0 0 30 30">
                    <path d="M15 2 C24 8 24 22 15 28 C6 22 6 8 15 2Z" fill="#96b568" />
                    <path d="M15 2 V28" stroke="#5a8f3f" strokeWidth={1} />
                </svg>

                {/* bubbles */}
                <div className="dhl-bubble dhl-bb1" />
                <div className="dhl-bubble dhl-bb2" />
                <div className="dhl-bubble dhl-bb3" />

                {/* ================= BOAT + FATHER (hero, centered) ================= */}
                <div className="dhl-boat-wrap">
                    {/* ripples released with each paddle stroke */}
                    <svg
                        viewBox="0 0 100 100"
                        style={{ position: "absolute", top: "60%", left: "50%", width: "140%", transform: "translate(-50%, -50%)" }}
                    >
                        <circle className="dhl-ripple dhl-r1" cx={50} cy={50} r={14} />
                        <circle className="dhl-ripple dhl-r2" cx={50} cy={50} r={14} />
                        <circle className="dhl-ripple dhl-r3" cx={50} cy={50} r={14} />
                    </svg>

                    <div className="dhl-bob-group">
                        <svg viewBox="0 0 200 200" width="100%" height="100%">
                            <defs>
                                <linearGradient id="dhlHullWaterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="var(--dhl-water-bright)" />
                                    <stop offset="100%" stopColor="var(--dhl-water-deep)" />
                                </linearGradient>
                            </defs>

                            {/* boat hull */}
                            <path d="M30 132 Q100 168 170 132 L158 112 Q100 128 42 112 Z" fill="var(--dhl-wood-dark)" />
                            <path d="M34 128 Q100 158 166 128 L156 110 Q100 124 44 110 Z" fill="var(--dhl-wood)" />
                            <path d="M44 110 Q100 124 156 110" fill="none" stroke="var(--dhl-wood-light)" strokeWidth={2.5} opacity={0.6} />

                            {/* waterline: lower hull sits beneath the surface */}
                            <path d="M30 132 Q100 148 170 132 Q100 168 30 132 Z" fill="url(#dhlHullWaterGrad)" opacity={0.62} />
                            <path
                                d="M30 132 Q100 148 170 132"
                                fill="none"
                                stroke="rgba(255,255,255,0.55)"
                                strokeWidth={1.8}
                                strokeLinecap="round"
                                opacity={0.75}
                            />
                            <ellipse cx={32} cy={131} rx={7} ry={2.4} fill="rgba(255,255,255,0.3)" />
                            <ellipse cx={168} cy={131} rx={7} ry={2.4} fill="rgba(255,255,255,0.3)" />

                            {/* father figure */}
                            <g transform="translate(100,72)">
                                <g className="dhl-torso-breathe">
                                    <path d="M-22 8 Q-26 46 -18 58 L18 58 Q26 46 22 8 Q0 -4 -22 8Z" fill="var(--dhl-shirt)" />
                                    <path d="M-22 8 Q-26 46 -18 58 L-6 58 Q-10 30 -14 8Z" fill="var(--dhl-shirt-dark)" opacity={0.35} />
                                    <g className="dhl-collar-sway">
                                        <path d="M-10 4 L0 14 L10 4 L4 -2 L-4 -2 Z" fill="var(--dhl-cream)" opacity={0.9} />
                                    </g>
                                </g>

                                {/* far arm (still, resting on gunwale) */}
                                <path d="M-20 20 Q-34 30 -30 44" stroke="var(--dhl-shirt)" strokeWidth={9} strokeLinecap="round" fill="none" />
                                <circle cx={-30} cy={44} r={5} fill="var(--dhl-skin)" />

                                {/* head */}
                                <circle cx={0} cy={-14} r={16} fill="var(--dhl-skin)" />
                                <circle cx={-15} cy={-12} r={3} fill="var(--dhl-skin)" />
                                <circle cx={15} cy={-12} r={3} fill="var(--dhl-skin)" />
                                <path d="M-7 -8 Q0 -2 7 -8" stroke="#7a4a30" strokeWidth={1.8} fill="none" strokeLinecap="round" />
                                <circle cx={-6} cy={-16} r={1.6} fill="#3a2416" />
                                <circle cx={6} cy={-16} r={1.6} fill="#3a2416" />
                                <path d="M-6 -11 Q0 -8 6 -11" stroke="#6b4326" strokeWidth={2.2} fill="none" strokeLinecap="round" />

                                {/* hat */}
                                <g className="dhl-hat-sway">
                                    <ellipse cx={0} cy={-27} rx={19} ry={4.4} fill="var(--dhl-hat-dark)" />
                                    <path d="M-11 -27 Q0 -46 11 -27 Q0 -32 -11 -27Z" fill="var(--dhl-hat)" />
                                    <ellipse cx={0} cy={-27} rx={10} ry={2.4} fill="var(--dhl-hat-dark)" opacity={0.5} />
                                </g>

                                {/* near arm + paddle (animated) */}
                                <g className="dhl-arm-group">
                                    <path d="M18 20 Q34 26 40 40" stroke="var(--dhl-shirt)" strokeWidth={10} strokeLinecap="round" fill="none" />
                                </g>
                                <g className="dhl-paddle-group">
                                    <circle cx={40} cy={40} r={5.4} fill="var(--dhl-skin)" />
                                    <rect x={38} y={6} width={4.4} height={70} rx={2.2} fill="var(--dhl-wood-light)" />
                                    <ellipse cx={40} cy={4} rx={9} ry={14} fill="var(--dhl-wood)" />
                                </g>
                            </g>
                        </svg>
                    </div>
                </div>
            </div>

            <div className="dhl-sparkles">
                {sparkles.map((s) => (
                    <div
                        key={s.id}
                        className="dhl-spark"
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

            <div className="dhl-vignette" />

            <div className={`dhl-text-overlay ${mounted ? "dhl-in" : ""}`}>
                <h1 className="dhl-title">Daddy&apos;s Home</h1>
                <p className="dhl-message">{message}</p>
            </div>
        </div>
    );
};

export default DaddysHomeLoader;

const CSS = `
  .dhl-scene, .dhl-scene *{ box-sizing:border-box; }
  .dhl-scene{
    --dhl-sky-top:#ffe3ae;
    --dhl-sky-mid:#ffd9a8;
    --dhl-sky-low:#bdeee7;
    --dhl-water-deep:#075a70;
    --dhl-water-mid:#0e93a6;
    --dhl-water-bright:#3fcfc0;
    --dhl-water-hi:#cff7ea;
    --dhl-gold:#f5c36b;
    --dhl-gold-bright:#ffe6a8;
    --dhl-wood-dark:#5e3720;
    --dhl-wood:#96633a;
    --dhl-wood-light:#c69361;
    --dhl-skin:#e7b184;
    --dhl-shirt:#c2543b;
    --dhl-shirt-dark:#933f2c;
    --dhl-hat:#e8c583;
    --dhl-hat-dark:#bd9950;
    --dhl-leaf:#4f8f5b;
    --dhl-cream:#fff8ec;
    --dhl-ink:#3a2416;

    position:fixed; inset:0;
    width:100vw; height:100vh;
    overflow:hidden;
    z-index: 999;
    background:#0e93a6;
    font-family:'Quicksand', sans-serif;
  }

  /* ---------- SKY ---------- */
  .dhl-sky{
    position:absolute; inset:0;
    background: linear-gradient(180deg, var(--dhl-sky-top) 0%, var(--dhl-sky-mid) 38%, var(--dhl-sky-low) 68%, var(--dhl-water-bright) 100%);
  }

  .dhl-sunburst{
    position:absolute;
    top:14%; left:50%;
    width:140vmax; height:140vmax;
    transform:translate(-50%,-50%);
    background: conic-gradient(from 0deg,
      rgba(255,230,168,0.16) 0deg, rgba(255,230,168,0) 12deg,
      rgba(255,230,168,0.16) 24deg, rgba(255,230,168,0) 36deg,
      rgba(255,230,168,0.16) 48deg, rgba(255,230,168,0) 60deg,
      rgba(255,230,168,0.16) 72deg, rgba(255,230,168,0) 84deg,
      rgba(255,230,168,0.16) 96deg, rgba(255,230,168,0) 108deg,
      rgba(255,230,168,0.16) 120deg, rgba(255,230,168,0) 132deg,
      rgba(255,230,168,0.16) 144deg, rgba(255,230,168,0) 156deg,
      rgba(255,230,168,0.16) 168deg, rgba(255,230,168,0) 180deg,
      rgba(255,230,168,0.16) 192deg, rgba(255,230,168,0) 204deg,
      rgba(255,230,168,0.16) 216deg, rgba(255,230,168,0) 228deg,
      rgba(255,230,168,0.16) 240deg, rgba(255,230,168,0) 252deg,
      rgba(255,230,168,0.16) 264deg, rgba(255,230,168,0) 276deg,
      rgba(255,230,168,0.16) 288deg, rgba(255,230,168,0) 300deg,
      rgba(255,230,168,0.16) 312deg, rgba(255,230,168,0) 324deg,
      rgba(255,230,168,0.16) 336deg, rgba(255,230,168,0) 348deg, rgba(255,230,168,0.16) 360deg);
    mix-blend-mode:screen;
    animation: dhl-rayRotate 90s linear infinite;
    opacity:0.7;
    pointer-events:none;
  }
  @keyframes dhl-rayRotate{ to{ transform:translate(-50%,-50%) rotate(360deg); } }

  .dhl-sun-glow{
    position:absolute; top:16%; left:50%;
    width:34vmin; height:34vmin;
    transform:translate(-50%,-50%);
    background: radial-gradient(circle, rgba(255,236,190,0.95) 0%, rgba(255,222,150,0.55) 32%, rgba(255,222,150,0) 70%);
    filter:blur(2px);
    animation: dhl-sunPulse 6s ease-in-out infinite;
    pointer-events:none;
  }
  @keyframes dhl-sunPulse{ 0%,100%{opacity:0.85; transform:translate(-50%,-50%) scale(1);} 50%{opacity:1; transform:translate(-50%,-50%) scale(1.06);} }

  .dhl-cloud{
    position:absolute;
    background: radial-gradient(ellipse at 30% 30%, #fff 0%, rgba(255,255,255,0.85) 55%, rgba(255,255,255,0.55) 100%);
    border-radius:50%;
    filter:blur(0.5px);
    opacity:0.85;
    box-shadow: 0 10px 30px rgba(180,140,90,0.12);
  }
  .dhl-cloud::before, .dhl-cloud::after{
    content:''; position:absolute; background:inherit; border-radius:50%;
  }
  .dhl-c1{ width:12vmin; height:5vmin; top:10%; left:-15vmin; animation: dhl-drift1 70s linear infinite; }
  .dhl-c1::before{ width:8vmin; height:8vmin; top:-3.5vmin; left:1.5vmin; }
  .dhl-c1::after{ width:6vmin; height:6vmin; top:-1.5vmin; left:7vmin; }
  .dhl-c2{ width:9vmin; height:4vmin; top:18%; left:-12vmin; animation: dhl-drift2 95s linear infinite; animation-delay:-20s; opacity:0.7;}
  .dhl-c2::before{ width:6vmin; height:6vmin; top:-2.6vmin; left:1vmin; }
  .dhl-c2::after{ width:4.5vmin; height:4.5vmin; top:-1vmin; left:5vmin; }
  .dhl-c3{ width:15vmin; height:6vmin; top:7%; left:-18vmin; animation: dhl-drift1 120s linear infinite; animation-delay:-45s; opacity:0.6;}
  .dhl-c3::before{ width:9vmin; height:9vmin; top:-4vmin; left:2vmin; }
  .dhl-c3::after{ width:7vmin; height:7vmin; top:-1.6vmin; left:9vmin; }
  @keyframes dhl-drift1{ from{ transform:translateX(0); } to{ transform:translateX(130vw); } }
  @keyframes dhl-drift2{ from{ transform:translateX(0); } to{ transform:translateX(130vw); } }

  .dhl-bird{
    position:absolute; width:2.6vmin; height:1.4vmin; top:24%; left:-5vmin;
    offset-path: path('M0,0 C 200,-40 500,10 900,-30 S 1400,20 1700,-10');
    offset-rotate: 0deg;
    animation: dhl-birdFly 26s linear infinite;
    opacity:0;
  }
  .dhl-bird svg{ width:100%; height:100%; }
  .dhl-bird.dhl-b2{ animation-delay:9s; top:29%; offset-path: path('M0,0 C 220,30 480,-20 850,20 S 1350,-10 1650,15'); }
  .dhl-bird.dhl-b3{ animation-delay:17s; top:20%; offset-path: path('M0,0 C 250,-20 520,25 880,-15 S 1380,30 1700,0'); }
  @keyframes dhl-birdFly{
    0%{ offset-distance:0%; opacity:0; }
    6%{ opacity:0.85; }
    92%{ opacity:0.85; }
    100%{ offset-distance:100%; opacity:0; }
  }
  .dhl-wing{ animation: dhl-flap 0.55s ease-in-out infinite alternate; transform-origin:50% 50%; }
  @keyframes dhl-flap{ from{ transform:scaleY(1);} to{ transform:scaleY(0.35);} }

  /* ---------- WATER ---------- */
  .dhl-water{
    position:absolute; left:0; right:0; bottom:0; top:56%;
    background: linear-gradient(180deg, var(--dhl-water-bright) 0%, var(--dhl-water-mid) 45%, var(--dhl-water-deep) 100%);
    overflow:hidden;
  }
  .dhl-water-sheen{
    position:absolute; inset:0;
    background:
      repeating-linear-gradient(115deg,
        rgba(255,255,255,0.10) 0 2px,
        rgba(255,255,255,0) 2px 46px),
      repeating-linear-gradient(70deg,
        rgba(255,255,255,0.06) 0 1px,
        rgba(255,255,255,0) 1px 60px);
    background-size:220% 220%;
    animation: dhl-sheenMove 14s linear infinite;
    mix-blend-mode:screen;
    opacity:0.8;
  }
  @keyframes dhl-sheenMove{ from{ background-position:0 0, 0 0; } to{ background-position:-600px 300px, 400px -260px; } }

  .dhl-sun-path{
    position:absolute; top:0; left:50%; width:26vmin; height:100%;
    transform:translateX(-50%);
    background: linear-gradient(180deg, rgba(255,236,190,0.75), rgba(255,236,190,0.1) 60%, rgba(255,236,190,0) 100%);
    filter: blur(6px);
    mix-blend-mode:screen;
    animation: dhl-sunShimmer 3.4s ease-in-out infinite;
  }
  @keyframes dhl-sunShimmer{ 0%,100%{ opacity:0.6; width:24vmin;} 50%{ opacity:0.95; width:29vmin;} }

  .dhl-wave-edge{
    position:absolute; top:-2vmin; left:0; width:220%; height:6vmin;
    animation: dhl-waveScroll 18s linear infinite;
  }
  .dhl-wave-edge svg{ width:50%; height:100%; float:left; }
  @keyframes dhl-waveScroll{ from{ transform:translateX(0); } to{ transform:translateX(-50%); } }

  .dhl-sparkles{ position:absolute; inset:0; pointer-events:none; }
  .dhl-spark{
    position:absolute; border-radius:50%;
    background: radial-gradient(circle, #fff 0%, rgba(255,255,255,0) 70%);
    animation-name: dhl-twinkle;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
  }
  @keyframes dhl-twinkle{ 0%,100%{ opacity:0; transform:scale(0.4);} 50%{ opacity:0.9; transform:scale(1);} }

  .dhl-float-item{ position:absolute; opacity:0; }

  .dhl-lily{ width:5vmin; }
  .dhl-l1{ top:64%; left:20%; offset-path: path('M0,0 C40,10 20,40 60,55 C100,70 70,95 90,120'); animation: dhl-floatPath 40s ease-in-out infinite; }
  .dhl-l2{ top:70%; left:74%; offset-path: path('M0,0 C-30,15 10,35 -20,60 C-50,85 -10,100 -40,130'); animation: dhl-floatPath 46s ease-in-out infinite; animation-delay:-12s; }
  .dhl-l3{ top:80%; left:38%; offset-path: path('M0,0 C25,-10 45,15 70,5 C95,-5 110,20 140,10'); animation: dhl-floatPath 52s ease-in-out infinite; animation-delay:-28s; }
  @keyframes dhl-floatPath{
    0%{ offset-distance:0%; opacity:0; }
    8%{ opacity:0.95; }
    92%{ opacity:0.95; }
    100%{ offset-distance:100%; opacity:0; }
  }

  .dhl-duck{ width:4.4vmin; }
  .dhl-d1{ top:62%; left:8%; offset-path: path('M0,0 C 60,-6 130,6 200,-4 C 270,-12 330,4 400,-2'); animation: dhl-duckGo 34s ease-in-out infinite; }
  .dhl-d2{ top:60%; left:12%; offset-path: path('M0,0 C 55,4 125,-4 195,6 C 260,14 320,0 385,8'); animation: dhl-duckGo 34s ease-in-out infinite; animation-delay:-1.4s; }
  .dhl-d3{ top:76%; left:60%; offset-path: path('M0,0 C -50,-8 -110,4 -170,-6 C -230,-14 -280,2 -340,-4'); animation: dhl-duckGoRev 42s ease-in-out infinite; animation-delay:-6s; }
  @keyframes dhl-duckGo{
    0%{ offset-distance:0%; opacity:0; }
    10%{ opacity:0.95; }
    90%{ opacity:0.95; }
    100%{ offset-distance:100%; opacity:0; }
  }
  @keyframes dhl-duckGoRev{
    0%{ offset-distance:100%; opacity:0; }
    10%{ opacity:0.95; }
    90%{ opacity:0.95; }
    100%{ offset-distance:0%; opacity:0; }
  }
  .dhl-duck-bob{ animation: dhl-bobTiny 1.6s ease-in-out infinite; }
  @keyframes dhl-bobTiny{ 0%,100%{ transform:translateY(0);} 50%{ transform:translateY(-2%);} }

  .dhl-fish{ width:3vmin; opacity:0; }
  .dhl-f1{ top:58%; left:30%; offset-path: path('M0,0 C 40,10 90,-8 140,4'); animation: dhl-fishSwim 6s ease-in-out infinite; animation-delay:1s; }
  .dhl-f2{ top:84%; left:55%; offset-path: path('M0,0 C -35,-8 -80,6 -120,-6'); animation: dhl-fishSwim 7s ease-in-out infinite; animation-delay:4s; }
  .dhl-f3{ top:90%; left:24%; offset-path: path('M0,0 C 30,8 70,-6 110,6'); animation: dhl-fishSwim 8s ease-in-out infinite; animation-delay:6.5s; }
  @keyframes dhl-fishSwim{
    0%{ offset-distance:0%; opacity:0; }
    8%{ opacity:0.55; }
    45%{ opacity:0.55; }
    55%{ opacity:0; }
    100%{ offset-distance:100%; opacity:0; }
  }

  .dhl-splash{ position:absolute; width:3vmin; height:3vmin; opacity:0; animation: dhl-splashPop 9s ease-in-out infinite; }
  .dhl-sp1{ top:58%; left:31%; animation-delay:6.5s; }
  .dhl-sp2{ top:83%; left:56%; animation-delay:10s; }
  .dhl-sp3{ top:89%; left:25%; animation-delay:13.8s; }
  @keyframes dhl-splashPop{
    0%,53%{ opacity:0; transform:scale(0.3);}
    55%{ opacity:0.9; transform:scale(1);}
    62%{ opacity:0; transform:scale(1.5);}
    100%{ opacity:0; }
  }

  .dhl-dragonfly{ width:2.6vmin; opacity:0; }
  .dhl-dg1{ top:56%; left:10%; offset-path: path('M0,0 C 80,-30 160,20 260,-10 C 340,-32 420,10 520,-15'); animation: dhl-dragGo 16s ease-in-out infinite; }
  .dhl-dg2{ top:66%; left:70%; offset-path: path('M0,0 C -60,20 -140,-15 -220,10 C -300,28 -360,-5 -440,15'); animation: dhl-dragGo 19s ease-in-out infinite; animation-delay:-5s; }
  @keyframes dhl-dragGo{
    0%{ offset-distance:0%; opacity:0; }
    6%{ opacity:0.9; }
    94%{ opacity:0.9; }
    100%{ offset-distance:100%; opacity:0; }
  }
  .dhl-wing-flutter{ animation: dhl-flutter 0.12s linear infinite alternate; transform-origin:50% 50%; }
  @keyframes dhl-flutter{ from{ transform:scaleX(1);} to{ transform:scaleX(0.55);} }

  .dhl-leaf{ width:2.6vmin; opacity:0; }
  .dhl-lf1{ top:63%; left:44%; offset-path: path('M0,0 C 20,20 -10,45 15,70 C 40,95 5,115 25,140'); animation: dhl-leafGo 30s linear infinite; }
  .dhl-lf2{ top:72%; left:66%; offset-path: path('M0,0 C -15,18 12,38 -8,60 C -28,82 0,100 -18,125'); animation: dhl-leafGo 34s linear infinite; animation-delay:-10s; }
  @keyframes dhl-leafGo{
    0%{ offset-distance:0%; opacity:0; offset-rotate:0deg; }
    10%{ opacity:0.9; }
    90%{ opacity:0.9; }
    100%{ offset-distance:100%; opacity:0; }
  }

  .dhl-bubble{ position:absolute; border-radius:50%; background:radial-gradient(circle at 35% 30%, rgba(255,255,255,0.9), rgba(255,255,255,0.15) 60%, rgba(255,255,255,0) 75%); opacity:0; }
  .dhl-bb1{ width:0.9vmin; height:0.9vmin; top:78%; left:47%; animation: dhl-bubbleUp 5s ease-in infinite; animation-delay:0.5s; }
  .dhl-bb2{ width:0.6vmin; height:0.6vmin; top:80%; left:49%; animation: dhl-bubbleUp 4.2s ease-in infinite; animation-delay:1.6s; }
  .dhl-bb3{ width:1.1vmin; height:1.1vmin; top:82%; left:52%; animation: dhl-bubbleUp 5.6s ease-in infinite; animation-delay:2.7s; }
  @keyframes dhl-bubbleUp{
    0%{ opacity:0; transform:translateY(0) scale(0.6);}
    12%{ opacity:0.8; }
    85%{ opacity:0.5; }
    100%{ opacity:0; transform:translateY(-16vmin) scale(1.1);}
  }

  .dhl-reed{ position:absolute; bottom:0; width:0.5vmin; height:9vmin; background:linear-gradient(180deg, var(--dhl-leaf), #2f5a3a); border-radius:2vmin 2vmin 0 0; transform-origin:bottom center; animation: dhl-reedSway 3.6s ease-in-out infinite; opacity:0.85;}
  .dhl-rd1{ left:4%; height:8vmin; animation-delay:0s;}
  .dhl-rd2{ left:5.4%; height:10vmin; animation-delay:-1.2s;}
  .dhl-rd3{ left:93%; height:9vmin; animation-delay:-2s;}
  .dhl-rd4{ left:95%; height:7vmin; animation-delay:-0.6s;}
  @keyframes dhl-reedSway{ 0%,100%{ transform:rotate(-4deg);} 50%{ transform:rotate(4deg);} }

  /* ---------- BOAT + FATHER (hero) ---------- */
  .dhl-boat-wrap{
    position:absolute; top:63%; left:50%;
    width:26vmin; height:26vmin;
    transform:translate(-50%,-50%);
    filter: drop-shadow(0 1.2vmin 1.4vmin rgba(10,40,45,0.35));
  }
  .dhl-bob-group{
    width:100%; height:100%;
    animation: dhl-boatBob 4.2s cubic-bezier(.45,.05,.55,.95) infinite;
    transform-origin:50% 60%;
  }
  @keyframes dhl-boatBob{
    0%{ transform: translateY(0) rotate(-1.4deg); }
    25%{ transform: translateY(-1.1vmin) rotate(0.6deg); }
    50%{ transform: translateY(0.3vmin) rotate(1.6deg); }
    75%{ transform: translateY(-0.8vmin) rotate(-0.4deg); }
    100%{ transform: translateY(0) rotate(-1.4deg); }
  }

  .dhl-paddle-group{
    transform-origin: 63% 46%;
    animation: dhl-paddleStroke 5s ease-in-out infinite;
  }
  @keyframes dhl-paddleStroke{
    0%,72%{ transform: rotate(-6deg); }
    80%{ transform: rotate(20deg); }
    88%{ transform: rotate(34deg); }
    94%{ transform: rotate(6deg); }
    100%{ transform: rotate(-6deg); }
  }

  .dhl-arm-group{
    transform-origin: 60% 47%;
    animation: dhl-armStroke 5s ease-in-out infinite;
  }
  @keyframes dhl-armStroke{
    0%,72%{ transform: rotate(-4deg); }
    80%{ transform: rotate(10deg); }
    88%{ transform: rotate(16deg); }
    94%{ transform: rotate(2deg); }
    100%{ transform: rotate(-4deg); }
  }

  .dhl-torso-breathe{ animation: dhl-breathe 3.6s ease-in-out infinite; transform-origin:50% 100%; }
  @keyframes dhl-breathe{ 0%,100%{ transform:scaleY(1);} 50%{ transform:scaleY(1.025);} }

  .dhl-hat-sway{ animation: dhl-hatSway 3.2s ease-in-out infinite; transform-origin:50% 90%; }
  @keyframes dhl-hatSway{ 0%,100%{ transform:rotate(-2deg);} 50%{ transform:rotate(2.5deg);} }

  .dhl-collar-sway{ animation: dhl-hatSway 3.2s ease-in-out infinite; animation-delay:-0.3s; transform-origin:50% 100%; }

  .dhl-ripple{
    fill:none; stroke:rgba(255,255,255,0.55); stroke-width:2.2;
    transform-origin: 50% 50%;
    animation: dhl-rippleOut 5s ease-out infinite;
    opacity:0;
  }
  .dhl-ripple.dhl-r2{ animation-delay:0.28s; }
  .dhl-ripple.dhl-r3{ animation-delay:0.56s; }
  @keyframes dhl-rippleOut{
    0%,78%{ transform:scale(0.15); opacity:0; }
    82%{ opacity:0.65; }
    100%{ transform:scale(2.6); opacity:0; }
  }

  /* ---------- TEXT OVERLAY ---------- */
  .dhl-text-overlay{
    position:absolute; left:50%; bottom:7%;
    transform:translateX(-50%);
    text-align:center;
    width:min(90vw, 640px);
    pointer-events:none;
    opacity:0;
    transition: opacity 1.1s ease-out, transform 1.1s ease-out;
  }
  .dhl-text-overlay.dhl-in{
    opacity:1;
  }
  .dhl-title{
    margin:0;
    font-family:'Baloo 2', cursive;
    font-weight:700;
    font-size:clamp(2.2rem, 5.6vw, 3.6rem);
    color:var(--dhl-cream);
    letter-spacing:0.5px;
    text-shadow: 0 0.3vmin 0 rgba(147,63,44,0.35), 0 1.2vmin 2vmin rgba(40,20,10,0.28);
    animation: dhl-titleGlow 4s ease-in-out infinite;
  }
  @keyframes dhl-titleGlow{
    0%,100%{ text-shadow: 0 0.3vmin 0 rgba(147,63,44,0.35), 0 1.2vmin 2vmin rgba(40,20,10,0.28), 0 0 2vmin rgba(255,225,160,0.0); }
    50%{ text-shadow: 0 0.3vmin 0 rgba(147,63,44,0.35), 0 1.2vmin 2vmin rgba(40,20,10,0.28), 0 0 3vmin rgba(255,225,160,0.55); }
  }

  .dhl-message{
    margin:0.6em 0 0 0;
    font-family:'Quicksand', sans-serif;
    font-weight:500;
    font-size:clamp(0.95rem, 2vw, 1.15rem);
    color:var(--dhl-cream);
    text-shadow: 0 0.2vmin 1vmin rgba(30,15,8,0.35);
    letter-spacing:0.3px;
    opacity:0.95;
  }

  .dhl-vignette{
    position:absolute; inset:0; pointer-events:none;
    background: radial-gradient(ellipse at 50% 55%, rgba(0,0,0,0) 45%, rgba(6,30,35,0.28) 100%);
  }

  @media (prefers-reduced-motion: reduce){
    .dhl-scene *{ animation-duration:0.001ms !important; animation-iteration-count:1 !important; transition-duration:0.001ms !important; }
  }
`;