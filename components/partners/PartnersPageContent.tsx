"use client";

import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { PartnersHeroActions } from "@/components/partners/PartnersHeroActions";
import { PartnerBenefits } from "@/components/partners/PartnerBenefits";
import { PartnerPrograms } from "@/components/partners/PartnerPrograms";
import { PartnersPortal } from "@/components/partners/PartnersPortal";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizedPath } from "@/lib/i18n/path";
import { useLocaleState } from "@/lib/i18n/use-locale";
import "@/styles/content-pages.css";
import "@/styles/partners.css";

export function PartnersPageContent() {
  const [locale] = useLocaleState();
  const dict = getDictionary(locale);
  const p = dict.partnersPage;

  return (
    <>
      <SiteHeader />
      <Breadcrumbs
        items={[
          { href: localizedPath("/", locale), label: dict.common.home },
          { label: p.crumb },
        ]}
      />
      <main className="content-page partners-page">
        <section className="partners-hero">
          <div className="partners-hero__overlay" aria-hidden="true" />
          <div className="partners-hero__inner">
            <span className="content-kicker">{p.heroKicker}</span>
            <h1>{p.heroTitle}</h1>
            <p>{p.heroLede}</p>
            <PartnersHeroActions />
          </div>
        </section>

        <div className="content-shell partners-shell">
          <section className="partners-stats" aria-label={p.statsAria}>
            {p.stats.map((stat) => (
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
              <span className="content-kicker">{p.trustKicker}</span>
              <h2 id="partners-trust-heading">{p.trustTitle}</h2>
              <p>{p.trustP1}</p>
              <p>{p.trustP2}</p>
              <ul className="partners-trust__list">
                {p.trustItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div
              className="partners-trust__media"
              style={{ backgroundImage: "url(/images/team.jpg)" }}
              role="img"
              aria-label={p.trustMediaAlt}
            />
          </section>

          <PartnerBenefits />
          <PartnerPrograms />

          <section className="partners-steps" aria-labelledby="partners-steps-heading">
            <div className="content-section-head partners-steps__head">
              <span className="content-kicker">{p.stepsKicker}</span>
              <h2 id="partners-steps-heading">{p.stepsTitle}</h2>
              <p>{p.stepsLede}</p>
            </div>
            <div className="partners-steps__grid">
              {p.steps.map((item) => (
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
              style={{ backgroundImage: "url(/images/world-hands.webp)" }}
              aria-hidden="true"
            />
            <div className="partners-cta__copy">
              <span className="content-kicker">{p.ctaKicker}</span>
              <h2 id="partners-cta-heading">{p.ctaTitle}</h2>
              <p>{p.ctaLede}</p>
              <p className="partners-cta__note">
                {p.ctaTermsBefore}{" "}
                <Link href={localizedPath("/partners/terms", locale)}>
                  {p.ctaTermsLink}
                </Link>
                .
              </p>
            </div>
          </section>

          <PartnersPortal />

          <p className="partner-apply__links">
            <Link href={localizedPath("/partners/terms", locale)}>
              {p.footerTerms}
            </Link>
            {" · "}
            <Link href={localizedPath("/destinations", locale)}>
              {p.footerDestinations}
            </Link>
            {" · "}
            <Link href={localizedPath("/hajj-umrah", locale)}>{p.footerHajj}</Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
