/**
 * Shared Insider issue types (monthly + special editions).
 */

export type InsiderIslamicReminder = {
  reference: string;
  text: string;
};

export type InsiderDua = {
  occasion: string;
  arabic?: string;
  text: string;
  reference: string;
};

export type InsiderIssue = {
  slug: string;
  issueNumber: number;
  /** Default monthly; specials are Ramadan/Hajj reminder editions. */
  kind?: "monthly" | "special";
  /** Who receives the email blast. Web archive remains public. */
  audience?: "all" | "pilgrimage";
  monthLabel: string;
  subject: string;
  preview: string;
  heroImage: string;
  heroAlt: string;
  destinationFocus: string;
  promoCode: string;
  promoPercent: number;
  promoEndsLabel: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  /** Optional giving pledge shown inside the Insider deal card. */
  dealGiving?: {
    body: string;
    href: string;
    ctaLabel: string;
  };
  /** Short copy for the email blast (keep web archive fuller). */
  emailBrief?: {
    highlight: string;
    highlightReference?: string;
    note?: string;
  };
  islamicReminders?: {
    quran: InsiderIslamicReminder[];
    hadith: InsiderIslamicReminder[];
    duas?: InsiderDua[];
  };
  sections: {
    opener: string;
    destinationTitle: string;
    destinationBody: string[];
    tips?: string[];
    connectivityTitle: string;
    connectivityBody: string;
    hajjTitle?: string;
    hajjBody?: string;
    dealBody: string;
    closing: string;
  };
};
