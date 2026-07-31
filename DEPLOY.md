# Deploy NoorLink (Next.js + OpenNext) to Cloudflare

> **Important:** `@opennextjs/cloudflare` deploys to **Cloudflare Workers with static assets**, not traditional Cloudflare Pages.
>
> Setting a Pages **Build output directory** to `.open-next` (or using `pages_build_output_dir`) is incorrect and causes the blank/white screen after deploy.

## Correct output mapping

| Role | Path | Configured in |
| --- | --- | --- |
| Server worker | `.open-next/worker.js` | `wrangler.jsonc` → `main` |
| Static assets + `/_next/static` chunks | `.open-next/assets` | `wrangler.jsonc` → `assets.directory` |
| Compatibility | `nodejs_compat` | `wrangler.jsonc` → `compatibility_flags` |

These paths are produced by:

```bash
npm run build:cf
# same as: npx opennextjs-cloudflare build
```

## Local verify (before going live)

```bash
npm ci
npm run preview
# open http://localhost:8787
```

Confirm:

1. HTML returns `200` for `/`
2. Scripts under `/_next/static/chunks/...` return `200`
3. No browser console 404s for CSS/JS

## Option A — Deploy from your machine

1. Log in once: `npx wrangler login`
2. Deploy: `npm run deploy`

## Option B — Cloudflare Workers Builds (Git)

In the Cloudflare dashboard, create / open a **Worker** (not a classic Pages static project) connected to this repo.

**Build settings:**

| Setting | Value |
| --- | --- |
| Build command | `npx opennextjs-cloudflare build` |
| Deploy command | `npx opennextjs-cloudflare deploy` |
| Root directory | `/` (repo root) |
| Node.js version | `20` (or newer) |

Do **not** set a Pages-style “Build output directory”. Wrangler reads `wrangler.jsonc` and publishes `.open-next/worker.js` + `.open-next/assets` automatically.

Compatibility flags (`nodejs_compat`, `global_fetch_strictly_public`) are already in `wrangler.jsonc`.

## Option C — GitHub Actions

Workflow: `.github/workflows/deploy-cloudflare.yml`

Add repository secrets:

- `CLOUDFLARE_API_TOKEN` — token with Workers deploy permissions
- `CLOUDFLARE_ACCOUNT_ID` — your account id

Push to `main` (or run the workflow manually).

## Why the white screen happened

1. `pages_build_output_dir: ".open-next"` was added (Pages + Workers conflict).
2. `wrangler.jsonc` was then removed entirely.
3. Without `main` + `assets` + `nodejs_compat`, Cloudflare never served the Next.js worker/chunks → blank page.

Root `*.html` files in the repo are legacy sources only (converted into `lib/legacy/pages/*`). They must not be used as the Cloudflare publish directory.

## Useful scripts

| Script | Purpose |
| --- | --- |
| `npm run build:cf` | Build Next.js + OpenNext Worker bundle |
| `npm run preview` | Local Workers runtime preview |
| `npm run deploy` | Build + deploy to Cloudflare |
| `npm run upload` | Build + upload version (gradual deployments) |
