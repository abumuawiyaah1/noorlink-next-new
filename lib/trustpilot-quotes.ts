/**
 * Curated Trustpilot quotes for the homepage.
 * Source: https://www.trustpilot.com/review/noorlink.co (checked 2026-09-10).
 * Prefer short, travel-specific excerpts; update when stronger reviews arrive.
 */
export type TrustpilotQuote = {
  /** Display name (first name or handle as shown publicly). */
  name: string;
  /** Country / region label for the card kicker. */
  place: string;
  /** ISO-ish country code for flag emoji (optional). */
  flag: string;
  /** Short title-style line (often the Trustpilot title). */
  title: string;
  /** Review body excerpt. */
  text: string;
  /** 1–5 Trustpilot stars. */
  stars: 4 | 5;
  /** First letter for avatar initial (no hotlinked photos). */
  initial: string;
};

export const TRUSTPILOT_QUOTES: readonly TrustpilotQuote[] = [
  {
    name: "Petra",
    place: "Kenya · Dubai trip",
    flag: "🇰🇪",
    title: "Stayed connected the whole trip",
    text: "I had the most amazing experience using NoorLink. My communication with my loved ones back at home remained uninterrupted during my trip to Dubai.",
    stars: 5,
    initial: "P",
  },
  {
    name: "Kabiru",
    place: "Nigeria · Saudi Arabia",
    flag: "🇳🇬",
    title: "Hotspot works. Easy to use",
    text: "The install worked as it should in Saudi. I love the hotspot feature — very useful as I travelled in a company. Can’t wait to try it on my trip to China.",
    stars: 5,
    initial: "K",
  },
  {
    name: "Omar",
    place: "Saudi Arabia",
    flag: "🇸🇦",
    title: "Great concept",
    text: "Great concept — and it also includes free guides for duas and places of meaning, which I really like.",
    stars: 5,
    initial: "O",
  },
  {
    name: "Hoxe",
    place: "United States",
    flag: "🇺🇸",
    title: "One of the best eSIMs",
    text: "This is honestly one of the best eSIM providers I have ever used.",
    stars: 5,
    initial: "H",
  },
  {
    name: "Adegoke",
    place: "United Kingdom",
    flag: "🇬🇧",
    title: "Quick and hassle-free",
    text: "The whole process was quick, simple, and completely hassle-free. Setting up the eSIM was very easy, and I was connected to the network within minutes.",
    stars: 5,
    initial: "A",
  },
  {
    name: "Raji",
    place: "Nigeria",
    flag: "🇳🇬",
    title: "Easy to navigate",
    text: "Great service, easy to navigate, and highly recommend.",
    stars: 5,
    initial: "R",
  },
] as const;
