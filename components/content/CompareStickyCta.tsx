"use client";

import Link from "next/link";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizedPath } from "@/lib/i18n/path";
import { useLocaleState } from "@/lib/i18n/use-locale";

export function CompareStickyCta() {
  const [locale] = useLocaleState();
  const c = getDictionary(locale).comparePage;

  return (
    <div className="esim-compare-sticky" role="region" aria-label={c.stickyAria}>
      <div className="esim-compare-sticky__inner">
        <p className="esim-compare-sticky__copy">{c.stickyCopy}</p>
        <div className="esim-compare-sticky__actions">
          <Link
            href={localizedPath("/destinations", locale)}
            className="esim-compare-sticky__btn esim-compare-sticky__btn--primary"
          >
            {c.browseDestinations}
          </Link>
          <Link
            href={localizedPath("/hajj-umrah", locale)}
            className="esim-compare-sticky__btn esim-compare-sticky__btn--accent"
          >
            {c.stickyHajj}
          </Link>
          <Link
            href={localizedPath("/help/hajj-umrah-phone-check", locale)}
            className="esim-compare-sticky__btn esim-compare-sticky__btn--ghost"
          >
            {c.freePhoneCheck}
          </Link>
        </div>
      </div>
    </div>
  );
}
