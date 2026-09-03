import Image from "next/image";
import Link from "next/link";

const BENEFITS = [
  {
    title: "Instant delivery",
    body: "Your QR code arrives by email minutes after checkout — no waiting for mail, no SIM swap at the airport.",
    image: "/images/trust-stats/qr-delivery.png",
    imageAlt: "Traveler scanning an eSIM QR code on their phone",
  },
  {
    title: "190+ countries covered",
    body: "One provider, one checkout. NoorLink connects you to local carrier networks across six continents.",
    image: "/images/trust-stats/countries.png",
    imageAlt: "Globe highlighting international travel destinations",
  },
  {
    title: "Hotspot included",
    body: "Every plan supports mobile hotspot. Share your connection with a laptop or travel companion at no extra cost.",
    image: "/images/trust-stats/hotspot.png",
    imageAlt: "Phone sharing mobile data with a laptop via hotspot",
  },
  {
    title: "Secure Stripe checkout",
    body: "Card details are never stored on NoorLink servers. Payments are encrypted end-to-end through Stripe.",
    image: "/images/sim-card.jpg",
    imageAlt: "eSIM card ready to install before travel",
  },
  {
    title: "Refund if it fails",
    body: "If a technical error prevents activation, we review the issue quickly and refund or replace when eligible.",
    image: "/images/traveler.jpg",
    imageAlt: "Traveler connected and ready after landing",
  },
  {
    title: "Real 24/7 support",
    body: "WhatsApp support is staffed around the clock. Reach a human in minutes, not days.",
    image: "/images/trust-stats/support.png",
    imageAlt: "Support team helping a customer by phone and chat",
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
              <div className="why-card__media">
                <Image
                  src={benefit.image}
                  alt={benefit.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  className="why-card__image"
                />
              </div>
              <div className="why-card__body">
                <h3>{benefit.title}</h3>
                <p>{benefit.body}</p>
              </div>
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
