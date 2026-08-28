import type { Metadata } from "next";
import "@/styles/content-pages.css";
import { GivePage } from "@/components/content/GivePage";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Give with NoorLink",
  description: "Support community connectivity initiatives through NoorLink.",
  path: "/give",
});

export default function Page() {
  return <GivePage />;
}
