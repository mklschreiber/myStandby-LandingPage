---
type: AI Review
title: Review for MYSL-3 Fix Imprint
description: Round 1 positive — IMPRINT_URL points to exactly https://www.michaelschreiber.net/#/imprint, footer tests lock the literal URL; checks pass.
tags: [MYSL-3, review]
timestamp: 2026-10-21T20:40:00+07:00
verdict: positive
---

## Round 1 — 2026-10-21T20:40:00+07:00

### Scope

- Concept `MYSL-3-fix-imprint.md` (2026-10-21T20:35, draft) and testing concept
  `MYSL-3-tests.md` (2026-10-21T21:00). No design copy exists.
- Uncommitted changes on `bug/MYSL-3-fix-imprint` vs `main`:
  `app/src/data/content.ts`, `app/src/__tests__/SiteFooter.spec.ts`,
  `docs/architecture/{index,log,landing-page}.md`; unchanged
  `app/src/components/SiteFooter.vue` and `app/src/data/site.ts` cross-checked.
- Checks in `app/`: `npm run test:unit -- --run` (12 files, 267 tests passed),
  `npm run lint:check` (clean), `npm run build` (successful).
- Version bump 0.3.0 → 0.3.1 is intentionally deferred to story close and was
  not assessed.

### Findings

None.

- `IMPRINT_URL` is exactly `https://www.michaelschreiber.net/#/imprint` and is
  used only by the footer's "Imprint" link (`target="_blank"`,
  `rel="noopener noreferrer"`), so the fix reaches both the landing page and the
  privacy page, which share `SiteFooter`. No other reference to the old
  `/impressum` URL is left in `app/src`, `app/index.html` or `app/public`.
- `DEVELOPER_URL` stays the same, as the concept says.
- The four new footer tests select the link by the literal URL, so a wrong
  constant makes `wrapper.get` throw and the tests fail. They cover the label,
  the new tab, `rel` and the absence of `impressum`, which matches the testing
  concept table.
- The `landing-page.md` legal-links text, the `log.md` row and the `index.md`
  entries match the change.
- Manual check left for the user review: after deployment, clicking "Imprint"
  should open the imprint page of michaelschreiber.net in a new tab.

### Verdict

positive
