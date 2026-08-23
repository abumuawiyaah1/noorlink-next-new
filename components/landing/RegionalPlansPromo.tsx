import {
  plansPathForRegion,
  REGIONAL_ROUTE_SLUGS,
  REGIONAL_PRODUCTS,
} from "@/lib/regional-products";
import { RegionalWorldMap } from "@/components/landing/RegionalWorldMap";
import Link from "next/link";

export function RegionalPlansPromo() {
  return (
    <section className="regional-promo" aria-labelledby="regional-promo-heading">
      <div className="container">
        <div className="regional-promo__header">
          <span className="why-kicker">Crossing borders?</span>
          <h2 id="regional-promo-heading">One eSIM for the whole region</h2>
          <p>
            Tap a region on the map — install once and stay connected across
            every covered country.
          </p>
        </div>

        <RegionalWorldMap />

        <div className="regional-promo__grid" aria-label="All regional plans">
          {REGIONAL_ROUTE_SLUGS.map((routeSlug) => {
            const product = REGIONAL_PRODUCTS[routeSlug];
            return (
              <Link
                key={routeSlug}
                href={plansPathForRegion(routeSlug)}
                className="regional-promo__card"
              >
                <span className="regional-promo__flag" aria-hidden="true">
                  {product.flag}
                </span>
                <strong>{product.displayName}</strong>
                <span>{product.countries.length} countries</span>
                <span className="regional-promo__cta">See plans →</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
