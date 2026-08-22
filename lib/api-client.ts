import { debug } from "@/lib/debug";

/** Client-side API base.
 * Production: empty → same-origin `/api/...` (proxied by app/api to Railway).
 * Local: defaults to FastAPI on :8000 unless NEXT_PUBLIC_API_URL is set.
 */
export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL !== undefined
    ? process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "")
    : "http://127.0.0.1:8000";

debug("api-client", "API_BASE resolved", {
  API_BASE: API_BASE || "(same-origin)",
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL ?? "(unset)",
});
