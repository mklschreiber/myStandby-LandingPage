---
type: Test Concept
title: Tests for myStandby Landing Page
description: Unit and component coverage for the landing-page content, device frame, Play Store link and page composition.
tags: [landing-page, tests]
timestamp: 2026-10-04T06:35:00+07:00
---

## Requirements Authority

Requested directly by the project owner in chat on 2026-10-04 (no Trello card).

## Scope

Content integrity, the `PixelPhone` and `PlayStoreButton` components, and the
composed `App`. Visual layout is verified manually in the browser.

## Test Cases

| Module | Test Case | Level | Status |
|--------|----------|-------|--------|
| content | Play Store URL, unique feature ids, complete feature list, PRO flags | Unit | ✅ |
| content | every screenshot ships 480/960 WebP files and has alt text | Unit | ✅ |
| PixelPhone | srcset, alt, lazy/eager loading, camera and side buttons | Component | ✅ |
| PlayStoreButton | href, `target`/`rel`, large variant | Component | ✅ |
| App | headline, feature cards, gallery items, FAQ, 5 Play links, anchors | Component | ✅ |

## Untested Areas

Responsive layout and visual styling: checked manually in Chrome at 1440 px and
500 px width (no horizontal overflow).
