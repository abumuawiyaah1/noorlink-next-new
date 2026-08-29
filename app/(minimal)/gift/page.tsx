import type { Metadata } from "next";
import { Suspense } from "react";
import "@/styles/gift.css";
import { GiftCheckoutPage } from "@/components/gift/GiftCheckoutPage";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Gift an eSIM | NoorLink",
  description:
    "Send a NoorLink travel eSIM as a gift. Add a personal message — they receive the QR code by email.",
  path: "/gift",
  noIndex: true,
});

export default function Page() {
  return (
    <Suspense fallback={<main className="container">Loading…</main>}>
      <GiftCheckoutPage />
    </Suspense>
  );
}
