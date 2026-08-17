"use client";

import { DestinationGridMount } from "@/components/landing/DestinationGridMount";
import { DeviceCheckerBridge } from "@/components/landing/DeviceCheckerBridge";
import { HeroSearchMount } from "@/components/landing/HeroSearchMount";
import { LandingTicker } from "@/components/landing/LandingTicker";
import { TrustStatsBar } from "@/components/landing/TrustStatsBar";
import { WhatsAppFab } from "@/components/landing/WhatsAppFab";
import { StaticHtmlContent } from "@/components/content/StaticHtmlContent";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { bodyHtml } from "@/lib/legacy/pages/landing";

export function LandingPage() {
  return (
    <>
      <SiteHeader />
      <LandingTicker />
      <StaticHtmlContent
        html={bodyHtml}
        stripHeader
        stripFooter
        stripTicker
        // Keep mount-point divs in the DOM so React portals can attach.
        // (Previously stripping them left Check Device / hero search unwired.)
        stripWhatsApp
      />
      <HeroSearchMount />
      <TrustStatsBar />
      <DestinationGridMount />
      <DeviceCheckerBridge />
      <WhatsAppFab />
    </>
  );
}
