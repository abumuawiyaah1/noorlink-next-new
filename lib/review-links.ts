const TRUSTPILOT_REVIEW_URL =
  process.env.NEXT_PUBLIC_TRUSTPILOT_REVIEW_URL?.trim() || "";

const GOOGLE_REVIEW_URL =
  process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL?.trim() || "";

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

export { TRUSTPILOT_REVIEW_URL, GOOGLE_REVIEW_URL };
