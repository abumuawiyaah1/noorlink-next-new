"use client";

import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import {
  getDictionary,
  navItemsFromDictionary,
} from "@/lib/i18n/dictionaries";
import { localizedPath, stripLocaleFromPath } from "@/lib/i18n/path";
import { useLocaleState } from "@/lib/i18n/use-locale";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

export type NavItem = { href: string; label: string; highlight?: boolean };

type SiteHeaderProps = {
  nav?: NavItem[];
  logoClassName?: string;
  variant?: "light" | "dark";
};

function navItemIsActive(pathname: string, href: string): boolean {
  const barePath = stripLocaleFromPath(pathname);
  const path = stripLocaleFromPath(href.split("#")[0] || "/");
  if (path === "/") return barePath === "/";
  return barePath === path || barePath.startsWith(`${path}/`);
}

export function SiteHeader({
  nav,
  logoClassName = "logo-text",
  variant = "light",
}: SiteHeaderProps) {
  const pathname = usePathname() || "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [locale, setLocale] = useLocaleState();

  const dict = useMemo(() => getDictionary(locale), [locale]);
  const items = useMemo(() => {
    const base = nav ?? navItemsFromDictionary(dict);
    return base.map((item) => ({
      ...item,
      href: localizedPath(item.href, locale),
    }));
  }, [nav, dict, locale]);
  const homeHref = localizedPath("/", locale);

  return (
    <header className={`site-header${variant === "dark" ? " site-header--dark" : ""}`}>
      <div className="container nav-wrapper">
        <Link href={homeHref} className={logoClassName}>
          Noor<span style={{ color: "var(--accent)" }}>Link</span>
          <sup className="logo-tm">TM</sup>
        </Link>

        <nav className={`nav-links${menuOpen ? " active" : ""}`} id="navLinks">
          {items.map((item) => {
            const active = navItemIsActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[item.highlight ? "btn-nav" : null, active ? "is-active" : null]
                  .filter(Boolean)
                  .join(" ") || undefined}
                aria-current={active ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
          <LanguageSwitcher
            className="site-header__lang"
            onLocaleChange={setLocale}
          />
        </nav>

        <button
          type="button"
          className={`mobile-toggle${menuOpen ? " is-open" : ""}`}
          aria-label={menuOpen ? dict.nav.closeMenu : dict.nav.openMenu}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="mobile-toggle__bars" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>
    </header>
  );
}
