import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { TravelerPlansPage } from "@/components/plans/TravelerPlansPage";
import { getCountryImage } from "@/lib/country-image";
import { formatCountryLabel, normalizeCountrySlug } from "@/lib/country-slugs";
import { pingPlansApi } from "@/lib/plans-diagnostics";
import {
  normalizeRegionalRouteSlug,
} from "@/lib/regional-products";
import { PREVIEW_BASE, previewPath } from "@/lib/v2/preview-paths";
import "@/styles/plans-dynamic.css";

export const dynamic = "force-dynamic";

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
  "global",
  "worldwide",
  "world",
]);

type PageProps = {
  params: Promise<{ country: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country } = await params;
  const countryId = normalizeCountrySlug(country);
  const label = formatCountryLabel(countryId);

  return {
    title: `${label} eSIM (v2 Preview) | NoorLink`,
    robots: { index: false, follow: false },
  };
}

export default async function PreviewCountryPlansPage({ params }: PageProps) {
  const { country } = await params;
  const countryId = normalizeCountrySlug(country);

  if (REGIONAL_REDIRECT_SLUGS.has(countryId)) {
    const regionalRoute = normalizeRegionalRouteSlug(countryId);
    if (regionalRoute) {
      redirect(previewPath(`/plans/regional/${regionalRoute}`));
    }
  }

  const countryImage = getCountryImage(countryId);

  let initialData = null;
  let initialError: string | null = null;

  const connectivity = await pingPlansApi(countryId, { serverSide: true });

  if (connectivity.ok && connectivity.data) {
    initialData = connectivity.data;
  } else {
    initialError =
      connectivity.error ??
      "Unable to load plans. The service may be temporarily unavailable.";
  }

  return (
    <>
      <link rel="preload" as="image" href={countryImage} fetchPriority="high" />
      <TravelerPlansPage
        countryId={countryId}
        countryImage={countryImage}
        initialData={initialData}
        initialError={initialError}
        siteBase={PREVIEW_BASE}
        headerVariant="v2"
      />
    </>
  );
}
