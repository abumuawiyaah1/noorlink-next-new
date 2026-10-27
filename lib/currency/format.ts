import {
  CURRENCY_META,
  type CurrencyCode,
  normalizeCurrency,
} from "@/lib/currency/config";
import { convertFromUsd } from "@/lib/currency/rates";
import type { FormattedPriceParts } from "@/lib/plans-api";

export type MoneyParts = FormattedPriceParts & {
  currency: CurrencyCode;
  amount: number;
};

/** Round for retail display (banker's not needed — simple half-up). */
export function roundMoney(amount: number, currency: CurrencyCode): number {
  const decimals = CURRENCY_META[normalizeCurrency(currency)].decimals;
  const factor = 10 ** decimals;
  return Math.round(amount * factor) / factor;
}

export function usdToMoneyParts(
  amountUsd: number,
  currency: CurrencyCode,
  rates: Record<CurrencyCode, number>,
): MoneyParts {
  const code = normalizeCurrency(currency);
  const converted = roundMoney(convertFromUsd(amountUsd, code, rates), code);
  const decimals = CURRENCY_META[code].decimals;
  if (decimals === 0) {
    const whole = Math.round(converted);
    return {
      currency: code,
      amount: whole,
      dollars: String(whole),
      cents: "00",
    };
  }
  const fixed = converted.toFixed(decimals);
  const [dollars, cents = ""] = fixed.split(".");
  return {
    currency: code,
    amount: Number(fixed),
    dollars: dollars || "0",
    cents: cents.padEnd(Math.min(2, decimals), "0").slice(0, 2),
  };
}

/** Compact label for cards: $21.77 · SAR 81.64 · ¥3,200 */
export function formatMoneyLabel(
  amountUsd: number,
  currency: CurrencyCode,
  rates: Record<CurrencyCode, number>,
  locale = "en",
): string {
  const code = normalizeCurrency(currency);
  const amount = roundMoney(convertFromUsd(amountUsd, code, rates), code);
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: code,
      currencyDisplay: "narrowSymbol",
      maximumFractionDigits: CURRENCY_META[code].decimals,
      minimumFractionDigits: CURRENCY_META[code].decimals === 0 ? 0 : 2,
    }).format(amount);
  } catch {
    const meta = CURRENCY_META[code];
    return `${meta.symbol}${amount.toFixed(meta.decimals)}`;
  }
}

export function formatFromPriceLabel(
  amountUsd: number,
  currency: CurrencyCode,
  rates: Record<CurrencyCode, number>,
  fromPrefix: string,
  locale = "en",
): string {
  return `${fromPrefix} ${formatMoneyLabel(amountUsd, currency, rates, locale)}`.replace(
    /\s+/g,
    " ",
  );
}
