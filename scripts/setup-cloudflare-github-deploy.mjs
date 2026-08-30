#!/usr/bin/env node
/**
 * GitHub Actions Cloudflare deploy setup helper.
 * Opens guidance and optionally saves CLOUDFLARE_ACCOUNT_ID.
 *
 * Usage: node scripts/setup-cloudflare-github-deploy.mjs
 */

import { execFileSync } from "node:child_process";
import { spawnSync } from "node:child_process";

const ACCOUNT_ID = "1c303e0f0d31b0ad716155ceb6b2c9d2";

function setAccountSecret() {
  execFileSync("gh", ["secret", "set", "CLOUDFLARE_ACCOUNT_ID", "--body", ACCOUNT_ID], {
    stdio: "inherit",
  });
}

function triggerDeploy() {
  spawnSync(
    "gh",
    ["workflow", "run", "Deploy to Cloudflare Workers (OpenNext)", "--ref", "main"],
    { stdio: "inherit" },
  );
}

console.log(`
NoorLink — GitHub Cloudflare deploy token setup
==============================================

1. Open: https://dash.cloudflare.com/profile/api-tokens
2. Create Token → use template **Edit Cloudflare Workers**
3. Account Resources → Include → your account
4. Create Token → copy it once

5. In GitHub repo secrets, set:
   CLOUDFLARE_API_TOKEN = (paste token)
   CLOUDFLARE_ACCOUNT_ID = ${ACCOUNT_ID}

Note: Custom domains stay in the Worker dashboard. CI only deploys code —
no Zone → Workers Routes permission needed.

After saving the token in GitHub, re-run this script with --deploy to test.
`);

const deploy = process.argv.includes("--deploy");
setAccountSecret();
console.log("Updated CLOUDFLARE_ACCOUNT_ID in GitHub.");

if (deploy) {
  console.log("Triggering GitHub Actions deploy...");
  triggerDeploy();
}
