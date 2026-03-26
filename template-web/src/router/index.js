import { createRouter, createWebHistory } from 'vue-router'
import { applyRouteSeo } from '../utils/seo.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, _from, saved) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 80 }
    }
    if (saved) return saved
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: {
        title: 'Road to Vostok Field Manual | Weapons, Survival, Tasks & Demo/EA Guides',
        description:
          'Unofficial Road to Vostok player guide: realistic weapons and reloading, survival and medical, traders and tasks, map risk and border crossings. Demo vs Early Access notes and SEO-friendly sections.',
        keywords:
          'road to vostok, road to vostok guide, survival fps, road to vostok demo, early access, weapons reloading, vostok permadeath, barter traders, border zone, Area 05, steam',
      },
    },
    {
      path: '/guides',
      name: 'guides',
      component: () => import('../views/GuidesView.vue'),
      meta: {
        title: 'Road to Vostok Guides & Wiki Index | Weapons, Survival, Traders, Maps & Quick Finder',
        description:
          'Single hub for Road to Vostok: wiki-style quick finder (weapons, armor, items, maps, traders, demo/EA) plus editorial pillars with planned articles—combat, survival, tasks, maps. Links to world map, start guide, and optional Fandom community wiki.',
        keywords:
          'road to vostok wiki, road to vostok guide, road to vostok tasks, road to vostok guns, weapons reloading, armor, items, map, traders, fishing, crafting, survival mechanics, demo, early access',
      },
    },
    {
      path: '/start',
      name: 'start',
      component: () => import('../views/StartView.vue'),
      meta: {
        title: 'Road to Vostok Demo & Early Access | Steam, PC Specs & Start Guide',
        description:
          'Start here for Road to Vostok: Steam demo and Early Access expectations, solo vs multiplayer clarity, PC minimum and recommended specs, save hygiene, and first-session checklist.',
        keywords:
          'road to vostok steam, road to vostok demo, road to vostok release date, early access, download, road to vostok online, save backup, system requirements, PC',
      },
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('../views/MapView.vue'),
      meta: {
        title: 'Road to Vostok World Map | Area 05, Border Zone & Vostok',
        description:
          'Interactive fan map of Road to Vostok: Area 05, Border Zone, Vostok, Highway, Minefield, and coastal POIs with guide notes. Uses official world artwork for reference.',
        keywords:
          'road to vostok map, Area 05, Border Zone, Vostok, minefield, highway, village, world map, demo map, crossing',
      },
    },
    {
      path: '/wiki',
      redirect: { path: '/guides', hash: '#wiki-index' },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        title: 'About | Road to Vostok Field Manual — Unofficial Player Guide',
        description:
          'Learn who runs Road to Vostok Field Manual: an unofficial guide to weapons, survival, traders, maps, Demo vs Early Access, and the interactive world map. Not affiliated with Road to Vostok Ltd.',
        keywords:
          'road to vostok, road to vostok guide, unofficial guide, fan site, about, disclaimer, road to vostok wiki, steam demo, early access',
      },
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
      meta: {
        title: 'Contact | Road to Vostok Field Manual — Email & Corrections',
        description:
          'Contact the Road to Vostok Field Manual maintainer by email for guide corrections, permission questions, and privacy requests. No contact form—direct email only.',
        keywords: 'road to vostok, contact, email, corrections, fan guide, roadtovostok.net',
      },
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('../views/PrivacyView.vue'),
      meta: {
        title: 'Privacy Policy | Road to Vostok Field Manual (roadtovostok.net)',
        description:
          'Privacy policy for roadtovostok.net: what data is collected when you read the Road to Vostok field manual, hosting logs, Google Fonts, cookies, your rights, retention, and how to contact us.',
        keywords:
          'road to vostok, privacy policy, roadtovostok.net, cookies, GDPR, data protection, fan site',
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
      meta: {
        title: 'Page not found | Road to Vostok Field Manual',
        description: 'The requested page does not exist on this unofficial Road to Vostok field manual.',
        keywords: 'road to vostok, 404',
        robots: 'noindex, follow',
        canonical: false,
      },
    },
  ],
})

router.afterEach((to) => {
  applyRouteSeo(to)
})

export default router
