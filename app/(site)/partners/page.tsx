import type { Metadata } from "next";
import { PartnersPageContent } from "@/components/partners/PartnersPageContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Partner & Referral Program | NoorLink",
  description:
    "Partner with NoorLink — trusted travel eSIMs for creators, masjids, and travel advisors. Apply or sign in to your partner account.",
  path: "/partners",
});

export default function PartnersPage() {
  return <PartnersPageContent />;
}
