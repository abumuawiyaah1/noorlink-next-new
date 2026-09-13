import type { Metadata } from "next";
import { BeforeYouFlyGuidePage } from "@/components/support/BeforeYouFlyGuidePage";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Before you fly — make data ready | NoorLink",
  description:
    "Visual guide: turn your travel eSIM line on, enable Data Roaming, and set Cellular Data to the travel line before you fly.",
  path: "/help/before-you-fly",
});

export default function Page() {
  return <BeforeYouFlyGuidePage />;
}
