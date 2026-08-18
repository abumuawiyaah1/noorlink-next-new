import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

const ISSUES = [
  {
    issue: "Issue #1",
    date: "March 2024",
    title: "The Japan Guide & 20% Off Data",
    description:
      "Why 2024 is the year of eSIM travel, plus a practical guide to staying connected in Tokyo and Osaka.",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop&q=80",
  },
  {
    issue: "Issue #2",
    date: "February 2024",
    title: "Umrah Preparation Checklist",
    description:
      "Offline maps, data-saving tips, and a simple connectivity checklist before you travel to Makkah and Madinah.",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1549144511-30858b343425?w=800&auto=format&fit=crop&q=80",
  },
  {
    issue: "Issue #3",
    date: "January 2024",
    title: "Europe Summer Data Deals",
    description:
      "How to travel across Europe with one eSIM and avoid surprise roaming costs.",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1467269204594-9661b133dd2b?w=800&auto=format&fit=crop&q=80",
  },
];

export function ModernNewsletterPage() {
  return (
    <>
      <SiteHeader />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Newsletter" }]} />
      <main className="content-page newsletter-page">
        <section className="content-hero newsletter-hero">
          <div className="content-hero__inner">
            <span className="content-kicker">NoorLink Insider</span>
            <h1>Travel tips, destination guides, and eSIM updates.</h1>
            <p>
              Follow the archive for practical travel connectivity advice and
              occasional offers from the NoorLink team.
            </p>
          </div>
        </section>

        <div className="content-shell">
          <section className="newsletter-signup">
            <div>
              <span className="content-kicker">Stay in the loop</span>
              <h2>Want future issues by email?</h2>
              <p>
                We are rebuilding the newsletter signup flow. For now, message
                support and ask to join the NoorLink Insider list.
              </p>
            </div>
            <div className="content-cta__actions">
              <a
                className="content-button"
                href="mailto:support@noorlink.co?subject=Join%20NoorLink%20Insider"
              >
                Join by email
              </a>
              <Link href="/support" className="content-button content-button--ghost">
                Contact support
              </Link>
            </div>
          </section>

          <section className="newsletter-archive">
            <div className="content-section-head">
              <span className="content-kicker">Archive</span>
              <h2>Recent issues</h2>
              <p>
                We kept the archive content visible while the signup form is being
                rebuilt.
              </p>
            </div>

            <div className="newsletter-grid">
              {ISSUES.map((issue) => {
                const CardTag = issue.href === "#" ? "article" : "a";
                return (
                  <CardTag
                    key={issue.title}
                    className="newsletter-card"
                    {...(issue.href === "#" ? {} : { href: issue.href })}
                  >
                    <div
                      className="newsletter-card__image"
                      style={{ backgroundImage: `url(${issue.image})` }}
                    />
                    <div className="newsletter-card__body">
                      <div className="newsletter-card__meta">
                        <span>{issue.issue}</span>
                        <span>{issue.date}</span>
                      </div>
                      <h3>{issue.title}</h3>
                      <p>{issue.description}</p>
                      <span className="newsletter-card__link">
                        {issue.href === "#" ? "Archive link coming soon" : "Read issue"}
                      </span>
                    </div>
                  </CardTag>
                );
              })}
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
