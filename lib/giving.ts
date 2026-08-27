/**
 * NoorLink Ramadan giving pledge — our commitment, not an external donate funnel.
 * We give from profit; customers are not sent to other charity sites from Insider.
 */

export const RAMADAN_GIVING = {
  /** Share of NoorLink profit donated from eligible Insider special purchases. */
  profitSharePercent: 10,
  /** Customer Insider discount on the same purchases (promo code). */
  customerDiscountPercent: 10,
  learnMorePath: "/give",
  hadith:
    "The Messenger of Allah ﷺ was the most generous of people, and he was even more generous in Ramadan than in other months.",
  hadithReference: "Bukhari & Muslim",
} as const;
