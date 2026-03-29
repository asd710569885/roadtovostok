<script setup>
import { computed, watch, nextTick } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

/** Programmatic scroll targets use data-section-anchor (no URL #hash). Cross-route: /wiki?section=pillar-weapons */
const WIKI_SCROLL_PAD = 88

const route = useRoute()
const router = useRouter()

function scrollToWikiSection(key) {
  if (typeof document === 'undefined' || !key) return
  const el = document.querySelector(`[data-section-anchor="${key}"]`)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - WIKI_SCROLL_PAD
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
}

function consumeWikiSectionQuery() {
  if (route.path !== '/wiki') return
  const raw = route.query.section
  const key = Array.isArray(raw) ? raw[0] : raw
  if (!key || typeof key !== 'string') return
  nextTick(() => {
    scrollToWikiSection(key)
    const rest = { ...route.query }
    delete rest.section
    const hasOther = Object.keys(rest).length > 0
    router.replace({ path: '/wiki', query: hasOther ? rest : undefined })
  })
}

watch(
  () => [route.path, route.query.section],
  () => consumeWikiSectionQuery(),
  { flush: 'post', immediate: true },
)

/**
 * Quick finder clusters + external routes. Internal jumps use scrollKey → data-section-anchor.
 * `href` = primary sources (official site, Steam) or community hubs—never scraped third-party prose.
 */
const wikiCategories = [
  {
    id: 'official',
    kicker: 'Canon',
    title: 'Official site & Steam',
    lead:
      'Baseline for zones, factions, sandbox pitch, and the named Early Access roadmap builds (Road, Nomads, Signal, …). Marketing copy can run ahead of your installed build—always match claims to the HUD build string and Steam News.',
    links: [
      {
        label: 'roadtovostok.com/game',
        blurb:
          'Area 05 → Border Zone → Vostok loop, Bandits / Guards / Military, permadeath rules, core feature list, and public roadmap targets.',
        href: 'https://www.roadtovostok.com/game',
      },
      {
        label: 'Steam: store + News hub',
        blurb: 'Purchase page, Steam-posted requirements, and patch-oriented news for the app ID—best single place for build-tied deltas.',
        href: 'https://store.steampowered.com/app/1963610/Road_to_Vostok/',
      },
      {
        label: 'Steam News (app filter)',
        blurb: 'Chronological posts from the developer; use alongside our /updates page when you need a second mirror.',
        href: 'https://store.steampowered.com/news/app/1963610',
      },
      {
        label: 'Steam Community hub',
        blurb: 'Discussions, screenshots, and user guides—high noise; verify anything mechanical in-client or against official posts.',
        href: 'https://steamcommunity.com/app/1963610',
      },
    ],
  },
  {
    id: 'versions',
    kicker: 'Boot · Builds',
    title: 'Game, demo & Early Access',
    lead:
      'Version context is the spine of every wiki-style lookup: what players call “the demo” and what ships in Early Access diverge in tasks, loot, and tuning. Cross-check the official game page for announced EA dates and roadmap waves before trusting secondary wikis.',
    links: [
      {
        label: 'Start: onboarding · demo / EA / PC specs',
        blurb: 'Merged onboarding: first-session flow, Demo vs EA matrix, hardware floors, official links.',
        to: '/start',
      },
      {
        label: 'Updates & official news',
        blurb: 'Where patch notes and announcements live; homepage snapshot and roadmap context.',
        to: '/updates',
      },
      {
        label: 'Home overview',
        blurb: 'Orientation, pillars, coverage table, map spotlight.',
        to: '/',
      },
      {
        label: 'Engine note (Godot)',
        blurb: 'Public messaging positions RTV on Godot with a PC-first ship; Linux/console timing is “later”—confirm on Steam before you buy.',
        href: 'https://www.roadtovostok.com/game',
      },
    ],
  },
  {
    id: 'weapons',
    kicker: 'Combat',
    title: 'Weapons & gun handling',
    lead:
      'Clusters around realistic FPS cadence, malfunctions, and attachments—aligned with the official “realistic FPS mechanics” bullet. Deep articles stay editorial until each topic earns its own route.',
    links: [
      {
        label: 'Weapons & reloading (pillar)',
        blurb: 'Shotgun loading, rifle and pistol flow, failure drills, rails—see pillar below.',
        scrollKey: 'pillar-weapons',
      },
      {
        label: 'Official feature framing',
        blurb: 'Marketing list groups gunplay with physics loot, factions, and dynamic events—useful vocabulary for search, not a stats sheet.',
        href: 'https://www.roadtovostok.com/game',
      },
      {
        label: 'Steam patch trail',
        blurb: 'Weapon-tuning and content drops usually surface here first alongside in-game verification.',
        href: 'https://store.steampowered.com/news/app/1963610',
      },
    ],
  },
  {
    id: 'armor-gear',
    kicker: 'Protection',
    title: 'Armor, carriers & helmets',
    lead:
      'Plates, rigs, and helmets intersect stamina and injury. Official copy groups hostile AI, loot physics, and survival systems—split reading between combat handling, survival pillar, and Steam notes when armor patches land.',
    links: [
      {
        label: 'Weapons & reloading',
        blurb: 'Combat loadouts and handling context.',
        scrollKey: 'pillar-weapons',
      },
      {
        label: 'Survival & medical',
        blurb: 'Injury, meds, and sustain that interact with gear.',
        scrollKey: 'pillar-survival',
      },
      {
        label: 'Core systems overview',
        blurb: 'High-level feature list from the developer site—no per-slot armor tables.',
        href: 'https://www.roadtovostok.com/game',
      },
    ],
  },
  {
    id: 'items',
    kicker: 'Loot · Craft',
    title: 'Items, food, medical & misc',
    lead:
      'Public FAQs and interviews sometimes cite broad counts (hundreds of items, dozens of weapons) as long-term targets—they will drift. Treat numbers as directional; ground every listicle in the build you recorded.',
    links: [
      {
        label: 'Survival & medical (pillar)',
        blurb: 'Crafting, fishing, seasons, triage—where item guides dock first.',
        scrollKey: 'pillar-survival',
      },
      {
        label: 'Tasks & traders',
        blurb: 'Barter and task rewards that consume or produce items.',
        scrollKey: 'pillar-tasks',
      },
      {
        label: 'Physics-based loot (official)',
        blurb: 'Developer-stated emphasis on physicalized stashes and shelter staging—pairs with our survival pillar notes.',
        href: 'https://www.roadtovostok.com/game',
      },
      {
        label: 'Steam guides & discussions',
        blurb: 'Player-authored loot routes—spot-check against your client before risking a run.',
        href: 'https://steamcommunity.com/app/1963610/guides/',
      },
    ],
  },
  {
    id: 'world',
    kicker: 'Atlas',
    title: 'World map, POIs & crossings',
    lead:
      'Official prose calls out mines, obstacles, and boat crossings in the Border Zone, plus the three-zone progression. Promo map labels (village, highway, etc.) match the art we mirror on /map; traversal truth is always build-specific.',
    links: [
      {
        label: 'Interactive world map',
        blurb: 'Fan UI on the published world image; pins are reference only.',
        to: '/map',
      },
      {
        label: 'Maps & crossings (pillar)',
        blurb: 'Border checklists, mine discipline, traversal notes.',
        scrollKey: 'pillar-maps',
      },
      {
        label: 'Written zone overview',
        blurb: 'Same narrative players quote for “what is Vostok”—use before deep-diving fan maps.',
        href: 'https://www.roadtovostok.com/game',
      },
    ],
  },
  {
    id: 'npcs',
    kicker: 'Economy · Threats',
    title: 'Traders, tasks, factions & progression',
    lead:
      'Official copy names Bandits in Area 05, corrupt Guards (with air support) on the border, and Military heavy weapons/armor in Vostok. Trading & tasks, shelter customization, and multi-shelter play are pitched as core loops—sequence guides belong in the tasks pillar with loud build labels.',
    links: [
      {
        label: 'Tasks & traders (pillar)',
        blurb: 'Roster archetypes, barter bundles, keys and gated content.',
        scrollKey: 'pillar-tasks',
      },
      {
        label: 'Combat pillar (faction pressure)',
        blurb: 'When AI behavior or loadouts change patch to patch.',
        scrollKey: 'pillar-weapons',
      },
      {
        label: 'Maps & crossings',
        blurb: 'Where Guards’ air assets and border gauntlets intersect routing.',
        scrollKey: 'pillar-maps',
      },
      {
        label: 'Factions & tasks (official summary)',
        blurb: 'Single-page refresher on who shoots at you where, plus the sandbox “no forced playstyle” note.',
        href: 'https://www.roadtovostok.com/game',
      },
      {
        label: 'Demo vs Early Access',
        blurb: 'How progression expectations differ by build.',
        to: '/start',
      },
    ],
  },
]

const fandom = {
  href: 'https://roadtovostok.fandom.com/wiki/Road_To_Vostok_Wiki',
  label: 'Road To Vostok Wiki on Fandom',
}

/** Other player hubs—same disclaimer as Fandom: verify in client / official posts. */
const communityLinks = [
  {
    href: 'https://discord.gg/roadtovostok',
    label: 'Official Discord (invite)',
    blurb: 'Announcements and community rooms; invites can rotate—use the latest link from the developer site or Steam if this fails.',
  },
  {
    href: 'https://www.reddit.com/r/RoadtoVostokGame/',
    label: 'r/RoadtoVostokGame',
    blurb: 'Build-specific questions and clips; treat answers as anecdotal unless they cite patches or repro steps.',
  },
  {
    href: 'https://www.youtube.com/@RoadToVostok',
    label: 'YouTube @RoadToVostok',
    blurb: 'Official channel for demos, trailers, and long-form updates—pair with Steam News for patch timing.',
  },
]

const pillars = [
  {
    id: 'weapons',
    title: 'Weapons & reloading',
    subtitle: 'Combat / ballistics',
    summary:
      'Road to Vostok leans into deliberate gun handling: magazines, chamber states, and input order change the tempo of a fight. This pillar is where “how do I…” pages collect until a topic deserves its own route.',
    effort: 'High',
    reading: '~12–18 min per deep article',
    articles: [
      { name: 'Shotgun loading: tube vs box quirks', note: 'Demo and EA builds disagree on small interaction details—verify in your client.' },
      { name: 'Rifles & pistols: slide lock, reload cancels, malfunctions', note: 'UI tells you more than you think once you know what to watch.' },
      { name: 'Failure to fire checklist', note: 'Ammo state first, then weapon condition.' },
      { name: 'Rails & attachments: optics, grips, lights', note: 'Item pool grows with patches; treat loadout pics as dated.' },
      {
        name: 'Roadmap: Build 4 “Gunslinger” hooks (penetration, modding kits)',
        note: 'Public roadmap text—confirm shipping features against Steam News + your build string.',
      },
      { name: 'Melee cadence vs rifle dominance', note: 'Melee systems were a stated roadmap focus; patch notes decide what is live.' },
      { name: 'Grenades & suppression when they land in EA', note: 'Track Steam posts; avoid cribbing Tarkov assumptions.' },
    ],
    tips: [
      'If a sequence is frame-tight, record it—text alone loses nuance.',
      'When patch notes touch gunplay, restate which build you tested on at the top of the page.',
    ],
  },
  {
    id: 'survival',
    title: 'Survival & medical',
    subtitle: 'Vitality / crafting',
    summary:
      'This track is the “why did I die while looting?” debugger: cold, calories, injuries, fractures, and the crafting loops that buy you time. Fishing, boats, and seasonal shifts get standalone entries to match long-tail searches.',
    effort: 'Very high',
    reading: '~15–22 min per deep article',
    articles: [
      { name: 'Medical triage: bleeding, pain, fractures', note: 'Ordered checklist beats a wall of symptom text.' },
      { name: 'Fishing & boats: prep → route → extract', note: 'Pair with the maps pillar once shoreline risks are mapped in your build.' },
      { name: 'Crafting bench priorities: what earns backpack slots', note: 'Scarcity changes patch to patch—state what you saw, not gospel.' },
      { name: 'Seasons & exposure: clothing, shelter, fuel', note: 'Hooks into trader tasks when fuel or cloth gates progression.' },
      {
        name: 'Day / night, weather, and dynamic events (official trio)',
        note: 'Marketing bundles these systems—document how each actually pressures stamina, AI, and audio in your build.',
      },
      {
        name: 'Shelter customization & physics staging',
        note: 'Official pitch includes multi-shelter support over time—call out which patch unlocked what for you.',
      },
      {
        name: 'Roadmap: hunting / wildlife & “dynamic season” beats',
        note: 'Future-facing roadmap bullets; label clearly as not-live until patch notes say otherwise.',
      },
    ],
    tips: [
      'Numbers rot—if you quote drain rates or timers, say which build they came from.',
      'Bone breaks and cold deaths deserve short FAQ entries so search lands somewhere honest.',
    ],
  },
  {
    id: 'tasks',
    title: 'Tasks & traders',
    subtitle: 'Economy / progression',
    summary:
      'Barter and task lines unlock shelters, keys, and lore breadcrumbs. Guides here explain relative value (“why toilet paper matters”) and how to sequence trader tiers without burning rare meds for nothing.',
    effort: 'Medium',
    reading: '~10–16 min per deep article',
    articles: [
      { name: 'Trader roster & task archetypes', note: 'EA deltas tracked inline' },
      { name: 'Barter heuristics: meds, food, tools, electronics', note: 'Example bundles' },
      { name: 'Shelter keys & gated furniture', note: 'Spoiler-light trigger notes' },
      { name: 'Physics storage & decoration hygiene', note: 'Reduce rollback pain' },
      {
        name: 'Roadmap traders (Driver, Grandma, Shaman, …)',
        note: 'Names appear in public build roadmap—do not present them as current EA vendors until confirmed in-game.',
      },
      {
        name: 'Quest / lore beats when Build 3 “Signal” lands',
        note: 'Keep speculation separate from live task lists; link Steam announcements.',
      },
      {
        name: 'Friendly faction & AI-vs-AI (Build 2 “Nomads” preview)',
        note: 'Explain intent from roadmap text; gameplay write-ups wait on patch drops.',
      },
    ],
    tips: [
      'Write precondition → steps → rewards so a tired player can scan the top line and know if the task is for them.',
      'If RNG or a patch can invalidate a reward table, say so in-line—don’t bury it.',
    ],
  },
  {
    id: 'maps',
    title: 'Maps & crossings',
    subtitle: 'Traversal / risk',
    summary:
      'Area 05 teaches cadence; the border tests planning; Vostok taxes nerve. These pages emphasize observation, mine discipline, river crossings, and the permadeath psychology that keeps players from yolo-sprinting east.',
    effort: 'High',
    reading: '~14–20 min per deep article',
    articles: [
      { name: 'Border loadout checklist: meds, mines, exit vectors', note: 'Keep a paper or second-monitor copy if you run hardcore.' },
      { name: 'Minefields & landmarks: Demo vs EA deltas', note: 'Screenshot with the HUD build string visible when terrain shifts.' },
      { name: 'Vostok go/no-go: acceptable loss budgets', note: 'Honest talk about nerves and stash—you’re human.' },
      { name: 'Dynamic events: air assets, crashes, faction spikes', note: 'Assume loud stuff draws attention; plan noise discipline.' },
      {
        name: 'Boats, rivers, and crossing archetypes (official Border Zone copy)',
        note: 'Pair narrative marketing with in-game route testing; water danger changes build to build.',
      },
      {
        name: 'Expanded maps & multi-shelter routing (EA roadmap)',
        note: 'Document how many shelters your build exposes and how keys/time gates interact.',
      },
      {
        name: 'Future traversal: trains (Build 5) & sea/patrol boats (Build 6)',
        note: 'Roadmap-only today—stub articles should link the official game page section, not fan fiction.',
      },
    ],
    tips: [
      'Every map screenshot should show or caption the build it came from.',
      'When someone asks “where is X in the demo?”, give them a dedicated URL and link it from here.',
    ],
  },
]

const tocItems = computed(() => {
  const items = [{ key: 'quick-finder', label: 'Quick finder' }]
  for (const c of wikiCategories) {
    items.push({ key: `finder-${c.id}`, label: c.title, sub: true })
  }
  items.push({ key: 'community-wiki', label: 'Community wiki' })
  for (const p of pillars) {
    items.push({ key: `pillar-${p.id}`, label: p.title })
  }
  items.push({ key: 'closing', label: 'How we stitch' })
  return items
})
</script>

<template>
  <div class="page-guides">
    <section class="page-head-section section section--tight" aria-labelledby="wiki-heading">
      <div class="container">
        <div class="wrap wrap--wide">
          <p class="page-kicker">Index · Wiki hub</p>
          <nav class="guides-crumb" aria-label="Breadcrumb">
            <RouterLink to="/" class="guides-crumb__link">Road to Vostok Field Manual</RouterLink>
            <span class="guides-crumb__sep" aria-hidden="true">/</span>
            <span class="guides-crumb__here">Wiki</span>
          </nav>
          <h1 id="wiki-heading" class="page-title">Road to Vostok Wiki</h1>
          <p class="page-dek">
            One page, two layers: the <strong>quick finder</strong> up top matches how people actually search—primary sources
            (official game page + Steam), guns, armor, loot, map POIs, traders, factions, demo vs Early Access—and scrolls to the
            matching pillar or to
            <RouterLink class="guides-dek__link" to="/map">the map</RouterLink>,
            <RouterLink class="guides-dek__link" to="/start">Start</RouterLink> (onboarding + specs),
            <RouterLink class="guides-dek__link" to="/updates">Updates</RouterLink>, or
            <RouterLink class="guides-dek__link" to="/">home</RouterLink>. On wide screens, <strong>On this page</strong> stays in view
            while you scroll—no <code class="inline-code">#hash</code> URLs. Below that, each pillar lists the articles we’re writing,
            rough effort, and notes for anyone contributing prose.
          </p>
          <p class="page-dek page-dek--second">
            We don’t paste Fandom or copy other wikis. If a community write-up disagrees with your installed build, trust your
            client and Steam patch notes first. The Fandom link at the bottom is there if you want another angle—verify everything
            that costs you a run.
          </p>
        </div>
      </div>
    </section>

    <div class="wiki-shell section section--tight">
      <div class="container">
        <div class="wrap wrap--wide wiki-split">
          <div class="wiki-split__main">
            <div id="wiki-index" data-section-anchor="quick-finder" class="wiki-quick-wrap">
              <section
                v-for="c in wikiCategories"
                :key="c.id"
                :id="'wiki-' + c.id"
                class="wiki-cat-section section wiki-scroll-target"
                :data-section-anchor="'finder-' + c.id"
                :aria-labelledby="'wiki-cat-' + c.id"
              >
                <div class="wiki-cat-inner wrap wrap--wide">
                  <header class="wiki-cat-head">
                    <p class="wiki-cat-kicker">{{ c.kicker }}</p>
                    <h2 :id="'wiki-cat-' + c.id" class="wiki-cat-title">{{ c.title }}</h2>
                    <p class="wiki-cat-lead">{{ c.lead }}</p>
                  </header>
                  <ul class="wiki-link-list">
                    <li v-for="(link, idx) in c.links" :key="idx" class="wiki-link-card">
                      <button
                        v-if="link.scrollKey"
                        type="button"
                        class="wiki-link-card__a wiki-link-card__a--btn"
                        @click="scrollToWikiSection(link.scrollKey)"
                      >
                        <span class="wiki-link-card__label">{{ link.label }}</span>
                        <span class="wiki-link-card__blurb">{{ link.blurb }}</span>
                      </button>
                      <a
                        v-else-if="link.href"
                        class="wiki-link-card__a wiki-link-card__a--external"
                        :href="link.href"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span class="wiki-link-card__label">{{ link.label }}</span>
                        <span class="wiki-link-card__blurb">{{ link.blurb }}</span>
                      </a>
                      <RouterLink v-else class="wiki-link-card__a" :to="link.to">
                        <span class="wiki-link-card__label">{{ link.label }}</span>
                        <span class="wiki-link-card__blurb">{{ link.blurb }}</span>
                      </RouterLink>
                    </li>
                  </ul>
                </div>
              </section>

              <section
                id="guides-community-wiki"
                class="wiki-community-section section section--tight wiki-scroll-target"
                data-section-anchor="community-wiki"
                aria-labelledby="guides-community-heading"
              >
                <div class="wiki-cat-inner wrap wrap--wide">
                  <h2 id="guides-community-heading" class="wiki-cat-title">Community-maintained wiki</h2>
                  <p class="wiki-cat-lead wiki-cat-lead--tight">
                    Fandom hosts a collaborative Road to Vostok wiki with many granular pages. It can drift from the current demo or EA
                    build—use it for exploration, then verify anything critical in-client or via official posts.
                  </p>
                  <p class="wiki-external">
                    <a class="wiki-external__a" :href="fandom.href" target="_blank" rel="noopener noreferrer">{{ fandom.label }}</a>
                    <span class="wiki-external__hint">Opens in a new tab.</span>
                  </p>
                  <ul class="wiki-community-extra">
                    <li v-for="(row, i) in communityLinks" :key="i" class="wiki-community-extra__item">
                      <a class="wiki-community-extra__a" :href="row.href" target="_blank" rel="noopener noreferrer">{{
                        row.label
                      }}</a>
                      <p class="wiki-community-extra__blurb">{{ row.blurb }}</p>
                    </li>
                  </ul>
                  <div class="notice wiki-notice" role="note">
                    <span class="notice__label">Note</span>
                    <div class="notice__body">
                      Outbound links only—we don’t scrape or repost third-party wikis. Discord, Reddit, and YouTube can be wrong or
                      out of date; trust your client, Steam News, and roadtovostok.com/game when a run is on the line.
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <section
              v-for="block in pillars"
              :key="block.id"
              :id="block.id"
              class="pillar-section section wiki-scroll-target"
              :data-section-anchor="'pillar-' + block.id"
              :aria-labelledby="'pillar-' + block.id"
            >
              <div class="pillar-block-inner wrap wrap--wide">
                <header class="pillar-head">
                  <div class="pillar-head__text">
                    <p class="pillar-kicker">{{ block.subtitle }}</p>
                    <h2 :id="'pillar-' + block.id" class="pillar-title">{{ block.title }}</h2>
                    <p class="pillar-summary">{{ block.summary }}</p>
                  </div>
                  <dl class="pillar-meta">
                    <div class="pillar-meta__row">
                      <dt>Rough lift</dt>
                      <dd>{{ block.effort }}</dd>
                    </div>
                    <div class="pillar-meta__row">
                      <dt>Read time</dt>
                      <dd>{{ block.reading }}</dd>
                    </div>
                  </dl>
                </header>

                <div class="pillar-split">
                  <div class="pillar-main">
                    <h3 class="pillar-h3">Article queue</h3>
                    <ul class="article-list">
                      <li v-for="(a, idx) in block.articles" :key="idx" class="article-card">
                        <span class="article-card__name">{{ a.name }}</span>
                        <span class="article-card__note">{{ a.note }}</span>
                      </li>
                    </ul>
                  </div>
                  <aside class="pillar-aside" :aria-label="`${block.title} writing notes`">
                    <h3 class="pillar-h3 pillar-h3--aside">Writing notes</h3>
                    <ul class="tip-list">
                      <li v-for="(t, i) in block.tips" :key="i">{{ t }}</li>
                    </ul>
                    <div class="aside-cta">
                      <p class="aside-cta__text">
                        When a topic outgrows this list—say shotgun loading—split it to its own URL and leave a stub link here so people
                        don’t get lost.
                      </p>
                    </div>
                  </aside>
                </div>
              </div>
            </section>

            <section
              class="closing-section section section--tight wiki-scroll-target"
              data-section-anchor="closing"
              aria-labelledby="closing-heading"
            >
              <div class="closing-block-inner wrap wrap--wide">
                <h2 id="closing-heading" class="closing-title">How we stitch pages together</h2>
                <ul class="closing-list">
                  <li>
                    This hub should list every child article we publish—if something lives on its own route, it still gets a pointer from
                    here or from
                    <RouterLink class="closing-inline" to="/">home</RouterLink>.
                  </li>
                  <li>Anything that flips between Demo and EA gets a loud label at the top so nobody rage-quits the site over drift.</li>
                  <li>Name images like a human: <code class="inline-code">rtv-shotgun-load-ea-0-9.png</code> beats <code class="inline-code">IMG_0293</code>; alt text should match what the player sees.</li>
                  <li>External links open in a new tab with <code class="inline-code">rel="noopener noreferrer"</code>; prefer Steam and official posts over random forums.</li>
                  <li>
                    Keep the
                    <button type="button" class="closing-inline closing-inline--btn" @click="scrollToWikiSection('quick-finder')">
                      quick finder
                    </button>
                    wording honest when pillars or routes change—one hub at
                    <RouterLink class="closing-inline" to="/wiki">/wiki</RouterLink>
                    beats scattering the same keywords on ghost pages.
                  </li>
                </ul>
              </div>
            </section>
          </div>

          <aside class="wiki-split__toc" aria-label="On this page">
            <p class="wiki-toc__title">On this page</p>
            <ul class="wiki-toc__list">
              <li v-for="item in tocItems" :key="item.key" class="wiki-toc__item">
                <button
                  type="button"
                  class="wiki-toc__btn"
                  :class="{ 'wiki-toc__btn--sub': item.sub }"
                  @click="scrollToWikiSection(item.key)"
                >
                  {{ item.label }}
                </button>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-kicker {
  margin: 0 0 0.5rem;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.guides-crumb {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem;
  margin: 0 0 0.85rem;
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}

.guides-crumb__link {
  color: var(--color-frost);
  text-decoration: none;
  font-weight: 600;
}

.guides-crumb__link:hover {
  color: var(--color-text);
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.guides-crumb__sep {
  opacity: 0.55;
  user-select: none;
}

.guides-crumb__here {
  color: color-mix(in srgb, var(--color-text) 75%, var(--color-text-muted));
  font-weight: 600;
}

.page-title {
  margin: 0 0 0.75rem;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-weight: 700;
  font-size: clamp(1.85rem, 4vw, 2.5rem);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text);
}

.page-dek {
  margin: 0 0 0.85rem;
  color: var(--color-text-muted);
  font-size: 0.9375rem;
  line-height: 1.65;
  max-width: 48rem;
}

.page-dek--second {
  margin-bottom: 0;
}

.page-dek strong {
  color: color-mix(in srgb, var(--color-text) 86%, var(--color-text-muted));
  font-weight: 600;
}

.guides-dek__link {
  color: var(--color-frost);
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.guides-dek__link:hover {
  color: var(--color-text);
}

.inline-code {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.84em;
  padding: 0.15em 0.4em;
  border-radius: 2px;
  background: var(--color-bg-panel);
  border: 1px solid var(--color-border);
  color: var(--color-frost);
}

.wiki-split {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  align-items: stretch;
}

.wiki-split__main {
  min-width: 0;
  width: 100%;
}

.wiki-split__toc {
  flex-shrink: 0;
}

@media (min-width: 1100px) {
  .wiki-split {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 12.75rem;
    gap: 2rem;
    align-items: start;
  }

  .wiki-split__toc {
    position: sticky;
    top: calc(3px + 4.25rem + 1rem);
    align-self: start;
    max-height: calc(100vh - 6rem);
    overflow-y: auto;
    padding: 0.9rem 1rem;
    border: 1px solid var(--color-border);
    border-radius: 4px;
    background: color-mix(in srgb, var(--color-bg-panel) 90%, transparent);
    box-shadow:
      0 0 0 1px color-mix(in srgb, var(--color-border-bright) 22%, transparent),
      0 12px 36px color-mix(in srgb, #000 32%, transparent);
  }
}

@media (max-width: 1099px) {
  .wiki-split__toc {
    order: -1;
    position: sticky;
    top: calc(3px + 3.55rem);
    z-index: 35;
    padding: 0.55rem 0.65rem;
    margin-bottom: 0.25rem;
    border: 1px solid var(--color-border);
    border-radius: 4px;
    background: color-mix(in srgb, var(--color-bg-deep) 40%, var(--color-bg-panel));
    box-shadow: 0 8px 28px color-mix(in srgb, #000 45%, transparent);
  }

  .wiki-toc__list {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 0.35rem;
    overflow-x: auto;
    padding-bottom: 0.15rem;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
  }

  .wiki-toc__item {
    flex: 0 0 auto;
  }

  .wiki-toc__btn {
    white-space: nowrap;
  }
}

.wiki-toc__title {
  margin: 0 0 0.55rem;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.wiki-toc__list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.wiki-toc__btn {
  display: block;
  width: 100%;
  margin: 0;
  padding: 0.35rem 0.15rem;
  border: none;
  background: transparent;
  font: inherit;
  font-size: 0.78rem;
  font-weight: 600;
  line-height: 1.35;
  text-align: left;
  color: var(--color-frost);
  cursor: pointer;
  border-radius: 2px;
  text-decoration: underline;
  text-decoration-style: dashed;
  text-underline-offset: 0.2em;
  text-decoration-color: color-mix(in srgb, var(--color-frost) 45%, transparent);
}

.wiki-toc__btn:hover {
  color: var(--color-text);
  text-decoration-color: var(--color-text);
}

.wiki-toc__btn--sub {
  font-size: 0.68rem;
  font-weight: 600;
  padding-left: 0.35rem;
  color: color-mix(in srgb, var(--color-frost) 88%, var(--color-text-muted));
}

.wiki-quick-wrap {
  border-bottom: 1px solid var(--color-border);
}

.wiki-scroll-target {
  scroll-margin-top: 5.5rem;
}

.wiki-cat-inner {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.pillar-block-inner,
.closing-block-inner {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.wiki-cat-section {
  scroll-margin-top: 5.5rem;
}

.wiki-cat-section + .wiki-cat-section {
  border-top: 1px solid color-mix(in srgb, var(--color-border) 85%, transparent);
}

.wiki-cat-head {
  margin-bottom: 1.25rem;
  max-width: 48rem;
}

.wiki-cat-kicker {
  margin: 0 0 0.35rem;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.wiki-cat-title {
  margin: 0 0 0.65rem;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-weight: 700;
  font-size: clamp(1.15rem, 2.4vw, 1.4rem);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text);
}

.wiki-cat-lead {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.9rem;
  line-height: 1.65;
}

.wiki-cat-lead--tight {
  max-width: 46rem;
}

.wiki-link-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.65rem;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .wiki-link-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

.wiki-link-card {
  margin: 0;
}

.wiki-link-card__a {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  height: 100%;
  padding: 1rem 1.1rem;
  text-decoration: none;
  color: inherit;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background: color-mix(in srgb, var(--color-bg-panel) 88%, transparent);
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.wiki-link-card__a:hover {
  border-color: color-mix(in srgb, var(--color-frost) 40%, var(--color-border));
  box-shadow: 0 14px 40px color-mix(in srgb, #000 38%, transparent);
  transform: translateY(-1px);
}

.wiki-link-card__a--btn {
  font: inherit;
  text-align: left;
  cursor: pointer;
  width: 100%;
  border: none;
  appearance: none;
  color: inherit;
}

.wiki-link-card__a--external .wiki-link-card__label::after {
  content: ' · ↗';
  font-weight: 600;
  font-size: 0.68em;
  letter-spacing: 0.06em;
  color: var(--color-text-muted);
}

.wiki-link-card__label {
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-weight: 700;
  font-size: 0.95rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-frost);
}

.wiki-link-card__a:hover .wiki-link-card__label {
  color: var(--color-text);
}

.wiki-link-card__blurb {
  font-size: 0.8125rem;
  line-height: 1.55;
  color: var(--color-text-muted);
}

.wiki-community-section {
  border-top: 1px solid color-mix(in srgb, var(--color-border) 85%, transparent);
  scroll-margin-top: 5.5rem;
}

.wiki-external {
  margin: 1rem 0 1.25rem;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5rem 1rem;
}

.wiki-external__a {
  font-weight: 600;
  color: var(--color-frost);
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.wiki-external__a:hover {
  color: var(--color-text);
}

.wiki-external__hint {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.wiki-community-extra {
  margin: 0 0 1.25rem;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.85rem;
}

.wiki-community-extra__item {
  margin: 0;
  padding: 0.75rem 0.9rem;
  border: 1px solid color-mix(in srgb, var(--color-border) 88%, transparent);
  border-radius: 4px;
  background: color-mix(in srgb, var(--color-bg-panel) 90%, transparent);
}

.wiki-community-extra__a {
  font-weight: 600;
  color: var(--color-frost);
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.wiki-community-extra__a:hover {
  color: var(--color-text);
}

.wiki-community-extra__blurb {
  margin: 0.4rem 0 0;
  font-size: 0.8125rem;
  line-height: 1.55;
  color: var(--color-text-muted);
}

.wiki-notice {
  max-width: 48rem;
}

.pillar-section {
  scroll-margin-top: 5.5rem;
}

.pillar-head {
  display: grid;
  gap: 1.25rem;
  margin-bottom: 1.75rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--color-border);
}

@media (min-width: 1024px) {
  .pillar-head {
    grid-template-columns: 1fr 220px;
    align-items: start;
  }
}

.pillar-kicker {
  margin: 0 0 0.35rem;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.65rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.pillar-title {
  margin: 0 0 0.65rem;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-weight: 700;
  font-size: clamp(1.35rem, 2.8vw, 1.75rem);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text);
}

.pillar-summary {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.9375rem;
  line-height: 1.65;
  max-width: 48rem;
}

.pillar-meta {
  margin: 0;
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background: linear-gradient(145deg, var(--color-bg-elevated), var(--color-bg-panel));
  box-shadow: 0 12px 40px color-mix(in srgb, #000 35%, transparent);
}

.pillar-meta__row + .pillar-meta__row {
  margin-top: 0.65rem;
  padding-top: 0.65rem;
  border-top: 1px dashed var(--color-border);
}

.pillar-meta__row dt {
  margin: 0 0 0.2rem;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.6rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.pillar-meta__row dd {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text);
}

.pillar-split {
  display: grid;
  gap: 1.5rem;
}

@media (min-width: 1024px) {
  .pillar-split {
    grid-template-columns: 1.35fr 1fr;
    align-items: start;
  }
}

.pillar-h3 {
  margin: 0 0 0.85rem;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-weight: 700;
  font-size: 0.95rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text);
}

.pillar-h3--aside {
  color: var(--color-accent);
}

.article-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.article-card {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.85rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background: color-mix(in srgb, var(--color-bg-panel) 78%, transparent);
  border-left: 2px solid color-mix(in srgb, var(--color-frost) 55%, var(--color-border));
}

.article-card__name {
  font-weight: 600;
  color: var(--color-text);
  font-size: 0.9rem;
  line-height: 1.4;
}

.article-card__note {
  font-size: 0.78rem;
  color: var(--color-text-muted);
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  letter-spacing: 0.04em;
}

.pillar-aside {
  padding: 1.1rem 1.15rem;
  border: 1px solid color-mix(in srgb, var(--color-accent) 22%, var(--color-border));
  border-radius: 4px;
  background: linear-gradient(
    165deg,
    color-mix(in srgb, var(--color-bg-panel) 90%, var(--color-accent) 10%),
    var(--color-bg-panel)
  );
}

.tip-list {
  margin: 0 0 1rem;
  padding-left: 1.1rem;
  color: var(--color-text-muted);
  font-size: 0.875rem;
  line-height: 1.6;
}

.tip-list li + li {
  margin-top: 0.45rem;
}

.aside-cta {
  padding-top: 0.85rem;
  border-top: 1px dashed var(--color-border);
}

.aside-cta__text {
  margin: 0;
  font-size: 0.8125rem;
  color: color-mix(in srgb, var(--color-text-muted) 92%, var(--color-text));
  line-height: 1.55;
}

.closing-title {
  margin: 0 0 0.85rem;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-weight: 700;
  font-size: 1.2rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text);
}

.closing-list {
  margin: 0;
  padding-left: 1.15rem;
  color: var(--color-text-muted);
  font-size: 0.9rem;
  line-height: 1.65;
}

.closing-list li + li {
  margin-top: 0.4rem;
}

.closing-inline {
  color: var(--color-frost);
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.closing-inline:hover {
  color: var(--color-text);
}

.closing-inline--btn {
  display: inline;
  padding: 0;
  margin: 0;
  border: none;
  background: none;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
}

@media (max-width: 1023px) {
  .pillar-head {
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
  }

  .pillar-meta {
    padding: 0.9rem;
  }

  .wiki-link-card__a {
    padding: 0.9rem 1rem;
  }
}

@media (max-width: 767px) {
  .jump-bar {
    padding: 0.5rem 0.75rem;
    gap: 0.4rem 0.55rem;
  }

  .jump-bar__link {
    font-size: 0.74rem;
  }

  .jump-bar__link--wiki {
    font-size: 0.68rem;
  }

  .page-title {
    letter-spacing: 0.045em;
  }

  .page-dek {
    font-size: 0.9rem;
  }

  .wiki-cat-title {
    font-size: clamp(1.05rem, 4vw, 1.3rem);
  }

  .article-card {
    padding: 0.75rem 0.85rem;
  }
}
</style>
