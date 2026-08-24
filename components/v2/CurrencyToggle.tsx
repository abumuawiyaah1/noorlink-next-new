"use client";

import { CURRENCY_OPTIONS, type DisplayCurrency } from "@/lib/v2/currency";
import { useCurrency } from "@/components/v2/context/CurrencyContext";

export function CurrencyToggle({ className = "" }: { className?: string }) {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className={`v2-currency-toggle ${className}`.trim()} role="group" aria-label="Display currency">
      {CURRENCY_OPTIONS.map((opt) => (
        <button
          key={opt.code}
          type="button"
          className={`v2-currency-toggle__btn${currency === opt.code ? " is-active" : ""}`}
          aria-pressed={currency === opt.code}
          onClick={() => setCurrency(opt.code as DisplayCurrency)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
