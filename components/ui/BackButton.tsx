"use client";

import Link from "next/link";
import { Home } from "lucide-react";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizedPath } from "@/lib/i18n/path";
import { useLocaleState } from "@/lib/i18n/use-locale";
import "@/styles/back-button.css";

type BackButtonProps = {
  href?: string;
  label?: string;
  className?: string;
};

export function BackButton({
  href,
  label,
  className = "",
}: BackButtonProps) {
  const [locale] = useLocaleState();
  const dict = getDictionary(locale);
  const resolvedHref = href ?? localizedPath("/", locale);
  const resolvedLabel = label ?? dict.common.backToHome;

  return (
    <nav
      className={`back-button-anchor${className ? ` ${className}` : ""}`}
      aria-label={dict.common.returnHomeAria}
    >
      <Link href={resolvedHref} className="back-button-card">
        <span className="back-button-card__icon" aria-hidden="true">
          <Home className="back-button-card__icon-svg" strokeWidth={2.25} />
        </span>
        <span className="back-button-card__label">{resolvedLabel}</span>
      </Link>
    </nav>
  );
}
