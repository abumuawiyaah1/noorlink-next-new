import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { InsiderIssueCard } from "@/components/insider/InsiderIssueCard";
import { InsiderSignupForm } from "@/components/insider/InsiderSignupForm";
import {
  getPublishedInsiderIssues,
  getUpcomingInsiderIssues,
} from "@/lib/insider-issues";

export function ModernNewsletterPage() {
  const published = getPublishedInsiderIssues();
  const upcoming = getUpcomingInsiderIssues();

  return (
    <>
      <SiteHeader />
      <Breadcrumbs
        items={[{ href: "/", label: "Home" }, { label: "Insider" }]}
      />
      <main className="insider-page">
        <section className="insider-hero">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="insider-hero__bg"
            src="/images/insider/insider-masthead.jpg"
            alt="NoorLink Insider newsletter"
            width={1920}
            height={1080}
            aria-hidden="true"
          />
          <div className="insider-hero__veil" />
          <div className="insider-hero__inner">
            <p className="insider-kicker">NoorLink Insider</p>
            <h1>Travel tips &amp; destination guides — useful, not noisy.</h1>
            <p className="insider-hero__lead">
              One monthly email for everyone: destination notes, Hajj &amp; Umrah
              timing, real connectivity tips, and timed Insider discounts.
            </p>
            <InsiderSignupForm variant="page" />
          </div>
        </section>

        <div className="insider-shell">
          <section className="insider-archive">
            <div className="insider-section-head">
              <p className="insider-kicker">Year 1 archive</p>
              <h2>Destination guides with premium photography</h2>
              <p>
                Practical traveler advice, Hajj &amp; Umrah timing, and a deal
                code each month that turns off automatically when the promotion
                ends. Emails release on the first Tuesday of each month.
              </p>
            </div>

            {published.length > 0 ? (
              <div className="insider-grid">
                {published.map((issue) => (
                  <InsiderIssueCard key={issue.slug} issue={issue} />
                ))}
              </div>
            ) : (
              <p className="insider-archive-empty">
                The first issue lands in September 2026. Join Insider above to
                get it by email when it goes live.
              </p>
            )}

            {upcoming.length > 0 && (
              <div className="insider-upcoming">
                <div className="insider-section-head">
                  <p className="insider-kicker">Coming up</p>
                  <h2>Scheduled issues</h2>
                </div>
                <div className="insider-grid">
                  {upcoming.map((issue) => (
                    <InsiderIssueCard
                      key={issue.slug}
                      issue={issue}
                      comingSoon
                    />
                  ))}
                </div>
              </div>
            )}
          </section>

          <section className="insider-promise">
            <div>
              <p className="insider-kicker">What you get</p>
              <h2>Built for practical travelers</h2>
              <ul>
                <li>Destination guides with real connectivity habits</li>
                <li>Hajj &amp; Umrah timing notes — calm, not hype</li>
                <li>One deal code per month, auto-disabled when it ends</li>
                <li>Same list for everyone — no segment spam</li>
              </ul>
            </div>
            <div className="insider-promise__cta">
              <Link href="/destinations" className="insider-btn">
                Browse destinations
              </Link>
              <Link href="/hajj-umrah" className="insider-btn insider-btn--ghost">
                Hajj &amp; Umrah Connect
              </Link>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
