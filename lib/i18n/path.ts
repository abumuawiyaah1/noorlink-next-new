import { DEFAULT_LOCALE, type Locale, isLocale } from "@/lib/i18n/config";

/** Strip /es or /ar prefix from a pathname (path only; ignores query/hash). */
export function stripLocaleFromPath(pathname: string): string {
  const pathOnly = pathname.split(/[?#]/)[0] || "/";
  const parts = pathOnly.split("/");
  if (parts[1] && isLocale(parts[1])) {
    const rest = "/" + parts.slice(2).join("/");
    return rest === "/" ? "/" : rest.replace(/\/$/, "") || "/";
  }
  return pathOnly || "/";
}

/** Build a localized href. English has no prefix. Preserves ?query and #hash. */
export function localizedPath(pathname: string, locale: Locale): string {
  const hashMatch = pathname.match(/#.*$/);
  const hash = hashMatch ? hashMatch[0] : "";
  const withoutHash = hash ? pathname.slice(0, -hash.length) : pathname;
  const queryMatch = withoutHash.match(/\?.*$/);
  const query = queryMatch ? queryMatch[0] : "";
  const pathOnly = query
    ? withoutHash.slice(0, -query.length)
    : withoutHash;

  const bare = stripLocaleFromPath(pathOnly || "/");
  let out: string;
  if (locale === DEFAULT_LOCALE) out = bare;
  else if (bare === "/") out = `/${locale}`;
  else out = `/${locale}${bare}`;

  return `${out}${query}${hash}`;
}
