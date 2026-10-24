"use client";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { PartnerLoginPanel } from "@/components/partners/PartnerLoginPanel";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizedPath } from "@/lib/i18n/path";
import { useLocaleState } from "@/lib/i18n/use-locale";
import "@/styles/content-pages.css";
import "@/styles/partners.css";

export function PartnerDashboardClient() {
  const [locale] = useLocaleState();
  const dict = getDictionary(locale);
  const p = dict.partnersPage;

  return (
    <>
      <SiteHeader />
      <Breadcrumbs
        items={[
          { href: localizedPath("/", locale), label: dict.common.home },
          { href: localizedPath("/partners", locale), label: p.crumb },
          { label: p.dashboardCrumb },
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
