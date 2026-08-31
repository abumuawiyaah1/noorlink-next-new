import Link from "next/link";

const BENEFITS = [
  {
    icon: "fa-bolt",
    title: "Instant delivery",
    body: "Your QR code arrives by email minutes after checkout — no waiting for mail, no SIM swap at the airport.",
  },
  {
    icon: "fa-globe",
    title: "190+ countries covered",
    body: "One provider, one checkout. NoorLink connects you to local carrier networks across six continents.",
  },
  {
    icon: "fa-wifi",
    title: "Hotspot included",
    body: "Every plan supports mobile hotspot. Share your connection with a laptop or travel companion at no extra cost.",
  },
  {
    icon: "fa-lock",
    title: "Secure Stripe checkout",
    body: "Card details are never stored on NoorLink servers. Payments are encrypted end-to-end through Stripe.",
  },
  {
    icon: "fa-rotate-left",
    title: "Refund if it fails",
    body: "If a technical error prevents activation, we review the issue quickly and refund or replace when eligible.",
  },
  {
    icon: "fa-comments",
    title: "Real 24/7 support",
    body: "WhatsApp support is staffed around the clock. Reach a human in minutes, not days.",
  },
] as const;

export function WhyNoorLink() {
  return (
    <section className="why-section" aria-labelledby="why-heading">
      <div className="container">
        <div className="why-header">
          <span className="why-kicker">Why NoorLink</span>
          <h2 id="why-heading">Stay connected without the airport scramble.</h2>
          <p>
            Buy and install your eSIM before you fly so maps, messages, and
            hotspot work when you land.
          </p>
        </div>

        <div className="why-grid">
          {BENEFITS.map((benefit) => (
            <article key={benefit.title} className="why-card">
              <div className="why-card__icon" aria-hidden="true">
                <i className={`fas ${benefit.icon}`} />
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
