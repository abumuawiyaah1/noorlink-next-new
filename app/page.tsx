import type { Metadata } from "next";
import "@/styles/landing.css";
import { HomePage } from "@/components/landing/HomePage";
import { buildPageMetadata } from "@/lib/seo";
import { SITE_IMAGES } from "@/lib/site-images";

export const metadata: Metadata = buildPageMetadata({
  title: "NoorLink | Instant Travel eSIMs",
  description:
    "Enjoy hassle-free travel with instant high-speed eSIM data in 190+ countries. Install before you fly — no physical SIM required.",
  path: "/",
  image: SITE_IMAGES.hero,
});

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
