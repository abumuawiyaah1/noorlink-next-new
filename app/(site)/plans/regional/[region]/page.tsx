import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { TravelerPlansPage } from "@/components/plans/TravelerPlansPage";
import { getCountryImage } from "@/lib/country-image";
import { pingPlansApi } from "@/lib/plans-diagnostics";
import {
  getRegionalProduct,
  normalizeRegionalRouteSlug,
  plansPathForRegion,
  type RegionalProduct,
} from "@/lib/regional-products";
import { buildPageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, productJsonLd } from "@/lib/structured-data";
import "@/styles/plans-dynamic.css";

/** Revalidate plan shell + metadata; live prices still refresh client-side. */
export const revalidate = 300;

type PageProps = {
  params: Promise<{ region: string }>;
  searchParams: Promise<{ promo?: string; code?: string }>;
};

function regionalImageSrc(product: RegionalProduct): string {
  if (product.routeSlug === "caribbean") {
    return getCountryImage("caribbean");
  }
  if (product.routeSlug === "north-america") {
    return getCountryImage("usa");
  }
  if (product.routeSlug === "global") {
    return getCountryImage("europe");
  }
  if (product.routeSlug === "africa") {
    return getCountryImage("africa");
  }
  if (product.routeSlug === "south-america") {
    return getCountryImage("brazil");
  }
  return getCountryImage(product.routeSlug);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { region } = await params;
  const product = getRegionalProduct(region);
  if (!product) {
    return { title: "Regional eSIM Plans | NoorLink" };
  }

  return buildPageMetadata({
    title: `${product.displayName} eSIM Plans | NoorLink`,
    description: `${product.heroTagline} Covers ${product.countries.length} countries. Fixed, unlimited, and flexible plans.`,
    path: plansPathForRegion(product.routeSlug),
    image: regionalImageSrc(product),
  });
}

export default async function RegionalPlansPage({ params, searchParams }: PageProps) {
  const { region } = await params;
  const query = await searchParams;
  const initialPromo = query.promo ?? query.code ?? "";
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
      <JsonLd
        data={[
          productJsonLd({
            name: `${product.displayName} eSIM`,
            description: product.heroTagline,
            path: plansPathForRegion(product.routeSlug),
            image: countryImage,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Destinations", path: "/destinations" },
            {
              name: product.displayName,
              path: plansPathForRegion(product.routeSlug),
            },
          ]),
        ]}
      />
      <link rel="preload" as="image" href={countryImage} fetchPriority="high" />
      <TravelerPlansPage
        countryId={product.apiCountryId}
        countryImage={countryImage}
        initialData={initialData}
        initialError={initialError}
        regional={product}
        initialPromo={initialPromo}
      />
    </>
  );
}
