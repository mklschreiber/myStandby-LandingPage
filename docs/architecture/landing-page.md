---
type: Architecture Concept
title: myStandby Landing Page
description: Single-page, English-only Vue landing page that presents all myStandby features and screenshots in a CSS-built Google Pixel 11 Pro frame and links to Google Play.
tags: [landing-page, vue, content, screenshots, seo]
timestamp: 2026-10-04T06:35:00+07:00
status: implemented
---

## Story

As a potential myStandby user, I want a modern landing page that explains every
feature of the app and shows real screenshots on a Google Pixel 11 Pro, so that
I understand what the app does and can install it from Google Play.

## Requirements Authority

Requested directly by the project owner in chat on 2026-10-04 (no Trello card).
English only for now; screenshots from the owner's screenshot folder; feature
facts from the Google Play listing and the myStandby app sources.

## Architecture Decisions

- **Single page, no router, no i18n library.** One scrolling page with in-page
  anchors (`#features`, `#screenshots`, `#pro`, `#faq`). Vue Router and Vue I18n
  are deliberately not installed; all copy lives in `src/data/content.ts`, so
  adding i18n later means swapping that module for message files.
- **Content as typed data.** Features, screenshots, setup steps, Free/PRO rows,
  FAQ and external URLs live in `src/data/content.ts` (types in
  `src/types/content.ts`). Components only render.
- **CSS device frame instead of a mockup image.** `PixelPhone.vue` draws a
  Pixel 11 Pro–style body (flat rails, uniform slim bezel, centered punch-hole,
  right-side power and volume keys) with CSS and container-query units, so
  it scales sharply at every size. The screen keeps the screenshots' native
  1280 × 2856 aspect ratio.
- **Pre-sized WebP screenshots.** Source PNGs are converted with `cwebp` into
  `public/screenshots/<id>-480.webp` and `<id>-960.webp` and served via
  `srcset`/`sizes`; only the hero images load eagerly.
- **No third-party requests.** System font stack (Google Sans/Roboto first)
  instead of web fonts, no analytics, and no cookies, so no consent banner is
  needed.
- **Brand.** Dark theme matching the app, brand gradient `#94B9FF → #3F51B5`
  from the launcher icon; `public/favicon.svg` is rebuilt from the launcher
  vector.
- **Own privacy policy as a second Vite page.** `/privacy/` is built from
  `app/privacy/index.html` (Vite multi-page `build.rollupOptions.input`), so it
  is a real static file on GitHub Pages without a router or SPA 404 fallback.
  It covers the website (GitHub Pages hosting) and the app: Firebase
  Crashlytics, Google Analytics for Firebase, the feedback relay on Cloudflare
  Workers (`feedback.mystandby.app`), storage in Jira
  (Atlassian), Formspree for app versions ≤ 1.14.2, and Google Play Billing.
  Facts come from the myStandby app sources and its MYS-39 concept. The page
  has no link to software-lab.io, which is going offline.
- **Legal links.** The footer links the own privacy page (same tab) and the
  developer's imprint on michaelschreiber.net. Header links use
  `${BASE_URL}#section`, so they work from both pages.

## Affected Components

- `app/src/App.vue` — composes the sections.
- `app/privacy/index.html`, `app/src/privacy.ts`, `app/src/PrivacyApp.vue`,
  `app/src/components/PrivacyPolicy.vue` — privacy policy page.
- `app/src/components/` — `SiteHeader`, `HeroSection`, `FeatureGrid`,
  `ScreenshotGallery`, `StepsSection`, `ProSection`, `FaqSection`,
  `CtaSection`, `SiteFooter`, `PixelPhone`, `PlayStoreButton`, `AppLogo`,
  `icons/*`.
- `app/src/data/content.ts`, `app/src/types/content.ts`.
- `app/src/assets/styles/main.css` — design tokens and global styles.
- `app/public/` — favicon, apple-touch icon, OG image, screenshots.

## Data Flow

```
content.ts ──▶ section components ──▶ PixelPhone (screenshot id ─▶ srcset)
                                  └─▶ PlayStoreButton (PLAY_STORE_URL)
```

## Interfaces

- `PixelPhone` props: `screenshot: string` (file id), `alt: string`,
  `eager?: boolean`, `sizes?: string`.
- `PlayStoreButton` props: `size?: 'md' | 'lg'`.
- `Feature { id, icon, title, description, pro? }`, `Screenshot { id, title,
  description, alt }`, `Step`, `PlanRow`, `FaqEntry`.

## Open Questions

- ~~Custom domain (CNAME) and absolute `og:image` URL once the domain is known.~~
  Resolved by [MYSL-1](MYSL-1-seo-optimization.md): host `www.mystandby.app`, absolute OG URLs.
