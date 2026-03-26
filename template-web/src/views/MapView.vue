<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

const mapSrc = `${import.meta.env.BASE_URL}images/road-to-vostok-map.jpg`

/**
 * Pin x/y are manual % overlays on the JPG—eyeballed, not GIS/measured in-engine.
 * Summaries: zone blurbs for Area 05 / Border / Vostok paraphrase public Steam + official site copy.
 * Named POIs match text on the promotional map image only; we do not assert loot, spawns, or quests.
 */
const markers = [
  {
    id: 'north',
    name: 'North',
    kind: 'zone',
    x: 14,
    y: 12,
    summary:
      'Regional label printed on the official world-map artwork. This pin’s screen position is a fan placement for navigation—not a measured in-game coordinate.',
  },
  {
    id: 'area-05',
    name: 'Area 05',
    kind: 'zone',
    x: 44,
    y: 44,
    summary:
      'Per the Steam store / official description: starting region in evacuated southeastern Finland with shelters, traders, tasks, and early loot. Penalties on death differ from Vostok—confirm exact rules in your build and patch notes.',
  },
  {
    id: 'village',
    name: 'Village',
    kind: 'poi',
    x: 22,
    y: 38,
    summary:
      'The word “Village” appears on the published map image. This site does not claim specific enemies, loot tables, or mission steps—verify everything in-game.',
  },
  {
    id: 'school',
    name: 'School',
    kind: 'poi',
    x: 26,
    y: 48,
    summary:
      'Label on the promotional artwork only. Treat any gameplay mention elsewhere as player-sourced until you reproduce it in your client.',
  },
  {
    id: 'highway',
    name: 'Highway',
    kind: 'poi',
    x: 38,
    y: 52,
    summary:
      'Marked on the official map graphic as a major route. No guarantee of AI patrol timing or encounter density—those change with updates.',
  },
  {
    id: 'sea',
    name: 'Sea',
    kind: 'zone',
    x: 48,
    y: 82,
    summary:
      'Water body shown on the artwork. Boating/fishing features depend on your Demo vs EA version—read patch notes instead of trusting this blurb.',
  },
  {
    id: 'island',
    name: 'Island',
    kind: 'poi',
    x: 55,
    y: 88,
    summary:
      'Named feature on the map image. Landing or loot there must be checked live; we are not an authoritative spawn database.',
  },
  {
    id: 'outpost',
    name: 'Outpost',
    kind: 'poi',
    x: 58,
    y: 46,
    summary:
      'Cartography label from the same promotional asset. Any tactical advice belongs in a separate, tested guide article.',
  },
  {
    id: 'border-zone',
    name: 'Border Zone',
    kind: 'zone',
    x: 68,
    y: 44,
    summary:
      'Official materials describe a guarded border strip with varied crossing challenges (e.g. obstacles, water). Exact layout and AI behavior are version-specific—use the client as truth.',
  },
  {
    id: 'minefield',
    name: 'Minefield',
    kind: 'poi',
    x: 74,
    y: 40,
    summary:
      'Shown on the world map as a named hazard. Mine logic and boundaries can shift; do not rely on this page for safe routing.',
  },
  {
    id: 'vostok',
    name: 'Vostok',
    kind: 'vostok',
    x: 88,
    y: 46,
    summary:
      'Official copy positions Vostok in Russia with higher stakes, including permadeath-style loss of progression items versus other zones. Re-read the Steam “About this game” section after every major patch.',
  },
]

const selectedId = ref(null)
const selected = computed(() => markers.find((m) => m.id === selectedId.value) ?? null)

function selectMarker(id) {
  selectedId.value = selectedId.value === id ? null : id
}

function onEscape(e) {
  if (e.key === 'Escape') selectedId.value = null
}

onMounted(() => window.addEventListener('keydown', onEscape))
onUnmounted(() => window.removeEventListener('keydown', onEscape))
</script>

<template>
  <div class="page-map">
    <section class="map-head-section section section--tight" aria-labelledby="map-heading">
      <div class="container">
        <div class="wrap wrap--wide">
          <p class="map-kicker">Atlas · Fan reference</p>
          <nav class="map-crumb" aria-label="Breadcrumb">
            <RouterLink to="/" class="map-crumb__link">Road to Vostok Field Manual</RouterLink>
            <span class="map-crumb__sep" aria-hidden="true">/</span>
            <span class="map-crumb__here">World map</span>
          </nav>
          <h1 id="map-heading" class="map-title">World map</h1>
          <p class="map-lead">
            This page is a <strong>fan-made UI</strong> on top of the developer’s published world-map image. <strong>Pin
            coordinates are not official data</strong>—they were placed by hand for readability and will drift if the art file
            changes. Only Steam, the official site, and your installed build are authoritative for mechanics. Deeper routing
            write-ups belong in the
            <RouterLink to="/guides#maps">maps &amp; crossings</RouterLink> pillar once you’ve walked the route in your build. For a
            full keyword index across every topic, hit the
            <RouterLink :to="{ path: '/guides', hash: '#wiki-index' }">quick finder</RouterLink>
            on the guides page. Build and PC context live on
            <RouterLink class="map-link" to="/start">Start</RouterLink>.
          </p>
          <div class="notice map-disclaimer" role="note">
            <span class="notice__label">Accuracy</span>
            <div class="notice__body">
              <ul class="map-disclaimer__list">
                <li>
                  <strong>True:</strong> the JPG matches the public Squarespace-hosted file we save locally so the page loads fast;
                  region names printed on that art (Area 05, Border Zone, Vostok, POI labels) are what you see on the image.
                </li>
                <li>
                  <strong>Not verified here:</strong> exact pin alignment, encounter design, loot, quest triggers, or patch
                  deltas—those require in-game testing or a primary source link in a dedicated article.
                </li>
              </ul>
            </div>
          </div>
          <p class="map-note">
            Map image © Road to Vostok Ltd.; reproduced here for commentary under fan-use norms. Always download or purchase the
            game from
            <a
              class="map-link"
              href="https://store.steampowered.com/app/1963610/Road_to_Vostok/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Steam
            </a>
            or follow
            <a class="map-link" href="https://www.roadtovostok.com/" target="_blank" rel="noopener noreferrer">
              roadtovostok.com
            </a>
            for canonical announcements.
          </p>
        </div>
      </div>
    </section>

    <section class="map-board-section section" aria-labelledby="map-board-label">
      <div class="container">
        <div class="wrap wrap--full">
          <h2 id="map-board-label" class="visually-hidden">Interactive map with location markers</h2>
          <div class="map-frame">
            <div class="map-frame__hud" aria-hidden="true">
              <span class="map-frame__tag">GRID</span>
              <span class="map-frame__tag">AREA REF</span>
            </div>
            <figure class="map-figure">
              <div class="map-stage" role="application" aria-label="Road to Vostok map; select pins for details">
                <img
                  class="map-image"
                  :src="mapSrc"
                  alt="Road to Vostok stylized satellite map showing Area 05, Border Zone, Vostok, and coastal terrain"
                  decoding="async"
                  fetchpriority="high"
                />
                <div class="map-pins">
                  <button
                    v-for="m in markers"
                    :key="m.id"
                    type="button"
                    class="map-pin"
                    :class="[`map-pin--${m.kind}`, { 'map-pin--active': selectedId === m.id }]"
                    :style="{ left: m.x + '%', top: m.y + '%' }"
                    :aria-pressed="selectedId === m.id"
                    :aria-label="m.name + '. ' + m.summary"
                    @click="selectMarker(m.id)"
                  >
                    <span class="map-pin__dot" aria-hidden="true" />
                    <span class="map-pin__label">{{ m.name }}</span>
                  </button>
                </div>
              </div>
              <figcaption class="map-caption">
                Pins open contextual notes; they are reference text, not a substitute for testing in your build. Keyboard: Tab
                through pins, Enter toggles, Esc closes the panel.
              </figcaption>
            </figure>
          </div>

          <aside v-if="selected" class="map-detail" :aria-live="selected ? 'polite' : 'off'">
            <h3 class="map-detail__title">{{ selected.name }}</h3>
            <p class="map-detail__text">{{ selected.summary }}</p>
            <button type="button" class="map-detail__close" @click="selectedId = null">Close panel</button>
          </aside>
        </div>
      </div>
    </section>

    <section class="map-list-section section section--tight" aria-labelledby="map-list-heading">
      <div class="container">
        <div class="wrap wrap--wide">
          <h2 id="map-list-heading" class="map-list-title">Location index</h2>
          <p class="map-list-dek">Same markers as a text list for screen readers and quick scanning.</p>
          <ul class="map-index">
            <li v-for="m in markers" :key="'idx-' + m.id">
              <button type="button" class="map-index__btn" :class="{ 'map-index__btn--on': selectedId === m.id }" @click="selectMarker(m.id)">
                <span class="map-index__name">{{ m.name }}</span>
                <span class="map-index__kind">{{ m.kind }}</span>
              </button>
            </li>
          </ul>
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

.map-kicker {
  margin: 0 0 0.5rem;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.map-crumb {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem;
  margin: 0 0 0.85rem;
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}

.map-crumb__link {
  color: var(--color-frost);
  text-decoration: none;
  font-weight: 600;
}

.map-crumb__link:hover {
  color: var(--color-text);
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.map-crumb__sep {
  opacity: 0.55;
  user-select: none;
}

.map-crumb__here {
  color: color-mix(in srgb, var(--color-text) 75%, var(--color-text-muted));
  font-weight: 600;
}

.map-title {
  margin: 0 0 0.65rem;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-weight: 700;
  font-size: clamp(1.85rem, 4vw, 2.35rem);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text);
}

.map-lead {
  margin: 0 0 0.75rem;
  max-width: 46rem;
  color: var(--color-text-muted);
  font-size: 0.9375rem;
  line-height: 1.65;
}

.map-lead strong {
  color: color-mix(in srgb, var(--color-text) 88%, var(--color-text-muted));
}

.map-link {
  color: var(--color-frost);
  text-underline-offset: 0.2em;
}

.map-link:hover {
  color: var(--color-text);
}

.map-disclaimer {
  margin: 1rem 0;
  max-width: 52rem;
}

.map-disclaimer__list {
  margin: 0;
  padding-left: 1.1rem;
  color: var(--color-text-muted);
  font-size: 0.8125rem;
  line-height: 1.55;
}

.map-disclaimer__list li + li {
  margin-top: 0.45rem;
}

.map-disclaimer__list strong {
  color: color-mix(in srgb, var(--color-text) 82%, var(--color-text-muted));
}

.map-note {
  margin: 0;
  max-width: 48rem;
  font-size: 0.8125rem;
  color: var(--color-text-muted);
  line-height: 1.55;
}

.map-frame {
  position: relative;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: linear-gradient(145deg, var(--color-bg-elevated), var(--color-bg-panel));
  padding: 0.65rem;
  box-shadow:
    0 0 0 1px color-mix(in srgb, var(--color-border-bright) 25%, transparent),
    0 28px 70px color-mix(in srgb, #000 50%, transparent);
}

.map-frame__hud {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.map-frame__tag {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.6rem;
  letter-spacing: 0.14em;
  color: var(--color-text-muted);
}

.map-figure {
  margin: 0;
}

.map-stage {
  position: relative;
  line-height: 0;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--color-border) 80%, #000);
}

.map-image {
  display: block;
  width: 100%;
  height: auto;
}

.map-pins {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.map-pin {
  position: absolute;
  transform: translate(-50%, -50%);
  pointer-events: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  font: inherit;
  color: inherit;
  text-align: center;
  max-width: 6.5rem;
}

.map-pin__dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid color-mix(in srgb, var(--color-text) 85%, transparent);
  background: color-mix(in srgb, var(--color-frost) 75%, #fff);
  box-shadow:
    0 0 0 2px color-mix(in srgb, var(--color-bg-deep) 70%, transparent),
    0 6px 16px color-mix(in srgb, #000 55%, transparent);
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
}

.map-pin--zone .map-pin__dot {
  width: 16px;
  height: 16px;
  background: color-mix(in srgb, var(--color-frost) 55%, var(--color-forest));
}

.map-pin--vostok .map-pin__dot {
  background: color-mix(in srgb, var(--color-accent) 85%, #300);
  border-color: color-mix(in srgb, var(--color-accent) 60%, #fff);
  box-shadow:
    0 0 0 2px color-mix(in srgb, var(--color-bg-deep) 70%, transparent),
    0 0 18px color-mix(in srgb, var(--color-accent) 45%, transparent);
}

.map-pin--active .map-pin__dot {
  transform: scale(1.15);
  box-shadow:
    0 0 0 3px color-mix(in srgb, var(--color-frost) 55%, transparent),
    0 8px 22px color-mix(in srgb, #000 55%, transparent);
}

.map-pin__label {
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text);
  text-shadow:
    0 1px 2px color-mix(in srgb, var(--color-bg-deep) 85%, transparent),
    0 0 8px color-mix(in srgb, var(--color-bg-deep) 70%, transparent);
  line-height: 1.1;
}

.map-pin:hover .map-pin__dot,
.map-pin:focus-visible .map-pin__dot {
  transform: scale(1.12);
}

.map-caption {
  margin: 0.65rem 0 0;
  font-size: 0.78rem;
  color: var(--color-text-muted);
  line-height: 1.45;
}

.map-detail {
  margin-top: 1.25rem;
  padding: 1.1rem 1.2rem;
  border: 1px solid color-mix(in srgb, var(--color-frost) 30%, var(--color-border));
  border-radius: 4px;
  background: color-mix(in srgb, var(--color-bg-panel) 88%, var(--color-frost) 12%);
}

.map-detail__title {
  margin: 0 0 0.5rem;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-size: 1.1rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text);
}

.map-detail__text {
  margin: 0 0 0.85rem;
  color: var(--color-text-muted);
  font-size: 0.9rem;
  line-height: 1.6;
}

.map-detail__close {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.4rem 0.75rem;
  border-radius: 2px;
  border: 1px solid var(--color-border);
  background: color-mix(in srgb, var(--color-bg-deep) 80%, transparent);
  color: var(--color-frost);
  cursor: pointer;
}

.map-detail__close:hover {
  border-color: var(--color-frost);
}

.map-list-title {
  margin: 0 0 0.5rem;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-size: 1.15rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text);
}

.map-list-dek {
  margin: 0 0 1rem;
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.map-index {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.45rem;
  grid-template-columns: 1fr;
}

@media (min-width: 520px) {
  .map-index {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 900px) {
  .map-index {
    grid-template-columns: repeat(3, 1fr);
  }
}

.map-index__btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.55rem 0.75rem;
  text-align: left;
  border: 1px solid var(--color-border);
  border-radius: 2px;
  background: color-mix(in srgb, var(--color-bg-panel) 85%, transparent);
  cursor: pointer;
  color: var(--color-text);
  transition:
    border-color 0.15s ease,
    background 0.15s ease;
}

.map-index__btn:hover,
.map-index__btn:focus-visible {
  border-color: var(--color-frost);
}

.map-index__btn--on {
  border-color: var(--color-accent);
  background: color-mix(in srgb, var(--color-bg-panel) 75%, var(--color-accent) 15%);
}

.map-index__name {
  font-weight: 600;
  font-size: 0.875rem;
}

.map-index__kind {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.6rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}
</style>
