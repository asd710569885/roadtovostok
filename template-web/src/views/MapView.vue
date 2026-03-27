<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import mapLocations from '../data/maps.js'

const mapSrc = `${import.meta.env.BASE_URL}images/road-to-vostok-map.jpg`

/** Official three-layer model: https://www.roadtovostok.com/game */
const typeOrder = ['area05', 'borderZone', 'vostok']

const typeMeta = {
  area05: { label: 'Area 05' },
  borderZone: { label: 'Border Zone' },
  vostok: { label: 'Vostok' },
}

const MIN_SCALE = 1
const MAX_SCALE = 3.5
const FOCUS_SCALE = 1.85

const boardRef = ref(null)
const stageRef = ref(null)
const innerRef = ref(null)
const imgRef = ref(null)

const mapScale = ref(1)
const mapTx = ref(0)
const mapTy = ref(0)
const isPanning = ref(false)

const selectedId = ref(null)
const easeTransform = ref(false)
const markers = computed(() => mapLocations.filter((m) => m.pin))
const selected = computed(() => mapLocations.find((m) => m.id === selectedId.value) ?? null)
const zoomPercent = computed(() => Math.round(mapScale.value * 100))

let panStart = { x: 0, y: 0, tx: 0, ty: 0 }
let easeTimer = null

/** Smooth camera for index / zoom buttons / reset — pan & wheel stay instant */
function withEase(apply) {
  clearTimeout(easeTimer)
  easeTransform.value = false
  requestAnimationFrame(() => {
    easeTransform.value = true
    requestAnimationFrame(() => {
      apply()
      easeTimer = setTimeout(() => {
        easeTransform.value = false
      }, 520)
    })
  })
}

function killEase() {
  clearTimeout(easeTimer)
  easeTransform.value = false
}

function clampPan() {
  const st = stageRef.value
  const im = imgRef.value
  if (!st || !im) return
  const W = st.clientWidth
  const H = st.clientHeight
  const iw = im.offsetWidth
  const ih = im.offsetHeight
  if (!iw || !ih) return
  const s = mapScale.value
  const cw = iw * s
  const ch = ih * s
  mapTx.value = cw > W ? Math.min(0, Math.max(W - cw, mapTx.value)) : (W - cw) / 2
  mapTy.value = ch > H ? Math.min(0, Math.max(H - ch, mapTy.value)) : (H - ch) / 2
}

function resetMapView() {
  withEase(() => {
    mapScale.value = 1
    mapTx.value = 0
    mapTy.value = 0
    clampPan()
  })
}

function onImgLoad() {
  nextTick(() => clampPan())
}

function onWheelStage(e) {
  killEase()
  if (!stageRef.value) return
  const rect = stageRef.value.getBoundingClientRect()
  const mx = e.clientX - rect.left
  const my = e.clientY - rect.top
  const delta = e.deltaY > 0 ? -0.12 : 0.12
  const oldS = mapScale.value
  let newS = Math.min(MAX_SCALE, Math.max(MIN_SCALE, oldS + delta))
  if (newS === oldS) return
  mapTx.value = mx - ((mx - mapTx.value) * newS) / oldS
  mapTy.value = my - ((my - mapTy.value) * newS) / oldS
  mapScale.value = newS
  clampPan()
}

function onPointerMoveWindow(e) {
  if (!isPanning.value) return
  mapTx.value = panStart.tx + (e.clientX - panStart.x)
  mapTy.value = panStart.ty + (e.clientY - panStart.y)
}

function endPan() {
  if (!isPanning.value) return
  isPanning.value = false
  window.removeEventListener('pointermove', onPointerMoveWindow)
  clampPan()
}

function onPointerDownStage(e) {
  killEase()
  if (e.button === 2) return
  const t = e.target
  if (t instanceof Element && t.closest('.map-pin')) return
  isPanning.value = true
  panStart = { x: e.clientX, y: e.clientY, tx: mapTx.value, ty: mapTy.value }
  window.addEventListener('pointermove', onPointerMoveWindow)
  window.addEventListener('pointerup', endPan, { once: true })
  window.addEventListener('pointercancel', endPan, { once: true })
  try {
    const el = stageRef.value
    if (el && 'setPointerCapture' in el) el.setPointerCapture(e.pointerId)
  } catch {
    /* ignore */
  }
}

function focusOnPin(m) {
  if (!m?.pin || !stageRef.value || !imgRef.value) return
  const W = stageRef.value.clientWidth
  const H = stageRef.value.clientHeight
  const iw = imgRef.value.offsetWidth
  const ih = imgRef.value.offsetHeight
  if (!W || !H || !iw || !ih) return
  const px = (m.pin.x / 100) * iw
  const py = (m.pin.y / 100) * ih
  const targetScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, FOCUS_SCALE))
  withEase(() => {
    mapScale.value = targetScale
    mapTx.value = W / 2 - px * targetScale
    mapTy.value = H / 2 - py * targetScale
    clampPan()
  })
}

function zoomStep(dir) {
  if (!stageRef.value) return
  const W = stageRef.value.clientWidth
  const H = stageRef.value.clientHeight
  if (!W || !H) return
  const cx = W / 2
  const cy = H / 2
  const oldS = mapScale.value
  const newS = Math.min(MAX_SCALE, Math.max(MIN_SCALE, oldS + dir * 0.22))
  if (newS === oldS) return
  withEase(() => {
    mapTx.value = cx - ((cx - mapTx.value) * newS) / oldS
    mapTy.value = cy - ((cy - mapTy.value) * newS) / oldS
    mapScale.value = newS
    clampPan()
  })
}

function selectMarker(id) {
  if (selectedId.value === id) {
    selectedId.value = null
    return
  }
  selectedId.value = id
  const hit = mapLocations.find((x) => x.id === id && x.pin)
  nextTick(() => {
    if (hit) {
      focusOnPin(hit)
      boardRef.value?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  })
}

function pinAriaLabel(m) {
  return `${m.name}. ${typeMeta[m.type]?.label ?? m.type}. Fan pin on promo artwork—not an in-game coordinate.`
}

function mapsForType(t) {
  return mapLocations.filter((m) => m.pin && m.type === t)
}

function onResize() {
  clampPan()
}

function onEscape(e) {
  if (e.key === 'Escape') selectedId.value = null
}

onMounted(() => {
  window.addEventListener('keydown', onEscape)
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  clearTimeout(easeTimer)
  window.removeEventListener('keydown', onEscape)
  window.removeEventListener('resize', onResize)
  window.removeEventListener('pointermove', onPointerMoveWindow)
  window.removeEventListener('pointerup', endPan)
  window.removeEventListener('pointercancel', endPan)
})

const innerTransform = computed(
  () => `translate(${mapTx.value}px, ${mapTy.value}px) scale(${mapScale.value})`,
)
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
            <RouterLink :to="{ path: '/wiki', query: { section: 'pillar-maps' } }">maps &amp; crossings</RouterLink> pillar once you’ve walked the route in your build. For a
            full keyword index across every topic, hit the
            <RouterLink :to="{ path: '/wiki', query: { section: 'quick-finder' } }">quick finder</RouterLink>
            on the wiki page. Build and PC context live on
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

          <div
            ref="boardRef"
            class="map-board"
            :class="{ 'map-board--has-focus': selectedId !== null }"
          >
            <div class="map-frame">
              <figure class="map-figure">
                <div class="map-viewport">
                  <div class="map-float" aria-label="Map controls">
                    <div class="map-float__meta">
                      <span class="map-float__chip">Atlas</span>
                      <span class="map-float__chip map-float__chip--soft">Wheel · drag · pins</span>
                    </div>
                    <div class="map-float__tools">
                      <span class="map-float__zoom-readout" aria-live="polite">{{ zoomPercent }}%</span>
                      <button type="button" class="map-float__icon" aria-label="Zoom out" @click.stop="zoomStep(-1)">
                        −
                      </button>
                      <button type="button" class="map-float__icon" aria-label="Zoom in" @click.stop="zoomStep(1)">
                        +
                      </button>
                      <button type="button" class="map-float__fit" @click.stop="resetMapView">Fit map</button>
                    </div>
                  </div>
                  <div
                    ref="stageRef"
                    class="map-stage map-stage--pannable"
                    :class="{ 'map-stage--grabbing': isPanning }"
                    role="application"
                    aria-label="Road to Vostok map; scroll to zoom, drag to pan, select pins for details"
                    @wheel.prevent="onWheelStage"
                    @pointerdown="onPointerDownStage"
                  >
                    <div
                      ref="innerRef"
                      class="map-stage__inner"
                      :class="{ 'map-stage__inner--eased': easeTransform }"
                      :style="{ transform: innerTransform }"
                    >
                    <img
                      ref="imgRef"
                      class="map-image"
                      :src="mapSrc"
                      alt="Road to Vostok stylized satellite map showing Area 05, Border Zone, Vostok, and coastal terrain"
                      decoding="async"
                      fetchpriority="high"
                      draggable="false"
                      @load="onImgLoad"
                    />
                    <div class="map-pins">
                      <button
                        v-for="m in markers"
                        :key="m.id"
                        type="button"
                        class="map-pin"
                        :class="[`map-pin--${m.type}`, { 'map-pin--active': selectedId === m.id }]"
                        :style="{ left: m.pin.x + '%', top: m.pin.y + '%' }"
                        :aria-pressed="selectedId === m.id"
                        :aria-label="pinAriaLabel(m)"
                        @click.stop="selectMarker(m.id)"
                      >
                        <span class="map-pin__dot" aria-hidden="true" />
                        <span class="map-pin__label">{{ m.name }}</span>
                      </button>
                    </div>
                    </div>
                  </div>
                </div>
                <figcaption class="map-caption">
                  Explore freely—wheel zooms toward the cursor. The index below recenters the map on each place. Esc clears the
                  card.
                </figcaption>
              </figure>
            </div>

            <Transition name="map-detail-fade" mode="out-in">
              <aside
                :key="selected ? selected.id : 'empty'"
                class="map-detail"
                aria-live="polite"
              >
                <template v-if="selected">
                  <span class="map-detail__pill" :class="`map-detail__pill--${selected.type}`">{{
                    typeMeta[selected.type]?.label ?? selected.type
                  }}</span>
                  <h3 class="map-detail__title">{{ selected.name }}</h3>
                  <p class="map-detail__text">{{ selected.content }}</p>
                  <button type="button" class="map-detail__close" @click="selectedId = null">Close</button>
                </template>
                <template v-else>
                  <div class="map-detail__pill map-detail__pill--muted">Choose a place</div>
                  <h3 class="map-detail__title">No pin selected</h3>
                  <p class="map-detail__text">
                    Tap a marker on the map or pick a row in the index. Pins are fan estimates on the promo art—not in-game
                    coordinates.
                  </p>
                </template>
              </aside>
            </Transition>
          </div>
        </div>
      </div>
    </section>

    <section class="map-list-section section section--tight" aria-labelledby="map-list-heading">
      <div class="container">
        <div class="wrap wrap--wide">
          <h2 id="map-list-heading" class="map-list-title">Location index</h2>
          <p class="map-list-dek">Grouped by the same three layers as <a href="https://www.roadtovostok.com/game" class="map-list-dek__a" target="_blank" rel="noopener noreferrer">roadtovostok.com/game</a>—pin positions remain fan estimates on the JPG.</p>
          <div v-for="layerKey in typeOrder" :key="layerKey" class="map-index-group">
            <h3 class="map-index-group__title">
              <span class="map-legend-dot map-legend-dot--sm" :class="`map-legend-dot--${layerKey}`" aria-hidden="true" />
              {{ typeMeta[layerKey].label }}
            </h3>
            <ul class="map-index">
              <li v-for="m in mapsForType(layerKey)" :key="'idx-' + m.id">
                <button
                  type="button"
                  class="map-index__btn"
                  :class="{ 'map-index__btn--on': selectedId === m.id }"
                  @click="selectMarker(m.id)"
                >
                  <span class="map-index__name">{{ m.name }}</span>
                  <span class="map-index__type">{{ typeMeta[m.type].label }}</span>
                </button>
              </li>
            </ul>
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

.map-board {
  display: flex;
  flex-direction: column;
  gap: 1.35rem;
}

.map-frame {
  position: relative;
  border: 1px solid color-mix(in srgb, var(--color-border) 70%, var(--color-frost) 12%);
  border-radius: 14px;
  background:
    linear-gradient(155deg, color-mix(in srgb, var(--color-bg-elevated) 92%, transparent), var(--color-bg-panel)),
    radial-gradient(120% 80% at 10% 0%, color-mix(in srgb, var(--color-frost) 8%, transparent), transparent);
  padding: 0.55rem;
  box-shadow:
    0 0 0 1px color-mix(in srgb, var(--color-border-bright) 18%, transparent),
    0 20px 50px color-mix(in srgb, #000 42%, transparent),
    0 2px 24px color-mix(in srgb, var(--color-frost) 6%, transparent);
}

.map-figure {
  margin: 0;
}

.map-viewport {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
}

.map-float {
  position: absolute;
  z-index: 3;
  top: 0.65rem;
  right: 0.65rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.45rem;
  pointer-events: none;
}

.map-float > * {
  pointer-events: auto;
}

.map-float__meta {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.35rem;
}

.map-float__chip {
  display: inline-flex;
  align-items: center;
  padding: 0.2rem 0.55rem;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.55rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--color-text) 80%, var(--color-frost));
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--color-border) 65%, var(--color-frost) 18%);
  background: color-mix(in srgb, var(--color-bg-deep) 55%, transparent);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px color-mix(in srgb, #000 35%, transparent);
}

.map-float__chip--soft {
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: none;
  font-size: 0.62rem;
  color: var(--color-text-muted);
  border-color: color-mix(in srgb, var(--color-border) 80%, transparent);
}

.map-float__tools {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 0.35rem;
  padding: 0.35rem 0.4rem 0.35rem 0.55rem;
  border-radius: 12px;
  border: 1px solid color-mix(in srgb, var(--color-border) 55%, var(--color-frost) 15%);
  background: color-mix(in srgb, var(--color-bg-deep) 62%, transparent);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow:
    0 8px 32px color-mix(in srgb, #000 45%, transparent),
    inset 0 1px 0 color-mix(in srgb, #fff 6%, transparent);
}

.map-float__zoom-readout {
  min-width: 2.75rem;
  text-align: center;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--color-frost);
  opacity: 0.92;
}

.map-float__icon {
  width: 2rem;
  height: 2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid color-mix(in srgb, var(--color-border) 70%, transparent);
  background: color-mix(in srgb, var(--color-bg-panel) 70%, transparent);
  color: var(--color-text);
  font-size: 1.1rem;
  line-height: 1;
  cursor: pointer;
  transition:
    transform 0.2s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.2s ease,
    background 0.2s ease,
    color 0.2s ease;
}

.map-float__icon:hover,
.map-float__icon:focus-visible {
  border-color: var(--color-frost);
  color: var(--color-frost);
  transform: scale(1.06);
}

.map-float__fit {
  margin-left: 0.15rem;
  padding: 0.4rem 0.65rem;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.55rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border-radius: 8px;
  border: 1px solid color-mix(in srgb, var(--color-accent) 35%, var(--color-border));
  background: color-mix(in srgb, var(--color-bg-panel) 60%, var(--color-accent) 12%);
  color: color-mix(in srgb, var(--color-text) 70%, var(--color-accent));
  cursor: pointer;
  transition:
    transform 0.2s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.map-float__fit:hover,
.map-float__fit:focus-visible {
  border-color: color-mix(in srgb, var(--color-accent) 55%, var(--color-frost));
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--color-frost) 25%, transparent);
  transform: translateY(-1px);
}

.map-stage {
  position: relative;
  line-height: 0;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--color-border) 65%, #000 25%);
  touch-action: none;
  user-select: none;
  box-shadow: inset 0 0 0 1px color-mix(in srgb, #fff 4%, transparent);
}

.map-stage--pannable {
  cursor: grab;
}

.map-stage--grabbing {
  cursor: grabbing;
}

.map-stage__inner {
  position: relative;
  width: 100%;
  transform-origin: 0 0;
  will-change: transform;
  transition: none;
}

.map-stage__inner::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  z-index: 2;
  box-shadow: inset 0 0 100px color-mix(in srgb, #000 28%, transparent);
  opacity: 0.5;
  transition: opacity 0.35s ease;
}

.map-board--has-focus .map-stage__inner::after {
  opacity: 0.32;
}

.map-stage__inner--eased {
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.32, 1);
}

@media (prefers-reduced-motion: reduce) {
  .map-stage__inner--eased {
    transition: none;
  }

  .map-float__icon:hover,
  .map-float__icon:focus-visible,
  .map-float__fit:hover,
  .map-float__fit:focus-visible {
    transform: none;
  }

  .map-board--has-focus .map-stage__inner::after {
    opacity: 0.5;
  }
}

.map-image {
  display: block;
  width: 100%;
  height: auto;
}

.map-pins {
  position: absolute;
  z-index: 3;
  inset: 0;
  pointer-events: none;
}

.map-pin {
  position: absolute;
  z-index: 1;
  transform: translate(-50%, -50%);
  pointer-events: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  font: inherit;
  color: inherit;
  text-align: center;
  max-width: 6.5rem;
  transition:
    opacity 0.35s ease,
    filter 0.35s ease,
    transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}

.map-board--has-focus .map-pin:not(.map-pin--active) {
  opacity: 0.48;
  filter: saturate(0.65);
}

.map-pin:hover,
.map-pin:focus-visible {
  opacity: 1 !important;
  filter: none !important;
  transform: translate(-50%, -50%) scale(1.03);
  z-index: 4;
}

@keyframes map-pin-glow {
  0%,
  100% {
    box-shadow:
      0 0 0 2px color-mix(in srgb, var(--color-bg-deep) 70%, transparent),
      0 6px 18px color-mix(in srgb, #000 50%, transparent),
      0 0 0 0 color-mix(in srgb, var(--color-frost) 0%, transparent);
  }

  50% {
    box-shadow:
      0 0 0 2px color-mix(in srgb, var(--color-bg-deep) 70%, transparent),
      0 8px 22px color-mix(in srgb, #000 55%, transparent),
      0 0 20px 4px color-mix(in srgb, var(--color-frost) 35%, transparent);
  }
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
    transform 0.22s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.22s ease;
}

.map-pin--area05 .map-pin__dot {
  width: 16px;
  height: 16px;
  background: color-mix(in srgb, var(--color-frost) 58%, var(--color-forest));
  border-color: color-mix(in srgb, var(--color-frost) 40%, #fff);
}

.map-pin--borderZone .map-pin__dot {
  width: 15px;
  height: 15px;
  background: linear-gradient(145deg, #e8c547, #b8860b);
  border-color: color-mix(in srgb, #f5e6a6 55%, #3d3200);
  box-shadow:
    0 0 0 2px color-mix(in srgb, var(--color-bg-deep) 70%, transparent),
    0 4px 14px color-mix(in srgb, #000 45%, transparent);
}

.map-pin--vostok .map-pin__dot {
  background: color-mix(in srgb, var(--color-accent) 85%, #300);
  border-color: color-mix(in srgb, var(--color-accent) 60%, #fff);
  box-shadow:
    0 0 0 2px color-mix(in srgb, var(--color-bg-deep) 70%, transparent),
    0 0 18px color-mix(in srgb, var(--color-accent) 45%, transparent);
}

.map-pin--active .map-pin__dot {
  transform: scale(1.18);
  box-shadow:
    0 0 0 3px color-mix(in srgb, var(--color-frost) 55%, transparent),
    0 8px 22px color-mix(in srgb, #000 55%, transparent);
  animation: map-pin-glow 2.4s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .map-pin--active .map-pin__dot {
    animation: none;
  }

  .map-board--has-focus .map-pin:not(.map-pin--active) {
    opacity: 0.72;
    filter: none;
  }

  .map-pin:hover,
  .map-pin:focus-visible {
    transform: translate(-50%, -50%);
  }
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
  transform: scale(1.14);
}

.map-caption {
  margin: 0.75rem 0 0;
  padding: 0 0.15rem;
  font-size: 0.78rem;
  color: var(--color-text-muted);
  line-height: 1.5;
}

.map-detail-fade-enter-active,
.map-detail-fade-leave-active {
  transition:
    opacity 0.38s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.42s cubic-bezier(0.22, 1, 0.36, 1),
    filter 0.38s ease;
}

.map-detail-fade-enter-from,
.map-detail-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
  filter: blur(4px);
}

@media (prefers-reduced-motion: reduce) {
  .map-detail-fade-enter-active,
  .map-detail-fade-leave-active {
    transition: opacity 0.15s ease;
  }

  .map-detail-fade-enter-from,
  .map-detail-fade-leave-to {
    transform: none;
    filter: none;
  }

  .map-detail__close:hover,
  .map-detail__close:focus-visible {
    transform: none;
  }
}

.map-detail {
  padding: 1.15rem 1.25rem 1.2rem;
  border: 1px solid color-mix(in srgb, var(--color-frost) 22%, var(--color-border));
  border-radius: 12px;
  background:
    linear-gradient(165deg, color-mix(in srgb, var(--color-bg-panel) 94%, transparent), var(--color-bg-deep)),
    radial-gradient(80% 60% at 100% 0%, color-mix(in srgb, var(--color-accent) 10%, transparent), transparent);
  box-shadow:
    inset 0 1px 0 color-mix(in srgb, #fff 5%, transparent),
    0 16px 40px color-mix(in srgb, #000 38%, transparent);
}

.map-detail__pill {
  display: inline-block;
  margin-bottom: 0.65rem;
  padding: 0.25rem 0.65rem;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.58rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border-radius: 999px;
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
}

.map-detail__pill--muted {
  opacity: 0.9;
}

.map-detail__pill--area05 {
  border-color: color-mix(in srgb, var(--color-frost) 40%, var(--color-border));
  color: var(--color-frost);
}

.map-detail__pill--borderZone {
  border-color: color-mix(in srgb, #c9a227 55%, var(--color-border));
  color: #e8d089;
}

.map-detail__pill--vostok {
  border-color: color-mix(in srgb, var(--color-accent) 55%, var(--color-border));
  color: color-mix(in srgb, var(--color-accent) 90%, #fff);
}

.map-detail__title {
  margin: 0 0 0.75rem;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-size: 1.15rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  line-height: 1.2;
  color: var(--color-text);
}

.map-detail__text {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.875rem;
  line-height: 1.65;
  white-space: pre-line;
}

.map-detail__close {
  margin-top: 1.05rem;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.45rem 0.85rem;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  background: color-mix(in srgb, var(--color-bg-deep) 80%, transparent);
  color: var(--color-frost);
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    transform 0.2s cubic-bezier(0.22, 1, 0.36, 1);
}

.map-detail__close:hover,
.map-detail__close:focus-visible {
  border-color: var(--color-frost);
  transform: translateY(-1px);
}

.map-legend-dot {
  display: inline-block;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  flex-shrink: 0;
  border: 2px solid color-mix(in srgb, var(--color-text) 35%, transparent);
}

.map-legend-dot--sm {
  width: 9px;
  height: 9px;
}

.map-legend-dot--area05 {
  background: color-mix(in srgb, var(--color-frost) 65%, var(--color-forest));
}

.map-legend-dot--borderZone {
  background: linear-gradient(145deg, #e8c547, #a67c00);
}

.map-legend-dot--vostok {
  background: color-mix(in srgb, var(--color-accent) 88%, #200);
  border-color: color-mix(in srgb, var(--color-accent) 50%, #fff);
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
  line-height: 1.55;
  max-width: 48rem;
}

.map-list-dek__a {
  color: var(--color-frost);
  font-weight: 600;
  text-underline-offset: 0.2em;
}

.map-list-dek__a:hover {
  color: var(--color-text);
}

.map-index-group {
  margin-bottom: 1.75rem;
}

.map-index-group:last-child {
  margin-bottom: 0;
}

.map-index-group__title {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  margin: 0 0 0.65rem;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.map-index {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.45rem;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) and (max-width: 1023px) {
  .map-index {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
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
  padding: 0.6rem 0.85rem;
  text-align: left;
  border: 1px solid color-mix(in srgb, var(--color-border) 85%, transparent);
  border-radius: 10px;
  background: color-mix(in srgb, var(--color-bg-panel) 88%, transparent);
  cursor: pointer;
  color: var(--color-text);
  transition:
    border-color 0.22s ease,
    background 0.22s ease,
    transform 0.22s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.22s ease;
}

.map-index__btn:hover,
.map-index__btn:focus-visible {
  border-color: color-mix(in srgb, var(--color-frost) 40%, var(--color-border));
  background: color-mix(in srgb, var(--color-bg-panel) 82%, var(--color-frost) 6%);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px color-mix(in srgb, #000 28%, transparent);
}

.map-index__btn--on {
  border-color: color-mix(in srgb, var(--color-accent) 45%, var(--color-frost));
  background: color-mix(in srgb, var(--color-bg-panel) 72%, var(--color-accent) 18%);
  box-shadow:
    0 0 0 1px color-mix(in srgb, var(--color-accent) 22%, transparent),
    0 10px 28px color-mix(in srgb, #000 32%, transparent);
}

.map-index__name {
  font-weight: 600;
  font-size: 0.875rem;
}

.map-index__type {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.58rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  flex-shrink: 0;
}

@media (max-width: 1023px) {
  .map-frame {
    padding: 0.45rem;
    border-radius: 12px;
    box-shadow:
      0 0 0 1px color-mix(in srgb, var(--color-border-bright) 20%, transparent),
      0 18px 48px color-mix(in srgb, #000 44%, transparent);
  }

  .map-float {
    top: 0.45rem;
    right: 0.45rem;
  }

  .map-float__tools {
    padding: 0.3rem 0.35rem;
    border-radius: 10px;
  }

  .map-detail {
    padding: 1rem 1.05rem;
  }

  .map-pin__dot {
    width: 16px;
    height: 16px;
  }

  .map-pin--area05 .map-pin__dot {
    width: 18px;
    height: 18px;
  }
}

@media (max-width: 767px) {
  .map-title {
    font-size: clamp(1.45rem, 6vw, 2rem);
  }

  .map-lead {
    font-size: 0.9rem;
  }

  .map-pin__label {
    font-size: 0.58rem;
    max-width: 5.5rem;
  }

  .map-index__btn {
    padding: 0.5rem 0.65rem;
  }
}
</style>
