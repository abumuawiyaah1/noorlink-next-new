import type { Metadata } from "next";
import "@/styles/content-pages.css";
import { EsimComparisonPage } from "@/components/content/EsimComparisonPage";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  esimCompareFaqJsonLd,
  esimCompareItemListJsonLd,
} from "@/lib/esim-comparison";
import { buildPageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = buildPageMetadata({
  title: "eSIM Comparison 2026 | NoorLink vs Airalo, Holafly & more",
  description:
    "Travel eSIM comparison: NoorLink vs Airalo, Holafly, Nomad, Saily, GigSky, and Maya Mobile — hotspot, Hajj & Umrah plans, WhatsApp support, and install-before-you-fly guidance.",
  path: "/compare",
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "eSIM comparison", path: "/compare" },
          ]),
          esimCompareFaqJsonLd(),
          esimCompareItemListJsonLd(),
        ]}
      />
      <EsimComparisonPage />
    </>
  );
}
