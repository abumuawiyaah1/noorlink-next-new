import { PilgrimSelectionPage } from "@/components/pilgrimage/PilgrimSelectionPage";
import { fetchPlansByCountryServer } from "@/lib/plans-api";
import { buildRegionalPlansFallback } from "@/lib/regional-plans-fallback";

export const dynamic = "force-dynamic";

const SAUDI_COUNTRY_ID = "saudi-arabia";

export const metadata = {
  title: "Hajj & Umrah eSIM Plans | NoorLink",
  description:
    "Premium connectivity for your pilgrimage. Install at home, stay connected in Saudi Arabia.",
};

export default async function HajjUmrahPage() {
  let initialData;
  try {
    initialData = await fetchPlansByCountryServer(SAUDI_COUNTRY_ID);
  } catch (err) {
    console.error("[hajj-umrah] Server fetch failed — regional fallback", {
      countryId: SAUDI_COUNTRY_ID,
      error: err,
    });
    initialData = buildRegionalPlansFallback(SAUDI_COUNTRY_ID);
  }

  return (
    <PilgrimSelectionPage
      initialData={initialData}
      initialError={null}
    />
  );
}
