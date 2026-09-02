import Image from "next/image";
import { HOME_TRUST_STATS } from "@/lib/home-trust-stats";

export function TrustStatsBar() {
  return (
    <div className="trust-stats-intro" aria-label="NoorLink highlights">
      <div className="trust-stats-grid trust-stats-grid--compact">
        {HOME_TRUST_STATS.map((item) => (
          <article key={item.id} className="trust-stat-card trust-stat-card--compact">
            <div className="trust-stat-card__thumb">
              <Image
                src={item.image}
                alt={item.imageAlt}
                width={40}
                height={40}
                className="trust-stat-card__icon"
              />
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
