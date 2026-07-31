import { SERVER_API_BASE } from "@/lib/api-server";

export const dynamic = "force-dynamic";

/**
 * Same-origin health check → Railway noorlink-automation `/health`.
 * Adds frontend wiring metadata so it's obvious which backend we use.
 */
export async function GET() {
  const backend = SERVER_API_BASE;
  try {
    const res = await fetch(`${backend}/health`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    const upstream = (await res.json()) as Record<string, unknown>;
    return Response.json(
      {
        ...upstream,
        frontend: "noorlink-next-new",
        backendRepo: "noorlink-automation",
        backendUrl: backend,
        proxy: "Browser → /api/* → BACKEND_API_URL (Railway)",
        connected: res.ok,
      },
      {
        status: res.status,
        headers: {
          "content-type": "application/json",
          "x-noorlink-backend": "noorlink-automation",
        },
      },
    );
  } catch (err) {
    console.error("[api-health] backend unreachable", err);
    return Response.json(
      {
        status: "unreachable",
        service: "noorlink-automation",
        frontend: "noorlink-next-new",
        backendRepo: "noorlink-automation",
        backendUrl: backend,
        proxy: "Browser → /api/* → BACKEND_API_URL (Railway)",
        connected: false,
      },
      { status: 502 },
    );
  }
}
