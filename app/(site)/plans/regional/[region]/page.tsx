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
import { localizeRegionalProduct, regionalMetaCopy } from "@/lib/i18n/regional";
import { getRequestLocale } from "@/lib/i18n/request-locale";
import { buildPageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, productJsonLd } from "@/lib/structured-data";
import "@/styles/plans-dynamic.css";

/** Revalidate plan shell + metadata; live prices still refresh client-side. */
export const revalidate = 300;

type PageProps = {
  params: Promise<{ region: string }>;
  searchParams: Promise<{ promo?: string; code?: string; ref?: string }>;
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

  const locale = await getRequestLocale();
  const meta = regionalMetaCopy(product, locale);

  return buildPageMetadata({
    title: meta.title,
    description: meta.description,
    path: plansPathForRegion(product.routeSlug),
    image: regionalImageSrc(product),
  });
}

export default async function RegionalPlansPage({ params, searchParams }: PageProps) {
  const { region } = await params;
  const query = await searchParams;
  const initialPromo = query.promo ?? query.code ?? "";
  const initialRef = query.ref ?? "";
  const routeSlug = normalizeRegionalRouteSlug(region);
  const product = routeSlug ? getRegionalProduct(routeSlug) : null;

  if (!product) {
    notFound();
  }

  const countryImage = regionalImageSrc(product);
  const locale = await getRequestLocale();
  const localizedProduct = localizeRegionalProduct(product, locale);

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
            name: `${localizedProduct.displayName} eSIM`,
            description: localizedProduct.heroTagline,
            path: plansPathForRegion(product.routeSlug),
            image: countryImage,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Destinations", path: "/destinations" },
            {
              name: localizedProduct.displayName,
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
        initialRef={initialRef}
      />
    </>
  );
}
