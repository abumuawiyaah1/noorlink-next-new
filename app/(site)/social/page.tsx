import type { Metadata } from "next";
import { SocialHubPage } from "@/components/social/SocialHubPage";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Social toolkit | NoorLink",
  description: "Internal links and posting resources for NoorLink social media.",
  path: "/social",
  noIndex: true,
});

export default function Page() {
  return <SocialHubPage />;
}
