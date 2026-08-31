"use client";

import Link from "next/link";
import {
  plansPathForRegion,
  REGIONAL_ROUTE_SLUGS,
  REGIONAL_PRODUCTS,
} from "@/lib/regional-products";
import { RegionalWorldMap } from "@/components/landing/RegionalWorldMap";
import { DestinationCardMedia } from "@/components/ui/DestinationCardMedia";
import { getRegionalImageUrl } from "@/lib/country-images";
import {
  PENDING_PRICE_LABEL,
  useLiveStartingPrices,
} from "@/components/destinations/useLiveStartingPrices";

export function RegionalPlansPromo() {
  const priceIds = REGIONAL_ROUTE_SLUGS.map(
    (slug) => REGIONAL_PRODUCTS[slug].apiCountryId,
  );
  const livePrices = useLiveStartingPrices(priceIds);

  return (
    <section className="regional-promo" aria-labelledby="regional-promo-heading">
      <div className="container">
        <div className="regional-promo__header">
          <span className="why-kicker">Crossing borders?</span>
          <h2 id="regional-promo-heading">One eSIM for the whole region</h2>
          <p>
            Tap a colored region on the map — or pick a card below. Install once
            and stay connected across every covered country.
          </p>
        </div>

        <RegionalWorldMap />

        <div className="regional-promo__grid" aria-label="All regional plans">
          {REGIONAL_ROUTE_SLUGS.map((routeSlug, index) => {
            const product = REGIONAL_PRODUCTS[routeSlug];
            const price =
              livePrices[product.apiCountryId]?.label ?? PENDING_PRICE_LABEL;
            const hasPrice = Boolean(livePrices[product.apiCountryId]);
            const image = getRegionalImageUrl(routeSlug);
            const featured = Boolean(product.featured);

            return (
              <Link
                key={routeSlug}
                href={plansPathForRegion(routeSlug)}
                className={`regional-promo__card${featured ? " is-featured" : ""}`}
                aria-label={`View ${product.displayName} plans, ${price}`}
              >
                <div className="regional-promo__media">
                  <DestinationCardMedia
                    src={image}
                    alt={`${product.displayName} regional eSIM coverage`}
                    priority={index < 3}
                  />
                  <span className="regional-promo__flag" aria-hidden="true">
                    {product.flag}
                  </span>
                </div>
                <div className="regional-promo__body">
                  {featured && (
                    <span className="regional-promo__label">Island escape</span>
                  )}
                  <strong>{product.shortName}</strong>
                  <span className="regional-promo__meta">
                    {product.countries.length} destinations
                  </span>
                  <span
                    className={`regional-promo__price${hasPrice ? "" : " is-pending"}`}
                  >
                    {price}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
