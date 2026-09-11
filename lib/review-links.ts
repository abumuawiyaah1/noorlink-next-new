/** Write-a-review form (Trustpilot evaluate). */
const TRUSTPILOT_REVIEW_URL =
  process.env.NEXT_PUBLIC_TRUSTPILOT_REVIEW_URL?.trim() || "";

/** Public profile travelers read (stars + review count). */
const TRUSTPILOT_PROFILE_URL =
  process.env.NEXT_PUBLIC_TRUSTPILOT_PROFILE_URL?.trim() ||
  "https://www.trustpilot.com/review/noorlink.co";

const GOOGLE_REVIEW_URL =
  process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL?.trim() || "";

/**
 * Snapshot from Trustpilot public profile — update when the live score moves.
 * Last checked: 2026-09-10 → Excellent · 4.3 · 9 reviews
 */
export const TRUSTPILOT_TRUST_SCORE = 4.3;
export const TRUSTPILOT_REVIEW_COUNT = 9;
export const TRUSTPILOT_TRUST_LABEL = "Excellent";

export function reviewPagePath(orderId?: string): string {
  if (!orderId?.trim()) return "/review";
  return `/review?orderId=${encodeURIComponent(orderId.trim())}`;
}

export function reviewFeedbackPath(orderId?: string): string {
  const params = new URLSearchParams({ subject: "Service review" });
  if (orderId?.trim()) {
    params.set("orderId", orderId.trim());
    params.set(
      "message",
      `Hi NoorLink, here is my feedback on order ${orderId.trim()}:`,
    );
  }
  return `/support?${params.toString()}`;
}

/** Primary public review destination (Trustpilot preferred). */
export function primaryPublicReviewUrl(): string {
  return TRUSTPILOT_REVIEW_URL || GOOGLE_REVIEW_URL;
}

export function primaryPublicReviewLabel(): string {
  if (TRUSTPILOT_REVIEW_URL) return "Rate us on Trustpilot";
  if (GOOGLE_REVIEW_URL) return "Rate us on Google";
  return "Leave a public review";
}

export function trustpilotProofLabel(): string {
  return `${TRUSTPILOT_TRUST_LABEL} · ${TRUSTPILOT_TRUST_SCORE} on Trustpilot · ${TRUSTPILOT_REVIEW_COUNT} reviews`;
}

export {
  TRUSTPILOT_REVIEW_URL,
  TRUSTPILOT_PROFILE_URL,
  GOOGLE_REVIEW_URL,
};
