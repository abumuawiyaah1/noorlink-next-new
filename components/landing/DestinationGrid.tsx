import Link from "next/link";
import { DestinationCardMedia } from "@/components/ui/DestinationCardMedia";
import { DESTINATION_IMAGES } from "@/lib/site-images";

const destinations = [
  {
    id: "americas",
    title: "Americas",
    subtitle: "USA, Canada, Brazil & more",
    image: DESTINATION_IMAGES.usa,
    href: "/plans/usa",
  },
  {
    id: "europe",
    title: "Europe",
    subtitle: "UK, France, Germany & more",
    image: DESTINATION_IMAGES.europeRegional,
    href: "/plans/france",
  },
  {
    id: "mea",
    title: "Middle East & Africa",
    subtitle: "UAE, Turkey, Saudi, Egypt…",
    image: DESTINATION_IMAGES.middleEastRegional,
    href: "/hajj-umrah",
  },
  {
    id: "asia",
    title: "Asia & Oceania",
    subtitle: "Japan, Thailand, Australia…",
    image: DESTINATION_IMAGES.asiaRegional,
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
            Browse fast-moving travel favorites and continue straight to the
            plan options for that region.
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
