/**
 * Educational social posts — tourism & pilgrimage literacy in NoorLink voice.
 * Discuss / approve copy before new creatives. Connectivity supports the traveler story; it is never a generic tourism-board post.
 */

export type EducationalSocialPost = {
  id: string;
  title: string;
  topic: string;
  weekLabel: string;
  imagePath: string;
  imageAlt: string;
  /** Why this post is NoorLink (internal note for the team). */
  brandWhy: string;
  caption: string;
  storyLine: string;
  ctaUrl: string;
  productWeight: "none" | "soft" | "light";
};

/**
 * October 2026 — Week 1 (approved direction: on-brand traveler education).
 * Creatives still need a redesign pass to match this voice — do not ship old generic city-guide art with this copy.
 */
export const EDUCATIONAL_SOCIAL_POSTS: EducationalSocialPost[] = [
  {
    id: "oct_w1_shoulder",
    title: "Fall trips are easier when arrival day is calm",
    topic: "Season + arrival",
    weekLabel: "October · Week 1",
    imagePath: "/images/social/oct-w1-shoulder-season.png",
    imageAlt: "NoorLink travel note — calm fall arrival",
    brandWhy:
      "We care about the moment travelers land tired and need things to work — not postcard tourism copy.",
    productWeight: "soft",
    caption: `Fall is a beautiful time for a city trip.

It’s also when a lot of stress shows up on arrival day — maps, rides, messages home, coordinating with family.

That’s the part we built NoorLink around.

October often means softer crowds in places like Paris and London. Use that calmer season well: plan the neighborhood, plan the first evening, and sort connectivity before you fly — not in the airport queue.

Travel should be about the place you came to see.

#FallTravel #TravelTips #CityBreak #InstallBeforeYouFly #NoorLink`,
    storyLine:
      "Fall trips feel better when arrival day is calm. Sort the basics before you fly.",
    ctaUrl: "https://noorlink.co/help/before-you-fly",
  },
  {
    id: "oct_w1_paris",
    title: "Paris tip: choose a base that doesn’t exhaust you",
    topic: "Destination + traveler energy",
    weekLabel: "October · Week 1",
    imagePath: "/images/social/oct-w1-paris-neighborhoods.png",
    imageAlt: "NoorLink travel note — calm Paris base for first-timers",
    brandWhy:
      "Practical traveler advice from our ‘don’t make the trip harder than it is’ ethos — same energy as our Egypt founding story.",
    productWeight: "none",
    caption: `First time in Paris?

Don’t only plan the landmarks. Plan where you’ll recover.

A calm base makes the whole trip softer:
• Le Marais — walkable evenings
• Saint-Germain — classic Left Bank pace
• Near Canal Saint-Martin — local walks, quieter nights

You can still see the icons. You just won’t start every morning already tired.

We obsess over the small traveler details — because that’s usually what ruins a good trip.

#Paris #TravelTips #FirstTimer #CityBreak #NoorLink`,
    storyLine:
      "Paris tip from us: pick a calm base first — then the landmarks.",
    ctaUrl: "https://noorlink.co/plans/france",
  },
  {
    id: "oct_w1_london",
    title: "London tip: make the first day simple",
    topic: "Destination + first-day logistics",
    weekLabel: "October · Week 1",
    imagePath: "/images/social/oct-w1-london-bases.png",
    imageAlt: "NoorLink travel note — simple first day in London",
    brandWhy:
      "Logistics-first care (Tube, family, not getting stranded) — brand DNA from landing without data in Egypt.",
    productWeight: "soft",
    caption: `London is wonderful — and big.

For a first trip, make day one simple:
• South Kensington — museums + easy connections
• Bloomsbury — central and walkable
• Greenwich — more space, still linked in

The goal isn’t to “do London.” It’s to land, get settled, message family, and move with a clear head.

That’s the traveler problem we care about — at home and abroad.

If you want data ready when you land, install before you fly.

#London #UKTravel #TravelTips #CityBreak #NoorLink`,
    storyLine:
      "London day-one tip: simple base, clear head, family reachable.",
    ctaUrl: "https://noorlink.co/plans/united-kingdom",
  },
  {
    id: "oct_w1_habit",
    title: "One habit that protects the whole trip",
    topic: "Traveler habit",
    weekLabel: "October · Week 1",
    imagePath: "/images/social/oct-w1-shoulder-reel.png",
    imageAlt: "NoorLink travel note — install before you fly habit",
    brandWhy:
      "Core brand promise stated as education, not a product ad — our founding lesson.",
    productWeight: "light",
    caption: `One habit that protects almost any trip:

Install your travel eSIM at home — not after you land.

Why we repeat this:
• You can test it on stable Wi‑Fi
• Arrival day stays about the trip, not a SIM shop
• Family can reach you when plans change

Whether it’s a fall city break or Umrah later this season — preparation beats scrambling.

Guide: noorlink.co/help/before-you-fly

#TravelTips #InstallBeforeYouFly #eSIM #UmrahPrep #NoorLink`,
    storyLine:
      "Protect the trip: install before you fly — not in the airport queue.",
    ctaUrl: "https://noorlink.co/help/before-you-fly",
  },
];
