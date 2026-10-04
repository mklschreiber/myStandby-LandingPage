# Architecture Documentation Log

This log records material decisions made in the current architecture
documentation.

| Date | Decision |
|---|---|
| 2026-10-04 | Moved the AI setup to the shared ai-base submodule (.ai-base/) and the ticket workflow from Trello to Jira (project MYSL), per MYS-44 (https://github.com/mklschreiber/myStandby/blob/main/docs/architecture/MYS-44-ai-base-setup.md). Generic agents/skills/handbook are symlinked from ai-base. Project values live in docs/ai-project.md. Skills are now /open-tickets and /implement-next-ticket. The [mslp-workflow] description log, Trello REST skills and label-based branch prefixes are removed. |
| 2026-10-04 | Added an own privacy policy at `/privacy/` as a second Vite entry (multi-page build instead of Vue Router) and removed every link to software-lab.io, which is going offline. The policy names Firebase Crashlytics, Google Analytics for Firebase, the Cloudflare Workers feedback relay, Jira (Atlassian), Formspree for old app versions, Google Play Billing and GitHub Pages hosting. |
| 2026-10-04 | Adopted the `landing-page` concept: scaffolded `app/` (Vue 3, TypeScript, Vite, Vitest, ESLint) without router, Pinia or i18n; all copy in `src/data/content.ts`; screenshots shown in a CSS-built Pixel 11 Pro frame using pre-sized WebP files; no web fonts, analytics or cookies. |
| 2026-10-04 | Initialized the repository with the AI delivery setup of michaelschreiber.net: Trello-backed ticket workflow (`TBD`/`Open`/`In Progress`/`Review`/`Done`), Architect → Developer → Tester → Reviewer agents shared between Claude and Copilot via symlinks to `docs/agents/`, `[mslp-workflow]` description log entries, PR CI (`lint`, `test`, `build`) and GitHub Pages deployment from `app/`. |
