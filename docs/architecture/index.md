# Architecture Documentation

This directory holds current, durable architecture concepts for the web
application in `app/`.

## Baseline

- [Technology Stack and Tooling](stack.md) — Vue 3, TypeScript, Vite, test,
  lint, and deployment baseline.

## Current Concepts

<!-- New entries will be added here by the Architect and Tester Agents -->

- [myStandby Landing Page](landing-page.md) — single-page, English-only Vue
  landing page with typed content data, a CSS Pixel 11 Pro device frame and
  Google Play links.
- [Tests for myStandby Landing Page](landing-page-tests.md) — content,
  component and page-composition coverage.
- [MYSL-1 SEO Optimization](MYSL-1-seo-optimization.md) — build-time head
  tags, Open Graph, JSON-LD, robots.txt and sitemap.xml generated from a typed
  SEO data module by a local Vite plugin; canonical host www.mystandby.app.
- [Tests for MYSL-1 SEO Optimization](MYSL-1-tests.md) — unit tests for the
  SEO data module, plugin tests against the real HTML files, and h1/alt-text
  component tests.
- [MYSL-2 Update Landing Page](MYSL-2-update-landing-page.md) — five new app
  screenshots (standby, modes, mode editor, widget picker, feedback) replace
  the old ones; features, Free/PRO table, PRO prices (€0.99/month, €7.99/year
  with 7-day trial, €19.99 lifetime), steps, FAQ,
  SEO description and privacy purchase paragraph match app 1.30.0.
- [Tests for MYSL-2 Update Landing Page](MYSL-2-tests.md) — screenshot files
  without orphans, feature icons, PRO price plans and price note, hero/PRO
  screenshots, FAQ and privacy subscription wording.

## Reviews

<!-- New entries will be added here by the Reviewer Agent -->
<!-- Format: * [Review for Ticket Title](story-id-review.md) - Short description of the latest verdict -->

- [Review for MYSL-1 SEO Optimization](MYSL-1-review.md) — round 2 (2026-10-05):
  positive — round-1 findings (stack.md, post-deploy JSON-LD check) resolved; checks pass.
- [Review for MYSL-2 Update Landing Page](MYSL-2-review.md) — round 1 (2026-10-19):
  positive — code and tests match the approved concept; facts match app 1.30.0; checks pass.

When a feature requires a durable architecture decision, add a concise
Markdown concept document here, list it in this section, and record the
decision in [log.md](log.md).
