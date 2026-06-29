import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import vue from '@astrojs/vue'

/** Align sitemap lastmod with wiki editorial verification date. */
const WIKI_LAST_MOD = '2026-06-24'
const SITE = 'https://roadtovostok.net'

function sitemapPriority(pathname) {
  if (pathname === '/' || pathname === '') return 1
  if (['/start', '/map', '/wiki', '/updates'].includes(pathname)) return 0.92
  if (pathname.startsWith('/wiki/weapons/') || pathname.startsWith('/wiki/maps/')) return 0.86
  if (pathname.startsWith('/map/')) return 0.88
  if (pathname.startsWith('/wiki/')) return 0.82
  if (pathname.startsWith('/blog/')) return 0.75
  return 0.68
}

function sitemapChangefreq(pathname) {
  if (
    pathname === '/' ||
    pathname.startsWith('/wiki/') ||
    pathname.startsWith('/map') ||
    ['/start', '/updates'].includes(pathname)
  ) {
    return 'weekly'
  }
  return 'monthly'
}

function shouldIncludeInSitemap(url) {
  const pathname = new URL(url).pathname.replace(/\/$/, '') || '/'
  if (pathname.endsWith('/404') || pathname.endsWith('/guides')) return false
  if (pathname.endsWith('/wiki/armor') || pathname.endsWith('/primer')) return false
  if (['/about', '/contact', '/privacy'].includes(pathname)) return false
  return true
}

// https://docs.astro.build/en/guides/integrations-guide/vue/
export default defineConfig({
  site: SITE,
  output: 'static',
  integrations: [
    vue(),
    sitemap({
      filter: (page) => shouldIncludeInSitemap(page),
      serialize(item) {
        const pathname = new URL(item.url).pathname.replace(/\/$/, '') || '/'
        return {
          url: item.url,
          lastmod: WIKI_LAST_MOD,
          changefreq: sitemapChangefreq(pathname),
          priority: sitemapPriority(pathname),
        }
      },
    }),
  ],
  redirects: {
    '/primer': '/start',
    '/wiki/armor': '/wiki',
    '/about': '/legal/about',
    '/contact': '/legal/contact',
    '/privacy': '/legal/privacy',
  },
  vite: {
    optimizeDeps: {
      include: ['vue', 'leaflet'],
    },
  },
  // Avoid stale dev-toolbar 504 (Outdated Optimize Dep) during heavy dependency changes.
  devToolbar: {
    enabled: false,
  },
})
