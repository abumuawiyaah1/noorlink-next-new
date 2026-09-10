import { HOME_TRUST_STATS } from "@/lib/home-trust-stats";

type TrustStatsBarProps = {
  className?: string;
};

const TRUST_ICONS: Record<(typeof HOME_TRUST_STATS)[number]["id"], string> = {
  countries: "fas fa-globe-americas",
  delivery: "fas fa-qrcode",
  hotspot: "fas fa-wifi",
  support: "fab fa-whatsapp",
};

/**
 * Compact trust strip under the homepage hero.
 * Uses crisp Font Awesome icons — photo thumbs were unreadable at 44px and looked like grey boxes.
 */
export function TrustStatsBar({ className = "" }: TrustStatsBarProps) {
  return (
    <div
      className={`trust-stats-intro${className ? ` ${className}` : ""}`}
      aria-label="NoorLink highlights"
    >
      <div className="trust-stats-grid trust-stats-grid--compact">
        {HOME_TRUST_STATS.map((item) => (
          <article key={item.id} className="trust-stat-card trust-stat-card--compact">
            <div
              className="trust-stat-card__thumb trust-stat-card__thumb--icon"
              aria-hidden="true"
            >
              <i className={TRUST_ICONS[item.id]} />
            </div>
            <div className="trust-stat-card__body">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
