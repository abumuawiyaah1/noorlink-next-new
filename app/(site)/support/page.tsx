import type { Metadata } from "next";
import { ModernSupportPage } from "@/components/support/ModernSupportPage";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Support | NoorLink",
  description: "24/7 help for NoorLink travel eSIMs, QR delivery, order lookup, and checkout.",
  path: "/support",
});

export default function Page() {
  return <ModernSupportPage />;
}
