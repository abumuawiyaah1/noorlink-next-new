"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ReviewRequestCard } from "@/components/review/ReviewRequestCard";
import { getDictionary, t } from "@/lib/i18n/dictionaries";
import { localizedPath } from "@/lib/i18n/path";
import { useLocaleState } from "@/lib/i18n/use-locale";
import {
  GOOGLE_REVIEW_URL,
  TRUSTPILOT_REVIEW_URL,
  primaryPublicReviewUrl,
  reviewFeedbackPath,
} from "@/lib/review-links";

function ReviewContent() {
  const [locale] = useLocaleState();
  const dict = getDictionary(locale);
  const r = dict.reviewPage;
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") ?? undefined;
  const publicUrl = primaryPublicReviewUrl();
  const publicLabel = TRUSTPILOT_REVIEW_URL
    ? r.rateTrustpilot
    : GOOGLE_REVIEW_URL
      ? r.rateGoogle
      : r.ratePublic;

  const feedbackPath = reviewFeedbackPath(orderId, {
    subject: r.feedbackSubject,
    message: orderId
      ? t(dict, "reviewPage.feedbackMessage", { orderId })
      : undefined,
  });
  const feedbackHref = localizedPath(feedbackPath, locale);

  return (
    <>
      <SiteHeader />
      <Breadcrumbs
        items={[
          { href: localizedPath("/", locale), label: dict.common.home },
          { label: r.crumb },
        ]}
      />
      <main className="policy-page container">
        <ReviewRequestCard orderId={orderId} />

        <section className="review-page__details">
          <h2>{r.howHelpsTitle}</h2>
          <p>{r.howHelpsBody}</p>
          <ul>
            <li>
              <strong>{r.publicRating}</strong>{" "}
              {publicUrl ? (
                <a href={publicUrl} target="_blank" rel="noopener noreferrer">
                  {publicLabel}
                </a>
              ) : (
                r.trustpilotSoon
              )}
              {TRUSTPILOT_REVIEW_URL && GOOGLE_REVIEW_URL ? (
                <>
                  {" · "}
                  <a
                    href={GOOGLE_REVIEW_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {r.alsoGoogle}
                  </a>
                </>
              ) : null}
            </li>
            <li>
              <strong>{r.privateFeedback}</strong>{" "}
              <Link href={feedbackHref}>{r.privateFeedbackLink}</Link>{" "}
              {r.privateFeedbackAfter}
            </li>
            <li>
              <strong>{r.nextTrip}</strong> {r.nextTripBody}
            </li>
          </ul>
          <p>{r.thanks}</p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

export function ReviewPageClient() {
  const [locale] = useLocaleState();
  const loading = getDictionary(locale).common.loading;
  return (
    <Suspense fallback={<main className="container">{loading}</main>}>
      <ReviewContent />
    </Suspense>
  );
}
