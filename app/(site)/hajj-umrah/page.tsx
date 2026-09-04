import type { Metadata } from "next";
import { PilgrimSelectionPage } from "@/components/pilgrimage/PilgrimSelectionPage";
import { PILGRIMAGE_BRAND_LINE } from "@/lib/brand";
import { getCountryImage } from "@/lib/country-image";
import { ME_REGIONAL_API_ID } from "@/lib/pilgrim-route-plans";
import { pingPlansApi } from "@/lib/plans-diagnostics";
import { buildPageMetadata } from "@/lib/seo";

/** Revalidate pilgrimage landing; plan prices refresh client-side. */
export const revalidate = 300;

const SAUDI_COUNTRY_ID = "saudi-arabia";

export const metadata: Metadata = buildPageMetadata({
  title: "Hajj & Umrah eSIM Plans | NoorLink",
  description:
    `${PILGRIMAGE_BRAND_LINE}. Premium Umrah and Hajj eSIM plans — install at home, stay connected in Makkah and Madinah. Multi-stop Saudi + Turkey and Saudi + Egypt options available.`,
  path: "/hajj-umrah",
  image: getCountryImage("saudi-arabia"),
});

type HajjPageProps = {
  searchParams: Promise<{ promo?: string; code?: string; ref?: string }>;
};

export default async function HajjUmrahPage({ searchParams }: HajjPageProps) {
  const query = await searchParams;
  const initialPromo = query.promo ?? query.code ?? "";
  const initialRef = query.ref ?? "";
  const countryImage = getCountryImage(SAUDI_COUNTRY_ID);

  let initialData = null;
  let initialMeData = null;
  let initialError: string | null = null;

  const [connectivity, meConnectivity] = await Promise.all([
    pingPlansApi(SAUDI_COUNTRY_ID, { serverSide: true }),
    pingPlansApi(ME_REGIONAL_API_ID, { serverSide: true }),
  ]);

  if (connectivity.ok && connectivity.data) {
    initialData = connectivity.data;
  } else {
    console.error("[hajj-umrah] Server fetch failed:", {
      countryId: SAUDI_COUNTRY_ID,
      connectivity,
    });
    initialError =
      connectivity.error ??
      "Unable to load plans. The service may be temporarily unavailable.";
  }

  if (meConnectivity.ok && meConnectivity.data) {
    initialMeData = meConnectivity.data;
  } else {
    console.error("[hajj-umrah] ME regional fetch failed:", {
      countryId: ME_REGIONAL_API_ID,
      meConnectivity,
    });
  }

  return (
    <>
      <link rel="preload" as="image" href={countryImage} fetchPriority="high" />
      <PilgrimSelectionPage
        countryImage={countryImage}
        initialData={initialData}
        initialMeData={initialMeData}
        initialError={initialError}
        initialPromo={initialPromo}
        initialRef={initialRef}
      />
    </>
  );
}
