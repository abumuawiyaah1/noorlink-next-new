import "@/styles/destinations.css";
import { ModernDestinationsPage } from "@/components/destinations/ModernDestinationsPage";
import { fetchDestinationStartingPrices } from "@/lib/destination-prices";

export const dynamic = "force-dynamic";

export default async function Page() {
  const prices = await fetchDestinationStartingPrices();
  return <ModernDestinationsPage prices={prices} />;
}
