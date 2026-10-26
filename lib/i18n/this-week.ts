import type { Locale } from "@/lib/i18n/config";
import { normalizeLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { ThisWeekPill } from "@/lib/this-week";

type ReasonLocale = Exclude<Locale, "en">;

/**
 * Every unique English `reason` from `lib/this-week.ts` slot() third args
 * plus the three faith-slot reasons → Spanish (LatAm) + Arabic (MSA).
 * Calm travel tone; prefer “travel / trips / visits” over “fly”.
 */
const THIS_WEEK_REASONS: Record<string, Record<ReasonLocale, string>> = {
  "August Europe holidays": {
    es: "Vacaciones de agosto en Europa",
    ar: "عطلات أغسطس في أوروبا",
  },
  "August Italy travel": {
    es: "Viajes a Italia en agosto",
    ar: "سفر إيطاليا في أغسطس",
  },
  "Blossom peak travel": {
    es: "Viajes en el pico de la floración",
    ar: "سفر ذروة الإزهار",
  },
  "Caribbean fall push": {
    es: "Impulso caribeño de otoño",
    ar: "إقبال كاريبي في الخريف",
  },
  "Caribbean leisure peak": {
    es: "Pico de ocio caribeño",
    ar: "ذروة الترفيه الكاريبي",
  },
  "Caribbean summer interest": {
    es: "Interés de verano en el Caribe",
    ar: "اهتمام صيفي بالبحر الكاريبي",
  },
  "Carnival season": {
    es: "Temporada de carnaval",
    ar: "موسم الكرنفال",
  },
  "Cherry blossom season": {
    es: "Temporada de cerezos en flor",
    ar: "موسم أزهار الكرز",
  },
  "Christmas city travel": {
    es: "Viajes de Navidad a la ciudad",
    ar: "سفر المدن في عيد الميلاد",
  },
  "Christmas week travel": {
    es: "Viajes de la semana de Navidad",
    ar: "سفر أسبوع عيد الميلاد",
  },
  "Corridor city breaks": {
    es: "Escapadas urbanas en el corredor",
    ar: "استراحات مدن على الممر",
  },
  "December sun planning": {
    es: "Planes de sol para diciembre",
    ar: "تخطيط شمس ديسمبر",
  },
  "December sun trips": {
    es: "Viajes de sol en diciembre",
    ar: "رحلات شمس ديسمبر",
  },
  "Early Gulf autumn planning": {
    es: "Planes tempranos de otoño en el Golfo",
    ar: "تخطيط مبكر لخريف الخليج",
  },
  "Early holiday planning": {
    es: "Planes tempranos de fiestas",
    ar: "تخطيط مبكر للعطلات",
  },
  "Early spring Europe": {
    es: "Inicio de primavera en Europa",
    ar: "أوائل ربيع أوروبا",
  },
  "Early summer Europe": {
    es: "Inicio del verano europeo",
    ar: "أوائل صيف أوروبا",
  },
  "Early summer Italy": {
    es: "Inicio del verano en Italia",
    ar: "أوائل صيف إيطاليا",
  },
  "Early summer Spain": {
    es: "Inicio del verano en España",
    ar: "أوائل صيف إسبانيا",
  },
  "Early summer Turkey": {
    es: "Inicio del verano en Turquía",
    ar: "أوائل صيف تركيا",
  },
  "Early winter-sun planning": {
    es: "Planes tempranos de sol de invierno",
    ar: "تخطيط مبكر لشمس الشتاء",
  },
  "Easter Europe travel": {
    es: "Viajes de Semana Santa por Europa",
    ar: "سفر أوروبا في عيد الفصح",
  },
  "Eid and post-Ramadan Umrah": {
    es: "Eid y Umrah post-Ramadán",
    ar: "العيد وعمرة ما بعد رمضان",
  },
  "Europe city breaks": {
    es: "Escapadas urbanas por Europa",
    ar: "استراحات مدن أوروبية",
  },
  "Europe shoulder season": {
    es: "Temporada intermedia en Europa",
    ar: "الموسم الانتقالي في أوروبا",
  },
  "Fall Caribbean leisure": {
    es: "Ocio caribeño de otoño",
    ar: "ترفيه كاريبي في الخريف",
  },
  "Fall Gulf trips": {
    es: "Viajes de otoño al Golfo",
    ar: "رحلات خريف الخليج",
  },
  "Fall break sun trips": {
    es: "Viajes de sol en vacaciones de otoño",
    ar: "رحلات شمس في عطلة الخريف",
  },
  "Fall city breaks": {
    es: "Escapadas urbanas de otoño",
    ar: "استراحات مدن خريفية",
  },
  "Fall shoulder season": {
    es: "Temporada intermedia de otoño",
    ar: "الموسم الانتقالي للخريف",
  },
  "Family summer Europe": {
    es: "Verano familiar en Europa",
    ar: "صيف عائلي في أوروبا",
  },
  "Gulf family visits": {
    es: "Visitas familiares al Golfo",
    ar: "زيارات عائلية للخليج",
  },
  "Gulf winter corridor": {
    es: "Corredor de invierno en el Golfo",
    ar: "ممر الشتاء في الخليج",
  },
  "Hajj and Eid al-Adha": {
    es: "Hajj y Eid al-Adha",
    ar: "الحج وعيد الأضحى",
  },
  "Hajj corridor stopovers": {
    es: "Escalas en el corredor del Hajj",
    ar: "توقفات على ممر الحج",
  },
  "Hajj season travel": {
    es: "Temporada de Hajj",
    ar: "موسم الحج",
  },
  "Hajj transit corridor": {
    es: "Corredor de tránsito del Hajj",
    ar: "ممر عبور الحج",
  },
  "Hajj travel prep": {
    es: "Preparación de viaje del Hajj",
    ar: "التحضير لسفر الحج",
  },
  "High-season beach travel": {
    es: "Viajes de playa en temporada alta",
    ar: "سفر الشواطئ في ذروة الموسم",
  },
  "Holiday Gulf visits": {
    es: "Visitas al Golfo en fiestas",
    ar: "زيارات الخليج في العطلات",
  },
  "Holiday beach bookings": {
    es: "Reservas de playa para fiestas",
    ar: "حجوزات شاطئ العطلات",
  },
  "Holiday beach locks": {
    es: "Cierres de playa para fiestas",
    ar: "تأكيد حجوزات شاطئ العطلات",
  },
  "Holiday beach planning": {
    es: "Planes de playa para fiestas",
    ar: "تخطيط شاطئ العطلات",
  },
  "Holiday sun escape": {
    es: "Escapada de sol en fiestas",
    ar: "ملاذ شمس العطلات",
  },
  "Holiday sun mix": {
    es: "Mezcla de sol en fiestas",
    ar: "مزيج شمس العطلات",
  },
  "Istanbul winter city breaks": {
    es: "Escapadas de invierno en Estambul",
    ar: "استراحات شتوية في إسطنبول",
  },
  "Late-July Turkey sun": {
    es: "Sol de fines de julio en Turquía",
    ar: "شمس تركيا أواخر يوليو",
  },
  "Late-fall corridor": {
    es: "Corredor de finales de otoño",
    ar: "ممر أواخر الخريف",
  },
  "Late-fall island trips": {
    es: "Viajes a islas a finales de otoño",
    ar: "رحلات جزر أواخر الخريف",
  },
  "Late-spring Europe": {
    es: "Finales de primavera en Europa",
    ar: "أواخر ربيع أوروبا",
  },
  "Late-summer France": {
    es: "Finales de verano en Francia",
    ar: "أواخر صيف فرنسا",
  },
  "Late-summer Turkey": {
    es: "Finales de verano en Turquía",
    ar: "أواخر صيف تركيا",
  },
  "Late-summer home visits": {
    es: "Visitas a casa a finales de verano",
    ar: "زيارات المنزل أواخر الصيف",
  },
  "Late-winter island hops": {
    es: "Saltos entre islas a finales de invierno",
    ar: "تنقلات جزر أواخر الشتاء",
  },
  "Leisure sun planning": {
    es: "Planes de sol y ocio",
    ar: "تخطيط شمس وترفيه",
  },
  "Mild Gulf autumn": {
    es: "Otoño suave en el Golfo",
    ar: "خريف معتدل في الخليج",
  },
  "Mild Gulf season": {
    es: "Temporada suave en el Golfo",
    ar: "موسم معتدل في الخليج",
  },
  "Mild Gulf winter travel": {
    es: "Viajes de invierno suave en el Golfo",
    ar: "سفر شتاء معتدل في الخليج",
  },
  "NYE week (city celebrations)": {
    es: "Semana de Año Nuevo (celebraciones urbanas)",
    ar: "أسبوع رأس السنة (احتفالات المدن)",
  },
  "New Year city travel": {
    es: "Viajes de Año Nuevo a la ciudad",
    ar: "سفر المدن في رأس السنة",
  },
  "New Year sun escapes": {
    es: "Escapadas de sol de Año Nuevo",
    ar: "ملاذات شمس رأس السنة",
  },
  "Peak summer Italy": {
    es: "Pico de verano en Italia",
    ar: "ذروة صيف إيطاليا",
  },
  "Peak summer Spain": {
    es: "Pico de verano en España",
    ar: "ذروة صيف إسبانيا",
  },
  "Pilgrim route stopovers": {
    es: "Escalas en la ruta de peregrinación",
    ar: "توقفات على طريق الحج",
  },
  "Pilgrimage route stopovers": {
    es: "Escalas en la ruta de peregrinación",
    ar: "توقفات على طريق الحج والعمرة",
  },
  "Pre-July holiday rush": {
    es: "Carrera previa a las vacaciones de julio",
    ar: "اندفاع ما قبل عطلات يوليو",
  },
  "Pre-holiday sun trips": {
    es: "Viajes de sol antes de las fiestas",
    ar: "رحلات شمس قبل العطلات",
  },
  "Ramadan Gulf visits": {
    es: "Visitas al Golfo en Ramadán",
    ar: "زيارات الخليج في رمضان",
  },
  "Ramadan corridor travel": {
    es: "Viajes por el corredor de Ramadán",
    ar: "سفر ممر رمضان",
  },
  "Ramadan travel & planning": {
    es: "Viajes y planes de Ramadán",
    ar: "سفر وتخطيط رمضان",
  },
  "Ramadan travel corridor": {
    es: "Corredor de viajes de Ramadán",
    ar: "ممر سفر رمضان",
  },
  "Spring Europe city breaks": {
    es: "Escapadas urbanas de primavera en Europa",
    ar: "استراحات مدن ربيعية في أوروبا",
  },
  "Spring Europe leisure": {
    es: "Ocio de primavera en Europa",
    ar: "ترفيه ربيعي في أوروبا",
  },
  "Spring Europe openings": {
    es: "Apertura de primavera en Europa",
    ar: "انطلاقة ربيع أوروبا",
  },
  "Spring Italy trips": {
    es: "Viajes de primavera a Italia",
    ar: "رحلات ربيع إيطاليا",
  },
  "Spring city breaks": {
    es: "Escapadas urbanas de primavera",
    ar: "استراحات مدن ربيعية",
  },
  "Spring corridor travel": {
    es: "Viajes por el corredor de primavera",
    ar: "سفر الممر الربيعي",
  },
  "Spring visiting family": {
    es: "Visitas familiares de primavera",
    ar: "زيارات عائلية في الربيع",
  },
  "Steady travel corridor": {
    es: "Corredor de viaje estable",
    ar: "ممر سفر ثابت",
  },
  "Summer Europe opens": {
    es: "Apertura del verano europeo",
    ar: "انطلاقة صيف أوروبا",
  },
  "Summer France bookings": {
    es: "Reservas de verano en Francia",
    ar: "حجوزات صيف فرنسا",
  },
  "Summer Italy peak building": {
    es: "Pico de verano en Italia en aumento",
    ar: "تصاعد ذروة صيف إيطاليا",
  },
  "Summer Turkey resorts": {
    es: "Resorts de verano en Turquía",
    ar: "منتجعات صيف تركيا",
  },
  "Summer UK corridor": {
    es: "Corredor de verano hacia el Reino Unido",
    ar: "ممر صيف المملكة المتحدة",
  },
  "Summer UK visits": {
    es: "Visitas de verano al Reino Unido",
    ar: "زيارات صيفية للمملكة المتحدة",
  },
  "Summer beach & city": {
    es: "Playa y ciudad en verano",
    ar: "شاطئ ومدينة في الصيف",
  },
  "Summer fade corridor": {
    es: "Corredor al cierre del verano",
    ar: "ممر انحسار الصيف",
  },
  "Sun corridor planning": {
    es: "Planes del corredor de sol",
    ar: "تخطيط ممر الشمس",
  },
  "Sun escape bookings": {
    es: "Reservas de escapadas de sol",
    ar: "حجوزات ملاذ الشمس",
  },
  "Sun escape planning": {
    es: "Planes de escapada de sol",
    ar: "تخطيط ملاذ الشمس",
  },
  "Thanksgiving week travel": {
    es: "Viajes de la semana de Thanksgiving",
    ar: "سفر أسبوع عيد الشكر",
  },
  "Winter-sun beach trips": {
    es: "Viajes de playa con sol de invierno",
    ar: "رحلات شاطئ شمس الشتاء",
  },
  "Winter-sun beach weeks": {
    es: "Semanas de playa con sol de invierno",
    ar: "أسابيع شاطئ شمس الشتاء",
  },
  "Winter-sun bookings": {
    es: "Reservas de sol de invierno",
    ar: "حجوزات شمس الشتاء",
  },
  "Winter-sun corridor": {
    es: "Corredor de sol de invierno",
    ar: "ممر شمس الشتاء",
  },
  "Winter-sun island planning": {
    es: "Planes de isla con sol de invierno",
    ar: "تخطيط جزر شمس الشتاء",
  },
  "Winter-sun planning starts": {
    es: "Empiezan los planes de sol de invierno",
    ar: "بداية تخطيط شمس الشتاء",
  },
  "Winter-sun rise": {
    es: "Auge del sol de invierno",
    ar: "تصاعد شمس الشتاء",
  },
  "Year-round pilgrimage travel": {
    es: "Peregrinación todo el año",
    ar: "سفر الحج والعمرة على مدار السنة",
  },
};

const FAITH_LABEL_KEYS = {
  Umrah: "faithUmrah",
  Ramadan: "faithRamadan",
  Hajj: "faithHajj",
} as const;

function localizeLabel(label: string, locale: Locale): string {
  const dict = getDictionary(locale);
  const faithKey = FAITH_LABEL_KEYS[label as keyof typeof FAITH_LABEL_KEYS];
  if (faithKey) return dict.thisWeek[faithKey];

  const countries = dict.thisWeek.countries as Record<string, string>;
  return countries[label] ?? label;
}

function localizeReason(reason: string, locale: ReasonLocale): string {
  return THIS_WEEK_REASONS[reason]?.[locale] ?? reason;
}

/**
 * Localize a homepage “This week” pill for `es` / `ar`.
 * English returns unchanged. `query` / `href` / `flag` stay English so search
 * and routing keep working.
 */
export function localizeThisWeekPill(
  pill: ThisWeekPill,
  locale: string,
): ThisWeekPill {
  const loc = normalizeLocale(locale);
  if (loc === "en") return pill;

  return {
    ...pill,
    label: localizeLabel(pill.label, loc),
    reason: localizeReason(pill.reason, loc),
  };
}

export function localizeThisWeekPills(
  pills: ThisWeekPill[],
  locale: string,
): ThisWeekPill[] {
  return pills.map((pill) => localizeThisWeekPill(pill, locale));
}
