/**
 * Curated Trustpilot quotes for the homepage.
 * Source: https://www.trustpilot.com/review/noorlink.co (checked 2026-09-10).
 */
export type TrustpilotQuote = {
  name: string;
  /** Reviewer country (shown on the card). */
  country: string;
  flag: string;
  /** Short preview of what they said. */
  preview: string;
  stars: 4 | 5;
  initial: string;
};

export const TRUSTPILOT_QUOTES: readonly TrustpilotQuote[] = [
  {
    name: "Petra",
    country: "Kenya",
    flag: "🇰🇪",
    preview:
      "I had the most amazing experience using NoorLink. My communication with my loved ones back at home remained uninterrupted during my trip to Dubai.",
    stars: 5,
    initial: "P",
  },
  {
    name: "Kabiru",
    country: "Nigeria",
    flag: "🇳🇬",
    preview:
      "The install worked as it should in Saudi. I love the hotspot feature — very useful as I travelled in a company.",
    stars: 5,
    initial: "K",
  },
  {
    name: "Omar",
    country: "Saudi Arabia",
    flag: "🇸🇦",
    preview:
      "Great concept — and it also includes free guides for duas and places of meaning, which I really like.",
    stars: 5,
    initial: "O",
  },
  {
    name: "Hoxe",
    country: "United States",
    flag: "🇺🇸",
    preview: "This is honestly one of the best eSIM providers I have ever used.",
    stars: 5,
    initial: "H",
  },
  {
    name: "Adegoke",
    country: "United Kingdom",
    flag: "🇬🇧",
    preview:
      "The whole process was quick, simple, and completely hassle-free. Setting up the eSIM was very easy, and I was connected within minutes.",
    stars: 5,
    initial: "A",
  },
  {
    name: "Raji",
    country: "Nigeria",
    flag: "🇳🇬",
    preview: "Great service, easy to navigate, and highly recommend.",
    stars: 5,
    initial: "R",
  },
] as const;
