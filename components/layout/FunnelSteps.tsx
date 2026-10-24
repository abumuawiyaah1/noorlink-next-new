"use client";

import { getDictionary } from "@/lib/i18n/dictionaries";
import { useLocaleState } from "@/lib/i18n/use-locale";

export type FunnelStep = { n: number; label: string };

type Props = {
  steps: FunnelStep[];
  current: number;
  ariaLabel?: string;
};

export function FunnelSteps({ steps, current, ariaLabel }: Props) {
  const [locale] = useLocaleState();
  const label =
    ariaLabel ?? getDictionary(locale).common.checkoutProgress;

  return (
    <ol className="funnel-steps" aria-label={label}>
      {steps.map((step) => {
        const state =
          step.n < current ? "is-done" : step.n === current ? "is-current" : "";
        return (
          <li key={step.n} className={`funnel-step ${state}`.trim()}>
            <span className="funnel-step__n" aria-hidden="true">
              {step.n < current ? "✓" : step.n}
            </span>
            <span className="funnel-step__label">{step.label}</span>
          </li>
        );
      })}
    </ol>
  );
}
