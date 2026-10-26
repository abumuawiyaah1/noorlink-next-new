/**
 * Localized Trustpilot quote cards (country + preview). Reviewer names, flags,
 * stars and initials are kept as published on Trustpilot — only the displayed
 * country label and the quote body are translated for /es and /ar.
 *
 * English source of truth: `lib/trustpilot-quotes.ts`.
 */

import type { Locale } from "@/lib/i18n/config";
import { normalizeLocale } from "@/lib/i18n/config";
import {
  TRUSTPILOT_QUOTES,
  type TrustpilotQuote,
} from "@/lib/trustpilot-quotes";

type QuoteCopy = { country: string; preview: string };

/** Key: `${name}|${initial}` (reviewer names stay as-is, so this is stable). */
export function trustpilotQuoteKey(
  quote: Pick<TrustpilotQuote, "name" | "initial">,
): string {
  return `${quote.name}|${quote.initial}`;
}

const QUOTE_COPY: Record<Exclude<Locale, "en">, Record<string, QuoteCopy>> = {
  es: {
    "Petra|P": {
      country: "Kenia",
      preview:
        "Tuve una experiencia increíble con NoorLink. Mi comunicación con mis seres queridos en casa no se interrumpió durante mi viaje a Dubái.",
    },
    "Kabiru|K": {
      country: "Nigeria",
      preview:
        "La instalación funcionó como debía en Arabia Saudita. Me encanta la función de hotspot: fue muy útil porque viajé en grupo.",
    },
    "Omar|O": {
      country: "Arabia Saudita",
      preview:
        "Gran concepto, y además incluye guías gratuitas de du‘ā’ y de lugares con significado, que me gustan mucho.",
    },
    "Hoxe|H": {
      country: "Estados Unidos",
      preview:
        "Sinceramente, es uno de los mejores proveedores de eSIM que he usado.",
    },
    "Adegoke|A": {
      country: "Reino Unido",
      preview:
        "Todo el proceso fue rápido, sencillo y sin ninguna complicación. Configurar la eSIM fue muy fácil y estuve conectado en minutos.",
    },
    "Raji|R": {
      country: "Nigeria",
      preview: "Excelente servicio, fácil de usar y lo recomiendo mucho.",
    },
  },
  ar: {
    "Petra|P": {
      country: "كينيا",
      preview:
        "كانت تجربتي رائعة جدًا مع NoorLink. لم ينقطع تواصلي مع أحبّائي في بلدي طوال رحلتي إلى دبي.",
    },
    "Kabiru|K": {
      country: "نيجيريا",
      preview:
        "عملت عملية التثبيت كما ينبغي في السعودية. أحببت ميزة نقطة الاتصال — كانت مفيدة جدًا لأنني سافرت ضمن مجموعة.",
    },
    "Omar|O": {
      country: "السعودية",
      preview:
        "فكرة رائعة — وتتضمن أيضًا أدلة مجانية للأدعية والأماكن ذات المعنى، وهذا ما أحببته كثيرًا.",
    },
    "Hoxe|H": {
      country: "الولايات المتحدة",
      preview: "بصراحة، هذا من أفضل مزوّدي eSIM الذين استخدمتهم.",
    },
    "Adegoke|A": {
      country: "المملكة المتحدة",
      preview:
        "كانت العملية كلها سريعة وبسيطة وخالية تمامًا من المتاعب. كان إعداد eSIM سهلًا جدًا، وصرت متصلًا خلال دقائق.",
    },
    "Raji|R": {
      country: "نيجيريا",
      preview: "خدمة رائعة، وسهلة الاستخدام، وأوصي بها بشدة.",
    },
  },
};

/** Overall Trustpilot score label (“Excellent”) per locale. */
const TRUST_LABEL: Record<Locale, string> = {
  en: "Excellent",
  es: "Excelente",
  ar: "ممتاز",
};

export function trustpilotTrustLabel(locale?: string | null): string {
  return TRUST_LABEL[normalizeLocale(locale)];
}

/** Quotes with localized `country` + `preview`; English returns the source list. */
export function localizeTrustpilotQuotes(
  locale?: string | null,
): TrustpilotQuote[] {
  const resolved = normalizeLocale(locale);
  if (resolved === "en") return [...TRUSTPILOT_QUOTES];

  const copy = QUOTE_COPY[resolved];
  return TRUSTPILOT_QUOTES.map((quote) => {
    const loc = copy[trustpilotQuoteKey(quote)];
    return loc ? { ...quote, ...loc } : { ...quote };
  });
}
