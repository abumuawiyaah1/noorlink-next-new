"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { useLocaleState } from "@/lib/i18n/use-locale";
import "@/styles/help-pages.css";

/** Replace {guide} / {support} tokens with links so word order can differ per locale. */
function renderFooterHelp(template: string, links: Record<string, ReactNode>) {
  return template.split(/(\{guide\}|\{support\})/).map((part, index) => {
    const key = part.slice(1, -1);
    if (part.startsWith("{") && key in links) {
      return <span key={index}>{links[key]}</span>;
    }
    return part;
  });
}

export function ModernFaqPage() {
  const [locale] = useLocaleState();
  const dict = getDictionary(locale);
  const faq = dict.faqPage;

  return (
    <>
      <SiteHeader />
      <Breadcrumbs
        items={[{ href: "/", label: dict.common.home }, { label: dict.nav.faq }]}
      />
      <main className="help-page">
        <section className="help-hero">
          <h1>{faq.title}</h1>
          <p>{faq.intro}</p>
        </section>
        <div className="help-inner">
          <div className="faq-quick-grid">
            {faq.quick.map((card) => (
              <article key={card.title} className="help-card">
                <h2>{card.title}</h2>
                <p>{card.body}</p>
              </article>
            ))}
          </div>
          <div className="faq-list">
            {faq.groups.map((group) => (
              <section key={group.title} className="faq-group">
                <h2 className="faq-group__title">{group.title}</h2>
                <div className="faq-group__items">
                  {group.items.map((item) => (
                    <article key={item.q} className="faq-item">
                      <h3>{item.q}</h3>
                      <p>{item.a}</p>
                    </article>
                  ))}
                </div>
              </section>
            ))}
            <div className="help-card faq-help-card">
              <h2>{faq.footerHelpTitle}</h2>
              <p>
                {renderFooterHelp(faq.footerHelp, {
                  guide: <Link href="/help/before-you-fly">{faq.guideLink}</Link>,
                  support: <Link href="/support">{faq.supportLink}</Link>,
                })}
              </p>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
