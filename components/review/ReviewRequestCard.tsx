"use client";

import Link from "next/link";
import { GOOGLE_REVIEW_URL, reviewFeedbackPath } from "@/lib/review-links";

type ReviewRequestCardProps = {
  orderId?: string;
  compact?: boolean;
};

export function ReviewRequestCard({
  orderId,
  compact = false,
}: ReviewRequestCardProps) {
  const feedbackHref = reviewFeedbackPath(orderId);

  return (
    <div className={`review-request${compact ? " review-request--compact" : ""}`}>
      <p className="review-request__kicker">Your feedback matters</p>
      <h2 className="review-request__title">Leave us a review</h2>
      <p className="review-request__text">
        If you choose to rate our service, you will have an opportunity to leave a
        comment as well. Please tell us how we can help you on your next trip — and
        any improvements we can make at NoorLink.
      </p>
      <div className="review-request__actions">
        {GOOGLE_REVIEW_URL ? (
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-nav"
          >
            Rate us on Google
          </a>
        ) : null}
        <Link href={feedbackHref} className="btn-nav btn-nav--secondary">
          Share your experience
        </Link>
      </div>
    </div>
  );
}
