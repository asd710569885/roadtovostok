<script setup>
import { RouterLink } from 'vue-router'

/**
 * Same-page anchors for the quick finder (#wiki-*). External routes for /start, /, /map.
 * Fandom is optional reading—not a content source.
 */
const wikiCategories = [
  {
    id: 'versions',
    kicker: 'Boot · Builds',
    title: 'Game, demo & Early Access',
    lead:
      'Version context is the spine of every wiki-style lookup: what players call “the demo” and what ships in Early Access diverge in tasks, loot, and tuning. Start here before trusting any item or map claim.',
    links: [
      {
        label: 'Start hub: Steam, PC specs, first-session flow',
        blurb: 'Download expectations, Demo vs EA matrix, and onboarding checklist.',
        to: '/start',
      },
      {
        label: 'Home overview',
        blurb: 'Orientation, pillars, coverage table, map spotlight.',
        to: '/',
      },
    ],
  },
  {
    id: 'weapons',
    kicker: 'Combat',
    title: 'Weapons & gun handling',
    lead:
      'Search clusters around realistic handling: knives, pistols, PDWs, shotguns, semi-auto and bolt-action rifles, malfunctions, and attachments. The pillar below is the canonical hub until standalone URLs split out.',
    links: [
      {
        label: 'Weapons & reloading (pillar)',
        blurb: 'Shotgun loading, rifle and pistol flow, failure drills, rails—see pillar below.',
        href: '#weapons',
      },
    ],
  },
  {
    id: 'armor-gear',
    kicker: 'Protection',
    title: 'Armor, carriers & helmets',
    lead:
      'Plates, rigs, and helmets sit next to stamina and injury math. Until armor gets its own long read, split time between combat handling and survival/medical.',
    links: [
      {
        label: 'Weapons & reloading',
        blurb: 'Combat loadouts and handling context.',
        href: '#weapons',
      },
      {
        label: 'Survival & medical',
        blurb: 'Injury, meds, and sustain that interact with gear.',
        href: '#survival',
      },
    ],
  },
  {
    id: 'items',
    kicker: 'Loot · Craft',
    title: 'Items, food, medical & misc',
    lead:
      'Long-tail queries span food, medical supplies, crafting, furniture, electronics, and barter “trash.” Vocabulary here overlaps how Steam and patch notes describe systems.',
    links: [
      {
        label: 'Survival & medical (pillar)',
        blurb: 'Crafting, fishing, seasons, triage—where item guides dock first.',
        href: '#survival',
      },
      {
        label: 'Tasks & traders',
        blurb: 'Barter and task rewards that consume or produce items.',
        href: '#tasks',
      },
    ],
  },
  {
    id: 'world',
    kicker: 'Atlas',
    title: 'World map, POIs & crossings',
    lead:
      'Village, highway, minefield, shipyard, border zone, Area 05, Vostok—names players grep for. The site map uses the same official artwork; written crossing guides live in the maps pillar once you confirm them in your build.',
    links: [
      {
        label: 'Interactive world map',
        blurb: 'Fan UI on the published world image; pins are reference only.',
        to: '/map',
      },
      {
        label: 'Maps & crossings (pillar)',
        blurb: 'Border checklists, mine discipline, traversal notes.',
        href: '#maps',
      },
    ],
  },
  {
    id: 'npcs',
    kicker: 'Economy',
    title: 'Traders, tasks & progression',
    lead:
      'Wiki-style lookups for trader tiers, task chains, shelter unlocks, and barter. Maps to the tasks pillar plus Start-page version notes.',
    links: [
      {
        label: 'Tasks & traders (pillar)',
        blurb: 'Roster archetypes, barter bundles, keys and gated content.',
        href: '#tasks',
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
    ],
    tips: [
      'Every map screenshot should show or caption the build it came from.',
      'When someone asks “where is X in the demo?”, give them a dedicated URL and link it from here.',
    ],
  },
]
</script>

<template>
  <div class="page-guides">
    <section class="page-head-section section section--tight" aria-labelledby="guides-heading">
      <div class="container">
        <div class="wrap wrap--wide">
          <p class="page-kicker">Index · Guides &amp; wiki hub</p>
          <nav class="guides-crumb" aria-label="Breadcrumb">
            <RouterLink to="/" class="guides-crumb__link">Road to Vostok Field Manual</RouterLink>
            <span class="guides-crumb__sep" aria-hidden="true">/</span>
            <span class="guides-crumb__here">Guides</span>
          </nav>
          <h1 id="guides-heading" class="page-title">Guides &amp; wiki index</h1>
          <p class="page-dek">
            One page, two layers: the <strong>quick finder</strong> up top matches how people actually search—guns, armor, loot,
            map POIs, traders, demo vs Early Access—and jumps to the matching pillar or to
            <RouterLink class="guides-dek__link" to="/map">the map</RouterLink>,
            <RouterLink class="guides-dek__link" to="/start">Start</RouterLink>, or
            <RouterLink class="guides-dek__link" to="/">home</RouterLink>. Below that, each pillar lists the articles we’re writing,
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

    <section class="jump-section section--tight section" aria-label="On-page anchors">
      <div class="container">
        <div class="wrap wrap--wide">
          <nav class="jump-bar" aria-label="Jump to quick finder, community wiki, or pillar">
            <span class="jump-bar__label">Jump</span>
            <a class="jump-bar__link" href="#wiki-index">Quick finder</a>
            <a
              v-for="c in wikiCategories"
              :key="'j-' + c.id"
              class="jump-bar__link jump-bar__link--wiki"
              :href="`#wiki-${c.id}`"
            >
              {{ c.title }}
            </a>
            <a class="jump-bar__link" href="#guides-community-wiki">Community wiki</a>
            <a v-for="p in pillars" :key="p.id" class="jump-bar__link" :href="`#${p.id}`">{{ p.title }}</a>
          </nav>
        </div>
      </div>
    </section>

    <div id="wiki-index" class="wiki-index-block">
      <section
        v-for="c in wikiCategories"
        :key="c.id"
        :id="'wiki-' + c.id"
        class="wiki-cat-section section"
        :aria-labelledby="'wiki-cat-' + c.id"
      >
        <div class="container">
          <div class="wrap wrap--wide">
            <header class="wiki-cat-head">
              <p class="wiki-cat-kicker">{{ c.kicker }}</p>
              <h2 :id="'wiki-cat-' + c.id" class="wiki-cat-title">{{ c.title }}</h2>
              <p class="wiki-cat-lead">{{ c.lead }}</p>
            </header>
            <ul class="wiki-link-list">
              <li v-for="(link, idx) in c.links" :key="idx" class="wiki-link-card">
                <a v-if="link.href" class="wiki-link-card__a" :href="link.href">
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
        </div>
      </section>

      <section
        id="guides-community-wiki"
        class="wiki-community-section section section--tight"
        aria-labelledby="guides-community-heading"
      >
        <div class="container">
          <div class="wrap wrap--wide">
            <h2 id="guides-community-heading" class="wiki-cat-title">Community-maintained wiki</h2>
            <p class="wiki-cat-lead wiki-cat-lead--tight">
              Fandom hosts a collaborative Road to Vostok wiki with many granular pages. It can drift from the current demo or EA
              build—use it for exploration, then verify anything critical in-client or via official posts.
            </p>
            <p class="wiki-external">
              <a class="wiki-external__a" :href="fandom.href" target="_blank" rel="noopener noreferrer">{{ fandom.label }}</a>
              <span class="wiki-external__hint">Opens in a new tab.</span>
            </p>
            <div class="notice wiki-notice" role="note">
              <span class="notice__label">Note</span>
              <div class="notice__body">
                Outbound link only—we don’t scrape or repost Fandom text. Accuracy here rides on original testing, version labels,
                and linking Steam or official posts when we quote dates or features.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <section
      v-for="block in pillars"
      :key="block.id"
      :id="block.id"
      class="pillar-section section"
      :aria-labelledby="'pillar-' + block.id"
    >
      <div class="container">
        <div class="wrap wrap--wide">
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
      </div>
    </section>

    <section class="closing-section section section--tight" aria-labelledby="closing-heading">
      <div class="container">
        <div class="wrap wrap--wide">
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
              Keep the <a class="closing-inline" href="#wiki-index">quick finder</a> wording honest when pillars or routes change—one
              hub at <RouterLink class="closing-inline" to="/guides">/guides</RouterLink>
              beats scattering the same keywords on ghost pages.
            </li>
          </ul>
        </div>
      </div>
    </section>
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

.jump-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 0.85rem;
  padding: 0.65rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background: color-mix(in srgb, var(--color-bg-panel) 82%, transparent);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--color-border-bright) 25%, transparent);
}

.jump-bar__label {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.65rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.jump-bar__link {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-frost);
  text-decoration: none;
  cursor: pointer;
  border-bottom: 1px dashed color-mix(in srgb, var(--color-frost) 45%, transparent);
}

.jump-bar__link:hover {
  color: var(--color-text);
  border-bottom-color: var(--color-text);
}

.jump-bar__link--wiki {
  font-size: 0.72rem;
  letter-spacing: 0.02em;
  text-transform: none;
  font-weight: 600;
}

.wiki-index-block {
  scroll-margin-top: 5.5rem;
  border-bottom: 1px solid var(--color-border);
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

@media (min-width: 640px) {
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

@media (min-width: 800px) {
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

@media (min-width: 900px) {
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
</style>
