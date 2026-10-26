"use client";

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
import { localizeInsiderIssue } from "@/lib/insider-i18n";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizedPath } from "@/lib/i18n/path";
import { useLocaleState } from "@/lib/i18n/use-locale";

export function ModernNewsletterPage() {
  const [locale] = useLocaleState();
  const dict = getDictionary(locale);
  const n = dict.newsletterPage;
  const published = getPublishedInsiderIssues().map((issue) =>
    localizeInsiderIssue(issue, dict, locale),
  );
  const upcoming = getUpcomingInsiderIssues().map((issue) =>
    localizeInsiderIssue(issue, dict, locale),
  );

  return (
    <>
      <SiteHeader />
      <Breadcrumbs
        items={[
          { href: localizedPath("/", locale), label: dict.common.home },
          { label: n.crumb },
        ]}
      />
      <main className="insider-page">
        <section className="insider-hero">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="insider-hero__bg"
            src="/images/insider/insider-masthead.jpg"
            alt={n.heroAlt}
            width={1920}
            height={1080}
            aria-hidden="true"
          />
          <div className="insider-hero__veil" />
          <div className="insider-hero__inner">
            <p className="insider-kicker">{n.kicker}</p>
            <h1>{n.title}</h1>
            <p className="insider-hero__lead">{n.lede}</p>
            <InsiderSignupForm variant="page" />
          </div>
        </section>

        <div className="insider-shell">
          <section className="insider-archive">
            <div className="insider-section-head">
              <p className="insider-kicker">{n.archiveKicker}</p>
              <h2>{n.archiveTitle}</h2>
              <p>{n.archiveLede}</p>
            </div>

            {published.length > 0 ? (
              <div className="insider-grid">
                {published.map((issue) => (
                  <InsiderIssueCard key={issue.slug} issue={issue} />
                ))}
              </div>
            ) : (
              <p className="insider-archive-empty">{n.archiveEmpty}</p>
            )}

            {upcoming.length > 0 && (
              <div className="insider-upcoming">
                <div className="insider-section-head">
                  <p className="insider-kicker">{n.upcomingKicker}</p>
                  <h2>{n.upcomingTitle}</h2>
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
              <p className="insider-kicker">{n.promiseKicker}</p>
              <h2>{n.promiseTitle}</h2>
              <ul>
                {n.promiseItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="insider-promise__cta">
              <Link
                href={localizedPath("/destinations", locale)}
                className="insider-btn"
              >
                {n.browseDestinations}
              </Link>
              <Link
                href={localizedPath("/hajj-umrah", locale)}
                className="insider-btn insider-btn--ghost"
              >
                {n.hajjUmrahConnect}
              </Link>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
