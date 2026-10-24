import type { Locale } from "@/lib/i18n/config";
import { normalizeLocale } from "@/lib/i18n/config";
import type { PopularSeasonId } from "@/lib/popular-countries";

type StoryCopy = { reason: string; tips: [string, string] };

const SEASON_LABELS: Record<PopularSeasonId, Record<Locale, string>> = {
  "winter-sun": {
    en: "Winter sun",
    es: "Sol de invierno",
    ar: "شمس الشتاء",
  },
  "pilgrimage-spring": {
    en: "Pilgrimage spring",
    es: "Primavera de peregrinación",
    ar: "ربيع الحج والعمرة",
  },
  summer: {
    en: "Summer travel",
    es: "Viajes de verano",
    ar: "سفر الصيف",
  },
  "hajj-fall": {
    en: "Hajj & fall travel",
    es: "Hajj y viajes de otoño",
    ar: "الحج وسفر الخريف",
  },
};

const DEFAULTS: Record<Locale, StoryCopy> = {
  en: {
    reason: "Popular right now",
    tips: [
      "Explore the old city on foot",
      "Save an evening for a local meal out",
    ],
  },
  es: {
    reason: "Popular ahora",
    tips: [
      "Explora la ciudad antigua a pie",
      "Reserva una noche para una comida local",
    ],
  },
  ar: {
    reason: "رائج الآن",
    tips: [
      "تجوّل في المدينة القديمة سيرًا",
      "احفظ مساءً لوجبة محلية خارج المنزل",
    ],
  },
};

const FESTIVITIES: Record<string, Record<Locale, StoryCopy>> = {
  "nye-nyc": {
    en: {
      reason: "New Year in Times Square",
      tips: [
        "Watch the ball drop in Times Square",
        "Toast midnight with a late Broadway show or rooftop view",
      ],
    },
    es: {
      reason: "Año Nuevo en Times Square",
      tips: [
        "Mira la caída de la bola en Times Square",
        "Brinda a medianoche con un show de Broadway o vista desde una terraza",
      ],
    },
    ar: {
      reason: "رأس السنة في تايمز سكوير",
      tips: [
        "شاهد إسقاط الكرة في تايمز سكوير",
        "احتفل بمنتصف الليل بعرض برودواي متأخر أو إطلالة من سطح",
      ],
    },
  },
  "jamaica-carnival-season": {
    en: {
      reason: "Carnival season energy",
      tips: [
        "Join the color and music of carnival street parties",
        "Spend a beach morning in Negril after the celebrations",
      ],
    },
    es: {
      reason: "Energía de temporada de carnaval",
      tips: [
        "Únete al color y la música de las fiestas callejeras",
        "Pasa una mañana de playa en Negril después de las celebraciones",
      ],
    },
    ar: {
      reason: "طاقة موسم الكرنفال",
      tips: [
        "انضم إلى ألوان وموسيقى حفلات الشوارع",
        "اقضِ صباحًا على شاطئ نيغريل بعد الاحتفالات",
      ],
    },
  },
};

const SEASON_STORIES: Record<
  PopularSeasonId,
  Partial<Record<string, Record<Locale, StoryCopy>>>
> = {
  "winter-sun": {
    usa: {
      en: {
        reason: "Winter city breaks",
        tips: ["Ice skate in a city park", "Warm up in a museum afternoon"],
      },
      es: {
        reason: "Escapadas urbanas de invierno",
        tips: [
          "Patina sobre hielo en un parque de la ciudad",
          "Abrígate con una tarde de museo",
        ],
      },
      ar: {
        reason: "استراحات مدينة شتوية",
        tips: [
          "تزلّج على الجليد في حديقة المدينة",
          "ادفأ نفسك بظهيرة في متحف",
        ],
      },
    },
    mexico: {
      en: {
        reason: "Winter sun escape",
        tips: ["Swim a Yucatán cenote", "Stroll a colonial plaza at sunset"],
      },
      es: {
        reason: "Escape al sol de invierno",
        tips: [
          "Nada en un cenote de Yucatán",
          "Pasea por una plaza colonial al atardecer",
        ],
      },
      ar: {
        reason: "هروب إلى شمس الشتاء",
        tips: [
          "اسبح في سينوتي بيوكاتان",
          "تجوّل في ساحة استعمارية عند الغروب",
        ],
      },
    },
    jamaica: {
      en: {
        reason: "Winter island escape",
        tips: [
          "Swim in turquoise water at Negril",
          "Taste jerk chicken in a beach town",
        ],
      },
      es: {
        reason: "Escape invernal a la isla",
        tips: [
          "Nada en aguas turquesas en Negril",
          "Prueba pollo jerk en un pueblo playero",
        ],
      },
      ar: {
        reason: "هروب شتوي إلى الجزيرة",
        tips: [
          "اسبح في مياه فيروزية في نيغريل",
          "تذوّق دجاج الجيرك في بلدة شاطئية",
        ],
      },
    },
    turkey: {
      en: {
        reason: "Mild winter city travel",
        tips: ["Cruise the Bosphorus", "Wander the Grand Bazaar"],
      },
      es: {
        reason: "Viaje urbano de invierno suave",
        tips: ["Cruza el Bósforo en barco", "Pasea por el Gran Bazar"],
      },
      ar: {
        reason: "سفر مدينة في شتاء معتدل",
        tips: ["أبحر في البوسفور", "تجوّل في البازار الكبير"],
      },
    },
    uae: {
      en: {
        reason: "Peak winter in the Gulf",
        tips: ["Watch the Dubai skyline at dusk", "Explore a desert evening"],
      },
      es: {
        reason: "Pico de invierno en el Golfo",
        tips: [
          "Mira el skyline de Dubái al anochecer",
          "Explora una noche en el desierto",
        ],
      },
      ar: {
        reason: "ذروة الشتاء في الخليج",
        tips: [
          "شاهد أفق دبي عند الغسق",
          "استكشف مساءً في الصحراء",
        ],
      },
    },
    "saudi-arabia": {
      en: {
        reason: "Pilgrimage season travel",
        tips: [
          "Visit the Haram with calm prep days",
          "See heritage streets in Diriyah",
        ],
      },
      es: {
        reason: "Viaje en temporada de peregrinación",
        tips: [
          "Visita el Haram con días de preparación tranquila",
          "Recorre calles históricas en Diriyah",
        ],
      },
      ar: {
        reason: "سفر موسم الحج والعمرة",
        tips: [
          "زُر الحرم بأيام تحضير هادئة",
          "تجوّل في شوارع التراث في الدرعية",
        ],
      },
    },
  },
  "pilgrimage-spring": {
    "saudi-arabia": {
      en: {
        reason: "Umrah & spring travel",
        tips: [
          "Plan quiet time in Makkah and Madinah",
          "Add a day in modern Riyadh",
        ],
      },
      es: {
        reason: "Umrah y viajes de primavera",
        tips: [
          "Planea tiempo tranquilo en Meca y Medina",
          "Añade un día en Riad moderna",
        ],
      },
      ar: {
        reason: "عمرة وسفر الربيع",
        tips: [
          "خطّط لوقت هادئ في مكة والمدينة",
          "أضف يومًا في الرياض الحديثة",
        ],
      },
    },
    turkey: {
      en: {
        reason: "Spring pilgrimage layover favorite",
        tips: ["See Cappadocia at sunrise", "Walk the Sultanahmet peninsula"],
      },
      es: {
        reason: "Favorita de escala en primavera",
        tips: [
          "Mira Capadocia al amanecer",
          "Camina por la península de Sultanahmet",
        ],
      },
      ar: {
        reason: "محطة مفضلة في ربيع الحج",
        tips: [
          "شاهد كابادوكيا عند الشروق",
          "تمشَّ في شبه جزيرة السلطان أحمد",
        ],
      },
    },
    uae: {
      en: {
        reason: "Spring Gulf stopover",
        tips: ["Visit Sheikh Zayed Mosque", "Evening walk on the Corniche"],
      },
      es: {
        reason: "Escala de primavera en el Golfo",
        tips: [
          "Visita la mezquita Sheikh Zayed",
          "Paseo nocturno por la Corniche",
        ],
      },
      ar: {
        reason: "توقف ربيعي في الخليج",
        tips: [
          "زُر مسجد الشيخ زايد",
          "تمشَّ مساءً على الكورنيش",
        ],
      },
    },
    japan: {
      en: {
        reason: "Cherry blossom season",
        tips: [
          "Walk under sakura in a city park",
          "Ride a day trip to Kyoto temples",
        ],
      },
      es: {
        reason: "Temporada de cerezos en flor",
        tips: [
          "Camina bajo sakura en un parque de la ciudad",
          "Haz una excursión a los templos de Kioto",
        ],
      },
      ar: {
        reason: "موسم أزهار الكرز",
        tips: [
          "تمشَّ تحت الساكورا في حديقة المدينة",
          "خذ رحلة يومية إلى معابد كيوتو",
        ],
      },
    },
    france: {
      en: {
        reason: "Spring in the cities",
        tips: [
          "Café morning along the Seine",
          "Day trip into the countryside",
        ],
      },
      es: {
        reason: "Primavera en las ciudades",
        tips: [
          "Mañana de café junto al Sena",
          "Excursión de un día al campo",
        ],
      },
      ar: {
        reason: "ربيع في المدن",
        tips: [
          "صباح قهوة على ضفاف السين",
          "رحلة يومية إلى الريف",
        ],
      },
    },
  },
  summer: {
    france: {
      en: {
        reason: "Summer travel peak",
        tips: ["Evening walk along the Seine", "Day on the Riviera coast"],
      },
      es: {
        reason: "Pico de viajes de verano",
        tips: [
          "Paseo nocturno junto al Sena",
          "Un día en la costa de la Riviera",
        ],
      },
      ar: {
        reason: "ذروة سفر الصيف",
        tips: [
          "تمشَّ مساءً على ضفاف السين",
          "يوم على ساحل الريفييرا",
        ],
      },
    },
    italy: {
      en: {
        reason: "Summer in Italy",
        tips: [
          "Walk Rome’s Centro in soft morning light",
          "Gelato stop after a piazza evening",
        ],
      },
      es: {
        reason: "Verano en Italia",
        tips: [
          "Camina el centro de Roma con luz suave de mañana",
          "Para por un gelato después de una noche en la plaza",
        ],
      },
      ar: {
        reason: "صيف في إيطاليا",
        tips: [
          "تمشَّ في مركز روما بضوء الصباح الهادئ",
          "توقّف لجيلاتو بعد مساء في الساحة",
        ],
      },
    },
    spain: {
      en: {
        reason: "Summer Spain escapes",
        tips: [
          "Tapas night in a lively barrio",
          "Beach morning on the Mediterranean",
        ],
      },
      es: {
        reason: "Escapadas de verano en España",
        tips: [
          "Noche de tapas en un barrio animado",
          "Mañana de playa en el Mediterráneo",
        ],
      },
      ar: {
        reason: "هروب صيفي في إسبانيا",
        tips: [
          "ليلة تاباس في حي مفعم بالحياة",
          "صباح شاطئ على المتوسط",
        ],
      },
    },
    turkey: {
      en: {
        reason: "Summer coasts & cities",
        tips: ["Ferry day on the Bosphorus", "Sunset on the Aegean coast"],
      },
      es: {
        reason: "Costas y ciudades de verano",
        tips: [
          "Día en ferry por el Bósforo",
          "Atardecer en la costa del Egeo",
        ],
      },
      ar: {
        reason: "سواحل ومدن الصيف",
        tips: [
          "يوم عبارة على البوسفور",
          "غروب على ساحل إيجة",
        ],
      },
    },
    uk: {
      en: {
        reason: "Summer city hopping",
        tips: ["Picnic in a London park", "Day-trip to Bath or Brighton"],
      },
      es: {
        reason: "Salto de ciudades en verano",
        tips: [
          "Picnic en un parque de Londres",
          "Excursión a Bath o Brighton",
        ],
      },
      ar: {
        reason: "تنقّل بين المدن صيفًا",
        tips: [
          "نزهة في حديقة بلندن",
          "رحلة يومية إلى باث أو برايتون",
        ],
      },
    },
    jamaica: {
      en: {
        reason: "Caribbean summer",
        tips: ["Reggae beach afternoon", "Waterfall swim in the hills"],
      },
      es: {
        reason: "Verano caribeño",
        tips: [
          "Tarde de reggae en la playa",
          "Nada en una cascada en las colinas",
        ],
      },
      ar: {
        reason: "صيف كاريبي",
        tips: [
          "ظهيرة ريغي على الشاطئ",
          "سباحة عند شلال في التلال",
        ],
      },
    },
  },
  "hajj-fall": {
    "saudi-arabia": {
      en: {
        reason: "Hajj & fall travel",
        tips: [
          "Focus days in Makkah and Madinah",
          "Quiet evening reflection walks",
        ],
      },
      es: {
        reason: "Hajj y viajes de otoño",
        tips: [
          "Días centrados en Meca y Medina",
          "Paseos tranquilos de reflexión al anochecer",
        ],
      },
      ar: {
        reason: "الحج وسفر الخريف",
        tips: [
          "أيام مركّزة في مكة والمدينة",
          "تمشٍّ هادئ للتأمل مساءً",
        ],
      },
    },
    turkey: {
      en: {
        reason: "Fall layover favorite",
        tips: ["Cappadocia balloon morning", "Tea with a Bosphorus view"],
      },
      es: {
        reason: "Favorita de escala en otoño",
        tips: [
          "Mañana en globo en Capadocia",
          "Té con vista al Bósforo",
        ],
      },
      ar: {
        reason: "محطة مفضلة في الخريف",
        tips: [
          "صباح منطاد في كابادوكيا",
          "شاي مع إطلالة على البوسفور",
        ],
      },
    },
    uae: {
      en: {
        reason: "Fall Gulf travel",
        tips: ["Desert evening under clear skies", "Modern museum afternoon"],
      },
      es: {
        reason: "Viaje otoñal por el Golfo",
        tips: [
          "Noche en el desierto bajo cielos claros",
          "Tarde en un museo moderno",
        ],
      },
      ar: {
        reason: "سفر خريفي في الخليج",
        tips: [
          "مساء صحراوي تحت سماء صافية",
          "ظهيرة في متحف حديث",
        ],
      },
    },
    japan: {
      en: {
        reason: "Fall foliage travel",
        tips: [
          "Temple walk under autumn leaves",
          "Onsen evening after a train day",
        ],
      },
      es: {
        reason: "Viaje de follaje otoñal",
        tips: [
          "Paseo por un templo bajo hojas de otoño",
          "Noche de onsen después de un día en tren",
        ],
      },
      ar: {
        reason: "سفر أوراق الخريف",
        tips: [
          "تمشٍّ عند معبد تحت أوراق الخريف",
          "مساء أونسن بعد يوم قطار",
        ],
      },
    },
    france: {
      en: {
        reason: "Fall city light",
        tips: [
          "Museum morning in Paris",
          "Long café lunch as evenings cool",
        ],
      },
      es: {
        reason: "Luz otoñal en la ciudad",
        tips: [
          "Mañana de museo en París",
          "Almuerzo largo en un café cuando refresca la tarde",
        ],
      },
      ar: {
        reason: "ضوء المدينة في الخريف",
        tips: [
          "صباح متحف في باريس",
          "غداء طويل في مقهى مع برودة المساء",
        ],
      },
    },
    usa: {
      en: {
        reason: "Fall city travel",
        tips: ["Walk a leafy city avenue", "Catch a live game or show"],
      },
      es: {
        reason: "Viaje urbano de otoño",
        tips: [
          "Camina por una avenida con hojas de otoño",
          "Ve un partido o un show en vivo",
        ],
      },
      ar: {
        reason: "سفر مدينة في الخريف",
        tips: [
          "تمشَّ في شارع مورق",
          "احضر مباراة أو عرضًا مباشرًا",
        ],
      },
    },
  },
};

export function localizedSeasonLabel(
  seasonId: PopularSeasonId,
  locale?: string | null,
): string {
  const loc = normalizeLocale(locale);
  return SEASON_LABELS[seasonId][loc];
}

export function localizedFestivityCopy(
  festivityId: string,
  locale?: string | null,
): StoryCopy | null {
  const loc = normalizeLocale(locale);
  return FESTIVITIES[festivityId]?.[loc] ?? null;
}

export function localizedSeasonStoryCopy(
  seasonId: PopularSeasonId,
  countryId: string,
  locale?: string | null,
): StoryCopy | null {
  const loc = normalizeLocale(locale);
  return SEASON_STORIES[seasonId]?.[countryId]?.[loc] ?? null;
}

export function localizedDefaultStoryCopy(
  locale?: string | null,
): StoryCopy {
  return DEFAULTS[normalizeLocale(locale)];
}
