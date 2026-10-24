"use client";

import Link from "next/link";
import { getDictionary, t } from "@/lib/i18n/dictionaries";
import { localizedPath } from "@/lib/i18n/path";
import { useLocaleState } from "@/lib/i18n/use-locale";
import {
  GOOGLE_REVIEW_URL,
  TRUSTPILOT_REVIEW_URL,
  primaryPublicReviewUrl,
  reviewFeedbackPath,
} from "@/lib/review-links";

type ReviewRequestCardProps = {
  orderId?: string;
  compact?: boolean;
};

export function ReviewRequestCard({
  orderId,
  compact = false,
}: ReviewRequestCardProps) {
  const [locale] = useLocaleState();
  const dict = getDictionary(locale);
  const card = dict.reviewPage.card;
  const publicUrl = primaryPublicReviewUrl();
  const publicLabel = TRUSTPILOT_REVIEW_URL
    ? dict.reviewPage.rateTrustpilot
    : GOOGLE_REVIEW_URL
      ? dict.reviewPage.rateGoogle
      : dict.reviewPage.ratePublic;

  const feedbackPath = reviewFeedbackPath(orderId, {
    subject: dict.reviewPage.feedbackSubject,
    message: orderId
      ? t(dict, "reviewPage.feedbackMessage", { orderId })
      : undefined,
  });
  const feedbackHref = localizedPath(feedbackPath, locale);

  return (
    <div className={`review-request${compact ? " review-request--compact" : ""}`}>
      <p className="review-request__kicker">{card.kicker}</p>
      <h2 className="review-request__title">{card.title}</h2>
      <p className="review-request__text">{card.text}</p>
      <div className="review-request__actions">
        {publicUrl ? (
          <a
            href={publicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="review-request__btn"
          >
            {publicLabel}
          </a>
        ) : null}
        <Link href={feedbackHref} className="review-request__btn">
          {card.privateCta}
        </Link>
      </div>
    </div>
  );
}
