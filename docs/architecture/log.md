# Architecture Documentation Log

This log records material decisions made in the current architecture
documentation.

| Date | Decision |
|---|---|
| 2026-10-04 | Adopted the `landing-page` concept: scaffolded `app/` (Vue 3, TypeScript, Vite, Vitest, ESLint) without router, Pinia or i18n; all copy in `src/data/content.ts`; screenshots shown in a CSS-built Pixel 11 Pro frame using pre-sized WebP files; no web fonts, analytics or cookies. |
| 2026-10-04 | Initialized the repository with the AI delivery setup of michaelschreiber.net: Trello-backed ticket workflow (`TBD`/`Open`/`In Progress`/`Review`/`Done`), Architect → Developer → Tester → Reviewer agents shared between Claude and Copilot via symlinks to `docs/agents/`, `[mslp-workflow]` description log entries, PR CI (`lint`, `test`, `build`) and GitHub Pages deployment from `app/`. |
