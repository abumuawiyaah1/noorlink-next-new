import type { Metadata } from "next";
import { PilgrimSelectionPage } from "@/components/pilgrimage/PilgrimSelectionPage";
import { getCountryImage } from "@/lib/country-image";
import { pingPlansApi } from "@/lib/plans-diagnostics";
import { buildPageMetadata } from "@/lib/seo";

/** Revalidate pilgrimage landing; plan prices refresh client-side. */
export const revalidate = 300;

const SAUDI_COUNTRY_ID = "saudi-arabia";

export const metadata: Metadata = buildPageMetadata({
  title: "Hajj & Umrah eSIM Plans | NoorLink",
  description:
    "Premium connectivity for your pilgrimage. Install at home, stay connected in Makkah and Madinah.",
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
  let initialError: string | null = null;

  const connectivity = await pingPlansApi(SAUDI_COUNTRY_ID, { serverSide: true });

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

  return (
    <>
      <link rel="preload" as="image" href={countryImage} fetchPriority="high" />
      <PilgrimSelectionPage
        countryImage={countryImage}
        initialData={initialData}
        initialError={initialError}
        initialPromo={initialPromo}
        initialRef={initialRef}
      />
    </>
  );
}
