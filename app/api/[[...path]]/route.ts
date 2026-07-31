import { SERVER_API_BASE } from "@/lib/api-server";

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

type Ctx = { params: Promise<{ path?: string[] }> };

async function proxyToBackend(req: Request, ctx: Ctx): Promise<Response> {
  const { path = [] } = await ctx.params;
  if (path.length === 0) {
    return Response.json(
      { error: "Missing API path. Use /api/v1/... or /api/orders/..." },
      { status: 404 },
    );
  }

  const incoming = new URL(req.url);
  const target = `${SERVER_API_BASE}/api/${path.join("/")}${incoming.search}`;

  const headers = new Headers();
  req.headers.forEach((value, key) => {
    if (!HOP_BY_HOP.has(key.toLowerCase())) {
      headers.set(key, value);
    }
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
    console.error("[api-proxy] upstream fetch failed", target, err);
    return Response.json(
      { error: "Backend unreachable", target },
      { status: 502 },
    );
  }

  const outHeaders = new Headers();
  upstream.headers.forEach((value, key) => {
    if (!HOP_BY_HOP.has(key.toLowerCase())) {
      outHeaders.set(key, value);
    }
  });
  outHeaders.set("x-noorlink-backend", "noorlink-automation");

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
