import type { Metadata } from "next";
import { TravelerPlansPage } from "@/components/plans/TravelerPlansPage";
import { normalizeCountrySlug } from "@/lib/country-slugs";
import { fetchPlansByCountryServer } from "@/lib/plans-api";
import { buildRegionalPlansFallback } from "@/lib/regional-plans-fallback";
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

  let initialData;
  try {
    initialData = await fetchPlansByCountryServer(countryId);
  } catch (err) {
    console.error("[plans/[country]] Server fetch failed — regional fallback", {
      countryId,
      error: err,
    });
    initialData = buildRegionalPlansFallback(countryId);
  }

  return (
    <TravelerPlansPage
      countryId={countryId}
      initialData={initialData}
      initialError={null}
    />
  );
}
