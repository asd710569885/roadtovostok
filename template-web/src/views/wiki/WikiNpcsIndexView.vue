<script setup>
import { RouterLink } from 'vue-router'
import { WIKI_NAV } from './wikiNav.js'

const baseUrl = import.meta.env.BASE_URL

const cards = [
  {
    slug: 'bandits',
    routePath: '/wiki/npcs/bandits',
    kicker: 'Hostiles',
    title: 'Bandits',
    blurb: 'Spawned enemies, loadouts, and combat behaviours across maps.',
    image: 'images/wiki/npcs/bandits.png',
    variant: 'hostile',
    index: '01',
    hint: 'AI · loot · quirks',
  },
  {
    slug: 'generalist',
    routePath: '/wiki/npcs/generalist',
    kicker: 'Trader',
    title: 'Generalist',
    blurb: 'Village-area trader: broad buy/sell, restock timer, and task tiers.',
    image: 'images/wiki/npcs/generalist.png',
    variant: 'trader',
    index: '02',
    hint: 'Barter · tasks L1–4',
  },
  {
    slug: 'doctor',
    routePath: '/wiki/npcs/doctor',
    kicker: 'Medic',
    title: 'Doctor',
    blurb: 'Shipyard medic: medical stock, tasks, and basement directions.',
    image: 'images/wiki/npcs/doctor.png',
    variant: 'medic',
    index: '03',
    hint: 'Meds · Shipyard',
  },
]

const wikiSiblings = WIKI_NAV.filter((c) => c.slug !== 'npcs')

function imgSrc(path) {
  const p = path.startsWith('/') ? path.slice(1) : path
  return `${baseUrl}${p}`
}
</script>

<template>
  <div class="page-wiki-npcs-index">
    <section class="npcs-hero section section--tight" aria-labelledby="npcs-idx-h">
      <div class="npcs-hero__glow" aria-hidden="true" />
      <div class="container">
        <div class="wrap wrap--wide">
          <p class="npcs-hero__eyebrow">People · NPC hub</p>
          <nav class="npcs-hero__crumb" aria-label="Breadcrumb">
            <RouterLink to="/" class="npcs-hero__crumb-a">Road to Vostok Field Manual</RouterLink>
            <span class="npcs-hero__crumb-sep" aria-hidden="true">/</span>
            <RouterLink to="/wiki" class="npcs-hero__crumb-a">Wiki</RouterLink>
            <span class="npcs-hero__crumb-sep" aria-hidden="true">/</span>
            <span class="npcs-hero__crumb-here">NPCs</span>
          </nav>

          <div class="npcs-hero__row">
            <div class="npcs-hero__main">
              <h1 id="npcs-idx-h" class="npcs-hero__title">Road to Vostok NPCs &amp; Traders</h1>
              <p class="npcs-hero__lead">
                Three dedicated dossiers—one hostile faction and two traders—with portraits, behaviour or stock notes, and task tables when they apply.
              </p>
            </div>
            <ul class="npcs-hero__stats" aria-label="Page contents">
              <li class="npcs-hero__stat">
                <span class="npcs-hero__stat-val">3</span>
                <span class="npcs-hero__stat-lbl">Profiles</span>
              </li>
              <li class="npcs-hero__stat">
                <span class="npcs-hero__stat-val">2</span>
                <span class="npcs-hero__stat-lbl">Traders</span>
              </li>
              <li class="npcs-hero__stat">
                <span class="npcs-hero__stat-val">1</span>
                <span class="npcs-hero__stat-lbl">Faction</span>
              </li>
            </ul>
          </div>

          <nav class="npcs-hero__topics" aria-label="Other wiki topics">
            <span class="npcs-hero__topics-label">Also on the manual</span>
            <div class="npcs-hero__topics-list">
              <RouterLink v-for="c in wikiSiblings" :key="c.slug" class="npcs-hero__topic" :to="c.routePath">
                {{ c.title }}
              </RouterLink>
            </div>
          </nav>
        </div>
      </div>
    </section>

    <section class="npcs-list section" aria-label="NPC list">
      <div class="container">
        <div class="wrap wrap--wide">
          <header class="npcs-list__head">
            <h2 class="npcs-list__h">Choose a profile</h2>
            <p class="npcs-list__sub">Cards open the full article—tables, locations, and cross-links stay on this site.</p>
          </header>

          <ul class="npcs-list__grid">
            <li
              v-for="c in cards"
              :key="c.slug"
              class="npcs-list__cell"
              :class="{ 'npcs-list__cell--featured': c.slug === 'bandits' }"
            >
              <RouterLink
                class="npcs-card"
                :class="'npcs-card--' + c.variant"
                :to="c.routePath"
              >
                <span class="npcs-card__index" aria-hidden="true">{{ c.index }}</span>
                <div class="npcs-card__shine" aria-hidden="true" />
                <div class="npcs-card__visual">
                  <div class="npcs-card__visual-inner">
                    <img
                      class="npcs-card__img"
                      :src="imgSrc(c.image)"
                      :alt="c.title"
                      width="400"
                      height="240"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div class="npcs-card__visual-fade" aria-hidden="true" />
                </div>
                <div class="npcs-card__body">
                  <span class="npcs-card__kicker">{{ c.kicker }}</span>
                  <span class="npcs-card__title">{{ c.title }}</span>
                  <span class="npcs-card__hint">{{ c.hint }}</span>
                  <p class="npcs-card__blurb">{{ c.blurb }}</p>
                  <span class="npcs-card__cta">
                    <span>Open dossier</span>
                    <span class="npcs-card__cta-arrow" aria-hidden="true">→</span>
                  </span>
                </div>
              </RouterLink>
            </li>
          </ul>

          <footer class="npcs-list__foot">
            <RouterLink class="npcs-list__back" to="/wiki">
              <span class="npcs-list__back-arrow" aria-hidden="true">←</span>
              Wiki index
            </RouterLink>
          </footer>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* —— Hero —— */
.npcs-hero {
  position: relative;
  overflow: hidden;
}

.npcs-hero__glow {
  pointer-events: none;
  position: absolute;
  inset: -40% -20% auto -20%;
  height: min(420px, 55vw);
  background:
    radial-gradient(ellipse 55% 70% at 18% 40%, color-mix(in srgb, var(--color-accent) 22%, transparent), transparent 55%),
    radial-gradient(ellipse 45% 55% at 78% 25%, color-mix(in srgb, var(--color-frost) 14%, transparent), transparent 50%),
    radial-gradient(ellipse 60% 40% at 50% 100%, color-mix(in srgb, var(--color-vein) 12%, transparent), transparent 45%);
  opacity: 0.85;
}

.npcs-hero .container {
  position: relative;
  z-index: 1;
}

.npcs-hero__eyebrow {
  margin: 0 0 0.45rem;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.npcs-hero__crumb {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem;
  margin: 0 0 1.1rem;
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}

.npcs-hero__crumb-a {
  color: var(--color-frost);
  font-weight: 600;
  text-decoration: none;
}

.npcs-hero__crumb-a:hover {
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.npcs-hero__crumb-here {
  color: color-mix(in srgb, var(--color-text) 75%, var(--color-text-muted));
  font-weight: 600;
}

.npcs-hero__row {
  display: grid;
  gap: 1.5rem;
  align-items: end;
  margin-bottom: 1.35rem;
}

@media (min-width: 768px) {
  .npcs-hero__row {
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 2rem;
  }
}

.npcs-hero__title {
  margin: 0 0 0.55rem;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-size: clamp(2rem, 5vw, 2.75rem);
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  line-height: 1.05;
  color: var(--color-text);
  text-shadow: 0 2px 24px color-mix(in srgb, #000 35%, transparent);
}

.npcs-hero__lead {
  margin: 0;
  max-width: 36rem;
  font-size: 0.9375rem;
  line-height: 1.65;
  color: color-mix(in srgb, var(--color-text-muted) 92%, var(--color-frost));
}

.npcs-hero__stats {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 0.65rem;
  flex-wrap: wrap;
}

@media (min-width: 768px) {
  .npcs-hero__stats {
    flex-direction: column;
    gap: 0.5rem;
    padding-bottom: 0.15rem;
  }
}

.npcs-hero__stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 4.5rem;
  padding: 0.55rem 0.75rem;
  border-radius: 12px;
  border: 1px solid color-mix(in srgb, var(--color-border) 65%, var(--color-frost) 12%);
  background: color-mix(in srgb, var(--color-bg-panel) 82%, transparent);
  box-shadow: 0 8px 24px color-mix(in srgb, #000 25%, transparent);
}

.npcs-hero__stat-val {
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--color-frost);
  line-height: 1;
}

.npcs-hero__stat-lbl {
  margin-top: 0.2rem;
  font-size: 0.58rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.npcs-hero__topics {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: 0.25rem;
  border-top: 1px solid color-mix(in srgb, var(--color-border) 55%, transparent);
}

@media (min-width: 640px) {
  .npcs-hero__topics {
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }
}

.npcs-hero__topics-label {
  flex-shrink: 0;
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.npcs-hero__topics-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.npcs-hero__topic {
  display: inline-flex;
  padding: 0.32rem 0.7rem;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  text-decoration: none;
  color: color-mix(in srgb, var(--color-text-muted) 88%, var(--color-frost));
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--color-border) 80%, transparent);
  background: color-mix(in srgb, var(--color-bg-deep) 40%, transparent);
  transition:
    color 0.15s ease,
    border-color 0.15s ease,
    background 0.15s ease;
}

.npcs-hero__topic:hover {
  color: var(--color-frost);
  border-color: color-mix(in srgb, var(--color-frost) 35%, var(--color-border));
  background: color-mix(in srgb, var(--color-frost) 6%, var(--color-bg-panel));
}

/* —— List —— */
.npcs-list__head {
  margin-bottom: 1.35rem;
}

.npcs-list__h {
  margin: 0 0 0.35rem;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text);
}

.npcs-list__sub {
  margin: 0;
  max-width: 36rem;
  font-size: 0.8125rem;
  line-height: 1.55;
  color: var(--color-text-muted);
}

.npcs-list__grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1.15rem;
}

@media (min-width: 900px) {
  .npcs-list__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.25rem;
  }

  .npcs-list__cell--featured {
    grid-column: 1 / -1;
  }
}

/* —— Card —— */
.npcs-card {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  border-radius: 16px;
  text-decoration: none;
  color: inherit;
  border: 1px solid color-mix(in srgb, var(--color-border) 68%, transparent);
  background: linear-gradient(
    155deg,
    color-mix(in srgb, var(--color-bg-panel) 94%, transparent) 0%,
    color-mix(in srgb, var(--color-bg-deep) 92%, #080c10) 100%
  );
  box-shadow:
    0 1px 0 color-mix(in srgb, var(--color-frost) 8%, transparent),
    0 20px 48px color-mix(in srgb, #000 32%, transparent);
  transition:
    transform 0.25s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.2s ease,
    box-shadow 0.25s ease;
}

@media (min-width: 900px) {
  .npcs-list__cell--featured .npcs-card {
    flex-direction: row;
    align-items: stretch;
    min-height: 220px;
  }
}

.npcs-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  z-index: 2;
  border-radius: 16px 0 0 16px;
  opacity: 0.95;
  pointer-events: none;
}

.npcs-card--hostile::before {
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--color-accent) 90%, transparent),
    color-mix(in srgb, #8b4513 40%, var(--color-accent) 60%)
  );
}

.npcs-card--trader::before {
  background: linear-gradient(180deg, color-mix(in srgb, var(--color-frost) 70%, transparent), color-mix(in srgb, var(--color-accent) 45%, transparent));
}

.npcs-card--medic::before {
  background: linear-gradient(
    180deg,
    color-mix(in srgb, #5cb88a 85%, transparent),
    color-mix(in srgb, var(--color-frost) 35%, transparent)
  );
}

.npcs-card__shine {
  position: absolute;
  inset: 0;
  opacity: 0;
  background: linear-gradient(
    125deg,
    transparent 40%,
    color-mix(in srgb, var(--color-frost) 12%, transparent) 48%,
    transparent 56%
  );
  transition: opacity 0.35s ease;
  pointer-events: none;
  z-index: 1;
}

.npcs-card:hover .npcs-card__shine {
  opacity: 1;
}

.npcs-card:hover {
  transform: translateY(-4px);
  border-color: color-mix(in srgb, var(--color-frost) 28%, var(--color-border));
  box-shadow:
    0 1px 0 color-mix(in srgb, var(--color-frost) 14%, transparent),
    0 28px 56px color-mix(in srgb, #000 42%, transparent);
}

.npcs-card:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--color-frost) 65%, transparent);
  outline-offset: 3px;
}

.npcs-card__index {
  position: absolute;
  top: 0.65rem;
  right: 0.75rem;
  z-index: 3;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  color: color-mix(in srgb, var(--color-text-muted) 70%, transparent);
}

.npcs-card__visual {
  position: relative;
  flex-shrink: 0;
  background: #06090c;
  aspect-ratio: 16 / 10;
}

@media (min-width: 900px) {
  .npcs-list__cell--featured .npcs-card__visual {
    width: min(42%, 320px);
    aspect-ratio: auto;
    min-height: 220px;
    align-self: stretch;
  }
}

.npcs-card__visual-inner {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 0.5rem 0.75rem 0;
}

.npcs-card__img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  object-position: center bottom;
  filter: drop-shadow(0 12px 28px color-mix(in srgb, #000 55%, transparent));
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.npcs-card:hover .npcs-card__img {
  transform: scale(1.03) translateY(-2px);
}

.npcs-card__visual-fade {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 35%, color-mix(in srgb, var(--color-bg-deep) 88%, transparent) 88%, var(--color-bg-deep) 100%);
  pointer-events: none;
}

@media (min-width: 900px) {
  .npcs-list__cell--featured .npcs-card__visual-fade {
    background: linear-gradient(90deg, transparent 20%, color-mix(in srgb, var(--color-bg-deep) 75%, transparent) 70%, var(--color-bg-deep) 100%);
  }
}

.npcs-card__body {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1rem 1.15rem 1.15rem 1.35rem;
  gap: 0.35rem;
}

.npcs-card__kicker {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.58rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.npcs-card__title {
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-size: clamp(1.35rem, 3vw, 1.65rem);
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--color-text);
  line-height: 1.1;
}

.npcs-card__hint {
  font-size: 0.68rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-weight: 600;
  color: color-mix(in srgb, var(--color-text-muted) 85%, var(--color-frost));
}

.npcs-card__blurb {
  margin: 0.15rem 0 0;
  flex: 1;
  font-size: 0.875rem;
  line-height: 1.55;
  color: var(--color-text-muted);
}

.npcs-card__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.65rem;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-frost);
}

.npcs-card__cta-arrow {
  display: inline-block;
  transition: transform 0.2s ease;
}

.npcs-card:hover .npcs-card__cta-arrow {
  transform: translateX(4px);
}

.npcs-list__foot {
  margin-top: 2.25rem;
  padding-top: 1.25rem;
  border-top: 1px solid color-mix(in srgb, var(--color-border) 50%, transparent);
}

.npcs-list__back {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--color-frost);
  text-decoration: none;
}

.npcs-list__back:hover .npcs-list__back-arrow {
  transform: translateX(-3px);
}

.npcs-list__back-arrow {
  display: inline-block;
  transition: transform 0.2s ease;
}

.npcs-list__back:hover {
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

@media (prefers-reduced-motion: reduce) {
  .npcs-card,
  .npcs-card__img,
  .npcs-card__cta-arrow,
  .npcs-list__back-arrow {
    transition: none;
  }

  .npcs-card:hover {
    transform: none;
  }

  .npcs-card:hover .npcs-card__img {
    transform: none;
  }
}
</style>
