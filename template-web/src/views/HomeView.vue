<script setup>
import { RouterLink } from 'vue-router'

const mapThumbSrc = `${import.meta.env.BASE_URL}images/road-to-vostok-map.jpg`

const topics = [
  {
    slug: 'weapons',
    title: 'Weapons & reloading',
    tag: 'Combat',
    blurb:
      'Realistic ballistics and magazine logic: shotgun loading patterns, rifle reloads, failure drills, and attachment rails.',
    bullets: ['Keybinds & interaction order', 'Ammo types & containers', 'Common combat mistakes debrief'],
  },
  {
    slug: 'survival',
    title: 'Survival & medical',
    tag: 'Vitality',
    blurb:
      'Temperature, nutrition, injury chains, and fractures—turn “stay alive” from instinct into a repeatable checklist.',
    bullets: ['Medical triage order', 'Fishing & boat loops', 'Seasons, clothing, and exposure'],
  },
  {
    slug: 'tasks',
    title: 'Tasks & traders',
    tag: 'Economy',
    blurb:
      'Barter economy, trader specialties, task tiers, and shelter unlocks—the spine of long-horizon sandbox progression.',
    bullets: ['Relative item value', 'Reward types & keys', 'Furniture, storage, physics placement'],
  },
  {
    slug: 'maps',
    title: 'Maps & crossings',
    tag: 'Traversal',
    blurb:
      'Area 05, mined border corridors, river crossings, and Vostok permadeath stakes—risk bands and loadout heuristics.',
    bullets: ['Pre-crossing checklist', 'Patrols & air support cues', 'Loss tolerance self-test'],
  },
]

const signals = [
  'road to vostok guide',
  'how to load shotgun',
  'steam demo',
  'early access date',
  'save backup',
  'all tasks',
  'fishing',
  'broken bone',
  'vostok permadeath',
  'barter traders',
  'shelter save',
  'border zone',
  'road to vostok map',
]

const bento = [
  {
    kind: 'large',
    title: 'If this is your first run',
    text: 'Learn the loot → shelter save → push triangle early. Never roam hungry; meds and ammo beat cosmetics. Treat the border as a planning exam, and assume Vostok can erase your run’s stakes in one mistake.',
    meta: 'Onboarding digest',
  },
  {
    kind: 'stat',
    label: 'Zone stack',
    value: '3',
    hint: 'Area 05 / Border / Vostok',
  },
  {
    kind: 'stat',
    label: 'Engine',
    value: 'Godot',
    hint: 'Open source · physicalized loot',
  },
  {
    kind: 'stat',
    label: 'Mode',
    value: 'Solo',
    hint: 'Sandbox · no forced win state',
  },
  {
    kind: 'quote',
    quote: 'The sandbox never gives you a “correct” playstyle—only consequences.',
    cite: 'How we think about RTV runs',
  },
]

const outlineRows = [
  {
    topic: 'Weapons',
    article: 'Shotgun loading & ammo identification',
    status: 'In progress',
    focus: 'How-to',
    to: { path: '/guides', hash: '#weapons' },
  },
  {
    topic: 'Survival',
    article: 'Injury chain: bleeding → fracture → triage order',
    status: 'Queued',
    focus: 'Deep dive',
    to: { path: '/guides', hash: '#survival' },
  },
  {
    topic: 'Tasks',
    article: 'Trader tiers & payout matrix (EA tracked)',
    status: 'Queued',
    focus: 'Reference',
    to: { path: '/guides', hash: '#tasks' },
  },
  {
    topic: 'Maps',
    article: 'Interactive world map (pins + disclaimers)',
    status: 'Live',
    focus: 'Map',
    to: '/map',
  },
  {
    topic: 'Maps',
    article: 'Border crossings: mines, rivers, OPFOR sightlines',
    status: 'In progress',
    focus: 'Traversal',
    to: { path: '/guides', hash: '#maps' },
  },
  {
    topic: 'Versions',
    article: 'Demo vs Early Access comparison',
    status: 'Live',
    focus: 'Boot',
    to: '/start',
  },
]

const faqItems = [
  {
    q: 'Is this an official website?',
    segments: [
      { text: 'No. Fan-run field manual from people who play on keyboard and actually read patch notes. Hard facts: ' },
      { text: 'roadtovostok.com', href: 'https://www.roadtovostok.com/', ext: true },
      { text: ' and the ' },
      { text: 'Steam store', href: 'https://store.steampowered.com/app/1963610/Road_to_Vostok/', ext: true },
      { text: ' page—same links live in the footer.' },
    ],
  },
  {
    q: 'Why split Demo vs Early Access in guides?',
    segments: [
      { text: 'Because one loot pass or task rebalance can brick a write-up overnight. Labels save you from “the guide lied” when your build is ahead or behind the author’s. The split is spelled out on the ' },
      { text: 'Start page', to: '/start' },
      { text: ' and in each ' },
      { text: 'guides pillar', to: '/guides' },
      { text: '.' },
    ],
  },
  {
    q: 'Is Road to Vostok multiplayer?',
    segments: [
      {
        text: 'Marketing and store copy pitch a solo sandbox. If that ever changes, read the dev posts first—we keep the standing note on the ',
      },
      { text: 'Start page', to: '/start' },
      { text: ' in sync with what’s public.' },
    ],
  },
  {
    q: 'How often do you update?',
    segments: [
      { text: 'After fat patches we hit the ' },
      { text: 'guides hub', to: '/guides' },
      { text: ', ' },
      { text: 'map', to: '/map' },
      { text: ', and ' },
      { text: 'Start', to: '/start' },
      { text: ' first. If a page shows a “last checked” build, treat anything older as suspect until you verify in-client.' },
    ],
  },
]
</script>

<template>
  <div class="page-home">
    <section class="hero-section section section--loose" aria-labelledby="hero-heading">
      <div class="hero-section__bg" aria-hidden="true">
        <svg class="hero-section__svg" viewBox="0 0 800 520" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="hg" x1="120" y1="0" x2="640" y2="520" gradientUnits="userSpaceOnUse">
              <stop stop-color="#6eb4c9" stop-opacity="0.14" />
              <stop offset="0.45" stop-color="#d4652e" stop-opacity="0.12" />
              <stop offset="1" stop-color="#070a0d" stop-opacity="0" />
            </linearGradient>
          </defs>
          <rect width="800" height="520" fill="url(#hg)" />
          <path
            d="M40 420h220l60-180 80 220 120-340 140 300h100"
            stroke="color-mix(in srgb, #6eb4c9 35%, transparent)"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <circle cx="660" cy="120" r="3" fill="#d4652e" opacity="0.85" />
          <circle cx="200" cy="200" r="2.5" fill="#6eb4c9" opacity="0.7" />
        </svg>
      </div>
      <div class="container">
        <div class="wrap wrap--full">
          <div class="hero-layout">
            <div class="hero-layout__copy hero-layout__copy--rail">
              <p class="hero-eyebrow">
                <span class="hero-eyebrow__dot" aria-hidden="true" />
                Unofficial · written by players who sweat the details
              </p>
              <h1 id="hero-heading" class="hero-title">Road to Vostok field manual: border survival &amp; combat</h1>
              <p class="hero-lead">
                Built around the searches players actually run—<strong>weapon handling</strong>, <strong>survival &amp; medical</strong>,
                <strong>traders &amp; tasks</strong>, and <strong>map crossings</strong>. The fiction sits on a post-collapse
                Finland–Russia frontier: stabilize in <strong>Area 05</strong>, plan through <strong>patrols and mine belts</strong>,
                then decide if <strong>Vostok’s permadeath stakes</strong> are worth the haul.
              </p>
              <p class="hero-lead hero-lead--secondary">
                Deep dives live in the
                <RouterLink class="hero-inline" to="/guides">guides hub</RouterLink>
                (quick finder + pillars), the
                <RouterLink class="hero-inline" to="/map">interactive map</RouterLink>
                for spatial context, and
                <RouterLink class="hero-inline" to="/start">Start</RouterLink>
                for demo vs EA and PC specs. Same layout everywhere so you’re not hunting for the actual article.
              </p>
              <div class="hero-actions">
                <RouterLink to="/guides" class="hero-btn hero-btn--primary">Open guides hub</RouterLink>
                <RouterLink to="/map" class="hero-btn hero-btn--ghost">World map</RouterLink>
                <RouterLink to="/start" class="hero-btn hero-btn--ghost">Demo / Early Access</RouterLink>
              </div>
            </div>
            <aside class="hero-panel hero-panel--hud" aria-label="At-a-glance game facts">
              <div class="hero-panel__corners" aria-hidden="true">
                <span class="hero-panel__corner hero-panel__corner--tl" />
                <span class="hero-panel__corner hero-panel__corner--tr" />
                <span class="hero-panel__corner hero-panel__corner--bl" />
                <span class="hero-panel__corner hero-panel__corner--br" />
              </div>
              <div class="hero-panel__head">
                <span class="hero-panel__tag">Briefing</span>
                <span class="hero-panel__id">RTV-GUIDE-01</span>
              </div>
              <dl class="hero-panel__stats">
                <div class="hero-panel__row">
                  <dt>Core loop</dt>
                  <dd>Loot · barter · tasks · shelter saves</dd>
                </div>
                <div class="hero-panel__row">
                  <dt>Spike risk</dt>
                  <dd>Vostok · death can wipe the zone’s stakes</dd>
                </div>
                <div class="hero-panel__row">
                  <dt>On-ramp</dt>
                  <dd>Steam demo for muscle memory, then follow EA notes</dd>
                </div>
              </dl>
              <ul class="hero-panel__chips" aria-label="Core topics">
                <li>Realistic ballistics</li>
                <li>Barter economy</li>
                <li>Dynamic weather</li>
                <li>Sandbox tempo</li>
              </ul>
              <p class="hero-panel__foot">
                Panel = expectations only. Deep pages and official patch notes remain the source of truth.
              </p>
            </aside>
          </div>
        </div>
      </div>
    </section>

    <section class="notice-section section--tight section" aria-label="Site notices">
      <div class="container">
        <div class="wrap wrap--full">
          <div class="notice-grid">
            <div class="notice" role="status">
              <span class="notice__label">Notice</span>
              <div class="notice__body">
                Independent project—not affiliated with the developer. Articles label Demo vs Early Access when it matters. If a
                page disagrees with what you see in-game, trust your client first and check the build string in Steam before you
                assume the write-up is wrong.
              </div>
            </div>
            <div class="notice notice--muted" role="note">
              <span class="notice__label">Structure</span>
              <div class="notice__body">
                Big topics get their own routes over time; the home page and
                <RouterLink class="notice-inline" to="/guides">guides hub</RouterLink>
                stay the front door so weapons, survival, tasks, and maps never live in a dead-end corner.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="signal-section section--tight section" aria-label="Common player searches">
      <div class="container">
        <div class="wrap wrap--full">
          <p class="signal-label">Stuff people actually type into Google</p>
          <div class="signal-scroll" role="list">
            <span v-for="s in signals" :key="s" class="signal-chip" role="listitem">{{ s }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="bento-section section" aria-labelledby="bento-heading">
      <div class="container">
        <div class="wrap wrap--full">
          <div class="section-head">
            <h2 id="bento-heading" class="section-title">How this site lays out info</h2>
            <p class="section-dek">
              Long reads when you need them, short tiles when you don’t—so you can skim for “do I push east today?” and still drill
              into numbers when you’re theorycrafting a border kit.
            </p>
          </div>
          <div class="bento">
            <div
              v-for="(cell, i) in bento"
              :key="'bento-' + i"
              class="bento__cell"
              :class="{
                'bento__cell--large': cell.kind === 'large',
                'bento__cell--stat': cell.kind === 'stat',
                'bento__cell--quote': cell.kind === 'quote',
              }"
            >
              <template v-if="cell.kind === 'large'">
                <p class="bento__meta">{{ cell.meta }}</p>
                <p class="bento__title">{{ cell.title }}</p>
                <p class="bento__text">{{ cell.text }}</p>
              </template>
              <template v-else-if="cell.kind === 'stat'">
                <p class="bento__stat-label">{{ cell.label }}</p>
                <p class="bento__stat-value">{{ cell.value }}</p>
                <p class="bento__stat-hint">{{ cell.hint }}</p>
              </template>
              <template v-else>
                <p class="bento__quote">“{{ cell.quote }}”</p>
                <p class="bento__cite">— {{ cell.cite }}</p>
              </template>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="zones-section section" aria-labelledby="zones-heading">
      <div class="container">
        <div class="wrap wrap--full">
          <div class="section-head">
            <h2 id="zones-heading" class="section-title">Zone progression: exfil mindset to permadeath</h2>
            <p class="section-dek">
              Understanding the three layers explains why players stall at the border—and why Vostok is not “just another map
              farm.” Cross-check labels on the
              <RouterLink class="section-dek__link" to="/map">world map</RouterLink>
              and the
              <RouterLink class="section-dek__link" to="/guides#maps">maps pillar</RouterLink>
              before you commit meds to a crossing.
            </p>
          </div>
          <ol class="zone-track">
            <li class="zone-card">
              <span class="zone-card__step">01</span>
              <h3 class="zone-card__title">Area 05</h3>
              <p class="zone-card__text">
                Evacuated southeastern Finland: shelters, traders, tasks, baseline loot. Death usually taxes only what you
                <strong>carry right now</strong>—ideal for drills in gunplay, loot cadence, and inventory Tetris.
              </p>
            </li>
            <li class="zone-card">
              <span class="zone-card__step">02</span>
              <h3 class="zone-card__title">Border Zone</h3>
              <p class="zone-card__text">
                Composite obstacles—mine belts, physical blocks, rivers, boats—plus heavier guard pressure and air support. Treat
                it as <strong>recon → plan → execute</strong>, not a sprint.
              </p>
            </li>
            <li class="zone-card zone-card--risk">
              <span class="zone-card__step">03</span>
              <h3 class="zone-card__title">Vostok</h3>
              <p class="zone-card__text">
                High-value Russian interior with military-grade threats. The headline rule is <strong>permadeath-style wipes</strong>:
                mistakes here hurt more than anywhere else—endgame content, not tutorial space.
              </p>
            </li>
          </ol>
        </div>
      </div>
    </section>

    <section class="map-spotlight-section section" aria-labelledby="map-spotlight-heading">
      <div class="container">
        <div class="wrap wrap--full">
          <div class="map-spotlight">
            <div class="map-spotlight__copy">
              <p class="map-spotlight__eyebrow">Atlas · Same art the official site uses</p>
              <h2 id="map-spotlight-heading" class="map-spotlight__title">
                Road to Vostok interactive world map
              </h2>
              <p class="map-spotlight__text">
                Explore the same <strong>official world-map artwork</strong> used on the developer site, with clickable pins for
                Area 05, the Border Zone, Vostok, Highway, Minefield, and coastal labels. It pairs with the
                <RouterLink to="/guides#maps">maps &amp; crossings</RouterLink> pillar for written guides once each route is
                verified in your build.
              </p>
              <div class="map-spotlight__actions">
                <RouterLink to="/map" class="map-spotlight__btn map-spotlight__btn--primary">
                  Open the Road to Vostok world map
                </RouterLink>
                <RouterLink to="/guides#maps" class="map-spotlight__btn map-spotlight__btn--ghost">
                  Maps pillar index
                </RouterLink>
              </div>
            </div>
            <RouterLink
              to="/map"
              class="map-spotlight__visual"
              aria-label="Open the Road to Vostok interactive world map page"
            >
              <img
                class="map-spotlight__img"
                :src="mapThumbSrc"
                loading="lazy"
                decoding="async"
                alt="Road to Vostok world map preview showing Area 05, Border Zone, and Vostok"
              />
              <span class="map-spotlight__badge" aria-hidden="true">Map</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section class="topics-section section" aria-labelledby="topics-heading">
      <div class="container">
        <div class="wrap wrap--full">
          <div class="section-head">
            <h2 id="topics-heading" class="section-title">Guide pillars</h2>
            <p class="section-dek">
              Four columns cover how most of us play: guns, staying alive, economy, and not stepping on mines. Each card jumps
              straight into the matching section of the
              <RouterLink class="section-dek__link" to="/guides">guides hub</RouterLink>.
            </p>
          </div>
          <ul class="topic-grid">
            <li v-for="item in topics" :key="item.slug" class="topic-card">
              <RouterLink :to="{ path: '/guides', hash: `#${item.slug}` }" class="topic-card__link">
                <div class="topic-card__top">
                  <span class="topic-card__tag">{{ item.tag }}</span>
                  <svg class="topic-card__arrow" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path
                      d="M4 10h10M11 6l4 4-4 4"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <span class="topic-card__title">{{ item.title }}</span>
                <span class="topic-card__blurb">{{ item.blurb }}</span>
                <ul class="topic-card__bullets">
                  <li v-for="(b, j) in item.bullets" :key="j">{{ b }}</li>
                </ul>
                <span class="topic-card__cta">Open in guides hub</span>
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="outline-section section" aria-labelledby="outline-heading">
      <div class="container">
        <div class="wrap wrap--full">
          <div class="section-head">
            <h2 id="outline-heading" class="section-title">Coverage table</h2>
            <p class="section-dek">
              What’s live, what’s being written, and where it will live. Click a row when the link is there—everything eventually
              resolves to the guides hub or a dedicated route like the map.
            </p>
          </div>
          <div class="outline-table-wrap">
            <table class="outline-table">
              <caption class="visually-hidden">
                Guide coverage and status
              </caption>
              <thead>
                <tr>
                  <th scope="col">Pillar</th>
                  <th scope="col">Article</th>
                  <th scope="col">Focus</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in outlineRows" :key="row.article">
                  <td data-label="Pillar">{{ row.topic }}</td>
                  <td data-label="Article">
                    <RouterLink v-if="row.to" :to="row.to" class="outline-article-link">{{ row.article }}</RouterLink>
                    <template v-else>{{ row.article }}</template>
                  </td>
                  <td data-label="Focus">
                    <span class="outline-pill">{{ row.focus }}</span>
                  </td>
                  <td data-label="Status">
                    <span
                      class="outline-status"
                      :class="{
                        'outline-status--ok': row.status === 'Live',
                        'outline-status--wip': row.status === 'In progress',
                      }"
                    >
                      {{ row.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <section class="faq-section section section--tight" aria-labelledby="faq-heading">
      <div class="container">
        <div class="wrap wrap--wide">
          <h2 id="faq-heading" class="section-title">FAQ</h2>
          <p class="section-dek section-dek--tight">
            Straight answers—open one if you’re wondering whether we’re official, how often we touch the guides, or why Demo vs EA
            matters.
          </p>
          <div class="faq-list">
            <details v-for="(item, i) in faqItems" :key="i" class="faq-item">
              <summary class="faq-q">{{ item.q }}</summary>
              <div class="faq-a">
                <span
                  v-for="(seg, si) in item.segments"
                  :key="si"
                  class="faq-a__frag"
                >
                  <a
                    v-if="seg.href"
                    class="faq-a__link"
                    :href="seg.href"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {{ seg.text }}
                  </a>
                  <RouterLink v-else-if="seg.to" class="faq-a__link" :to="seg.to">{{ seg.text }}</RouterLink>
                  <span v-else>{{ seg.text }}</span>
                </span>
              </div>
            </details>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section section section--tight" aria-labelledby="cta-heading">
      <div class="container">
        <div class="wrap wrap--wide">
          <div class="cta-card">
            <div class="cta-card__copy">
              <h2 id="cta-heading" class="cta-title">What to read next</h2>
              <p class="cta-text">
                Boot order that works: <RouterLink class="cta-inline" to="/start">Start</RouterLink> for build and specs, then
                <RouterLink class="cta-inline" to="/guides">guides</RouterLink>
                for mechanics, then
                <RouterLink class="cta-inline" to="/map">map</RouterLink>
                when you’re planning a push. That trio covers ninety percent of “where do I click next?”
              </p>
            </div>
            <div class="cta-card__actions">
              <RouterLink to="/guides" class="hero-btn hero-btn--primary">Guides &amp; wiki hub</RouterLink>
              <RouterLink :to="{ path: '/guides', hash: '#wiki-index' }" class="hero-btn hero-btn--ghost">Quick finder</RouterLink>
              <RouterLink to="/start" class="hero-btn hero-btn--ghost">Demo / EA &amp; specs</RouterLink>
              <RouterLink to="/map" class="hero-btn hero-btn--ghost">World map</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.hero-section {
  position: relative;
  overflow: hidden;
}

.hero-section__bg {
  position: absolute;
  inset: -10% -5% auto -5%;
  height: min(72vh, 520px);
  pointer-events: none;
  opacity: 0.9;
}

.hero-section__svg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-layout {
  position: relative;
  display: grid;
  gap: 2rem 2.5rem;
  align-items: start;
}

@media (min-width: 1024px) {
  .hero-layout {
    grid-template-columns: 1.15fr 0.85fr;
  }
}

.hero-layout__copy--rail {
  position: relative;
  padding-left: 1.15rem;
}

.hero-layout__copy--rail::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.15rem;
  bottom: 0.15rem;
  width: 2px;
  border-radius: 2px;
  background: linear-gradient(
    180deg,
    var(--color-accent),
    color-mix(in srgb, var(--color-frost) 70%, var(--color-accent)) 45%,
    color-mix(in srgb, var(--color-border) 55%, transparent) 100%
  );
  box-shadow: 0 0 18px color-mix(in srgb, var(--color-accent) 35%, transparent);
}

@media (min-width: 1024px) {
  .hero-layout__copy--rail {
    padding-left: 1.35rem;
  }
}

.hero-eyebrow {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 0 1rem;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-frost);
}

.hero-eyebrow__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-accent);
  box-shadow: 0 0 12px color-mix(in srgb, var(--color-accent) 60%, transparent);
}

@media (prefers-reduced-motion: no-preference) {
  .hero-eyebrow__dot {
    animation: rtv-pulse 2.4s ease-in-out infinite;
  }
}

@keyframes rtv-pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.55;
    transform: scale(0.92);
  }
}

.hero-title {
  margin: 0 0 1.1rem;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-weight: 700;
  font-size: clamp(2.15rem, 5.2vw, 3.35rem);
  line-height: 1.02;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: var(--color-text);
}

.hero-lead {
  margin: 0 0 1rem;
  font-size: 1.0625rem;
  color: var(--color-text-muted);
  max-width: 38rem;
  line-height: 1.7;
}

.hero-lead--secondary {
  font-size: 0.9375rem;
  max-width: 40rem;
  margin-bottom: 1.5rem;
}

.hero-lead strong {
  color: color-mix(in srgb, var(--color-text) 86%, var(--color-frost));
  font-weight: 600;
}

.hero-code {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.82em;
  padding: 0.12em 0.35em;
  border-radius: 2px;
  border: 1px solid var(--color-border);
  background: var(--color-bg-panel);
  color: var(--color-frost);
}

.hero-inline,
.notice-inline,
.section-dek__link,
.faq-a__link,
.cta-inline {
  color: var(--color-frost);
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.hero-inline:hover,
.notice-inline:hover,
.section-dek__link:hover,
.faq-a__link:hover,
.cta-inline:hover {
  color: var(--color-text);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.hero-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.7rem 1.35rem;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 2px;
  cursor: pointer;
  transition:
    background 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;
}

.hero-btn--primary {
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--color-accent) 92%, #fff),
    var(--color-accent)
  );
  color: #0a0806;
  border: 1px solid var(--color-accent-dim);
  box-shadow: 0 12px 40px color-mix(in srgb, var(--color-accent) 22%, transparent);
}

.hero-btn--primary:hover {
  transform: translateY(-1px);
  filter: brightness(1.05);
}

.hero-btn--ghost {
  background: color-mix(in srgb, var(--color-bg-panel) 65%, transparent);
  color: var(--color-text);
  border: 1px solid var(--color-border-bright);
}

.hero-btn--ghost:hover {
  border-color: var(--color-frost);
  color: var(--color-frost);
}

.hero-panel {
  padding: 1.25rem 1.35rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background: linear-gradient(
    145deg,
    color-mix(in srgb, var(--color-bg-elevated) 88%, var(--color-frost) 12%),
    var(--color-bg-panel) 55%
  );
  box-shadow:
    0 0 0 1px color-mix(in srgb, var(--color-border-bright) 35%, transparent),
    0 24px 60px color-mix(in srgb, #000 55%, transparent);
}

.hero-panel--hud {
  position: relative;
  overflow: hidden;
}

.hero-panel--hud::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    115deg,
    transparent 40%,
    color-mix(in srgb, var(--color-frost) 8%, transparent) 48%,
    transparent 58%
  );
  opacity: 0.35;
  pointer-events: none;
}

.hero-panel__corners {
  position: absolute;
  inset: 10px;
  pointer-events: none;
}

.hero-panel__corner {
  position: absolute;
  width: 16px;
  height: 16px;
  border-color: color-mix(in srgb, var(--color-frost) 65%, transparent);
}

.hero-panel__corner--tl {
  top: 0;
  left: 0;
  border-top: 2px solid;
  border-left: 2px solid;
}

.hero-panel__corner--tr {
  top: 0;
  right: 0;
  border-top: 2px solid;
  border-right: 2px solid;
}

.hero-panel__corner--bl {
  bottom: 0;
  left: 0;
  border-bottom: 2px solid;
  border-left: 2px solid;
}

.hero-panel__corner--br {
  bottom: 0;
  right: 0;
  border-bottom: 2px solid;
  border-right: 2px solid;
}

.hero-panel__head {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--color-border);
}

.hero-panel__tag {
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.hero-panel__id {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  color: var(--color-text-muted);
}

.hero-panel__stats {
  margin: 0 0 1rem;
}

.hero-panel__row {
  display: grid;
  gap: 0.2rem;
  padding: 0.55rem 0;
  border-bottom: 1px dashed color-mix(in srgb, var(--color-border) 85%, transparent);
}

.hero-panel__row:last-of-type {
  border-bottom: none;
}

.hero-panel__row dt {
  margin: 0;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.hero-panel__row dd {
  margin: 0;
  font-size: 0.875rem;
  color: color-mix(in srgb, var(--color-text) 90%, var(--color-text-muted));
  line-height: 1.45;
}

.hero-panel__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0 0 1rem;
  padding: 0;
  list-style: none;
}

.hero-panel__chips li {
  padding: 0.25rem 0.5rem;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  border: 1px solid var(--color-border);
  border-radius: 2px;
  background: color-mix(in srgb, var(--color-bg-deep) 70%, transparent);
}

.hero-panel__foot {
  margin: 0;
  font-size: 0.75rem;
  color: var(--color-text-muted);
  line-height: 1.5;
}

.notice-grid {
  display: grid;
  gap: 1rem;
}

@media (min-width: 768px) {
  .notice-grid {
    grid-template-columns: 1.2fr 1fr;
  }
}

.signal-label {
  margin: 0 0 0.65rem;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.65rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.signal-scroll {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.75rem 0;
  border-block: 1px solid var(--color-border);
}

.signal-chip {
  padding: 0.35rem 0.65rem;
  font-size: 0.75rem;
  color: color-mix(in srgb, var(--color-text) 82%, var(--color-frost));
  border: 1px solid color-mix(in srgb, var(--color-border) 80%, var(--color-frost));
  border-radius: 999px;
  background: color-mix(in srgb, var(--color-bg-panel) 75%, transparent);
  backdrop-filter: blur(6px);
  white-space: nowrap;
}

.section-head {
  margin-bottom: 1.75rem;
  max-width: 44rem;
}

.section-title {
  margin: 0 0 0.6rem;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-weight: 700;
  font-size: clamp(1.5rem, 3vw, 2rem);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text);
}

.section-dek {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.9375rem;
  line-height: 1.65;
}

.section-dek--tight {
  margin-bottom: 1.25rem;
}

.bento {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .bento {
    grid-template-columns: repeat(6, 1fr);
    grid-auto-rows: minmax(120px, auto);
  }

  .bento__cell--large {
    grid-column: span 4;
    grid-row: span 2;
  }

  .bento__cell--stat {
    grid-column: span 2;
  }

  .bento__cell--quote {
    grid-column: span 3;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .bento {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: auto;
  }

  .bento__cell--large {
    grid-column: span 2;
    grid-row: span 1;
    min-height: 200px;
  }

  .bento__cell--stat {
    grid-column: span 1;
  }

  .bento__cell--quote {
    grid-column: span 2;
  }
}

.bento__cell {
  position: relative;
  padding: 1.25rem 1.35rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background: color-mix(in srgb, var(--color-bg-panel) 82%, transparent);
  overflow: hidden;
}

.bento__cell::before {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.12;
  background: radial-gradient(circle at 0 0, var(--color-frost), transparent 55%);
  pointer-events: none;
}

.bento__cell--large {
  min-height: 220px;
}

.bento__meta {
  position: relative;
  margin: 0 0 0.5rem;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.65rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.bento__title {
  position: relative;
  margin: 0 0 0.65rem;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-weight: 700;
  font-size: 1.35rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--color-text);
}

.bento__text {
  position: relative;
  margin: 0;
  font-size: 0.9375rem;
  color: var(--color-text-muted);
  line-height: 1.65;
  max-width: 40rem;
}

.bento__stat-label {
  position: relative;
  margin: 0 0 0.35rem;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.bento__stat-value {
  position: relative;
  margin: 0 0 0.25rem;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-weight: 700;
  font-size: 2rem;
  letter-spacing: 0.04em;
  color: var(--color-frost);
}

.bento__stat-hint {
  position: relative;
  margin: 0;
  font-size: 0.8125rem;
  color: var(--color-text-muted);
  line-height: 1.45;
}

.bento__quote {
  position: relative;
  margin: 0 0 0.75rem;
  font-size: 1.05rem;
  color: color-mix(in srgb, var(--color-text) 88%, var(--color-text-muted));
  line-height: 1.55;
  font-style: italic;
}

.bento__cite {
  position: relative;
  margin: 0;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.zone-track {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1rem;
}

@media (min-width: 768px) and (max-width: 1023px) {
  .zone-track {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .zone-track {
    grid-template-columns: repeat(3, 1fr);
  }
}

.zone-card {
  position: relative;
  padding: 1.35rem 1.25rem 1.25rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background: linear-gradient(160deg, var(--color-bg-elevated), var(--color-bg-panel));
}

.zone-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 1.25rem;
  right: 1.25rem;
  height: 2px;
  border-radius: 999px;
  background: linear-gradient(90deg, transparent, var(--color-frost), transparent);
  opacity: 0.45;
}

.zone-card--risk {
  border-color: color-mix(in srgb, var(--color-accent) 45%, var(--color-border));
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--color-accent) 18%, transparent);
}

.zone-card--risk::before {
  background: linear-gradient(90deg, transparent, var(--color-accent), transparent);
  opacity: 0.65;
}

.zone-card__step {
  display: inline-flex;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  color: var(--color-hazard);
  margin-bottom: 0.5rem;
}

.zone-card__title {
  margin: 0 0 0.6rem;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-weight: 700;
  font-size: 1.2rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text);
}

.zone-card__text {
  margin: 0;
  font-size: 0.9rem;
  color: var(--color-text-muted);
  line-height: 1.6;
}

.zone-card__text strong {
  color: color-mix(in srgb, var(--color-text) 85%, var(--color-text-muted));
  font-weight: 600;
}

.map-spotlight {
  display: grid;
  gap: 1.75rem;
  align-items: stretch;
  padding: 1.5rem 1.35rem;
  border: 1px solid color-mix(in srgb, var(--color-frost) 22%, var(--color-border));
  border-radius: 6px;
  background: linear-gradient(
    125deg,
    color-mix(in srgb, var(--color-bg-elevated) 88%, var(--color-frost) 12%),
    var(--color-bg-panel) 55%
  );
  box-shadow: 0 20px 55px color-mix(in srgb, #000 48%, transparent);
}

@media (min-width: 1024px) {
  .map-spotlight {
    grid-template-columns: 1fr minmax(260px, 42%);
    padding: 1.75rem 1.65rem;
    gap: 2rem;
  }
}

.map-spotlight__eyebrow {
  margin: 0 0 0.5rem;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.map-spotlight__title {
  margin: 0 0 0.75rem;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-weight: 700;
  font-size: clamp(1.35rem, 2.8vw, 1.85rem);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color-text);
  line-height: 1.12;
}

.map-spotlight__text {
  margin: 0 0 1.25rem;
  color: var(--color-text-muted);
  font-size: 0.9375rem;
  line-height: 1.65;
  max-width: 38rem;
}

.map-spotlight__text strong {
  color: color-mix(in srgb, var(--color-text) 86%, var(--color-text-muted));
}

.map-spotlight__text a {
  color: var(--color-frost);
  font-weight: 600;
  text-underline-offset: 0.2em;
}

.map-spotlight__text a:hover {
  color: var(--color-text);
}

.map-spotlight__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
}

.map-spotlight__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.65rem 1.2rem;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-weight: 600;
  font-size: 0.88rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 2px;
  cursor: pointer;
  transition:
    background 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;
}

.map-spotlight__btn--primary {
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--color-accent) 92%, #fff),
    var(--color-accent)
  );
  color: #0a0806;
  border: 1px solid var(--color-accent-dim);
}

.map-spotlight__btn--primary:hover {
  transform: translateY(-1px);
  filter: brightness(1.04);
}

.map-spotlight__btn--ghost {
  background: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-border-bright);
}

.map-spotlight__btn--ghost:hover {
  border-color: var(--color-frost);
  color: var(--color-frost);
}

.map-spotlight__visual {
  position: relative;
  display: block;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid var(--color-border);
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.map-spotlight__visual:hover {
  border-color: color-mix(in srgb, var(--color-frost) 45%, var(--color-border));
  box-shadow: 0 12px 36px color-mix(in srgb, #000 42%, transparent);
  transform: translateY(-2px);
}

.map-spotlight__img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 10;
  object-fit: cover;
}

.map-spotlight__badge {
  position: absolute;
  bottom: 0.65rem;
  right: 0.65rem;
  padding: 0.25rem 0.55rem;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-bg-deep);
  background: var(--color-frost);
  border-radius: 2px;
}

.topic-grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1.1rem;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .topic-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.topic-card__link {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
  padding: 1.35rem 1.4rem;
  text-decoration: none;
  color: inherit;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background: color-mix(in srgb, var(--color-bg-panel) 78%, transparent);
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.topic-card__link:hover {
  border-color: color-mix(in srgb, var(--color-frost) 40%, var(--color-border));
  transform: translateY(-2px);
  box-shadow: 0 16px 40px color-mix(in srgb, #000 45%, transparent);
}

.topic-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.topic-card__tag {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.6rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-frost);
}

.topic-card__arrow {
  flex-shrink: 0;
  color: var(--color-accent);
  opacity: 0.9;
}

.topic-card__title {
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-weight: 700;
  font-size: 1.2rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color-text);
}

.topic-card__blurb {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  line-height: 1.55;
}

.topic-card__bullets {
  margin: 0.25rem 0 0;
  padding-left: 1.1rem;
  color: color-mix(in srgb, var(--color-text-muted) 92%, var(--color-text));
  font-size: 0.8125rem;
  line-height: 1.5;
}

.topic-card__bullets li + li {
  margin-top: 0.25rem;
}

.topic-card__cta {
  margin-top: auto;
  padding-top: 0.5rem;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.outline-table-wrap {
  overflow-x: auto;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background: color-mix(in srgb, var(--color-bg-panel) 85%, transparent);
}

.outline-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
  min-width: 520px;
}

.outline-table th,
.outline-table td {
  padding: 0.85rem 1rem;
  text-align: left;
  border-bottom: 1px solid var(--color-border);
}

.outline-table th {
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  background: color-mix(in srgb, var(--color-bg-deep) 65%, var(--color-bg-panel));
}

.outline-table tbody tr:last-child td {
  border-bottom: none;
}

.outline-table td {
  color: var(--color-text-muted);
}

.outline-article-link {
  color: var(--color-frost);
  font-weight: 600;
  text-decoration: none;
}

.outline-article-link:hover {
  color: var(--color-text);
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.outline-pill {
  display: inline-block;
  padding: 0.15rem 0.45rem;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.65rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-frost);
  border: 1px solid color-mix(in srgb, var(--color-frost) 35%, var(--color-border));
  border-radius: 2px;
}

.outline-status {
  font-weight: 600;
  color: var(--color-text);
}

.outline-status--ok {
  color: var(--color-forest);
}

.outline-status--wip {
  color: var(--color-accent);
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.faq-item {
  border: 1px solid var(--color-border);
  border-radius: 4px;
  padding: 0.35rem 0.85rem 0.85rem;
  background: color-mix(in srgb, var(--color-bg-panel) 80%, transparent);
}

.faq-q {
  font-weight: 600;
  cursor: pointer;
  list-style: none;
  padding: 0.65rem 0;
  color: var(--color-text);
}

.faq-q::-webkit-details-marker {
  display: none;
}

.faq-q::after {
  content: '+';
  float: right;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  color: var(--color-accent);
}

.faq-item[open] .faq-q::after {
  content: '−';
}

.faq-a {
  margin: 0;
  padding-top: 0.25rem;
  color: var(--color-text-muted);
  font-size: 0.9rem;
  line-height: 1.65;
}

.faq-a__frag {
  display: contents;
}

.cta-card {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1.75rem 1.5rem;
  border: 1px solid color-mix(in srgb, var(--color-frost) 25%, var(--color-border));
  border-radius: 4px;
  background: linear-gradient(
    120deg,
    color-mix(in srgb, var(--color-bg-elevated) 90%, var(--color-frost) 10%),
    var(--color-bg-panel)
  );
}

.cta-title {
  margin: 0 0 0.5rem;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-weight: 700;
  font-size: 1.35rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text);
}

.cta-text {
  margin: 0;
  max-width: 36rem;
  color: var(--color-text-muted);
  font-size: 0.9375rem;
  line-height: 1.65;
}

.cta-text strong {
  color: color-mix(in srgb, var(--color-text) 88%, var(--color-text-muted));
  font-weight: 600;
}

.cta-card__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
}

@media (max-width: 1023px) {
  .hero-section__bg {
    height: min(62vh, 440px);
    opacity: 0.85;
  }

  .hero-layout {
    gap: 1.5rem 1.75rem;
  }

  .hero-panel {
    padding: 1.1rem 1.2rem;
    box-shadow:
      0 0 0 1px color-mix(in srgb, var(--color-border-bright) 30%, transparent),
      0 20px 52px color-mix(in srgb, #000 50%, transparent);
  }

  .map-spotlight {
    padding: 1.35rem 1.15rem;
    gap: 1.35rem;
  }

  .cta-card {
    padding: 1.5rem 1.25rem;
    gap: 1.25rem;
  }

  .zone-card {
    padding: 1.2rem 1.1rem 1.1rem;
  }
}

@media (max-width: 767px) {
  .hero-section__bg {
    height: min(50vh, 320px);
    inset: -6% -8% auto -8%;
    opacity: 0.78;
  }

  .hero-layout__copy--rail {
    padding-left: 0.9rem;
  }

  .hero-title {
    font-size: clamp(1.65rem, 6.5vw, 2.4rem);
  }

  .hero-btn {
    padding: 0.62rem 1.05rem;
    font-size: 0.86rem;
    letter-spacing: 0.08em;
  }

  .hero-actions {
    gap: 0.55rem;
  }

  .hero-panel {
    padding: 1rem 1.05rem;
  }

  .signal-scroll {
    gap: 0.4rem;
    padding: 0.65rem 0;
  }

  .signal-chip {
    padding: 0.32rem 0.55rem;
    font-size: 0.7rem;
  }

  .bento__cell {
    padding: 1.05rem 1.1rem;
  }

  .topic-card__link {
    padding: 1.15rem 1.15rem;
  }

  .faq-item {
    padding: 0.25rem 0.65rem 0.7rem;
  }

  .map-spotlight__btn {
    padding: 0.58rem 1rem;
    font-size: 0.82rem;
  }

  .outline-table th:nth-child(3),
  .outline-table td:nth-child(3) {
    display: none;
  }

  .outline-table {
    min-width: 100%;
  }
}
</style>
