import Link from "next/link";
import type { InsiderIssue } from "@/lib/insider-issues";

type Props = {
  issue: InsiderIssue;
  compact?: boolean;
};

export function InsiderIssueCard({ issue, compact = false }: Props) {
  return (
    <article className={`insider-card${compact ? " insider-card--compact" : ""}`}>
      <Link href={`/newsletter/${issue.slug}`} className="insider-card__media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={issue.heroImage} alt={issue.heroAlt} loading="lazy" />
        <span className="insider-card__badge">Issue #{issue.issueNumber}</span>
      </Link>
      <div className="insider-card__body">
        <p className="insider-card__meta">
          {issue.monthLabel} · {issue.destinationFocus}
        </p>
        <h3>
          <Link href={`/newsletter/${issue.slug}`}>{issue.subject}</Link>
        </h3>
        <p>{issue.preview}</p>
        <div className="insider-card__footer">
          <Link href={`/newsletter/${issue.slug}`} className="insider-card__read">
            Read issue
          </Link>
          <span className="insider-card__deal">
            {issue.promoPercent}% · {issue.promoCode}
          </span>
        </div>
      </div>
    </article>
  );
}
