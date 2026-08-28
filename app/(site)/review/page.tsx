import type { Metadata } from "next";
import "@/styles/content-pages.css";
import { ReviewPageClient } from "@/components/review/ReviewPageClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Leave a review | NoorLink",
  description: "Share feedback about your NoorLink travel eSIM experience.",
  path: "/review",
  noIndex: true,
});

export default function Page() {
  return <ReviewPageClient />;
}
