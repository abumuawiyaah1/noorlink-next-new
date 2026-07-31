# Deploy NoorLink (Next.js + OpenNext) to Cloudflare

> **Stop using Cloudflare Pages for this app.**
>
> `@opennextjs/cloudflare` deploys to **Cloudflare Workers with static assets**.
> Classic Pages projects (including `noorlink-next-new` on the Pages API) publish
> as a **static site with no Function/Worker**, which causes:
> - blank / white screen in the browser
> - `wrangler pages deployment tail` error **8000098**
>   (“does not have a Pages Function… you cannot tail a static site”)

## Fix for error 8000098 / white screen

That error means Cloudflare deployed **static files only**. OpenNext never ran as a Worker.

### Do this instead

1. In the Cloudflare dashboard, **disconnect / stop Git builds** on the Pages project `noorlink-next-new` (Workers & Pages → Pages → project → Settings → Builds).
2. Create a **Worker** (or use Workers Builds) for this repo — not a Pages static deploy.
3. Deploy with OpenNext Workers commands (below). Do **not** run:
   - `wrangler pages deploy …`
   - `wrangler pages deployment tail …`
4. Point your custom domain at the **Worker**, then delete or leave the old Pages project unused.

### Correct commands

```bash
npm ci
npm run preview   # local Workers runtime — verify before going live
npm run deploy    # opennextjs-cloudflare build + deploy (Workers)
```

For logs after a Workers deploy:

```bash
npx wrangler tail noorlink-next-new
# NOT: wrangler pages deployment tail …
```

## Correct output mapping

| Role | Path | Configured in |
| --- | --- | --- |
| Server worker | `.open-next/worker.js` | `wrangler.jsonc` → `main` |
| Static assets + `/_next/static` chunks | `.open-next/assets` | `wrangler.jsonc` → `assets.directory` |
| Compatibility | `nodejs_compat` | `wrangler.jsonc` → `compatibility_flags` |

Produced by:

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

1. `npx wrangler login`
2. `npm run deploy`

Worker name in `wrangler.jsonc`: `noorlink-next-new`.

## Option B — Cloudflare Workers Builds (Git)

Create / open a **Worker** connected to this GitHub repo (Workers & Pages → Create → Worker, or Workers Builds).

**Build settings:**

| Setting | Value |
| --- | --- |
| Build command | `npx opennextjs-cloudflare build` |
| Deploy command | `npx opennextjs-cloudflare deploy` |
| Root directory | `/` (repo root) |
| Node.js version | `20` (or newer) |

Do **not** set a Pages “Build output directory”.  
Do **not** use the existing Pages project’s Git integration.

## Option C — GitHub Actions

Workflow: `.github/workflows/deploy-cloudflare.yml`

Add repository secrets:

- `CLOUDFLARE_API_TOKEN` — Workers deploy permissions
- `CLOUDFLARE_ACCOUNT_ID` — `1c303e0f0d31b0ad716155ceb6b2c9d2` (your account from the error URL)

Push to `main` (or run the workflow manually).

## Why Pages fails for this repo

OpenNext emits:

- `.open-next/worker.js` (Workers entry)
- `.open-next/assets` (static + `/_next` chunks)

Pages Git / `wrangler pages deploy` expects a Pages Functions layout (`_worker.js` / Functions).  
Without that, Cloudflare serves static files only → white screen + tail error 8000098.

Root `*.html` files are legacy sources only (`lib/legacy/pages/*`). Never set the Pages publish directory to the repo root.

## Useful scripts

| Script | Purpose |
| --- | --- |
| `npm run build:cf` | Build Next.js + OpenNext Worker bundle |
| `npm run preview` | Local Workers runtime preview |
| `npm run deploy` | Build + deploy to Cloudflare **Workers** |
| `npm run upload` | Build + upload version (gradual deployments) |
| `npm run tail` | Tail the **Worker** (`wrangler tail`) |
