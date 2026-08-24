export type DisplayCurrency = "USD" | "SAR" | "EUR" | "GBP";

export const CURRENCY_OPTIONS: { code: DisplayCurrency; label: string; symbol: string }[] = [
  { code: "USD", label: "USD", symbol: "$" },
  { code: "SAR", label: "SAR", symbol: "SR " },
  { code: "EUR", label: "EUR", symbol: "€" },
  { code: "GBP", label: "GBP", symbol: "£" },
];

/** Display-only rates from USD (preview; Stripe may still charge USD). */
const USD_RATES: Record<DisplayCurrency, number> = {
  USD: 1,
  SAR: 3.75,
  EUR: 0.92,
  GBP: 0.79,
};

export function convertFromUsd(usd: number, currency: DisplayCurrency): number {
  return usd * USD_RATES[currency];
}

export function formatDisplayPrice(usd: number, currency: DisplayCurrency): string {
  const value = convertFromUsd(usd, currency);
  const opt = CURRENCY_OPTIONS.find((c) => c.code === currency)!;
  if (currency === "USD") return `$${value.toFixed(2)}`;
  return `${opt.symbol}${value.toFixed(2)}`;
}

export function splitDisplayPrice(
  usd: number,
  currency: DisplayCurrency,
): { symbol: string; dollars: string; cents: string } {
  const value = convertFromUsd(usd, currency);
  const [whole, frac = "00"] = value.toFixed(2).split(".");
  const opt = CURRENCY_OPTIONS.find((c) => c.code === currency)!;
  return {
    symbol: currency === "USD" ? "$" : opt.symbol,
    dollars: whole,
    cents: frac.padStart(2, "0").slice(0, 2),
  };
}
