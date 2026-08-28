import type { Metadata } from "next";
import "@/styles/content-pages.css";
import { ModernAboutPage } from "@/components/content/ModernAboutPage";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "About NoorLink | Travel eSIM",
  description:
    "NoorLink helps travelers stay connected with instant eSIM data in 190+ countries. Calm, practical connectivity — install before you fly.",
  path: "/about",
});

export default function Page() {
  return <ModernAboutPage />;
}
