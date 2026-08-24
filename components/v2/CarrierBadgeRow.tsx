export function CarrierBadgeRow({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`v2-carrier-badges${compact ? " v2-carrier-badges--compact" : ""}`}
      aria-label="Saudi network partners"
    >
      <span className="v2-carrier-badges__label">Powered in Saudi Arabia by</span>
      <div className="v2-carrier-badges__row">
        <span className="v2-carrier-badge">stc</span>
        <span className="v2-carrier-badge">Mobily</span>
        <span className="v2-carrier-badge">Zain</span>
        <span className="v2-carrier-badge v2-carrier-badge--5g">5G</span>
      </div>
      <p className="v2-carrier-badges__note">Where available · Hotspot enabled on supported plans</p>
    </div>
  );
}
