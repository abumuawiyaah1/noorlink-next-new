"use client";

import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { RAMADAN_GIVING } from "@/lib/giving";
import { getDictionary, t } from "@/lib/i18n/dictionaries";
import { localizedPath } from "@/lib/i18n/path";
import { useLocaleState } from "@/lib/i18n/use-locale";

export function GivePage() {
  const [locale] = useLocaleState();
  const dict = getDictionary(locale);
  const g = dict.givePage;
  const { profitSharePercent, customerDiscountPercent } = RAMADAN_GIVING;

  return (
    <>
      <SiteHeader />
      <Breadcrumbs
        items={[
          { href: localizedPath("/", locale), label: dict.common.home },
          { label: g.crumb },
        ]}
      />
      <main className="content-page">
        <section className="content-hero content-hero--compact">
          <div className="content-hero__inner">
            <span className="content-kicker">{g.kicker}</span>
            <h1>{g.title}</h1>
            <p>{g.lede}</p>
          </div>
        </section>

        <div className="content-shell" style={{ padding: "2.5rem 1.25rem 4rem" }}>
          <article className="content-card" style={{ maxWidth: 720, margin: "0 auto" }}>
            <p className="content-kicker">{g.sunnahKicker}</p>
            <blockquote style={{ margin: "0 0 1.25rem", padding: 0, border: 0 }}>
              <p style={{ fontStyle: "italic", lineHeight: 1.65, color: "#334155" }}>
                {g.hadith}
              </p>
              <cite
                style={{
                  display: "block",
                  fontStyle: "normal",
                  fontWeight: 650,
                  color: "var(--primary)",
                  marginTop: "0.35rem",
                }}
              >
                {g.hadithReference}
              </cite>
            </blockquote>

            <h2 style={{ color: "var(--primary)", marginTop: "1.75rem" }}>
              {g.pledgeTitle}
            </h2>
            <p style={{ color: "#334155", lineHeight: 1.65 }}>{g.pledgeIntro}</p>
            <ul style={{ color: "#334155", lineHeight: 1.7 }}>
              <li>
                {t(dict, "givePage.discountItem", {
                  percent: customerDiscountPercent,
                })}
              </li>
              <li>
                {t(dict, "givePage.donateItem", {
                  percent: profitSharePercent,
                })}
              </li>
            </ul>
            <p style={{ color: "#334155", lineHeight: 1.65 }}>{g.pledgeClose}</p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.75rem",
                marginTop: "1.75rem",
              }}
            >
              <Link
                href={localizedPath("/hajj-umrah", locale)}
                className="btn-nav"
                style={{ color: "#fff" }}
              >
                {g.viewPilgrimage}
              </Link>
              <Link
                href={localizedPath("/newsletter/2027-01-ramadan-special", locale)}
                style={{
                  alignSelf: "center",
                  color: "var(--primary)",
                  fontWeight: 650,
                }}
              >
                {g.readRamadanSpecial}
              </Link>
            </div>
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
