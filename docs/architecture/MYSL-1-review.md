---
type: AI Review
title: Review for MYSL-1 SEO Optimization
description: Round 2 — both round-1 findings resolved (stack.md updated; manual JSON-LD check moved to the Schema.org Markup Validator); checks pass; verdict positive.
tags: [MYSL-1, review]
timestamp: 2026-10-05T21:45:00+07:00
verdict: positive
---

## Round 1 — 2026-10-05T21:43:00+07:00

### Scope

- Architecture concept `MYSL-1-seo-optimization.md` (draft, 2026-10-05T09:00) with
  AC1–AC12, and testing concept `MYSL-1-tests.md` (2026-10-05T21:45).
- Uncommitted changes on `feature/MYSL-1-seo-optimization` against `main`, including
  untracked files: `app/src/data/site.ts`, `app/src/types/seo.ts`, `app/src/data/seo.ts`,
  `app/vite-plugin-seo.ts`, `app/src/data/content.ts`, `app/vite.config.ts`,
  `app/tsconfig.node.json`, `app/index.html`, `app/privacy/index.html`, deleted
  `app/public/robots.txt`, `.github/workflows/deploy.yml` (comment only),
  `docs/architecture/landing-page.md`, `index.md`, `log.md`.
- Tests: `seo.spec.ts`, `seoPlugin.spec.ts`, `App.spec.ts` (new AC9/AC10 cases),
  `PrivacyApp.spec.ts`.
- Checks in `app/`: `npm run test:unit -- --run` (9 files, 156 tests passed),
  `npm run lint:check` (clean), `npm run build` (type-check and build passed).
- Build output inspected: `dist/index.html` and `dist/privacy/index.html` each contain
  exactly one title, description, canonical, the full OG/Twitter set with absolute URLs,
  and the noscript fallback as the first body element; JSON-LD only on home, parses, has
  `WebSite` + `MobileApplication`, no `aggregateRating`; `dist/robots.txt` and
  `dist/sitemap.xml` match AC6; all five `screenshots/*-960.webp` referenced by the JSON-LD
  exist in `dist/`. Vite's `serializeAttrs` HTML-escapes attribute values, so decision 6
  holds.
- Dev server smoke test (`vite`): `/` and `/privacy/` get the correct title and canonical;
  other paths fall back to `index.html` (Vite SPA fallback), so the plugin never throws in
  dev for ordinary requests.

Implementation matches the concept's decisions and interfaces (module boundaries, relative
imports only in `seo.ts`/`site.ts`, plain-function `transformIndexHtml`, throw on unknown
paths, `emitFile` assets, no new dependency, re-exports in `content.ts`). Tests exercise
the described cases against the real HTML files and the serialized output, not just the
happy path.

### Findings

1. **`docs/architecture/stack.md` not updated (developer).** The concept lists
   `stack.md` under "Change": note the local `vite-plugin-seo.ts` and that
   `robots.txt`/`sitemap.xml` are generated at build time. The file is unchanged
   (`git status`/`git diff main` show no change; last commit `24cce66`). The stack
   reference is the baseline the architect reads for later stories, so it should record
   the new build plugin, the `tsconfig.node.json` include and that SEO head tags must not
   be hand-written in the HTML files.
2. **Post-deploy manual check cannot pass as written (architect).** The concept (section
   "Acceptance Criteria", manual check) and `MYSL-1-tests.md` ("Untested Areas") expect the
   Google Rich Results Test on `https://www.mystandby.app/` to show "no JSON-LD errors".
   Google's Software App rich-result rules require `aggregateRating` or `review` on
   `SoftwareApplication`/`MobileApplication`. Decision 8 correctly leaves both out, so the
   Rich Results Test will report the `MobileApplication` item as invalid / not eligible.
   The markup is still valid schema.org. The expected result should be restated (e.g.
   "Schema Markup Validator shows no errors; the Rich Results Test is expected to flag the
   missing rating/review, and the app item is not eligible for a rich result"), so the tester
   does not record a false failure, and the owner knows the app snippet is not a goal of
   this story.

### Verdict

findings

## Round 2 — 2026-10-05T21:45:00+07:00

### Scope

- Fixes for the round 1 findings:
  - `docs/architecture/stack.md`: there is a new bullet under "Application". It covers the
    local `vite-plugin-seo.ts`, which has no npm dependency and injects the head tags,
    the JSON-LD and the noscript fallback. It also says that `robots.txt` and
    `sitemap.xml` are generated in `dist/`, that `seo.ts` and `site.ts` hold the copy
    and the constants, and that `public/robots.txt` and hand-written SEO tags must not
    come back.
  - `MYSL-1-seo-optimization.md`: decision 8 now states that the page is not eligible
    for the app rich result. The manual check after deploy now expects no errors from
    the Schema.org Markup Validator and expects the Rich Results Test to flag the
    missing `aggregateRating`/`review`.
  - `MYSL-1-tests.md` ("Untested Areas") has the same new expectation.
  - `log.md` has a new decision row for the validator choice.
- Diff against `main` again. The app sources and tests have not changed since round 1:
  the diffstat is the same, and the untracked sources and specs were last modified
  before round 1 was written.
- Checks in `app/`:
  - `npm run test:unit -- --run`: 9 files, 156 tests passed.
  - `npm run lint:check`: clean.
  - `npm run build`: passed.
- `dist/` output: one `<title>` per page, JSON-LD only on the home page, and
  `robots.txt` with the sitemap URL. It matches round 1.

Not a finding: the frontmatter `timestamp` of `MYSL-1-seo-optimization.md`,
`MYSL-1-tests.md` and `stack.md` still shows the time before these edits. The owners can
update it when the concept is finalised.

### Findings

None.

### Verdict

positive
