import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { InsiderIssueCard } from "@/components/insider/InsiderIssueCard";
import { InsiderSignupForm } from "@/components/insider/InsiderSignupForm";
import { INSIDER_ISSUES } from "@/lib/insider-issues";

export function ModernNewsletterPage() {
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
            alt=""
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
            <div className="insider-grid">
              {INSIDER_ISSUES.map((issue) => (
                <InsiderIssueCard key={issue.slug} issue={issue} />
              ))}
            </div>
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
