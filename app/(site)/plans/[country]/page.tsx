import type { Metadata } from "next";
import { TravelerPlansPage } from "@/components/plans/TravelerPlansPage";
import { getCountryImage } from "@/lib/country-image";
import { normalizeCountrySlug } from "@/lib/country-slugs";
import { pingPlansApi } from "@/lib/plans-diagnostics";
import "@/styles/plans-dynamic.css";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ country: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country } = await params;
  const countryId = normalizeCountrySlug(country);
  const label = countryId.replace(/-/g, " ");

  return {
    title: `${label} eSIM Plans | NoorLink`,
    description: `Instant high-speed eSIM data for ${label}. Fixed, unlimited, and flexible plans for international travelers.`,
  };
}

export default async function CountryPlansPage({ params }: PageProps) {
  const { country } = await params;
  const countryId = normalizeCountrySlug(country);
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
      <link rel="preload" as="image" href={countryImage} fetchPriority="high" />
      <TravelerPlansPage
        countryId={countryId}
        countryImage={countryImage}
        initialData={initialData}
        initialError={initialError}
      />
    </>
  );
}
