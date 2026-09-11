import {
  TRUSTPILOT_PROFILE_URL,
  trustpilotProofLabel,
} from "@/lib/review-links";

type TrustProofBannerProps = {
  className?: string;
};

/** Slim Trustpilot social-proof line (score + review count). */
export function TrustProofBanner({ className = "" }: TrustProofBannerProps) {
  const label = trustpilotProofLabel();

  return (
    <a
      className={`trust-proof-banner${className ? ` ${className}` : ""}`}
      href={TRUSTPILOT_PROFILE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} — open Trustpilot reviews`}
    >
      {label}
    </a>
  );
}
