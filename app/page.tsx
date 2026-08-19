import type { Metadata } from "next";
import "@/styles/landing.css";
import { HomePage } from "@/components/landing/HomePage";
import { SITE_IMAGES } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "NoorLink | Instant Travel eSIMs",
  description:
    "Enjoy hassle-free travel with instant high-speed eSIM data in 190+ countries. No physical SIM required.",
  icons: { icon: "/images/favicon.png" },
};

export default function Home() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href={SITE_IMAGES.hero}
        fetchPriority="high"
      />
      <HomePage />
    </>
  );
}
