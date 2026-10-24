"use client";

import Link from "next/link";
import { PILGRIMAGE_BRAND_LINE } from "@/lib/brand";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { useLocaleState } from "@/lib/i18n/use-locale";

export function UmrahPromo() {
  const [locale] = useLocaleState();
  const dict = getDictionary(locale);

  return (
    <section className="umrah-promo-section" aria-label={dict.umrahPromo.sectionAria}>
      <div className="container">
        <div className="ramadan-promo">
          <div className="promo-content">
            <div className="promo-text">
              <div className="promo-kicker">{PILGRIMAGE_BRAND_LINE}</div>
              <h2 className="promo-title">{dict.umrahPromo.title}</h2>
              <p className="promo-copy">{dict.umrahPromo.body}</p>
              <div className="promo-cta-row">
                <Link href="/hajj-umrah" className="btn-nav promo-cta">
                  {dict.umrahPromo.ctaPlans}
                </Link>
                <Link
                  href="/help/umrah-esim-before-you-fly"
                  className="promo-cta-secondary"
                >
                  {dict.common.installBeforeFly}
                </Link>
                <Link
                  href="/help/hajj-umrah-phone-check"
                  className="promo-cta-secondary"
                >
                  {dict.home.ctaPhoneCheck}
                </Link>
                <Link
                  href="/newsletter/2027-01-ramadan-special"
                  className="promo-cta-secondary"
                >
                  {dict.umrahPromo.ramadanSpecial}
                </Link>
                <Link
                  href="/newsletter/2027-04-hajj-special"
                  className="promo-cta-secondary"
                >
                  {dict.umrahPromo.hajjSpecial}
                </Link>
              </div>
              <p className="promo-insider-note">
                {dict.umrahPromo.specialsNote}
              </p>
            </div>
            <div className="promo-feature-img" role="img" aria-label={dict.umrahPromo.imageAria} />
          </div>
        </div>
      </div>
    </section>
  );
}
