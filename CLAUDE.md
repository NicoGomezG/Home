# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install       # install deps
ng serve           # dev server at localhost:4200
ng build            # production build -> dist/portfolio
ng test --watch=false   # unit tests (Vitest), single run
```

There is no e2e test setup and no lint script configured. Use `npx @angular/cli@21` if the global `ng` isn't installed (this environment's Node version pins Angular CLI to v21 — v22 requires a newer Node than is installed here).

Local dev (`ng serve`) has no backend, so anything under `api/` (Vercel serverless functions) will 404 locally. Test those either by deploying to Vercel or running `vercel dev` (not currently set up).

## Architecture

Personal portfolio site: Angular 21 (standalone components, signals, new `@if`/`@for` control flow) + Tailwind CSS 4, deployed to Vercel with Supabase as the optional backend.

**Fixed dark theme** — the whole site uses one hardcoded dark palette (`neutral-950` background, `neutral-300`/`400` body text, `neutral-100` headings, `neutral-800` borders) defined once in `src/styles.scss` and repeated as plain Tailwind classes per component. There is no light/dark toggle and no `dark:` variants — don't reintroduce them without discussing it, since every component was deliberately converted away from that pattern. Font is Fontshare's "General Sans", loaded via `<link>` in `src/index.html`.

**Routing**: `src/app/app.routes.ts` lazy-loads three standalone page components — `/` (Profile), `/proyectos` (Projects), `/bots` (Bots) — wrapped by `App` (`src/app/app.ts`) which renders `Navbar` + `<router-outlet>` + `Footer` from `src/app/layout/`.

**`src/app/core/`** — shared, page-agnostic code:
- `models/project.model.ts` — `Project` and `Bot` interfaces.
- `data/projects.data.ts`, `data/bots.data.ts` — the actual current content (real projects/bots, not placeholders) for when Supabase isn't configured.
- `services/supabase.service.ts` — creates a Supabase client only if `environment.supabaseUrl` isn't still the `YOUR-PROJECT-REF` placeholder (`isConfigured` flag). The anon key is meant to be committed/public; real security is via Supabase RLS, not hiding this key.
- `services/projects.service.ts` — tries the Supabase `projects` table first, falls back to `core/data/projects.data.ts` if Supabase isn't configured or the table is empty/errors. This fallback-to-local-data pattern is the intended way to add a new content source later (e.g. a `bots` table) — mirror it rather than hard-requiring Supabase.
- `services/github.service.ts` — fetches `/api/github-contributions?username=...` (see below), not any third-party contributions API directly.

**GitHub contributions calendar** (`src/app/shared/github-calendar/`): a from-scratch SVG heatmap (not an embedded image/widget). It renders the *last year only*, matching what GitHub itself shows on a profile. The data comes from `api/github-contributions.js`, a Vercel serverless function that scrapes GitHub's own `https://github.com/users/{username}/contributions` HTML fragment server-side (regex-parsed, no HTML parser dependency) and returns `{ total, days: [{date, level, count}] }`. This exists because third-party contribution-graph APIs/widgets were tried first and rejected: they either undercounted (missing private contributions the user has opted into showing) or hardcoded a light-gray "no activity" color that looked broken on this site's dark background. Do not swap this back to a third-party widget without re-verifying it against the user's real profile numbers.

**`src/app/shared/`** — reusable presentational components used across pages: `project-card/` (used by the Projects page), `github-calendar/` (used by Profile).

**`public/`** — served as-is from the site root by Angular. `public/images/` (profile photo) and `public/logos/` (per-project logos, referenced by `Project.logoUrl`) follow this convention; keep new static assets under `public/` rather than `src/assets`.

**Bots page** (`src/app/pages/bots/`): intentionally incomplete. It lists bots from `core/data/bots.data.ts` with disabled "Descargar" buttons and a visible banner stating that access control (login, Discord role gating, etc.) isn't implemented yet. Don't wire up real downloads without deciding on an auth mechanism first — that decision has been explicitly deferred, not forgotten.

**Vercel deploy**: `vercel.json` has a SPA rewrite (`/(.*)` → `/index.html`) so Angular Router routes work on direct load/refresh. `api/*.js` files are auto-deployed as serverless functions alongside the static Angular build — this is how the site gets any server-side behavior despite being a plain `ng build` static app (no Angular SSR).
