"use client";

import Link from "next/link";
import {
  plansPathForRegion,
  REGIONAL_ROUTE_SLUGS,
  REGIONAL_PRODUCTS,
} from "@/lib/regional-products";
import { RegionalWorldMap } from "@/components/landing/RegionalWorldMap";
import { DestinationCardMedia } from "@/components/ui/DestinationCardMedia";
import { RegionFlagPreview } from "@/components/ui/RegionFlagPreview";
import { getRegionalImageUrl } from "@/lib/country-images";
import { useLiveStartingPrices } from "@/components/destinations/useLiveStartingPrices";
import { getDictionary, t } from "@/lib/i18n/dictionaries";
import { useLocaleState } from "@/lib/i18n/use-locale";

export function RegionalPlansPromo() {
  const [locale] = useLocaleState();
  const dict = getDictionary(locale);
  const priceIds = REGIONAL_ROUTE_SLUGS.map(
    (slug) => REGIONAL_PRODUCTS[slug].apiCountryId,
  );
  const livePrices = useLiveStartingPrices(priceIds);

  return (
    <section className="regional-promo" aria-labelledby="regional-promo-heading">
      <div className="container">
        <div className="regional-promo__header">
          <span className="why-kicker">{dict.regional.kicker}</span>
          <h2 id="regional-promo-heading">{dict.regional.title}</h2>
          <p>{dict.regional.lede}</p>
        </div>

        <RegionalWorldMap />

        <div className="regional-promo__grid" aria-label="All regional plans">
          {REGIONAL_ROUTE_SLUGS.map((routeSlug) => {
            const product = REGIONAL_PRODUCTS[routeSlug];
            const pendingLabel = dict.common.seePlans;
            const price =
              livePrices[product.apiCountryId]?.label ?? pendingLabel;
            const hasPrice = Boolean(livePrices[product.apiCountryId]);
            const image = getRegionalImageUrl(routeSlug);
            const featured = Boolean(product.featured);
            const regionName =
              dict.regional.regionNames[
                routeSlug as keyof typeof dict.regional.regionNames
              ] ?? product.shortName;

            return (
              <Link
                key={routeSlug}
                href={plansPathForRegion(routeSlug)}
                className={`regional-promo__card region-card${featured ? " is-featured" : ""}`}
                aria-label={`${regionName}, ${price}`}
              >
                <div className="regional-promo__media">
                  <DestinationCardMedia
                    src={image}
                    alt={regionName}
                    priority={false}
                  />
                  <span className="regional-promo__flag" aria-hidden="true">
                    {product.flag}
                  </span>
                </div>
                <RegionFlagPreview routeSlug={routeSlug} previewCount={10} />
                <div className="regional-promo__body">
                  {featured && (
                    <span className="regional-promo__label">
                      {dict.regional.islandEscape}
                    </span>
                  )}
                  <strong>{regionName}</strong>
                  <span className="regional-promo__meta">
                    {t(dict, "regional.covers", { n: product.countries.length })}
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
