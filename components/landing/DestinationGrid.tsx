import Link from "next/link";
import { DestinationCardMedia } from "@/components/ui/DestinationCardMedia";
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
}[] = [
  {
    id: "americas",
    title: "Americas",
    subtitle: "USA, Canada, Mexico & more",
    image: getCountryImageUrl("americas"),
    routeSlug: "north-america",
  },
  {
    id: "caribbean",
    title: "Caribbean",
    subtitle: "Bahamas, Panama, Costa Rica & more",
    image: getCountryImageUrl("caribbean"),
    routeSlug: "north-america",
  },
  {
    id: "europe",
    title: "Europe",
    subtitle: "UK, France, Germany & more",
    image: getCountryImageUrl("europe"),
    routeSlug: "europe",
  },
  {
    id: "mea",
    title: "Middle East",
    subtitle: "UAE, Turkey, Saudi, Egypt…",
    image: getCountryImageUrl("middle-east"),
    routeSlug: "middle-east",
  },
  {
    id: "asia",
    title: "Asia & Oceania",
    subtitle: "Japan, Thailand, Australia…",
    image: getCountryImageUrl("asia"),
    routeSlug: "asia-pacific",
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
            Pick a region to see every covered country and regional eSIM plans
            in one place.
          </p>
        </div>
        <div className="grid">
          {destinations.map((dest, index) => (
            <Link
              key={dest.id}
              href={plansPathForRegion(dest.routeSlug)}
              className="card"
              aria-label={`View ${dest.title} regional plans and covered countries`}
            >
              <DestinationCardMedia
                src={dest.image}
                alt=""
                priority={index < 2}
              />
              <div className="card-overlay">
                <div className="region-title">{dest.title}</div>
                <div className="region-sub">{dest.subtitle}</div>
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
