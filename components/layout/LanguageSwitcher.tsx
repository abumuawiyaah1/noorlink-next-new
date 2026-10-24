"use client";

import {
  LOCALE_META,
  LOCALES,
  type Locale,
  normalizeLocale,
} from "@/lib/i18n/config";
import { localizedPath, stripLocaleFromPath } from "@/lib/i18n/path";
import { useLocaleState } from "@/lib/i18n/use-locale";
import { usePathname, useRouter } from "next/navigation";

type LanguageSwitcherProps = {
  className?: string;
  onLocaleChange?: (locale: Locale) => void;
};

export function LanguageSwitcher({
  className = "",
  onLocaleChange,
}: LanguageSwitcherProps) {
  const [locale, setLocale] = useLocaleState();
  const pathname = usePathname() || "/";
  const router = useRouter();

  function selectLocale(next: Locale) {
    setLocale(next);
    onLocaleChange?.(next);
    const bare = stripLocaleFromPath(pathname);
    const target = localizedPath(bare, next);
    if (target !== pathname) {
      router.push(target);
    }
  }

  return (
    <label className={`language-switcher ${className}`.trim()}>
      <span className="language-switcher__label sr-only">
        {LOCALE_META[locale].label}
      </span>
      <select
        className="language-switcher__select"
        value={locale}
        aria-label={LOCALE_META[locale].nativeLabel}
        onChange={(event) => selectLocale(normalizeLocale(event.target.value))}
      >
        {LOCALES.map((code) => (
          <option key={code} value={code}>
            {LOCALE_META[code].nativeLabel}
          </option>
        ))}
      </select>
    </label>
  );
}

export { useLocaleState };
