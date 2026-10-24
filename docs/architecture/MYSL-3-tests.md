---
type: Test Concept
title: Tests for MYSL-3 Fix Imprint
description: Footer component tests that lock the imprint link to exactly https://www.michaelschreiber.net/#/imprint, opened in a new tab, with the old /impressum URL gone.
tags: [MYSL-3, tests]
timestamp: 2026-10-21T21:00:00+07:00
---

## Requirements Authority

Jira MYSL-3 — https://mklschreiber.atlassian.net/browse/MYSL-3 (AC: Imprint is linked
correctly). Decisions from [MYSL-3-fix-imprint.md](MYSL-3-fix-imprint.md). No design
artifact exists.

## Scope

- **Component level (Vue Test Utils, jsdom):** `SiteFooter` is mounted with the real
  content data. The imprint link is selected by the **literal** URL
  `https://www.michaelschreiber.net/#/imprint` (not the imported `IMPRINT_URL`), so a
  wrong constant fails the tests. Checked: label "Imprint", `target="_blank"`,
  `rel="noopener noreferrer"`, and that the footer no longer contains `impressum`.
- **Not tested:** that the external page michaelschreiber.net actually serves the imprint
  at that hash route (outside this repository); footer layout and styling (unchanged).

## Test Cases

| Class / Module | Test Case | Level | Status |
|--------|----------|-------|--------|
| SiteFooter | links the label "Imprint" to https://www.michaelschreiber.net/#/imprint | Component | ✅ |
| SiteFooter | opens the imprint in a new tab | Component | ✅ |
| SiteFooter | opens the imprint with rel="noopener noreferrer" | Component | ✅ |
| SiteFooter | no longer links to the broken /impressum page | Component | ✅ |

## Untested Areas

- **Manual browser check:** after deployment, clicking "Imprint" in the footer opens
  https://www.michaelschreiber.net/#/imprint in a new tab and shows the imprint.
