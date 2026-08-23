const STORIES = [
  {
    title: "Umrah travelers",
    place: "Saudi Arabia",
    text: "Install at home before you fly. When you land in Jeddah, the plan is ready so you can stay connected in Makkah and Madinah without looking for a SIM shop.",
  },
  {
    title: "Europe in one plan",
    place: "France, Italy, Spain",
    text: "One eSIM covers multiple countries, so you can cross borders without changing settings or buying a new plan in each city.",
  },
  {
    title: "Help when you need it",
    place: "24/7 support",
    text: "If install or delivery is unclear, WhatsApp support is available around the clock. Most travelers get an answer in minutes, not days.",
  },
  {
    title: "US and Canada trips",
    place: "North America",
    text: "Use one plan across both countries and keep maps, rides, and messages working without surprise roaming on your home bill.",
  },
  {
    title: "Hotspot on the go",
    place: "Laptops and tablets",
    text: "Every plan can share data. Keep a laptop online during a layover or hand a connection to a travel companion without an extra fee.",
  },
  {
    title: "Ready when you land",
    place: "Instant activation",
    text: "Checkout is email-first. After payment, the QR arrives so you can install before takeoff and connect as soon as you reach the destination.",
  },
] as const;

export function Testimonials() {
  return (
    <section className="reviews-section" aria-labelledby="reviews-heading">
      <div className="container">
        <div className="reviews-header">
          <span className="why-kicker">Made for real trips</span>
          <h2 id="reviews-heading">Why travelers choose NoorLink.</h2>
          <p>
            Fast delivery, simple setup, and support that stays with you from
            checkout to arrival.
          </p>
        </div>

        <div className="reviews-grid">
          {STORIES.map((story) => (
            <article key={story.title} className="review-card">
              <p className="review-card__place">{story.place}</p>
              <h3 className="review-card__title">{story.title}</h3>
              <p className="review-card__text">{story.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
