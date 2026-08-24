import { Suspense } from "react";
import { CheckoutPage } from "@/components/legacy/CheckoutPage";

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
