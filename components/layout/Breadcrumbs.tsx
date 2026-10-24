"use client";

import Link from "next/link";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { useLocaleState } from "@/lib/i18n/use-locale";

export type Crumb = { href?: string; label: string };

type Props = {
  items: Crumb[];
  onDark?: boolean;
};

export function Breadcrumbs({ items, onDark = false }: Props) {
  const [locale] = useLocaleState();
  const aria = getDictionary(locale).common.breadcrumbAria;

  return (
    <nav
      className={`site-crumbs${onDark ? " site-crumbs--on-dark" : ""}`}
      aria-label={aria}
    >
      {items.map((item, index) => {
        const last = index === items.length - 1;
        return (
          <span key={`${item.label}-${index}`}>
            {index > 0 && (
              <span className="site-crumbs__sep" aria-hidden="true">
                {" "}
                ›{" "}
              </span>
            )}
            {item.href && !last ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span aria-current={last ? "page" : undefined}>{item.label}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
