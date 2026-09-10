import { SERVER_API_BASE } from "@/lib/api-server";
import { rateLimitApiProxy } from "@/lib/api-rate-limit";
import { debug, debugError } from "@/lib/debug";

export const dynamic = "force-dynamic";

/**
 * Thin wrapper around backend promo validate.
 * Maps unexpected upstream 5xx into a checkout-safe `{ valid: false }` so
 * shoppers see a clear message instead of a raw Internal Server Error.
 */
export async function POST(req: Request) {
  const limited = await rateLimitApiProxy(req, "promo/validate");
  if (limited) return limited;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json(
      { valid: false, message: "Invalid promo request." },
      { status: 400 },
    );
  }

  const target = `${SERVER_API_BASE}/api/promo/validate`;
  debug("promo-validate", "POST →", target);

  let upstream: Response;
  try {
    upstream = await fetch(target, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch (err) {
    debugError("promo-validate", "upstream fetch failed", err);
    return Response.json(
      {
        valid: false,
        message:
          "Promo could not be checked right now. Try again, or continue without a code.",
      },
      { status: 200 },
    );
  }

  const raw = await upstream.text();
  let data: Record<string, unknown> = {};
  try {
    data = raw ? (JSON.parse(raw) as Record<string, unknown>) : {};
  } catch {
    data = {};
  }

  if (upstream.status >= 500) {
    debugError("promo-validate", "upstream 5xx", {
      status: upstream.status,
      body: raw.slice(0, 200),
    });
    return Response.json(
      {
        valid: false,
        message:
          "Promo could not be checked right now. Try again, or continue without a code.",
      },
      { status: 200 },
    );
  }

  return Response.json(data, { status: upstream.status });
}
