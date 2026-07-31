import { SERVER_API_BASE } from "@/lib/api-server";

export const dynamic = "force-dynamic";

/** Same-origin health check → Railway `/health` (avoids browser CORS). */
export async function GET() {
  try {
    const res = await fetch(`${SERVER_API_BASE}/health`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    const body = await res.text();
    return new Response(body, {
      status: res.status,
      headers: {
        "content-type": res.headers.get("content-type") ?? "application/json",
      },
    });
  } catch (err) {
    console.error("[api-health] backend unreachable", err);
    return Response.json({ status: "unreachable" }, { status: 502 });
  }
}
