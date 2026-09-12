"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { OrderLookupCard } from "@/components/orders/OrderLookupCard";

function DashboardContent() {
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get("email") ?? "";
  const initialOrderId = searchParams.get("orderId") ?? "";
  const initialToken = searchParams.get("myEsimsToken") ?? "";
  const topupSuccess = searchParams.get("topup") === "1";

  return (
    <>
      <SiteHeader />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "My eSIMs" }]} />
      <div id="login-view">
        <OrderLookupCard
          title="Your eSIM"
          description="Use the email and order ID from your confirmation (looks like NL-…)."
          submitLabel="Open my eSIM"
          initialEmail={initialEmail}
          initialOrderId={initialOrderId}
          initialToken={initialToken}
          topupSuccess={topupSuccess}
        />
      </div>
      <SiteFooter />
    </>
  );
}

export function ModernDashboardPage() {
  return (
    <Suspense fallback={<main className="container" style={{ padding: "2rem 0" }}>Loading…</main>}>
      <DashboardContent />
    </Suspense>
  );
}
