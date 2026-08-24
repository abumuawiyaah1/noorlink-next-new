"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { ActivationHub } from "@/components/v2/ActivationHub";
import { V2SiteHeader } from "@/components/v2/V2SiteHeader";
import { lookupOrder } from "@/lib/orders-api";
import { formatCountryLabel } from "@/lib/country-slugs";
import { previewPath } from "@/lib/v2/preview-paths";

const DEMO_LPA =
  "LPA:1$consumer.rsp.global$TN-DEMO-NOORLINK-ACTIVATION-CODE";

function SuccessInner() {
  const searchParams = useSearchParams();
  const country = formatCountryLabel(searchParams.get("country") ?? "Saudi Arabia");
  const price = searchParams.get("price") ?? "21.77";
  const email = searchParams.get("email") ?? "";
  const orderId = searchParams.get("orderId") ?? searchParams.get("order_id") ?? "";
  const demo = searchParams.get("demo") === "1";

  const [activation, setActivation] = useState({
    qrCodeUrl: demo
      ? `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(DEMO_LPA)}`
      : null as string | null,
    lpaString: demo ? DEMO_LPA : null as string | null,
    activationCode: demo ? "TN-DEMO-NOORLINK" : null as string | null,
    smdpAddress: demo ? "consumer.rsp.global" : null as string | null,
    orderNumber: demo ? "NL-DEMO-V2" : orderId || null,
    email: email || null,
  });

  useEffect(() => {
    if (demo || !email.trim() || !orderId.trim()) return;
    lookupOrder(email, orderId).then((result) => {
      if (!result.found || !result.order) return;
      const o = result.order;
      setActivation({
        qrCodeUrl: o.qrCodeUrl ?? null,
        lpaString: o.activationCode?.startsWith("LPA:") ? o.activationCode : null,
        activationCode: o.activationCode ?? null,
        smdpAddress: null,
        orderNumber: o.orderNumber ?? orderId,
        email: o.email ?? email,
      });
    });
  }, [demo, email, orderId]);

  return (
    <>
      <V2SiteHeader />
      <main className="v2-main v2-main--narrow">
        <div className="v2-success-banner">
          <span className="v2-success-banner__icon" aria-hidden="true">
            ✓
          </span>
          <h1>Payment confirmed</h1>
          <p>
            Your eSIM for {country} is ready to install
            {email ? ` — we also emailed ${email}` : ""}.
          </p>
          <p>
            Total: <strong>${price}</strong>
          </p>
        </div>

        <ActivationHub data={activation} demo={demo} />

        <section className="v2-section v2-topup-teaser">
          <h2>Need more data later?</h2>
          <p>
            Top-up on your existing eSIM — no new QR scan (when your plan supports recharge).
          </p>
          <Link href={previewPath("/dashboard")} className="v2-btn v2-btn--ghost">
            Top up current eSIM (preview)
          </Link>
        </section>
      </main>
    </>
  );
}

export function V2SuccessPage() {
  return (
    <Suspense fallback={<div className="v2-main">Loading…</div>}>
      <SuccessInner />
    </Suspense>
  );
}
