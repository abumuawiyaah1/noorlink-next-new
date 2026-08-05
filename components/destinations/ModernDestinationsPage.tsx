"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import {
  DESTINATION_CARDS,
  DESTINATION_FILTERS,
  filterDestinationCards,
  type DestinationRegion,
} from "@/lib/destinations-catalog";
import type { DestinationPriceMap } from "@/lib/destination-prices";

const DESTINATIONS_NAV = [
  { href: "/about", label: "About" },
  { href: "/newsletter", label: "Newsletter Archive" },
  { href: "/destinations", label: "Destinations" },
  { href: "/support", label: "Support" },
  { href: "/dashboard", label: "My eSIMs", highlight: true },
];

type Props = {
  prices?: DestinationPriceMap;
};

export function ModernDestinationsPage({ prices = {} }: Props) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<"all" | DestinationRegion>("all");

  const cards = useMemo(
    () => filterDestinationCards(query, region),
    [query, region],
  );

  return (
    <>
      <SiteHeader nav={DESTINATIONS_NAV} />

      <div className="page-header">
        <div className="container">
          <h1>Find Your Destination</h1>
          <p style={{ opacity: 0.8 }}>
            Live eSIM prices, local highlights, and connectivity in 190+ countries.
          </p>
        </div>
      </div>

      <div className="search-container">
        <div className="search-box">
          <input
            type="search"
            value={query}
            placeholder="Search for a country..."
            aria-label="Search destinations"
            onChange={(event) => setQuery(event.target.value)}
          />
          <span className="search-btn" aria-hidden="true">
            🔍
          </span>
        </div>
      </div>

      <div className="container">
        <div className="filter-bar" role="tablist" aria-label="Filter by region">
          {DESTINATION_FILTERS.map((filter) => (
            <button
              key={filter.id}
              type="button"
              role="tab"
              aria-selected={region === filter.id}
              className={`filter-btn${region === filter.id ? " active" : ""}`}
              onClick={() => setRegion(filter.id)}
            >
              {filter.id === "all" ? `🔥 ${filter.label}` : filter.label}
            </button>
          ))}
        </div>

        <div className="dest-grid">
          {cards.map((card) => {
            const priceLabel =
              prices[card.id] ??
              DESTINATION_CARDS.find((c) => c.id === card.id)?.priceLabel ??
              card.priceLabel;

            return (
              <Link
                key={card.id}
                href={card.href}
                className={`card ${card.className}`}
                style={{ backgroundImage: `url('${card.image}')` }}
                aria-label={`View plans for ${card.title}, ${priceLabel}`}
              >
                <div className="card-overlay">
                  <h3>{card.title}</h3>
                  <p className="card-desc">{card.description}</p>
                  <ul className="card-tips">
                    {card.thingsToDo.slice(0, 3).map((tip) => (
                      <li key={tip}>{tip}</li>
                    ))}
                  </ul>
                  <span className="card-price">{priceLabel}</span>
                </div>
              </Link>
            );
          })}
        </div>

        {cards.length === 0 && (
          <p style={{ textAlign: "center", padding: "2rem 0", opacity: 0.75 }}>
            No destinations match your search. Try another region or keyword.
          </p>
        )}
      </div>
    </>
  );
}
