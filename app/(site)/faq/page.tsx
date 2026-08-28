import type { Metadata } from "next";
import { ModernFaqPage } from "@/components/support/ModernFaqPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageJsonLd } from "@/lib/faq-content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "FAQ | NoorLink",
  description:
    "Answers about eSIM delivery, QR codes, phone compatibility, WhatsApp, refunds, and installing before you fly.",
  path: "/faq",
});

export default function Page() {
  return (
    <>
      <JsonLd data={faqPageJsonLd()} />
      <ModernFaqPage />
    </>
  );
}
