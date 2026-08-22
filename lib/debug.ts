/**
 * Toggleable debug logger for NoorLink frontend.
 *
 * Enable with NEXT_PUBLIC_DEBUG=1 in .env.local / Vercel,
 * or automatically in `next dev`.
 *
 * Usage: import { debug } from "@/lib/debug"; debug("checkout", "creating session", payload);
 */

type DebugArgs = unknown[];

const ENABLED =
  process.env.NEXT_PUBLIC_DEBUG === "1" ||
  process.env.NODE_ENV === "development";

function stamp(scope: string): string {
  const t = new Date().toISOString().slice(11, 23);
  return `[NoorLink ${t}] ${scope}`;
}

export function debug(scope: string, ...args: DebugArgs): void {
  if (!ENABLED) return;
  // eslint-disable-next-line no-console
  console.log(stamp(scope), ...args);
}

export function debugWarn(scope: string, ...args: DebugArgs): void {
  if (!ENABLED) return;
  // eslint-disable-next-line no-console
  console.warn(stamp(scope), ...args);
}

export function debugError(scope: string, ...args: DebugArgs): void {
  // Always surface errors — even in production — so failures are visible.
  // eslint-disable-next-line no-console
  console.error(stamp(scope), ...args);
}

export function isDebugEnabled(): boolean {
  return ENABLED;
}
