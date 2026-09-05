export type OutreachPlatform =
  | "instagram"
  | "tiktok"
  | "youtube"
  | "email"
  | "other";

export type OutreachWave = "1" | "2" | "3" | "search";

export type OutreachStatus =
  | "to_contact"
  | "messaged"
  | "replied"
  | "gifted"
  | "posted"
  | "closed";

export type OutreachContact = {
  id: string;
  name: string;
  handle: string;
  email: string;
  platform: OutreachPlatform;
  profileUrl: string;
  contentUrl: string;
  wave: OutreachWave;
  status: OutreachStatus;
  messageSent: string;
  promoCode: string;
  notes: string;
  contactedAt: string;
  repliedAt: string;
  lastEmailAt: string;
  lastEmailSubject: string;
  createdAt: string;
  updatedAt: string;
};

export type OutreachManifest = {
  version: 1;
  contacts: OutreachContact[];
};

export const OUTREACH_STATUS_LABELS: Record<OutreachStatus, string> = {
  to_contact: "To contact",
  messaged: "Messaged",
  replied: "Replied",
  gifted: "Gifted",
  posted: "Posted",
  closed: "Closed",
};

export const OUTREACH_PLATFORM_LABELS: Record<OutreachPlatform, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
  email: "Email",
  other: "Other",
};

export const OUTREACH_WAVE_LABELS: Record<OutreachWave, string> = {
  "1": "Wave 1",
  "2": "Wave 2",
  "3": "Wave 3",
  search: "Search find",
};
