import type { Metadata } from "next";
import { ModernSupportPage } from "@/components/support/ModernSupportPage";

export const metadata: Metadata = {
  title: "Support | NoorLink",
  description: "24/7 help for NoorLink travel eSIMs, delivery, and checkout.",
};

export default function Page() {
  return <ModernSupportPage />;
}
