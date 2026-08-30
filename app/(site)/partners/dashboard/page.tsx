import type { Metadata } from "next";
import { PartnerDashboardClient } from "./PartnerDashboardClient";

export const metadata: Metadata = {
  title: "Partner dashboard | NoorLink",
  description: "View your referral link, commissions, and payout balance.",
};

export default function PartnerDashboardPage() {
  return <PartnerDashboardClient />;
}
