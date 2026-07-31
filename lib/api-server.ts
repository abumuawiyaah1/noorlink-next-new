/**
 * Server-only base URL for noorlink-automation (Railway).
 * Used by Route Handlers / SSR — never expose secrets here; this is the public API origin.
 */
export const SERVER_API_BASE =
  process.env.BACKEND_API_URL?.replace(/\/$/, "") ??
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ??
  "http://127.0.0.1:8000";
