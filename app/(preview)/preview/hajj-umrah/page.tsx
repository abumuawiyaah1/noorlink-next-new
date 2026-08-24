import { PilgrimSelectionPage } from "@/components/pilgrimage/PilgrimSelectionPage";
import { getCountryImage } from "@/lib/country-image";
import { pingPlansApi } from "@/lib/plans-diagnostics";
import { PREVIEW_BASE } from "@/lib/v2/preview-paths";
import "@/styles/plans-dynamic.css";
import "@/styles/hajj-umrah.css";

export const dynamic = "force-dynamic";

const SAUDI_COUNTRY_ID = "saudi-arabia";

export const metadata = {
  title: "Hajj & Umrah (v2 Preview) | NoorLink",
  robots: { index: false, follow: false },
};

export default async function PreviewHajjPage() {
  const countryImage = getCountryImage(SAUDI_COUNTRY_ID);

  let initialData = null;
  let initialError: string | null = null;

  const connectivity = await pingPlansApi(SAUDI_COUNTRY_ID, { serverSide: true });

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
      <PilgrimSelectionPage
        countryImage={countryImage}
        initialData={initialData}
        initialError={initialError}
        siteBase={PREVIEW_BASE}
        headerVariant="v2"
      />
    </>
  );
}
