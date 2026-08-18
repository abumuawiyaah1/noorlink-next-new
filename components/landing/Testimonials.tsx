const REVIEWS = [
  {
    title: "Umrah travelers",
    detail: "Saudi Arabia",
    text: "Used NoorLink for Umrah and it worked perfectly from the moment I landed in Jeddah. Setup took 2 minutes at home before my trip. Will use again for every trip.",
  },
  {
    title: "Europe multi-country trips",
    detail: "France, Italy, Spain",
    text: "Bought a Europe plan covering 33 countries. Switched between France, Italy and Spain without touching a setting. Honestly the easiest travel purchase I've made.",
  },
  {
    title: "Fast support moments",
    detail: "Installation help",
    text: "Had a question about installation and the WhatsApp support team replied within minutes. The QR arrived fast and worked first try on my iPhone.",
  },
  {
    title: "North America travel",
    detail: "US + Canada coverage",
    text: "Travelling from Mexico to the US and Canada. The NoorLink plan covered both. No roaming surprises on my bill — exactly what I needed.",
  },
  {
    title: "Remote work on the go",
    detail: "Hotspot-ready plans",
    text: "Hotspot worked perfectly so I could keep my laptop connected during a long layover. Much cheaper than the airport Wi-Fi option.",
  },
  {
    title: "Long-haul arrivals",
    detail: "Instant activation",
    text: "Bought a plan for my Europe trip from Lagos. Everything was clear, checkout was quick, and the eSIM activated the second I landed in London.",
  },
] as const;

export function Testimonials() {
  return (
    <section className="reviews-section" aria-labelledby="reviews-heading">
      <div className="container">
        <div className="reviews-header">
          <span className="why-kicker">Traveler proof points</span>
          <h2 id="reviews-heading">Why travelers choose NoorLink.</h2>
          <p>
            Common trip situations where fast eSIM delivery, simple setup, and
            responsive support matter most.
          </p>
        </div>

        <div className="reviews-grid">
          {REVIEWS.map((review) => (
            <article key={review.title} className="review-card">
              <div className="review-pill">{review.detail}</div>
              <blockquote className="review-card__text">
                &ldquo;{review.text}&rdquo;
              </blockquote>
              <footer className="review-card__footer">
                <div>
                  <strong>{review.title}</strong>
                  <span>Representative customer scenario</span>
                </div>
              </footer>
            </article>
          ))}
        </div>

        <p className="reviews-disclaimer">
          Verified third-party reviews can replace this section once Trustpilot
          and other review profiles are live.
        </p>
      </div>
    </section>
  );
}
