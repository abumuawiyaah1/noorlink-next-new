#!/usr/bin/env node
/**
 * Apply NoorLink WAF rate limiting on noorlink.co (zone http_ratelimit phase).
 *
 * Free plan: 1 rate limiting rule only — we use one combined rule for all /api paths.
 *
 * Usage:
 *   CLOUDFLARE_API_TOKEN=... node scripts/setup-cloudflare-rate-limits.mjs
 *
 * Token needs: Zone → Zone → Read, Zone → Zone WAF → Edit (scoped to noorlink.co)
 *
 * Note: "Firewall Services Edit" alone is not enough for the Rulesets API.
 * Dashboard label: Zone WAF → Edit. API permission name: Zone WAF Write.
 */

const ZONE_NAME = process.env.CLOUDFLARE_ZONE_NAME || "noorlink.co";
const API_BASE = "https://api.cloudflare.com/client/v4";
const TOKEN = process.env.CLOUDFLARE_API_TOKEN || process.env.CF_API_TOKEN;

const RULE_PREFIX = "NoorLink:";
const COMBINED_DESCRIPTION = `${RULE_PREFIX} Sensitive API routes`;

/** Single rule for Free plan (max 1 rate limiting rule). */
const COMBINED_RULE = {
  description: COMBINED_DESCRIPTION,
  expression: [
    '(http.request.uri.path contains "/api/checkout")',
    '(http.request.uri.path contains "/api/promo")',
    '(http.request.uri.path eq "/api/contact")',
    '(http.request.uri.path contains "/api/orders")',
    '(http.request.uri.path contains "/api/newsletter")',
  ].join(" or "),
  requests_per_period: 60,
  period: 60,
  mitigation_timeout: 10,
};

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
      characteristics: ["ip.src"],
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
    throw new Error(`${init.method || "GET"} ${path}: ${msg}`);
  }
  return data;
}

async function main() {
  if (!TOKEN) {
    console.error("Missing CLOUDFLARE_API_TOKEN.");
    process.exit(1);
  }

  const verify = await cf("/user/tokens/verify");
  console.log(`Token valid (${verify.result?.status || "ok"})`);

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
    const msg = String(err.message);
    if (/entrypoint ruleset|404/i.test(msg)) {
      ruleset = null;
    } else if (/Authentication error/i.test(msg)) {
      console.log(
        "Entrypoint lookup unavailable; attempting direct ruleset create…",
      );
      ruleset = null;
    } else {
      throw err;
    }
  }

  const rulePayload = buildRule(COMBINED_RULE);

  if (!ruleset) {
    console.log("Creating http_ratelimit ruleset (1 combined rule for Free plan)…");
    let created;
    try {
      created = await cf(`/zones/${zone.id}/rulesets`, {
        method: "POST",
        body: JSON.stringify({
          name: "NoorLink rate limits",
          kind: "zone",
          phase: "http_ratelimit",
          rules: [rulePayload],
        }),
      });
    } catch (postErr) {
      if (!/Authentication error/i.test(String(postErr.message))) throw postErr;
      throw new Error(
        `${postErr.message}\n` +
          "Add API token permission: Zone → Zone WAF → Edit (not only Firewall Services). " +
          "Then roll the token and update CLOUDFLARE_WAF_API_TOKEN in GitHub.",
      );
    }
    console.log(`Created ruleset ${created.result.id} with combined API rule.`);
    return;
  }

  const existing = (ruleset.rules || []).find(
    (r) => r.description === COMBINED_DESCRIPTION,
  );
  if (existing) {
    console.log(`Skip (exists): ${COMBINED_DESCRIPTION}`);
    console.log("Done — combined rate limit rule already present.");
    return;
  }

  await cf(`/zones/${zone.id}/rulesets/${ruleset.id}/rules`, {
    method: "POST",
    body: JSON.stringify(rulePayload),
  });
  console.log(`Added: ${COMBINED_DESCRIPTION}`);
  console.log("Done — combined rate limit rule applied.");
}

main().catch((err) => {
  console.error("Failed:", err.message);
  process.exit(1);
});
