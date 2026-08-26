import Link from "next/link";
import type { InsiderIssue } from "@/lib/insider-issues";

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
  const href = `/newsletter/${issue.slug}`;

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
          <span className="insider-card__badge">Coming soon</span>
        </div>
      ) : (
        <Link href={href} className="insider-card__media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={issue.heroImage} alt={issue.heroAlt} loading="lazy" />
          <span className="insider-card__badge">Issue #{issue.issueNumber}</span>
        </Link>
      )}
      <div className="insider-card__body">
        <p className="insider-card__meta">
          {issue.monthLabel} · {issue.destinationFocus}
        </p>
        <h3>
          {comingSoon ? issue.subject : <Link href={href}>{issue.subject}</Link>}
        </h3>
        <p>{issue.preview}</p>
        <div className="insider-card__footer">
          {comingSoon ? (
            <span className="insider-card__read insider-card__read--muted">
              Releases {issue.monthLabel}
            </span>
          ) : (
            <Link href={href} className="insider-card__read">
              Read issue
            </Link>
          )}
          <span className="insider-card__deal">
            {comingSoon
              ? `${issue.promoPercent}% Insider deal`
              : `${issue.promoPercent}% · ${issue.promoCode}`}
          </span>
        </div>
      </div>
    </article>
  );
}
