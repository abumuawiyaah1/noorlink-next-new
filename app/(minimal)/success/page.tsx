import type { Metadata } from "next";
import "@/styles/success.css";
import { SuccessPage } from "@/components/legacy/SuccessPage";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Order confirmed | NoorLink",
  description: "Your NoorLink eSIM order is confirmed. Check your email for QR installation instructions.",
  path: "/success",
  noIndex: true,
});

export default function Page() {
  return <SuccessPage />;
}
