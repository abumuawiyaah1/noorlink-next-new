import { NextResponse } from "next/server";
import { requireSocialHubAuthFromRequest } from "@/lib/social-hub-auth";
import { OUTREACH_MESSAGE_TEMPLATES } from "@/lib/outreach-templates";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const denied = await requireSocialHubAuthFromRequest(request);
  if (denied) return denied;
  return NextResponse.json({ templates: OUTREACH_MESSAGE_TEMPLATES });
}
