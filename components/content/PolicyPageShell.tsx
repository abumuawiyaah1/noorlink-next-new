"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

type PolicySection = {
  title: string;
  body?: string[];
  bullets?: string[];
  orderedBullets?: string[];
};

type PolicyPageShellProps = {
  title: string;
  subtitle?: string;
  badge?: string;
  alert?: string;
  sections: PolicySection[];
  breadcrumbItems?: { href?: string; label: string }[];
  topContent?: ReactNode;
  children?: ReactNode;
};

export function PolicyPageShell({
  title,
  subtitle,
  badge,
  alert,
  sections,
  breadcrumbItems,
  topContent,
  children,
}: PolicyPageShellProps) {
  const crumbs = breadcrumbItems ?? [
    { href: "/", label: "Home" },
    { href: "/support", label: "Support" },
    { label: title },
  ];

  return (
    <>
      <SiteHeader />
      <Breadcrumbs items={crumbs} />
      <main className="content-page legal-page">
        <section className="content-hero content-hero--compact">
          <div className="content-hero__inner">
            <span className="content-kicker">NoorLink policies</span>
            <h1>{title}</h1>
            {subtitle ? <p>{subtitle}</p> : null}
            {badge ? <div className="content-hero__badge">{badge}</div> : null}
          </div>
        </section>

        <div className="content-shell">
          {topContent}

          <article className="legal-card">
            {alert ? <div className="legal-alert">{alert}</div> : null}

            {sections.map((section) => (
              <section key={section.title} className="legal-section">
                <h2>{section.title}</h2>
                {section.body?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets ? (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
                {section.orderedBullets ? (
                  <ol>
                    {section.orderedBullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ol>
                ) : null}
              </section>
            ))}

            <div className="legal-meta">
              <p>
                Need help with an order or policy question? Visit{" "}
                <Link href="/support">Support</Link>.
              </p>
            </div>
          </article>

          {children}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
