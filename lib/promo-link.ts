/**
 * Carry Insider (and other) promo codes through destinations → plans → checkout.
 * Query string is the source of truth; sessionStorage survives mid-funnel navigations
 * that drop the param.
 */

const STORAGE_KEY = "noorlink_promo";

export function normalizePromoCode(code: string | null | undefined): string {
  return (code ?? "").trim().toUpperCase().replace(/\s+/g, "");
}

export function readPromoFromSearch(
  searchParams: { get: (key: string) => string | null } | URLSearchParams,
): string {
  return normalizePromoCode(
    searchParams.get("promo") ?? searchParams.get("code"),
  );
}

export function rememberPromo(code: string | null | undefined): void {
  if (typeof window === "undefined") return;
  const normalized = normalizePromoCode(code);
  if (!normalized) return;
  try {
    sessionStorage.setItem(STORAGE_KEY, normalized);
  } catch {
    /* private mode / blocked storage */
  }
}

export function getRememberedPromo(): string {
  if (typeof window === "undefined") return "";
  try {
    return normalizePromoCode(sessionStorage.getItem(STORAGE_KEY));
  } catch {
    return "";
  }
}

export function clearRememberedPromo(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

/** Prefer URL promo; otherwise fall back to session. Persists URL hits. */
export function resolvePromo(
  searchParams?: { get: (key: string) => string | null } | URLSearchParams | null,
): string {
  const fromUrl = searchParams ? readPromoFromSearch(searchParams) : "";
  if (fromUrl) {
    rememberPromo(fromUrl);
    return fromUrl;
  }
  return getRememberedPromo();
}

/** Append or replace `promo` on a path (relative or absolute). */
export function withPromo(
  href: string,
  promo?: string | null,
): string {
  const code = normalizePromoCode(promo);
  if (!code) return href;

  const hashIndex = href.indexOf("#");
  const hash = hashIndex >= 0 ? href.slice(hashIndex) : "";
  const withoutHash = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
  const qIndex = withoutHash.indexOf("?");
  const path = qIndex >= 0 ? withoutHash.slice(0, qIndex) : withoutHash;
  const params = new URLSearchParams(
    qIndex >= 0 ? withoutHash.slice(qIndex + 1) : "",
  );
  params.set("promo", code);
  return `${path}?${params.toString()}${hash}`;
}
