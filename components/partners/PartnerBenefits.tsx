"use client";

import { getDictionary } from "@/lib/i18n/dictionaries";
import { useLocaleState } from "@/lib/i18n/use-locale";

export function PartnerBenefits() {
  const [locale] = useLocaleState();
  const p = getDictionary(locale).partnersPage;

  return (
    <section className="partner-benefits" aria-labelledby="partner-benefits-heading">
      <div className="partner-benefits__banner" aria-hidden="true">
        <div
          className="partner-benefits__banner-image"
          style={{ backgroundImage: "url(/images/hero-3d.jpg)" }}
        />
      </div>

      <div className="partner-benefits__head">
        <span className="content-kicker">{p.benefitsKicker}</span>
        <h2 id="partner-benefits-heading">{p.benefitsTitle}</h2>
        <p>{p.benefitsLede}</p>
      </div>

      <div className="partner-benefits__grid">
        {p.benefits.map((benefit) => (
          <article key={benefit.title} className="content-card partner-benefits__card">
            <span className="partner-benefits__icon" aria-hidden="true">
              {benefit.icon}
            </span>
            <h3>{benefit.title}</h3>
            <p>{benefit.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
