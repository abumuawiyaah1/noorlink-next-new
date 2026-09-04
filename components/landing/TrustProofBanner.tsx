type TrustProofBannerProps = {
  className?: string;
};

/** Slim social-proof line until public reviews are ready to feature. */
export function TrustProofBanner({ className = "" }: TrustProofBannerProps) {
  return (
    <p
      className={`trust-proof-banner${className ? ` ${className}` : ""}`}
      role="status"
    >
      Trusted by Travelers in 20+ Countries
    </p>
  );
}
