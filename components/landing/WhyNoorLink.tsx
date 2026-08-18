import Link from "next/link";

const BENEFITS = [
  {
    icon: "⚡",
    title: "Instant delivery",
    body: "Your QR code arrives by email minutes after checkout — no waiting for mail, no SIM swap at the airport.",
  },
  {
    icon: "🌍",
    title: "190+ countries covered",
    body: "One provider, one checkout. NoorLink connects you to local carrier networks across six continents.",
  },
  {
    icon: "📶",
    title: "Hotspot included",
    body: "Every plan supports mobile hotspot. Share your connection with a laptop or travel companion at no extra cost.",
  },
  {
    icon: "🔒",
    title: "Secure Stripe checkout",
    body: "Card details are never stored on NoorLink servers. Payments are encrypted end-to-end through Stripe.",
  },
  {
    icon: "↩️",
    title: "Refund if it fails",
    body: "If a technical error prevents activation, we refund or replace — no bureaucracy, no waiting weeks.",
  },
  {
    icon: "💬",
    title: "Real 24/7 support",
    body: "WhatsApp and live chat are staffed around the clock. Reach a human in minutes, not days.",
  },
] as const;

export function WhyNoorLink() {
  return (
    <section className="why-section" aria-labelledby="why-heading">
      <div className="container">
        <div className="why-header">
          <span className="why-kicker">Why NoorLink</span>
          <h2 id="why-heading">The smarter way to stay connected abroad.</h2>
          <p>
            Most travelers don't realise they can buy, install, and activate a
            local data plan before they even reach the gate.
          </p>
        </div>

        <div className="why-grid">
          {BENEFITS.map((benefit) => (
            <article key={benefit.title} className="why-card">
              <div className="why-card__icon" aria-hidden="true">
                {benefit.icon}
              </div>
              <h3>{benefit.title}</h3>
              <p>{benefit.body}</p>
            </article>
          ))}
        </div>

        <div className="why-cta">
          <Link href="/destinations" className="why-cta__btn">
            Browse destinations
          </Link>
          <Link href="/faq" className="why-cta__link">
            Still have questions? Read the FAQ →
          </Link>
        </div>
      </div>
    </section>
  );
}
