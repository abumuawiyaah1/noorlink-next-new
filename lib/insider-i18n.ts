import type { Locale } from "@/lib/i18n/config";
import { normalizeLocale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import {
  getInsiderBodyOverlay,
  type InsiderBodyOverlay,
  type InsiderDuaOverlay,
  type InsiderReminderOverlay,
} from "@/lib/i18n/insider-bodies";
import type {
  InsiderDua,
  InsiderIslamicReminder,
  InsiderIssue,
} from "@/lib/insider-types";

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

/** Use the overlay string when non-empty; otherwise keep English. */
function pick(next: string | undefined, fallback: string): string;
function pick(
  next: string | undefined,
  fallback: string | undefined,
): string | undefined;
function pick(
  next: string | undefined,
  fallback: string | undefined,
): string | undefined {
  return next ? next : fallback;
}

/** Overlay a string list by index; keep English for any missing item. */
function pickList(
  next: string[] | undefined,
  fallback: string[],
): string[];
function pickList(
  next: string[] | undefined,
  fallback: string[] | undefined,
): string[] | undefined;
function pickList(
  next: string[] | undefined,
  fallback: string[] | undefined,
): string[] | undefined {
  if (!next?.length || !fallback) return fallback;
  return fallback.map((item, i) => next[i] || item);
}

function overlayReminders(
  base: InsiderIslamicReminder[],
  overlay: InsiderReminderOverlay[] | undefined,
): InsiderIslamicReminder[] {
  if (!overlay?.length) return base;
  return base.map((item, i) => ({
    reference: pick(overlay[i]?.reference, item.reference),
    text: pick(overlay[i]?.text, item.text),
  }));
}

function overlayDuas(
  base: InsiderDua[] | undefined,
  overlay: InsiderDuaOverlay[] | undefined,
): InsiderDua[] | undefined {
  if (!base || !overlay?.length) return base;
  return base.map((item, i) => {
    const loc = overlay[i];
    if (!loc) return item;
    return {
      ...item,
      occasion: pick(loc.occasion, item.occasion),
      reference: pick(loc.reference, item.reference),
      // "" is meaningful here: Arabic hides the English gloss under the Arabic dua.
      text: loc.text !== undefined ? loc.text : item.text,
    };
  });
}

function applyBodyOverlay(
  issue: InsiderIssue,
  body: InsiderBodyOverlay | undefined,
): InsiderIssue {
  if (!body) return issue;

  return {
    ...issue,
    dealGiving: issue.dealGiving
      ? {
          ...issue.dealGiving,
          body: pick(body.dealGiving?.body, issue.dealGiving.body),
          ctaLabel: pick(body.dealGiving?.ctaLabel, issue.dealGiving.ctaLabel),
        }
      : issue.dealGiving,
    emailBrief: issue.emailBrief
      ? {
          ...issue.emailBrief,
          highlight: pick(body.emailBrief?.highlight, issue.emailBrief.highlight),
          highlightReference: pick(
            body.emailBrief?.highlightReference,
            issue.emailBrief.highlightReference,
          ),
          note: pick(body.emailBrief?.note, issue.emailBrief.note),
        }
      : issue.emailBrief,
    islamicReminders: issue.islamicReminders
      ? {
          ...issue.islamicReminders,
          quran: overlayReminders(
            issue.islamicReminders.quran,
            body.islamicReminders?.quran,
          ),
          hadith: overlayReminders(
            issue.islamicReminders.hadith,
            body.islamicReminders?.hadith,
          ),
          duas: overlayDuas(
            issue.islamicReminders.duas,
            body.islamicReminders?.duas,
          ),
        }
      : issue.islamicReminders,
    sections: {
      ...issue.sections,
      destinationBody: pickList(
        body.destinationBody,
        issue.sections.destinationBody,
      ),
      tips: pickList(body.tips, issue.sections.tips),
      connectivityBody: pick(
        body.connectivityBody,
        issue.sections.connectivityBody,
      ),
      hajjBody: pick(body.hajjBody, issue.sections.hajjBody),
      dealBody: pick(body.dealBody, issue.sections.dealBody),
      closing: pick(body.closing, issue.sections.closing),
    },
  };
}

/**
 * Localize archive-card fields, issue shell titles/opener/CTAs (from
 * `newsletterPage.issues.*`), and the long article bodies (from
 * `lib/i18n/insider-bodies*.ts`). English falls through unchanged.
 */
export function localizeInsiderIssue(
  issue: InsiderIssue,
  dict: Dictionary,
  locale: Locale | string | null,
): InsiderIssue {
  const loc = issueOverlay(dict, issue.slug);
  if (!loc) return issue;

  const shell: InsiderIssue = {
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

  const bodyLocale = normalizeLocale(locale);
  if (bodyLocale === "en") return shell;

  return applyBodyOverlay(shell, getInsiderBodyOverlay(issue.slug, bodyLocale));
}
