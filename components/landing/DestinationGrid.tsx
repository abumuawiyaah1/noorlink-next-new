"use client";

import Link from "next/link";
import { DestinationCardMedia } from "@/components/ui/DestinationCardMedia";
import { RegionFlagPreview } from "@/components/ui/RegionFlagPreview";
import { getCountryFlag } from "@/lib/country-flags";
import { getCountryImageUrl } from "@/lib/country-images";
import {
  plansPathForRegion,
  type RegionalRouteSlug,
} from "@/lib/regional-products";
import { getDictionary, t } from "@/lib/i18n/dictionaries";
import { useLocaleState } from "@/lib/i18n/use-locale";

type GridRegionId = keyof ReturnType<typeof getDictionary>["popular"]["gridRegions"];

const destinations: {
  id: GridRegionId;
  image: string;
  routeSlug: RegionalRouteSlug;
  flagId: string;
}[] = [
  {
    id: "caribbean",
    image: getCountryImageUrl("caribbean"),
    routeSlug: "caribbean",
    flagId: "caribbean",
  },
  {
    id: "americas",
    image: getCountryImageUrl("americas"),
    routeSlug: "north-america",
    flagId: "americas",
  },
  {
    id: "europe",
    image: getCountryImageUrl("europe"),
    routeSlug: "europe",
    flagId: "europe",
  },
  {
    id: "mea",
    image: getCountryImageUrl("middle-east"),
    routeSlug: "middle-east",
    flagId: "middle-east",
  },
  {
    id: "asia",
    image: getCountryImageUrl("asia"),
    routeSlug: "asia-pacific",
    flagId: "asia",
  },
];

export function DestinationGrid() {
  const [locale] = useLocaleState();
  const dict = getDictionary(locale);

  return (
    <section className="destinations" id="destinations">
      <div className="container">
        <div className="destinations-heading">
          <span className="why-kicker">{dict.popular.kicker}</span>
          <h2>{dict.popular.gridTitle}</h2>
          <p>{dict.popular.gridLede}</p>
        </div>
        <div className="grid">
          {destinations.map((dest, index) => {
            const copy = dict.popular.gridRegions[dest.id];
            return (
            <Link
              key={dest.id}
              href={plansPathForRegion(dest.routeSlug)}
              className="card region-card"
              aria-label={t(dict, "popular.gridCardAria", { title: copy.title })}
            >
              <DestinationCardMedia
                src={dest.image}
                alt={t(dict, "popular.gridCardAlt", { title: copy.title })}
                priority={index < 2}
              />
              <div className="card-overlay">
                <div className="region-title">
                  <span aria-hidden="true">{getCountryFlag(dest.flagId)} </span>
                  {copy.title}
                </div>
                <div className="region-sub">{copy.subtitle}</div>
                <RegionFlagPreview routeSlug={dest.routeSlug} />
                <div className="arrow-btn" aria-hidden="true">
                  <i className="fas fa-arrow-right" />
                </div>
              </div>
            </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
