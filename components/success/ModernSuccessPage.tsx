"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { formatCountryLabel } from "@/lib/country-slugs";

function SuccessContent() {
  const searchParams = useSearchParams();
  const country = formatCountryLabel(searchParams.get("country") ?? "your destination");
  const price = searchParams.get("price") ?? "0.00";
  const email = searchParams.get("email");

  return (
    <>
      <SiteHeader />
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/destinations", label: "Destinations" },
          { label: "Order confirmed" },
        ]}
      />

      <div className="container">
        <div className="success-banner">
          <div className="check-icon">
            <i className="fas fa-check-circle" aria-hidden="true" />
          </div>
          <h1>Payment Successful!</h1>
          <p>
            Your eSIM for {country} is being prepared
            {email ? ` — delivery email goes to ${email}` : ""}.
          </p>
          <p style={{ fontSize: "0.95rem", opacity: 0.85 }}>
            Check your inbox and spam folder for the QR code and install instructions.
            It usually arrives within a minute after payment confirms.
          </p>
          <p>
            Order total: <strong>${price}</strong>
          </p>
        </div>

        <div className="loyalty-grid">
          <div className="loyalty-card card-gift">
            <div className="gift-title">
              <i className="fas fa-gift" aria-hidden="true" /> A Gift for You
            </div>
            <p style={{ fontSize: "0.9rem" }}>10% OFF your next trip!</p>
            <div className="coupon-code">NOOR-VIP-10</div>
          </div>
          <div className="loyalty-card card-refer">
            <p>Refer a friend and earn travel credit on your next plan.</p>
            <Link href="/destinations" className="btn-nav">
              Explore destinations
            </Link>
          </div>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}

export function ModernSuccessPage() {
  return (
    <Suspense fallback={<main className="container">Loading…</main>}>
      <SuccessContent />
    </Suspense>
  );
}
