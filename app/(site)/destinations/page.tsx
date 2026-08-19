import "@/styles/destinations.css";
import { ModernDestinationsPage } from "@/components/destinations/ModernDestinationsPage";

type DestinationsPageProps = {
  searchParams: Promise<{ q?: string; country?: string }>;
};

export default async function Page({ searchParams }: DestinationsPageProps) {
  const params = await searchParams;
  const initialQuery = params.q ?? params.country ?? "";

  return <ModernDestinationsPage initialQuery={initialQuery} />;
}
