/**
 * Persist UTM + landing attribution through checkout (30-day window).
 */

const STORAGE_KEY = "noorlink_attribution";
const STORAGE_TS_KEY = "noorlink_attribution_at";
const ATTRIBUTION_MS = 30 * 24 * 60 * 60 * 1000;

export type MarketingAttribution = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  landingPath?: string;
  referrer?: string;
};

type StoredAttribution = MarketingAttribution & { at: number };

const UTM_KEYS = [
  ["utm_source", "utmSource"],
  ["utm_medium", "utmMedium"],
  ["utm_campaign", "utmCampaign"],
  ["utm_content", "utmContent"],
  ["utm_term", "utmTerm"],
] as const;

function readStored(): StoredAttribution | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    const atRaw = sessionStorage.getItem(STORAGE_TS_KEY);
    if (!raw || !atRaw) return null;
    const parsed = JSON.parse(raw) as MarketingAttribution;
    const at = Number.parseInt(atRaw, 10);
    if (!Number.isFinite(at)) return null;
    return { ...parsed, at };
  } catch {
    return null;
  }
}

export function rememberAttributionFromLocation(location?: Location): void {
  if (typeof window === "undefined") return;
  const target = location ?? window.location;
  const params = new URLSearchParams(target.search);
  const next: MarketingAttribution = {};
  let hasUtm = false;

  for (const [param, field] of UTM_KEYS) {
    const value = (params.get(param) ?? "").trim();
    if (!value) continue;
    next[field] = value.slice(0, 120);
    hasUtm = true;
  }

  if (hasUtm || !readStored()) {
    next.landingPath = `${target.pathname}${target.search}`.slice(0, 240);
    try {
      next.referrer = document.referrer.slice(0, 240);
    } catch {
      /* ignore */
    }
  }

  if (!hasUtm && !next.landingPath) return;

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    sessionStorage.setItem(STORAGE_TS_KEY, String(Date.now()));
  } catch {
    /* private mode */
  }
}

export function getRememberedAttribution(): MarketingAttribution | null {
  const stored = readStored();
  if (!stored) return null;
  if (Date.now() - stored.at > ATTRIBUTION_MS) {
    clearRememberedAttribution();
    return null;
  }
  const { at: _at, ...rest } = stored;
  return Object.keys(rest).length ? rest : null;
}

export function clearRememberedAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_TS_KEY);
  } catch {
    /* ignore */
  }
}

export function attributionPayloadForCheckout():
  | {
      utmSource?: string;
      utmMedium?: string;
      utmCampaign?: string;
      utmContent?: string;
      utmTerm?: string;
      landingPath?: string;
      referrer?: string;
    }
  | undefined {
  const data = getRememberedAttribution();
  if (!data) return undefined;
  return {
    utmSource: data.utmSource,
    utmMedium: data.utmMedium,
    utmCampaign: data.utmCampaign,
    utmContent: data.utmContent,
    utmTerm: data.utmTerm,
    landingPath: data.landingPath,
    referrer: data.referrer,
  };
}
