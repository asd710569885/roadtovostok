import { createRouter, createWebHistory } from 'vue-router'
import { applyRouteSeo, applyBlogPostSeo } from '../utils/seo.js'
import blogPosts from '../data/blog.js'
import { rasterMapRoutes } from './rasterMapRoutes.js'

/** Legacy ?section= from the old single-page wiki → path + hash. */
function resolveLegacyWikiSection(key) {
  if (!key || typeof key !== 'string') return null
  const pillarMap = {
    'pillar-weapons': { path: '/wiki/weapons' },
    'pillar-survival': { path: '/wiki/ammo' },
    'pillar-tasks': { path: '/wiki/npcs' },
    'pillar-maps': { path: '/wiki/maps' },
    'quick-finder': { path: '/wiki' },
    'community-wiki': { path: '/wiki', hash: '#wiki-community' },
    closing: { path: '/wiki' },
  }
  if (pillarMap[key]) return pillarMap[key]
  if (key.startsWith('finder-')) {
    const id = key.slice(7)
    const finderMap = {
      official: { path: '/wiki', hash: '#hub-official' },
      versions: { path: '/wiki', hash: '#hub-builds' },
      weapons: { path: '/wiki/weapons' },
      'armor-gear': { path: '/wiki' },
      items: { path: '/wiki/ammo' },
      ammo: { path: '/wiki/ammo' },
      world: { path: '/wiki/maps' },
      npcs: { path: '/wiki/npcs' },
    }
    if (finderMap[id]) return finderMap[id]
  }
  return null
}

function blogPostByAddressBar(addressBar) {
  return blogPosts.find((p) => p.addressBar === addressBar)
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, saved) {
    if (to.path === '/wiki' && to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 88 }
    }
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 80 }
    }
    if (saved) return saved
    // Same page, query-only changes (e.g. /map ↔ /map?pin=…) — keep scroll; avoid jumping to top on every pin tap.
    if (to.path === '/map' && from.path === '/map') {
      return false
    }
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: {
        title: 'Road to Vostok Guide | Wiki, Weapons, Maps, NPCs & Interactive Map',
        description:
          'Unofficial Road to Vostok wiki and player guide: weapons, ammo, map walkthroughs, NPC traders, interactive world map with pins, Start hub and updates. Area 05, Border Zone, Vostok—not affiliated with Road to Vostok Ltd.',
        keywords:
          'road to vostok, road to vostok wiki, road to vostok guide, road to vostok weapons, road to vostok map, road to vostok interactive map, road to vostok npcs, road to vostok steam, road to vostok demo, early access, Area 05, Border Zone, Vostok, field manual',
      },
    },
    {
      path: '/wiki',
      name: 'wiki',
      component: () => import('../views/wiki/WikiIndexView.vue'),
      meta: {
        title: 'Road to Vostok Wiki | Weapons, Ammo, Maps & NPCs',
        description:
          'Road to Vostok wiki hub: weapons, ammo, maps (Village, Shipyard, Highway, Minefield), NPCs & traders. Official Steam & roadtovostok.com links, interactive /map, Start guide and patch /updates.',
        keywords:
          'road to vostok wiki, road to vostok weapons, road to vostok ammo, road to vostok maps, road to vostok npcs, road to vostok traders, road to vostok steam, roadtovostok, Area 05, Border Zone, Vostok, demo, early access',
      },
    },
    {
      path: '/wiki/armor',
      redirect: '/wiki',
    },
    {
      path: '/wiki/items',
      redirect: '/wiki/ammo',
    },
    {
      path: '/wiki/weapons',
      name: 'wiki-weapons',
      component: () => import('../views/wiki/WikiWeaponsView.vue'),
      meta: {
        title: 'Road to Vostok Weapons Wiki | Reloads & Caliber Tables',
        description:
          'Road to Vostok weapons reference: reload mechanics, magazine & caliber tables, thumbnails, loot context and links to the ammo wiki. Unofficial field manual.',
        keywords:
          'road to vostok weapons, road to vostok guns, road to vostok reloading, road to vostok wiki, road to vostok ammo, road to vostok steam, survival fps',
      },
    },
    {
      path: '/wiki/ammo',
      name: 'wiki-ammo',
      component: () => import('../views/wiki/WikiAmmoView.vue'),
      meta: {
        title: 'Road to Vostok Ammo Wiki | Magazines & Calibers',
        description:
          'Road to Vostok ammo & magazine tables: stack sizes, weight, caliber pairing, loot notes and cross-links to the weapons wiki hub. Unofficial reference.',
        keywords:
          'road to vostok ammo, road to vostok magazines, road to vostok calibers, road to vostok wiki, road to vostok weapons, road to vostok loot, road to vostok steam',
      },
    },
    {
      path: '/wiki/maps/village',
      name: 'wiki-maps-village',
      component: () => import('../views/wiki/maps/WikiMapVillageView.vue'),
      meta: {
        title: 'Road to Vostok Village Map Wiki | Starter Zone & Generalist',
        description:
          'Village map guide for Road to Vostok: spawn shelter, Generalist trader, bandit clears, container counts & early loot. Links to interactive /map?pin=village.',
        keywords:
          'road to vostok village map, road to vostok starting area, road to vostok Generalist, road to vostok trader, road to vostok bandits, road to vostok loot, road to vostok wiki, Area 05, field manual',
      },
    },
    {
      path: '/wiki/maps/shipyard',
      name: 'wiki-maps-shipyard',
      component: () => import('../views/wiki/maps/WikiMapShipyardView.vue'),
      meta: {
        title: 'Road to Vostok Shipyard Map Wiki | Doctor & Containers',
        description:
          'Shipyard map for Road to Vostok: Doctor trader (Hamikot Logistics basement), container loot tables, demo build notes. Deep link /map?pin=shipyard.',
        keywords:
          'road to vostok shipyard map, road to vostok Doctor, road to vostok medic trader, road to vostok containers, Hamikot Logistics, road to vostok wiki, road to vostok loot, Area 05',
      },
    },
    {
      path: '/wiki/maps/highway',
      name: 'wiki-maps-highway',
      component: () => import('../views/wiki/maps/WikiMapHighwayView.vue'),
      meta: {
        title: 'Road to Vostok Highway Map Wiki | Village to Minefield',
        description:
          'Highway map guide: connector between Village & Minefield, cars, crates, long sightlines, bandits, shelter caveats. Interactive map /map?pin=highway.',
        keywords:
          'road to vostok highway map, road to vostok transit map, road to vostok Village, road to vostok Minefield, road to vostok bandits, road to vostok loot, road to vostok wiki',
      },
    },
    {
      path: '/wiki/maps/minefield',
      name: 'wiki-maps-minefield',
      component: () => import('../views/wiki/maps/WikiMapMinefieldView.vue'),
      meta: {
        title: 'Road to Vostok Minefield Map Wiki | Mines & Military Crates',
        description:
          'Minefield map: border mines, patrol cadence, military crates, RK-95 & 7.62×39 tips, seasonal visibility. /map?pin=minefield. Unofficial Border Zone guide.',
        keywords:
          'road to vostok minefield map, road to vostok border map, road to vostok mines, road to vostok military crate, road to vostok RK-95, Border Zone, road to vostok wiki',
      },
    },
    {
      path: '/wiki/maps',
      name: 'wiki-maps',
      component: () => import('../views/wiki/maps/WikiMapsIndexView.vue'),
      meta: {
        title: 'Road to Vostok Maps Wiki | All Locations & Atlas',
        description:
          'Index of Road to Vostok map guides: Village, Shipyard, Highway, Minefield—loot tables, traders, NPC links & the interactive world map with ?pin= deep links.',
        keywords:
          'road to vostok maps, road to vostok wiki maps, road to vostok world map, road to vostok interactive map, road to vostok Village, road to vostok Shipyard, road to vostok loot, road to vostok traders',
      },
    },
    {
      path: '/wiki/npcs/bandits',
      name: 'wiki-npcs-bandits',
      component: () => import('../views/wiki/WikiNpcBanditsView.vue'),
      meta: {
        title: 'Road to Vostok Bandits Wiki | Enemies, Loot & AI',
        description:
          'Bandits in Road to Vostok: loadouts, dual weapons, gear strips, AI behaviours (cover, ambush, flee) & field quirks. Linked from map atlas & walkthroughs.',
        keywords:
          'road to vostok bandits, road to vostok enemies, road to vostok hostile npcs, road to vostok combat AI, road to vostok loot, road to vostok wiki, Area 05',
      },
    },
    {
      path: '/wiki/npcs/generalist',
      name: 'wiki-npcs-generalist',
      component: () => import('../views/wiki/WikiNpcGeneralistView.vue'),
      meta: {
        title: 'Road to Vostok Generalist Wiki | Trader, Tasks & Location',
        description:
          'Generalist trader guide: barter stock, 10m restock, shelter refresh tip, tasks L1–4, step-by-step Village location. Road to Vostok Field Manual NPC page.',
        keywords:
          'road to vostok Generalist, road to vostok trader, road to vostok barter, road to vostok tasks, road to vostok Village trader, road to vostok wiki, road to vostok npcs',
      },
    },
    {
      path: '/wiki/npcs/doctor',
      name: 'wiki-npcs-doctor',
      component: () => import('../views/wiki/WikiNpcDoctorView.vue'),
      meta: {
        title: 'Road to Vostok Doctor Wiki | Med Trader & Shipyard Route',
        description:
          'Doctor NPC: medical barter, restock timer, task tiers & fees, Hamikot Logistics basement directions on Shipyard. Road to Vostok wiki with /map?pin=shipyard.',
        keywords:
          'road to vostok Doctor, road to vostok medic trader, road to vostok medkit, road to vostok Shipyard, Hamikot Logistics, road to vostok wiki, road to vostok npcs',
      },
    },
    {
      path: '/wiki/npcs',
      name: 'wiki-npcs',
      component: () => import('../views/wiki/WikiNpcsIndexView.vue'),
      meta: {
        title: 'Road to Vostok NPCs Wiki | Bandits, Generalist & Doctor',
        description:
          'NPC index: Bandits, Generalist (Village), Doctor (Shipyard)—tasks, barter, locations & map deep links. Unofficial Road to Vostok Field Manual hub.',
        keywords:
          'road to vostok npcs, road to vostok traders, road to vostok Bandits, road to vostok Generalist, road to vostok Doctor, road to vostok tasks, road to vostok wiki, road to vostok map',
      },
    },
    {
      path: '/guides',
      redirect: (to) => {
        const legacy = {
          '#weapons': '/wiki/weapons',
          '#survival': '/wiki/ammo',
          '#tasks': '/wiki/npcs',
          '#maps': '/wiki/maps',
          '#wiki-index': '/wiki',
          '#guides-community-wiki': '/wiki#wiki-community',
        }
        const path = legacy[to.hash || '']
        if (path) {
          const [p, h] = path.split('#')
          return { path: p, hash: h ? `#${h}` : undefined, replace: true }
        }
        if (to.hash?.startsWith('#wiki-')) {
          const id = to.hash.slice(6)
          const finderMap = {
            official: '/wiki#hub-official',
            versions: '/wiki#hub-builds',
            weapons: '/wiki/weapons',
            'armor-gear': '/wiki',
            items: '/wiki/ammo',
            ammo: '/wiki/ammo',
            world: '/wiki/maps',
            npcs: '/wiki/npcs',
          }
          const dest = finderMap[id]
          if (dest) {
            const [p, h] = dest.split('#')
            return { path: p, hash: h ? `#${h}` : undefined, replace: true }
          }
        }
        return { path: '/wiki', replace: true }
      },
    },
    {
      path: '/primer',
      redirect: '/start',
    },
    {
      path: '/updates',
      name: 'updates',
      component: () => import('../views/UpdatesView.vue'),
      meta: {
        title: 'Road to Vostok Updates | Patch Notes & Steam News',
        description:
          'Where to read Road to Vostok patch notes & news: official site, Steam hub, YouTube devlogs & roadmap. Always verify dates on first-party channels.',
        keywords:
          'road to vostok updates, road to vostok patch notes, road to vostok steam news, road to vostok roadmap, road to vostok early access, roadtovostok, road to vostok release date',
      },
    },
    {
      path: '/start',
      name: 'start',
      component: () => import('../views/StartView.vue'),
      meta: {
        title: 'Road to Vostok Start Guide | Demo, EA & PC Specs',
        description:
          'New-player Start hub: what Road to Vostok is, Demo vs Early Access, Steam, solo focus, mods outlook, checklist & PC requirements. Unofficial field manual.',
        keywords:
          'road to vostok start guide, road to vostok new player, road to vostok steam, road to vostok demo, road to vostok early access, road to vostok system requirements, road to vostok download, roadtovostok',
      },
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('../views/BlogListView.vue'),
      meta: {
        title: 'Road to Vostok Blog | Guides, Tips & Field Manual',
        description:
          'Editorial posts for Road to Vostok players: beginner guides, zones, systems—with links to wiki, /map atlas, Start page & official Steam / developer site.',
        keywords:
          'road to vostok blog, road to vostok guide, road to vostok beginner tips, road to vostok wiki, road to vostok steam, Area 05, Vostok, survival fps, field manual',
      },
    },
    {
      path: '/blog/:addressBar',
      name: 'blog-detail',
      component: () => import('../views/BlogDetailView.vue'),
      props: true,
      beforeEnter: (to) => {
        const post = blogPostByAddressBar(to.params.addressBar)
        if (!post) return { name: 'not-found', replace: true }
        return true
      },
      meta: {},
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('../views/MapView.vue'),
      meta: {
        title: 'Road to Vostok Interactive Map | Atlas & Wiki Pins',
        description:
          'Zoomable Road to Vostok world map: Area 05, Border Zone, Vostok pins, wiki summaries, NPC cards, loot notes & ?pin= links. Plus high-res area rasters (Village, Highway, School, Outpost, Minefield, Apartments, Terminal).',
        keywords:
          'road to vostok map, road to vostok interactive map, road to vostok world map, road to vostok atlas, road to vostok area maps, road to vostok village map, road to vostok minefield map, Area 05, Border Zone, Vostok, road to vostok loot',
      },
    },
    ...rasterMapRoutes,
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        title: 'About Road to Vostok Field Manual | Fan Wiki Site',
        description:
          'About roadtovostok.net: independent Road to Vostok player manual—wiki, map, weapons & NPCs. Not affiliated with Road to Vostok Ltd.; trademarks belong to the developer.',
        keywords:
          'road to vostok field manual, road to vostok fan site, road to vostok unofficial wiki, roadtovostok.net, road to vostok disclaimer, about field manual',
      },
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
      meta: {
        title: 'Contact | Road to Vostok Field Manual (Email)',
        description:
          'Email the Road to Vostok Field Manual maintainer: guide corrections, permissions & privacy. Unofficial fan site; no affiliation with Road to Vostok Ltd.',
        keywords:
          'road to vostok contact, road to vostok field manual email, roadtovostok.net contact, wiki corrections, fan site support',
      },
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('../views/PrivacyView.vue'),
      meta: {
        title: 'Privacy Policy | roadtovostok.net Field Manual',
        description:
          'Privacy policy for roadtovostok.net: logs, fonts, analytics, Google AdSense, cookies, retention & your rights (GDPR-style). How to contact the site operator.',
        keywords:
          'roadtovostok.net privacy, road to vostok field manual privacy, cookies policy, GDPR, fan site data policy, AdSense disclosure',
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
      meta: {
        title: '404 Not Found | Road to Vostok Field Manual',
        description:
          'Page not found on roadtovostok.net. Try the wiki index, Start guide, or interactive map from the home page.',
        keywords: 'road to vostok, 404, field manual, roadtovostok.net',
        robots: 'noindex, follow',
        canonical: false,
      },
    },
  ],
})

router.beforeEach((to) => {
  if (to.path === '/wiki' && to.query.section != null) {
    const raw = to.query.section
    const key = Array.isArray(raw) ? raw[0] : raw
    const dest = resolveLegacyWikiSection(key)
    if (dest) {
      const q = { ...to.query }
      delete q.section
      const hasOther = Object.keys(q).length > 0
      return {
        path: dest.path,
        hash: dest.hash || undefined,
        query: hasOther ? q : undefined,
        replace: true,
      }
    }
  }
  return true
})

router.afterEach((to) => {
  if (to.name === 'blog-detail') {
    const post = blogPostByAddressBar(to.params.addressBar)
    if (post) {
      applyBlogPostSeo(post, to.path)
      return
    }
  }
  applyRouteSeo(to)
})

export default router
