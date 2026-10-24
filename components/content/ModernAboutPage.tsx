"use client";

import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { useLocaleState } from "@/lib/i18n/use-locale";

export function ModernAboutPage() {
  const [locale] = useLocaleState();
  const dict = getDictionary(locale);
  const about = dict.aboutPage;

  return (
    <>
      <SiteHeader />
      <Breadcrumbs
        items={[{ href: "/", label: dict.common.home }, { label: dict.nav.about }]}
      />
      <main className="content-page about-page">
        <section className="content-hero about-hero-modern">
          <div className="content-hero__inner">
            <span className="content-kicker">{about.kicker}</span>
            <h1>{about.title}</h1>
            <p>{about.lede}</p>
          </div>
        </section>

        <div className="content-shell">
          <section className="about-story-card">
            <div>
              <span className="content-kicker">{about.storyKicker}</span>
              <h2>{about.storyTitle}</h2>
              {about.story.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
            <div className="about-story-card__media" aria-hidden="true" />
          </section>

          <section className="about-stats">
            {about.stats.map((stat) => (
              <article key={stat.label} className="about-stat">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </article>
            ))}
          </section>

          <section className="about-values">
            <div className="content-section-head">
              <span className="content-kicker">{about.valuesKicker}</span>
              <h2>{about.valuesTitle}</h2>
              <p>{about.valuesLede}</p>
            </div>
            <div className="about-values__grid">
              {about.values.map((value) => (
                <article key={value.title} className="content-card">
                  <h3>{value.title}</h3>
                  <p>{value.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="content-cta">
            <div>
              <span className="content-kicker">{about.ctaKicker}</span>
              <h2>{about.ctaTitle}</h2>
              <p>{about.ctaLede}</p>
            </div>
            <div className="content-cta__actions">
              <Link href="/destinations" className="content-button">
                {about.ctaDestinations}
              </Link>
              <Link href="/faq" className="content-button content-button--ghost">
                {about.ctaFaq}
              </Link>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
