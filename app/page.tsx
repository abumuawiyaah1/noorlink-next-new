import type { Metadata } from "next";
import "@/styles/landing.css";
import { HomePage } from "@/components/landing/HomePage";
import { buildPageMetadata } from "@/lib/seo";
import { SITE_IMAGES } from "@/lib/site-images";

export const metadata: Metadata = buildPageMetadata({
  title: "NoorLink | Travel eSIM — Free Phone Compatibility Check",
  description:
    "Travel eSIM data in 190+ countries. Free phone compatibility check before you buy — confirm your device supports eSIM, then install before you fly.",
  path: "/",
  image: SITE_IMAGES.heroOg,
});

export default function Home() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href={SITE_IMAGES.heroMobile}
        media="(max-width: 768px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href={SITE_IMAGES.hero}
        media="(min-width: 769px)"
        fetchPriority="high"
      />
      <HomePage />
    </>
  );
}
