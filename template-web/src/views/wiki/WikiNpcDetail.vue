<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { mapRouteForPin } from '../../data/maps.js'
import { WIKI_NAV } from './wikiNav.js'
import { NPC_NAV } from './npcNav.js'

const props = defineProps({
  page: {
    type: Object,
    required: true,
  },
})

const baseUrl = import.meta.env.BASE_URL

const wikiSiblings = computed(() => WIKI_NAV.filter((c) => c.slug !== 'npcs'))
const npcPeers = computed(() => NPC_NAV.filter((n) => n.slug !== props.page.slug))

function heroSrc(path) {
  if (!path) return ''
  const p = path.startsWith('/') ? path.slice(1) : path
  return `${baseUrl}${p}`
}
</script>

<template>
  <div class="page-wiki-npc">
    <section class="wiki-npc-head section section--tight" :aria-labelledby="'wiki-npc-h-' + page.slug">
      <div class="container">
        <div class="wrap wrap--wide">
          <p class="wiki-npc-kicker">{{ page.kicker }}</p>
          <nav class="wiki-npc-crumb" aria-label="Breadcrumb">
            <RouterLink to="/" class="wiki-npc-crumb__link">Road to Vostok Field Manual</RouterLink>
            <span class="wiki-npc-crumb__sep" aria-hidden="true">/</span>
            <RouterLink to="/wiki" class="wiki-npc-crumb__link">Wiki</RouterLink>
            <span class="wiki-npc-crumb__sep" aria-hidden="true">/</span>
            <RouterLink to="/wiki/npcs" class="wiki-npc-crumb__link">NPCs</RouterLink>
            <span class="wiki-npc-crumb__sep" aria-hidden="true">/</span>
            <span class="wiki-npc-crumb__here">{{ page.name }}</span>
          </nav>

          <div class="wiki-npc-hero">
            <div v-if="page.image" class="wiki-npc-hero__frame">
              <img
                class="wiki-npc-hero__img"
                :src="heroSrc(page.image)"
                :alt="page.name"
                width="320"
                height="200"
                loading="eager"
                decoding="async"
              />
            </div>
            <div class="wiki-npc-hero__text">
              <h1 :id="'wiki-npc-h-' + page.slug" class="wiki-npc-title">Road to Vostok {{ page.name }}</h1>
              <p class="wiki-npc-lead">{{ page.summary }}</p>
            </div>
          </div>

          <p v-if="page.mapPinId" class="wiki-npc-map-cta">
            <RouterLink class="wiki-npc-map-cta__a" :to="mapRouteForPin(page.mapPinId)">
              Show this context on the world map
            </RouterLink>
          </p>

          <nav class="wiki-npc-peers" aria-label="Other NPCs">
            <RouterLink
              v-for="n in npcPeers"
              :key="n.slug"
              class="wiki-npc-peer"
              :to="n.routePath"
            >
              {{ n.title }}
            </RouterLink>
            <RouterLink class="wiki-npc-peer wiki-npc-peer--all" to="/wiki/npcs">All NPCs</RouterLink>
          </nav>

          <nav class="wiki-npc-siblings" aria-label="Other wiki topics">
            <RouterLink v-for="c in wikiSiblings" :key="c.slug" class="wiki-npc-sib" :to="c.routePath">
              {{ c.title }}
            </RouterLink>
          </nav>
        </div>
      </div>
    </section>

    <section class="wiki-npc-body section" :aria-label="page.name + ' details'">
      <div class="container">
        <div class="wrap wrap--wide wiki-npc-stack">
          <!-- Bandits -->
          <template v-if="page.equipment?.length">
            <article class="wiki-npc-panel">
              <h2 class="wiki-npc-h2">Equipment &amp; loot</h2>
              <ul class="wiki-npc-ul">
                <li v-for="(line, i) in page.equipment" :key="i">{{ line }}</li>
              </ul>
            </article>
            <article v-if="page.behaviours?.length" class="wiki-npc-panel">
              <h2 class="wiki-npc-h2">Behaviours</h2>
              <dl class="wiki-npc-dl">
                <div
                  v-for="(b, i) in page.behaviours"
                  :key="'wiki-npc-beh-' + i"
                  class="wiki-npc-dl__pair"
                >
                  <dt>{{ b.title }}</dt>
                  <dd>{{ b.text }}</dd>
                </div>
              </dl>
            </article>
            <article v-if="page.notes?.length" class="wiki-npc-panel">
              <h2 class="wiki-npc-h2">Field notes</h2>
              <ul class="wiki-npc-ul">
                <li v-for="(line, i) in page.notes" :key="i">{{ line }}</li>
              </ul>
            </article>
            <article v-if="page.quirks?.length" class="wiki-npc-panel wiki-npc-panel--muted">
              <h2 class="wiki-npc-h2">Reported quirks</h2>
              <ul class="wiki-npc-ul">
                <li v-for="(line, i) in page.quirks" :key="i">{{ line }}</li>
              </ul>
            </article>
          </template>

          <!-- Traders -->
          <template v-else>
            <article v-if="page.tradeNotes?.length" class="wiki-npc-panel">
              <h2 class="wiki-npc-h2">Trade</h2>
              <ul class="wiki-npc-ul">
                <li v-for="(line, i) in page.tradeNotes" :key="i">{{ line }}</li>
              </ul>
            </article>
            <article v-if="page.restockNotes?.length" class="wiki-npc-panel">
              <h2 class="wiki-npc-h2">Restocking</h2>
              <ul class="wiki-npc-ul">
                <li v-for="(line, i) in page.restockNotes" :key="i">{{ line }}</li>
              </ul>
            </article>
            <template v-if="page.taskTiers?.length">
              <article
                v-for="tier in page.taskTiers"
                :key="tier.level"
                class="wiki-npc-panel"
              >
                <h2 class="wiki-npc-h2">Task items · level {{ tier.level }}</h2>
                <div class="wiki-npc-table-wrap">
                  <table class="wiki-npc-table">
                    <thead>
                      <tr>
                        <th scope="col">Task</th>
                        <th scope="col">Deliver</th>
                        <th scope="col">Receive</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(t, ti) in tier.tasks" :key="ti">
                        <th scope="row" class="wiki-npc-table__task">{{ t.name }}</th>
                        <td>{{ t.deliver }}</td>
                        <td>{{ t.receive }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </article>
            </template>
            <article v-if="page.locationSteps?.length" class="wiki-npc-panel">
              <h2 class="wiki-npc-h2">Location</h2>
              <ol class="wiki-npc-ol">
                <li v-for="(step, si) in page.locationSteps" :key="si">{{ step }}</li>
              </ol>
            </article>
          </template>

          <div class="wiki-npc-footnote" role="region" aria-labelledby="wiki-npc-foot-h">
            <div class="wiki-npc-footnote__accent" aria-hidden="true" />
            <h2 id="wiki-npc-foot-h" class="wiki-npc-footnote__title">On this manual</h2>
            <p class="wiki-npc-footnote__p">
              NPC pages are edited for readability and paired with
              <RouterLink class="wiki-npc-a" to="/wiki/weapons">weapons</RouterLink>,
              <RouterLink class="wiki-npc-a" to="/wiki/ammo">ammo</RouterLink>, and
              <RouterLink class="wiki-npc-a" to="/wiki/maps">maps</RouterLink>
              on the same site. Tasks and stock can change with builds—confirm payouts and timers in your client.
            </p>
            <p class="wiki-npc-back">
              <RouterLink class="wiki-npc-a" to="/wiki/npcs">← NPC index</RouterLink>
              ·
              <RouterLink class="wiki-npc-a" to="/wiki">Wiki hub</RouterLink>
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.wiki-npc-kicker {
  margin: 0 0 0.5rem;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.wiki-npc-crumb {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem;
  margin: 0 0 1rem;
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}

.wiki-npc-crumb__link {
  color: var(--color-frost);
  text-decoration: none;
  font-weight: 600;
}

.wiki-npc-crumb__link:hover {
  color: var(--color-text);
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.wiki-npc-hero {
  display: grid;
  gap: 1.25rem;
  align-items: start;
  margin-bottom: 1.1rem;
}

@media (min-width: 720px) {
  .wiki-npc-hero {
    grid-template-columns: minmax(0, 14rem) minmax(0, 1fr);
    gap: 1.5rem;
  }
}

.wiki-npc-hero__frame {
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--color-border) 70%, var(--color-frost) 12%);
  background: radial-gradient(ellipse at 50% 100%, #1a2228, #070a0c);
  box-shadow: 0 16px 36px color-mix(in srgb, #000 40%, transparent);
}

.wiki-npc-hero__img {
  display: block;
  width: 100%;
  height: auto;
  max-height: 220px;
  object-fit: contain;
  object-position: center bottom;
}

.wiki-npc-title {
  margin: 0 0 0.6rem;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-size: clamp(1.75rem, 4vw, 2.2rem);
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  line-height: 1.1;
  color: var(--color-text);
}

.wiki-npc-lead {
  margin: 0;
  max-width: 40rem;
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--color-text-muted);
}

.wiki-npc-map-cta {
  margin: 0 0 0.85rem;
}

.wiki-npc-map-cta__a {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-frost);
  text-underline-offset: 0.2em;
}

.wiki-npc-map-cta__a:hover,
.wiki-npc-map-cta__a:focus-visible {
  color: var(--color-text);
}

.wiki-npc-peers {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-bottom: 0.85rem;
}

.wiki-npc-peer {
  display: inline-flex;
  padding: 0.35rem 0.75rem;
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

.wiki-npc-peer:hover {
  border-color: color-mix(in srgb, var(--color-frost) 35%, var(--color-border));
  color: var(--color-frost);
}

.wiki-npc-peer--all {
  border-color: color-mix(in srgb, var(--color-accent) 35%, var(--color-border));
  color: var(--color-accent);
}

.wiki-npc-siblings {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.wiki-npc-sib {
  display: inline-flex;
  padding: 0.28rem 0.6rem;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--color-text-muted);
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--color-border) 88%, transparent);
  opacity: 0.92;
}

.wiki-npc-sib:hover {
  color: var(--color-frost);
  border-color: color-mix(in srgb, var(--color-frost) 25%, var(--color-border));
}

.wiki-npc-body {
  padding-bottom: 2.5rem;
}

.wiki-npc-stack {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.wiki-npc-panel {
  position: relative;
  padding: 1.1rem 1.2rem 1.15rem 1.35rem;
  border-radius: 14px;
  border: 1px solid color-mix(in srgb, var(--color-border) 72%, var(--color-frost) 10%);
  background: linear-gradient(
    165deg,
    color-mix(in srgb, var(--color-bg-panel) 95%, var(--color-frost) 2%) 0%,
    color-mix(in srgb, var(--color-bg-deep) 90%, #0e1418) 100%
  );
  box-shadow: 0 14px 32px color-mix(in srgb, #000 32%, transparent);
}

.wiki-npc-panel::before {
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

.wiki-npc-panel--muted {
  opacity: 0.96;
  border-style: dashed;
}

.wiki-npc-h2 {
  margin: 0 0 0.75rem;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--color-text);
}

.wiki-npc-ul,
.wiki-npc-ol {
  margin: 0;
  padding-left: 1.15rem;
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--color-text-muted);
}

.wiki-npc-ul li + li,
.wiki-npc-ol li + li {
  margin-top: 0.45rem;
}

.wiki-npc-dl {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.wiki-npc-dl__pair {
  display: grid;
  gap: 0.35rem;
}

.wiki-npc-dl dt {
  font-weight: 700;
  font-size: 0.8125rem;
  color: color-mix(in srgb, var(--color-text) 92%, var(--color-frost));
}

.wiki-npc-dl dd {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.55;
  color: var(--color-text-muted);
}

.wiki-npc-table-wrap {
  overflow-x: auto;
  border-radius: 10px;
  border: 1px solid color-mix(in srgb, var(--color-border) 60%, transparent);
  background: color-mix(in srgb, #141a1f 90%, transparent);
}

.wiki-npc-table {
  width: 100%;
  min-width: 480px;
  border-collapse: collapse;
  font-size: 0.8125rem;
}

.wiki-npc-table th {
  text-align: left;
  padding: 0.6rem 0.75rem;
  font-size: 0.58rem;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--color-text-muted) 90%, var(--color-frost));
  background: color-mix(in srgb, #1e262c 95%, transparent);
  border-bottom: 1px solid color-mix(in srgb, var(--color-border) 55%, transparent);
}

.wiki-npc-table td {
  padding: 0.55rem 0.75rem;
  vertical-align: top;
  color: var(--color-text-muted);
  border-bottom: 1px solid color-mix(in srgb, var(--color-border) 40%, transparent);
}

.wiki-npc-table tr:last-child td,
.wiki-npc-table tr:last-child th[scope='row'] {
  border-bottom: none;
}

.wiki-npc-table__task {
  font-weight: 700;
  color: color-mix(in srgb, var(--color-text) 88%, var(--color-text-muted));
  max-width: 8rem;
}

.wiki-npc-footnote {
  position: relative;
  margin-top: 0.5rem;
  padding: 1.2rem 1.2rem 1.2rem 1.4rem;
  max-width: 44rem;
  border-radius: 14px;
  border: 1px solid color-mix(in srgb, var(--color-border) 68%, transparent);
  background: color-mix(in srgb, var(--color-bg-panel) 85%, var(--color-bg-deep));
}

.wiki-npc-footnote__accent {
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

.wiki-npc-footnote__title {
  margin: 0 0 0.45rem;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text);
}

.wiki-npc-footnote__p {
  margin: 0 0 0.65rem;
  font-size: 0.8125rem;
  line-height: 1.55;
  color: var(--color-text-muted);
}

.wiki-npc-back {
  margin: 0;
  font-size: 0.8125rem;
}

.wiki-npc-a {
  color: var(--color-frost);
  font-weight: 600;
  text-decoration: none;
}

.wiki-npc-a:hover {
  text-decoration: underline;
  text-underline-offset: 0.2em;
}
</style>
