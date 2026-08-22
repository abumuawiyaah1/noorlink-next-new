import Link from "next/link";
import { DestinationCardMedia } from "@/components/ui/DestinationCardMedia";
import { getCountryImageUrl } from "@/lib/country-images";

const destinations = [
  {
    id: "americas",
    title: "Americas",
    subtitle: "USA, Canada, Brazil & more",
    image: getCountryImageUrl("americas"),
    href: "/plans/usa",
  },
  {
    id: "caribbean",
    title: "Caribbean",
    subtitle: "Bahamas, Jamaica, Dominican Republic…",
    image: getCountryImageUrl("caribbean"),
    href: "/plans/bahamas",
  },
  {
    id: "europe",
    title: "Europe",
    subtitle: "UK, France, Germany & more",
    image: getCountryImageUrl("europe"),
    href: "/plans/france",
  },
  {
    id: "mea",
    title: "Middle East & Africa",
    subtitle: "UAE, Turkey, Saudi, Egypt…",
    image: getCountryImageUrl("middle-east"),
    href: "/hajj-umrah",
  },
  {
    id: "asia",
    title: "Asia & Oceania",
    subtitle: "Japan, Thailand, Australia…",
    image: getCountryImageUrl("asia"),
    href: "/plans/japan",
  },
] as const;

export function DestinationGrid() {
  return (
    <section className="destinations" id="destinations">
      <div className="container">
        <div className="destinations-heading">
          <span className="why-kicker">Popular regions</span>
          <h2>Choose where you are going next</h2>
          <p>
            Open a featured country in that region, then switch destinations if
            you are visiting more than one place.
          </p>
        </div>
        <div className="grid">
          {destinations.map((dest, index) => (
            <Link
              key={dest.id}
              href={dest.href}
              className="card"
              aria-label={`View plans for ${dest.title}`}
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
