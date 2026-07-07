interface LogoProps {
    size?: number;
    showWordmark?: boolean;
    className?: string;
}

export function Logo({ size = 44, showWordmark = true, className = '' }: LogoProps) {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <svg width={size} height={size} viewBox="0 0 140 130" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="dh-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#e0c497" />
                        <stop offset="100%" stopColor="#c9a87c" />
                    </linearGradient>
                </defs>
                <g transform="translate(70,65)">
                    <path d="M -55 8 L 0 -45 L 55 8 L 55 52 L -55 52 Z" fill="none" stroke="url(#dh-gold)" strokeWidth="3" />
                    <line x1="-55" y1="8" x2="0" y2="-45" stroke="url(#dh-gold)" strokeWidth="3" />
                    <line x1="55" y1="8" x2="0" y2="-45" stroke="url(#dh-gold)" strokeWidth="3" />
                    <circle cx="0" cy="14" r="24" fill="#0a0a0c" stroke="#5eb3ac" strokeWidth="2.5" />
                    <line x1="0" y1="14" x2="0" y2="0" stroke="#5eb3ac" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="0" y1="14" x2="11" y2="14" stroke="#5eb3ac" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="0" cy="14" r="2" fill="#5eb3ac" />
                </g>
            </svg>

            {showWordmark && (
                <div>
                    <p className="text-[17px] font-medium text-[#e8e8ea] leading-none" style={{ fontFamily: 'Georgia, serif' }}>
                        Daddy's Home
                    </p>
                    <p className="text-[9px] text-[#9a9aa3] tracking-[0.2em] mt-0.5">
                        BOOKING · MADE · SIMPLE
                    </p>
                </div>
            )}
        </div>
    );
}