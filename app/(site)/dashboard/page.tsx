import type { Metadata } from "next";
import "@/styles/dashboard.css";
import "@/styles/esim-install.css";
import { DashboardPage } from "@/components/legacy/DashboardPage";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "My eSIMs | NoorLink",
  description: "Track your NoorLink eSIM orders and usage.",
  path: "/dashboard",
  noIndex: true,
});

export default function Page() {
  return <DashboardPage />;
}
