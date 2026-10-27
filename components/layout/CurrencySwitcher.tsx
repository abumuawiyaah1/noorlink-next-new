"use client";

import {
  CURRENCIES,
  CURRENCY_META,
  type CurrencyCode,
  normalizeCurrency,
} from "@/lib/currency/config";
import { useCurrency } from "@/lib/currency/use-currency";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { useLocaleState } from "@/lib/i18n/use-locale";

type CurrencySwitcherProps = {
  className?: string;
};

export function CurrencySwitcher({ className = "" }: CurrencySwitcherProps) {
  const [locale] = useLocaleState();
  const dict = getDictionary(locale);
  const { currency, setCurrency } = useCurrency();

  return (
    <label className={`currency-switcher ${className}`.trim()}>
      <span className="currency-switcher__label sr-only">
        {dict.currency?.label ?? "Currency"}
      </span>
      <select
        className="currency-switcher__select"
        value={currency}
        aria-label={dict.currency?.label ?? "Currency"}
        onChange={(event) =>
          setCurrency(normalizeCurrency(event.target.value) as CurrencyCode)
        }
      >
        {CURRENCIES.map((code) => (
          <option key={code} value={code}>
            {code} · {CURRENCY_META[code].symbol}
          </option>
        ))}
      </select>
    </label>
  );
}
