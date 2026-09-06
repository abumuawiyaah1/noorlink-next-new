import type { Metadata } from "next";
import "@/styles/destinations.css";
import { ModernDestinationsPage } from "@/components/destinations/ModernDestinationsPage";
import { parseDestinationFilter } from "@/lib/destinations-catalog";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Travel eSIM Destinations | NoorLink",
  description:
    "Browse 190+ countries and regional eSIM plans. Compare live prices, pick your destination, and install before you fly.",
  path: "/destinations",
});

type DestinationsPageProps = {
  searchParams: Promise<{
    q?: string;
    country?: string;
    region?: string;
    promo?: string;
    code?: string;
    ref?: string;
  }>;
};

export default async function Page({ searchParams }: DestinationsPageProps) {
  const params = await searchParams;
  const initialQuery = params.q ?? params.country ?? "";
  const initialRegion = parseDestinationFilter(params.region);
  const initialPromo = params.promo ?? params.code ?? "";
  const initialRef = params.ref ?? "";

  return (
    <ModernDestinationsPage
      initialQuery={initialQuery}
      initialRegion={initialRegion}
      initialPromo={initialPromo}
      initialRef={initialRef}
    />
  );
}
