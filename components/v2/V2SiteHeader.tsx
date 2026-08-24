"use client";

import Link from "next/link";
import { useState } from "react";
import { CurrencyToggle } from "@/components/v2/CurrencyToggle";
import { PREVIEW_BASE, previewPath } from "@/lib/v2/preview-paths";

const NAV = [
  { href: previewPath("/"), label: "Home" },
  { href: previewPath("/hajj-umrah"), label: "Hajj & Umrah" },
  { href: previewPath("/destinations"), label: "Destinations" },
  { href: previewPath("/dashboard"), label: "My eSIMs" },
  { href: "/support", label: "Support" },
] as const;

export function V2SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="v2-header">
      <div className="v2-header__inner">
        <Link href={PREVIEW_BASE} className="v2-header__logo">
          Noor<span>Link</span>
          <em className="v2-header__tag">v2</em>
        </Link>

        <nav className={`v2-header__nav${open ? " is-open" : ""}`} aria-label="Main">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="v2-header__link"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="v2-header__actions">
          <CurrencyToggle className="v2-header__currency" />
          <Link href={previewPath("/hajj-umrah")} className="v2-btn v2-btn--accent v2-header__cta">
            Get Umrah Pass
          </Link>
          <button
            type="button"
            className="v2-header__menu"
            aria-expanded={open}
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}
