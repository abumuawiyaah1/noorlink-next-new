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

function withLocaleHeader(request: NextRequest, locale: Locale) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(LOCALE_HEADER, locale);
  return requestHeaders;
}

function setLocaleCookie(response: NextResponse, locale: Locale) {
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: COOKIE_MAX_AGE,
    sameSite: "lax",
  });
}

function localizedRedirect(request: NextRequest, locale: Locale, barePath: string) {
  const url = request.nextUrl.clone();
  url.pathname = locale === DEFAULT_LOCALE
    ? barePath
    : barePath === "/"
      ? `/${locale}`
      : `/${locale}${barePath}`;
  const response = NextResponse.redirect(url);
  setLocaleCookie(response, locale);
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

  const { locale, path } = stripLocalePrefix(pathname);

  // /en/... → bare path (English is default, no prefix)
  if (locale === DEFAULT_LOCALE) {
    return localizedRedirect(request, DEFAULT_LOCALE, path);
  }

  // /es/... or /ar/... → rewrite to unprefixed + set cookie + SSR header
  if (locale && (LOCALES as readonly string[]).includes(locale)) {
    const url = request.nextUrl.clone();
    url.pathname = path;
    const response = NextResponse.rewrite(url, {
      request: { headers: withLocaleHeader(request, locale) },
    });
    setLocaleCookie(response, locale);
    return response;
  }

  // Unprefixed routes
  const cookieRaw = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieRaw) {
    // User choice / prior visit always wins over browser language
    const cookieLocale = normalizeLocale(cookieRaw);
    return NextResponse.next({
      request: { headers: withLocaleHeader(request, cookieLocale) },
    });
  }

  // First visit: browser Accept-Language (not IP/country)
  const ua = request.headers.get("user-agent");
  const detected = isLocaleBot(ua)
    ? null
    : localeFromAcceptLanguage(request.headers.get("accept-language"));

  if (detected && detected !== DEFAULT_LOCALE) {
    return localizedRedirect(request, detected, path);
  }

  const response = NextResponse.next({
    request: { headers: withLocaleHeader(request, DEFAULT_LOCALE) },
  });
  setLocaleCookie(response, DEFAULT_LOCALE);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
