"use client";

import Link from "next/link";
import { V2SiteHeader } from "@/components/v2/V2SiteHeader";
import { previewPath } from "@/lib/v2/preview-paths";
import { REGIONAL_PRODUCTS } from "@/lib/regional-products";

const FEATURED = [
  { href: previewPath("/hajj-umrah"), flag: "🇸🇦", name: "Saudi Arabia (Hajj & Umrah)", note: "Primary corridor" },
  { href: previewPath("/plans/saudi-arabia"), flag: "🇸🇦", name: "Saudi Arabia (Travel)", note: "Country plans" },
  { href: previewPath("/plans/united-states"), flag: "🇺🇸", name: "United States", note: "Popular" },
  { href: previewPath("/plans/turkey"), flag: "🇹🇷", name: "Turkey", note: "Popular" },
] as const;

export function V2DestinationsPage() {
  return (
    <>
      <V2SiteHeader />
      <main className="v2-main">
        <h1>Destinations</h1>
        <p className="v2-dashboard__sub">Browse countries and regional passes (preview v2).</p>

        <section className="v2-section">
          <h2 className="v2-section__title">Featured</h2>
          <div className="v2-corridor-grid">
            {FEATURED.map((item) => (
              <Link key={item.href} href={item.href} className="v2-corridor-card">
                <span>{item.flag}</span>
                <strong>{item.name}</strong>
                <p>{item.note}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="v2-section">
          <h2 className="v2-section__title">Regional passes</h2>
          <div className="v2-corridor-grid">
            {Object.values(REGIONAL_PRODUCTS).map((product) => (
              <Link
                key={product.routeSlug}
                href={previewPath(`/plans/regional/${product.routeSlug}`)}
                className="v2-corridor-card"
              >
                <span>{product.flag}</span>
                <strong>{product.displayName}</strong>
                <p>{product.countries.length} countries</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
