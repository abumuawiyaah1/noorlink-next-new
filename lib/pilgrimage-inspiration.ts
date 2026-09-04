export type PilgrimageQuote = {
  id: string;
  kind: "quran" | "hadith";
  arabic?: string;
  text: string;
  source: string;
};

export type PilgrimageGalleryItem = {
  id: string;
  title: string;
  caption: string;
  image: string;
  imageAlt: string;
};

export const PILGRIMAGE_FEATURED_QUOTE: PilgrimageQuote = {
  id: "quran-bakkah",
  kind: "quran",
  arabic: "إِنَّ أَوَّلَ بَيْتٍ وُضِعَ لِلنَّاسِ لَلَّذِي بِبَكَّةَ مُبَارَكًا وَهُدًى لِّلْعَالَمِينَ",
  text: "Indeed, the first House established for mankind is the one at Bakkah — blessed and a guidance for the worlds.",
  source: "Qur'an 3:96",
};

export const PILGRIMAGE_QUOTES: PilgrimageQuote[] = [
  {
    id: "quran-hajj-proclaim",
    kind: "quran",
    arabic: "وَأَذِّن فِي النَّاسِ بِالْحَجِّ",
    text: "And proclaim to the people the Hajj — they will come to you on foot and on every lean camel.",
    source: "Qur'an 22:27",
  },
  {
    id: "hadith-ease",
    kind: "hadith",
    text: "Make things easy for people, do not make them difficult; give glad tidings and do not repel.",
    source: "Hadith · Bukhari & Muslim",
  },
  {
    id: "hadith-intention",
    kind: "hadith",
    text: "Actions are judged by intentions, and every person will get what they intended.",
    source: "Hadith · Bukhari & Muslim",
  },
];

export const PILGRIMAGE_GALLERY: PilgrimageGalleryItem[] = [
  {
    id: "makkah",
    title: "Makkah al-Mukarramah",
    caption: "Stay reachable for family updates and essential apps in the Haram.",
    image: "/images/pilgrimage/makkah-haram.png",
    imageAlt: "Masjid al-Haram and the Kaaba at golden hour",
  },
  {
    id: "madinah",
    title: "Al-Madinah al-Munawwarah",
    caption: "Reliable data between prayers, visits, and travel between the holy cities.",
    image: "/images/pilgrimage/madinah-mosque.png",
    imageAlt: "Al-Masjid an-Nabawi in Madinah at evening light",
  },
  {
    id: "preparation",
    title: "Prepare before you travel",
    caption: "Install your eSIM at home so worship and logistics — not phone shops — come first.",
    image: "/images/pilgrimage/pilgrim-preparation.png",
    imageAlt: "Traveler preparing for pilgrimage at home with phone and essentials",
  },
];

export const PILGRIMAGE_DUA_REMINDER =
  "Connectivity should stay in the background of your ibadah — maps, group messages, and hotspot for family, decided early and kept simple.";
