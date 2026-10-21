---
type: Architecture Concept
title: MYSL-3 Fix Imprint
description: Points the footer imprint link (IMPRINT_URL in the content data module) to https://www.michaelschreiber.net/#/imprint instead of the broken /impressum page and locks the URL with a footer component test.
tags: [MYSL-3, bug, data-modules, components, tests]
timestamp: 2026-10-21T20:35:00+07:00
status: draft
---

## Story

As a user, I want to see the author of the webpage, so that I know who is
responsible for it. Therefore the broken imprint link must be changed to
exactly `https://www.michaelschreiber.net/#/imprint`.

Acceptance criteria: Imprint is linked correctly.

Jira: MYSL-3 — https://mklschreiber.atlassian.net/browse/MYSL-3

No design artifact exists for this story; the footer layout is unchanged.

## Architecture Decisions

- **Change only the constant.** `IMPRINT_URL` in `app/src/data/content.ts` is
  the single source of the imprint link (used only in `SiteFooter.vue`). It is
  set to exactly `https://www.michaelschreiber.net/#/imprint`, which is the
  URL the ticket gives: `www` host and hash route, because michaelschreiber.net
  is a hash-routed SPA. The old `https://michaelschreiber.net/impressum` path
  does not exist there.
- **Footer markup stays as it is.** The link keeps the label "Imprint",
  `target="_blank"` and `rel="noopener noreferrer"` (external site).
- **`DEVELOPER_URL` is not touched.** `https://michaelschreiber.net` in
  `app/src/data/site.ts` is a working home-page link and also feeds SEO
  (JSON-LD author); changing it is outside this bug.
- **Lock the URL with a test.** No test covers the imprint link today, which
  is how the broken URL went unnoticed. `SiteFooter.spec.ts` gets a test that
  the footer contains an `a` with label "Imprint" whose `href` is exactly the
  new URL and which opens in a new tab. The test asserts the literal string,
  not the imported constant, so a wrong constant fails the test.
- **Patch version bump.** A bug fix without new behavior is a patch release:
  0.3.0 → 0.3.1 via `npm version patch --no-git-tag-version` in `app/`
  (see `docs/ai-project.md` → `## Versioning`).

## Affected Components

- `app/src/data/content.ts` — `IMPRINT_URL` value changed.
- `app/src/__tests__/SiteFooter.spec.ts` — new imprint link test.
- `app/package.json`, `app/package-lock.json` — version 0.3.1.
- `app/src/components/SiteFooter.vue` — unchanged (reads the constant).
- `docs/architecture/landing-page.md` — legal-links text names the imprint URL.

## Data Flow

```
content.ts (IMPRINT_URL) ──► SiteFooter.vue <a :href> ──► new tab: www.michaelschreiber.net/#/imprint
```

## Interfaces

```ts
// app/src/data/content.ts
export const IMPRINT_URL = 'https://www.michaelschreiber.net/#/imprint'
```

## Open Questions

None.
