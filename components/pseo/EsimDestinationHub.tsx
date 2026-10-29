"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { PseoDestination } from "@/lib/pseo/types";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/path";
import { getDictionary } from "@/lib/i18n/dictionaries";
import {
  getPseoLocaleCopy,
  getRelatedIndexedPseo,
  pseoHubPath,
} from "@/lib/pseo";

type Props = {
  destination: PseoDestination;
  locale: Locale;
};

const GB_OPTIONS = [1, 3, 5, 10, 20] as const;

export function EsimDestinationHub({ destination, locale }: Props) {
  const dict = getDictionary(locale);
  const p = dict.pseo;
  const copy = getPseoLocaleCopy(destination, locale);
  const [apnOpen, setApnOpen] = useState(false);
  const [compatOpen, setCompatOpen] = useState(false);
  const [gb, setGb] = useState<(typeof GB_OPTIONS)[number]>(5);

  const estimate = useMemo(() => {
    // Rough traveler heuristic — tool UX, not a price quote.
    if (gb <= 1) return p.calcLight;
    if (gb <= 5) return p.calcTypical;
    if (gb <= 10) return p.calcHeavy;
    return p.calcCreator;
  }, [gb, p]);

  const plansHref = localizedPath(destination.plansPath, locale);

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
            {p.viewPlans}
          </Link>
          <Link
            href={localizedPath("/help/before-you-fly", locale)}
            className="pseo-hub__cta pseo-hub__cta--ghost"
          >
            {p.beforeYouFly}
          </Link>
        </div>
      </header>

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
          <div className="pseo-hub__calc-options" role="group" aria-label={p.calcTitle}>
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

      <section className="pseo-hub__related" aria-labelledby="pseo-related-title">
        <h2 id="pseo-related-title">{p.relatedTitle}</h2>
        <ul className="pseo-hub__related-list">
          {getRelatedIndexedPseo(destination.slug).map((related) => {
            const relatedCopy = getPseoLocaleCopy(related, locale);
            return (
              <li key={related.slug}>
                <Link
                  href={localizedPath(pseoHubPath(related.slug), locale)}
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
          {p.viewPlans}
        </Link>
      </footer>
    </article>
  );
}
