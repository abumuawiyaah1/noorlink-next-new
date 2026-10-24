"use client";

import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import {
  ESIM_COMPARE_PROVIDER_META,
  ESIM_COMPARE_UPDATED_ISO,
  getEsimCompareRows,
  type CompareCell,
} from "@/lib/esim-comparison";
import { CompareTrustpilotProof } from "@/components/content/CompareTrustpilotProof";
import { CompareStickyCta } from "@/components/content/CompareStickyCta";
import { CompareLiveDestinations } from "@/components/content/CompareLiveDestinations";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizedPath } from "@/lib/i18n/path";
import { useLocaleState } from "@/lib/i18n/use-locale";
import "@/styles/esim-compare.css";

function CellBadge({ cell }: { cell: CompareCell }) {
  return (
    <span
      className={`esim-compare__badge esim-compare__badge--${cell.kind}`}
      title={cell.note}
    >
      {cell.label}
    </span>
  );
}

export function EsimComparisonPage() {
  const [locale] = useLocaleState();
  const dict = getDictionary(locale);
  const c = dict.comparePage;
  const rows = getEsimCompareRows(c);
  const guides = c.guides;
  const faqs = c.faqs;

  return (
    <>
      <SiteHeader />
      <Breadcrumbs
        items={[
          { href: localizedPath("/", locale), label: dict.common.home },
          { label: c.crumb },
        ]}
      />
      <main className="content-page esim-compare-page">
        <section className="content-hero content-hero--compact">
          <div className="content-hero__inner">
            <span className="content-kicker">{c.kicker}</span>
            <h1>{c.title}</h1>
            <p>{c.lede}</p>
            <p className="esim-compare__updated">
              {c.updatedPrefix}{" "}
              <time dateTime={ESIM_COMPARE_UPDATED_ISO}>{c.updatedLabel}</time>
            </p>
          </div>
        </section>

        <div className="content-shell esim-compare-shell">
          <nav className="esim-compare-toc" aria-label={c.tocAria}>
            <p className="esim-compare-toc__label">{c.tocLabel}</p>
            <ul>
              <li>
                <a href="#feature-chart">{c.tocFeatureChart}</a>
              </li>
              <li>
                <a href="#who-its-for">{c.tocWho}</a>
              </li>
              <li>
                <a href="#live-plans">{c.tocLive}</a>
              </li>
              <li>
                <a href="#phone-check">{c.tocPhone}</a>
              </li>
              <li>
                <a href="#trustpilot">{c.tocTrustpilot}</a>
              </li>
              {guides.map((guide) => (
                <li key={guide.id}>
                  <a href={`#${guide.id}`}>{guide.title}</a>
                </li>
              ))}
              <li>
                <a href="#compare-faq">{c.tocFaq}</a>
              </li>
            </ul>
          </nav>

          <section
            id="feature-chart"
            className="esim-compare"
            aria-labelledby="esim-compare-heading"
          >
            <div className="content-section-head">
              <span className="content-kicker">{c.chartKicker}</span>
              <h2 id="esim-compare-heading">{c.chartTitle}</h2>
              <p>{c.chartLede}</p>
            </div>

            <div className="esim-compare__scroll" tabIndex={0}>
              <table className="esim-compare__table">
                <caption className="visually-hidden">{c.tableCaption}</caption>
                <thead>
                  <tr>
                    <th scope="col" className="esim-compare__feature-col">
                      {c.featureCol}
                    </th>
                    {ESIM_COMPARE_PROVIDER_META.map((provider) => (
                      <th
                        key={provider.id}
                        scope="col"
                        className={
                          provider.highlight
                            ? "esim-compare__provider esim-compare__provider--ours"
                            : "esim-compare__provider"
                        }
                      >
                        <span className="esim-compare__provider-name">
                          {provider.name}
                        </span>
                        {provider.highlight ? (
                          <span className="esim-compare__ours-tag">{c.oursTag}</span>
                        ) : null}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id}>
                      <th scope="row" className="esim-compare__row-label">
                        <span>{row.label}</span>
                        {row.hint ? (
                          <span className="esim-compare__row-hint">{row.hint}</span>
                        ) : null}
                      </th>
                      {ESIM_COMPARE_PROVIDER_META.map((provider) => {
                        const cell = row.cells[provider.id];
                        return (
                          <td
                            key={provider.id}
                            className={
                              provider.highlight
                                ? "esim-compare__cell esim-compare__cell--ours"
                                : "esim-compare__cell"
                            }
                          >
                            {cell ? <CellBadge cell={cell} /> : "—"}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="esim-compare__cards">
              {rows.map((row) => (
                <article key={row.id} className="esim-compare-card">
                  <h3>{row.label}</h3>
                  {row.hint ? <p>{row.hint}</p> : null}
                  <ul>
                    {ESIM_COMPARE_PROVIDER_META.map((provider) => {
                      const cell = row.cells[provider.id];
                      return (
                        <li
                          key={provider.id}
                          className={
                            provider.highlight
                              ? "esim-compare-card__row esim-compare-card__row--ours"
                              : "esim-compare-card__row"
                          }
                        >
                          <span className="esim-compare-card__name">
                            {provider.name}
                          </span>
                          {cell ? <CellBadge cell={cell} /> : <span>—</span>}
                        </li>
                      );
                    })}
                  </ul>
                </article>
              ))}
            </div>

            <p className="esim-compare__disclaimer">{c.disclaimer}</p>
          </section>

          <section
            id="who-its-for"
            className="esim-compare-audience"
            aria-labelledby="esim-compare-audience-heading"
          >
            <div className="content-section-head">
              <span className="content-kicker">{c.whoKicker}</span>
              <h2 id="esim-compare-audience-heading">{c.whoTitle}</h2>
            </div>
            <ul className="esim-compare-audience__list">
              {c.whoItems.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}</strong>
                  <span>{item.body}</span>
                </li>
              ))}
            </ul>
            <div className="esim-compare-inline-cta">
              <Link
                href={localizedPath("/destinations", locale)}
                className="content-button"
              >
                {c.browseDestinations}
              </Link>
              <Link
                href={localizedPath("/hajj-umrah", locale)}
                className="content-button content-button--ghost"
              >
                {c.hajjUmrahPlans}
              </Link>
            </div>
          </section>

          <CompareLiveDestinations />

          <section
            id="phone-check"
            className="esim-compare-check"
            aria-labelledby="esim-compare-check-heading"
          >
            <div>
              <span className="content-kicker">{c.phoneKicker}</span>
              <h2 id="esim-compare-check-heading">{c.phoneTitle}</h2>
              <p>{c.phoneLede}</p>
            </div>
            <div className="esim-compare-check__actions">
              <Link
                href={localizedPath("/help/hajj-umrah-phone-check", locale)}
                className="content-button"
              >
                {c.freePhoneCheck}
              </Link>
              <Link
                href={localizedPath("/help/before-you-fly", locale)}
                className="content-button content-button--ghost"
              >
                {c.installBeforeFly}
              </Link>
            </div>
          </section>

          <CompareTrustpilotProof />

          <section
            className="esim-compare-spotlight"
            aria-labelledby="esim-compare-why"
          >
            <div className="content-section-head">
              <span className="content-kicker">{c.whyKicker}</span>
              <h2 id="esim-compare-why">{c.whyTitle}</h2>
            </div>
            <ul className="esim-compare-spotlight__list">
              {(
                [
                  {
                    item: c.whyItems[0],
                    href: "/hajj-umrah",
                  },
                  {
                    item: c.whyItems[1],
                    href: "/support",
                  },
                ] as const
              ).map(({ item, href }) => (
                <li key={item.title}>
                  <strong>{item.title}</strong>
                  <span>
                    {item.bodyBefore}
                    <Link href={localizedPath(href, locale)}>{item.linkLabel}</Link>
                    {item.bodyAfter}
                  </span>
                </li>
              ))}
              <li>
                <strong>{c.whyItems[2].title}</strong>
                <span>
                  {c.whyItems[2].bodyBefore}
                  <Link href={localizedPath("/help/before-you-fly", locale)}>
                    {c.whyItems[2].linkLabel}
                  </Link>
                  {"bodyMid" in c.whyItems[2] ? c.whyItems[2].bodyMid : null}
                  {"linkLabel2" in c.whyItems[2] ? (
                    <Link
                      href={localizedPath(
                        "/help/hajj-umrah-phone-check",
                        locale,
                      )}
                    >
                      {c.whyItems[2].linkLabel2}
                    </Link>
                  ) : null}
                  {c.whyItems[2].bodyAfter}
                </span>
              </li>
            </ul>
          </section>

          <section
            className="esim-compare-guides"
            aria-labelledby="esim-compare-guides-heading"
          >
            <div className="content-section-head">
              <span className="content-kicker">{c.guidesKicker}</span>
              <h2 id="esim-compare-guides-heading">{c.guidesTitle}</h2>
              <p>{c.guidesLede}</p>
            </div>

            <div className="esim-compare-guides__list">
              {guides.map((guide) => (
                <article
                  key={guide.id}
                  id={guide.id}
                  className="esim-compare-guide"
                >
                  <h3>{guide.title}</h3>
                  <p>{guide.body}</p>
                  <ul className="esim-compare-guide__links">
                    {guide.links.map((link) => (
                      <li key={link.href}>
                        <Link href={localizedPath(link.href, locale)}>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section
            id="compare-faq"
            className="esim-compare-faq"
            aria-labelledby="esim-compare-faq-heading"
          >
            <div className="content-section-head">
              <span className="content-kicker">{c.faqKicker}</span>
              <h2 id="esim-compare-faq-heading">{c.faqTitle}</h2>
              <p>
                {c.faqLedeBefore}
                <Link href={localizedPath("/faq", locale)}>{c.faqLedeLink}</Link>
                {c.faqLedeAfter}
              </p>
            </div>
            <div className="esim-compare-faq__list">
              {faqs.map((item) => (
                <article key={item.q} className="esim-compare-faq__item">
                  <h3>{item.q}</h3>
                  <p>{item.a}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="content-cta">
            <div>
              <span className="content-kicker">{c.ctaKicker}</span>
              <h2>{c.ctaTitle}</h2>
              <p>{c.ctaLede}</p>
            </div>
            <div className="content-cta__actions">
              <Link
                href={localizedPath("/destinations", locale)}
                className="content-button"
              >
                {c.browseDestinations}
              </Link>
              <Link
                href={localizedPath("/hajj-umrah", locale)}
                className="content-button content-button--ghost"
              >
                {c.hajjUmrahPlans}
              </Link>
            </div>
          </section>
        </div>
      </main>
      <CompareStickyCta />
      <SiteFooter />
    </>
  );
}
