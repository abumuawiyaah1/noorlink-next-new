"use client";

import Link from "next/link";
import {
  PENDING_PRICE_LABEL,
  useLiveStartingPrices,
} from "@/components/destinations/useLiveStartingPrices";
import { getCountryFlag } from "@/lib/country-flags";
import { DESTINATION_CARDS } from "@/lib/destinations-catalog";

const COMPARE_DESTINATION_IDS = ["saudi-arabia", "turkey", "egypt"] as const;

export function CompareLiveDestinations() {
  const cards = COMPARE_DESTINATION_IDS.map((id) =>
    DESTINATION_CARDS.find((card) => card.id === id),
  ).filter((card): card is (typeof DESTINATION_CARDS)[number] => Boolean(card));

  const livePrices = useLiveStartingPrices(
    cards.map((card) => card.priceCountryId),
  );

  return (
    <section
      id="live-plans"
      className="esim-compare-plans"
      aria-labelledby="esim-compare-plans-heading"
    >
      <div className="content-section-head">
        <span className="content-kicker">Live starting prices</span>
        <h2 id="esim-compare-plans-heading">
          See what NoorLink plans start at
        </h2>
        <p>
          Real “From” prices for popular trips — Saudi (Hajj &amp; Umrah),
          Turkey, and Egypt. Tap through to pick a pack.
        </p>
      </div>

      <div className="esim-compare-plans__grid">
        {cards.map((card) => {
          const price =
            livePrices[card.priceCountryId]?.label ??
            card.priceLabel ??
            PENDING_PRICE_LABEL;
          const hasLive = Boolean(livePrices[card.priceCountryId]);
          const flag = getCountryFlag(card.priceCountryId);

          return (
            <Link
              key={card.id}
              href={card.href}
              className="esim-compare-plans__card"
              aria-label={`${card.title} plans, ${price}`}
            >
              <span className="esim-compare-plans__flag" aria-hidden="true">
                {flag}
              </span>
              <strong>{card.title}</strong>
              <span className="esim-compare-plans__blurb">
                {card.id === "saudi-arabia"
                  ? "Pilgrimage plans for Makkah & Madinah"
                  : card.description}
              </span>
              <span
                className={`esim-compare-plans__price${hasLive ? "" : " is-pending"}`}
              >
                {price}
              </span>
            </Link>
          );
        })}
      </div>

      <p className="esim-compare-plans__more">
        <Link href="/destinations">Browse all destinations →</Link>
      </p>
    </section>
  );
}
