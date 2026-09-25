/**
 * Educational social posts — tourism & pilgrimage literacy first.
 * Soft NoorLink presence; connectivity is optional, never the headline.
 */

export type EducationalSocialPost = {
  id: string;
  title: string;
  topic: string;
  weekLabel: string;
  imagePath: string;
  imageAlt: string;
  caption: string;
  storyLine: string;
  ctaUrl: string;
  /** How hard to push product in this post */
  productWeight: "none" | "soft" | "light";
};

/** October 2026 — Week 1 (Europe shoulder season). */
export const EDUCATIONAL_SOCIAL_POSTS: EducationalSocialPost[] = [
  {
    id: "oct_w1_shoulder",
    title: "Why October is kinder to Paris & London",
    topic: "Season",
    weekLabel: "October · Week 1",
    imagePath: "/images/social/oct-w1-shoulder-season.png",
    imageAlt: "Travel note — why October is kinder for Paris and London",
    productWeight: "none",
    caption: `Why October is kinder to Paris and London

Summer is beautiful — and crowded. October often gives you:
• Softer queues at big sights
• Cooler weather for long walks
• Evenings that still feel open, without peak-season rush

You won’t get perfect weather every day. You will get a calmer pace — which is what most first-timers actually need.

Save this if you’re planning a fall city break.

#Paris #London #FallTravel #ShoulderSeason #TravelTips #CityBreak`,
    storyLine: "October = softer crowds + better walking weather in Paris & London.",
    ctaUrl: "https://noorlink.co/destinations",
  },
  {
    id: "oct_w1_paris",
    title: "First time in Paris? Three calm neighborhoods",
    topic: "Destination",
    weekLabel: "October · Week 1",
    imagePath: "/images/social/oct-w1-paris-neighborhoods.png",
    imageAlt: "Travel note — three calm Paris neighborhoods for first-timers",
    productWeight: "none",
    caption: `First time in Paris? Start with a calm base — not the busiest postcard corner.

Three neighborhoods that work well for first-timers:
• Le Marais — walkable, cafés, easy evenings
• Saint-Germain — classic Left Bank pace
• Canal Saint-Martin area — local walks, softer nights

You can still visit the icons. You just sleep somewhere that doesn’t exhaust you before breakfast.

Where would you base yourself?

#Paris #VisitParis #TravelGuide #FirstTimer #CityBreak #TravelTips`,
    storyLine: "Paris tip: base in Le Marais, Saint-Germain, or near Canal Saint-Martin.",
    ctaUrl: "https://noorlink.co/plans/france",
  },
  {
    id: "oct_w1_london",
    title: "First time in London? Three calm bases",
    topic: "Destination",
    weekLabel: "October · Week 1",
    imagePath: "/images/social/oct-w1-london-bases.png",
    imageAlt: "Travel note — three calm London bases for first-timers",
    productWeight: "none",
    caption: `First time in London? Pick a base that makes the Tube simple.

Three calm options:
• South Kensington — museums, parks, straightforward connections
• Bloomsbury — central, walkable, quieter evenings
• Greenwich — river views, more space, still linked in

London rewards travelers who don’t try to “do everything” from one overloaded hotel street.

Save this for your next UK trip.

#London #VisitLondon #TravelGuide #UKTravel #CityBreak #TravelTips`,
    storyLine: "London tip: South Ken, Bloomsbury, or Greenwich as a calm first base.",
    ctaUrl: "https://noorlink.co/plans/united-kingdom",
  },
  {
    id: "oct_w1_reel",
    title: "Shoulder season in 20 seconds",
    topic: "Reel cover",
    weekLabel: "October · Week 1",
    imagePath: "/images/social/oct-w1-shoulder-reel.png",
    imageAlt: "Reel cover — shoulder season travel tips in 20 seconds",
    productWeight: "soft",
    caption: `Shoulder season in 20 seconds 🍂

1. Fewer queues
2. Cooler long walks
3. Clearer plans (less peak chaos)

October is one of the best windows for Paris and London if you want the city — not the crowd pressure.

Planning a fall trip? Start with the neighborhood, not the packing list.

(When you’re ready for data abroad: install before you fly — link in bio.)

#ShoulderSeason #FallTravel #Paris #London #TravelShorts #TravelTips #NoorLink`,
    storyLine: "Fewer queues. Cooler walks. Clearer plans. That’s October.",
    ctaUrl: "https://noorlink.co/destinations",
  },
];

/** Older eSIM-heavy creatives kept for archive / reuse — not the active pack. */
export const ARCHIVE_PRODUCT_EDU_POSTS = [
  "edu-install-before-fly.png",
  "edu-hotspot-included.png",
  "edu-umrah-on-arrival.png",
] as const;
