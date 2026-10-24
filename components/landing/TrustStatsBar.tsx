"use client";

import Image from "next/image";
import { HOME_TRUST_STATS } from "@/lib/home-trust-stats";
import { getDictionary, t } from "@/lib/i18n/dictionaries";
import { useLocaleState } from "@/lib/i18n/use-locale";

type TrustStatsBarProps = {
  className?: string;
};

/**
 * Compact trust strip under the homepage hero.
 */
export function TrustStatsBar({ className = "" }: TrustStatsBarProps) {
  const [locale] = useLocaleState();
  const dict = getDictionary(locale);

  return (
    <div
      className={`trust-stats-intro${className ? ` ${className}` : ""}`}
      aria-label={dict.trustStats.aria}
    >
      <div className="trust-stats-grid trust-stats-grid--compact">
        {HOME_TRUST_STATS.map((item) => (
          <article key={item.id} className="trust-stat-card trust-stat-card--compact">
            <div className="trust-stat-card__thumb">
              <Image
                src={item.image}
                alt={item.imageAlt}
                width={88}
                height={88}
                className="trust-stat-card__icon"
                sizes="44px"
              />
            </div>
            <div className="trust-stat-card__body">
              <strong>{t(dict, `trustStats.${item.id}Value`)}</strong>
              <span>{t(dict, `trustStats.${item.id}Label`)}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
