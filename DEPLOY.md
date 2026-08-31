# Deploy NoorLink (Next.js + OpenNext) to Cloudflare

> **Stop using Cloudflare Pages for this app.**
>
> `@opennextjs/cloudflare` deploys to **Cloudflare Workers with static assets**.
> Classic Pages projects (including `noorlink-next-new` on the Pages API) publish
> as a **static site with no Function/Worker**, which causes:
> - blank / white screen in the browser
> - `wrangler pages deployment tail` error **8000098**
>   (“does not have a Pages Function… you cannot tail a static site”)

## Backend API (already live)

The FastAPI backend is at **https://api.noorlink.co** (Railway).

Browser calls are **same-origin** (`/api/...`) and proxied by `app/api/[[...path]]/route.ts` to Railway. That avoids CORS blocks between `noorlink.co` and `api.noorlink.co`.

| Variable | Purpose | Production value |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | Browser base (empty = same-origin `/api`) | _(empty)_ |
| `BACKEND_API_URL` | Worker/proxy → Railway | `https://api.noorlink.co` |
| `NEXT_PUBLIC_TAWK_PROPERTY_ID` | Tawk.to property ID (optional live chat) | _(empty until configured)_ |
| `NEXT_PUBLIC_TAWK_WIDGET_ID` | Tawk.to widget ID (optional live chat) | _(empty until configured)_ |

Set in:

- `.env.production` (build-time)
- `wrangler.jsonc` → `vars.BACKEND_API_URL` (runtime)

Local default remains `http://127.0.0.1:8000` when `NEXT_PUBLIC_API_URL` is unset.

## Attach custom domain (`noorlink.co`)

Worker URL: `https://noorlink-next-new.jibnjorge-1c3.workers.dev`

Attach domains in the dashboard (after DNS is clean), not while Netlify DNS leftovers remain:

**Workers & Pages → Worker `noorlink-next-new` → Settings → Domains & Routes → Add Custom Domain**

- `noorlink.co`
- `www.noorlink.co`

### Cutover checklist (Netlify fully gone)

Removing the domain from the Netlify **site** is not enough if Cloudflare DNS still points at Netlify.

1. Netlify → Domain management → confirm `noorlink.co` / `www` are gone.
2. Cloudflare → **DNS** for `noorlink.co` → delete any record that mentions Netlify, e.g.:
   - CNAME → `*.netlify.app`
   - A/AAAA that Netlify created
3. Confirm with:
   ```bash
   curl -sI https://noorlink.co | rg -i 'x-nf|netlify|x-opennext'
   ```
   You must **not** see `x-nf-request-id`.
4. Redeploy Worker (Workers Builds or `npm run deploy`).
5. Add Custom Domains in the Worker dashboard (step above).
6. Verify:
   - https://noorlink-next-new.jibnjorge-1c3.workers.dev → `x-opennext: 1`
   - https://noorlink.co → `x-opennext: 1`
   - https://api.noorlink.co → still Railway

### If `www` won’t add in the dashboard

After Pages / a failed Wrangler custom-domain attempt, Cloudflare often leaves an
**orphaned Workers-managed DNS record** for `www`. Symptoms:

- UI: “A DNS record managed by Workers already exists on that host.”
- Search: “No domains or routes match www.noorlink.co”
- `dig www.noorlink.co` fails / does not resolve
- You cannot create a manual CNAME for `www`

**Fix the orphan**

1. Worker `noorlink-next-new` → **Settings → Domains & Routes**
2. Scroll the full list (don’t rely on search) → delete anything for `www.noorlink.co`
3. DNS → Records → look for `www` with a Workers/managed lock → if Delete is available, remove it
4. Wait 1–2 minutes

**Then use a Redirect Rule (recommended — apex already works)**

Cloudflare dashboard → **Rules → Redirect Rules → Create**:

| Field | Value |
| --- | --- |
| If | Hostname equals `www.noorlink.co` |
| Then | Dynamic redirect → `concat("https://noorlink.co", http.request.uri.path)` |
| Status | 301 |
| Preserve query string | On |

That sends all `www` traffic to https://noorlink.co without needing a Worker custom domain for `www`.

**Do not** re-add `www` via `wrangler.jsonc` `custom_domain` — it caused `workers.dev` error **1042**.

If `workers.dev` shows **error 1042**, redeploy after removing wrangler custom-domain routes (apex dashboard domain can stay).

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

Create / open a **Worker** connected to this GitHub repo  
(Workers & Pages → **Create** → **Worker**, or open an existing **Worker** → Settings → Builds).

Do **not** use the Pages project settings screen that only has:

- Build command  
- Build output  
- Root directory  
- Build comments  

That Pages form has **no Deploy command** and will publish a static site → white screen + error `8000098`.

### Correct Workers Builds fields

| Field | Value |
| --- | --- |
| **Build command** | `npx opennextjs-cloudflare build` |
| **Deploy command** | `npx opennextjs-cloudflare deploy` |
| **Root directory** | leave empty (repo root) or `/` |
| **Build output / output directory** | leave **empty** (never `.open-next`, never `.next`) |
| **Node.js version** | `20` or newer |

Wrangler reads `wrangler.jsonc` and deploys:

- worker: `.open-next/worker.js`
- assets: `.open-next/assets`

### If you only see Pages fields (no Deploy command)

You are still editing the **Pages** project `noorlink-next-new`. Stop that build, create/connect a **Worker** instead, then use the table above.

## Option C — GitHub Actions

Workflow: `.github/workflows/deploy-cloudflare.yml`

Add repository secrets:

- `CLOUDFLARE_API_TOKEN` — use Cloudflare template **Edit Cloudflare Workers** (Account → **Workers Scripts** → Edit). Custom domains are managed in the dashboard, so you do **not** need Zone → Workers Routes in the token.
- `CLOUDFLARE_ACCOUNT_ID` — `1c303e0f0d31b0ad716155ceb6b2c9d2`

Push to `main` (or run the workflow manually).

To refresh secrets from a machine already logged in with Wrangler:

```bash
node scripts/setup-cloudflare-github-deploy.mjs
```

That script prints the exact dashboard steps if auto-setup is unavailable.

## Why Pages fails for this repo

OpenNext emits:

- `.open-next/worker.js` (Workers entry)
- `.open-next/assets` (static + `/_next` chunks)

Pages Git / `wrangler pages deploy` expects a Pages Functions layout (`_worker.js` / Functions).  
Without that, Cloudflare serves static files only → white screen + tail error 8000098.

Root `*.html` files are legacy sources only (`lib/legacy/pages/*`). Never set the Pages publish directory to the repo root.

## Social toolkit (admin dashboard)

Social media library, captions, and Meta links live in the **backend admin** — not on the public site.

| URL | Purpose |
| --- | --- |
| https://api.noorlink.co/admin | Team sign-in |
| https://api.noorlink.co/admin/social-media | Partner media, captions, Meta links |

`/social` and `/team` on noorlink.co redirect to the admin dashboard.

See `noorlink-automation/docs/SOCIAL-MEDIA-HUB.md` for Storage bucket setup.

### Legacy: Cloudflare R2 on the website (optional / deprecated)

The Next.js `/api/social/*` routes and R2 binding were an interim approach. Prefer the admin hub above. If you still use R2 secrets on the Worker, they can be removed after cutover.

## Useful scripts

| Script | Purpose |
| --- | --- |
| `npm run build:cf` | Build Next.js + OpenNext Worker bundle |
| `npm run preview` | Local Workers runtime preview |
| `npm run deploy` | Build + deploy to Cloudflare **Workers** |
| `npm run upload` | Build + upload version (gradual deployments) |
| `npm run tail` | Tail the **Worker** (`wrangler tail`) |
