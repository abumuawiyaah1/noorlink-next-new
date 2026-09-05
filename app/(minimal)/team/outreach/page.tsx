import type { Metadata } from "next";
import { OutreachCrmPage } from "@/components/team/OutreachCrmPage";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Creator outreach | NoorLink team",
  description: "Internal creator outreach databank for NoorLink.",
  path: "/team/outreach",
  noIndex: true,
});

export default function Page() {
  return <OutreachCrmPage />;
}
