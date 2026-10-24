"use client";

import Link from "next/link";
import { useState } from "react";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizedPath } from "@/lib/i18n/path";
import { useLocaleState } from "@/lib/i18n/use-locale";
import "@/styles/landing-ready.css";

type LandingReadyChecklistProps = {
  /** Show when the eSIM is already installed (My eSIMs). */
  installed?: boolean;
  /** Show before install too (success page) so travelers see the checks early. */
  preview?: boolean;
};

type Device = "iphone" | "samsung" | "other";

/** Compact My eSIMs tag — opens the full picture guide. */
export function LandingReadyTag() {
  const [locale] = useLocaleState();
  const lr = getDictionary(locale).landingReady;
  const guideHref = localizedPath("/help/before-you-fly", locale);

  return (
    <p className="landing-ready-tag-wrap">
      <Link href={guideHref} className="landing-ready-tag">
        <span className="landing-ready-tag__brand">
          Noor<span>Link</span>
        </span>
        <span className="landing-ready-tag__label">{lr.tagLabel}</span>
      </Link>
    </p>
  );
}

const STEP_IMAGES: Record<Device, string[]> = {
  iphone: [
    "/images/guides/guide-iphone-line-on.jpg",
    "/images/guides/guide-iphone-roaming-on.jpg",
    "/images/guides/guide-iphone-data-line.jpg",
  ],
  samsung: [
    "/images/guides/guide-samsung-line-on.jpg",
    "/images/guides/guide-samsung-roaming-on.jpg",
    "/images/guides/guide-samsung-data-line.jpg",
  ],
  other: [
    "/images/guides/guide-samsung-line-on.jpg",
    "/images/guides/guide-samsung-roaming-on.jpg",
    "/images/guides/guide-samsung-data-line.jpg",
  ],
};

export function LandingReadyChecklist({
  installed = false,
  preview = false,
}: LandingReadyChecklistProps) {
  const [locale] = useLocaleState();
  const lr = getDictionary(locale).landingReady;
  const [device, setDevice] = useState<Device>("iphone");

  if (!installed && !preview) return null;

  const stepCopy = lr[device];
  const images = STEP_IMAGES[device];
  const tabs: { id: Device; label: string }[] = [
    { id: "iphone", label: lr.tabIphone },
    { id: "samsung", label: lr.tabSamsung },
    { id: "other", label: lr.tabOther },
  ];

  return (
    <section className="landing-ready" aria-labelledby="landing-ready-title">
      <p className="landing-ready__brand" aria-hidden="true">
        Noor<span>Link</span>
      </p>
      <p className="landing-ready__eyebrow">
        {installed ? lr.eyebrowInstalled : lr.eyebrowPreview}
      </p>
      <h2 id="landing-ready-title" className="landing-ready__title">
        {lr.title}
      </h2>
      <p className="landing-ready__lede">{lr.lede}</p>

      <div className="landing-ready__tabs" role="tablist" aria-label={lr.tabsAria}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={device === tab.id}
            className={`landing-ready__tab${device === tab.id ? " is-active" : ""}`}
            onClick={() => setDevice(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {device === "other" ? (
        <p className="landing-ready__note">{lr.otherNote}</p>
      ) : null}

      <ol className="landing-ready__steps">
        {stepCopy.map((step, index) => (
          <li key={`${device}-${step.title}-${index}`} className="landing-ready__step">
            <div className="landing-ready__step-copy">
              <span className="landing-ready__step-num">{index + 1}</span>
              <div>
                <strong>{step.title}</strong>
                <span>{step.detail}</span>
              </div>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="landing-ready__img"
              src={images[index]}
              alt={step.alt}
              width={432}
              height={576}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
            />
          </li>
        ))}
      </ol>

      <p className="landing-ready__after">{lr.afterLanding}</p>
      <p className="landing-ready__warn">{lr.warn}</p>
    </section>
  );
}
