"use client";

import Image from "next/image";
import { TrustProofBanner } from "@/components/landing/TrustProofBanner";
import { HOW_IT_WORKS_STEPS } from "@/lib/how-it-works-steps";
import { getDictionary, t } from "@/lib/i18n/dictionaries";
import { useLocaleState } from "@/lib/i18n/use-locale";

export function HowItWorks() {
  const [locale] = useLocaleState();
  const dict = getDictionary(locale);

  return (
    <section className="steps-section" id="how-it-works">
      <div className="container">
        <TrustProofBanner className="trust-proof-banner--steps" />
        <div className="steps-header">
          <h2>{dict.howItWorks.title}</h2>
        </div>
        <div className="steps-grid">
          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <article key={step.id} className="step-card">
              <div className="step-thumb">
                <Image
                  src={step.image}
                  alt={step.imageAlt}
                  width={88}
                  height={88}
                  className="step-thumb__image"
                />
              </div>
              <h3>{t(dict, `howItWorks.step${index + 1}Title`)}</h3>
              <p>{t(dict, `howItWorks.step${index + 1}Body`)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
