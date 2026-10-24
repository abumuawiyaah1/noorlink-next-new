"use client";

import { getDictionary } from "@/lib/i18n/dictionaries";
import { useLocaleState } from "@/lib/i18n/use-locale";
import { TRUSTPILOT_PROFILE_URL } from "@/lib/review-links";

type TrustProofBannerProps = {
  className?: string;
};

/** Slim Trustpilot link — no score or review count on-site. */
export function TrustProofBanner({ className = "" }: TrustProofBannerProps) {
  const [locale] = useLocaleState();
  const label = getDictionary(locale).common.readTrustpilot;

  return (
    <a
      className={`trust-proof-banner${className ? ` ${className}` : ""}`}
      href={TRUSTPILOT_PROFILE_URL}
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}
    </a>
  );
}
