# NoorLink pSEO engine — CTO decisions

## Goal
Organic acquisition for travel eSIM without ad spend. Hubs rank for “eSIM + country” intent and convert into existing `/plans` → Stripe/PayPal checkout.

## Locked decisions

| Decision | Choice | Why |
| --- | --- | --- |
| Hub URL | `/esim/[slug]` | Search-intent path; `/destinations` stays browse UI |
| Commerce | CTA → `/plans/{slug}` (Saudi → `/hajj-umrah`) | Keep price/fulfillment on proven PDPs |
| Content store (v1) | Versioned seed in `lib/pseo/` | Edge/ISR friendly; TTFB without Supabase RTT |
| Content store (v2) | Supabase `pseo_destinations` | Editorial `is_indexed` batches; same schema |
| Locales | EN all 25; ES/AR only where demand | Not a blind ×3 URL multiply |
| Release | `is_indexed` gate in sitemap + `generateStaticParams` | Crawl-budget safe |
| ISR | Hubs `revalidate = 2592000` (30d); plans stay `300` | Fast hubs; fresh prices on PDP |
| Seed set | 25 countries (see `lib/pseo/seed.ts`) | Catalog-aligned |

## Performance targets
- Hub HTML from CDN/ISR (aim TTFB ≪ origin DB)
- No Supabase on the critical path for v1 page render
- Unique Layer-A fields required before `is_indexed = true`
- Wave A indexed first; B/C after impressions prove the template

## Waves
- **A (index first):** turkey, thailand, mexico, colombia, dominican-republic, egypt, uae, morocco, indonesia, costa-rica
- **B:** jamaica, bahamas, barbados, spain, italy, france, brazil, canada, saudi-arabia
- **C (competitive):** usa, japan, uk, germany, south-korea, australia

## Safety layers
A Variable-rich fields · B `is_indexed` · C canonical + hreflang · D 30-day ISR
