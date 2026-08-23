import { PilgrimSelectionPage } from "@/components/pilgrimage/PilgrimSelectionPage";
import { getCountryImage } from "@/lib/country-image";
import { pingPlansApi } from "@/lib/plans-diagnostics";

export const dynamic = "force-dynamic";

const SAUDI_COUNTRY_ID = "saudi-arabia";

export const metadata = {
  title: "Hajj & Umrah eSIM Plans | NoorLink",
  description:
    "Premium connectivity for your pilgrimage. Install at home, stay connected in Saudi Arabia.",
};

export default async function HajjUmrahPage() {
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
      />
    </>
  );
}
