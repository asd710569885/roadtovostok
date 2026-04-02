<script setup>
import { onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

const mapThumbSrc = `${import.meta.env.BASE_URL}images/road-to-vostok-map.jpg`

/** High-intent internal links — readable for users, keyword anchors for SEO. */
const jumpLinks = [
  { to: '/wiki', label: 'Road to Vostok wiki hub' },
  { to: '/wiki/weapons', label: 'Weapons & reloading guide' },
  { to: '/wiki/ammo', label: 'Ammo & magazines' },
  { to: '/wiki/maps', label: 'Map walkthroughs (Village, Shipyard…)' },
  { to: '/wiki/npcs', label: 'NPCs & traders' },
  { to: '/map', label: 'Interactive world map' },
  { to: '/start', label: 'Demo, Early Access & PC specs' },
  { to: '/updates', label: 'Updates & patch notes' },
  { to: '/blog', label: 'Player blog' },
]

const exploreCards = [
  {
    to: '/wiki/weapons',
    title: 'Weapons',
    tag: 'Wiki',
    desc: 'Reload flow, caliber tables, thumbnails—cross-linked to ammo.',
  },
  {
    to: '/wiki/ammo',
    title: 'Ammo',
    tag: 'Wiki',
    desc: 'Stacks, weight, caliber pairing, and links back to weapons.',
  },
  {
    to: '/wiki/maps',
    title: 'Maps',
    tag: 'Wiki',
    desc: 'Village, Shipyard, Highway, Minefield—loot, traders, build notes.',
  },
  {
    to: '/wiki/npcs',
    title: 'NPCs',
    tag: 'Wiki',
    desc: 'Bandits, Generalist, Doctor—tasks, barter, map deep links.',
  },
  {
    to: '/map',
    title: 'World map',
    tag: 'Atlas',
    desc: 'Zoomable pins, wiki blurbs, NPC cards, shareable ?pin= URLs.',
  },
  {
    to: '/start',
    title: 'Start',
    tag: 'Boot',
    desc: 'New players: Demo vs EA, checklist, Steam & system requirements.',
  },
  {
    to: '/updates',
    title: 'Updates',
    tag: 'News',
    desc: 'Where to read official patch notes, Steam posts, and roadmap.',
  },
  {
    to: '/blog',
    title: 'Blog',
    tag: 'Read',
    desc: 'Longer guides and commentary—Area 05, Vostok, survival loop.',
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
    q: 'Why split Demo vs Early Access on the wiki?',
    segments: [
      { text: 'Because one loot pass or task rebalance can brick a write-up overnight. Labels save you from “the guide lied” when your build is ahead or behind the author’s. The split is spelled out on the ' },
      { text: 'Start page', to: '/start' },
      { text: ' and in each ' },
      { text: 'wiki topics', to: '/wiki' },
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
      { text: 'wiki hub', to: '/wiki' },
      { text: ', ' },
      { text: 'map', to: '/map' },
      { text: ', and ' },
      { text: 'Start', to: '/start' },
      { text: ' first. If a page shows a “last checked” build, treat anything older as suspect until you verify in-client.' },
    ],
  },
]

function faqPlainAnswer(segments) {
  return segments.map((s) => s.text).join('')
}

let homeFaqJsonLdEl = null

function removeHomeFaqJsonLd() {
  homeFaqJsonLdEl?.remove()
  homeFaqJsonLdEl = null
}

function injectHomeFaqJsonLd() {
  removeHomeFaqJsonLd()
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faqPlainAnswer(item.segments),
      },
    })),
  }
  homeFaqJsonLdEl = document.createElement('script')
  homeFaqJsonLdEl.type = 'application/ld+json'
  homeFaqJsonLdEl.setAttribute('data-home-faq-jsonld', '1')
  homeFaqJsonLdEl.textContent = JSON.stringify(data)
  document.head.appendChild(homeFaqJsonLdEl)
}

onMounted(() => injectHomeFaqJsonLd())
onUnmounted(() => removeHomeFaqJsonLd())
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
                Unofficial field manual · roadtovostok.net
              </p>
              <h1 id="hero-heading" class="hero-title">
                Road to Vostok wiki &amp; player guide — weapons, maps &amp; NPCs
              </h1>
              <p class="hero-lead">
                One place for <strong>Road to Vostok</strong> reference: a structured
                <RouterLink class="hero-inline" to="/wiki">wiki</RouterLink>
                (weapons, ammo, playable maps, traders), an
                <RouterLink class="hero-inline" to="/map">interactive world map</RouterLink>
                with wiki-tied pins, and a
                <RouterLink class="hero-inline" to="/start">Start</RouterLink>
                hub for Demo vs Early Access and PC specs. We cover the Finland–Russia border fantasy in layers—
                <strong>Area 05</strong>, <strong>Border Zone</strong>, and high-stakes <strong>Vostok</strong>—so you can plan loot runs without tab chaos.
              </p>
              <p class="hero-lead hero-lead--secondary">
                Pick a destination below, or use the jump links for common intents. Everything cross-links: NPC pages open the same pin on the atlas; map guides match Village, Shipyard, Highway, and Minefield write-ups.
              </p>
              <div class="hero-actions">
                <RouterLink to="/wiki" class="hero-btn hero-btn--primary">Wiki hub</RouterLink>
                <RouterLink to="/map" class="hero-btn hero-btn--ghost">Interactive map</RouterLink>
                <RouterLink to="/start" class="hero-btn hero-btn--ghost">Start guide</RouterLink>
                <RouterLink to="/updates" class="hero-btn hero-btn--ghost">Updates</RouterLink>
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
                <RouterLink class="notice-inline" to="/wiki">wiki hub</RouterLink>
                stay the front door so weapons, survival, tasks, and maps never live in a dead-end corner.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="home-jump section section--tight" aria-labelledby="home-jump-h">
      <div class="container">
        <div class="wrap wrap--full">
          <div class="section-head section-head--compact">
            <h2 id="home-jump-h" class="section-title">Jump to…</h2>
            <p class="section-dek">
              Shortcuts to every major section—useful on mobile and for search-friendly internal navigation.
            </p>
          </div>
          <nav class="home-jump__nav" aria-label="Primary site sections">
            <RouterLink v-for="j in jumpLinks" :key="j.to" :to="j.to" class="home-jump__link">
              {{ j.label }}
            </RouterLink>
          </nav>
        </div>
      </div>
    </section>

    <section class="home-explore section" aria-labelledby="home-explore-h">
      <div class="container">
        <div class="wrap wrap--full">
          <div class="section-head">
            <h2 id="home-explore-h" class="section-title">Explore the manual</h2>
            <p class="section-dek">
              Eight entry points cover how most players use this site: reference tables, atlas, onboarding, and news. Each card opens
              a dedicated route—no buried anchors.
            </p>
          </div>
          <ul class="home-explore__grid">
            <li v-for="card in exploreCards" :key="card.to" class="home-explore__item">
              <RouterLink :to="card.to" class="home-explore__card">
                <div class="home-explore__top">
                  <span class="home-explore__tag">{{ card.tag }}</span>
                  <svg class="home-explore__arrow" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path
                      d="M4 10h10M11 6l4 4-4 4"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <span class="home-explore__title">{{ card.title }}</span>
                <span class="home-explore__desc">{{ card.desc }}</span>
                <span class="home-explore__cta">Open →</span>
              </RouterLink>
            </li>
          </ul>
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
              <RouterLink class="section-dek__link" to="/wiki/maps">maps wiki</RouterLink>
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
              <p class="map-spotlight__eyebrow">Featured · Road to Vostok interactive map</p>
              <h2 id="map-spotlight-heading" class="map-spotlight__title">
                Road to Vostok interactive world map
              </h2>
              <p class="map-spotlight__text">
                Pan and zoom the <strong>official-style world artwork</strong> with hand-placed pins for Area 05, Border Zone, Vostok,
                Village, Shipyard, Highway, Minefield, and more. Each pin surfaces wiki-aligned notes, NPC cards, and
                <code class="hero-code">?pin=</code> URLs you can share. Pair it with
                <RouterLink to="/wiki/maps">map walkthroughs</RouterLink> for container tables and build caveats.
              </p>
              <div class="map-spotlight__actions">
                <RouterLink to="/map" class="map-spotlight__btn map-spotlight__btn--primary">
                  Open interactive map
                </RouterLink>
                <RouterLink to="/wiki/maps" class="map-spotlight__btn map-spotlight__btn--ghost">
                  Maps wiki
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

    <section class="faq-section section section--tight" aria-labelledby="faq-heading">
      <div class="container">
        <div class="wrap wrap--wide">
          <h2 id="faq-heading" class="section-title">FAQ</h2>
          <p class="section-dek section-dek--tight">
            Straight answers—open one if you’re wondering whether we’re official, how often we touch the wiki, or why Demo vs EA
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
              <h2 id="cta-heading" class="cta-title">Suggested reading order</h2>
              <p class="cta-text">
                <RouterLink class="cta-inline" to="/start">Start</RouterLink>
                for Demo vs EA and PC requirements, then the
                <RouterLink class="cta-inline" to="/wiki">wiki hub</RouterLink>
                for weapons, ammo, maps, and NPCs, then the
                <RouterLink class="cta-inline" to="/map">interactive map</RouterLink>
                when you want geography and pin-level context. Add
                <RouterLink class="cta-inline" to="/updates">Updates</RouterLink>
                after major patches.
              </p>
            </div>
            <div class="cta-card__actions">
              <RouterLink to="/wiki" class="hero-btn hero-btn--primary">Wiki hub</RouterLink>
              <RouterLink to="/wiki/weapons" class="hero-btn hero-btn--ghost">Weapons</RouterLink>
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

.section-head--compact {
  margin-bottom: 1rem;
}

.home-jump__nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 0.65rem;
  padding: 0.35rem 0 0.15rem;
}

.home-jump__link {
  display: inline-flex;
  align-items: center;
  padding: 0.45rem 0.85rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: color-mix(in srgb, var(--color-text) 88%, var(--color-frost));
  text-decoration: none;
  border: 1px solid color-mix(in srgb, var(--color-border) 75%, var(--color-frost));
  border-radius: 999px;
  background: color-mix(in srgb, var(--color-bg-panel) 82%, transparent);
  transition:
    border-color 0.18s ease,
    color 0.18s ease,
    background 0.18s ease;
}

.home-jump__link:hover {
  border-color: color-mix(in srgb, var(--color-frost) 45%, var(--color-border));
  color: var(--color-frost);
  background: color-mix(in srgb, var(--color-bg-elevated) 70%, transparent);
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

.home-explore__grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .home-explore__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1100px) {
  .home-explore__grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.home-explore__card {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  height: 100%;
  min-height: 8.5rem;
  padding: 1.2rem 1.25rem;
  text-decoration: none;
  color: inherit;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: color-mix(in srgb, var(--color-bg-panel) 80%, transparent);
  transition:
    border-color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.home-explore__card:hover {
  border-color: color-mix(in srgb, var(--color-frost) 38%, var(--color-border));
  transform: translateY(-2px);
  box-shadow: 0 14px 36px color-mix(in srgb, #000 42%, transparent);
}

.home-explore__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.home-explore__tag {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.6rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-frost);
}

.home-explore__arrow {
  flex-shrink: 0;
  color: var(--color-accent);
  opacity: 0.9;
}

.home-explore__title {
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-weight: 700;
  font-size: 1.15rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color-text);
}

.home-explore__desc {
  flex: 1;
  font-size: 0.875rem;
  color: var(--color-text-muted);
  line-height: 1.55;
}

.home-explore__cta {
  margin-top: auto;
  padding-top: 0.35rem;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-accent);
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

  .home-jump__link {
    padding: 0.4rem 0.72rem;
    font-size: 0.78rem;
  }

  .home-explore__card {
    padding: 1.05rem 1.1rem;
    min-height: 0;
  }

  .faq-item {
    padding: 0.25rem 0.65rem 0.7rem;
  }

  .map-spotlight__btn {
    padding: 0.58rem 1rem;
    font-size: 0.82rem;
  }
}
</style>
