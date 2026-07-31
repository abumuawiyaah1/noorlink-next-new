This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Cloudflare (OpenNext)

This app must deploy as a **Cloudflare Worker** via OpenNext — **not** as a Cloudflare Pages static project.

If you see Pages error `8000098` (“does not have a Pages Function… cannot tail a static site”) or a blank page, you are still on Pages. Follow the migration steps in [DEPLOY.md](./DEPLOY.md).

```bash
npm run preview   # local Workers runtime preview
npm run deploy    # build + deploy to Cloudflare Workers
npm run tail      # live Worker logs (not pages deployment tail)
```

#Noorlink Test.
 
