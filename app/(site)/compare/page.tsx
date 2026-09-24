import type { Metadata } from "next";
import "@/styles/content-pages.css";
import { EsimComparisonPage } from "@/components/content/EsimComparisonPage";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "eSIM Comparison | NoorLink vs Airalo, Holafly & more",
  description:
    "Compare NoorLink with Airalo, Holafly, Nomad, Saily, GigSky, and Maya Mobile — hotspot, Hajj & Umrah plans, support, and install-before-you-fly guidance.",
  path: "/compare",
});

export default function Page() {
  return <EsimComparisonPage />;
}
