"use client";

import Link from "next/link";
import type { InsiderIssue } from "@/lib/insider-issues";
import { getDictionary, t } from "@/lib/i18n/dictionaries";
import { localizedPath } from "@/lib/i18n/path";
import { useLocaleState } from "@/lib/i18n/use-locale";

type Props = {
  issue: InsiderIssue;
  compact?: boolean;
  comingSoon?: boolean;
};

export function InsiderIssueCard({
  issue,
  compact = false,
  comingSoon = false,
}: Props) {
  const [locale] = useLocaleState();
  const dict = getDictionary(locale);
  const n = dict.newsletterPage;
  const href = localizedPath(`/newsletter/${issue.slug}`, locale);

  const badge =
    issue.kind === "special"
      ? n.specialEdition
      : t(dict, "newsletterPage.issueNumber", { n: issue.issueNumber ?? "" });

  return (
    <article
      className={`insider-card${compact ? " insider-card--compact" : ""}${
        comingSoon ? " insider-card--soon" : ""
      }`}
    >
      {comingSoon ? (
        <div className="insider-card__media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={issue.heroImage} alt={issue.heroAlt} loading="lazy" />
          <span className="insider-card__badge">{n.comingSoon}</span>
        </div>
      ) : (
        <Link href={href} className="insider-card__media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={issue.heroImage} alt={issue.heroAlt} loading="lazy" />
          <span className="insider-card__badge">{badge}</span>
        </Link>
      )}
      <div className="insider-card__body">
        <p className="insider-card__meta">
          {issue.monthLabel} · {issue.destinationFocus}
          {issue.audience === "pilgrimage" ? ` · ${n.pilgrimageList}` : ""}
        </p>
        <h3>
          {comingSoon ? issue.subject : <Link href={href}>{issue.subject}</Link>}
        </h3>
        <p>{issue.preview}</p>
        <div className="insider-card__footer">
          {comingSoon ? (
            <span className="insider-card__read insider-card__read--muted">
              {t(dict, "newsletterPage.releases", { month: issue.monthLabel })}
            </span>
          ) : (
            <Link href={href} className="insider-card__read">
              {n.readIssue}
            </Link>
          )}
          <span className="insider-card__deal">
            {comingSoon
              ? t(dict, "newsletterPage.dealSoon", {
                  percent: issue.promoPercent,
                })
              : t(dict, "newsletterPage.dealLive", {
                  percent: issue.promoPercent,
                  code: issue.promoCode,
                })}
          </span>
        </div>
      </div>
    </article>
  );
}
