"use client";

import Link from "next/link";
import { DESTINATION_CARDS } from "@/lib/destinations-catalog";
import {
  PENDING_PRICE_LABEL,
  useLiveStartingPrices,
} from "@/components/destinations/useLiveStartingPrices";

const FEATURED_IDS = ["usa", "turkey", "japan", "uk", "uae", "france"];

export function PopularCountries() {
  const cards = DESTINATION_CARDS.filter((card) => FEATURED_IDS.includes(card.id));
  const livePrices = useLiveStartingPrices(cards.map((card) => card.priceCountryId));

  return (
    <section className="popular-countries" aria-labelledby="popular-countries-heading">
      <div className="container">
        <div className="destinations-heading">
          <span className="why-kicker">Live starting prices</span>
          <h2 id="popular-countries-heading">Popular countries</h2>
          <p>
            The “From” price is the cheapest live plan you can actually select.
          </p>
        </div>
        <div className="popular-countries__grid">
          {cards.map((card) => {
            const price = livePrices[card.priceCountryId]?.label ?? PENDING_PRICE_LABEL;
            return (
              <Link
                key={card.id}
                href={card.href}
                className="popular-country"
                aria-label={`View ${card.title} plans, ${price}`}
              >
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
