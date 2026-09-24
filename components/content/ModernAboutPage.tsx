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
    title: "Education first",
    body: "We explain how eSIM works in plain language — so you learn, install with confidence, and feel prepared before the flight, not guessing at the gate.",
  },
  {
    title: "Ready before you fly",
    body: "Buy your plan early, set it up on home Wi‑Fi, and land with working data. No airport kiosk. No plastic SIM hunt.",
  },
  {
    title: "Support that stays with you",
    body: "We bought an eSIM once with nowhere to turn. On NoorLink, WhatsApp help is part of the product — because the traveler deserves a real answer.",
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
            <h1>It started with our family trip to Egypt — no internet.</h1>
            <p>
              We landed without data, figured it out the hard way, and built
              NoorLink around the traveler — with support and education, not
              just another eSIM plan.
            </p>
          </div>
        </section>

        <div className="content-shell">
          <section className="about-story-card">
            <div>
              <span className="content-kicker">Why we built NoorLink</span>
              <h2>Our family landed in Egypt with no connection.</h2>
              <p>
                When our family went to Egypt, we landed without a working phone
                line and no internet. In this era, almost everything needs data —
                maps would not load, messages home would not send, and the simple
                things that make travel feel safe suddenly disappeared.
              </p>
              <p>
                So we had to figure out how to get online. The first day we paid
                for Wi‑Fi at the airport just to order an Uber and reach people
                back home. Then came the dilemma: call our telephone provider for
                roaming — too expensive. Buy a plastic SIM — but we would have to
                hunt for one. Someone told us about eSIM. We ended up buying one,
                but unfortunately we had no real support when we needed help.
              </p>
              <p>
                That trip stuck with me. Travel should be about the places you
                came to see — not about losing connection the moment you need
                directions, a ride, or a check-in with family. It also made us
                think hard about the end user: someone landing in a new country,
                maybe tired, maybe with family, who just needs things to work —
                and someone clear to ask when they do not.
              </p>
              <p>
                That is why NoorLink is not just another eSIM provider. We give
                you the plan, the support, and the education so you can learn how
                eSIM works and feel prepared before you fly — install on Wi‑Fi at
                home, land online, without roaming fees, last-minute SIM swaps,
                or feeling alone if something goes wrong.
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
              <span className="content-kicker">What makes us different</span>
              <h2>Not just a plan — support and preparation</h2>
              <p>
                Our Egypt story keeps us focused on the traveler: clear steps,
                real answers, and help that shows up when you need it.
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
              <span className="content-kicker">Want to feel ready?</span>
              <h2>Learn the steps, then pick your plan.</h2>
              <p>
                Browse destinations when you know where you are going — or start
                with our FAQ and guides so install and timing feel clear before
                you buy.
              </p>
            </div>
            <div className="content-cta__actions">
              <Link href="/destinations" className="content-button">
                Explore destinations
              </Link>
              <Link href="/faq" className="content-button content-button--ghost">
                Read the FAQ
              </Link>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
