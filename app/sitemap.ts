import type { MetadataRoute } from "next";
import { buildSitemapEntries } from "@/lib/sitemap-routes";

export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemapEntries();
}
