/**
 * Browser API base for noorlink-automation (Railway).
 *
 * Production: empty string → same-origin `/api/...`, proxied by
 * `app/api/[[...path]]/route.ts` to `BACKEND_API_URL` (https://api.noorlink.co).
 * Local: defaults to automation FastAPI on :8000 unless NEXT_PUBLIC_API_URL is set.
 */
export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL !== undefined
    ? process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "")
    : "http://127.0.0.1:8000";
