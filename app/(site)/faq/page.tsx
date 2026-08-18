import type { Metadata } from "next";
import { ModernFaqPage } from "@/components/support/ModernFaqPage";

export const metadata: Metadata = {
  title: "FAQ | NoorLink",
  description: "Frequently asked questions about NoorLink travel eSIMs.",
};

export default function Page() {
  return <ModernFaqPage />;
}
