"use client";

import {
  CURRENCY_COOKIE,
  CURRENCIES,
  DEFAULT_CURRENCY,
  type CurrencyCode,
  normalizeCurrency,
} from "@/lib/currency/config";
import {
  FALLBACK_RATES_USD,
  loadUsdRates,
  type RateTable,
} from "@/lib/currency/rates";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const CURRENCY_EVENT = "nl:currency";

type CurrencyContextValue = {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  rates: Record<CurrencyCode, number>;
  ratesReady: boolean;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function readCurrencyCookie(): CurrencyCode {
  if (typeof document === "undefined") return DEFAULT_CURRENCY;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${CURRENCY_COOKIE}=`));
  return normalizeCurrency(match?.split("=")[1]);
}

export function writeCurrencyCookie(currency: CurrencyCode) {
  document.cookie = `${CURRENCY_COOKIE}=${currency};path=/;max-age=31536000;samesite=lax`;
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent<CurrencyCode>(CURRENCY_EVENT, { detail: currency }),
    );
  }
}

export function CurrencyProvider({
  initialCurrency,
  children,
}: {
  initialCurrency?: CurrencyCode;
  children: ReactNode;
}) {
  const [currency, setCurrencyState] = useState<CurrencyCode>(
    initialCurrency ?? DEFAULT_CURRENCY,
  );
  const [rates, setRates] = useState<Record<CurrencyCode, number>>(
    FALLBACK_RATES_USD,
  );
  const [ratesReady, setRatesReady] = useState(false);

  useEffect(() => {
    if (initialCurrency) setCurrencyState(normalizeCurrency(initialCurrency));
    else setCurrencyState(readCurrencyCookie());
  }, [initialCurrency]);

  useEffect(() => {
    let cancelled = false;
    void loadUsdRates().then((table: RateTable) => {
      if (cancelled) return;
      setRates(table.rates);
      setRatesReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    function onCurrency(event: Event) {
      setCurrencyState(
        normalizeCurrency((event as CustomEvent<CurrencyCode>).detail),
      );
    }
    window.addEventListener(CURRENCY_EVENT, onCurrency);
    return () => window.removeEventListener(CURRENCY_EVENT, onCurrency);
  }, []);

  const setCurrency = useCallback((next: CurrencyCode) => {
    const code = normalizeCurrency(next);
    writeCurrencyCookie(code);
    setCurrencyState(code);
  }, []);

  const value = useMemo(
    () => ({ currency, setCurrency, rates, ratesReady }),
    [currency, setCurrency, rates, ratesReady],
  );

  return (
    <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
  );
}

export function useCurrency(): CurrencyContextValue {
  const ctx = useContext(CurrencyContext);
  const [fallbackCurrency, setFallbackCurrency] =
    useState<CurrencyCode>(DEFAULT_CURRENCY);
  const [rates, setRates] = useState(FALLBACK_RATES_USD);
  const [ratesReady, setRatesReady] = useState(false);

  useEffect(() => {
    if (ctx) return;
    setFallbackCurrency(readCurrencyCookie());
    void loadUsdRates().then((table) => {
      setRates(table.rates);
      setRatesReady(true);
    });
    function onCurrency(event: Event) {
      setFallbackCurrency(
        normalizeCurrency((event as CustomEvent<CurrencyCode>).detail),
      );
    }
    window.addEventListener(CURRENCY_EVENT, onCurrency);
    return () => window.removeEventListener(CURRENCY_EVENT, onCurrency);
  }, [ctx]);

  if (ctx) return ctx;

  return {
    currency: fallbackCurrency,
    setCurrency: (next) => {
      const code = normalizeCurrency(next);
      writeCurrencyCookie(code);
      setFallbackCurrency(code);
    },
    rates,
    ratesReady,
  };
}

export { CURRENCIES };
