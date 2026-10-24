# Localization — Spanish (LatAm) + Arabic (MSA)

**Status:** Full customer site UI wired for `/es` and `/ar` — ready for your walkthrough → then commit / go live.

## Covered (switcher + `/es` `/ar`)

- Header / footer / language switcher / RTL `dir` / global back button / WhatsApp FAB
- Home (hero through newsletter), including footer “Follow us”, pending prices, Umrah promo Insider links, ticker “Updated”
- Destinations, plans chrome, Hajj & Umrah selection chrome
- Checkout (incl. funnel steps, PayPal labels) + success + gift + review request
- Support, FAQ, before-you-fly + short help guides + landing-ready checklist
- My eSIMs lookup / install / top-up chrome
- About, Partners (apply/login), Partner dashboard crumbs
- Compare, Give, Learn (index + posts), Newsletter archive shell + unsubscribe
- Legal policies (terms, privacy, refund, cookies, KYC, partner terms) — full bodies in `lib/i18n/policies.ts`
- Order language → `metadata.locale` → fulfillment email subject
- Email strings in automation `i18n_messages.py`
- Spanish install phrasing standardized to **antes de viajar**; Arabic to **قبل السفر** (airplane mode `وضع الطيران` kept)

## Still English (by design or data)

- Trustpilot **quote** bodies (authentic reviews)
- Stripe / PayPal **hosted** payment UIs
- Catalog / content data not yet in dictionaries:
  - Hajj & Umrah **tier names**, route plan blurbs, benefits comparison table, inspiration gallery
  - Regional **hero taglines** / FAQ border answers / country list names
  - Destination card **titles & blurbs** (`destinations-catalog`)
  - “This week” search pills
- Insider **issue body** paragraphs (titles/kickers/CTAs localized; long article bodies still EN)
- Dynamic plan/country names and API error messages from the backend
- Some OS menu tokens kept inside translated install steps (e.g. “Data Roaming”)
- Brand line “Built by Muslims, for Muslims” on pilgrimage promo

## How to review locally

1. `npm run dev` (restart if middleware changed)
2. http://localhost:3000/es and http://localhost:3000/ar
3. Walk: Home → Destinations → Plan → Checkout → Success → Support → FAQ → Learn → Compare → Partners → Newsletter → a legal page (Privacy)
4. Flip language in the header; confirm URLs stay under `/es` or `/ar`
5. Spot-check wording you care about (especially “antes de viajar” / “قبل السفر”)

## After you approve

Say **commit** (site). Then push / deploy to make languages live.
