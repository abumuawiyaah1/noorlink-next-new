import {
  TRUSTPILOT_PROFILE_URL,
  TRUSTPILOT_STAR_DISPLAY,
  TRUSTPILOT_TRUST_LABEL,
  TRUSTPILOT_TRUST_SCORE,
} from "@/lib/review-links";
import { TRUSTPILOT_QUOTES } from "@/lib/trustpilot-quotes";

/** Trustpilot-style green star tiles (filled / empty). */
function Stars({
  count,
  className,
  size = "md",
}: {
  count: number;
  className?: string;
  size?: "sm" | "md";
}) {
  const filled = Math.max(0, Math.min(5, Math.round(count)));
  return (
    <span
      className={`tp-stars tp-stars--${size}${className ? ` ${className}` : ""}`}
      aria-hidden="true"
    >
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={`tp-stars__tile${i < filled ? " tp-stars__tile--on" : ""}`}
        >
          ★
        </span>
      ))}
    </span>
  );
}

export function Testimonials() {
  return (
    <section className="reviews-section" aria-labelledby="reviews-heading">
      <div className="container">
        <div className="reviews-header">
          <span className="why-kicker">Reviews</span>
          <h2 id="reviews-heading">What travelers say on Trustpilot</h2>
          <p
            className="reviews-header__score"
            aria-label={`${TRUSTPILOT_TRUST_LABEL}, ${TRUSTPILOT_TRUST_SCORE} out of 5 on Trustpilot`}
          >
            <Stars count={TRUSTPILOT_STAR_DISPLAY} size="md" />
            <span className="reviews-header__score-value">
              {TRUSTPILOT_TRUST_SCORE}
            </span>
            <span className="reviews-header__score-label">
              {TRUSTPILOT_TRUST_LABEL}
            </span>
          </p>
        </div>

        <div className="reviews-grid">
          {TRUSTPILOT_QUOTES.map((quote) => (
            <article
              key={`${quote.name}-${quote.country}`}
              className="review-card"
            >
              <div className="review-card__top">
                <span className="review-card__avatar" aria-hidden="true">
                  {quote.initial}
                </span>
                <div className="review-card__meta">
                  <p className="review-card__name">{quote.name}</p>
                  <p className="review-card__country">
                    <span className="review-card__flag" aria-hidden="true">
                      {quote.flag}
                    </span>
                    {quote.country}
                  </p>
                </div>
              </div>

              <p
                className="review-card__stars"
                aria-label={`${quote.stars} out of 5 stars`}
              >
                <Stars count={quote.stars} size="sm" />
              </p>

              <p className="review-card__preview">“{quote.preview}”</p>
            </article>
          ))}
        </div>

        <p className="reviews-footer">
          <a
            href={TRUSTPILOT_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read all reviews on Trustpilot
          </a>
        </p>
      </div>
    </section>
  );
}
