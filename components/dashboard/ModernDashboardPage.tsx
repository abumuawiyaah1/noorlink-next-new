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

  return (
    <>
      <SiteHeader />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "My eSIMs" }]} />
      <div id="login-view">
        <OrderLookupCard
          title="Manage eSIM"
          description="Enter the email and order ID from your confirmation email to check delivery, QR access, and plan status."
          submitLabel="View My eSIM"
          initialEmail={initialEmail}
          initialOrderId={initialOrderId}
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
