import { SERVER_API_BASE } from "@/lib/api-server";
import { debug, debugError } from "@/lib/debug";

export const dynamic = "force-dynamic";

const HOP_BY_HOP = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailers",
  "transfer-encoding",
  "upgrade",
  "host",
  "content-length",
]);

const ALLOWED_EXACT_PATHS = new Set(["contact"]);

const ALLOWED_PATH_PREFIXES = [
  "v1/plans",
  "v1/analytics/",
  "v1/devices/",
  "orders/",
  "checkout/",
  "promo/",
  "newsletter/",
];

const ALLOWED_REQUEST_HEADERS = new Set([
  "accept",
  "content-type",
  "accept-language",
]);

type Ctx = { params: Promise<{ path?: string[] }> };

function isAllowedApiPath(segments: string[]): boolean {
  if (segments.length === 0) return false;
  if (segments.some((segment) => !segment || segment === "." || segment === "..")) {
    return false;
  }
  const path = segments.join("/");
  if (ALLOWED_EXACT_PATHS.has(path)) return true;
  return ALLOWED_PATH_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(prefix),
  );
}

async function proxyToBackend(req: Request, ctx: Ctx): Promise<Response> {
  const { path = [] } = await ctx.params;
  if (!isAllowedApiPath(path)) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  const incoming = new URL(req.url);
  const target = `${SERVER_API_BASE}/api/${path.join("/")}${incoming.search}`;
  debug("api-proxy", `${req.method} →`, target);

  const headers = new Headers();
  req.headers.forEach((value, key) => {
    const lower = key.toLowerCase();
    if (HOP_BY_HOP.has(lower) || !ALLOWED_REQUEST_HEADERS.has(lower)) return;
    headers.set(key, value);
  });
  headers.set("accept", headers.get("accept") ?? "application/json");

  const init: RequestInit = {
    method: req.method,
    headers,
    redirect: "manual",
  };

  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = await req.arrayBuffer();
  }

  let upstream: Response;
  try {
    upstream = await fetch(target, init);
  } catch (err) {
    debugError("api-proxy", "upstream fetch failed", err);
    return Response.json(
      { error: "Backend unreachable" },
      { status: 502 },
    );
  }

  debug("api-proxy", "upstream status", {
    method: req.method,
    path: path.join("/"),
    status: upstream.status,
  });

  const outHeaders = new Headers();
  upstream.headers.forEach((value, key) => {
    if (!HOP_BY_HOP.has(key.toLowerCase())) {
      outHeaders.set(key, value);
    }
  });

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: outHeaders,
  });
}

export const GET = proxyToBackend;
export const POST = proxyToBackend;
export const PUT = proxyToBackend;
export const PATCH = proxyToBackend;
export const DELETE = proxyToBackend;
export const HEAD = proxyToBackend;
export const OPTIONS = proxyToBackend;
