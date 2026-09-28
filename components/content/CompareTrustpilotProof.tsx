import {
  TRUSTPILOT_PROFILE_URL,
  TRUSTPILOT_STAR_DISPLAY,
  TRUSTPILOT_TRUST_LABEL,
  TRUSTPILOT_TRUST_SCORE,
} from "@/lib/review-links";
import { TRUSTPILOT_QUOTES } from "@/lib/trustpilot-quotes";

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
        <span className="content-kicker">Trustpilot reviews</span>
        <h2 id="esim-compare-trust-heading">
          Real travelers, not just a feature chart
        </h2>
        <p>
          Independent reviews on Trustpilot — the same proof shoppers look for
          when comparing eSIM brands.
        </p>
      </div>

      <p
        className="esim-compare-trust__score"
        aria-label={`${TRUSTPILOT_TRUST_LABEL}, ${TRUSTPILOT_TRUST_SCORE} out of 5 on Trustpilot`}
      >
        <Stars count={TRUSTPILOT_STAR_DISPLAY} size="md" />
        <span className="esim-compare-trust__score-value">
          {TRUSTPILOT_TRUST_SCORE}
        </span>
        <span className="esim-compare-trust__score-label">
          {TRUSTPILOT_TRUST_LABEL} on Trustpilot
        </span>
      </p>

      <div className="esim-compare-trust__grid">
        {quotes.map((quote) => (
          <article key={`${quote.name}-${quote.country}`} className="esim-compare-trust__card">
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
              aria-label={`${quote.stars} out of 5 stars`}
            >
              <Stars count={quote.stars} size="sm" />
            </p>
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
          Read all reviews on Trustpilot
        </a>
      </p>
    </section>
  );
}
