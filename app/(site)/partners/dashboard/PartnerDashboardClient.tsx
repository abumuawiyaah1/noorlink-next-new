"use client";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { PartnerLoginPanel } from "@/components/partners/PartnerLoginPanel";
import "@/styles/content-pages.css";
import "@/styles/partners.css";

export function PartnerDashboardClient() {
  return (
    <>
      <SiteHeader />
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/partners", label: "Partners" },
          { label: "Dashboard" },
        ]}
      />
      <main className="content-page partner-dashboard-page">
        <div className="partner-dashboard-view">
          <PartnerLoginPanel variant="standalone" />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
