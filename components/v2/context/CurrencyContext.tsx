"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  formatDisplayPrice,
  splitDisplayPrice,
  type DisplayCurrency,
} from "@/lib/v2/currency";

type CurrencyContextValue = {
  currency: DisplayCurrency;
  setCurrency: (c: DisplayCurrency) => void;
  formatPrice: (usd: number) => string;
  splitPrice: (usd: number) => ReturnType<typeof splitDisplayPrice>;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<DisplayCurrency>("USD");

  const formatPrice = useCallback(
    (usd: number) => formatDisplayPrice(usd, currency),
    [currency],
  );

  const splitPrice = useCallback(
    (usd: number) => splitDisplayPrice(usd, currency),
    [currency],
  );

  const value = useMemo(
    () => ({ currency, setCurrency, formatPrice, splitPrice }),
    [currency, formatPrice, splitPrice],
  );

  return (
    <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error("useCurrency must be used within CurrencyProvider");
  }
  return ctx;
}
