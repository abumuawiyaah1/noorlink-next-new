import Image from "next/image";
import Link from "next/link";
import { PaymentMethodBadges } from "@/components/ui/PaymentMethodBadges";

type BenefitMedia =
  | { type: "image"; src: string; alt: string }
  | { type: "payments" }
  | { type: "refund" };

const BENEFITS: ReadonlyArray<{
  title: string;
  body: string;
  media: BenefitMedia;
}> = [
  {
    title: "Instant delivery",
    body: "QR code by email minutes after checkout — no mail, no airport SIM swap.",
    media: {
      type: "image",
      src: "/images/trust-stats/qr-delivery.png",
      alt: "Traveler scanning an eSIM QR code on their phone",
    },
  },
  {
    title: "190+ countries covered",
    body: "One checkout connects you to local networks across six continents.",
    media: {
      type: "image",
      src: "/images/trust-stats/countries.png",
      alt: "Globe highlighting international travel destinations",
    },
  },
  {
    title: "Hotspot included",
    body: "Share data with a laptop or travel companion at no extra cost.",
    media: {
      type: "image",
      src: "/images/trust-stats/hotspot.png",
      alt: "Phone sharing mobile data with a laptop via hotspot",
    },
  },
  {
    title: "Secure Stripe checkout",
    body: "Apple Pay, cards, and PayPal through Stripe — never stored on our servers.",
    media: { type: "payments" },
  },
  {
    title: "Refund if it fails",
    body: "Technical activation failure? We review quickly and refund when eligible.",
    media: { type: "refund" },
  },
  {
    title: "Real 24/7 support",
    body: "WhatsApp support around the clock — reach a human in minutes.",
    media: {
      type: "image",
      src: "/images/trust-stats/support.png",
      alt: "Support team helping a customer by phone and chat",
    },
  },
];

function WhyCardMedia({ media }: { media: BenefitMedia }) {
  if (media.type === "payments") {
    return (
      <div className="why-card__media why-card__media--payments">
        <PaymentMethodBadges className="why-card__payments" />
      </div>
    );
  }

  if (media.type === "refund") {
    return (
      <div className="why-card__media why-card__media--refund">
        <Image
          src="/images/trust-stats/refund.svg"
          alt="Refund returned to original payment method"
          width={320}
          height={128}
          className="why-card__refund-art"
        />
      </div>
    );
  }

  return (
    <div className="why-card__media">
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
        className="why-card__image"
      />
    </div>
  );
}

export function WhyNoorLink() {
  return (
    <section className="why-section" aria-labelledby="why-heading">
      <div className="container">
        <div className="why-header">
          <span className="why-kicker">Why NoorLink</span>
          <h2 id="why-heading">Install before you fly. Connect when you land.</h2>
          <p>
            Buy and install your eSIM before you fly so maps, messages, and
            hotspot work when you land.
          </p>
        </div>

        <div className="why-grid">
          {BENEFITS.map((benefit) => (
            <article key={benefit.title} className="why-card">
              <WhyCardMedia media={benefit.media} />
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
