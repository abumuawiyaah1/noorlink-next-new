import type { Metadata } from "next";
import "@/styles/dashboard.css";
import { PartnerDashboardClient } from "./PartnerDashboardClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Partner dashboard | NoorLink",
  description: "View your referral link, commissions, and payout balance.",
  path: "/partners/dashboard",
  noIndex: true,
});

export default function PartnerDashboardPage() {
  return <PartnerDashboardClient />;
}
