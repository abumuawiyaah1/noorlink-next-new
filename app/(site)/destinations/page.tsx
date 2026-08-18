import { Suspense } from "react";
import "@/styles/destinations.css";
import { ModernDestinationsPage } from "@/components/destinations/ModernDestinationsPage";

export default function Page() {
  return (
    <Suspense fallback={<DestinationsFallback />}>
      <ModernDestinationsPage />
    </Suspense>
  );
}

function DestinationsFallback() {
  return (
    <main className="container" style={{ padding: "48px 24px" }}>
      <p style={{ color: "#6b7280", fontWeight: 600 }}>Loading destinations…</p>
    </main>
  );
}
