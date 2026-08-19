"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import {
  DESTINATION_CARDS,
  DESTINATION_FILTERS,
  filterDestinationCards,
  type DestinationRegion,
} from "@/lib/destinations-catalog";
import { DestinationCardMedia } from "@/components/ui/DestinationCardMedia";

const DESTINATIONS_NAV = [
  { href: "/about", label: "About" },
  { href: "/newsletter", label: "Newsletter Archive" },
  { href: "/destinations", label: "Destinations" },
  { href: "/support", label: "Support" },
  { href: "/dashboard", label: "My eSIMs", highlight: true },
];

type Props = {
  initialQuery?: string;
};

export function ModernDestinationsPage({ initialQuery = "" }: Props) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [region, setRegion] = useState<"all" | DestinationRegion>("all");

  const cards = useMemo(
    () => filterDestinationCards(query, region),
    [query, region],
  );

  return (
    <>
      <SiteHeader nav={DESTINATIONS_NAV} />
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { label: "Destinations" },
        ]}
      />

      <div className="page-header">
        <div className="container">
          <h1>Find Your Destination</h1>
          <p style={{ opacity: 0.8 }}>
            Browse trending countries, starting prices, and eSIM plans in 190+ destinations.
          </p>
        </div>
      </div>

      <div className="search-container">
        <form
          className="search-box"
          onSubmit={(event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (cards[0]) {
              router.push(cards[0].href);
            }
          }}
        >
          <input
            type="search"
            value={query}
            placeholder="Search for a country..."
            aria-label="Search destinations"
            onChange={(event) => setQuery(event.target.value)}
          />
          <button type="submit" className="search-btn" aria-label="Search">
            🔍
          </button>
        </form>
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
          {cards.map((card, index) => (
            <Link
              key={card.id}
              href={card.href}
              className={`card ${card.className}`}
              aria-label={`View plans for ${card.title}, ${card.priceLabel}`}
            >
              <DestinationCardMedia
                src={card.image}
                alt=""
                priority={index < 3}
              />
              <div className="card-overlay">
                <h3>{card.title}</h3>
                <p className="card-desc">{card.description}</p>
                <ul className="card-tips">
                  {card.thingsToDo.slice(0, 3).map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
                <span className="card-price">{card.priceLabel}</span>
              </div>
            </Link>
          ))}
        </div>

        {cards.length === 0 && (
          <p style={{ textAlign: "center", padding: "2rem 0", opacity: 0.75 }}>
            No destinations match your search. Try another region or keyword.
          </p>
        )}
      </div>
      <SiteFooter />
    </>
  );
}
