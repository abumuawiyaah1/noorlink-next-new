"use client";

import Link from "next/link";
import { DESTINATION_CARDS } from "@/lib/destinations-catalog";
import {
  PENDING_PRICE_LABEL,
  useLiveStartingPrices,
} from "@/components/destinations/useLiveStartingPrices";
import { getCountryFlag } from "@/lib/country-flags";

const FEATURED_IDS = ["usa", "turkey", "japan", "uk", "uae", "france"];

export function PopularCountries() {
  const cards = DESTINATION_CARDS.filter((card) => FEATURED_IDS.includes(card.id));
  const livePrices = useLiveStartingPrices(cards.map((card) => card.priceCountryId));

  return (
    <section className="popular-countries" aria-labelledby="popular-countries-heading">
      <div className="container">
        <h2 id="popular-countries-heading" className="sr-only">
          Popular countries
        </h2>

        <div className="popular-countries__track" role="list">
          {cards.map((card) => {
            const price = livePrices[card.priceCountryId]?.label ?? PENDING_PRICE_LABEL;
            const flag = getCountryFlag(card.priceCountryId);
            return (
              <Link
                key={card.id}
                href={card.href}
                className="popular-country"
                role="listitem"
                aria-label={`View ${card.title} plans, ${price}`}
              >
                <span className="popular-country__flag" aria-hidden="true">
                  {flag}
                </span>
                <span className="popular-country__name">{card.title}</span>
                <span
                  className={`popular-country__price${livePrices[card.priceCountryId] ? "" : " is-pending"}`}
                >
                  {price}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
