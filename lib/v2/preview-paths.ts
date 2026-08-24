/** Base path for storefront-v2 preview routes. Production uses "". */
export const PREVIEW_BASE = "/preview";

export function previewPath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return PREVIEW_BASE;
  return `${PREVIEW_BASE}${normalized}`;
}

export function productionPath(previewPathname: string): string {
  if (!previewPathname.startsWith(PREVIEW_BASE)) return previewPathname;
  const rest = previewPathname.slice(PREVIEW_BASE.length) || "/";
  return rest;
}
