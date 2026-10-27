import {
  CURRENCIES,
  DEFAULT_CURRENCY,
  type CurrencyCode,
  normalizeCurrency,
} from "@/lib/currency/config";

/** USD → currency mid-market style rates (1 USD = rate units). Updated periodically. */
const FALLBACK_RATES_USD: Record<CurrencyCode, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  CAD: 1.36,
  AUD: 1.53,
  MXN: 17.2,
  SAR: 3.75,
  AED: 3.67,
  QAR: 3.64,
  KWD: 0.31,
  BHD: 0.38,
  OMR: 0.39,
  EGP: 50.5,
  TRY: 34.5,
  JPY: 149,
  SGD: 1.34,
  CHF: 0.88,
  NZD: 1.66,
  ZAR: 18.2,
  PLN: 3.95,
  SEK: 10.5,
  NOK: 10.7,
  DKK: 6.85,
  THB: 35.5,
};

export type RateTable = {
  base: "USD";
  rates: Record<CurrencyCode, number>;
  fetchedAt: number;
};

const CACHE_TTL_MS = 12 * 60 * 60 * 1000;
let memoryCache: RateTable | null = null;
let inflight: Promise<RateTable> | null = null;

function tableFromPartial(partial: Record<string, number>): RateTable {
  const rates = { ...FALLBACK_RATES_USD };
  for (const code of CURRENCIES) {
    const v = partial[code];
    if (typeof v === "number" && v > 0) rates[code] = v;
  }
  rates.USD = 1;
  return { base: "USD", rates, fetchedAt: Date.now() };
}

/** Convert a USD major-unit amount into the display currency. */
export function convertFromUsd(
  amountUsd: number,
  currency: CurrencyCode,
  rates: Record<CurrencyCode, number> = FALLBACK_RATES_USD,
): number {
  const code = normalizeCurrency(currency);
  const rate = rates[code] ?? FALLBACK_RATES_USD[code] ?? 1;
  return amountUsd * rate;
}

export function getFallbackRates(): RateTable {
  return {
    base: "USD",
    rates: { ...FALLBACK_RATES_USD },
    fetchedAt: 0,
  };
}

/**
 * Load USD-based FX rates (Frankfurter). Falls back to baked-in table offline.
 * Safe for server and browser; caches in memory for 12h.
 */
export async function loadUsdRates(): Promise<RateTable> {
  if (memoryCache && Date.now() - memoryCache.fetchedAt < CACHE_TTL_MS) {
    return memoryCache;
  }
  if (inflight) return inflight;

  inflight = (async () => {
    try {
      // Broad coverage (incl. SAR/AED/MXN). Falls back to baked-in rates on failure.
      const res = await fetch("https://open.er-api.com/v6/latest/USD", {
        next: { revalidate: 60 * 60 * 6 },
      });
      if (!res.ok) throw new Error(`FX HTTP ${res.status}`);
      const data = (await res.json()) as {
        result?: string;
        rates?: Record<string, number>;
      };
      if (data.result && data.result !== "success") {
        throw new Error("FX provider error");
      }
      const table = tableFromPartial(data.rates ?? {});
      memoryCache = table;
      return table;
    } catch {
      const fallback = getFallbackRates();
      memoryCache = { ...fallback, fetchedAt: Date.now() };
      return memoryCache;
    } finally {
      inflight = null;
    }
  })();

  return inflight;
}

export { FALLBACK_RATES_USD, DEFAULT_CURRENCY };
