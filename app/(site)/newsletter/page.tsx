import type { Metadata } from "next";
import "@/styles/content-pages.css";
import "@/styles/insider.css";
import { ModernNewsletterPage } from "@/components/content/ModernNewsletterPage";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "NoorLink Insider Newsletter",
  description:
    "Monthly travel tips, destination guides, and subscriber-only eSIM offers. Install before you fly.",
  path: "/newsletter",
});

export default function Page() {
  return <ModernNewsletterPage />;
}
