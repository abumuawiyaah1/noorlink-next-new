import { TRUSTPILOT_PROFILE_URL } from "@/lib/review-links";

type TrustProofBannerProps = {
  className?: string;
};

const LABEL = "Read all reviews on Trustpilot";

/** Slim Trustpilot link — no score or review count on-site. */
export function TrustProofBanner({ className = "" }: TrustProofBannerProps) {
  return (
    <a
      className={`trust-proof-banner${className ? ` ${className}` : ""}`}
      href={TRUSTPILOT_PROFILE_URL}
      target="_blank"
      rel="noopener noreferrer"
    >
      {LABEL}
    </a>
  );
}
