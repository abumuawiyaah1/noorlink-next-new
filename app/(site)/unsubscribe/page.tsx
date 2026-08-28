import type { Metadata } from "next";
import { Suspense } from "react";
import "@/styles/content-pages.css";
import "@/styles/insider.css";
import { InsiderUnsubscribePage } from "@/components/insider/InsiderUnsubscribePage";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Unsubscribe | NoorLink Insider",
  description: "Manage your NoorLink Insider newsletter subscription.",
  path: "/unsubscribe",
  noIndex: true,
});

export default function UnsubscribeRoute() {
  return (
    <Suspense fallback={null}>
      <InsiderUnsubscribePage />
    </Suspense>
  );
}
