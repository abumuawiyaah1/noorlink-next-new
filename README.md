# NoorLink Next (storefront)

Frontend for [noorlink.co](https://noorlink.co). Backend is **[noorlink-automation](https://github.com/abumuawiyaah1/noorlink-automation)** on Railway (`https://api.noorlink.co`).

## Architecture

```
Browser (noorlink.co)
  │
  │  same-origin /api/*
  ▼
Next.js Worker (this repo)
  │  BACKEND_API_URL
  ▼
noorlink-automation (Railway / api.noorlink.co)
  │
  ▼
Supabase + Stripe + Resend
```

| Layer | Repo / URL |
| --- | --- |
| Frontend | `abumuawiyaah1/noorlink-next-new` → Cloudflare Worker |
| Backend | `abumuawiyaah1/noorlink-automation` → `https://api.noorlink.co` |

Browser never calls Railway cross-origin. It calls `/api/...`, and `app/api/[[...path]]/route.ts` proxies to automation.

Verify: `curl https://noorlink.co/api/health` → `"service":"noorlink-automation"`, `"connected":true`.

## Env

| Variable | Purpose | Production |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | Browser API base (empty = same-origin `/api`) | _(empty)_ |
| `BACKEND_API_URL` | Worker/proxy → automation | `https://api.noorlink.co` |

See `.env.example`, `.env.production`, and `wrangler.jsonc`.

## Local

```bash
npm run dev
```

With automation local on `:8000`, leave `NEXT_PUBLIC_API_URL` unset (defaults to `http://127.0.0.1:8000`). Or set `NEXT_PUBLIC_API_URL=` and `BACKEND_API_URL=http://127.0.0.1:8000` to exercise the proxy.

## Deploy (Cloudflare Workers — not Pages)

```bash
npm run preview   # local Workers preview
npm run deploy    # OpenNext build + Wrangler deploy
npm run tail      # Worker logs
```

Full cutover notes: [DEPLOY.md](./DEPLOY.md).
