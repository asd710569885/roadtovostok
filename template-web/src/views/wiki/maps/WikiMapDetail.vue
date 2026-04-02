<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { mapRouteForPin } from '../../../data/maps.js'
import { WIKI_NAV } from '../wikiNav.js'
import { MAP_NAV } from './mapNav.js'

const props = defineProps({
  page: {
    type: Object,
    required: true,
  },
})

const baseUrl = import.meta.env.BASE_URL

const wikiSiblings = computed(() => WIKI_NAV.filter((c) => c.slug !== 'maps'))
const mapPeers = computed(() => MAP_NAV.filter((m) => m.slug !== props.page.slug))

function heroSrc(path) {
  if (!path) return ''
  const p = path.startsWith('/') ? path.slice(1) : path
  return `${baseUrl}${p}`
}
</script>

<template>
  <div class="page-wiki-map">
    <section class="map-head section section--tight" :aria-labelledby="'map-h-' + page.slug">
      <div class="container">
        <div class="wrap wrap--wide">
          <p class="map-kicker">{{ page.kicker }}</p>
          <nav class="map-crumb" aria-label="Breadcrumb">
            <RouterLink to="/" class="map-crumb__a">Road to Vostok Field Manual</RouterLink>
            <span class="map-crumb__sep" aria-hidden="true">/</span>
            <RouterLink to="/wiki" class="map-crumb__a">Wiki</RouterLink>
            <span class="map-crumb__sep" aria-hidden="true">/</span>
            <RouterLink to="/wiki/maps" class="map-crumb__a">Maps</RouterLink>
            <span class="map-crumb__sep" aria-hidden="true">/</span>
            <span class="map-crumb__here">{{ page.name }}</span>
          </nav>

          <div class="map-hero">
            <div v-if="page.image" class="map-hero__frame">
              <img
                class="map-hero__img"
                :src="heroSrc(page.image)"
                :alt="`Road to Vostok ${page.name} map overview`"
                width="960"
                height="540"
                loading="eager"
                decoding="async"
              />
            </div>
            <div class="map-hero__text">
              <h1 :id="'map-h-' + page.slug" class="map-title">Road to Vostok {{ page.name }} Map</h1>
              <p class="map-lead">{{ page.summary }}</p>
            </div>
          </div>

          <div v-if="page.demoNote" class="map-callout" role="note">
            <span class="map-callout__label">Build note</span>
            <p class="map-callout__p">{{ page.demoNote }}</p>
          </div>

          <p class="map-atlas-cta">
            <RouterLink class="map-atlas-cta__a" :to="mapRouteForPin(page.slug)">
              Open <strong>{{ page.name }}</strong> on the interactive world map (zooms to this pin)
            </RouterLink>
          </p>

          <nav class="map-peers" aria-label="Other maps">
            <RouterLink v-for="m in mapPeers" :key="m.slug" class="map-peer" :to="m.routePath">
              {{ m.title }}
            </RouterLink>
            <RouterLink class="map-peer map-peer--all" to="/wiki/maps">All maps</RouterLink>
          </nav>

          <nav class="map-wiki" aria-label="Other wiki topics">
            <RouterLink v-for="c in wikiSiblings" :key="c.slug" class="map-wiki__a" :to="c.routePath">
              {{ c.title }}
            </RouterLink>
          </nav>
        </div>
      </div>
    </section>

    <section class="map-body section" :aria-label="page.name + ' details'">
      <div class="container">
        <div class="wrap wrap--wide map-stack">
          <article v-if="page.highlights?.length" class="map-panel">
            <h2 class="map-h2">Why this map matters</h2>
            <ul class="map-ul">
              <li v-for="(h, i) in page.highlights" :key="i">{{ h }}</li>
            </ul>
          </article>

          <article v-if="page.npcs?.length" class="map-panel">
            <h2 class="map-h2">NPCs, traders, and threats</h2>
            <p v-for="(p, i) in page.npcs" :key="i" class="map-p">{{ p }}</p>
          </article>

          <article v-if="page.lootContainers?.length" class="map-panel">
            <h2 class="map-h2">Notable loot containers</h2>
            <p class="map-dek">
              Quantities come from community map surveys—treat them as orientation, not a guarantee after a patch.
            </p>
            <div class="map-table-wrap">
              <table class="map-table">
                <thead>
                  <tr>
                    <th scope="col">Container</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Typical loot</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, ri) in page.lootContainers" :key="ri">
                    <th scope="row" class="map-table__name">{{ row.name }}</th>
                    <td class="map-table__num">{{ row.quantity }}</td>
                    <td>{{ row.loot }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>

          <article v-if="page.lootTips?.length" class="map-panel map-panel--soft">
            <h2 class="map-h2">Loot and movement tips</h2>
            <ul class="map-ul">
              <li v-for="(t, i) in page.lootTips" :key="i">{{ t }}</li>
            </ul>
          </article>

          <article v-if="page.weaponsNote" class="map-panel">
            <h2 class="map-h2">Weapon spawn snapshot</h2>
            <p class="map-p">{{ page.weaponsNote }}</p>
          </article>

          <footer class="map-foot" role="region" aria-labelledby="map-foot-h">
            <div class="map-foot__accent" aria-hidden="true" />
            <h2 id="map-foot-h" class="map-foot__title">Pair with the field manual</h2>
            <p class="map-foot__p">
              Cross-check this {{ page.name }} write-up with our
              <RouterLink class="map-a" to="/map">interactive world map</RouterLink>,
              <RouterLink class="map-a" to="/wiki/weapons">weapons</RouterLink> tables, and
              <RouterLink class="map-a" to="/wiki/ammo">ammo</RouterLink> pairing guide. Official Steam builds can add or
              remove exits—trust your client over any fan summary.
            </p>
            <p class="map-foot__nav">
              <RouterLink class="map-a" to="/wiki/maps">← Maps index</RouterLink>
              ·
              <RouterLink class="map-a" to="/wiki">Wiki hub</RouterLink>
            </p>
          </footer>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.map-kicker {
  margin: 0 0 0.5rem;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.map-crumb {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin: 0 0 1rem;
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}

.map-crumb__a {
  color: var(--color-frost);
  font-weight: 600;
  text-decoration: none;
}

.map-crumb__a:hover {
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.map-hero {
  display: grid;
  gap: 1.25rem;
  margin-bottom: 1rem;
}

@media (min-width: 880px) {
  .map-hero {
    grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
    align-items: start;
    gap: 1.5rem;
  }
}

.map-hero__frame {
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--color-border) 70%, var(--color-frost) 10%);
  background: #06090c;
  box-shadow: 0 18px 44px color-mix(in srgb, #000 38%, transparent);
}

.map-hero__img {
  display: block;
  width: 100%;
  height: auto;
}

.map-title {
  margin: 0 0 0.55rem;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-size: clamp(1.65rem, 4vw, 2.15rem);
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  line-height: 1.1;
  color: var(--color-text);
}

.map-lead {
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--color-text-muted);
}

.map-callout {
  margin: 0 0 1rem;
  padding: 0.85rem 1rem;
  border-radius: 12px;
  border: 1px solid color-mix(in srgb, var(--color-accent) 35%, var(--color-border));
  background: color-mix(in srgb, var(--color-accent) 8%, var(--color-bg-panel));
}

.map-callout__label {
  display: block;
  margin-bottom: 0.35rem;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.map-callout__p {
  margin: 0;
  font-size: 0.8125rem;
  line-height: 1.55;
  color: var(--color-text-muted);
}

.map-atlas-cta {
  margin: 0 0 0.75rem;
}

.map-atlas-cta__a {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-frost);
  text-underline-offset: 0.2em;
}

.map-atlas-cta__a:hover,
.map-atlas-cta__a:focus-visible {
  color: var(--color-text);
}

.map-peers {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 0.75rem;
}

.map-peer {
  display: inline-flex;
  padding: 0.32rem 0.65rem;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--color-text-muted);
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--color-border) 85%, transparent);
  background: color-mix(in srgb, var(--color-bg-panel) 88%, transparent);
  transition:
    border-color 0.15s ease,
    color 0.15s ease;
}

.map-peer:hover {
  border-color: color-mix(in srgb, var(--color-frost) 32%, var(--color-border));
  color: var(--color-frost);
}

.map-peer--all {
  border-color: color-mix(in srgb, var(--color-accent) 30%, var(--color-border));
  color: var(--color-accent);
}

.map-wiki {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.map-wiki__a {
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  text-decoration: none;
  color: color-mix(in srgb, var(--color-text-muted) 90%, var(--color-frost));
  padding: 0.25rem 0.55rem;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--color-border) 88%, transparent);
}

.map-wiki__a:hover {
  color: var(--color-frost);
}

.map-body {
  padding-bottom: 2.5rem;
}

.map-stack {
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
}

.map-panel {
  position: relative;
  padding: 1.1rem 1.2rem 1.15rem 1.35rem;
  border-radius: 14px;
  border: 1px solid color-mix(in srgb, var(--color-border) 72%, var(--color-frost) 10%);
  background: linear-gradient(
    165deg,
    color-mix(in srgb, var(--color-bg-panel) 95%, var(--color-frost) 2%) 0%,
    color-mix(in srgb, var(--color-bg-deep) 90%, #0e1418) 100%
  );
  box-shadow: 0 14px 32px color-mix(in srgb, #000 30%, transparent);
}

.map-panel::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.75rem;
  bottom: 0.75rem;
  width: 3px;
  border-radius: 0 3px 3px 0;
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--color-accent) 80%, transparent),
    color-mix(in srgb, var(--color-frost) 40%, transparent)
  );
}

.map-panel--soft {
  border-style: dashed;
  opacity: 0.98;
}

.map-h2 {
  margin: 0 0 0.65rem;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--color-text);
}

.map-dek {
  margin: 0 0 0.75rem;
  font-size: 0.78rem;
  line-height: 1.5;
  color: var(--color-text-muted);
}

.map-ul {
  margin: 0;
  padding-left: 1.15rem;
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--color-text-muted);
}

.map-ul li + li {
  margin-top: 0.4rem;
}

.map-p {
  margin: 0 0 0.65rem;
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--color-text-muted);
}

.map-p:last-child {
  margin-bottom: 0;
}

.map-table-wrap {
  overflow-x: auto;
  border-radius: 10px;
  border: 1px solid color-mix(in srgb, var(--color-border) 55%, transparent);
  background: color-mix(in srgb, #141a1f 92%, transparent);
}

.map-table {
  width: 100%;
  min-width: 520px;
  border-collapse: collapse;
  font-size: 0.8125rem;
}

.map-table th {
  text-align: left;
  padding: 0.6rem 0.75rem;
  font-size: 0.58rem;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--color-text-muted) 88%, var(--color-frost));
  background: color-mix(in srgb, #1e262c 95%, transparent);
  border-bottom: 1px solid color-mix(in srgb, var(--color-border) 55%, transparent);
}

.map-table td {
  padding: 0.5rem 0.75rem;
  vertical-align: top;
  color: var(--color-text-muted);
  border-bottom: 1px solid color-mix(in srgb, var(--color-border) 38%, transparent);
}

.map-table tr:last-child td,
.map-table tr:last-child th[scope='row'] {
  border-bottom: none;
}

.map-table__name {
  font-weight: 700;
  color: color-mix(in srgb, var(--color-text) 88%, var(--color-text-muted));
  max-width: 11rem;
}

.map-table__num {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.map-foot {
  position: relative;
  margin-top: 0.35rem;
  padding: 1.2rem 1.2rem 1.2rem 1.4rem;
  max-width: 44rem;
  border-radius: 14px;
  border: 1px solid color-mix(in srgb, var(--color-border) 68%, transparent);
  background: color-mix(in srgb, var(--color-bg-panel) 85%, var(--color-bg-deep));
}

.map-foot__accent {
  position: absolute;
  left: 0;
  top: 0.85rem;
  bottom: 0.85rem;
  width: 3px;
  border-radius: 0 3px 3px 0;
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--color-frost) 50%, transparent),
    color-mix(in srgb, var(--color-accent) 35%, transparent)
  );
}

.map-foot__title {
  margin: 0 0 0.45rem;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text);
}

.map-foot__p {
  margin: 0 0 0.65rem;
  font-size: 0.8125rem;
  line-height: 1.55;
  color: var(--color-text-muted);
}

.map-foot__nav {
  margin: 0;
  font-size: 0.8125rem;
}

.map-a {
  color: var(--color-frost);
  font-weight: 600;
  text-decoration: none;
}

.map-a:hover {
  text-decoration: underline;
  text-underline-offset: 0.2em;
}
</style>
