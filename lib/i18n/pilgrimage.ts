import type { Locale } from "@/lib/i18n/config";
import { normalizeLocale } from "@/lib/i18n/config";
import type {
  PilgrimageGalleryItem,
  PilgrimageQuote,
} from "@/lib/pilgrimage-inspiration";
import {
  PILGRIMAGE_DUA_REMINDER,
  PILGRIMAGE_FEATURED_QUOTE,
  PILGRIMAGE_GALLERY,
  PILGRIMAGE_QUOTES,
} from "@/lib/pilgrimage-inspiration";
import type { PilgrimRouteKey, PilgrimRouteMeta } from "@/lib/pilgrim-route-plans";
import { PILGRIM_ROUTE_GCC_BONUS } from "@/lib/pilgrim-route-plans";
import type { PilgrimTierKey, PilgrimTierMeta } from "@/lib/pilgrim-tiers";

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

export type LocalizedPilgrimTierCopy = {
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
};

export type LocalizedPilgrimRouteCopy = {
  title: string;
  subtitle: string;
  /** Contains the literal `{gcc}` placeholder so the UI can inject a hover span. */
  description: string;
  highlights: string[];
  checkoutCountry: string;
};

export type LocalizedGccCountry = { name: string; flag: string };

export type LocalizedInspirationChrome = {
  kicker: string;
  title: string;
  lead: string;
  labelQuran: string;
  labelHadith: string;
};

export type LocalizedCompareRow = {
  label: string;
  /** basic · connected · unlimited · routes */
  cells: [string, string, string, string];
};

export type LocalizedCompareTable = {
  title: string;
  subtitle: string;
  headers: {
    benefit: string;
    basic: string;
    connected: string;
    unlimited: string;
    routes: string;
  };
  rows: LocalizedCompareRow[];
};

export type LocalizedGccUi = {
  plusLabel: string;
  aria: string;
  panelTitle: string;
};

/** Literal token used inside route descriptions. */
export const GCC_PLACEHOLDER = "{gcc}";

/* -------------------------------------------------------------------------- */
/*  Pilgrim tiers                                                              */
/* -------------------------------------------------------------------------- */

const TIER_COPY: Record<PilgrimTierKey, Record<Locale, LocalizedPilgrimTierCopy>> = {
  basic: {
    en: {
      title: "Basic",
      subtitle: "Lite Explorer",
      description: "Essential data for maps, messaging, and arrival coordination.",
      highlights: [
        "Install before departure",
        "Makkah & Madinah coverage",
        "Ideal for short stays",
      ],
    },
    es: {
      title: "Básico",
      subtitle: "Explorador Lite",
      description:
        "Datos esenciales para mapas, mensajes y coordinar tu llegada.",
      highlights: [
        "Instálala antes de viajar",
        "Cobertura en Meca y Medina",
        "Ideal para estancias cortas",
      ],
    },
    ar: {
      title: "الأساسية",
      subtitle: "المستكشف لايت",
      description: "بيانات أساسية للخرائط والمراسلة وتنسيق الوصول.",
      highlights: [
        "ثبّتها قبل السفر",
        "تغطية مكة المكرمة والمدينة المنورة",
        "مثالية للإقامات القصيرة",
      ],
    },
  },
  connected: {
    en: {
      title: "Connected Pilgrim",
      subtitle: "Best Choice",
      description:
        "Choose 10GB or 20GB — balanced data for daily worship, family updates, and navigation.",
      highlights: [
        "Congestion-resilient access",
        "Hotspot included",
        "Recommended for first-time pilgrims",
      ],
    },
    es: {
      title: "Peregrino Conectado",
      subtitle: "La mejor opción",
      description:
        "Elige 10GB o 20GB: datos equilibrados para tu adoración diaria, las noticias de tu familia y la navegación.",
      highlights: [
        "Acceso estable incluso con multitudes",
        "Hotspot incluido",
        "Recomendado para quienes peregrinan por primera vez",
      ],
    },
    ar: {
      title: "الحاج المتصل",
      subtitle: "الخيار الأفضل",
      description:
        "اختر 10GB أو 20GB — بيانات متوازنة للعبادة اليومية وأخبار العائلة والتنقل.",
      highlights: [
        "اتصال مستقر وقت الازدحام",
        "نقطة اتصال (هوت سبوت) مشمولة",
        "موصى بها للحجاج والمعتمرين لأول مرة",
      ],
    },
  },
  unlimited: {
    en: {
      title: "Umrah Unlimited",
      subtitle: "3GB/Day · Day-Pass",
      description:
        "3GB/day at full speed, then up to 1 Mbps — for travelers who do not want to count gigabytes.",
      highlights: [
        "3GB/day full speed · then 1 Mbps",
        "Pick your trip length",
        "Hotspot included",
      ],
    },
    es: {
      title: "Umrah Ilimitada",
      subtitle: "3GB/día · Pase diario",
      description:
        "3GB al día a máxima velocidad y luego hasta 1 Mbps, para quienes no quieren estar contando gigas.",
      highlights: [
        "3GB/día a máxima velocidad · luego 1 Mbps",
        "Elige la duración de tu viaje",
        "Hotspot incluido",
      ],
    },
    ar: {
      title: "عمرة بلا حدود",
      subtitle: "3GB/يوم · باقة يومية",
      description:
        "3GB يوميًا بأعلى سرعة، ثم حتى 1 Mbps — لمن لا يريد حساب الجيجابايتات.",
      highlights: [
        "3GB/يوم بأعلى سرعة · ثم 1 Mbps",
        "اختر مدة رحلتك",
        "نقطة اتصال (هوت سبوت) مشمولة",
      ],
    },
  },
};

export function localizedPilgrimTier(
  key: PilgrimTierKey,
  locale?: string | null,
): LocalizedPilgrimTierCopy {
  return TIER_COPY[key][normalizeLocale(locale)];
}

/** Overlay localized title / subtitle / description / highlights on an existing tier meta. */
export function withLocalizedTierMeta<T extends PilgrimTierMeta>(
  meta: T,
  locale?: string | null,
): T {
  const copy = localizedPilgrimTier(meta.key, locale);
  return {
    ...meta,
    title: copy.title,
    subtitle: copy.subtitle,
    description: copy.description,
    highlights: [...copy.highlights],
  };
}

/* -------------------------------------------------------------------------- */
/*  Multi-stop routes                                                          */
/* -------------------------------------------------------------------------- */

const ROUTE_COPY: Record<PilgrimRouteKey, Record<Locale, LocalizedPilgrimRouteCopy>> = {
  "saudi-morocco": {
    en: {
      title: "Saudi + Morocco",
      subtitle: "Multi-stop",
      description:
        "One eSIM for your travel in Morocco and your Hajj or Umrah — {gcc} coverage included at no extra charge.",
      highlights: [
        "Saudi Arabia + Morocco on one install",
        "GCC bonus coverage included",
        "Choose 5GB / 15 days or 10GB / 30 days",
      ],
      checkoutCountry: "Saudi + Morocco",
    },
    es: {
      title: "Arabia Saudita + Marruecos",
      subtitle: "Varias paradas",
      description:
        "Una sola eSIM para tu viaje por Marruecos y tu Hajj o Umrah — {gcc} con cobertura incluida sin costo adicional.",
      highlights: [
        "Arabia Saudita + Marruecos en una sola instalación",
        "Cobertura adicional en el Golfo (GCC) incluida",
        "Elige 5GB / 15 días o 10GB / 30 días",
      ],
      checkoutCountry: "Arabia Saudita + Marruecos",
    },
    ar: {
      title: "السعودية + المغرب",
      subtitle: "عدة محطات",
      description:
        "شريحة eSIM واحدة لسفرك في المغرب وللحج أو العمرة — {gcc} ضمن الباقة دون أي رسوم إضافية.",
      highlights: [
        "السعودية والمغرب في تثبيت واحد",
        "تغطية إضافية في دول الخليج مشمولة",
        "اختر 5GB / 15 يومًا أو 10GB / 30 يومًا",
      ],
      checkoutCountry: "السعودية + المغرب",
    },
  },
  "saudi-turkey": {
    en: {
      title: "Saudi + Turkey",
      subtitle: "Multi-stop",
      description:
        "One eSIM for your travel in Turkey and your Hajj or Umrah — {gcc} coverage included at no extra charge.",
      highlights: [
        "Saudi Arabia + Turkey on one install",
        "GCC bonus coverage included",
        "Choose 5GB / 15 days or 10GB / 30 days",
      ],
      checkoutCountry: "Saudi + Turkey",
    },
    es: {
      title: "Arabia Saudita + Turquía",
      subtitle: "Varias paradas",
      description:
        "Una sola eSIM para tu viaje por Turquía y tu Hajj o Umrah — {gcc} con cobertura incluida sin costo adicional.",
      highlights: [
        "Arabia Saudita + Turquía en una sola instalación",
        "Cobertura adicional en el Golfo (GCC) incluida",
        "Elige 5GB / 15 días o 10GB / 30 días",
      ],
      checkoutCountry: "Arabia Saudita + Turquía",
    },
    ar: {
      title: "السعودية + تركيا",
      subtitle: "عدة محطات",
      description:
        "شريحة eSIM واحدة لسفرك في تركيا وللحج أو العمرة — {gcc} ضمن الباقة دون أي رسوم إضافية.",
      highlights: [
        "السعودية وتركيا في تثبيت واحد",
        "تغطية إضافية في دول الخليج مشمولة",
        "اختر 5GB / 15 يومًا أو 10GB / 30 يومًا",
      ],
      checkoutCountry: "السعودية + تركيا",
    },
  },
  "saudi-egypt": {
    en: {
      title: "Saudi + Egypt",
      subtitle: "Multi-stop",
      description:
        "One eSIM for your travel in Egypt and your Hajj or Umrah — {gcc} coverage included at no extra charge.",
      highlights: [
        "Saudi Arabia + Egypt on one install",
        "GCC bonus coverage included",
        "Choose 5GB / 15 days or 10GB / 30 days",
      ],
      checkoutCountry: "Saudi + Egypt",
    },
    es: {
      title: "Arabia Saudita + Egipto",
      subtitle: "Varias paradas",
      description:
        "Una sola eSIM para tu viaje por Egipto y tu Hajj o Umrah — {gcc} con cobertura incluida sin costo adicional.",
      highlights: [
        "Arabia Saudita + Egipto en una sola instalación",
        "Cobertura adicional en el Golfo (GCC) incluida",
        "Elige 5GB / 15 días o 10GB / 30 días",
      ],
      checkoutCountry: "Arabia Saudita + Egipto",
    },
    ar: {
      title: "السعودية + مصر",
      subtitle: "عدة محطات",
      description:
        "شريحة eSIM واحدة لسفرك في مصر وللحج أو العمرة — {gcc} ضمن الباقة دون أي رسوم إضافية.",
      highlights: [
        "السعودية ومصر في تثبيت واحد",
        "تغطية إضافية في دول الخليج مشمولة",
        "اختر 5GB / 15 يومًا أو 10GB / 30 يومًا",
      ],
      checkoutCountry: "السعودية + مصر",
    },
  },
};

export function localizedPilgrimRoute(
  key: PilgrimRouteKey,
  locale?: string | null,
): LocalizedPilgrimRouteCopy {
  return ROUTE_COPY[key][normalizeLocale(locale)];
}

/**
 * Overlay localized copy on an existing route meta (flag/key untouched).
 * `description` keeps the `{gcc}` placeholder — split it with `splitGccPlaceholder`.
 */
export function withLocalizedRouteMeta<T extends PilgrimRouteMeta>(
  meta: T,
  locale?: string | null,
): T {
  const copy = localizedPilgrimRoute(meta.key, locale);
  return {
    ...meta,
    title: copy.title,
    subtitle: copy.subtitle,
    description: copy.description,
    highlights: [...copy.highlights],
    checkoutCountry: copy.checkoutCountry,
  };
}

/** Split a route description around `{gcc}` → `[before, after]`, or `null` if absent. */
export function splitGccPlaceholder(text: string): [string, string] | null {
  const idx = text.indexOf(GCC_PLACEHOLDER);
  if (idx === -1) return null;
  return [text.slice(0, idx), text.slice(idx + GCC_PLACEHOLDER.length)];
}

/* -------------------------------------------------------------------------- */
/*  GCC bonus                                                                  */
/* -------------------------------------------------------------------------- */

/** Keyed by the English name used in `PILGRIM_ROUTE_GCC_BONUS`. */
const GCC_NAMES: Record<string, Record<Locale, string>> = {
  "United Arab Emirates": {
    en: "United Arab Emirates",
    es: "Emiratos Árabes Unidos",
    ar: "الإمارات العربية المتحدة",
  },
  Qatar: { en: "Qatar", es: "Catar", ar: "قطر" },
  Kuwait: { en: "Kuwait", es: "Kuwait", ar: "الكويت" },
  Bahrain: { en: "Bahrain", es: "Baréin", ar: "البحرين" },
  Oman: { en: "Oman", es: "Omán", ar: "عُمان" },
};

export function localizedGccCountries(
  locale?: string | null,
): LocalizedGccCountry[] {
  const loc = normalizeLocale(locale);
  return PILGRIM_ROUTE_GCC_BONUS.map((country) => ({
    name: GCC_NAMES[country.name]?.[loc] ?? country.name,
    flag: country.flag,
  }));
}

const GCC_UI: Record<Locale, LocalizedGccUi> = {
  en: {
    plusLabel: "plus GCC",
    aria: "GCC countries included",
    panelTitle: "Included GCC Coverage",
  },
  es: {
    plusLabel: "más países del Golfo",
    aria: "Países del Golfo incluidos",
    panelTitle: "Cobertura del Golfo (GCC) incluida",
  },
  ar: {
    plusLabel: "بالإضافة إلى دول الخليج",
    aria: "دول الخليج المشمولة",
    panelTitle: "تغطية دول الخليج المشمولة",
  },
};

export function localizedGccUi(locale?: string | null): LocalizedGccUi {
  return GCC_UI[normalizeLocale(locale)];
}

/* -------------------------------------------------------------------------- */
/*  Inspiration                                                                */
/* -------------------------------------------------------------------------- */

const INSPIRATION_CHROME: Record<Locale, LocalizedInspirationChrome> = {
  en: {
    kicker: "For the Journey of a Lifetime",
    title: "Worship First. Connectivity in the Background.",
    lead: "NoorLink helps pilgrims stay connected in Makkah and Madinah without letting setup steal focus from what matters most.",
    labelQuran: "Qur'an",
    labelHadith: "Hadith",
  },
  es: {
    kicker: "Para el viaje de tu vida",
    title: "Primero la adoración. La conexión, en segundo plano.",
    lead: "NoorLink ayuda a los peregrinos a mantenerse conectados en Meca y Medina, sin que la configuración les quite el enfoque de lo que más importa.",
    labelQuran: "Corán",
    labelHadith: "Hadiz",
  },
  ar: {
    kicker: "لرحلة العمر",
    title: "العبادة أولًا، والاتصال في الخلفية.",
    lead: "يساعد NoorLink الحجاج والمعتمرين على البقاء متصلين في مكة المكرمة والمدينة المنورة، دون أن يشغلهم الإعداد عمّا هو أهم.",
    labelQuran: "القرآن الكريم",
    labelHadith: "الحديث الشريف",
  },
};

export function localizedInspirationChrome(
  locale?: string | null,
): LocalizedInspirationChrome {
  return INSPIRATION_CHROME[normalizeLocale(locale)];
}

/** Localized text + source only; Arabic ayah (`arabic`) is always preserved from the source module. */
const QUOTE_COPY: Record<string, Record<Locale, { text: string; source: string }>> = {
  "quran-bakkah": {
    en: {
      text: PILGRIMAGE_FEATURED_QUOTE.text,
      source: PILGRIMAGE_FEATURED_QUOTE.source,
    },
    es: {
      text: "En verdad, la primera Casa establecida para la humanidad es la de Bakkah: bendita y guía para todos los mundos.",
      source: "Corán 3:96",
    },
    ar: {
      text: "أول بيتٍ أُقيم للناس ليعبدوا الله فيه هو البيت الذي بمكة، مباركًا وهداية للعالمين.",
      source: "القرآن الكريم · آل عمران 3:96",
    },
  },
  "quran-hajj-proclaim": {
    en: {
      text: "And proclaim to the people the Hajj — they will come to you on foot and on every lean camel.",
      source: "Qur'an 22:27",
    },
    es: {
      text: "Y proclama entre la gente el Hajj: vendrán a ti a pie y sobre toda montura flaca.",
      source: "Corán 22:27",
    },
    ar: {
      text: "وأعلِن في الناس بالحج، يأتوك مشاةً وعلى كل بعيرٍ ضامر.",
      source: "القرآن الكريم · الحج 22:27",
    },
  },
  "hadith-ease": {
    en: {
      text: "Make things easy for people, do not make them difficult; give glad tidings and do not repel.",
      source: "Hadith · Bukhari & Muslim",
    },
    es: {
      text: "Faciliten las cosas a la gente y no se las dificulten; den buenas noticias y no ahuyenten.",
      source: "Hadiz · Bujari y Muslim",
    },
    ar: {
      text: "يسّروا ولا تعسّروا، وبشّروا ولا تنفّروا.",
      source: "حديث شريف · البخاري ومسلم",
    },
  },
  "hadith-intention": {
    en: {
      text: "Actions are judged by intentions, and every person will get what they intended.",
      source: "Hadith · Bukhari & Muslim",
    },
    es: {
      text: "Las acciones se juzgan por las intenciones, y cada persona obtendrá lo que se propuso.",
      source: "Hadiz · Bujari y Muslim",
    },
    ar: {
      text: "إنما الأعمال بالنيّات، وإنما لكل امرئٍ ما نوى.",
      source: "حديث شريف · البخاري ومسلم",
    },
  },
};

function localizeQuote(quote: PilgrimageQuote, loc: Locale): PilgrimageQuote {
  const copy = QUOTE_COPY[quote.id]?.[loc];
  if (!copy) return quote;
  return { ...quote, text: copy.text, source: copy.source };
}

export function localizedFeaturedQuote(locale?: string | null): PilgrimageQuote {
  return localizeQuote(PILGRIMAGE_FEATURED_QUOTE, normalizeLocale(locale));
}

export function localizedQuotes(locale?: string | null): PilgrimageQuote[] {
  const loc = normalizeLocale(locale);
  return PILGRIMAGE_QUOTES.map((quote) => localizeQuote(quote, loc));
}

const GALLERY_COPY: Record<
  string,
  Record<Locale, { title: string; caption: string; imageAlt: string }>
> = {
  makkah: {
    en: {
      title: "Makkah al-Mukarramah",
      caption: "Stay reachable for family updates and essential apps in the Haram.",
      imageAlt: "Masjid al-Haram and the Kaaba at golden hour",
    },
    es: {
      title: "Meca al-Mukarramah",
      caption:
        "Mantente al alcance de tu familia y de tus apps esenciales dentro del Haram.",
      imageAlt: "La Mezquita Sagrada (Masjid al-Haram) y la Kaaba en la hora dorada",
    },
    ar: {
      title: "مكة المكرمة",
      caption: "ابقَ على تواصل مع عائلتك وتطبيقاتك الأساسية داخل الحرم.",
      imageAlt: "المسجد الحرام والكعبة المشرفة وقت الغروب الذهبي",
    },
  },
  madinah: {
    en: {
      title: "Al-Madinah al-Munawwarah",
      caption:
        "Reliable data between prayers, visits, and travel between the holy cities.",
      imageAlt: "Al-Masjid an-Nabawi in Madinah at evening light",
    },
    es: {
      title: "Medina al-Munawwarah",
      caption:
        "Datos confiables entre oraciones, visitas y traslados entre las ciudades santas.",
      imageAlt: "La Mezquita del Profeta (al-Masjid an-Nabawi) en Medina al atardecer",
    },
    ar: {
      title: "المدينة المنورة",
      caption: "بيانات موثوقة بين الصلوات والزيارات والتنقل بين المدينتين المقدستين.",
      imageAlt: "المسجد النبوي الشريف في المدينة المنورة في ضوء المساء",
    },
  },
  preparation: {
    en: {
      title: "Prepare Before You Travel",
      caption:
        "Install your eSIM at home so worship and logistics — not phone shops — come first.",
      imageAlt:
        "Traveler preparing for pilgrimage at home with phone and essentials",
    },
    es: {
      title: "Prepárate antes de viajar",
      caption:
        "Instala tu eSIM en casa para que la adoración y la logística, y no las tiendas de celulares, sean lo primero.",
      imageAlt:
        "Viajero preparando su peregrinación en casa con el celular y lo esencial",
    },
    ar: {
      title: "استعد قبل السفر",
      caption:
        "ثبّت شريحة eSIM في بيتك لتكون العبادة والتنظيم — لا محلات الهواتف — في المقدمة.",
      imageAlt: "مسافر يستعد للحج أو العمرة في بيته ومعه هاتفه وأغراضه الأساسية",
    },
  },
};

export function localizedGallery(
  locale?: string | null,
): PilgrimageGalleryItem[] {
  const loc = normalizeLocale(locale);
  return PILGRIMAGE_GALLERY.map((item) => {
    const copy = GALLERY_COPY[item.id]?.[loc];
    return copy ? { ...item, ...copy } : item;
  });
}

const DUA_REMINDER: Record<Locale, string> = {
  en: PILGRIMAGE_DUA_REMINDER,
  es: "Que la conexión quede en segundo plano de tu ibadah: mapas, mensajes de grupo y hotspot para la familia, definidos con tiempo y sin complicaciones.",
  ar: "ينبغي أن يبقى الاتصال في خلفية عبادتك — خرائط ورسائل المجموعة ونقطة اتصال لعائلتك — تُحدَّد مبكرًا وتبقى بسيطة.",
};

export function localizedDuaReminder(locale?: string | null): string {
  return DUA_REMINDER[normalizeLocale(locale)];
}

/* -------------------------------------------------------------------------- */
/*  Benefits comparison table                                                  */
/* -------------------------------------------------------------------------- */

const COMPARE_TABLE: Record<Locale, LocalizedCompareTable> = {
  en: {
    title: "Benefits Comparison",
    subtitle: "Compare data, hotspot, and support across our pilgrimage profiles.",
    headers: {
      benefit: "Benefit",
      basic: "Basic",
      connected: "Connected",
      unlimited: "Umrah Unlimited",
      routes: "Saudi + Turkey / Egypt / Morocco",
    },
    rows: [
      {
        label: "Coverage",
        cells: [
          "Makkah & Madinah",
          "Makkah & Madinah",
          "Makkah & Madinah",
          "Saudi + Turkey, Egypt, or Morocco",
        ],
      },
      {
        label: "Data Allowance",
        cells: [
          "5GB · 30 days",
          "10GB or 20GB",
          "3GB/day · then 1 Mbps",
          "5GB / 15d or 10GB / 30d",
        ],
      },
      {
        label: "Trip Length",
        cells: ["30 days", "30 days", "7 or 10 days", "15 or 30 days"],
      },
      {
        label: "Hotspot Sharing",
        cells: ["Included", "Included", "Included", "Included"],
      },
      {
        label: "WhatsApp Support",
        cells: ["24/7", "24/7", "24/7", "24/7"],
      },
      {
        label: "Video Calls & Live Updates",
        cells: ["Light use", "Regular use", "Heavy daily use", "Regional trip use"],
      },
      {
        label: "Best For",
        cells: [
          "Short stays",
          "Most first-time pilgrims",
          "Travelers who prefer day-pass unlimited",
          "Days in Turkey/Egypt/Morocco + Saudi",
        ],
      },
    ],
  },
  es: {
    title: "Comparación de beneficios",
    subtitle:
      "Compara datos, hotspot y soporte en nuestros perfiles de peregrinación.",
    headers: {
      benefit: "Beneficio",
      basic: "Básico",
      connected: "Conectado",
      unlimited: "Umrah Ilimitada",
      routes: "Arabia Saudita + Turquía / Egipto / Marruecos",
    },
    rows: [
      {
        label: "Cobertura",
        cells: [
          "Meca y Medina",
          "Meca y Medina",
          "Meca y Medina",
          "Arabia Saudita + Turquía, Egipto o Marruecos",
        ],
      },
      {
        label: "Datos incluidos",
        cells: [
          "5GB · 30 días",
          "10GB o 20GB",
          "3GB/día · luego 1 Mbps",
          "5GB / 15 d o 10GB / 30 d",
        ],
      },
      {
        label: "Duración del viaje",
        cells: ["30 días", "30 días", "7 o 10 días", "15 o 30 días"],
      },
      {
        label: "Compartir datos (hotspot)",
        cells: ["Incluido", "Incluido", "Incluido", "Incluido"],
      },
      {
        label: "Soporte por WhatsApp",
        cells: ["24/7", "24/7", "24/7", "24/7"],
      },
      {
        label: "Videollamadas y noticias en vivo",
        cells: ["Uso ligero", "Uso regular", "Uso diario intenso", "Uso en viaje regional"],
      },
      {
        label: "Ideal para",
        cells: [
          "Estancias cortas",
          "La mayoría de los peregrinos primerizos",
          "Quienes prefieren un pase diario ilimitado",
          "Días en Turquía/Egipto/Marruecos + Arabia Saudita",
        ],
      },
    ],
  },
  ar: {
    title: "مقارنة المزايا",
    subtitle: "قارن البيانات ونقطة الاتصال والدعم بين باقات الحج والعمرة لدينا.",
    headers: {
      benefit: "الميزة",
      basic: "الأساسية",
      connected: "المتصل",
      unlimited: "عمرة بلا حدود",
      routes: "السعودية + تركيا / مصر / المغرب",
    },
    rows: [
      {
        label: "التغطية",
        cells: [
          "مكة المكرمة والمدينة المنورة",
          "مكة المكرمة والمدينة المنورة",
          "مكة المكرمة والمدينة المنورة",
          "السعودية + تركيا أو مصر أو المغرب",
        ],
      },
      {
        label: "حجم البيانات",
        cells: [
          "5GB · 30 يومًا",
          "10GB أو 20GB",
          "3GB/يوم · ثم 1 Mbps",
          "5GB / 15 يومًا أو 10GB / 30 يومًا",
        ],
      },
      {
        label: "مدة الرحلة",
        cells: ["30 يومًا", "30 يومًا", "7 أو 10 أيام", "15 أو 30 يومًا"],
      },
      {
        label: "مشاركة الإنترنت (هوت سبوت)",
        cells: ["مشمولة", "مشمولة", "مشمولة", "مشمولة"],
      },
      {
        label: "الدعم عبر واتساب",
        cells: ["على مدار الساعة", "على مدار الساعة", "على مدار الساعة", "على مدار الساعة"],
      },
      {
        label: "مكالمات الفيديو والتحديثات المباشرة",
        cells: ["استخدام خفيف", "استخدام معتاد", "استخدام يومي مكثف", "استخدام خلال رحلة إقليمية"],
      },
      {
        label: "الأنسب لـ",
        cells: [
          "الإقامات القصيرة",
          "معظم الحجاج والمعتمرين لأول مرة",
          "من يفضّل باقة يومية غير محدودة",
          "أيام في تركيا/مصر/المغرب + السعودية",
        ],
      },
    ],
  },
};

export function localizedCompareTable(
  locale?: string | null,
): LocalizedCompareTable {
  return COMPARE_TABLE[normalizeLocale(locale)];
}

/* -------------------------------------------------------------------------- */
/*  Small shared strings                                                       */
/* -------------------------------------------------------------------------- */

const BRAND_LINE: Record<Locale, string> = {
  en: "Built by Muslims, for Muslims",
  es: "Creado por musulmanes, para musulmanes",
  ar: "من المسلمين وللمسلمين",
};

export function localizedBrandLine(locale?: string | null): string {
  return BRAND_LINE[normalizeLocale(locale)];
}

const GB_PER_DAY: Record<Locale, string> = {
  en: "3GB/day",
  es: "3GB/día",
  ar: "3GB/يوم",
};

export function localizedGbPerDay(locale?: string | null): string {
  return GB_PER_DAY[normalizeLocale(locale)];
}

const UNLIMITED_SPEED_CELL: Record<Locale, string> = {
  en: "3GB/day · then 1 Mbps",
  es: "3GB/día · luego 1 Mbps",
  ar: "3GB/يوم · ثم 1 Mbps",
};

export function localizedUnlimitedSpeedCell(locale?: string | null): string {
  return UNLIMITED_SPEED_CELL[normalizeLocale(locale)];
}

function daysWord(days: number, loc: Locale): string {
  switch (loc) {
    case "es":
      return days === 1 ? "Día" : "Días";
    case "ar":
      if (days === 1) return "يوم";
      if (days === 2) return "يومان";
      if (days >= 3 && days <= 10) return "أيام";
      return "يومًا";
    default:
      return days === 1 ? "Day" : "Days";
  }
}

/** → "{title} {gb}GB · {days} Days" with a localized day word. */
export function localizedRoutePlanName(
  title: string,
  gb: number,
  days: number,
  locale?: string | null,
): string {
  const loc = normalizeLocale(locale);
  return `${title} ${gb}GB · ${days} ${daysWord(days, loc)}`;
}
