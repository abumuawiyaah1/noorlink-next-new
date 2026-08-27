"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ReviewRequestCard } from "@/components/review/ReviewRequestCard";
import {
  GOOGLE_REVIEW_URL,
  TRUSTPILOT_REVIEW_URL,
  primaryPublicReviewLabel,
  primaryPublicReviewUrl,
  reviewFeedbackPath,
} from "@/lib/review-links";

function ReviewContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") ?? undefined;
  const publicUrl = primaryPublicReviewUrl();

  return (
    <>
      <SiteHeader />
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { label: "Leave a review" },
        ]}
      />
      <main className="policy-page container">
        <ReviewRequestCard orderId={orderId} />

        <section className="review-page__details">
          <h2>How your review helps</h2>
          <p>
            Honest ratings help other travelers choose reliable connectivity for
            Umrah, Hajj, and trips worldwide. Comments also go directly to our team
            so we can improve routes, pricing, and support.
          </p>
          <ul>
            <li>
              <strong>Public rating:</strong>{" "}
              {publicUrl ? (
                <a href={publicUrl} target="_blank" rel="noopener noreferrer">
                  {primaryPublicReviewLabel()}
                </a>
              ) : (
                "Trustpilot link coming soon — use private feedback below for now."
              )}
              {TRUSTPILOT_REVIEW_URL && GOOGLE_REVIEW_URL ? (
                <>
                  {" · "}
                  <a
                    href={GOOGLE_REVIEW_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Also on Google
                  </a>
                </>
              ) : null}
            </li>
            <li>
              <strong>Private feedback:</strong>{" "}
              <Link href={reviewFeedbackPath(orderId)}>
                Tell us what to improve
              </Link>{" "}
              — order details optional.
            </li>
            <li>
              <strong>Next trip:</strong> mention destinations you plan next so we
              can suggest the right plan.
            </li>
          </ul>
          <p>
            Thank you for traveling with NoorLink. Safe journeys — and see you on
            the next adventure.
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

export function ReviewPageClient() {
  return (
    <Suspense fallback={<main className="container">Loading…</main>}>
      <ReviewContent />
    </Suspense>
  );
}
