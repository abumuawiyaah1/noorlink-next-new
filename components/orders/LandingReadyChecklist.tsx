"use client";

import { useState } from "react";
import "@/styles/landing-ready.css";

type LandingReadyChecklistProps = {
  /** Show when the eSIM is already installed (My eSIMs). */
  installed?: boolean;
  /** Show before install too (success page) so travelers see the checks early. */
  preview?: boolean;
};

type Device = "iphone" | "samsung" | "other";

type GuideStep = {
  title: string;
  detail: string;
  image: string;
  alt: string;
};

const IPHONE_STEPS: GuideStep[] = [
  {
    title: "Travel line ON",
    detail:
      "Settings → Cellular → your travel line → Turn On This Line (may be named Travel, Secondary, or NoorLink)",
    image: "/images/guides/guide-iphone-line-on.jpg",
    alt: "iPhone: turn the travel eSIM line on before you fly",
  },
  {
    title: "Data Roaming ON",
    detail: "Open that same travel line → Data Roaming ON — the #1 miss abroad",
    image: "/images/guides/guide-iphone-roaming-on.jpg",
    alt: "iPhone: turn Data Roaming on for the travel eSIM line",
  },
  {
    title: "Cellular Data = travel line",
    detail:
      "Cellular Data → tap your travel line (not Primary). Home SIM can stay for calls",
    image: "/images/guides/guide-iphone-data-line.jpg",
    alt: "iPhone: set Cellular Data to the travel eSIM line",
  },
];

const SAMSUNG_STEPS: GuideStep[] = [
  {
    title: "Travel eSIM ON",
    detail:
      "Settings → Connections → SIM manager → enable your travel eSIM",
    image: "/images/guides/guide-samsung-line-on.jpg",
    alt: "Samsung: turn the travel eSIM on before you fly",
  },
  {
    title: "Data roaming ON",
    detail: "Mobile networks → Data roaming ON — the #1 miss abroad",
    image: "/images/guides/guide-samsung-roaming-on.jpg",
    alt: "Samsung: turn Data roaming on",
  },
  {
    title: "Mobile data = travel eSIM",
    detail: "Mobile data → prefer your travel eSIM (not the home SIM)",
    image: "/images/guides/guide-samsung-data-line.jpg",
    alt: "Samsung: set Mobile data to the travel eSIM",
  },
];

/** Pixel, Google, Xiaomi, etc. — same three switches; menu names vary slightly. */
const OTHER_STEPS: GuideStep[] = [
  {
    title: "Travel eSIM ON",
    detail:
      "Settings → Network & internet (or Mobile network) → SIMs → turn your travel eSIM ON",
    image: "/images/guides/guide-samsung-line-on.jpg",
    alt: "Android: turn the travel eSIM on before you fly",
  },
  {
    title: "Data roaming ON",
    detail:
      "Same SIM / Mobile network screen → Data roaming ON — the #1 miss abroad",
    image: "/images/guides/guide-samsung-roaming-on.jpg",
    alt: "Android: turn Data roaming on",
  },
  {
    title: "Mobile data = travel eSIM",
    detail:
      "Mobile data / Preferred SIM → choose your travel eSIM (not the home SIM)",
    image: "/images/guides/guide-samsung-data-line.jpg",
    alt: "Android: set Mobile data to the travel eSIM",
  },
];

const STEPS_BY_DEVICE: Record<Device, GuideStep[]> = {
  iphone: IPHONE_STEPS,
  samsung: SAMSUNG_STEPS,
  other: OTHER_STEPS,
};

const DEVICE_TABS: { id: Device; label: string }[] = [
  { id: "iphone", label: "iPhone" },
  { id: "samsung", label: "Samsung" },
  { id: "other", label: "Other" },
];

export function LandingReadyChecklist({
  installed = false,
  preview = false,
}: LandingReadyChecklistProps) {
  const [device, setDevice] = useState<Device>("iphone");

  if (!installed && !preview) return null;

  const steps = STEPS_BY_DEVICE[device];

  return (
    <section className="landing-ready" aria-labelledby="landing-ready-title">
      <p className="landing-ready__brand" aria-hidden="true">
        Noor<span>Link</span>
      </p>
      <p className="landing-ready__eyebrow">
        {installed ? "Before you fly" : "After install — before you fly"}
      </p>
      <h2 id="landing-ready-title" className="landing-ready__title">
        Installed is not enough — make data ready
      </h2>
      <p className="landing-ready__lede">
        Do these three checks on Wi‑Fi before you fly. Most “no internet”
        tickets are one of these left off — the line off, roaming off, or
        Cellular Data still on Primary. Menu names vary by phone; the switches
        are the same.
      </p>

      <div className="landing-ready__tabs" role="tablist" aria-label="Phone type">
        {DEVICE_TABS.map((tab) => (
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
        <p className="landing-ready__note">
          Pixel, Google, Xiaomi, Oppo, and most Android phones use the same
          three settings — look for SIMs, Data roaming, and Mobile data.
        </p>
      ) : null}

      <ol className="landing-ready__steps">
        {steps.map((step, index) => (
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
              src={step.image}
              alt={step.alt}
              width={432}
              height={576}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
            />
          </li>
        ))}
      </ol>

      <p className="landing-ready__after">
        After landing: Airplane Mode off, wait ~1 minute. Still no data? Toggle
        Airplane Mode once, then re-check the three items above.
      </p>
      <p className="landing-ready__warn">
        Do not tap Delete eSIM. If the line is on and data still fails, message
        WhatsApp support with a screenshot of Cellular / Mobile network settings.
      </p>
    </section>
  );
}
