import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import {
  assertStorageQuota,
  sumAssetBytes,
} from "@/lib/social-hub-storage-quota";
import type {
  SocialAsset,
  SocialAssetManifest,
  SocialAssetStatus,
} from "@/lib/social-hub-types";

const MANIFEST_KEY = "_meta/manifest.json";
const LOCAL_ROOT = path.join(process.cwd(), ".data", "social-hub");
const LOCAL_MANIFEST = path.join(LOCAL_ROOT, "manifest.json");
const LOCAL_FILES = path.join(LOCAL_ROOT, "files");

const ALLOWED_MIME_PREFIXES = ["image/", "video/"];
export const MAX_SOCIAL_UPLOAD_BYTES = 100 * 1024 * 1024;

function emptyManifest(): SocialAssetManifest {
  return { version: 1, assets: [] };
}

function sortAssets(assets: SocialAsset[]): SocialAsset[] {
  return [...assets].sort(
    (a, b) => Date.parse(b.uploadedAt) - Date.parse(a.uploadedAt),
  );
}

function sanitizeFilename(name: string): string {
  const base = name.replace(/[/\\]/g, "_").replace(/[^\w.\-() ]+/g, "_").trim();
  return base.slice(0, 120) || "upload";
}

function isAllowedMimeType(contentType: string): boolean {
  return ALLOWED_MIME_PREFIXES.some((prefix) => contentType.startsWith(prefix));
}

async function getR2Bucket(): Promise<R2Bucket | null> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    return (env as { SOCIAL_ASSETS?: R2Bucket }).SOCIAL_ASSETS ?? null;
  } catch {
    return null;
  }
}

async function ensureLocalDirs(): Promise<void> {
  await mkdir(LOCAL_FILES, { recursive: true });
}

async function readLocalManifest(): Promise<SocialAssetManifest> {
  await ensureLocalDirs();
  try {
    const raw = await readFile(LOCAL_MANIFEST, "utf8");
    return JSON.parse(raw) as SocialAssetManifest;
  } catch {
    return emptyManifest();
  }
}

async function writeLocalManifest(manifest: SocialAssetManifest): Promise<void> {
  await ensureLocalDirs();
  await writeFile(LOCAL_MANIFEST, JSON.stringify(manifest, null, 2), "utf8");
}

async function readManifest(): Promise<SocialAssetManifest> {
  const bucket = await getR2Bucket();
  if (!bucket) return readLocalManifest();

  const object = await bucket.get(MANIFEST_KEY);
  if (!object) return emptyManifest();
  return (await object.json()) as SocialAssetManifest;
}

async function writeManifest(manifest: SocialAssetManifest): Promise<void> {
  const bucket = await getR2Bucket();
  const body = JSON.stringify(manifest);
  if (!bucket) {
    await writeLocalManifest(manifest);
    return;
  }
  await bucket.put(MANIFEST_KEY, body, {
    httpMetadata: { contentType: "application/json" },
  });
}

function objectKey(assetId: string, filename: string): string {
  return `files/${assetId}/${filename}`;
}

function localFilePath(assetId: string, filename: string): string {
  return path.join(LOCAL_FILES, assetId, filename);
}

export async function listSocialAssets(): Promise<SocialAsset[]> {
  const manifest = await readManifest();
  return sortAssets(manifest.assets);
}

export async function getSocialAsset(id: string): Promise<SocialAsset | null> {
  const manifest = await readManifest();
  return manifest.assets.find((asset) => asset.id === id) ?? null;
}

export async function getSocialAssetFile(
  asset: SocialAsset,
): Promise<{ body: ReadableStream | ArrayBuffer; contentType: string } | null> {
  const bucket = await getR2Bucket();
  const key = objectKey(asset.id, asset.filename);

  if (bucket) {
    const object = await bucket.get(key);
    if (!object) return null;
    return {
      body: object.body,
      contentType: object.httpMetadata?.contentType ?? asset.contentType,
    };
  }

  try {
    const bytes = await readFile(localFilePath(asset.id, asset.filename));
    return {
      body: bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength),
      contentType: asset.contentType,
    };
  } catch {
    return null;
  }
}

type CreateSocialAssetInput = {
  filename: string;
  contentType: string;
  sizeBytes: number;
  bytes: ArrayBuffer;
  partner?: string;
  caption?: string;
  notes?: string;
};

export async function createSocialAsset(
  input: CreateSocialAssetInput,
): Promise<SocialAsset> {
  if (!isAllowedMimeType(input.contentType)) {
    throw new Error("Only image and video files are allowed.");
  }
  if (input.sizeBytes > MAX_SOCIAL_UPLOAD_BYTES) {
    throw new Error("File is too large (max 100 MB).");
  }

  const manifest = await readManifest();
  assertStorageQuota(sumAssetBytes(manifest.assets), input.sizeBytes);

  const now = new Date().toISOString();
  const id = crypto.randomUUID();
  const filename = sanitizeFilename(input.filename);
  const asset: SocialAsset = {
    id,
    filename,
    contentType: input.contentType,
    sizeBytes: input.sizeBytes,
    status: "new",
    partner: input.partner?.trim() ?? "",
    caption: input.caption?.trim() ?? "",
    notes: input.notes?.trim() ?? "",
    uploadedAt: now,
    updatedAt: now,
  };

  const bucket = await getR2Bucket();
  const key = objectKey(id, filename);
  if (bucket) {
    await bucket.put(key, input.bytes, {
      httpMetadata: { contentType: input.contentType },
    });
  } else {
    const dir = path.join(LOCAL_FILES, id);
    await mkdir(dir, { recursive: true });
    await writeFile(localFilePath(id, filename), Buffer.from(input.bytes));
  }

  manifest.assets.push(asset);
  await writeManifest(manifest);
  return asset;
}

type UpdateSocialAssetInput = {
  status?: SocialAssetStatus;
  partner?: string;
  caption?: string;
  notes?: string;
};

export async function updateSocialAsset(
  id: string,
  input: UpdateSocialAssetInput,
): Promise<SocialAsset | null> {
  const manifest = await readManifest();
  const index = manifest.assets.findIndex((asset) => asset.id === id);
  if (index < 0) return null;

  const current = manifest.assets[index];
  const updated: SocialAsset = {
    ...current,
    status: input.status ?? current.status,
    partner: input.partner !== undefined ? input.partner.trim() : current.partner,
    caption: input.caption !== undefined ? input.caption.trim() : current.caption,
    notes: input.notes !== undefined ? input.notes.trim() : current.notes,
    updatedAt: new Date().toISOString(),
  };
  manifest.assets[index] = updated;
  await writeManifest(manifest);
  return updated;
}

export async function deleteSocialAsset(id: string): Promise<boolean> {
  const manifest = await readManifest();
  const asset = manifest.assets.find((entry) => entry.id === id);
  if (!asset) return false;

  const bucket = await getR2Bucket();
  const key = objectKey(asset.id, asset.filename);
  if (bucket) {
    await bucket.delete(key);
  } else {
    await rm(path.join(LOCAL_FILES, asset.id), { recursive: true, force: true });
  }

  manifest.assets = manifest.assets.filter((entry) => entry.id !== id);
  await writeManifest(manifest);
  return true;
}

export async function socialStorageBackend(): Promise<"r2" | "local"> {
  const bucket = await getR2Bucket();
  return bucket ? "r2" : "local";
}
