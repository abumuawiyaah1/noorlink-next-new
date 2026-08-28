type RateLimitRule = {
  prefix: string;
  limit: number;
  windowSeconds: number;
};

const SENSITIVE_API_RULES: RateLimitRule[] = [
  { prefix: "checkout/", limit: 15, windowSeconds: 60 },
  { prefix: "promo/", limit: 30, windowSeconds: 60 },
  { prefix: "contact", limit: 5, windowSeconds: 3600 },
  { prefix: "orders/", limit: 40, windowSeconds: 60 },
  { prefix: "newsletter/", limit: 10, windowSeconds: 3600 },
];

function clientIp(request: Request): string {
  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

function ruleForPath(apiPath: string): RateLimitRule | null {
  return SENSITIVE_API_RULES.find(
    (rule) => apiPath === rule.prefix || apiPath.startsWith(rule.prefix),
  ) ?? null;
}

function edgeCache(): Cache | null {
  const storage = caches as CacheStorage & { default?: Cache };
  return storage.default ?? null;
}

async function countInWindow(
  key: string,
  windowSeconds: number,
): Promise<number> {
  const cache = edgeCache();
  if (!cache) return 0;
  const cacheKey = new Request(`https://noorlink.internal/ratelimit/${key}`);
  const hit = await cache.match(cacheKey);
  if (!hit) return 0;
  const raw = await hit.text();
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) ? parsed : 0;
}

async function incrementWindow(
  key: string,
  windowSeconds: number,
): Promise<number> {
  const cache = edgeCache();
  if (!cache) return 0;
  const cacheKey = new Request(`https://noorlink.internal/ratelimit/${key}`);
  const next = (await countInWindow(key, windowSeconds)) + 1;
  const putWithTtl = cache.put.bind(cache) as unknown as (
    key: Request,
    response: Response,
    options?: { expirationTtl?: number },
  ) => Promise<void>;
  await putWithTtl(cacheKey, new Response(String(next)), {
    expirationTtl: windowSeconds,
  });
  return next;
}

/**
 * Edge rate limit for proxied /api routes (Cloudflare Cache API).
 * No-op when Cache API is unavailable (e.g. plain Node dev server).
 */
export async function rateLimitApiProxy(
  request: Request,
  apiPath: string,
): Promise<Response | null> {
  const rule = ruleForPath(apiPath);
  if (!rule) return null;

  const windowBucket = Math.floor(Date.now() / (rule.windowSeconds * 1000));
  const key = `${clientIp(request)}:${rule.prefix}:${windowBucket}`;
  const count = await incrementWindow(key, rule.windowSeconds);

  if (count > rule.limit) {
    return Response.json(
      { error: "Too many requests. Please wait a moment and try again." },
      {
        status: 429,
        headers: {
          "Retry-After": String(rule.windowSeconds),
        },
      },
    );
  }

  return null;
}
