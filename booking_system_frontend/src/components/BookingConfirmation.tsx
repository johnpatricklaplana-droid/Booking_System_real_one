import { Calendar, Clock, Users, X, Waves } from "lucide-react";
import type { ServiceResponse, Staff, Time } from "../interfaces/Types";
import { SpinnerLoading } from "./SpinnerLoading";

export default function DaddysHomeBookingTicket({ 
    service,
    staff,
    date,
    time,
    onClick,
    onClose,
    sending,
}: Readonly<{
    service: ServiceResponse,
    staff: Staff,
    date: Date,
    time: Time,
    onClick: any,
    onClose: any,
    sending: any;
}> ) {

    return (
        <div className="dht-overlay" role="dialog" aria-modal="true">
            <div className="dht-scrim" />

            <div className="dht-card">
                <button onClick={onClose} className="dht-close" aria-label="Close">
                    <X size={16} strokeWidth={2.5} />
                </button>

                <div className="dht-foilsweep" />

                {/* Header */}
                <div className="dht-header">
                    <span className="dht-eyebrow">
                        <Waves size={12} strokeWidth={2.5} />
                        Daddy&apos;s Home &middot; Booking Pass
                    </span>
                </div>

                {/* Seal + service identity */}
                <div className="dht-identity">
                    <div className="dht-seal">
                        <img src={service?.serviceLogoUrl} alt="fjalkfj" />
                    </div>

                    <div className="dht-identity-text">
                        <h3 className="dht-service">{service?.serviceName}</h3>
                        <div className="dht-staff">
                            <span className="dht-staff-avatar dht-staff-avatar--fallback">
                                {staff.fullName}
                            </span>
                            <span>{staff?.fullName}</span>
                        </div>
                    </div>
                </div>

                {/* Perforated divider */}
                <div className="dht-perf">
                    <span className="dht-notch dht-notch--left" />
                    <span className="dht-perf-line" />
                    <span className="dht-notch dht-notch--right" />
                </div>

                {/* Stub data grid */}
                <div className="dht-grid">
                    <div className="dht-stat">
                        <span className="dht-stat-label">
                            <Calendar size={12} strokeWidth={2.5} /> Date
                        </span>
                        <span className="dht-stat-value">{date?.toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}</span>
                        <span className="dht-stat-sub">{date?.toLocaleDateString('en-US', { year: 'numeric' })}</span>
                    </div>
                    <div className="dht-stat">
                        <span className="dht-stat-label">Day</span>
                        <span className="dht-stat-value">{date?.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                        <span className="dht-stat-sub">&nbsp;</span>
                    </div>
                    <div className="dht-stat">
                        <span className="dht-stat-label">
                            <Clock size={12} strokeWidth={2.5} /> Time
                        </span>
                        <span className="dht-stat-value">{time?.label}</span>
                        <span className="dht-stat-sub">&nbsp;</span>
                    </div>
                    <div className="dht-stat">
                        <span className="dht-stat-label">
                            <Users size={12} strokeWidth={2.5} /> Guests
                        </span>
                        <span className="dht-stat-value">{service?.capacity}</span>
                        <span className="dht-stat-sub">{service.capacity === 1 ? "person" : "people"}</span>
                    </div>
                </div>

                <div className="dht-price">
                    <span>Total</span>
                    <span className="dht-price-value">₱{service?.price.toLocaleString()}</span>
                </div>

                <button
                    className={`dht-cta`}
                    onClick={() => {
                      onClick();
                    }}
                    disabled={sending}
                >  
                  {sending
                    ? <SpinnerLoading color="black" />
                    : 'Confirm Booking'
                  }
                </button>
            </div>

            <style>{`
        .dht-overlay {
          --gold: #D4AF6A;
          --gold-light: #FBE7A8;
          --gold-dim: #8A6D35;
          --teal: #2DD4BF;
          --bg: #0B1220;
          --surface: #131B2E;
          --border: rgba(255,255,255,0.10);
          --text-1: #F5F1E6;
          --text-2: #B9C2D0;
          --text-3: #7C879B;
          --radius: 16px;

          position: fixed;
          inset: 0;
          z-index: 60;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .dht-scrim {
          position: absolute;
          inset: 0;
          background: radial-gradient(120% 100% at 50% 0%, rgba(11,18,32,0.75), rgba(5,8,15,0.92));
          backdrop-filter: blur(6px);
        }

        .dht-card {
          position: relative;
          width: 100%;
          max-width: 380px;
          background: linear-gradient(180deg, var(--surface), #0e1526);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          box-shadow:
            0 0 0 1px rgba(212,175,106,0.15),
            0 30px 60px -20px rgba(0,0,0,0.7),
            0 0 60px -10px rgba(212,175,106,0.15);
          overflow: hidden;
          animation: dht-rise 480ms cubic-bezier(0.16,1,0.3,1) both;
        }

        @media (prefers-reduced-motion: reduce) {
          .dht-card { animation: dht-fade 200ms ease both; }
        }

        @keyframes dht-rise {
          from { opacity: 0; transform: translateY(28px) scale(0.94) rotateX(6deg); }
          to   { opacity: 1; transform: translateY(0) scale(1) rotateX(0); }
        }
        @keyframes dht-fade {
          from { opacity: 0; } to { opacity: 1; }
        }

        .dht-close {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 28px;
          height: 28px;
          display: grid;
          place-items: center;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: rgba(255,255,255,0.04);
          color: var(--text-2);
          cursor: pointer;
          z-index: 2;
        }
        .dht-close:hover { color: var(--text-1); border-color: var(--gold); }

        .dht-foilsweep {
          position: absolute;
          top: 0; left: -60%;
          width: 40%;
          height: 100%;
          background: linear-gradient(115deg, transparent, rgba(255,255,255,0.10), transparent);
          transform: skewX(-18deg);
          animation: dht-sweep 3.2s ease-in-out 0.4s 1;
          pointer-events: none;
        }
        @keyframes dht-sweep {
          to { left: 140%; }
        }

        .dht-header { padding: 18px 24px 0; }
        .dht-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 10.5px;
          letter-spacing: 0.14em;
          font-weight: 700;
          color: var(--gold);
          text-transform: uppercase;
        }

        .dht-identity {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 24px 20px;
        }

        .dht-seal { width: 64px; height: 64px; flex-shrink: 0; }
        .dht-seal-svg { width: 100%; height: 100%; }
        .dht-seal-arctext {
          font-size: 6.2px;
          font-weight: 700;
          letter-spacing: 0.12em;
          fill: rgba(19,27,46,0.55);
        }

        .dht-identity-text { min-width: 0; }
        .dht-service {
          font-family: 'Baloo 2', ui-rounded, sans-serif;
          font-size: 17px;
          font-weight: 700;
          color: var(--text-1);
          margin: 0 0 4px;
          line-height: 1.2;
        }
        .dht-staff {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: var(--text-2);
        }
        .dht-staff-avatar {
          width: 20px;
          height: 20px;
          border-radius: 999px;
          object-fit: cover;
          flex-shrink: 0;
        }
        .dht-staff-avatar--fallback {
          display: grid;
          place-items: center;
          background: var(--gold-dim);
          color: var(--gold-light);
          font-size: 10px;
          font-weight: 700;
        }

        .dht-perf {
          position: relative;
          display: flex;
          align-items: center;
          margin: 0 0 18px;
        }
        .dht-perf-line {
          flex: 1;
          height: 0;
          border-top: 1.5px dashed rgba(212,175,106,0.35);
          margin: 0 10px;
        }
        .dht-notch {
          width: 20px;
          height: 20px;
          border-radius: 999px;
          background: var(--bg);
          box-shadow: 0 0 0 1px var(--border) inset;
          flex-shrink: 0;
        }
        .dht-notch--left { margin-left: -10px; }
        .dht-notch--right { margin-right: -10px; }

        .dht-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 4px;
          padding: 0 24px;
        }
        .dht-stat { display: flex; flex-direction: column; gap: 4px; }
        .dht-stat-label {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 9.5px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--teal);
          font-weight: 700;
        }
        .dht-stat-value { font-size: 15px; font-weight: 700; color: var(--text-1); }
        .dht-stat-sub { font-size: 10px; color: var(--text-3); }

        .dht-price {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin: 18px 24px 0;
          padding-top: 14px;
          border-top: 1px solid var(--border);
          font-size: 12px;
          color: var(--text-3);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .dht-price-value {
          font-size: 18px;
          font-weight: 700;
          color: var(--gold);
          letter-spacing: 0;
          text-transform: none;
        }

        .dht-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: calc(100% - 48px);
          margin: 20px 24px 24px;
          padding: 14px;
          border: none;
          border-radius: 12px;
          background: linear-gradient(180deg, var(--gold-light), var(--gold));
          color: #2A2005;
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 0.02em;
          cursor: pointer;
          box-shadow: 0 8px 20px -6px rgba(212,175,106,0.5);
          transition: transform 160ms ease, box-shadow 160ms ease;
        }
        .dht-cta:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 12px 24px -6px rgba(212,175,106,0.6);
        }
        .dht-cta:active:not(:disabled) { transform: translateY(0); }
        .dht-cta--done {
          background: linear-gradient(180deg, var(--teal), #159487);
          color: #04211d;
          cursor: default;
        }
      `}</style>
        </div>
    );
}