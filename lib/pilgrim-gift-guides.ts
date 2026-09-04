/** Complimentary al-Haramayn PDF guides (gift after pilgrimage purchase). */

export type PilgrimGiftGuide = {
  id: string;
  title: string;
  blurb: string;
  href: string;
};

export const PILGRIM_GIFT_GUIDES: PilgrimGiftGuide[] = [
  {
    id: "duas",
    title: "Duas for the Journey",
    blurb: "Arabic, transliteration, and meaning — save offline.",
    href: "/guides/pilgrimage/noorlink-gift-duas-al-haramayn.pdf",
  },
  {
    id: "orientation",
    title: "Makkah & Madinah Orientation",
    blurb: "A simple calm overview of al-Haramayn.",
    href: "/guides/pilgrimage/noorlink-gift-orientation-makkah-madinah.pdf",
  },
  {
    id: "places",
    title: "Places of Meaning",
    blurb: "Short ziyārah list with respectful etiquette.",
    href: "/guides/pilgrimage/noorlink-gift-places-of-meaning.pdf",
  },
];

const PILGRIMAGE_TOKENS = [
  "umrah",
  "hajj",
  "saudi",
  "pilgrim",
  "makkah",
  "mecca",
  "madinah",
  "medina",
  "haramayn",
  "haramain",
] as const;

/** Match fulfillment-email logic for Saudi / Umrah / Hajj / multi-stop brands. */
export function isPilgrimageOrder(
  country?: string | null,
  plan?: string | null,
): boolean {
  const haystack = `${country ?? ""} ${plan ?? ""}`.trim().toLowerCase();
  if (!haystack) return false;
  return PILGRIMAGE_TOKENS.some((token) => haystack.includes(token));
}
