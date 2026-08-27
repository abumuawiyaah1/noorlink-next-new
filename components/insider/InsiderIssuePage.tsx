import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { InsiderSignupForm } from "@/components/insider/InsiderSignupForm";
import {
  getInsiderIssue,
  getPublishedInsiderIssues,
} from "@/lib/insider-issues";
import { withPromo } from "@/lib/promo-link";

type Props = {
  slug: string;
};

export function InsiderIssuePage({ slug }: Props) {
  const issue = getInsiderIssue(slug);
  if (!issue) notFound();

  const published = getPublishedInsiderIssues();
  const index = published.findIndex((item) => item.slug === slug);
  const prev = index > 0 ? published[index - 1] : null;
  const next =
    index >= 0 && index < published.length - 1 ? published[index + 1] : null;
  const primaryHref = withPromo(issue.ctaPrimary.href, issue.promoCode);
  const secondaryHref = issue.ctaSecondary
    ? withPromo(issue.ctaSecondary.href, issue.promoCode)
    : null;

  return (
    <>
      <SiteHeader />
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/newsletter", label: "Insider" },
          { label: issue.monthLabel },
        ]}
      />
      <main className="insider-issue-page">
        <header className="insider-issue-hero">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={issue.heroImage} alt={issue.heroAlt} />
          <div className="insider-issue-hero__veil" />
          <div className="insider-issue-hero__copy">
            <p className="insider-kicker">
              {issue.kind === "special"
                ? `Special edition · ${issue.monthLabel}`
                : `Issue #${issue.issueNumber} · ${issue.monthLabel}`}
            </p>
            <h1>{issue.subject}</h1>
            <p>{issue.preview}</p>
          </div>
        </header>

        <article className="insider-issue-body">
          <p className="insider-issue-opener">{issue.sections.opener}</p>

          {issue.islamicReminders && (
            <section className="insider-issue-reminders" aria-label="Islamic reminders">
              <div className="insider-issue-reminders__tools" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/insider/insider-qalam-ink.jpg"
                  alt=""
                />
              </div>
              <div className="insider-issue-reminders__copy">
                <h2>From the Qur’an</h2>
                {issue.islamicReminders.quran.map((item) => (
                  <blockquote key={item.reference} className="insider-reminder">
                    <p>{item.text}</p>
                    <cite>{item.reference}</cite>
                  </blockquote>
                ))}
                <h2>From the Sunnah</h2>
                {issue.islamicReminders.hadith.map((item) => (
                  <blockquote key={item.reference} className="insider-reminder">
                    <p>{item.text}</p>
                    <cite>{item.reference}</cite>
                  </blockquote>
                ))}
                {issue.islamicReminders.duas &&
                  issue.islamicReminders.duas.length > 0 && (
                    <>
                      <h2>Special du‘ā’s for the journey</h2>
                      {issue.islamicReminders.duas.map((dua) => (
                        <blockquote
                          key={`${dua.occasion}-${dua.reference}`}
                          className="insider-reminder insider-reminder--dua"
                        >
                          <p className="insider-reminder__occasion">
                            {dua.occasion}
                          </p>
                          {dua.arabic ? (
                            <p className="insider-reminder__arabic" lang="ar" dir="rtl">
                              {dua.arabic}
                            </p>
                          ) : null}
                          <p>{dua.text}</p>
                          <cite>{dua.reference}</cite>
                        </blockquote>
                      ))}
                    </>
                  )}
              </div>
            </section>
          )}

          <section>
            <h2>{issue.sections.destinationTitle}</h2>
            {issue.sections.destinationBody.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
            {issue.sections.tips && issue.sections.tips.length > 0 && (
              <ul>
                {issue.sections.tips.map((tip) => (
                  <li key={tip.slice(0, 32)}>{tip}</li>
                ))}
              </ul>
            )}
          </section>

          <section>
            <h2>{issue.sections.connectivityTitle}</h2>
            <p>{issue.sections.connectivityBody}</p>
          </section>

          {issue.sections.hajjTitle && issue.sections.hajjBody ? (
            <section className="insider-issue-hajj">
              <h2>{issue.sections.hajjTitle}</h2>
              <p>{issue.sections.hajjBody}</p>
            </section>
          ) : null}

          <aside className="insider-deal">
            <p className="insider-kicker">Insider note</p>
            <p className="insider-deal__code">{issue.promoCode}</p>
            <p>
              {issue.promoPercent}% off at checkout · ends {issue.promoEndsLabel}.
            </p>
            {issue.dealGiving ? (
              <div className="insider-deal__giving">
                <p>{issue.dealGiving.body}</p>
                <p className="insider-deal__giving-link">
                  <Link href={issue.dealGiving.href}>
                    {issue.dealGiving.ctaLabel}
                  </Link>
                </p>
              </div>
            ) : (
              <p className="insider-deal__hint">{issue.sections.dealBody}</p>
            )}
            <div className="insider-deal__actions">
              <Link href={primaryHref} className="insider-btn">
                {issue.ctaPrimary.label}
              </Link>
              {issue.ctaSecondary && secondaryHref ? (
                <Link
                  href={secondaryHref}
                  className="insider-btn insider-btn--ghost"
                >
                  {issue.ctaSecondary.label}
                </Link>
              ) : null}
            </div>
          </aside>

          <p className="insider-issue-close">{issue.sections.closing}</p>
          <p className="insider-issue-signoff">— NoorLink Insider</p>

          <nav className="insider-issue-nav" aria-label="Issue navigation">
            {prev ? (
              <Link href={`/newsletter/${prev.slug}`}>← {prev.monthLabel}</Link>
            ) : (
              <span />
            )}
            <Link href="/newsletter">All issues</Link>
            {next ? (
              <Link href={`/newsletter/${next.slug}`}>{next.monthLabel} →</Link>
            ) : (
              <span />
            )}
          </nav>

          <div className="insider-issue-join">
            <h2>Get the next issue by email</h2>
            <InsiderSignupForm variant="inline" />
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
