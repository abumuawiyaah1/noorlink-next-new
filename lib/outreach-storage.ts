import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { OUTREACH_SEED_CONTACTS } from "@/lib/outreach-seed";
import type {
  OutreachContact,
  OutreachManifest,
} from "@/lib/outreach-types";

const MANIFEST_KEY = "_meta/outreach-contacts.json";
const LOCAL_ROOT = path.join(process.cwd(), ".data", "outreach");
const LOCAL_MANIFEST = path.join(LOCAL_ROOT, "contacts.json");

function emptyManifest(): OutreachManifest {
  return { version: 1, contacts: [] };
}

function nowIso(): string {
  return new Date().toISOString();
}

function sortContacts(contacts: OutreachContact[]): OutreachContact[] {
  return [...contacts].sort(
    (a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt),
  );
}

async function getR2Bucket(): Promise<R2Bucket | null> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    return (env as { SOCIAL_ASSETS?: R2Bucket }).SOCIAL_ASSETS ?? null;
  } catch {
    return null;
  }
}

async function ensureLocalDir(): Promise<void> {
  await mkdir(LOCAL_ROOT, { recursive: true });
}

async function readLocalManifest(): Promise<OutreachManifest> {
  await ensureLocalDir();
  try {
    const raw = await readFile(LOCAL_MANIFEST, "utf8");
    return JSON.parse(raw) as OutreachManifest;
  } catch {
    return emptyManifest();
  }
}

async function writeLocalManifest(manifest: OutreachManifest): Promise<void> {
  await ensureLocalDir();
  await writeFile(LOCAL_MANIFEST, JSON.stringify(manifest, null, 2), "utf8");
}

async function readManifest(): Promise<OutreachManifest> {
  const bucket = await getR2Bucket();
  if (!bucket) return readLocalManifest();

  const object = await bucket.get(MANIFEST_KEY);
  if (!object) return emptyManifest();
  return (await object.json()) as OutreachManifest;
}

async function writeManifest(manifest: OutreachManifest): Promise<void> {
  const bucket = await getR2Bucket();
  const body = JSON.stringify(manifest, null, 2);
  if (!bucket) {
    await writeLocalManifest(manifest);
    return;
  }
  await bucket.put(MANIFEST_KEY, body, {
    httpMetadata: { contentType: "application/json" },
  });
}

function normalizeContact(
  input: Partial<OutreachContact>,
  existing?: OutreachContact,
): OutreachContact {
  const stamp = nowIso();
  return {
    id: existing?.id ?? input.id ?? randomUUID(),
    name: (input.name ?? existing?.name ?? "").trim(),
    handle: (input.handle ?? existing?.handle ?? "").trim(),
    email: (input.email ?? existing?.email ?? "").trim().toLowerCase(),
    platform: input.platform ?? existing?.platform ?? "instagram",
    profileUrl: (input.profileUrl ?? existing?.profileUrl ?? "").trim(),
    contentUrl: (input.contentUrl ?? existing?.contentUrl ?? "").trim(),
    wave: input.wave ?? existing?.wave ?? "search",
    status: input.status ?? existing?.status ?? "to_contact",
    messageSent: input.messageSent ?? existing?.messageSent ?? "",
    promoCode: (input.promoCode ?? existing?.promoCode ?? "").trim(),
    notes: input.notes ?? existing?.notes ?? "",
    contactedAt: input.contactedAt ?? existing?.contactedAt ?? "",
    repliedAt: input.repliedAt ?? existing?.repliedAt ?? "",
    lastEmailAt: input.lastEmailAt ?? existing?.lastEmailAt ?? "",
    lastEmailSubject:
      input.lastEmailSubject ?? existing?.lastEmailSubject ?? "",
    createdAt: existing?.createdAt ?? stamp,
    updatedAt: stamp,
  };
}

export async function listOutreachContacts(): Promise<OutreachContact[]> {
  const manifest = await readManifest();
  return sortContacts(manifest.contacts);
}

export async function createOutreachContact(
  input: Partial<OutreachContact>,
): Promise<OutreachContact> {
  const manifest = await readManifest();
  const contact = normalizeContact(input);
  if (!contact.name) {
    throw new Error("Name is required.");
  }
  manifest.contacts.push(contact);
  await writeManifest(manifest);
  return contact;
}

export async function updateOutreachContact(
  id: string,
  input: Partial<OutreachContact>,
): Promise<OutreachContact> {
  const manifest = await readManifest();
  const index = manifest.contacts.findIndex((c) => c.id === id);
  if (index < 0) throw new Error("Contact not found.");
  const updated = normalizeContact(input, manifest.contacts[index]);
  manifest.contacts[index] = updated;
  await writeManifest(manifest);
  return updated;
}

export async function deleteOutreachContact(id: string): Promise<void> {
  const manifest = await readManifest();
  const next = manifest.contacts.filter((c) => c.id !== id);
  if (next.length === manifest.contacts.length) {
    throw new Error("Contact not found.");
  }
  await writeManifest({ ...manifest, contacts: next });
}

export async function seedOutreachContactsIfEmpty(): Promise<{
  seeded: boolean;
  count: number;
}> {
  const manifest = await readManifest();
  if (manifest.contacts.length > 0) {
    return { seeded: false, count: manifest.contacts.length };
  }

  const stamp = nowIso();
  const contacts = OUTREACH_SEED_CONTACTS.map((row) =>
    normalizeContact({ ...row, createdAt: stamp, updatedAt: stamp }),
  );
  await writeManifest({ version: 1, contacts });
  return { seeded: true, count: contacts.length };
}
