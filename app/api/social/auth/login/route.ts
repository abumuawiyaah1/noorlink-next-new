import { NextResponse } from "next/server";
import {
  createSocialHubSessionToken,
  getSocialHubSecrets,
  requireSocialHubAuthFromRequest,
  socialHubConfigured,
  socialHubSessionCookieOptions,
  verifySocialHubPassword,
} from "@/lib/social-hub-auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const secrets = await getSocialHubSecrets();
  if (!socialHubConfigured(secrets)) {
    return NextResponse.json(
      { error: "Social hub is not configured on the server." },
      { status: 503 },
    );
  }

  let password = "";
  try {
    const body = (await request.json()) as { password?: string };
    password = body.password?.trim() ?? "";
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!password || !(await verifySocialHubPassword(password))) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const token = await createSocialHubSessionToken();
  if (!token) {
    return NextResponse.json({ error: "Could not create session." }, { status: 500 });
  }

  const response = NextResponse.json({ ok: true });
  const cookie = socialHubSessionCookieOptions(token);
  response.cookies.set(cookie);
  return response;
}

export async function GET(request: Request) {
  const denied = await requireSocialHubAuthFromRequest(request);
  if (denied) return denied;
  return NextResponse.json({ ok: true });
}
