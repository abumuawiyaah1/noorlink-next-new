"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { OrderLookupCard } from "@/components/orders/OrderLookupCard";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { useLocaleState } from "@/lib/i18n/use-locale";

function DashboardContent() {
  const [locale] = useLocaleState();
  const dict = getDictionary(locale);
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get("email") ?? "";
  const initialOrderId = searchParams.get("orderId") ?? "";
  const initialToken = searchParams.get("myEsimsToken") ?? "";
  const topupSuccess = searchParams.get("topup") === "1";

  return (
    <>
      <SiteHeader />
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { label: dict.dashboard.title },
        ]}
      />
      <div id="login-view">
        <OrderLookupCard
          title={dict.dashboard.title}
          description={dict.dashboard.lookupHint}
          submitLabel={dict.dashboard.lookupTitle}
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
    <Suspense
      fallback={
        <main className="container" style={{ padding: "2rem 0" }}>
          Loading…
        </main>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
