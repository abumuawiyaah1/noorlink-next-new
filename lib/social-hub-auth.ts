import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { SOCIAL_HUB_COOKIE } from "@/lib/social-hub-constants";

export { SOCIAL_HUB_COOKIE };
const SESSION_VERSION = 1;
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 14;

type SessionPayload = {
  v: number;
  exp: number;
};

type SocialHubSecrets = {
  password: string;
  sessionSecret: string;
};

function readProcessSecrets(): SocialHubSecrets {
  return {
    password: process.env.SOCIAL_HUB_PASSWORD?.trim() ?? "",
    sessionSecret: process.env.SOCIAL_HUB_SESSION_SECRET?.trim() ?? "",
  };
}

export async function getSocialHubSecrets(): Promise<SocialHubSecrets> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const fromWorker = {
      password:
        (env as { SOCIAL_HUB_PASSWORD?: string }).SOCIAL_HUB_PASSWORD?.trim() ??
        "",
      sessionSecret:
        (env as { SOCIAL_HUB_SESSION_SECRET?: string }).SOCIAL_HUB_SESSION_SECRET?.trim() ??
        "",
    };
    const fromProcess = readProcessSecrets();
    return {
      password: fromWorker.password || fromProcess.password,
      sessionSecret: fromWorker.sessionSecret || fromProcess.sessionSecret,
    };
  } catch {
    return readProcessSecrets();
  }
}

export function socialHubConfigured(secrets: SocialHubSecrets): boolean {
  return Boolean(secrets.password && secrets.sessionSecret);
}

function signPayload(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function encodeSession(payload: SessionPayload, secret: string): string {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${signPayload(body, secret)}`;
}

function decodeSession(
  token: string,
  secret: string,
): SessionPayload | null {
  const [body, signature] = token.split(".");
  if (!body || !signature) return null;

  const expected = signPayload(body, secret);
  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(body, "base64url").toString("utf8"),
    ) as SessionPayload;
    if (payload.v !== SESSION_VERSION) return null;
    if (typeof payload.exp !== "number" || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function createSocialHubSessionToken(): Promise<string | null> {
  const secrets = await getSocialHubSecrets();
  if (!socialHubConfigured(secrets)) return null;

  const payload: SessionPayload = {
    v: SESSION_VERSION,
    exp: Date.now() + SESSION_MAX_AGE_SECONDS * 1000,
  };
  return encodeSession(payload, secrets.sessionSecret);
}

export async function verifySocialHubSessionToken(
  token: string | undefined,
): Promise<boolean> {
  if (!token) return false;
  const secrets = await getSocialHubSecrets();
  if (!socialHubConfigured(secrets)) return false;
  return decodeSession(token, secrets.sessionSecret) !== null;
}

export async function verifySocialHubPassword(
  password: string,
): Promise<boolean> {
  const secrets = await getSocialHubSecrets();
  if (!socialHubConfigured(secrets)) return false;

  const given = Buffer.from(password);
  const expected = Buffer.from(secrets.password);
  if (given.length !== expected.length) return false;
  return timingSafeEqual(given, expected);
}

export function socialHubSessionCookieOptions(token: string) {
  return {
    name: SOCIAL_HUB_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  };
}

export async function isSocialHubAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SOCIAL_HUB_COOKIE)?.value;
  return verifySocialHubSessionToken(token);
}

export async function requireSocialHubAuth(): Promise<NextResponse | null> {
  const authed = await isSocialHubAuthenticated();
  if (authed) return null;
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export function readSocialHubCookie(request: Request): string | undefined {
  const header = request.headers.get("cookie");
  if (!header) return undefined;
  const match = header
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${SOCIAL_HUB_COOKIE}=`));
  if (!match) return undefined;
  return decodeURIComponent(match.slice(SOCIAL_HUB_COOKIE.length + 1));
}

export async function requireSocialHubAuthFromRequest(
  request: Request,
): Promise<NextResponse | null> {
  const token = readSocialHubCookie(request);
  const authed = await verifySocialHubSessionToken(token);
  if (authed) return null;
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
