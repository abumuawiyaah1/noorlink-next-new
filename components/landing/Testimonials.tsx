const REVIEWS = [
  {
    name: "Aisha M.",
    country: "🇸🇦 Saudi Arabia",
    rating: 5,
    text: "Used NoorLink for Umrah and it worked perfectly from the moment I landed in Jeddah. Setup took 2 minutes at home before my trip. Will use again for every trip.",
  },
  {
    name: "James K.",
    country: "🇬🇧 United Kingdom",
    rating: 5,
    text: "Bought a Europe plan covering 33 countries. Switched between France, Italy and Spain without touching a setting. Honestly the easiest travel purchase I've made.",
  },
  {
    name: "Fatima A.",
    country: "🇦🇪 UAE",
    rating: 5,
    text: "Had a question about installation and the WhatsApp support team replied within minutes. The QR arrived fast and worked first try on my iPhone.",
  },
  {
    name: "Carlos R.",
    country: "🇲🇽 Mexico",
    rating: 5,
    text: "Travelling from Mexico to the US and Canada. The NoorLink plan covered both. No roaming surprises on my bill — exactly what I needed.",
  },
  {
    name: "Yuki T.",
    country: "🇯🇵 Japan",
    rating: 5,
    text: "Hotspot worked perfectly so I could keep my laptop connected during a long layover. Much cheaper than the airport Wi-Fi option.",
  },
  {
    name: "Amara D.",
    country: "🇳🇬 Nigeria",
    rating: 5,
    text: "Bought a plan for my Europe trip from Lagos. Everything was clear, checkout was quick, and the eSIM activated the second I landed in London.",
  },
] as const;

function Stars({ count }: { count: number }) {
  return (
    <div className="review-stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} aria-hidden="true" className={i < count ? "star star--on" : "star"}>
          ★
        </span>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="reviews-section" aria-labelledby="reviews-heading">
      <div className="container">
        <div className="reviews-header">
          <span className="why-kicker">Traveler reviews</span>
          <h2 id="reviews-heading">Trusted by travelers worldwide.</h2>
          <p>
            Real experiences from NoorLink customers. We will replace these with
            verified Trustpilot reviews as they come in.
          </p>
        </div>

        <div className="reviews-grid">
          {REVIEWS.map((review) => (
            <article key={review.name} className="review-card">
              <Stars count={review.rating} />
              <blockquote className="review-card__text">
                &ldquo;{review.text}&rdquo;
              </blockquote>
              <footer className="review-card__footer">
                <div className="review-card__avatar" aria-hidden="true">
                  {review.name[0]}
                </div>
                <div>
                  <strong>{review.name}</strong>
                  <span>{review.country}</span>
                </div>
              </footer>
            </article>
          ))}
        </div>

        <p className="reviews-disclaimer">
          ✦ Reviews are representative of typical customer feedback. Verified
          Trustpilot reviews coming soon.
        </p>
      </div>
    </section>
  );
}
