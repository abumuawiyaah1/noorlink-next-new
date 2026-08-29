/**
 * Carry affiliate / referral codes (?ref=) through the funnel.
 * Persists for 30 days (last-click within window).
 */

import { withPromo } from "@/lib/promo-link";

const STORAGE_KEY = "noorlink_ref";
const STORAGE_TS_KEY = "noorlink_ref_at";
const ATTRIBUTION_MS = 30 * 24 * 60 * 60 * 1000;

export function normalizeRefCode(code: string | null | undefined): string {
  return (code ?? "").trim().toUpperCase().replace(/[^A-Z0-9-]/g, "").slice(0, 32);
}

export function readRefFromSearch(
  searchParams: { get: (key: string) => string | null } | URLSearchParams,
): string {
  return normalizeRefCode(searchParams.get("ref"));
}

function readStoredRef(): { code: string; at: number } | null {
  if (typeof window === "undefined") return null;
  try {
    const code = normalizeRefCode(sessionStorage.getItem(STORAGE_KEY));
    const raw = sessionStorage.getItem(STORAGE_TS_KEY);
    const at = raw ? Number.parseInt(raw, 10) : 0;
    if (!code || !Number.isFinite(at)) return null;
    return { code, at };
  } catch {
    return null;
  }
}

export function rememberRef(code: string | null | undefined): void {
  if (typeof window === "undefined") return;
  const normalized = normalizeRefCode(code);
  if (!normalized) return;
  try {
    sessionStorage.setItem(STORAGE_KEY, normalized);
    sessionStorage.setItem(STORAGE_TS_KEY, String(Date.now()));
  } catch {
    /* private mode */
  }
}

export function getRememberedRef(): string {
  const stored = readStoredRef();
  if (!stored) return "";
  if (Date.now() - stored.at > ATTRIBUTION_MS) {
    clearRememberedRef();
    return "";
  }
  return stored.code;
}

export function clearRememberedRef(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_TS_KEY);
  } catch {
    /* ignore */
  }
}

/** Prefer URL ref (last click); fall back to session within 30 days. */
export function resolveRef(
  searchParams?: { get: (key: string) => string | null } | URLSearchParams | null,
): string {
  const fromUrl = searchParams ? readRefFromSearch(searchParams) : "";
  if (fromUrl) {
    rememberRef(fromUrl);
    return fromUrl;
  }
  return getRememberedRef();
}

export function withRef(href: string, ref?: string | null): string {
  const code = normalizeRefCode(ref);
  if (!code) return href;

  const hashIndex = href.indexOf("#");
  const hash = hashIndex >= 0 ? href.slice(hashIndex) : "";
  const withoutHash = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
  const qIndex = withoutHash.indexOf("?");
  const path = qIndex >= 0 ? withoutHash.slice(0, qIndex) : withoutHash;
  const params = new URLSearchParams(
    qIndex >= 0 ? withoutHash.slice(qIndex + 1) : "",
  );
  params.set("ref", code);
  return `${path}?${params.toString()}${hash}`;
}

/** Append promo + referral params when present. */
export function withAttribution(
  href: string,
  opts?: { promo?: string | null; ref?: string | null },
): string {
  let out = href;
  if (opts?.promo) out = withPromo(out, opts.promo);
  if (opts?.ref) out = withRef(out, opts.ref);
  return out;
}
