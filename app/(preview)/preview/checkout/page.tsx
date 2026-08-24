import { Suspense } from "react";
import { V2CheckoutPage } from "@/components/v2/V2CheckoutPage";

export default function PreviewCheckoutPage() {
  return (
    <Suspense fallback={<div className="v2-main">Loading checkout…</div>}>
      <V2CheckoutPage />
    </Suspense>
  );
}
