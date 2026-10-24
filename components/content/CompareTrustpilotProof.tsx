"use client";

import {
  TRUSTPILOT_PROFILE_URL,
  TRUSTPILOT_STAR_DISPLAY,
  TRUSTPILOT_TRUST_LABEL,
  TRUSTPILOT_TRUST_SCORE,
} from "@/lib/review-links";
import { TRUSTPILOT_QUOTES } from "@/lib/trustpilot-quotes";
import { getDictionary, t } from "@/lib/i18n/dictionaries";
import { useLocaleState } from "@/lib/i18n/use-locale";

/** Prefer pilgrimage / hotspot quotes on the compare page. */
const COMPARE_QUOTE_NAMES = ["Kabiru", "Omar", "Hoxe"] as const;

function Stars({ count, size = "md" }: { count: number; size?: "sm" | "md" }) {
  const filled = Math.max(0, Math.min(5, Math.round(count)));
  return (
    <span
      className={`esim-compare-trust__stars esim-compare-trust__stars--${size}`}
      aria-hidden="true"
    >
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={`esim-compare-trust__star${i < filled ? " is-on" : ""}`}
        >
          ★
        </span>
      ))}
    </span>
  );
}

export function CompareTrustpilotProof() {
  const [locale] = useLocaleState();
  const dict = getDictionary(locale);
  const c = dict.comparePage;

  const quotes = COMPARE_QUOTE_NAMES.map((name) =>
    TRUSTPILOT_QUOTES.find((quote) => quote.name === name),
  ).filter((quote): quote is (typeof TRUSTPILOT_QUOTES)[number] =>
    Boolean(quote),
  );

  return (
    <section
      id="trustpilot"
      className="esim-compare-trust"
      aria-labelledby="esim-compare-trust-heading"
    >
      <div className="content-section-head">
        <span className="content-kicker">{c.trustKicker}</span>
        <h2 id="esim-compare-trust-heading">{c.trustTitle}</h2>
        <p>{c.trustLede}</p>
      </div>

      <p
        className="esim-compare-trust__score"
        aria-label={t(dict, "comparePage.trustScoreAria", {
          label: TRUSTPILOT_TRUST_LABEL,
          score: TRUSTPILOT_TRUST_SCORE,
        })}
      >
        <Stars count={TRUSTPILOT_STAR_DISPLAY} size="md" />
        <span className="esim-compare-trust__score-value">
          {TRUSTPILOT_TRUST_SCORE}
        </span>
        <span className="esim-compare-trust__score-label">
          {t(dict, "comparePage.trustOnTrustpilot", {
            label: TRUSTPILOT_TRUST_LABEL,
          })}
        </span>
      </p>

      <div className="esim-compare-trust__grid">
        {quotes.map((quote) => (
          <article
            key={`${quote.name}-${quote.country}`}
            className="esim-compare-trust__card"
          >
            <div className="esim-compare-trust__card-top">
              <span className="esim-compare-trust__avatar" aria-hidden="true">
                {quote.initial}
              </span>
              <div>
                <p className="esim-compare-trust__name">{quote.name}</p>
                <p className="esim-compare-trust__country">
                  <span aria-hidden="true">{quote.flag}</span> {quote.country}
                </p>
              </div>
            </div>
            <p
              className="esim-compare-trust__card-stars"
              aria-label={t(dict, "comparePage.starsAria", {
                stars: quote.stars,
              })}
            >
              <Stars count={quote.stars} size="sm" />
            </p>
            {/* Authentic Trustpilot quote bodies stay in English. */}
            <p className="esim-compare-trust__preview">“{quote.preview}”</p>
          </article>
        ))}
      </div>

      <p className="esim-compare-trust__footer">
        <a
          href={TRUSTPILOT_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          {c.readAllReviews}
        </a>
      </p>
    </section>
  );
}
