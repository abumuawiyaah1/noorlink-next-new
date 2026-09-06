import Link from "next/link";
import { DestinationCardMedia } from "@/components/ui/DestinationCardMedia";
import { RegionFlagPreview } from "@/components/ui/RegionFlagPreview";
import { getCountryFlag } from "@/lib/country-flags";
import { getCountryImageUrl } from "@/lib/country-images";
import {
  plansPathForRegion,
  type RegionalRouteSlug,
} from "@/lib/regional-products";

const destinations: {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  routeSlug: RegionalRouteSlug;
  flagId: string;
}[] = [
  {
    id: "caribbean",
    title: "Caribbean",
    subtitle: "Bahamas, Jamaica, Dominican Republic & more",
    image: getCountryImageUrl("caribbean"),
    routeSlug: "caribbean",
    flagId: "caribbean",
  },
  {
    id: "americas",
    title: "Americas",
    subtitle: "USA, Canada & more",
    image: getCountryImageUrl("americas"),
    routeSlug: "north-america",
    flagId: "americas",
  },
  {
    id: "europe",
    title: "Europe",
    subtitle: "UK, France, Germany & more",
    image: getCountryImageUrl("europe"),
    routeSlug: "europe",
    flagId: "europe",
  },
  {
    id: "mea",
    title: "Middle East",
    subtitle: "UAE, Turkey, Saudi, Egypt…",
    image: getCountryImageUrl("middle-east"),
    routeSlug: "middle-east",
    flagId: "middle-east",
  },
  {
    id: "asia",
    title: "Asia & Oceania",
    subtitle: "Japan, Thailand, Australia…",
    image: getCountryImageUrl("asia"),
    routeSlug: "asia-pacific",
    flagId: "asia",
  },
];

export function DestinationGrid() {
  return (
    <section className="destinations" id="destinations">
      <div className="container">
        <div className="destinations-heading">
          <span className="why-kicker">Popular regions</span>
          <h2>Choose where you are going next</h2>
          <p>
            Hover a region to peek at country flags. Click to open the full list
            and plans.
          </p>
        </div>
        <div className="grid">
          {destinations.map((dest, index) => (
            <Link
              key={dest.id}
              href={plansPathForRegion(dest.routeSlug)}
              className="card region-card"
              aria-label={`View ${dest.title} regional plans and covered countries`}
            >
              <DestinationCardMedia
                src={dest.image}
                alt={`${dest.title} regional travel plans`}
                priority={index < 2}
              />
              <div className="card-overlay">
                <div className="region-title">
                  <span aria-hidden="true">{getCountryFlag(dest.flagId)} </span>
                  {dest.title}
                </div>
                <div className="region-sub">{dest.subtitle}</div>
                <RegionFlagPreview routeSlug={dest.routeSlug} />
                <div className="arrow-btn" aria-hidden="true">
                  <i className="fas fa-arrow-right" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
