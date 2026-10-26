# Localization — Spanish (LatAm) + Arabic (MSA)

**Status:** Official live locales — **en** (default), **es** (LatAm), **ar** (MSA). Customer UI + deep content shipped on `main`.

## Covered (switcher + `/es` `/ar`)

- Header / footer / language switcher / RTL `dir` / global back button / WhatsApp FAB
- Home (hero through newsletter), including footer “Follow us”, pending prices, Umrah promo Insider links, ticker “Updated”
- Destinations chrome **and** card titles / descriptions / tips (`lib/i18n/destinations.ts`)
- Regional chrome **and** displayName / shortName / heroTagline / faqBorder (`lib/i18n/regional.ts`)
- Hajj & Umrah: tier names, route blurbs, GCC hover, benefits comparison, inspiration gallery, brand line (`lib/i18n/pilgrimage.ts`)
- Checkout (funnel steps, PayPal labels) + success + gift + review request
- Support, FAQ, before-you-fly + short help guides + landing-ready checklist
- My eSIMs lookup / install / top-up chrome
- About, Partners, Compare, Give, Learn, Newsletter archive + unsubscribe
- Legal policies — full bodies in `lib/i18n/policies.ts`
- Order language → `metadata.locale` → fulfillment email subject
- Spanish **antes de viajar**; Arabic **قبل السفر** (airplane mode `وضع الطيران` kept)
- **Insider issue bodies** — all 26 issues in `lib/i18n/insider-bodies-{es,ar}.ts` via `localizeInsiderIssue`
- **Trustpilot** quote country + body translated (`lib/i18n/trustpilot.ts`); “Excellent” → Excelente / ممتاز
- **Stripe Elements / PayPal SDK locale** via `lib/i18n/payment-locale.ts` (`en` / `es-419` / `ar`; PayPal `en_US` / `es_ES` / `ar_EG`). Checkout API already sends `language: locale`

## Still English (limits / data)

- Stripe Checkout **hosted** page, PayPal / Apple Pay / Google Pay **provider sheets** — we only pass locale; strings depend on each provider (device language for Apple/Google)
- Regional / destination **country name lists** (proper nouns)
- “This week” search pills
- Dynamic plan names and API error messages from the backend
- Some OS menu tokens in install steps (e.g. “Data Roaming”)

## How to review locally

1. `npm run dev` (restart if middleware changed)
2. http://localhost:3000/es and http://localhost:3000/ar
3. Walk: Home → Destinations → Regional plan → Hajj & Umrah → Checkout wallets → Insider issue → Compare (Trustpilot)
4. Spot-check: tier names, inspiration gallery, destination blurbs, Insider body paragraphs, Trustpilot cards

## After you approve

Say **commit** (site). Then push / deploy to make languages live.
