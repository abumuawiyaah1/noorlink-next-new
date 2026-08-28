#!/usr/bin/env node
/**
 * Apply NoorLink WAF rate limiting rules on noorlink.co (zone-level http_ratelimit).
 *
 * Usage:
 *   CLOUDFLARE_API_TOKEN=... node scripts/setup-cloudflare-rate-limits.mjs
 *
 * Token needs: Zone → Zone → Read, Zone → Firewall Services → Edit
 */

const ZONE_NAME = process.env.CLOUDFLARE_ZONE_NAME || "noorlink.co";
const API_BASE = "https://api.cloudflare.com/client/v4";
const TOKEN = process.env.CLOUDFLARE_API_TOKEN || process.env.CF_API_TOKEN;

const RULE_PREFIX = "NoorLink:";

/** @type {Array<{description: string, expression: string, requests_per_period: number, period: number, mitigation_timeout: number}>} */
const RULES = [
  {
    description: `${RULE_PREFIX} Checkout API`,
    expression: '(http.request.uri.path contains "/api/checkout")',
    requests_per_period: 15,
    period: 60,
    mitigation_timeout: 300,
  },
  {
    description: `${RULE_PREFIX} Promo validate`,
    expression: '(http.request.uri.path contains "/api/promo")',
    requests_per_period: 30,
    period: 60,
    mitigation_timeout: 300,
  },
  {
    description: `${RULE_PREFIX} Contact form`,
    expression: '(http.request.uri.path eq "/api/contact")',
    requests_per_period: 5,
    period: 3600,
    mitigation_timeout: 3600,
  },
  {
    description: `${RULE_PREFIX} Order lookup`,
    expression: '(http.request.uri.path contains "/api/orders")',
    requests_per_period: 40,
    period: 60,
    mitigation_timeout: 300,
  },
  {
    description: `${RULE_PREFIX} Newsletter`,
    expression: '(http.request.uri.path contains "/api/newsletter")',
    requests_per_period: 10,
    period: 3600,
    mitigation_timeout: 3600,
  },
];

function buildRule(def) {
  return {
    description: def.description,
    expression: def.expression,
    action: "block",
    enabled: true,
    action_parameters: {
      response: {
        status_code: 429,
        content: JSON.stringify({
          error: "Too many requests. Please wait a moment and try again.",
        }),
        content_type: "application/json",
      },
    },
    ratelimit: {
      characteristics: ["cf.colo.id", "ip.src"],
      period: def.period,
      requests_per_period: def.requests_per_period,
      mitigation_timeout: def.mitigation_timeout,
    },
  };
}

async function cf(path, init = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.success === false) {
    const msg =
      data.errors?.map((e) => e.message).join("; ") ||
      `${res.status} ${res.statusText}`;
    throw new Error(msg);
  }
  return data;
}

async function main() {
  if (!TOKEN) {
    console.error(
      "Missing CLOUDFLARE_API_TOKEN (needs Zone Read + Firewall Services Edit).",
    );
    process.exit(1);
  }

  const zones = await cf(`/zones?name=${encodeURIComponent(ZONE_NAME)}`);
  const zone = zones.result?.[0];
  if (!zone?.id) {
    throw new Error(`Zone not found: ${ZONE_NAME}`);
  }
  console.log(`Zone ${ZONE_NAME} → ${zone.id}`);

  let ruleset;
  try {
    const entry = await cf(
      `/zones/${zone.id}/rulesets/phases/http_ratelimit/entrypoint`,
    );
    ruleset = entry.result;
  } catch (err) {
    if (!String(err.message).includes("404")) throw err;
    ruleset = null;
  }

  if (!ruleset) {
    console.log("Creating http_ratelimit entry ruleset…");
    const created = await cf(`/zones/${zone.id}/rulesets`, {
      method: "POST",
      body: JSON.stringify({
        name: "NoorLink rate limits",
        kind: "zone",
        phase: "http_ratelimit",
        rules: RULES.map(buildRule),
      }),
    });
    console.log(`Created ruleset ${created.result.id} with ${RULES.length} rules.`);
    return;
  }

  const existing = new Set(
    (ruleset.rules || []).map((r) => r.description).filter(Boolean),
  );
  let added = 0;

  for (const def of RULES) {
    if (existing.has(def.description)) {
      console.log(`Skip (exists): ${def.description}`);
      continue;
    }
    await cf(`/zones/${zone.id}/rulesets/${ruleset.id}/rules`, {
      method: "POST",
      body: JSON.stringify(buildRule(def)),
    });
    console.log(`Added: ${def.description}`);
    added += 1;
  }

  console.log(
    added
      ? `Done — ${added} rule(s) added to ruleset ${ruleset.id}.`
      : `Done — all ${RULES.length} NoorLink rules already present.`,
  );
}

main().catch((err) => {
  console.error("Failed:", err.message);
  process.exit(1);
});
