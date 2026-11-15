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
| Locales | EN all hubs; ES/AR only where demand | Not a blind ×3 URL multiply |
| Release | `is_indexed` gate in sitemap + `generateStaticParams` | Crawl-budget safe |
| ISR | Hubs `revalidate = 2592000` (30d); plans stay `300` | Fast hubs; fresh prices on PDP |
| Seed set | 57 countries (see `lib/pseo/seed.ts`) | Catalog-aligned |
| Growth cadence | ~12 hubs / week, quality-gated | Flip `isIndexed` only when copy is unique |

## Performance targets
- Hub HTML from CDN/ISR (aim TTFB ≪ origin DB)
- No Supabase on the critical path for v1 page render
- Unique Layer-A fields required before `is_indexed = true`
- Wave A + B + C indexed; Wave D staged for next deploy

## Waves
- **A (indexed):** turkey, thailand, mexico, colombia, dominican-republic, egypt, uae, morocco, indonesia, costa-rica
- **B (indexed):** jamaica, bahamas, barbados, spain, italy, france, brazil, canada, saudi-arabia
- **C (indexed):** usa, japan, uk, germany, south-korea, australia, portugal, greece, netherlands, switzerland, ireland, singapore, vietnam, india, philippines, malaysia, ghana, kenya, nigeria, south-africa, argentina, peru, chile, panama, qatar, jordan
- **D (staged — deploy next week):** kuwait, bahrain, oman, trinidad-and-tobago, aruba, puerto-rico, austria, belgium, poland, sweden, maldives, china

## Safety layers
A Variable-rich fields · B `is_indexed` · C canonical + hreflang · D 30-day ISR
