---
type: Test Concept
title: Tests for MYSL-2 Update Landing Page
description: Data and component tests that lock in the five new screenshots (files, ids, hero/PRO usage), the 17 features and their icons, the three PRO price plans with price note, the updated FAQ, SEO description and the subscription wording of privacy section 7.
tags: [MYSL-2, tests]
timestamp: 2026-10-19T06:50:00+07:00
---

## Requirements Authority

Jira MYSL-2 — https://mklschreiber.atlassian.net/browse/MYSL-2. Decisions and exact
interfaces from [MYSL-2-update-landing-page.md](MYSL-2-update-landing-page.md); screenshot
inventory from [docs/design/MYSL-2/README.md](../design/MYSL-2/README.md).

## Scope

- **Data level (unit):** `content.ts` — feature ids and PRO flags, screenshot ids in order,
  the WebP files in `public/screenshots/` (both sizes for every id, **no orphaned files**),
  `pricePlans` (ids, prices, periods, trial/lifetime notes), `PRICE_NOTE`, FAQ pricing
  answer, absence of "no subscription" in the FAQ, `PRIVACY_LAST_UPDATED`. `seo.ts` —
  `SCREENSHOT_IDS` equal the gallery ids, every id has a 960 px file (JSON-LD), new home
  description, JSON-LD screenshot URLs.
- **Component level (Vue Test Utils, jsdom):** `FeatureIcon` renders paths for all 17 icon
  names and every feature's icon; `ProSection` renders three plan cards, prices, periods,
  notes, the price note, the new intro and the `choose-widget` screenshot with its alt text;
  `HeroSection` shows `standby` (front) and `mode-editor` (back) with alt texts from the
  content data; `PrivacyPolicy` section 7 covers subscriptions; `App` contains
  "no subscription" only once (the lifetime card) and shows every gallery screenshot.
- **Not tested:** visual layout of the price cards and icons, image quality/size of the
  WebP files, CSS breakpoints.

## Test Cases

| Class / Module | Test Case | Level | Status |
|--------|----------|-------|--------|
| content.ts | lists the 17 app features in order | Unit | ✅ |
| content.ts | marks only the six PRO-gated features as PRO | Unit | ✅ |
| content.ts | ships `<id>-480.webp` and `<id>-960.webp` for every screenshot | Unit | ✅ |
| content.ts | lists the five current screenshots in order | Unit | ✅ |
| content.ts | ships no screenshot files beyond the gallery's 480/960 versions (old files removed) | Unit | ✅ |
| pricePlans | ids monthly, yearly, lifetime in order | Unit | ✅ |
| pricePlans | prices €0.99, €7.99, €19.99 | Unit | ✅ |
| pricePlans | periods per month, per year, one-time | Unit | ✅ |
| pricePlans | monthly and yearly mention the 7-day free trial | Unit | ✅ |
| pricePlans | lifetime note is "No subscription" | Unit | ✅ |
| PRICE_NOTE | exact German-prices-incl.-VAT note | Unit | ✅ |
| faq | pricing answer repeats all prices and the trial | Unit | ✅ |
| faq | no answer claims "no subscription" | Unit | ✅ |
| faq | contains "What happens if my PRO subscription ends?" | Unit | ✅ |
| PRIVACY_LAST_UPDATED | is 19 October 2026 | Unit | ✅ |
| seo.ts | SCREENSHOT_IDS equal the gallery ids | Unit | ✅ |
| seo.ts | every SCREENSHOT_ID has a 960 px file | Unit | ✅ |
| seo.ts | JSON-LD lists the five new 960 px screenshot URLs | Unit | ✅ |
| seo.ts | new home description (modes, flip clock, picture frame) | Unit | ✅ |
| FeatureIcon | renders at least one path for each of the 17 icon names | Component | ✅ |
| FeatureIcon | every path has a non-empty `d` | Component | ✅ |
| FeatureIcon | renders the icon of every feature | Component | ✅ |
| FeatureIcon | every icon has a distinct shape | Component | ✅ |
| FeatureIcon | is aria-hidden | Component | ✅ |
| ProSection | one card per price plan, labelled list | Component | ✅ |
| ProSection | plan names and prices in order | Component | ✅ |
| ProSection | period and note of each plan | Component | ✅ |
| ProSection | price note text | Component | ✅ |
| ProSection | intro names subscription with trial or lifetime purchase, no "no subscription" | Component | ✅ |
| ProSection | shows `choose-widget` screenshot with its content alt text | Component | ✅ |
| ProSection | keeps the Free/PRO table | Component | ✅ |
| HeroSection | front `standby`, back `mode-editor` screenshots | Component | ✅ |
| HeroSection | alt texts from the content data, both eager | Component | ✅ |
| HeroSection | lead mentions modes for day and night; price-free facts | Component | ✅ |
| PrivacyPolicy | section 7 names one-time purchase or monthly/yearly subscription | Component | ✅ |
| PrivacyPolicy | section 7 names the subscription status; old one-time-only wording gone; legal basis kept | Component | ✅ |
| PixelPhone | srcset/alt with an existing id (`standby` instead of removed `home`) | Component | ✅ |
| App | "no subscription" appears only once, as the lifetime plan note | Component | ✅ |
| App | renders three price plans | Component | ✅ |
| App | shows each of the five screenshots in the gallery | Component | ✅ |

## Untested Areas

- **Manual browser check:** the new icons render legibly; the gallery, hero and PRO images
  load and look sharp at 480/960 px; the price cards collapse to one column below 520 px.
  These are visual and cannot be asserted meaningfully in jsdom.
- **Factual correctness of the copy against app 1.30.0** (prices, limits, triggers) was
  verified by the Architect against the Android project; the tests only lock the approved
  values in.
