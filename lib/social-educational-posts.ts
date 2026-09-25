/**
 * Educational social posts — educate first, inform second.
 * Product/eSIM belongs in bio or a rare soft closer — never the point of the post.
 */

export type EducationalSocialPost = {
  id: string;
  title: string;
  topic: string;
  weekLabel: string;
  imagePath: string;
  imageAlt: string;
  /** Internal: why NoorLink would publish this (not shown on social). */
  brandWhy: string;
  caption: string;
  storyLine: string;
  /** Optional bio destination — not pushed hard in caption. */
  ctaUrl: string;
  productWeight: "none" | "soft" | "light";
};

/**
 * October 2026 — Week 1
 * Pure traveler education. No eSIM pitch in captions.
 */
export const EDUCATIONAL_SOCIAL_POSTS: EducationalSocialPost[] = [
  {
    id: "oct_w1_shoulder",
    title: "Why fall city breaks feel different",
    topic: "Season",
    weekLabel: "October · Week 1",
    imagePath: "/images/social/oct-w1-shoulder-season.png",
    imageAlt: "Travel education — why fall city breaks feel different",
    brandWhy: "Season literacy builds trust before any product mention.",
    productWeight: "none",
    caption: `Why fall city breaks feel different

Summer travel is loud: heat, lines, packed trains, rushed dinners.

October in cities like Paris and London often gives you something quieter:
• Shorter queues at popular places
• Weather made for walking
• Evenings that don’t feel like a stampede

It isn’t perfect weather every day. It is a better pace for most first-timers.

If you’re choosing between “peak summer” and “early fall,” fall usually treats travelers more kindly.

Save this for planning season.

#FallTravel #Paris #London #ShoulderSeason #TravelEducation #CityBreak`,
    storyLine: "Fall city breaks: softer crowds, better walking weather, calmer pace.",
    ctaUrl: "https://noorlink.co/newsletter",
  },
  {
    id: "oct_w1_paris",
    title: "First time in Paris? Think about where you’ll rest",
    topic: "Destination",
    weekLabel: "October · Week 1",
    imagePath: "/images/social/oct-w1-paris-neighborhoods.png",
    imageAlt: "Travel education — choosing a calm base in Paris",
    brandWhy: "Practical trip design — our traveler-care POV without selling.",
    productWeight: "none",
    caption: `First time in Paris? Think about where you’ll rest

Most people only plan museums and photos.

The quieter decision is where you sleep and recover:
• Le Marais — walkable, easy evenings
• Saint-Germain — classic Left Bank rhythm
• Near Canal Saint-Martin — softer nights, local walks

You can still see the famous places.
A calm base just means you won’t start every morning already tired.

That’s often the difference between loving Paris and enduring it.

#Paris #VisitParis #TravelEducation #FirstTimer #TravelTips`,
    storyLine: "Paris tip: plan where you’ll rest, not only what you’ll see.",
    ctaUrl: "https://noorlink.co/newsletter",
  },
  {
    id: "oct_w1_london",
    title: "London is big — make day one small",
    topic: "Destination",
    weekLabel: "October · Week 1",
    imagePath: "/images/social/oct-w1-london-bases.png",
    imageAlt: "Travel education — keeping London day one simple",
    brandWhy: "Arrival-day calm is our DNA; here it’s pure education.",
    productWeight: "none",
    caption: `London is big — make day one small

First-timers often try to “do the whole city” on arrival day.

A kinder approach:
1. Choose a simple base (South Kensington, Bloomsbury, or Greenwich work well)
2. Learn one Tube line you’ll actually use
3. Keep the first evening light — walk, eat, sleep

London rewards travelers who don’t rush the opening hours of the trip.

Save this if UK is on your list this fall.

#London #VisitLondon #UKTravel #TravelEducation #FirstTimer`,
    storyLine: "London tip: big city, small day one. Base → one Tube line → early night.",
    ctaUrl: "https://noorlink.co/newsletter",
  },
  {
    id: "oct_w1_arrival",
    title: "The first hour after landing matters more than people think",
    topic: "Traveler literacy",
    weekLabel: "October · Week 1",
    imagePath: "/images/social/oct-w1-shoulder-reel.png",
    imageAlt: "Travel education — the first hour after landing",
    brandWhy:
      "Closest to our founding story, still framed as education — no product pitch.",
    productWeight: "none",
    caption: `The first hour after landing matters more than people think

That’s when travelers usually need:
• Directions that work
• A way to message family
• A clear path to the hotel

When that hour is chaotic, the whole first day feels heavier — even if the destination is beautiful.

So before any trip (city break or Umrah later in the season), ask one planning question:

“What will make arrival simple?”

Not fancy. Just simple.

That’s the kind of travel thinking we believe in.

#TravelEducation #TravelTips #ArrivalDay #UmrahPrep #FamilyTravel`,
    storyLine: "Before any trip: what will make the first hour after landing simple?",
    ctaUrl: "https://noorlink.co/newsletter",
  },
];
