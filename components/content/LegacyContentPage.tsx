"use client";

import { StaticHtmlContent } from "@/components/content/StaticHtmlContent";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader, type NavItem } from "@/components/layout/SiteHeader";

type LegacyContentPageProps = {
  bodyHtml: string;
  nav?: NavItem[];
  logoClassName?: string;
  stripHeader?: boolean;
  stripFooter?: boolean;
};

/** Static legacy page shell: React header + sanitized HTML body (no scripts). */
export function LegacyContentPage({
  bodyHtml,
  nav,
  logoClassName,
  stripHeader = true,
  stripFooter = true,
}: LegacyContentPageProps) {
  return (
    <>
      <SiteHeader nav={nav} logoClassName={logoClassName} />
      <StaticHtmlContent
        html={bodyHtml}
        stripHeader={stripHeader}
        stripFooter={stripFooter}
        stripWhatsApp
      />
      <SiteFooter />
    </>
  );
}
