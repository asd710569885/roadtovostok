# Road to Vostok — Astro SSG (`roadtovostok-web`)

**Deploy this directory** to Vercel (Root Directory: `roadtovostok-web`).  
The sibling `template-web/` folder is the legacy Vue SPA — do not deploy it.

## Architecture

| Layer | Technology | Purpose |
|-------|------------|---------|
| Pages | `.astro` in `src/pages/` | File-based routing, SSG HTML, SEO at build time |
| Layout | `BaseLayout.astro` | Global `<head>`, header/footer, JSON-LD slot |
| SEO | `src/lib/seo.ts` + `src/lib/nav.ts` | Meta tags, canonical, structured data helpers |
| Data | `src/data/*.js` | Shared content modules (same as template-web) |
| Styles | `src/styles/` | Global + per-page CSS (extracted from Vue scoped styles) |
| Islands | 3× `.vue` in `src/components/islands/` | Leaflet / pan-zoom maps only (`client:only="vue"`) |

## Quick start

```powershell
cd roadtovostok-web
npm install
npm run dev:force
```

Open the URL printed in the terminal (usually `http://localhost:4321/`).

If you see `NoMatchingRenderer` or `504 Outdated Optimize Dep`:

```powershell
npm run clean
npm run dev:force
```

**Always run dev from `roadtovostok-web/`**, not from the repo root or `template-web/`.

## Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Dev server |
| `npm run dev:force` | Dev server + rebuild Vite deps |
| `npm run build` | Production build → `dist/` |
| `npm run sitemap` | Build + generate `sitemap-index.xml` via `@astrojs/sitemap` |
| `npm run preview` | Preview `dist/` |
| `npm run clean` | Remove `.astro`, `node_modules/.vite`, `dist` |
| `npm run verify` | Build + list generated routes |

## Astro conventions used

- **One `<h1>` per page** in `.astro` (static). Vue islands use `<h2>`+ only.
- **SEO shell in Astro**, interactivity in Vue islands (`client:only="vue"`).
- **JSON-LD** via `breadcrumbJsonLd`, `webPageJsonLd`, `articleJsonLd`, `collectionPageJsonLd` in `src/lib/seo.ts`.
- **Imports** omit `.ts` extensions: `from '../lib/nav'`, `from '../lib/seo'`.
- **Leaflet CSS** loaded only on raster map pages (`map/[slug].astro`), not globally.
- **Legacy URLs** handled by `guides.astro` + `LegacyRedirect.astro` on `/wiki`.
- **Sitemap** generated at build time (`npm run sitemap`); `robots.txt` points to `/sitemap-index.xml`. Exclude `/guides` and `/404`.

## Route map

| URL | Astro page |
|-----|------------|
| `/` | `src/pages/index.astro` |
| `/start`, `/updates`, `/about`, `/contact`, `/privacy` | top-level `.astro` |
| `/blog`, `/blog/[slug]` | `src/pages/blog/` |
| `/map`, `/map/[slug]` | `src/pages/map/` |
| `/wiki`, `/wiki/weapons`, `/wiki/ammo` | `src/pages/wiki/` |
| `/wiki/maps`, `/wiki/maps/[slug]` | `src/pages/wiki/maps/` |
| `/wiki/npcs`, `/wiki/npcs/[slug]` | `src/pages/wiki/npcs/` |
| `/guides` | legacy redirect page (noindex) |
| `/404` | `src/pages/404.astro` (noindex) |

Redirects in `astro.config.mjs`: `/primer`→`/start`, `/wiki/armor`→`/wiki`, `/wiki/items`→`/wiki/ammo`.

## Vercel

`vercel.json` sets `outputDirectory: "dist"` and `buildCommand: "npm run build"`.
