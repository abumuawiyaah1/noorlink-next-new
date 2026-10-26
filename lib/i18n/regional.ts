import type { Locale } from "@/lib/i18n/config";
import { normalizeLocale } from "@/lib/i18n/config";
import type {
  RegionalProduct,
  RegionalRouteSlug,
} from "@/lib/regional-products";

/** Localized marketing fields for each regional product (country lists stay English). */
export type RegionalCopy = {
  displayName: string;
  shortName: string;
  heroTagline: string;
  faqBorder: string;
};

type RegionalCopyByLocale = Record<Locale, RegionalCopy>;

export const REGIONAL_COPY: Record<RegionalRouteSlug, RegionalCopyByLocale> = {
  caribbean: {
    en: {
      displayName: "Caribbean Regional",
      shortName: "Caribbean",
      heroTagline:
        "Island-hop on one eSIM — Bahamas, Jamaica, Dominican Republic and 20+ Caribbean destinations.",
      faqBorder:
        "No. One Caribbean plan covers every island listed on this page — install once and hop freely.",
    },
    es: {
      displayName: "Caribe Regional",
      shortName: "Caribe",
      heroTagline:
        "Salta de isla en isla con una sola eSIM: Bahamas, Jamaica, República Dominicana y más de 20 destinos del Caribe.",
      faqBorder:
        "No. Un solo plan del Caribe cubre todas las islas de esta página: instálalo una vez y viaja libremente entre ellas.",
    },
    ar: {
      displayName: "باقة الكاريبي الإقليمية",
      shortName: "الكاريبي",
      heroTagline:
        "تنقّل بين الجزر بشريحة eSIM واحدة: جزر البهاما وجامايكا وجمهورية الدومينيكان وأكثر من 20 وجهة في الكاريبي.",
      faqBorder:
        "لا. باقة الكاريبي الواحدة تغطي كل الجزر المدرجة في هذه الصفحة؛ ثبّتها مرة واحدة وتنقّل بحرية.",
    },
  },
  europe: {
    en: {
      displayName: "Europe Regional",
      shortName: "Europe",
      heroTagline: "One plan across Europe — install once, cross borders freely.",
      faqBorder:
        "No. That is the point of a regional plan — same eSIM, same settings when you move between covered countries.",
    },
    es: {
      displayName: "Europa Regional",
      shortName: "Europa",
      heroTagline:
        "Un solo plan para toda Europa: instálalo una vez y cruza fronteras sin preocuparte.",
      faqBorder:
        "No. De eso se trata un plan regional: la misma eSIM y los mismos ajustes cuando pasas de un país cubierto a otro.",
    },
    ar: {
      displayName: "باقة أوروبا الإقليمية",
      shortName: "أوروبا",
      heroTagline:
        "باقة واحدة تغطي أوروبا: ثبّتها مرة واحدة وتنقّل بين الدول بحرية.",
      faqBorder:
        "لا. هذه هي فائدة الباقة الإقليمية: الشريحة نفسها والإعدادات نفسها عند التنقل بين الدول المشمولة.",
    },
  },
  "north-america": {
    en: {
      displayName: "North America Regional",
      shortName: "North America",
      heroTagline:
        "USA, Canada, and Mexico on one eSIM — no plan swap at the border.",
      faqBorder:
        "No. Keep the same eSIM line for mobile data across the USA, Canada, and Mexico.",
    },
    es: {
      displayName: "Norteamérica Regional",
      shortName: "Norteamérica",
      heroTagline:
        "Estados Unidos, Canadá y México con una sola eSIM: sin cambiar de plan en la frontera.",
      faqBorder:
        "No. Conserva la misma línea eSIM para datos móviles en Estados Unidos, Canadá y México.",
    },
    ar: {
      displayName: "باقة أمريكا الشمالية الإقليمية",
      shortName: "أمريكا الشمالية",
      heroTagline:
        "الولايات المتحدة وكندا والمكسيك بشريحة eSIM واحدة، دون تغيير الباقة عند الحدود.",
      faqBorder:
        "لا. احتفظ بخط eSIM نفسه لبيانات الجوال في الولايات المتحدة وكندا والمكسيك.",
    },
  },
  "asia-pacific": {
    en: {
      displayName: "Asia Pacific Regional",
      shortName: "Asia Pacific",
      heroTagline: "Japan to Thailand and beyond — one QR for your Asia trip.",
      faqBorder:
        "No. Use the same install when you hop between covered countries in Asia Pacific.",
    },
    es: {
      displayName: "Asia-Pacífico Regional",
      shortName: "Asia-Pacífico",
      heroTagline:
        "De Japón a Tailandia y más allá: un solo código QR para todo tu viaje por Asia.",
      faqBorder:
        "No. Usa la misma instalación cuando viajes entre los países cubiertos de Asia-Pacífico.",
    },
    ar: {
      displayName: "باقة آسيا والمحيط الهادئ الإقليمية",
      shortName: "آسيا والمحيط الهادئ",
      heroTagline:
        "من اليابان إلى تايلاند وما بعدها: رمز QR واحد لرحلتك في آسيا.",
      faqBorder:
        "لا. استخدم التثبيت نفسه عند التنقل بين الدول المشمولة في آسيا والمحيط الهادئ.",
    },
  },
  "middle-east": {
    en: {
      displayName: "Middle East Regional",
      shortName: "Middle East",
      heroTagline:
        "Gulf, Turkey, Egypt and more — one eSIM for multi-stop Middle East trips.",
      faqBorder:
        "No. One regional plan covers every country listed on this page (Lebanon and a few nearby markets not included yet).",
    },
    es: {
      displayName: "Medio Oriente Regional",
      shortName: "Medio Oriente",
      heroTagline:
        "Golfo, Turquía, Egipto y más: una sola eSIM para viajes con varias escalas por Medio Oriente.",
      faqBorder:
        "No. Un solo plan regional cubre todos los países de esta página (el Líbano y algunos mercados cercanos aún no están incluidos).",
    },
    ar: {
      displayName: "باقة الشرق الأوسط الإقليمية",
      shortName: "الشرق الأوسط",
      heroTagline:
        "الخليج وتركيا ومصر وغيرها: شريحة eSIM واحدة لرحلاتك متعددة المحطات في الشرق الأوسط.",
      faqBorder:
        "لا. باقة إقليمية واحدة تغطي جميع الدول المدرجة في هذه الصفحة (لبنان وبعض الأسواق المجاورة غير مشمولة حاليًا).",
    },
  },
  africa: {
    en: {
      displayName: "Africa Regional",
      shortName: "Africa",
      heroTagline:
        "Safaris, cities, and coastlines — one plan across African destinations.",
      faqBorder:
        "No. Use the same eSIM as you travel between covered African destinations.",
    },
    es: {
      displayName: "África Regional",
      shortName: "África",
      heroTagline:
        "Safaris, ciudades y costas: un solo plan para destinos de todo el continente africano.",
      faqBorder:
        "No. Usa la misma eSIM mientras viajas entre los destinos africanos cubiertos.",
    },
    ar: {
      displayName: "باقة أفريقيا الإقليمية",
      shortName: "أفريقيا",
      heroTagline:
        "رحلات السفاري والمدن والسواحل: باقة واحدة تغطي الوجهات الأفريقية.",
      faqBorder:
        "لا. استخدم شريحة eSIM نفسها أثناء تنقلك بين الوجهات الأفريقية المشمولة.",
    },
  },
  "south-america": {
    en: {
      displayName: "South America Regional",
      shortName: "South America",
      heroTagline:
        "Brazil to the Andes on one eSIM — Latin America regional coverage.",
      faqBorder:
        "No. Keep the same eSIM line for mobile data across covered Latin America destinations.",
    },
    es: {
      displayName: "Sudamérica Regional",
      shortName: "Sudamérica",
      heroTagline:
        "De Brasil a los Andes con una sola eSIM: cobertura regional en Latinoamérica.",
      faqBorder:
        "No. Conserva la misma línea eSIM para datos móviles en los destinos cubiertos de Latinoamérica.",
    },
    ar: {
      displayName: "باقة أمريكا الجنوبية الإقليمية",
      shortName: "أمريكا الجنوبية",
      heroTagline:
        "من البرازيل إلى جبال الأنديز بشريحة eSIM واحدة: تغطية إقليمية في أمريكا اللاتينية.",
      faqBorder:
        "لا. احتفظ بخط eSIM نفسه لبيانات الجوال في وجهات أمريكا اللاتينية المشمولة.",
    },
  },
  global: {
    en: {
      displayName: "Global Regional",
      shortName: "Global",
      heroTagline:
        "193 countries on one plan — for long-haul and multi-region journeys.",
      faqBorder:
        "No. Your global plan follows you across every covered country on your itinerary.",
    },
    es: {
      displayName: "Plan Global",
      shortName: "Global",
      heroTagline:
        "193 países en un solo plan: para viajes de larga distancia y recorridos por varias regiones.",
      faqBorder:
        "No. Tu plan global te acompaña por todos los países cubiertos de tu itinerario.",
    },
    ar: {
      displayName: "الباقة العالمية",
      shortName: "عالمي",
      heroTagline:
        "193 دولة في باقة واحدة: للرحلات الطويلة والتنقل بين عدة مناطق.",
      faqBorder:
        "لا. باقتك العالمية ترافقك في كل الدول المشمولة ضمن مسار رحلتك.",
    },
  },
};

/** Overlay localized marketing fields on a regional product. */
export function localizeRegionalProduct<
  T extends Pick<
    RegionalProduct,
    "routeSlug" | "displayName" | "shortName" | "heroTagline" | "faqBorder"
  >,
>(product: T, locale?: Locale | string | null): T {
  const copy = REGIONAL_COPY[product.routeSlug]?.[normalizeLocale(locale)];
  if (!copy) return product;
  return { ...product, ...copy };
}

/** SEO title/description for `/plans/regional/[region]`. */
export function regionalMetaCopy(
  product: RegionalProduct,
  locale?: Locale | string | null,
): { title: string; description: string } {
  const loc = normalizeLocale(locale);
  const localized = localizeRegionalProduct(product, loc);
  const n = product.countries.length;

  if (loc === "es") {
    return {
      title: `Planes eSIM ${localized.displayName} | NoorLink`,
      description: `${localized.heroTagline} Cubre ${n} países. Planes fijos, ilimitados y flexibles.`,
    };
  }
  if (loc === "ar") {
    return {
      title: `باقات eSIM ${localized.displayName} | NoorLink`,
      description: `${localized.heroTagline} تغطي ${n} دولة. باقات ثابتة وغير محدودة ومرنة، جاهزة قبل السفر.`,
    };
  }
  return {
    title: `${localized.displayName} eSIM Plans | NoorLink`,
    description: `${localized.heroTagline} Covers ${n} countries. Fixed, unlimited, and flexible plans.`,
  };
}
