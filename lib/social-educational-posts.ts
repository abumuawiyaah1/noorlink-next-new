/**
 * October 2026 — Week 1 educational posts (copy only; creatives later).
 * Value-first: checklist / decision / day-one plan. No eSIM sales pitch.
 */

export type EducationalSocialPost = {
  id: string;
  title: string;
  topic: string;
  weekLabel: string;
  imagePath: string;
  imageAlt: string;
  brandWhy: string;
  caption: string;
  storyLine: string;
  ctaUrl: string;
  productWeight: "none" | "soft" | "light";
};

export const EDUCATIONAL_SOCIAL_POSTS: EducationalSocialPost[] = [
  {
    id: "oct_w1_fall_vs_summer",
    title: "Fall vs summer city break — which should you book?",
    topic: "Decision tool",
    weekLabel: "October · Week 1",
    imagePath: "/images/social/oct-w1-shoulder-season.png",
    imageAlt: "Fall vs summer city break decision guide",
    brandWhy: "Gives a usable decision — not vibes.",
    productWeight: "none",
    caption: `Fall vs summer city break — which should you book?

Use this simple guide:

Book SUMMER if:
• Kids are off school and dates are fixed
• You want long daylight and outdoor evenings
• You can handle heat + bigger crowds

Book FALL (Sep–Oct) if:
• You prefer walking all day without melting
• You want shorter lines at popular places
• You’re a first-timer who needs a calmer pace

For Paris and London, fall is often kinder to first-timers — not because it’s “more magical,” but because the city is easier to move through.

Screenshot this before you pick dates.

#FallTravel #SummerTravel #Paris #London #TravelPlanning #TravelEducation`,
    storyLine: "Fall vs summer: walk comfort + shorter lines vs long daylight + school holidays.",
    ctaUrl: "https://noorlink.co/newsletter",
  },
  {
    id: "oct_w1_paris_24h",
    title: "First 24 hours in Paris — do this, skip that",
    topic: "Day-one plan",
    weekLabel: "October · Week 1",
    imagePath: "/images/social/oct-w1-paris-neighborhoods.png",
    imageAlt: "First 24 hours in Paris plan",
    brandWhy: "Concrete day-one value travelers can follow.",
    productWeight: "none",
    caption: `First 24 hours in Paris — do this, skip that

DO:
1. Go hotel → drop bags → short neighborhood walk
2. Eat near your base (not across the city on empty energy)
3. Learn your closest Metro stop
4. Sleep early

SKIP on day one:
• Marathon museum hopping
• Crossing the whole city for one photo
• Late-night “we’ll sleep on the plane” plans

Best first bases for calm: Le Marais, Saint-Germain, or near Canal Saint-Martin.

Day one is for settling — not collecting landmarks.

Save this for your Paris folder.

#Paris #VisitParis #FirstTimer #TravelPlan #TravelEducation`,
    storyLine: "Paris day one: settle near your base. Skip the city-wide marathon.",
    ctaUrl: "https://noorlink.co/newsletter",
  },
  {
    id: "oct_w1_london_5_steps",
    title: "London day one: the 5-step calm arrival",
    topic: "Day-one plan",
    weekLabel: "October · Week 1",
    imagePath: "/images/social/oct-w1-london-bases.png",
    imageAlt: "London day one five-step calm arrival",
    brandWhy: "Numbered steps = screenshot value.",
    productWeight: "none",
    caption: `London day one: the 5-step calm arrival

1. Know your hotel address offline (screenshot it)
2. Choose one simple base (South Ken, Bloomsbury, or Greenwich)
3. Take one clear route in — don’t optimize every transfer yet
4. Message family that you arrived
5. Keep evening light: food + short walk + sleep

London is big. Arrival day is not the day to “see everything.”

If you only get these 5 right, day two is already easier.

#London #VisitLondon #UKTravel #FirstTimer #TravelEducation #TravelTips`,
    storyLine: "London arrival: offline address → one base → one route → message family → early night.",
    ctaUrl: "https://noorlink.co/newsletter",
  },
  {
    id: "oct_w1_arrival_checklist",
    title: "Before any trip abroad: 7 things that save arrival day",
    topic: "Checklist",
    weekLabel: "October · Week 1",
    imagePath: "/images/social/oct-w1-shoulder-reel.png",
    imageAlt: "Seven things that save arrival day checklist",
    brandWhy: "Universal checklist — city break or Umrah later — pure utility.",
    productWeight: "none",
    caption: `Before any trip abroad: 7 things that save arrival day

Screenshot this checklist:

1. Phone unlocked (ask your carrier before you fly)
2. Hotel name + address saved offline
3. Family / group WhatsApp ready
4. Pickup or train plan written down
5. Charger + power bank in your carry-on
6. Photo of passport / booking confirmations
7. One offline map area downloaded for your hotel zone

This helps for a fall city break — and for Umrah later in the season.

Arrival day gets easier when the basics are done at home.

#TravelChecklist #TravelEducation #FamilyTravel #UmrahPrep #TravelTips`,
    storyLine: "7 arrival-day savers: unlock, offline address, WhatsApp, pickup plan, charger, docs photo, offline map.",
    ctaUrl: "https://noorlink.co/newsletter",
  },
];
