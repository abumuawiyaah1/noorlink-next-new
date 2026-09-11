/** Write-a-review form (Trustpilot evaluate). */
const TRUSTPILOT_REVIEW_URL =
  process.env.NEXT_PUBLIC_TRUSTPILOT_REVIEW_URL?.trim() || "";

/** Public profile — linked from “Read all reviews on Trustpilot”. */
const TRUSTPILOT_PROFILE_URL =
  process.env.NEXT_PUBLIC_TRUSTPILOT_PROFILE_URL?.trim() ||
  "https://www.trustpilot.com/review/noorlink.co";

const GOOGLE_REVIEW_URL =
  process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL?.trim() || "";

/**
 * Overall Trustpilot score for the reviews header (no review count on-site).
 * Last checked: 2026-09-10 → Excellent · 4.3
 */
export const TRUSTPILOT_TRUST_SCORE = 4.3;
export const TRUSTPILOT_TRUST_LABEL = "Excellent";
/** Rounded star fill for the header (4.3 → 4 full + visual). */
export const TRUSTPILOT_STAR_DISPLAY = 4;

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

export {
  TRUSTPILOT_REVIEW_URL,
  TRUSTPILOT_PROFILE_URL,
  GOOGLE_REVIEW_URL,
};
