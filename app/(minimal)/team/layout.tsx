import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Team dashboard | NoorLink",
  description: "Redirects to the NoorLink admin dashboard.",
  path: "/team",
  noIndex: true,
});

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return children;
}
