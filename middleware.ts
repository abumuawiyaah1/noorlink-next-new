import {
  CURRENCY_COOKIE,
  CURRENCY_HEADER,
  DEFAULT_CURRENCY,
  type CurrencyCode,
  currencyFromCountry,
  normalizeCurrency,
} from "@/lib/currency/config";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  LOCALE_HEADER,
  LOCALES,
  type Locale,
  isLocale,
  isLocaleBot,
  localeFromAcceptLanguage,
  normalizeLocale,
} from "@/lib/i18n/config";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function stripLocalePrefix(pathname: string): {
  locale: Locale | null;
  path: string;
} {
  const parts = pathname.split("/");
  const maybe = parts[1];
  if (isLocale(maybe)) {
    const rest = "/" + parts.slice(2).join("/");
    return {
      locale: maybe,
      path: rest === "/" ? "/" : rest.replace(/\/$/, "") || "/",
    };
  }
  return { locale: null, path: pathname };
}

function requestCountry(request: NextRequest): string | null {
  return (
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    request.headers.get("x-country-code") ||
    null
  );
}

function resolveCurrency(request: NextRequest): {
  currency: CurrencyCode;
  setCookie: boolean;
} {
  const cookieRaw = request.cookies.get(CURRENCY_COOKIE)?.value;
  if (cookieRaw) {
    return { currency: normalizeCurrency(cookieRaw), setCookie: false };
  }
  const fromGeo = currencyFromCountry(requestCountry(request));
  if (fromGeo) return { currency: fromGeo, setCookie: true };
  return { currency: DEFAULT_CURRENCY, setCookie: true };
}

function withRequestHeaders(
  request: NextRequest,
  locale: Locale,
  currency: CurrencyCode,
) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(LOCALE_HEADER, locale);
  requestHeaders.set(CURRENCY_HEADER, currency);
  return requestHeaders;
}

function setLocaleCookie(response: NextResponse, locale: Locale) {
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: COOKIE_MAX_AGE,
    sameSite: "lax",
  });
}

function setCurrencyCookie(response: NextResponse, currency: CurrencyCode) {
  response.cookies.set(CURRENCY_COOKIE, currency, {
    path: "/",
    maxAge: COOKIE_MAX_AGE,
    sameSite: "lax",
  });
}

function applyCurrencyCookie(
  response: NextResponse,
  currency: CurrencyCode,
  setCookie: boolean,
) {
  if (setCookie) setCurrencyCookie(response, currency);
  return response;
}

function localizedRedirect(
  request: NextRequest,
  locale: Locale,
  barePath: string,
  currency: CurrencyCode,
  setCurrency: boolean,
) {
  const url = request.nextUrl.clone();
  url.pathname =
    locale === DEFAULT_LOCALE
      ? barePath
      : barePath === "/"
        ? `/${locale}`
        : `/${locale}${barePath}`;
  const response = NextResponse.redirect(url);
  setLocaleCookie(response, locale);
  applyCurrencyCookie(response, currency, setCurrency);
  return response;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/fonts") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const { currency, setCookie: setCurrency } = resolveCurrency(request);
  const { locale, path } = stripLocalePrefix(pathname);

  // /en/... → bare path (English is default, no prefix)
  if (locale === DEFAULT_LOCALE) {
    return localizedRedirect(
      request,
      DEFAULT_LOCALE,
      path,
      currency,
      setCurrency,
    );
  }

  // /es/... or /ar/... → rewrite to unprefixed + set cookie + SSR header
  if (locale && (LOCALES as readonly string[]).includes(locale)) {
    const url = request.nextUrl.clone();
    url.pathname = path;
    const response = NextResponse.rewrite(url, {
      request: {
        headers: withRequestHeaders(request, locale, currency),
      },
    });
    setLocaleCookie(response, locale);
    applyCurrencyCookie(response, currency, setCurrency);
    return response;
  }

  // Unprefixed routes
  const cookieRaw = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieRaw) {
    const cookieLocale = normalizeLocale(cookieRaw);
    const response = NextResponse.next({
      request: {
        headers: withRequestHeaders(request, cookieLocale, currency),
      },
    });
    applyCurrencyCookie(response, currency, setCurrency);
    return response;
  }

  // First visit: browser Accept-Language (not IP/country)
  const ua = request.headers.get("user-agent");
  const detected = isLocaleBot(ua)
    ? null
    : localeFromAcceptLanguage(request.headers.get("accept-language"));

  if (detected && detected !== DEFAULT_LOCALE) {
    return localizedRedirect(request, detected, path, currency, setCurrency);
  }

  const response = NextResponse.next({
    request: {
      headers: withRequestHeaders(request, DEFAULT_LOCALE, currency),
    },
  });
  setLocaleCookie(response, DEFAULT_LOCALE);
  applyCurrencyCookie(response, currency, setCurrency);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
