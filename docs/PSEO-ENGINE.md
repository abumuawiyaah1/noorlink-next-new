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

## Hub strength layers (shipped)

| Layer | What |
| --- | --- |
| FAQ + FAQPage JSON-LD | Template FAQs per country (`lib/pseo/content.ts`); optional seed overrides |
| Airports / install | IATA map (`lib/pseo/airports.ts`) + install-before-land copy |
| Live “From” price | `fetchDestinationStartingPrices` on hub CTA |
| Related hubs | Same region first (`getRelatedIndexedPseo`) |
| Intent clusters | Before-you-fly, device check, Umrah prep (ME), destinations |
| Trust strip | Device check + Trustpilot profile |
| Schema | BreadcrumbList + FAQPage + Product/Offer |
| Internal discovery | `/esim` index, Destinations guides block, Plans hub link |

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

## Growth playbook (do this, not 10×20 thin waves)
1. Finish catalog-aligned countries (~90–95 sellable) in waves of ~12.
2. After each wave: GSC — rewrite weak CTR titles/intros before minting more URLs.
3. Locale depth on converters only (ES LatAm/Spain; AR Gulf).
4. Prefer intent clusters (`/learn`, `/help`) linking into hubs over doorway pages.
5. Cap expansion when catalog is covered; invest in refresh + internal links.

## Indexing status (GSC, mid‑Nov 2026)
- ~8 indexed / ~170 **Discovered – currently not indexed** (0 crawled-not-indexed).
- Indexed sample: home, `/es`, turkey (+ es/ar), mexico (+ es), `/kyc`.
- **Do not** flip Wave D until more A–C hubs leave “Discovered.”
- On-site crawl helps (shipped): homepage Wave A guide links, home footer → `/esim` + destinations, help → `/esim`, related hubs prefer Wave A (limit 8), sitemap priority A > B > C, index lists sort A→C.
- Manual: GSC URL Inspection on priority EN Wave A hubs + `/esim` / `/hajj-umrah` (sparingly).

## Safety layers
A Variable-rich fields · B `is_indexed` · C canonical + hreflang · D 30-day ISR · E FAQ/Offer JSON-LD
