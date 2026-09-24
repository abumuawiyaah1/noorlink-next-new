import type { Metadata } from "next";
import "@/styles/content-pages.css";
import { ModernAboutPage } from "@/components/content/ModernAboutPage";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "About NoorLink | Travel eSIM",
  description:
    "NoorLink started after a family trip to Egypt with no data. Travel eSIM so you install before you fly and land connected.",
  path: "/about",
});

export default function Page() {
  return <ModernAboutPage />;
}
