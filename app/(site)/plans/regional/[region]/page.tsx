import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TravelerPlansPage } from "@/components/plans/TravelerPlansPage";
import { getCountryImage } from "@/lib/country-image";
import { pingPlansApi } from "@/lib/plans-diagnostics";
import {
  getRegionalProduct,
  normalizeRegionalRouteSlug,
  type RegionalProduct,
} from "@/lib/regional-products";
import "@/styles/plans-dynamic.css";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ region: string }>;
};

function regionalImageSrc(product: RegionalProduct): string {
  if (product.routeSlug === "north-america") {
    return getCountryImage("usa");
  }
  return getCountryImage(product.routeSlug);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { region } = await params;
  const product = getRegionalProduct(region);
  if (!product) {
    return { title: "Regional eSIM Plans | NoorLink" };
  }

  return {
    title: `${product.displayName} eSIM Plans | NoorLink`,
    description: `${product.heroTagline} Covers ${product.countries.length} countries. Fixed, unlimited, and flexible plans.`,
  };
}

export default async function RegionalPlansPage({ params }: PageProps) {
  const { region } = await params;
  const routeSlug = normalizeRegionalRouteSlug(region);
  const product = routeSlug ? getRegionalProduct(routeSlug) : null;

  if (!product) {
    notFound();
  }

  const countryImage = regionalImageSrc(product);

  let initialData = null;
  let initialError: string | null = null;

  const connectivity = await pingPlansApi(product.apiCountryId, { serverSide: true });

  if (connectivity.ok && connectivity.data) {
    initialData = connectivity.data;
  } else {
    console.error("[plans/regional/[region]] Server fetch failed:", {
      region: product.routeSlug,
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
        countryId={product.apiCountryId}
        countryImage={countryImage}
        initialData={initialData}
        initialError={initialError}
        regional={product}
      />
    </>
  );
}
