import type { OutreachContact } from "@/lib/outreach-types";

/** Days after first touch before a gentle follow-up is due. */
export const OUTREACH_FOLLOW_UP_AFTER_DAYS = 7;

function parseTouchTime(contact: Pick<OutreachContact, "lastEmailAt" | "contactedAt">): number | null {
  const raw = (contact.lastEmailAt || contact.contactedAt || "").trim();
  if (!raw) return null;
  // Date-only fields from the CRM form are local calendar days.
  const normalized = /^\d{4}-\d{2}-\d{2}$/.test(raw) ? `${raw}T12:00:00.000Z` : raw;
  const ms = Date.parse(normalized);
  return Number.isFinite(ms) ? ms : null;
}

export function daysSinceOutreachTouch(
  contact: Pick<OutreachContact, "lastEmailAt" | "contactedAt">,
  now = Date.now(),
): number | null {
  const touched = parseTouchTime(contact);
  if (touched == null) return null;
  return Math.floor((now - touched) / (24 * 60 * 60 * 1000));
}

/** Messaged, no reply logged, and first touch is old enough for a bump. */
export function contactNeedsFollowUp(
  contact: Pick<
    OutreachContact,
    "status" | "repliedAt" | "lastEmailAt" | "contactedAt" | "email"
  >,
  now = Date.now(),
  afterDays = OUTREACH_FOLLOW_UP_AFTER_DAYS,
): boolean {
  if (contact.status !== "messaged") return false;
  if (contact.repliedAt?.trim()) return false;
  const days = daysSinceOutreachTouch(contact, now);
  if (days == null) return false;
  return days >= afterDays;
}

/** Still to_contact but we have an email — ready for first branded send. */
export function contactReadyForFirstEmail(
  contact: Pick<OutreachContact, "status" | "email">,
): boolean {
  return contact.status === "to_contact" && Boolean(contact.email?.trim());
}

export type OutreachQueueFilter =
  | "all"
  | "follow_up_due"
  | "ready_first_email"
  | OutreachContact["status"];

export function matchesOutreachQueueFilter(
  contact: OutreachContact,
  filter: OutreachQueueFilter,
  now = Date.now(),
): boolean {
  if (filter === "all") return true;
  if (filter === "follow_up_due") return contactNeedsFollowUp(contact, now);
  if (filter === "ready_first_email") return contactReadyForFirstEmail(contact);
  return contact.status === filter;
}
