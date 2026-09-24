"use client";

import Link from "next/link";

export function CompareStickyCta() {
  return (
    <div className="esim-compare-sticky" role="region" aria-label="Quick actions">
      <div className="esim-compare-sticky__inner">
        <p className="esim-compare-sticky__copy">
          Ready when you are — install before you fly.
        </p>
        <div className="esim-compare-sticky__actions">
          <Link href="/destinations" className="esim-compare-sticky__btn esim-compare-sticky__btn--primary">
            Browse destinations
          </Link>
          <Link href="/hajj-umrah" className="esim-compare-sticky__btn esim-compare-sticky__btn--accent">
            Hajj &amp; Umrah
          </Link>
          <Link
            href="/help/hajj-umrah-phone-check"
            className="esim-compare-sticky__btn esim-compare-sticky__btn--ghost"
          >
            Free phone check
          </Link>
        </div>
      </div>
    </div>
  );
}
