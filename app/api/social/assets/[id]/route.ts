import { NextResponse } from "next/server";
import { requireSocialHubAuthFromRequest } from "@/lib/social-hub-auth";
import {
  deleteSocialAsset,
  getSocialAsset,
  getSocialAssetFile,
  updateSocialAsset,
} from "@/lib/social-hub-storage";
import type { SocialAssetStatus } from "@/lib/social-hub-types";
import { SOCIAL_ASSET_STATUSES } from "@/lib/social-hub-types";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ id: string }> };

function isStatus(value: unknown): value is SocialAssetStatus {
  return (
    typeof value === "string" &&
    (SOCIAL_ASSET_STATUSES as readonly string[]).includes(value)
  );
}

export async function GET(request: Request, ctx: RouteContext) {
  const denied = await requireSocialHubAuthFromRequest(request);
  if (denied) return denied;

  const { id } = await ctx.params;
  const asset = await getSocialAsset(id);
  if (!asset) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const file = await getSocialAssetFile(asset);
  if (!file) {
    return NextResponse.json({ error: "File missing." }, { status: 404 });
  }

  const download = new URL(request.url).searchParams.get("download") === "1";
  const headers = new Headers({
    "Content-Type": file.contentType,
    "Cache-Control": "private, max-age=3600",
  });
  if (download) {
    headers.set(
      "Content-Disposition",
      `attachment; filename="${asset.filename.replace(/"/g, "")}"`,
    );
  } else {
    headers.set("Content-Disposition", "inline");
  }

  return new NextResponse(file.body as BodyInit, { headers });
}

export async function PATCH(request: Request, ctx: RouteContext) {
  const denied = await requireSocialHubAuthFromRequest(request);
  if (denied) return denied;

  const { id } = await ctx.params;
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  if (body.status !== undefined && !isStatus(body.status)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  const asset = await updateSocialAsset(id, {
    status: isStatus(body.status) ? body.status : undefined,
    partner: typeof body.partner === "string" ? body.partner : undefined,
    caption: typeof body.caption === "string" ? body.caption : undefined,
    notes: typeof body.notes === "string" ? body.notes : undefined,
  });

  if (!asset) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
  return NextResponse.json({ asset });
}

export async function DELETE(request: Request, ctx: RouteContext) {
  const denied = await requireSocialHubAuthFromRequest(request);
  if (denied) return denied;

  const { id } = await ctx.params;
  const deleted = await deleteSocialAsset(id);
  if (!deleted) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
