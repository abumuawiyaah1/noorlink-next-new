import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckoutPage } from "@/components/legacy/CheckoutPage";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Secure Checkout | NoorLink",
  description: "Secure checkout for your NoorLink travel eSIM. Instant QR delivery after payment.",
  path: "/checkout",
  noIndex: true,
});

function CheckoutPageFallback() {
  return (
    <main className="container" style={{ padding: "3rem 0" }}>
      <p>Loading checkout…</p>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<CheckoutPageFallback />}>
      <CheckoutPage />
    </Suspense>
  );
}
