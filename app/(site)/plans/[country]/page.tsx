import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { TravelerPlansPage } from "@/components/plans/TravelerPlansPage";
import { getCountryImage } from "@/lib/country-image";
import { formatCountryLabel, normalizeCountrySlug } from "@/lib/country-slugs";
import { pingPlansApi } from "@/lib/plans-diagnostics";
import {
  normalizeRegionalRouteSlug,
  plansPathForRegion,
} from "@/lib/regional-products";
import { buildPageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, productJsonLd } from "@/lib/structured-data";
import "@/styles/plans-dynamic.css";

const REGIONAL_REDIRECT_SLUGS = new Set([
  "europe",
  "eu",
  "schengen",
  "asia",
  "asia-pacific",
  "middle-east",
  "north-america",
  "africa",
  "south-america",
  "latam",
  "latin-america",
  "caribbean",
  "carribean",
  "global",
  "worldwide",
  "world",
]);

/** Revalidate plan shell + metadata; live prices still refresh client-side. */
export const revalidate = 300;

type PageProps = {
  params: Promise<{ country: string }>;
  searchParams: Promise<{ promo?: string; code?: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country } = await params;
  const countryId = normalizeCountrySlug(country);
  const label = formatCountryLabel(countryId);
  const path = `/plans/${countryId}`;

  return buildPageMetadata({
    title: `${label} eSIM Plans | NoorLink`,
    description: `Instant high-speed eSIM data for ${label}. Fixed, unlimited, and flexible plans for international travelers. Install before you fly.`,
    path,
    image: getCountryImage(countryId),
  });
}

export default async function CountryPlansPage({ params, searchParams }: PageProps) {
  const { country } = await params;
  const query = await searchParams;
  const countryId = normalizeCountrySlug(country);
  const initialPromo = query.promo ?? query.code ?? "";

  if (REGIONAL_REDIRECT_SLUGS.has(countryId)) {
    const regionalRoute = normalizeRegionalRouteSlug(countryId);
    if (regionalRoute) {
      redirect(plansPathForRegion(regionalRoute));
    }
  }

  const countryImage = getCountryImage(countryId);

  let initialData = null;
  let initialError: string | null = null;

  const connectivity = await pingPlansApi(countryId, { serverSide: true });

  if (connectivity.ok && connectivity.data) {
    initialData = connectivity.data;
  } else {
    console.error("[plans/[country]] Server fetch failed:", {
      countryId,
      connectivity,
    });
    initialError =
      connectivity.error ??
      "Unable to load plans. The service may be temporarily unavailable.";
  }

  return (
    <>
      <JsonLd
        data={[
          productJsonLd({
            name: `${formatCountryLabel(countryId)} eSIM`,
            description: `Travel eSIM data plans for ${formatCountryLabel(countryId)}.`,
            path: `/plans/${countryId}`,
            image: countryImage,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Destinations", path: "/destinations" },
            { name: formatCountryLabel(countryId), path: `/plans/${countryId}` },
          ]),
        ]}
      />
      <link rel="preload" as="image" href={countryImage} fetchPriority="high" />
      <TravelerPlansPage
        countryId={countryId}
        countryImage={countryImage}
        initialData={initialData}
        initialError={initialError}
        initialPromo={initialPromo}
      />
    </>
  );
}
