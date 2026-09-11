import {
  TRUSTPILOT_PROFILE_URL,
  trustpilotProofLabel,
} from "@/lib/review-links";
import { TRUSTPILOT_QUOTES } from "@/lib/trustpilot-quotes";

function Stars({ count }: { count: number }) {
  return (
    <p className="review-card__stars" aria-label={`${count} out of 5 stars`}>
      {"★".repeat(count)}
      <span aria-hidden="true">{"☆".repeat(Math.max(0, 5 - count))}</span>
    </p>
  );
}

export function Testimonials() {
  return (
    <section className="reviews-section" aria-labelledby="reviews-heading">
      <div className="container">
        <div className="reviews-header">
          <span className="why-kicker">Trustpilot reviews</span>
          <h2 id="reviews-heading">What travelers say.</h2>
          <p>
            Real reviews from travelers on Trustpilot —{" "}
            {trustpilotProofLabel()}.
          </p>
        </div>

        <div className="reviews-grid">
          {TRUSTPILOT_QUOTES.map((quote) => (
            <article key={`${quote.name}-${quote.title}`} className="review-card">
              <div className="review-card__author">
                <span className="review-card__avatar" aria-hidden="true">
                  {quote.initial}
                </span>
                <div>
                  <p className="review-card__name">{quote.name}</p>
                  <p className="review-card__place">
                    <span aria-hidden="true">{quote.flag} </span>
                    {quote.place}
                  </p>
                </div>
              </div>
              <Stars count={quote.stars} />
              <h3 className="review-card__title">{quote.title}</h3>
              <p className="review-card__text">{quote.text}</p>
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
