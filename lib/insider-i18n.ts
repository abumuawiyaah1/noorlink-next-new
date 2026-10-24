import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { InsiderIssue } from "@/lib/insider-types";

type IssueOverlay =
  Dictionary["newsletterPage"]["issues"][keyof Dictionary["newsletterPage"]["issues"]];

function issueOverlay(
  dict: Dictionary,
  slug: string,
): IssueOverlay | undefined {
  const issues = dict.newsletterPage.issues;
  if (slug in issues) {
    return issues[slug as keyof typeof issues];
  }
  return undefined;
}

/** Localize archive-card fields + issue shell titles/opener/CTAs. */
export function localizeInsiderIssue(
  issue: InsiderIssue,
  dict: Dictionary,
): InsiderIssue {
  const loc = issueOverlay(dict, issue.slug);
  if (!loc) return issue;

  return {
    ...issue,
    monthLabel: loc.monthLabel || issue.monthLabel,
    subject: loc.subject || issue.subject,
    preview: loc.preview || issue.preview,
    destinationFocus: loc.destinationFocus || issue.destinationFocus,
    promoEndsLabel: loc.promoEndsLabel || issue.promoEndsLabel,
    heroAlt: loc.heroAlt || issue.heroAlt,
    ctaPrimary: {
      ...issue.ctaPrimary,
      label: loc.ctaPrimary || issue.ctaPrimary.label,
    },
    ctaSecondary: issue.ctaSecondary
      ? {
          ...issue.ctaSecondary,
          label: loc.ctaSecondary || issue.ctaSecondary.label,
        }
      : issue.ctaSecondary,
    sections: {
      ...issue.sections,
      opener: loc.opener || issue.sections.opener,
      destinationTitle: loc.destinationTitle || issue.sections.destinationTitle,
      connectivityTitle:
        loc.connectivityTitle || issue.sections.connectivityTitle,
      hajjTitle: loc.hajjTitle || issue.sections.hajjTitle,
    },
  };
}
