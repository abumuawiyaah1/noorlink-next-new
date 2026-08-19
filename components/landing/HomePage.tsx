import { DestinationGrid } from "@/components/landing/DestinationGrid";
import { DeviceChecker } from "@/components/landing/DeviceChecker";
import { HomeFooter } from "@/components/landing/HomeFooter";
import { HomeHero } from "@/components/landing/HomeHero";
import { HomeNewsletter } from "@/components/landing/HomeNewsletter";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { LandingTicker } from "@/components/landing/LandingTicker";
import { PopularCountries } from "@/components/landing/PopularCountries";
import { Testimonials } from "@/components/landing/Testimonials";
import { TrustStatsBar } from "@/components/landing/TrustStatsBar";
import { UmrahPromo } from "@/components/landing/UmrahPromo";
import { WhyNoorLink } from "@/components/landing/WhyNoorLink";
import { SiteHeader } from "@/components/layout/SiteHeader";

export function HomePage() {
  return (
    <>
      <SiteHeader />
      <LandingTicker />
      <HomeHero />
      <TrustStatsBar />
      <HowItWorks />
      <UmrahPromo />
      <WhyNoorLink />
      <Testimonials />
      <DestinationGrid />
      <PopularCountries />
      <DeviceChecker />
      <HomeNewsletter />
      <HomeFooter />
    </>
  );
}
