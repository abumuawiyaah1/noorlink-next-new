"use client";

import Link from "next/link";
import { useState } from "react";

export type NavItem = { href: string; label: string; highlight?: boolean };

const DEFAULT_NAV: NavItem[] = [
  { href: "/about", label: "About" },
  { href: "/destinations", label: "Destinations" },
  { href: "/support", label: "Support" },
  { href: "/faq", label: "FAQ" },
  { href: "/dashboard", label: "My eSIMs", highlight: true },
];

type SiteHeaderProps = {
  nav?: NavItem[];
  logoClassName?: string;
  variant?: "light" | "dark";
};

export function SiteHeader({
  nav = DEFAULT_NAV,
  logoClassName = "logo-text",
  variant = "light",
}: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={`site-header${variant === "dark" ? " site-header--dark" : ""}`}>
      <div className="container nav-wrapper">
        <Link href="/" className={logoClassName}>
          Noor<span style={{ color: "var(--accent)" }}>Link</span>
          <sup className="logo-tm">TM</sup>
        </Link>

        <nav className={`nav-links${menuOpen ? " active" : ""}`} id="navLinks">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={item.highlight ? "btn-nav" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="mobile-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <i className="fas fa-bars" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
