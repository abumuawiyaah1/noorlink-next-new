"use client";

import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import "@/styles/help-pages.css";

export type ShortHelpGuideSection = {
  title: string;
  body: string;
};

type ShortHelpGuidePageProps = {
  breadcrumbLabel: string;
  title: string;
  intro: string;
  sections: ShortHelpGuideSection[];
  primaryCta: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
};

export function ShortHelpGuidePage({
  breadcrumbLabel,
  title,
  intro,
  sections,
  primaryCta,
  secondaryCta,
}: ShortHelpGuidePageProps) {
  return (
    <>
      <SiteHeader />
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/support", label: "Support" },
          { label: breadcrumbLabel },
        ]}
      />
      <main className="help-page">
        <section className="help-hero">
          <p className="help-hero__brand" aria-hidden="true">
            Noor<span>Link</span>
          </p>
          <h1>{title}</h1>
          <p>{intro}</p>
        </section>
        <div className="help-inner help-inner--guide">
          {sections.map((section) => (
            <article key={section.title} className="help-card">
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </article>
          ))}

          <div className="help-guide-cta">
            <Link href={primaryCta.href} className="help-guide-cta__primary">
              {primaryCta.label}
            </Link>
            {secondaryCta ? (
              <Link href={secondaryCta.href} className="help-guide-cta__secondary">
                {secondaryCta.label}
              </Link>
            ) : null}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
