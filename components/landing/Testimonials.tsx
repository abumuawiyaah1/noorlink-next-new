import { TRUSTPILOT_PROFILE_URL } from "@/lib/review-links";
import { TRUSTPILOT_QUOTES } from "@/lib/trustpilot-quotes";

function Stars({ count }: { count: number }) {
  return (
    <p className="review-card__stars" aria-label={`${count} out of 5 stars`}>
      <span className="review-card__stars-filled" aria-hidden="true">
        {"★".repeat(count)}
      </span>
      <span className="review-card__stars-empty" aria-hidden="true">
        {"☆".repeat(Math.max(0, 5 - count))}
      </span>
    </p>
  );
}

export function Testimonials() {
  return (
    <section className="reviews-section" aria-labelledby="reviews-heading">
      <div className="container">
        <div className="reviews-header">
          <span className="why-kicker">Reviews</span>
          <h2 id="reviews-heading">What travelers say.</h2>
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

              <Stars count={quote.stars} />

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
