"use client";

import { CURRENCY_META, type CurrencyCode } from "@/lib/currency/config";
import { usdToMoneyParts } from "@/lib/currency/format";
import { useCurrency } from "@/lib/currency/use-currency";
import type { FormattedPriceParts } from "@/lib/plans-api";

type PsychologicalPriceProps = {
  /** Catalog / API price parts are always USD today. */
  parts: FormattedPriceParts;
  /** Optional override; defaults to shopper currency from switcher. */
  currency?: string;
  /** When true, treat `parts` as already in `currency` (no FX). */
  skipConvert?: boolean;
  className?: string;
  /** USD major units — preferred when converting (more accurate than parts). */
  amountUsd?: number;
};

export function PsychologicalPrice({
  parts,
  currency,
  skipConvert = false,
  className = "",
  amountUsd,
}: PsychologicalPriceProps) {
  const { currency: shopCurrency, rates } = useCurrency();
  const code = (currency?.toUpperCase() || shopCurrency) as CurrencyCode;

  let display = parts;
  let displayCurrency = code;

  if (!skipConvert) {
    const usd =
      typeof amountUsd === "number"
        ? amountUsd
        : Number(`${parts.dollars}.${parts.cents.padStart(2, "0")}`);
    if (Number.isFinite(usd)) {
      const money = usdToMoneyParts(usd, code, rates);
      display = { dollars: money.dollars, cents: money.cents };
      displayCurrency = money.currency;
    }
  }

  const meta = CURRENCY_META[displayCurrency] ?? CURRENCY_META.USD;
  const symbol = meta.symbol;
  const showCurrencyCode =
    displayCurrency !== "USD" &&
    !symbol.includes(displayCurrency) &&
    symbol.length <= 2;
  const cents = display.cents.padStart(2, "0");

  return (
    <span className={`psychological-price ${className}`.trim()}>
      <span className="psychological-price__symbol">
        {symbol}
        {showCurrencyCode ? " " : ""}
      </span>
      <span className="text-3xl font-bold">{display.dollars}</span>
      {meta.decimals > 0 ? (
        <span className="text-lg font-medium align-top mt-1">{cents}</span>
      ) : null}
    </span>
  );
}
