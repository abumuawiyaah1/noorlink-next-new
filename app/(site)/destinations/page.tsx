import "@/styles/destinations.css";
import { ModernDestinationsPage } from "@/components/destinations/ModernDestinationsPage";
import { DESTINATION_FILTERS, type DestinationRegion } from "@/lib/destinations-catalog";

type DestinationsPageProps = {
  searchParams: Promise<{ q?: string; country?: string; region?: string }>;
};

function parseRegion(value?: string): "all" | DestinationRegion {
  if (!value) return "all";
  const match = DESTINATION_FILTERS.find(
    (filter) => filter.id.toLowerCase() === value.toLowerCase(),
  );
  return match?.id ?? "all";
}

export default async function Page({ searchParams }: DestinationsPageProps) {
  const params = await searchParams;
  const initialQuery = params.q ?? params.country ?? "";
  const initialRegion = parseRegion(params.region);

  return (
    <ModernDestinationsPage
      initialQuery={initialQuery}
      initialRegion={initialRegion}
    />
  );
}
