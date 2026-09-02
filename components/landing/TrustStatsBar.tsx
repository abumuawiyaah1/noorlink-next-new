import Image from "next/image";
import { HOME_TRUST_STATS } from "@/lib/home-trust-stats";

export function TrustStatsBar() {
  return (
    <div className="trust-stats-intro" aria-label="NoorLink highlights">
      <div className="trust-stats-grid trust-stats-grid--cards">
        {HOME_TRUST_STATS.map((item) => (
          <article key={item.id} className="trust-stat-card">
            <div className="trust-stat-card__media">
              <Image
                src={item.image}
                alt={item.imageAlt}
                fill
                sizes="(max-width: 520px) 100vw, (max-width: 900px) 50vw, 25vw"
                className="trust-stat-card__image"
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
