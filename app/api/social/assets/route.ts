import { NextResponse } from "next/server";
import {
  getSocialHubSecrets,
  requireSocialHubAuthFromRequest,
  socialHubConfigured,
} from "@/lib/social-hub-auth";
import {
  createSocialAsset,
  listSocialAssets,
  socialStorageBackend,
} from "@/lib/social-hub-storage";
import { buildSocialStorageUsage } from "@/lib/social-hub-storage-quota";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const denied = await requireSocialHubAuthFromRequest(request);
  if (denied) return denied;

  const assets = await listSocialAssets();
  const backend = await socialStorageBackend();
  const storage = buildSocialStorageUsage(assets);
  return NextResponse.json({ assets, backend, storage });
}

export async function POST(request: Request) {
  const denied = await requireSocialHubAuthFromRequest(request);
  if (denied) return denied;

  const secrets = await getSocialHubSecrets();
  if (!socialHubConfigured(secrets)) {
    return NextResponse.json(
      { error: "Social hub is not configured on the server." },
      { status: 503 },
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid upload." }, { status: 400 });
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Choose a file to upload." }, { status: 400 });
  }

  try {
    const asset = await createSocialAsset({
      filename: file.name,
      contentType: file.type || "application/octet-stream",
      sizeBytes: file.size,
      bytes: await file.arrayBuffer(),
      partner: String(formData.get("partner") ?? ""),
      caption: String(formData.get("caption") ?? ""),
      notes: String(formData.get("notes") ?? ""),
    });
    return NextResponse.json({ asset }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
