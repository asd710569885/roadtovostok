<script setup>
import { RouterLink } from 'vue-router'
import { WIKI_NAV } from '../wikiNav.js'

const baseUrl = import.meta.env.BASE_URL

const cards = [
  {
    slug: 'village',
    routePath: '/wiki/maps/village',
    role: 'Starter',
    title: 'Village',
    blurb: 'Spawn shelter, Generalist trader, dense civilian loot and bandit clears.',
    image: 'images/wiki/maps/village.jpg',
  },
  {
    slug: 'shipyard',
    routePath: '/wiki/maps/shipyard',
    role: 'Industrial',
    title: 'Shipyard',
    blurb: 'Doctor medic trader, container farms, tight CQB sightlines.',
    image: 'images/wiki/maps/shipyard.jpg',
  },
  {
    slug: 'highway',
    routePath: '/wiki/maps/highway',
    role: 'Transit',
    title: 'Highway',
    blurb: 'Open connector toward Minefield—cars, crates, long sightlines.',
    image: 'images/wiki/maps/highway.jpg',
  },
  {
    slug: 'minefield',
    routePath: '/wiki/maps/minefield',
    role: 'Border',
    title: 'Minefield',
    blurb: 'Mines toward radar, border patrol, military crates, RK-95 cadence.',
    image: 'images/wiki/maps/minefield.jpg',
  },
]

const wikiSiblings = WIKI_NAV.filter((c) => c.slug !== 'maps')

function imgSrc(path) {
  const p = path.startsWith('/') ? path.slice(1) : path
  return `${baseUrl}${p}`
}
</script>

<template>
  <div class="page-wiki-maps-idx">
    <section class="maps-idx-hero section section--tight" aria-labelledby="maps-idx-h">
      <div class="maps-idx-hero__glow" aria-hidden="true" />
      <div class="container">
        <div class="wrap wrap--wide">
          <p class="maps-idx-eyebrow">Atlas · Maps hub</p>
          <nav class="maps-idx-crumb" aria-label="Breadcrumb">
            <RouterLink to="/" class="maps-idx-crumb-a">Road to Vostok Field Manual</RouterLink>
            <span class="maps-idx-crumb-sep" aria-hidden="true">/</span>
            <RouterLink to="/wiki" class="maps-idx-crumb-a">Wiki</RouterLink>
            <span class="maps-idx-crumb-sep" aria-hidden="true">/</span>
            <span class="maps-idx-crumb-here">Maps</span>
          </nav>
          <h1 id="maps-idx-h" class="maps-idx-title">Road to Vostok Maps</h1>
          <p class="maps-idx-lead">
            Four location write-ups—Village, Shipyard, Highway, and Minefield—with summaries, loot tables, and trader notes. Use
            the interactive <RouterLink class="maps-idx-inline" to="/map">world map</RouterLink>
            for where each label sits on the artwork.
          </p>
          <nav class="maps-idx-wiki" aria-label="Other wiki topics">
            <RouterLink v-for="c in wikiSiblings" :key="c.slug" class="maps-idx-pill" :to="c.routePath">
              {{ c.title }}
            </RouterLink>
          </nav>
        </div>
      </div>
    </section>

    <section class="maps-idx-grid section" aria-label="Map locations">
      <div class="container">
        <div class="wrap wrap--wide">
          <ul class="maps-idx-cards">
            <li v-for="c in cards" :key="c.slug" class="maps-idx-cell">
              <RouterLink class="maps-card" :to="c.routePath">
                <div class="maps-card__visual">
                  <img
                    class="maps-card__img"
                    :src="imgSrc(c.image)"
                    :alt="`Road to Vostok ${c.title} map`"
                    width="400"
                    height="225"
                    loading="lazy"
                  />
                </div>
                <span class="maps-card__role">{{ c.role }}</span>
                <span class="maps-card__title">{{ c.title }}</span>
                <p class="maps-card__blurb">{{ c.blurb }}</p>
                <span class="maps-card__cta">Open guide →</span>
              </RouterLink>
            </li>
          </ul>
          <p class="maps-idx-back">
            <RouterLink class="maps-idx-back-a" to="/wiki">← Wiki index</RouterLink>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.maps-idx-hero {
  position: relative;
  overflow: hidden;
}

.maps-idx-hero__glow {
  pointer-events: none;
  position: absolute;
  inset: -35% -15% auto -15%;
  height: min(380px, 50vw);
  background:
    radial-gradient(ellipse 50% 65% at 20% 35%, color-mix(in srgb, var(--color-frost) 16%, transparent), transparent 55%),
    radial-gradient(ellipse 40% 50% at 85% 20%, color-mix(in srgb, var(--color-accent) 12%, transparent), transparent 48%);
  opacity: 0.85;
}

.maps-idx-hero .container {
  position: relative;
  z-index: 1;
}

.maps-idx-eyebrow {
  margin: 0 0 0.45rem;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.maps-idx-crumb {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin: 0 0 1rem;
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}

.maps-idx-crumb-a {
  color: var(--color-frost);
  font-weight: 600;
  text-decoration: none;
}

.maps-idx-crumb-a:hover {
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.maps-idx-title {
  margin: 0 0 0.55rem;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-size: clamp(1.9rem, 4.5vw, 2.5rem);
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  line-height: 1.08;
  color: var(--color-text);
}

.maps-idx-lead {
  margin: 0 0 1.1rem;
  max-width: 44rem;
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--color-text-muted);
}

.maps-idx-inline {
  color: var(--color-frost);
  font-weight: 600;
  text-decoration: none;
}

.maps-idx-inline:hover {
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.maps-idx-wiki {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.maps-idx-pill {
  display: inline-flex;
  padding: 0.3rem 0.65rem;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: none;
  color: color-mix(in srgb, var(--color-text-muted) 88%, var(--color-frost));
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--color-border) 82%, transparent);
  background: color-mix(in srgb, var(--color-bg-deep) 35%, transparent);
}

.maps-idx-pill:hover {
  color: var(--color-frost);
  border-color: color-mix(in srgb, var(--color-frost) 30%, var(--color-border));
}

.maps-idx-cards {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .maps-idx-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1100px) {
  .maps-idx-cards {
    grid-template-columns: repeat(4, 1fr);
  }
}

.maps-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 14px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  border: 1px solid color-mix(in srgb, var(--color-border) 72%, var(--color-frost) 8%);
  background: linear-gradient(
    165deg,
    color-mix(in srgb, var(--color-bg-panel) 94%, transparent) 0%,
    color-mix(in srgb, var(--color-bg-deep) 92%, #080c10) 100%
  );
  box-shadow: 0 16px 40px color-mix(in srgb, #000 32%, transparent);
  transition:
    transform 0.22s ease,
    border-color 0.2s ease,
    box-shadow 0.22s ease;
}

.maps-card:hover {
  transform: translateY(-3px);
  border-color: color-mix(in srgb, var(--color-frost) 32%, var(--color-border));
  box-shadow: 0 22px 50px color-mix(in srgb, #000 40%, transparent);
}

.maps-card__visual {
  aspect-ratio: 16 / 9;
  background: #05070a;
  border-bottom: 1px solid color-mix(in srgb, var(--color-border) 50%, transparent);
}

.maps-card__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.maps-card__role {
  margin: 0.75rem 0.9rem 0.25rem;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.55rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.maps-card__title {
  margin: 0 0.9rem 0.35rem;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text);
}

.maps-card__blurb {
  margin: 0 0.9rem;
  flex: 1;
  font-size: 0.8125rem;
  line-height: 1.5;
  color: var(--color-text-muted);
}

.maps-card__cta {
  margin: 0.85rem 0.9rem 1rem;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.58rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-frost);
}

.maps-idx-back {
  margin: 2rem 0 0;
}

.maps-idx-back-a {
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--color-frost);
  text-decoration: none;
}

.maps-idx-back-a:hover {
  text-decoration: underline;
  text-underline-offset: 0.2em;
}
</style>
