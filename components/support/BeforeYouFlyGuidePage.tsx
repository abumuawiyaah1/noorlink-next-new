"use client";

import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { LandingReadyChecklist } from "@/components/orders/LandingReadyChecklist";
import { WHATSAPP_NUMBER } from "@/components/ui/WhatsAppFab";
import "@/styles/help-pages.css";

const WHATSAPP_GUIDE_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi NoorLink — my eSIM is installed but I have no data after landing. I followed the before-you-fly guide.",
)}`;

export function BeforeYouFlyGuidePage() {
  return (
    <>
      <SiteHeader />
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/support", label: "Support" },
          { label: "Before you fly" },
        ]}
      />
      <main className="help-page">
        <section className="help-hero">
          <p className="help-hero__brand" aria-hidden="true">
            Noor<span>Link</span>
          </p>
          <h1>Before you fly — make data ready</h1>
          <p>
            Installed is not enough. Use these three checks on Wi‑Fi so maps and
            messages work when you land.
          </p>
        </section>
        <div className="help-inner">
          <LandingReadyChecklist preview />

          <div className="help-card" style={{ marginTop: 24 }}>
            <h2>Still no data after landing?</h2>
            <p>
              Toggle Airplane Mode once, wait about a minute, then re-check the
              three switches above. Do not delete the eSIM. Need a human?{" "}
              <a href={WHATSAPP_GUIDE_HREF} target="_blank" rel="noopener noreferrer">
                WhatsApp support
              </a>{" "}
              or open{" "}
              <Link href="/dashboard">My eSIMs</Link>.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
