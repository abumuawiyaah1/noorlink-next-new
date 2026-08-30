import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { PartnersHeroActions } from "@/components/partners/PartnersHeroActions";
import { PartnerBenefits } from "@/components/partners/PartnerBenefits";
import { PartnerPrograms } from "@/components/partners/PartnerPrograms";
import { PartnersPortal } from "@/components/partners/PartnersPortal";
import "@/styles/content-pages.css";
import "@/styles/partners.css";

const PARTNER_STATS = [
  { icon: "🌍", value: "190+", label: "Countries" },
  { icon: "💬", value: "24/7", label: "Support for referrals" },
  { value: "Curated", label: "Partner approval" },
  { icon: "🔗", value: "One link", label: "No inventory" },
] as const;

const PARTNER_STEPS = [
  {
    step: "1",
    title: "Apply",
    body: "Tell us about your audience or organization. No referral code needed yet.",
  },
  {
    step: "2",
    title: "Get your link",
    body: "Once approved, we send your personal referral link and dashboard access.",
  },
  {
    step: "3",
    title: "Earn on every trip",
    body: "Your community saves at checkout. You earn rewards on qualifying sales through your link.",
  },
] as const;

export function PartnersPageContent() {
  return (
    <>
      <SiteHeader />
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { label: "Partners" },
        ]}
      />
      <main className="content-page partners-page">
        <section className="partners-hero">
          <div className="partners-hero__overlay" aria-hidden="true" />
          <div className="partners-hero__inner">
            <span className="content-kicker">NoorLink partner program</span>
            <h1>Partner with a travel eSIM brand your community can trust</h1>
            <p>
              Help travelers stay connected before they fly — with calm, practical
              service, real support, and rewards that stay simple.
            </p>
            <PartnersHeroActions />
          </div>
        </section>

        <div className="content-shell partners-shell">
          <section className="partners-stats" aria-label="Program highlights">
            {PARTNER_STATS.map((stat) => (
              <article key={stat.label} className="about-stat partners-stat">
                {"icon" in stat && stat.icon ? (
                  <span className="partners-stat__icon" aria-hidden="true">
                    {stat.icon}
                  </span>
                ) : null}
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </article>
            ))}
          </section>

          <section className="partners-trust" aria-labelledby="partners-trust-heading">
            <div className="partners-trust__copy">
              <span className="content-kicker">Built for real communities</span>
              <h2 id="partners-trust-heading">
                A premium product behind every referral link
              </h2>
              <p>
                Your name is on the recommendation. NoorLink delivers eSIMs by email,
                handles install support on WhatsApp, and keeps the experience consistent
                from checkout to activation — so you can focus on your audience, not
                troubleshooting.
              </p>
              <p>
                We approve cash partners manually. That means fewer spammy coupon sites
                and a program that protects the trust you have worked to build.
              </p>
              <ul className="partners-trust__list">
                <li>Stripe-secured checkout your referrals can rely on</li>
                <li>Hajj &amp; Umrah corridor plans for faith-based travel</li>
                <li>A read-only partner dashboard for your link and balance</li>
              </ul>
            </div>
            <div
              className="partners-trust__media"
              style={{ backgroundImage: "url(/images/team.jpg)" }}
              role="img"
              aria-label="NoorLink team supporting travelers"
            />
          </section>

          <PartnerBenefits />
          <PartnerPrograms />

          <section className="partners-steps" aria-labelledby="partners-steps-heading">
            <div className="content-section-head partners-steps__head">
              <span className="content-kicker">How it works</span>
              <h2 id="partners-steps-heading">Three steps to start earning</h2>
              <p>Clear, manual, and designed for long-term community partnerships.</p>
            </div>
            <div className="partners-steps__grid">
              {PARTNER_STEPS.map((item) => (
                <article key={item.step} className="partners-step-card">
                  <span className="partners-step-card__num" aria-hidden="true">
                    {item.step}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="partners-cta" aria-labelledby="partners-cta-heading">
            <div
              className="partners-cta__media"
              style={{ backgroundImage: "url(/images/world-hands.jpg)" }}
              aria-hidden="true"
            />
            <div className="partners-cta__copy">
              <span className="content-kicker">Ready when you are</span>
              <h2 id="partners-cta-heading">Join creators, masjids, and travel advisors</h2>
              <p>
                Apply below or sign in if you are already approved.
              </p>
              <p className="partners-cta__note">
                By applying, you agree to our{" "}
                <Link href="/partners/terms">Partner Program Terms</Link>.
              </p>
            </div>
          </section>

          <PartnersPortal />

          <p className="partner-apply__links">
            <Link href="/partners/terms">Partner Program Terms</Link>
            {" · "}
            <Link href="/destinations">Browse destinations</Link>
            {" · "}
            <Link href="/hajj-umrah">Hajj &amp; Umrah plans</Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
