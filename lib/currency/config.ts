/** Retail currencies NoorLink displays and (when backend supports) charges. */

export const CURRENCIES = [
  "USD",
  "EUR",
  "GBP",
  "CAD",
  "AUD",
  "MXN",
  "SAR",
  "AED",
  "QAR",
  "KWD",
  "BHD",
  "OMR",
  "EGP",
  "TRY",
  "JPY",
  "SGD",
  "CHF",
  "NZD",
  "ZAR",
  "PLN",
  "SEK",
  "NOK",
  "DKK",
  "THB",
] as const;

export type CurrencyCode = (typeof CURRENCIES)[number];

export const DEFAULT_CURRENCY: CurrencyCode = "USD";

/** Cookie set by middleware / currency switcher. */
export const CURRENCY_COOKIE = "nl_currency";

/** Request header middleware sets so SSR can match currency. */
export const CURRENCY_HEADER = "x-nl-currency";

export const CURRENCY_META: Record<
  CurrencyCode,
  { label: string; symbol: string; decimals: number }
> = {
  USD: { label: "US Dollar", symbol: "$", decimals: 2 },
  EUR: { label: "Euro", symbol: "€", decimals: 2 },
  GBP: { label: "British Pound", symbol: "£", decimals: 2 },
  CAD: { label: "Canadian Dollar", symbol: "CA$", decimals: 2 },
  AUD: { label: "Australian Dollar", symbol: "A$", decimals: 2 },
  MXN: { label: "Mexican Peso", symbol: "MX$", decimals: 2 },
  SAR: { label: "Saudi Riyal", symbol: "SAR", decimals: 2 },
  AED: { label: "UAE Dirham", symbol: "AED", decimals: 2 },
  QAR: { label: "Qatari Riyal", symbol: "QAR", decimals: 2 },
  KWD: { label: "Kuwaiti Dinar", symbol: "KD", decimals: 3 },
  BHD: { label: "Bahraini Dinar", symbol: "BD", decimals: 3 },
  OMR: { label: "Omani Rial", symbol: "OMR", decimals: 3 },
  EGP: { label: "Egyptian Pound", symbol: "E£", decimals: 2 },
  TRY: { label: "Turkish Lira", symbol: "₺", decimals: 2 },
  JPY: { label: "Japanese Yen", symbol: "¥", decimals: 0 },
  SGD: { label: "Singapore Dollar", symbol: "S$", decimals: 2 },
  CHF: { label: "Swiss Franc", symbol: "CHF", decimals: 2 },
  NZD: { label: "New Zealand Dollar", symbol: "NZ$", decimals: 2 },
  ZAR: { label: "South African Rand", symbol: "R", decimals: 2 },
  PLN: { label: "Polish Zloty", symbol: "zł", decimals: 2 },
  SEK: { label: "Swedish Krona", symbol: "kr", decimals: 2 },
  NOK: { label: "Norwegian Krone", symbol: "kr", decimals: 2 },
  DKK: { label: "Danish Krone", symbol: "kr", decimals: 2 },
  THB: { label: "Thai Baht", symbol: "฿", decimals: 2 },
};

/** ISO country → default retail currency (geo detect). */
export const COUNTRY_CURRENCY: Record<string, CurrencyCode> = {
  US: "USD",
  GB: "GBP",
  UK: "GBP",
  CA: "CAD",
  AU: "AUD",
  NZ: "NZD",
  MX: "MXN",
  SA: "SAR",
  AE: "AED",
  QA: "QAR",
  KW: "KWD",
  BH: "BHD",
  OM: "OMR",
  EG: "EGP",
  TR: "TRY",
  JP: "JPY",
  SG: "SGD",
  CH: "CHF",
  ZA: "ZAR",
  PL: "PLN",
  SE: "SEK",
  NO: "NOK",
  DK: "DKK",
  TH: "THB",
  // Eurozone + common EU
  DE: "EUR",
  FR: "EUR",
  ES: "EUR",
  IT: "EUR",
  NL: "EUR",
  BE: "EUR",
  AT: "EUR",
  IE: "EUR",
  PT: "EUR",
  FI: "EUR",
  GR: "EUR",
  LU: "EUR",
  SK: "EUR",
  SI: "EUR",
  EE: "EUR",
  LV: "EUR",
  LT: "EUR",
  MT: "EUR",
  CY: "EUR",
  HR: "EUR",
  // LatAm often USD-friendly; Mexico is MXN above. Panama uses USD.
  PA: "USD",
  EC: "USD",
  SV: "USD",
};

export function isCurrency(value: string | null | undefined): value is CurrencyCode {
  return !!value && (CURRENCIES as readonly string[]).includes(value.toUpperCase());
}

export function normalizeCurrency(
  value: string | null | undefined,
): CurrencyCode {
  if (!value) return DEFAULT_CURRENCY;
  const code = value.trim().toUpperCase();
  return isCurrency(code) ? code : DEFAULT_CURRENCY;
}

export function currencyFromCountry(
  countryCode: string | null | undefined,
): CurrencyCode | null {
  if (!countryCode) return null;
  const mapped = COUNTRY_CURRENCY[countryCode.trim().toUpperCase()];
  return mapped ?? null;
}
