import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

const STATS = [
  { value: "190+", label: "Countries covered" },
  { value: "Fast", label: "Digital delivery" },
  { value: "24/7", label: "Global support" },
  { value: "0%", label: "Roaming fees" },
];

const VALUES = [
  {
    title: "Simplicity first",
    body: "We make telecom feel easy. Buying, receiving, and installing an eSIM should be as simple as scanning a QR code.",
  },
  {
    title: "Borderless by design",
    body: "Travelers should not have to hunt for Wi-Fi or swap plastic SIM cards just to get online in a new country.",
  },
  {
    title: "Support that stays with you",
    body: "Travel can be unpredictable, so we keep support close by with WhatsApp and fast order follow-up.",
  },
];

export function ModernAboutPage() {
  return (
    <>
      <SiteHeader />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "About" }]} />
      <main className="content-page about-page">
        <section className="content-hero about-hero-modern">
          <div className="content-hero__inner">
            <span className="content-kicker">About NoorLink</span>
            <h1>Bridging borders, instantly.</h1>
            <p>
              We make global connectivity simple, affordable, and ready before
              your flight lands.
            </p>
          </div>
        </section>

        <div className="content-shell">
          <section className="about-story-card">
            <div>
              <span className="content-kicker">Our story</span>
              <h2>Travel should be about the trip, not the SIM card hunt.</h2>
              <p>
                NoorLink started from a familiar frustration: landing somewhere
                new and losing connection the moment you need directions, a ride,
                or a message home.
              </p>
              <p>
                Instead of roaming charges, plastic SIM swaps, and airport kiosks,
                we built a digital-first eSIM experience that gets travelers
                online in minutes.
              </p>
              <p>
                The goal is straightforward: instant setup, reliable coverage,
                and a cleaner travel workflow from checkout to activation.
              </p>
            </div>
            <div className="about-story-card__media" aria-hidden="true" />
          </section>

          <section className="about-stats">
            {STATS.map((stat) => (
              <article key={stat.label} className="about-stat">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </article>
            ))}
          </section>

          <section className="about-values">
            <div className="content-section-head">
              <span className="content-kicker">What drives us</span>
              <h2>Designed for modern travel</h2>
              <p>
                We focus on clarity, speed, and dependable support across every
                step of the eSIM experience.
              </p>
            </div>
            <div className="about-values__grid">
              {VALUES.map((value) => (
                <article key={value.title} className="content-card">
                  <h3>{value.title}</h3>
                  <p>{value.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="content-cta">
            <div>
              <span className="content-kicker">Need help before you buy?</span>
              <h2>We can help you choose the right plan.</h2>
              <p>
                Browse destinations, check our FAQs, or contact support if you
                need help with compatibility, timing, or refunds.
              </p>
            </div>
            <div className="content-cta__actions">
              <Link href="/destinations" className="content-button">
                Explore destinations
              </Link>
              <Link href="/support" className="content-button content-button--ghost">
                Contact support
              </Link>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
