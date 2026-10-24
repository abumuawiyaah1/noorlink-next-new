"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizedPath } from "@/lib/i18n/path";
import { useLocaleState } from "@/lib/i18n/use-locale";
import { linkifyNoorlinkEmails } from "@/lib/support-contact";

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
  /** Optional SSR locale; falls back to useLocaleState. */
  locale?: Locale;
};

function LinkedPolicyText({ text }: { text: string }) {
  return (
    <>
      {linkifyNoorlinkEmails(text).map((part, index) =>
        typeof part === "string" ? (
          <span key={`t-${index}`}>{part}</span>
        ) : (
          <a key={`a-${index}`} href={part.href}>
            {part.label}
          </a>
        ),
      )}
    </>
  );
}

export function PolicyPageShell({
  title,
  subtitle,
  badge,
  alert,
  sections,
  breadcrumbItems,
  topContent,
  children,
  locale: localeProp,
}: PolicyPageShellProps) {
  const [localeState] = useLocaleState();
  const locale = localeProp ?? localeState;
  const dict = getDictionary(locale);
  const crumbs = (breadcrumbItems ?? [
    { href: "/", label: dict.common.home },
    { href: "/support", label: dict.common.support },
    { label: title },
  ]).map((item) =>
    item.href
      ? { ...item, href: localizedPath(item.href, locale) }
      : item,
  );

  return (
    <>
      <SiteHeader />
      <Breadcrumbs items={crumbs} />
      <main className="content-page legal-page">
        <section className="content-hero content-hero--compact">
          <div className="content-hero__inner">
            <span className="content-kicker">{dict.common.policiesKicker}</span>
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
                {section.body?.map((paragraph) => (
                  <p key={paragraph}>
                    <LinkedPolicyText text={paragraph} />
                  </p>
                ))}
                {section.bullets ? (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>
                        <LinkedPolicyText text={bullet} />
                      </li>
                    ))}
                  </ul>
                ) : null}
                {section.orderedBullets ? (
                  <ol>
                    {section.orderedBullets.map((bullet) => (
                      <li key={bullet}>
                        <LinkedPolicyText text={bullet} />
                      </li>
                    ))}
                  </ol>
                ) : null}
              </section>
            ))}

            <div className="legal-meta">
              <p>
                {dict.common.policyHelpBefore}{" "}
                <Link href={localizedPath("/support", locale)}>
                  {dict.common.policyHelpLink}
                </Link>
                .
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
