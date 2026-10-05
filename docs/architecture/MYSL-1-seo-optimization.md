---
type: Architecture Concept
title: SEO Optimization of the Landing Page
description: Build-time SEO for the static Vue landing page — head tags, Open Graph, JSON-LD, robots.txt, sitemap.xml and a noscript fallback, all generated from one typed, unit-tested data module by a small Vite plugin.
tags: [MYSL-1, seo, data-modules, vite, index-html, components, tests]
timestamp: 2026-10-05T09:00:00+07:00
status: draft
---

## Story

As a user, I want to find the application myStandby easily (e.g. via search
engines), so that I can discover and download/use it. Therefore the landing
page (mystandby.app) should be SEO-optimized.

Jira: MYSL-1 — https://mklschreiber.atlassian.net/browse/MYSL-1

The Jira acceptance criterion is only "Landing page is optimized". This
concept makes it concrete in [Acceptance Criteria](#acceptance-criteria).

## Current State (analysis 2026-10-05)

- Two static Vite pages: `/` (`app/index.html` → `App.vue`) and `/privacy/`
  (`app/privacy/index.html` → `PrivacyApp.vue`). English only, no router, no
  i18n. The body is rendered client-side into `<div id="app">`.
- **Live host is `https://www.mystandby.app/`.** GitHub Pages has the custom
  domain `www.mystandby.app` (set in the repository settings, build type
  `workflow`); `https://mystandby.app/` answers `301` to the `www` host, and
  `/privacy` answers `301` to `/privacy/`. There is no `CNAME` file in
  `app/public/` (not needed for Actions-based deployments; the comment in
  `deploy.yml` is outdated but harmless).
- `app/index.html` has `lang="en"`, `<title>`, a description of ~230
  characters (cut off in search results), `theme-color`, favicon and
  apple-touch icon, and Open Graph tags whose `og:image` is the **relative**
  URL `og-image.jpg` (invalid — crawlers need an absolute URL). No `og:url`,
  no canonical link, no structured data.
- `app/privacy/index.html` has a title and a ~190 character description, no
  canonical link and no Open Graph tags.
- `app/public/robots.txt` allows everything but names no sitemap. There is no
  `sitemap.xml`.
- `app/public/og-image.jpg` exists: 1024 × 500 JPEG (Play feature graphic —
  app glyph on the brand gradient, no text). Ratio 2.05:1 is close enough to
  the recommended 1.91:1 for `summary_large_image`; no new binary asset is
  needed.
- Content: exactly one `<h1>` per page (hero / privacy title), sections use
  `<h2>`/`<h3>`. All `<img>` elements have an `alt` (screenshots descriptive,
  `AppLogo` decorative `alt=""` next to the visible name).

## Architecture Decisions

1. **Stay a client-rendered SPA; no SSR/SSG framework.** Google and Bing
   execute JavaScript and index the rendered page; the page is small and
   has no data fetching. Social crawlers (Facebook, LinkedIn, X, Slack,
   WhatsApp) do not run JavaScript, but they only read `<head>` tags — and
   those will be static in the built HTML. Prerendering (`vite-ssg` or a
   custom `vue/server-renderer` step) would add hydration concerns and a new
   build dependency for a marginal gain. Rejected for this story; a
   `<noscript>` fallback covers non-JS clients (decision 7).

2. **One SEO data module as the single source of truth.** All SEO copy and
   URLs live in `app/src/data/seo.ts` with pure builder functions, so they
   are unit-tested in Vitest. The module must be importable from
   `vite.config.ts` (Node), so it:
   - uses **relative imports only** (no `@/` alias — the Node tsconfig has no
     `paths`);
   - must **not** import `content.ts` (it reads `import.meta.env.BASE_URL`,
     which is undefined while Vite loads its config) and must not touch the
     DOM or `import.meta.env`.

3. **Env-free site constants in a new `app/src/data/site.ts`.** `SITE_URL`,
   `PLAY_STORE_URL`, `DEVELOPER_URL`, `DEVELOPER_NAME` and `APP_NAME` move
   there. `content.ts` re-exports `PLAY_STORE_URL` and `DEVELOPER_URL`
   (`export { PLAY_STORE_URL, DEVELOPER_URL } from './site'`), so no existing
   import changes.

4. **Canonical origin is `https://www.mystandby.app`.** It is the host that
   answers `200`; canonical, `og:url`, sitemap and JSON-LD URLs must point to
   the final URL, not to a redirect. Paths always end with `/` (`/`,
   `/privacy/`) because GitHub Pages redirects the variants without slash.
   Absolute URLs ignore `BASE_URL` on purpose; the deploy uses `/`.

5. **A small local Vite plugin injects the tags at build time.**
   `app/vite-plugin-seo.ts` exports `seoPlugin(): Plugin`:
   - `transformIndexHtml(html, ctx)` maps `ctx.path` (`/index.html` → `home`,
     `/privacy/index.html` → `privacy`) to a page id and returns
     `buildHeadTags(page)` plus the `<noscript>` fallback as
     `HtmlTagDescriptor[]`. An unknown path **throws**, so a future page
     cannot ship without SEO data. Works the same in `npm run dev`.
   - `generateBundle()` emits `robots.txt` and `sitemap.xml` with
     `this.emitFile({ type: 'asset', ... })`.
   - Registered in `vite.config.ts` next to `vue()`.
   Hand-written SEO tags are removed from both HTML files, so nothing is
   duplicated. No new npm dependency.

6. **Escaping.** Vite escapes attribute values but inserts `children` raw.
   `seo.ts` therefore provides `escapeHtml()` and uses it for the `<title>`
   text and the noscript HTML; JSON-LD is `JSON.stringify(...)` with every
   `<` replaced by the JSON escape `\u003c` (`serializeJsonLd`), so the
   JSON-LD cannot close its `<script>` element early.

7. **Noscript fallback, no second `<h1>`.** Each page gets a
   `<noscript>` (injected `body-prepend`) with one `<p>` containing the page
   description and one link: home links to the Google Play URL with the text
   "Get myStandby on Google Play"; privacy links to `/` with the text
   "myStandby home page".
   It uses `<p>`, not a heading, so the heading outline stays unchanged.

8. **Structured data on the home page only:** a JSON-LD `@graph` with
   - `WebSite` (`name: "myStandby"`, `url`) — feeds Google's site name;
   - `MobileApplication` (`name`, `description`, `operatingSystem:
     "Android 10+"`, `applicationCategory: "UtilitiesApplication"`, `url`,
     `installUrl` = Play URL, `image` = OG image URL, `screenshot` = absolute
     URLs of the five `-960.webp` files, `offers` `{ "@type": "Offer",
     price: "0", priceCurrency: "EUR" }`, `author` `{ "@type": "Person",
     name, url }`).
   **No `aggregateRating`** — inventing ratings violates Google's guidelines,
   and live Play data is not available at build time. Consequence: the page
   is not eligible for Google's app rich result (it requires `aggregateRating`
   or `review`); that is accepted — the JSON-LD serves entity understanding
   and the site name, and it is validated with the Schema.org validator. **No `FAQPage`** —
   Google limits FAQ rich results to authoritative government/health sites
   since 2023, so it adds no value. The screenshot ids are listed in
   `seo.ts`; a test checks they equal `content.ts` screenshot ids.

9. **English only → no `hreflang`.** `og:locale` is `en_US`; `lang="en"`
   stays in both HTML files. hreflang becomes relevant only with a second
   language (not part of this story).

10. **SEO copy (decided values).**

    | Page | Title | Description |
    |---|---|---|
    | home | `myStandby – Any Widget on Your Android Standby Screen` (53) | `Turn your charging Android phone into a smart display: put any widget on the standby screen and build swipeable widget stacks. Free on Google Play.` (147) |
    | privacy | `Privacy Policy – myStandby` (26) | `How the myStandby app and website process personal data: Firebase Crashlytics and Analytics, in-app feedback via Cloudflare and Jira, and Google Play.` (150) |

    `og:title` = title; `og:description` = description. No `meta keywords`
    (ignored by search engines).

11. **Out of scope:** SSR/prerendering, hreflang, web app manifest,
    `favicon.ico` (Google accepts the SVG favicon), new OG artwork,
    performance work, analytics, Search Console setup (manual owner task, see
    Open Questions), `lastmod` in the sitemap (a build date would be
    inaccurate; Google ignores untrustworthy `lastmod`).

## Acceptance Criteria

Concrete, testable version of "Landing page is optimized". Automated = Vitest.

| # | Criterion | Check |
|---|---|---|
| AC1 | Each page has exactly one `<title>`, containing `myStandby`, ≤ 60 characters; home title ≥ 30 characters. | unit (`seo.spec`), plugin test |
| AC2 | Each page has exactly one `meta[name=description]`, 70–160 characters. | unit, plugin test |
| AC3 | Each page has `link[rel=canonical]` with an absolute `https://www.mystandby.app/...` URL ending in `/` (`/`, `/privacy/`). | unit, plugin test |
| AC4 | Each page has `og:type=website`, `og:site_name=myStandby`, `og:locale=en_US`, `og:title`, `og:description`, `og:url` (= canonical), `og:image` = `https://www.mystandby.app/og-image.jpg`, `og:image:width=1024`, `og:image:height=500`, `og:image:alt`, and `twitter:card=summary_large_image`. | unit, plugin test |
| AC5 | The home page contains one `script[type="application/ld+json"]` that parses as JSON with a `WebSite` and a `MobileApplication` node as in decision 8, without `aggregateRating`; the privacy page has none. | unit, plugin test |
| AC6 | The build emits `robots.txt` (`User-agent: *`, `Allow: /`, `Sitemap: https://www.mystandby.app/sitemap.xml`) and a valid `sitemap.xml` (urlset namespace `http://www.sitemaps.org/schemas/sitemap/0.9`) listing exactly `https://www.mystandby.app/` and `https://www.mystandby.app/privacy/`. `app/public/robots.txt` is deleted. | unit, plugin test, `npm run build` + inspect `dist/` |
| AC7 | Both HTML files keep `<html lang="en">`, `theme-color`, SVG favicon and apple-touch icon; no hand-written `<title>`, description or `og:`/`twitter:` tags remain in the source HTML. | plugin test reads the real HTML files |
| AC8 | Each page has a `<noscript>` fallback with the description and a link (home: Google Play URL; privacy: home `/`) and no heading element. | unit, plugin test |
| AC9 | The rendered home page (`App`) and privacy page (`PrivacyApp`) each contain exactly one `<h1>`; the home `<h1>` contains "Android standby". | component tests |
| AC10 | Every rendered `<img>` has an `alt` attribute; every screenshot image's `alt` is non-empty. | component test (`App.spec`) |
| AC11 | An unknown HTML path in `transformIndexHtml` throws. JSON-LD and `<title>` text are escaped (decision 6). | plugin test, unit |
| AC12 | `npm run lint:check`, `npm run test:unit -- --run`, `npm run build` pass; `dist/index.html` and `dist/privacy/index.html` contain the tags. | CI, manual inspection |

Manual checks after deploy (recorded by the Tester, not blocking the PR):

- The Schema.org Markup Validator (https://validator.schema.org/) shows no
  errors for the JSON-LD of `https://www.mystandby.app/`.
- Google's Rich Results Test is **expected** to flag the missing
  `aggregateRating`/`review` on `MobileApplication`, because Google's app
  rich result requires one of them and decision 8 leaves both out. This is
  accepted: an app rich result is not a goal of this story.
- An Open Graph preview (e.g. opengraph.xyz) shows title, description and
  image.

## Affected Components

Create:

- `app/src/data/site.ts` — env-free site constants (decision 3).
- `app/src/types/seo.ts` — `PageId`, `PageSeo`, `HeadTag`.
- `app/src/data/seo.ts` — SEO copy and pure builders (decisions 2, 6–10).
- `app/vite-plugin-seo.ts` — the Vite plugin (decision 5).
- `app/src/__tests__/seo.spec.ts` — data/builder tests (AC1–AC6, AC8, AC11).
- `app/src/__tests__/seoPlugin.spec.ts` — plugin tests against the real
  `index.html` and `privacy/index.html` (AC1–AC8, AC11).

Change:

- `app/src/data/content.ts` — re-export `PLAY_STORE_URL`, `DEVELOPER_URL`
  from `./site` instead of defining them.
- `app/vite.config.ts` — add `seoPlugin()` to `plugins`.
- `app/tsconfig.node.json` — add `"vite-plugin-seo.*"` to `include` (the
  imported `src/data/site.ts`, `src/data/seo.ts`, `src/types/seo.ts` are
  pulled in transitively and must type-check under both the Node and the
  app config — hence relative imports only).
- `app/index.html`, `app/privacy/index.html` — remove `<title>`,
  description, `og:*`, `twitter:*`; keep everything else.
- `app/src/__tests__/App.spec.ts` — AC9 (home), AC10.
- `app/src/__tests__/PrivacyPolicy.spec.ts` (or a new
  `PrivacyApp.spec.ts`) — AC9 (privacy).
- `.github/workflows/deploy.yml` — optional: fix the outdated comment
  ("CNAME in app/public/") to say the custom domain is set in the repository
  Pages settings. No functional change.
- `docs/architecture/stack.md` — note the local `vite-plugin-seo.ts` and
  that `robots.txt`/`sitemap.xml` are generated.

Delete:

- `app/public/robots.txt` (generated now; otherwise two sources).

No component (`.vue`) changes are required: heading structure and alt texts
already satisfy AC9/AC10; the new tests lock them in.

## Data Flow

```
src/data/site.ts ──┬──▶ src/data/content.ts ──▶ Vue components (runtime)
                   │
                   └──▶ src/data/seo.ts  (copy + pure builders)
                              │
                              ▼
                   vite-plugin-seo.ts (Node, build + dev)
                     ├─ transformIndexHtml(ctx.path → PageId)
                     │     ├─ <head>: title, description, canonical,
                     │     │          og:*, twitter:card, JSON-LD (home)
                     │     └─ <body> prepend: <noscript> fallback
                     └─ generateBundle → dist/robots.txt, dist/sitemap.xml
                              │
                              ▼
               dist/index.html, dist/privacy/index.html ──▶ GitHub Pages
                                                     ──▶ crawlers / link previews
```

## Interfaces

`app/src/types/seo.ts`:

```ts
export type PageId = 'home' | 'privacy'

export interface PageSeo {
  id: PageId
  path: string          // '/' or '/privacy/' — always trailing slash
  title: string
  description: string
}

/** Structurally compatible with Vite's HtmlTagDescriptor (no vite import in src). */
export interface HeadTag {
  tag: string
  attrs?: Record<string, string>
  children?: string     // raw HTML — must already be escaped
  injectTo?: 'head' | 'body-prepend'
}
```

`app/src/data/site.ts`:

```ts
export const SITE_URL = 'https://www.mystandby.app'   // no trailing slash
export const APP_NAME = 'myStandby'
export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=io.software_lab.mystandby'
export const DEVELOPER_NAME = 'Michael Schreiber'
export const DEVELOPER_URL = 'https://michaelschreiber.net'
```

`app/src/data/seo.ts`:

```ts
export const OG_IMAGE: { path: '/og-image.jpg'; width: 1024; height: 500; alt: string }
// alt: 'myStandby app icon on the blue brand gradient'
export const SCREENSHOT_IDS: readonly string[]   // ['standby','home','widget-apps','widget-previews','settings']
export const pages: Record<PageId, PageSeo>

export function absoluteUrl(path: string): string           // SITE_URL + path
export function escapeHtml(text: string): string            // & < > " '
export function buildStructuredData(): Record<string, unknown> // { '@context', '@graph': [WebSite, MobileApplication] }
export function serializeJsonLd(data: unknown): string      // JSON.stringify + '<' → '\u003c'
export function buildHeadTags(page: PageId): HeadTag[]      // incl. JSON-LD for 'home', noscript (injectTo 'body-prepend')
export function buildRobotsTxt(): string
export function buildSitemapXml(): string
export function pageIdForHtmlPath(path: string): PageId     // '/index.html' | '/privacy/index.html'; throws otherwise
```

`app/vite-plugin-seo.ts`:

```ts
import type { Plugin } from 'vite'
export function seoPlugin(): Plugin
// name: 'mystandby-seo'
// transformIndexHtml(html, ctx) → { html, tags: buildHeadTags(pageIdForHtmlPath(ctx.path)) }
// generateBundle() → emitFile robots.txt, sitemap.xml
```

Implement `transformIndexHtml` as a plain function (not the `{ order,
handler }` object form), so tests can call
`plugin.transformIndexHtml(html, { path: '/index.html' } as …)` directly and
assert on the returned tags; `generateBundle` is tested by calling it with a
`this` whose `emitFile` is a `vi.fn()`.

## Open Questions

For the project owner (none block the implementation; defaults are chosen):

1. **Canonical host:** default is `https://www.mystandby.app` (matches the
   current Pages setting). If the apex `mystandby.app` should be canonical,
   change the Pages custom domain first, then `SITE_URL`.
2. **Search Console / Bing Webmaster Tools:** verifying the domain and
   submitting `sitemap.xml` is a manual owner task (DNS TXT verification is
   recommended; no verification meta tag is added in this story).
3. **Google Play listing:** set the website field of the Play listing to
   `https://www.mystandby.app/` — the link between app and site helps
   discovery. Manual owner task.
4. **OG image:** the existing feature graphic has no text. A future image
   with app name, tagline and a device screenshot would make link previews
   more convincing — new artwork, not part of this story.
5. **SEO copy:** the titles and descriptions in decision 10 are proposals;
   the owner may adjust wording within the AC1/AC2 length limits.
