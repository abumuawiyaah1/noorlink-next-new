"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { PseoDestination, PseoFaqItem } from "@/lib/pseo/types";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/path";
import { getDictionary, t } from "@/lib/i18n/dictionaries";
import { TRUSTPILOT_PROFILE_URL } from "@/lib/review-links";
import {
  formatPseoAirportList,
  getPseoAirports,
  getPseoClusterLinks,
  getPseoFaqs,
  getRelatedIndexedPseo,
  pseoFaqCopyFromDict,
  pseoHubPath,
} from "@/lib/pseo";

type Props = {
  destination: PseoDestination;
  locale: Locale;
  /** Live cheapest plan label, e.g. "From $4.50" */
  fromPriceLabel?: string | null;
};

const GB_OPTIONS = [1, 3, 5, 10, 20] as const;

export function EsimDestinationHub({
  destination,
  locale,
  fromPriceLabel,
}: Props) {
  const dict = getDictionary(locale);
  const p = dict.pseo;
  const copy = destination.locales[locale] ?? destination.locales.en;
  const [apnOpen, setApnOpen] = useState(false);
  const [compatOpen, setCompatOpen] = useState(false);
  const [gb, setGb] = useState<(typeof GB_OPTIONS)[number]>(5);

  const estimate = useMemo(() => {
    if (gb <= 1) return p.calcLight;
    if (gb <= 5) return p.calcTypical;
    if (gb <= 10) return p.calcHeavy;
    return p.calcCreator;
  }, [gb, p]);

  const plansHref = localizedPath(destination.plansPath, locale);
  const airports = getPseoAirports(destination.slug);
  const airportList = formatPseoAirportList(destination.slug);
  const faqs: PseoFaqItem[] = useMemo(
    () =>
      getPseoFaqs(
        destination,
        copy.countryName,
        pseoFaqCopyFromDict(p),
        copy.faqDataHint,
      ),
    [destination, copy.countryName, copy.faqDataHint, p],
  );
  const clusters = getPseoClusterLinks(destination);
  const related = getRelatedIndexedPseo(destination.slug);

  return (
    <article className="pseo-hub">
      <header className="pseo-hub__hero">
        <p className="pseo-hub__kicker">{p.kicker}</p>
        <h1 className="pseo-hub__title">
          {p.titlePrefix} {copy.countryName}
        </h1>
        <p className="pseo-hub__intro">{copy.intro}</p>
        <div className="pseo-hub__cta-row">
          <Link href={plansHref} className="pseo-hub__cta">
            {fromPriceLabel
              ? t(dict, "pseo.fromPriceCta", { price: fromPriceLabel })
              : p.viewPlans}
          </Link>
          <Link
            href={localizedPath("/help/before-you-fly", locale)}
            className="pseo-hub__cta pseo-hub__cta--ghost"
          >
            {p.beforeYouFly}
          </Link>
        </div>
      </header>

      <section className="pseo-hub__trust" aria-label={p.trustTitle}>
        <h2>{p.trustTitle}</h2>
        <p>{p.trustBody}</p>
        <div className="pseo-hub__trust-links">
          <Link
            href={localizedPath("/#device-checker", locale)}
            className="pseo-hub__text-link"
          >
            {p.compatCta}
          </Link>
          <a
            href={TRUSTPILOT_PROFILE_URL}
            className="pseo-hub__text-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {p.trustReviews}
          </a>
        </div>
      </section>

      <section className="pseo-hub__grid" aria-label={p.networkFacts}>
        <div className="pseo-hub__card">
          <h2>{p.carriers}</h2>
          <p>
            <strong>{destination.primaryCarrier}</strong>
            {destination.secondaryCarrier
              ? ` · ${destination.secondaryCarrier}`
              : ""}
          </p>
        </div>
        <div className="pseo-hub__card">
          <h2>{p.frequencies}</h2>
          <p>{destination.supportedFrequencies}</p>
        </div>
        <div className="pseo-hub__card">
          <h2>{p.cities}</h2>
          <p>{destination.popularCities.join(" · ")}</p>
        </div>
      </section>

      <section className="pseo-hub__panel">
        <h2>{p.airportsTitle}</h2>
        <p>
          {airports.length > 0
            ? t(dict, "pseo.airportsBody", { airports: airportList })
            : p.airportsFallback}
        </p>
      </section>

      <section className="pseo-hub__panel">
        <h2>{p.roamingTitle}</h2>
        <p>{copy.roamingTip}</p>
      </section>

      <section className="pseo-hub__tools">
        <div className="pseo-hub__tool">
          <button
            type="button"
            className="pseo-hub__disclosure"
            aria-expanded={apnOpen}
            onClick={() => setApnOpen((v) => !v)}
          >
            {p.apnTitle}
            <span aria-hidden="true">{apnOpen ? "−" : "+"}</span>
          </button>
          {apnOpen ? (
            <div className="pseo-hub__disclosure-body">
              <p>
                <strong>APN:</strong>{" "}
                <code className="pseo-hub__code">{destination.apnName}</code>
              </p>
              <p>{destination.apnNotes}</p>
            </div>
          ) : null}
        </div>

        <div className="pseo-hub__tool">
          <button
            type="button"
            className="pseo-hub__disclosure"
            aria-expanded={compatOpen}
            onClick={() => setCompatOpen((v) => !v)}
          >
            {p.compatTitle}
            <span aria-hidden="true">{compatOpen ? "−" : "+"}</span>
          </button>
          {compatOpen ? (
            <div className="pseo-hub__disclosure-body">
              <p>{p.compatBody}</p>
              <Link
                href={localizedPath("/#device-checker", locale)}
                className="pseo-hub__text-link"
              >
                {p.compatCta}
              </Link>
            </div>
          ) : null}
        </div>

        <div className="pseo-hub__tool pseo-hub__tool--calc">
          <h2>{p.calcTitle}</h2>
          <p className="pseo-hub__calc-hint">{p.calcHint}</p>
          <div
            className="pseo-hub__calc-options"
            role="group"
            aria-label={p.calcTitle}
          >
            {GB_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                className={
                  option === gb
                    ? "pseo-hub__chip pseo-hub__chip--active"
                    : "pseo-hub__chip"
                }
                onClick={() => setGb(option)}
              >
                {option} GB
              </button>
            ))}
          </div>
          <p className="pseo-hub__calc-result">{estimate}</p>
          <Link href={plansHref} className="pseo-hub__text-link">
            {p.calcCta}
          </Link>
        </div>
      </section>

      <section className="pseo-hub__faq" aria-labelledby="pseo-faq-title">
        <h2 id="pseo-faq-title">{p.faqTitle}</h2>
        <div className="pseo-hub__faq-list">
          {faqs.map((item) => (
            <details key={item.question} className="pseo-hub__faq-item">
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section
        className="pseo-hub__related"
        aria-labelledby="pseo-clusters-title"
      >
        <h2 id="pseo-clusters-title">{p.clustersTitle}</h2>
        <ul className="pseo-hub__related-list">
          {clusters.map((link) => (
            <li key={link.href}>
              <Link
                href={localizedPath(link.href, locale)}
                className="pseo-hub__text-link"
              >
                {p.clusters[link.labelKey]}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="pseo-hub__related" aria-labelledby="pseo-related-title">
        <h2 id="pseo-related-title">{p.relatedTitle}</h2>
        <ul className="pseo-hub__related-list">
          {related.map((hub) => {
            const relatedCopy = hub.locales[locale] ?? hub.locales.en;
            return (
              <li key={hub.slug}>
                <Link
                  href={localizedPath(pseoHubPath(hub.slug), locale)}
                  className="pseo-hub__text-link"
                >
                  {relatedCopy.countryName}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <footer className="pseo-hub__footer">
        <Link href={plansHref} className="pseo-hub__cta">
          {fromPriceLabel
            ? t(dict, "pseo.fromPriceCta", { price: fromPriceLabel })
            : p.viewPlans}
        </Link>
      </footer>
    </article>
  );
}
