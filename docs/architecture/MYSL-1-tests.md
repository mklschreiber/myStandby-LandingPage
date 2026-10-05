---
type: Test Concept
title: Tests for MYSL-1 SEO Optimization
description: Unit, plugin and component tests for the build-time SEO data module, the local Vite SEO plugin, the cleaned-up HTML sources and the heading/alt-text structure of both pages.
tags: [MYSL-1, tests]
timestamp: 2026-10-05T21:45:00+07:00
---

## Requirements Authority

Jira MYSL-1 — https://mklschreiber.atlassian.net/browse/MYSL-1. Acceptance
criteria AC1–AC12 from [MYSL-1-seo-optimization.md](MYSL-1-seo-optimization.md).

## Scope

- **Data level (`seo.spec.ts`, unit):** the pure builders in `src/data/seo.ts`
  and the constants in `src/data/site.ts` — title/description lengths (AC1,
  AC2), canonical and `og:url` equality and absolute URLs (AC3, AC4), JSON-LD
  graph content, absence of `aggregateRating`/`FAQPage`, `<` escaping (AC5,
  AC11), HTML escaping (AC11), `robots.txt` and `sitemap.xml` (AC6), noscript
  fallback (AC8), HTML-path mapping including the throw on unknown paths
  (AC11), and that `SCREENSHOT_IDS` equals the gallery ids in `content.ts`.
- **Plugin level (`seoPlugin.spec.ts`, unit):** `seoPlugin()` hooks called
  directly against the real `index.html` and `privacy/index.html`. The returned
  tags are serialized the way Vite does (attributes escaped, children raw,
  `head` / `body-prepend`) and the resulting HTML is parsed with scripting
  disabled, so assertions run against the markup a crawler receives (AC1–AC5,
  AC8). The source files themselves are checked for `lang`, `theme-color`,
  icons and the absence of hand-written SEO tags (AC7); the deleted
  `public/robots.txt` is checked (AC6). `generateBundle` is called with a
  `vi.fn()` `emitFile` (AC6). An unknown `ctx.path` throws (AC11).
- **Component level (`App.spec.ts`, `PrivacyApp.spec.ts`):** exactly one `<h1>`
  per page, home `<h1>` contains "Android standby" (AC9); every `<img>` has an
  `alt`, every screenshot image a non-empty `alt` (AC10).

Not tested in Vitest: a full `vite build` (covered by `npm run build`, AC12).

## Test Cases

| Class / Module | Test Case | Level | Status |
|--------|----------|-------|--------|
| site | site URL is `https://www.mystandby.app` without trailing slash | Unit | ✅ |
| seo `pages` | titles contain myStandby, ≤ 60 chars; home ≥ 30 chars | Unit | ✅ |
| seo `pages` | descriptions 70–160 chars; paths `/` and `/privacy/` | Unit | ✅ |
| seo `SCREENSHOT_IDS` | equal the `content.ts` screenshot ids | Unit | ✅ |
| seo `absoluteUrl` | prefixes the site URL | Unit | ✅ |
| seo `escapeHtml` | escapes `& < > " '`; leaves plain text unchanged | Unit | ✅ |
| seo `serializeJsonLd` | contains no `<`; parses back to the input | Unit | ✅ |
| seo `buildStructuredData` | schema.org context; `WebSite`; `MobileApplication` fields; 5 absolute screenshot URLs; no `aggregateRating`; no `FAQPage` | Unit | ✅ |
| seo `buildHeadTags` | one title (escaped), one description, canonical URL, `og:url` = canonical, OG/Twitter values, absolute URLs | Unit | ✅ |
| seo `buildHeadTags` | home has one parseable JSON-LD script, privacy none | Unit | ✅ |
| seo `buildHeadTags` | noscript is `body-prepend`, contains description, no heading, links Play (home) / `/` (privacy); all other tags in head | Unit | ✅ |
| seo `buildRobotsTxt` | `User-agent: *`, `Allow: /`, sitemap URL; no `Disallow` | Unit | ✅ |
| seo `buildSitemapXml` | well-formed, 0.9 namespace, exactly home and privacy URLs, no `lastmod` | Unit | ✅ |
| seo `pageIdForHtmlPath` | maps both HTML paths; throws for unknown path | Unit | ✅ |
| source HTML (both) | keeps `lang="en"`, theme-color, SVG favicon, apple-touch icon | Unit | ✅ |
| source HTML (both) | no hand-written title, description, `og:`/`twitter:`, canonical, JSON-LD | Unit | ✅ |
| `public/robots.txt` | no longer exists | Unit | ✅ |
| seoPlugin | name `mystandby-seo`; `transformIndexHtml` is a plain function; HTML returned unchanged; unknown path throws | Unit | ✅ |
| seoPlugin (both pages) | rendered page has exactly one title/description/canonical with correct values; `og:url` = canonical; OG image + size; remaining OG/Twitter tags; non-empty `og:image:alt` | Unit | ✅ |
| seoPlugin (both pages) | noscript first in body, without headings; `#app` kept | Unit | ✅ |
| seoPlugin | home JSON-LD parses to `WebSite` + `MobileApplication`, no `aggregateRating`; privacy has none; noscript links | Unit | ✅ |
| seoPlugin `generateBundle` | emits `robots.txt` and `sitemap.xml` assets | Unit | ✅ |
| App | exactly one `<h1>`, containing "Android standby" | Component | ✅ |
| App | every `<img>` has `alt`; screenshot images have non-empty `alt` and are rendered | Component | ✅ |
| PrivacyApp | exactly one `<h1>`; every `<img>` has `alt` | Component | ✅ |

## Untested Areas

- **Full build output (AC12):** verified by `npm run build` and inspection of
  `dist/index.html`, `dist/privacy/index.html`, `dist/robots.txt` and
  `dist/sitemap.xml` on 2026-10-05 — all tags present once, noscript first in
  the body, robots/sitemap content as specified.
- **Dev server (`npm run dev`):** same hook as the build; not separately tested.
- **Post-deploy manual checks** (open, to be done after deployment):
  - The Schema.org Markup Validator (validator.schema.org) shows no errors for
    the home page JSON-LD on `https://www.mystandby.app/`.
  - Google's Rich Results Test is expected to flag the missing
    `aggregateRating`/`review` on `MobileApplication`; both are omitted on
    purpose (no invented ratings), so this is not a failure.
  - An Open Graph preview (e.g. opengraph.xyz) shows title, description and
    image.
- Escaping of a title that contains special characters end-to-end through the
  plugin is not tested with real data (current copy has none); `escapeHtml` and
  its use for the title are covered at the data level.
