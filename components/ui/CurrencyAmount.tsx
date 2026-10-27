"use client";

import { formatMoneyLabel } from "@/lib/currency/format";
import { useCurrency } from "@/lib/currency/use-currency";
import { useLocaleState } from "@/lib/i18n/use-locale";

type CurrencyAmountProps = {
  amountUsd: number;
  className?: string;
  /** Prefix like "From" — already localized by caller. */
  prefix?: string;
};

/** Format a USD catalog amount in the shopper's selected currency. */
export function CurrencyAmount({
  amountUsd,
  className = "",
  prefix,
}: CurrencyAmountProps) {
  const [locale] = useLocaleState();
  const { currency, rates } = useCurrency();
  const label = formatMoneyLabel(amountUsd, currency, rates, locale);
  return (
    <span className={className}>
      {prefix ? `${prefix} ${label}` : label}
    </span>
  );
}
