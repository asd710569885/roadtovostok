import { createRouter, createWebHistory } from 'vue-router'
import { applyRouteSeo, applyBlogPostSeo } from '../utils/seo.js'
import blogPosts from '../data/blog.js'

function blogPostByAddressBar(addressBar) {
  return blogPosts.find((p) => p.addressBar === addressBar)
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, _from, saved) {
    if (to.path === '/wiki' && to.query.section) {
      return { top: 0 }
    }
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
      path: '/wiki',
      name: 'wiki',
      component: () => import('../views/GuidesView.vue'),
      meta: {
        title: 'Road to Vostok Wiki Index | Weapons, Survival, Traders, Maps & Quick Finder',
        description:
          'Wiki-style hub for Road to Vostok: quick finder with official roadtovostok.com/game + Steam News links, weapons/armor/items/maps/traders clusters, editorial pillars (combat, survival, tasks, maps), and community pointers (Fandom, Discord, Reddit, YouTube). Cross-links to /map, /start, /updates.',
        keywords:
          'road to vostok wiki, road to vostok steam, roadtovostok.com, Area 05, Border Zone, Vostok, Bandits Guards Military, road to vostok tasks, road to vostok guns, weapons reloading, traders, map, demo, early access, discord, fandom',
      },
    },
    {
      path: '/guides',
      redirect: (to) => {
        const legacy = {
          '#weapons': 'pillar-weapons',
          '#survival': 'pillar-survival',
          '#tasks': 'pillar-tasks',
          '#maps': 'pillar-maps',
          '#wiki-index': 'quick-finder',
          '#guides-community-wiki': 'community-wiki',
        }
        let section = legacy[to.hash || '']
        if (!section && to.hash?.startsWith('#wiki-')) {
          section = `finder-${to.hash.slice(6)}`
        }
        const q = { ...to.query }
        if (section) q.section = section
        return { path: '/wiki', query: Object.keys(q).length ? q : undefined }
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
        title: 'Road to Vostok Updates & Official News | Steam, Site, Roadmap',
        description:
          'Where to read Road to Vostok patch notes and announcements: official site, Steam, YouTube devlogs, and the /game roadmap section—plus a snapshot to verify against roadtovostok.com (standalone /faq and /roadmap URLs may 404).',
        keywords:
          'road to vostok updates, patch notes, steam news, roadmap, early access date, roadtovostok.com',
      },
    },
    {
      path: '/start',
      name: 'start',
      component: () => import('../views/StartView.vue'),
      meta: {
        title: 'Road to Vostok Start | Demo, Early Access, Steam & PC Specs',
        description:
          'New-player Start hub for Road to Vostok: what the game is, EA date and pricing, platforms, solo vs multiplayer, mods and localization, first-session checklist, Demo vs EA expectations, and Steam-style PC requirements. Unofficial fan site.',
        keywords:
          'road to vostok steam, road to vostok demo, road to vostok release date, early access, download, road to vostok online, save backup, system requirements, PC, new player guide, roadtovostok, start guide',
      },
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('../views/BlogListView.vue'),
      meta: {
        title: 'Blog | Road to Vostok Field Manual — Player Guides & Commentary',
        description:
          'Editorial posts for Road to Vostok players: beginner orientation, zone progression, systems explainers, and links to our wiki, Start hub, and official sources.',
        keywords:
          'road to vostok blog, road to vostok beginner guide, road to vostok tips, field manual, Area 05, Vostok, survival fps',
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
        title: 'Road to Vostok World Map | Area 05, Border Zone & Vostok',
        description:
          'Interactive fan map of Road to Vostok: Area 05, Border Zone, Vostok, Highway, Minefield, and coastal POIs with guide notes. Uses official world artwork for reference.',
        keywords:
          'road to vostok map, Area 05, Border Zone, Vostok, minefield, highway, village, world map, demo map, crossing',
      },
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
