import { headers } from "next/headers";
import { LOCALE_HEADER, normalizeLocale, type Locale } from "@/lib/i18n/config";

/** Locale for SSR from middleware `x-nl-locale` header. */
export async function getRequestLocale(): Promise<Locale> {
  const headerStore = await headers();
  return normalizeLocale(headerStore.get(LOCALE_HEADER));
}
