import type { Metadata } from "next";
import "@/styles/content-pages.css";
import "@/styles/learn.css";
import { LearnIndexPage } from "@/components/content/LearnIndexPage";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Learn | Travel notes from NoorLink",
  description:
    "Calm travel notes for families, first hours after landing, and Umrah or Hajj prep — each one with a practical way to stay online.",
  path: "/learn",
});

export default function Page() {
  return <LearnIndexPage />;
}
