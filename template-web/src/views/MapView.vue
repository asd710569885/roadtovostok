<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import mapLocations, { mapRouteForPin, MAP_PAGE, MAP_PIN_QUERY } from '../data/maps.js'

const route = useRoute()
const router = useRouter()

function normalizePinQuery(raw) {
  if (raw == null || raw === '') return ''
  const s = Array.isArray(raw) ? raw[0] : String(raw)
  return /^[a-z][a-z0-9-]*$/i.test(s) ? s.toLowerCase() : ''
}

const INTEL_KEYS = ['npcs', 'supplies', 'tasks']
const intelBlockMeta = {
  npcs: { title: 'Factions & people' },
  supplies: { title: 'Loot & trading' },
  tasks: { title: 'Tasks & shelters' },
}

function intelBlocksFor(m) {
  if (!m?.intel || typeof m.intel !== 'object') return []
  const out = []
  for (const key of INTEL_KEYS) {
    const lines = m.intel[key]
    if (!Array.isArray(lines) || lines.length === 0) continue
    const meta = intelBlockMeta[key]
    if (!meta) continue
    out.push({ key, title: meta.title, lines })
  }
  return out
}

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
const selectedIntel = computed(() => intelBlocksFor(selected.value))
const selectedWikiLinks = computed(() => selected.value?.wikiLinks ?? [])
const selectedNpcLinks = computed(() => selected.value?.npcLinks ?? [])
const zoomPercent = computed(() => Math.round(mapScale.value * 100))

let panStart = { x: 0, y: 0, tx: 0, ty: 0 }
let easeTimer = null
/** Coalesces focus from route watch + image load so we do not run two eased zooms (refresh “shake”). */
let routeFocusRaf = 0

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

function applyRoutePinFocus() {
  const id = normalizePinQuery(route.query[MAP_PIN_QUERY])
  if (!id || selectedId.value !== id) return
  const m = mapLocations.find((x) => x.id === id && x.pin)
  if (m) focusOnPin(m)
}

function scheduleApplyRouteFocus() {
  if (routeFocusRaf) cancelAnimationFrame(routeFocusRaf)
  routeFocusRaf = requestAnimationFrame(() => {
    routeFocusRaf = 0
    applyRoutePinFocus()
  })
}

function onImgLoad() {
  nextTick(() => {
    clampPan()
    scheduleApplyRouteFocus()
  })
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

function clearSelection() {
  selectedId.value = null
  if (normalizePinQuery(route.query[MAP_PIN_QUERY])) {
    router.replace({ path: MAP_PAGE, query: {} })
  }
}

function selectPin(id) {
  if (selectedId.value === id) {
    clearSelection()
    return
  }
  selectedId.value = id
  router.replace(mapRouteForPin(id))
  // Focus is applied once via the route query watcher (+ coalesced rAF); avoid double withEase here.
}

watch(
  () => route.query[MAP_PIN_QUERY],
  (raw) => {
    const id = normalizePinQuery(raw)
    if (!id) {
      selectedId.value = null
      return
    }
    const m = mapLocations.find((x) => x.id === id && x.pin)
    if (!m) {
      selectedId.value = null
      router.replace({ path: MAP_PAGE, query: {} })
      return
    }
    if (selectedId.value !== id) {
      selectedId.value = id
    }
    scheduleApplyRouteFocus()
  },
  { immediate: true },
)

function pinAriaLabel(m) {
  return `${m.name}. ${typeMeta[m.type]?.label ?? m.type}. Fan pin on promo artwork—not an in-game coordinate.`
}

function mapsForType(t) {
  return mapLocations.filter((m) => m.pin && m.type === t)
}

function onResize() {
  killEase()
  clampPan()
}

function onEscape(e) {
  if (e.key === 'Escape') clearSelection()
}

onMounted(() => {
  window.addEventListener('keydown', onEscape)
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  if (routeFocusRaf) cancelAnimationFrame(routeFocusRaf)
  routeFocusRaf = 0
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
    <section class="map-hero section section--tight" aria-labelledby="map-heading">
      <div class="map-hero__glow" aria-hidden="true" />
      <div class="container">
        <div class="wrap wrap--wide">
          <p class="map-kicker">World atlas · Road to Vostok</p>
          <nav class="map-crumb" aria-label="Breadcrumb">
            <RouterLink to="/" class="map-crumb__link">Road to Vostok Field Manual</RouterLink>
            <span class="map-crumb__sep" aria-hidden="true">/</span>
            <span class="map-crumb__here">World map</span>
          </nav>
          <h1 id="map-heading" class="map-title">Road to Vostok World Map</h1>
          <p class="map-pitch">
            We built this atlas to be one of the <strong>most complete and detailed unofficial Road to Vostok maps on the web</strong>:
            zoomable official-style artwork, hand-placed pins across Area 05, the Border Zone, and Vostok, on-page summaries synced
            with our Field Manual wiki, one-tap trader &amp; NPC dossiers, structured loot and task notes, and shareable
            <code class="map-lead__code">?pin=…</code> links—geography, guides, and characters in a single view so you are not
            juggling ten tabs.
          </p>
          <p class="map-lead">
            Pins are for orientation only—not in-game GPS. Pick a pin for the short brief, then open
            <RouterLink class="map-link" to="/wiki/maps">map walkthroughs</RouterLink>,
            <RouterLink class="map-link" to="/wiki/npcs">NPC pages</RouterLink>, or other wiki topics. Articles on this site link
            back here with the same pin deep links.
          </p>
          <p class="map-disclaimer-inline" role="note">
            Labels on the JPG match the public art; pin positions are hand-placed. Always trust your installed build over this
            overlay.
          </p>
          <p class="map-note">
            Map image © Road to Vostok Ltd. ·
            <a class="map-link" href="https://store.steampowered.com/app/1963610/Road_to_Vostok/" target="_blank" rel="noopener noreferrer">Steam</a>
            ·
            <a class="map-link" href="https://www.roadtovostok.com/game" target="_blank" rel="noopener noreferrer">roadtovostok.com/game</a>
          </p>
        </div>
      </div>
    </section>

    <section class="map-atlas-section section" aria-label="Interactive map and selected location">
      <div class="container">
        <div class="wrap wrap--full">
          <div class="map-board" :class="{ 'map-board--has-focus': selectedId !== null }">
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
                    aria-label="Road to Vostok map; scroll to zoom, drag to pan, choose a pin"
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
                          :aria-expanded="selectedId === m.id"
                          :aria-label="pinAriaLabel(m)"
                          @click.stop="selectPin(m.id)"
                        >
                          <span class="map-pin__dot" aria-hidden="true" />
                          <span class="map-pin__label">{{ m.name }}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <aside class="map-viewport__panel" aria-live="polite">
                    <template v-if="selected">
                      <div class="map-detail">
                        <span class="map-detail__band" :class="`map-detail__band--${selected.type}`">{{
                          typeMeta[selected.type]?.label ?? selected.type
                        }}</span>
                        <h2 class="map-detail__title">{{ selected.name }}</h2>
                        <p class="map-detail__text">{{ selected.content }}</p>

                        <RouterLink
                          v-if="selected.wikiRoute"
                          class="map-detail__guide"
                          :to="selected.wikiRoute"
                        >
                          <span class="map-detail__guide-kicker">This location on the wiki</span>
                          <span class="map-detail__guide-title">{{ selected.name }} walkthrough</span>
                          <span class="map-detail__guide-dek">Loot tables, containers, build notes</span>
                          <span class="map-detail__guide-cta">Open guide →</span>
                        </RouterLink>

                        <div v-if="selectedNpcLinks.length" class="map-detail__npcs">
                          <h3 class="map-detail__sub">Traders &amp; NPCs</h3>
                          <p class="map-detail__npcs-intro">
                            Tap through for tasks, stock, and behavior—we keep the short version here.
                          </p>
                          <ul class="map-detail__npc-list">
                            <li v-for="(n, idx) in selectedNpcLinks" :key="'npc-' + idx">
                              <RouterLink class="map-detail__npc-card" :to="n.to">
                                <span class="map-detail__npc-top">
                                  <span class="map-detail__npc-name">{{ n.label }}</span>
                                  <span v-if="n.role" class="map-detail__npc-role">{{ n.role }}</span>
                                </span>
                                <span class="map-detail__npc-blurb">{{ n.blurb }}</span>
                                <span class="map-detail__npc-cta">Full wiki page →</span>
                              </RouterLink>
                            </li>
                          </ul>
                        </div>

                        <nav
                          v-if="selectedWikiLinks.length"
                          class="map-detail__extras"
                          aria-label="More wiki links"
                        >
                          <h3 class="map-detail__sub">Also on the manual</h3>
                          <ul class="map-detail__links">
                            <li v-for="(link, idx) in selectedWikiLinks" :key="'wl-' + idx">
                              <RouterLink class="map-detail__a" :to="link.to">{{ link.label }}</RouterLink>
                            </li>
                          </ul>
                        </nav>

                        <div v-if="selectedIntel.length" class="map-detail__intel">
                          <h3 class="map-detail__sub">Notes</h3>
                          <dl class="map-intel-dl">
                            <div v-for="block in selectedIntel" :key="block.key" class="map-intel-dl__group">
                              <dt class="map-intel-dl__dt">{{ block.title }}</dt>
                              <dd class="map-intel-dl__dd">
                                <ul class="map-intel-dl__list">
                                  <li v-for="(line, idx) in block.lines" :key="block.key + '-' + idx">{{ line }}</li>
                                </ul>
                              </dd>
                            </div>
                          </dl>
                        </div>

                        <button type="button" class="map-detail__clear" @click="clearSelection">Clear</button>
                      </div>
                    </template>
                    <div v-else class="map-detail map-detail--empty">
                      <p class="map-detail__placeholder">
                        Tap a pin — summary matches the Field Manual wiki; open the guide for container counts and build notes.
                      </p>
                    </div>
                  </aside>
                </div>
                <figcaption class="map-caption">
                  Blurb and links sit in the overlay on the map. Pin positions are still fan-placed on the promo art. Esc clears
                  selection.
                </figcaption>
              </figure>
            </div>
          </div>

          <h2 id="map-list-heading" class="map-quick-title">Quick jump</h2>
          <p class="map-quick-dek">
            Same three bands as
            <a href="https://www.roadtovostok.com/game" class="map-link" target="_blank" rel="noopener noreferrer"
              >roadtovostok.com/game</a
            >. Chips select the same pins as on the image.
          </p>
          <div class="map-jump">
            <div v-for="layerKey in typeOrder" :key="layerKey" class="map-jump__band">
              <div class="map-jump__head">
                <span class="map-legend-dot map-legend-dot--sm" :class="`map-legend-dot--${layerKey}`" aria-hidden="true" />
                <span class="map-jump__label">{{ typeMeta[layerKey].label }}</span>
              </div>
              <div class="map-jump__chips" role="group" :aria-label="typeMeta[layerKey].label + ' locations'">
                <button
                  v-for="m in mapsForType(layerKey)"
                  :key="'jmp-' + m.id"
                  type="button"
                  class="map-jump-chip"
                  :class="[`map-jump-chip--${m.type}`, { 'map-jump-chip--on': selectedId === m.id }]"
                  :aria-pressed="selectedId === m.id"
                  @click="selectPin(m.id)"
                >
                  {{ m.name }}
                </button>
              </div>
            </div>
          </div>

          <p class="map-foot-links">
            <RouterLink class="map-link" to="/wiki">Wiki</RouterLink>
            ·
            <RouterLink class="map-link" to="/wiki/maps">Maps</RouterLink>
            ·
            <RouterLink class="map-link" to="/wiki/npcs">NPCs</RouterLink>
            ·
            <RouterLink class="map-link" to="/wiki/weapons">Weapons</RouterLink>
            ·
            <RouterLink class="map-link" to="/start">Start</RouterLink>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-map {
  position: relative;
}

.map-hero {
  position: relative;
  overflow: hidden;
}

.map-hero__glow {
  pointer-events: none;
  position: absolute;
  inset: -20% -10% auto;
  height: min(420px, 55vw);
  background: radial-gradient(
    ellipse 70% 60% at 50% 0%,
    color-mix(in srgb, var(--color-accent) 22%, transparent),
    transparent 72%
  );
  opacity: 0.85;
}

.map-lead__code {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.78em;
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
  background: color-mix(in srgb, var(--color-bg-deep) 65%, transparent);
  color: color-mix(in srgb, var(--color-text-muted) 75%, var(--color-frost));
}

.map-disclaimer-inline {
  margin: 0 0 0.85rem;
  max-width: 44rem;
  font-size: 0.8125rem;
  line-height: 1.55;
  color: var(--color-text-muted);
}

.map-viewport__panel {
  pointer-events: none;
  position: absolute;
  z-index: 7;
  top: 4.35rem;
  right: 0.5rem;
  bottom: 0.5rem;
  width: min(19.5rem, calc(100% - 1rem));
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.map-viewport__panel > * {
  pointer-events: auto;
  border-radius: 12px;
  border: 1px solid color-mix(in srgb, var(--color-border) 72%, var(--color-frost) 14%);
  background: color-mix(in srgb, var(--color-bg-panel) 88%, var(--color-bg-deep));
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  padding: 0.75rem 0.85rem 0.85rem;
  box-shadow: 0 12px 40px color-mix(in srgb, #000 45%, transparent);
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 100%;
  -webkit-overflow-scrolling: touch;
}

@media (max-width: 639px) {
  .map-viewport__panel {
    top: auto;
    right: 0.45rem;
    left: 0.45rem;
    bottom: 0.45rem;
    width: auto;
    max-height: min(42vh, 320px);
  }
}

.map-detail--empty {
  padding: 0.55rem 0.65rem;
}

.map-detail__band {
  display: inline-block;
  margin-bottom: 0.5rem;
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-bg-deep);
  background: color-mix(in srgb, var(--color-text-muted) 35%, var(--color-border));
}

.map-detail__band--area05 {
  background: color-mix(in srgb, var(--color-frost) 55%, var(--color-forest));
  color: var(--color-bg-deep);
}

.map-detail__band--borderZone {
  background: linear-gradient(135deg, #e8c547, #9a7209);
  color: #1a1406;
}

.map-detail__band--vostok {
  background: color-mix(in srgb, var(--color-accent) 75%, #200);
  color: #f5f0ea;
}

.map-detail__title {
  margin: 0 0 0.5rem;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-size: clamp(1.05rem, 2.8vw, 1.2rem);
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  line-height: 1.15;
  color: var(--color-text);
}

.map-detail__text {
  margin: 0 0 0.85rem;
  font-size: 0.875rem;
  line-height: 1.62;
  color: var(--color-text-muted);
  white-space: pre-line;
}

.map-detail__guide {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.2rem;
  margin-bottom: 1rem;
  padding: 0.65rem 0.75rem;
  border-radius: 10px;
  text-decoration: none;
  color: inherit;
  border: 1px solid color-mix(in srgb, var(--color-frost) 35%, var(--color-border));
  background: color-mix(in srgb, var(--color-frost) 9%, var(--color-bg-deep));
  transition:
    border-color 0.2s ease,
    transform 0.2s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.2s ease;
}

.map-detail__guide:hover,
.map-detail__guide:focus-visible {
  border-color: color-mix(in srgb, var(--color-frost) 55%, var(--color-border));
  box-shadow: 0 6px 22px color-mix(in srgb, #000 32%, transparent);
  transform: translateY(-1px);
  outline: none;
}

.map-detail__guide-kicker {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.52rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.map-detail__guide-title {
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color-text);
  line-height: 1.2;
}

.map-detail__guide-dek {
  font-size: 0.78rem;
  color: var(--color-text-muted);
  line-height: 1.45;
}

.map-detail__guide-cta {
  margin-top: 0.15rem;
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--color-frost);
  letter-spacing: 0.03em;
}

.map-detail__npcs {
  margin-bottom: 1rem;
}

.map-detail__npcs-intro {
  margin: 0 0 0.55rem;
  font-size: 0.78rem;
  line-height: 1.5;
  color: color-mix(in srgb, var(--color-text-muted) 92%, var(--color-text));
}

.map-detail__npc-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.map-detail__npc-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.3rem;
  padding: 0.55rem 0.65rem;
  border-radius: 10px;
  text-decoration: none;
  color: inherit;
  border: 1px solid color-mix(in srgb, var(--color-border) 78%, var(--color-frost) 8%);
  background: color-mix(in srgb, var(--color-bg-deep) 45%, transparent);
  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    transform 0.2s cubic-bezier(0.22, 1, 0.36, 1);
}

.map-detail__npc-card:hover,
.map-detail__npc-card:focus-visible {
  border-color: color-mix(in srgb, var(--color-frost) 42%, var(--color-border));
  background: color-mix(in srgb, var(--color-frost) 7%, var(--color-bg-panel));
  transform: translateY(-1px);
  outline: none;
}

.map-detail__npc-top {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.35rem 0.5rem;
}

.map-detail__npc-name {
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color-text);
}

.map-detail__npc-role {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.52rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.map-detail__npc-blurb {
  margin: 0;
  font-size: 0.78rem;
  line-height: 1.5;
  color: var(--color-text-muted);
}

.map-detail__npc-cta {
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--color-frost);
  letter-spacing: 0.02em;
}

.map-detail__sub {
  margin: 0 0 0.45rem;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--color-text-muted) 80%, var(--color-text));
}

.map-detail__extras {
  margin-bottom: 1rem;
}

.map-detail__links {
  margin: 0;
  padding-left: 1.15rem;
  font-size: 0.875rem;
  line-height: 1.55;
  color: var(--color-text-muted);
}

.map-detail__links li + li {
  margin-top: 0.35rem;
}

.map-detail__a {
  color: var(--color-frost);
  font-weight: 600;
  text-underline-offset: 0.2em;
}

.map-detail__a:hover,
.map-detail__a:focus-visible {
  color: var(--color-text);
}

.map-detail__intel {
  margin-bottom: 1rem;
  padding-top: 0.85rem;
  border-top: 1px solid color-mix(in srgb, var(--color-border) 88%, transparent);
}

.map-detail__placeholder {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--color-text-muted);
}

.map-detail__clear {
  margin-top: 0.25rem;
  padding: 0.45rem 0.85rem;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.58rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border-radius: 8px;
  border: 1px solid color-mix(in srgb, var(--color-border) 82%, var(--color-frost) 12%);
  background: color-mix(in srgb, var(--color-bg-deep) 70%, transparent);
  color: var(--color-frost);
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    color 0.2s ease;
}

.map-detail__clear:hover,
.map-detail__clear:focus-visible {
  border-color: var(--color-frost);
  color: var(--color-text);
  outline: none;
}

.map-quick-title {
  margin: 0 0 0.5rem;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-size: clamp(1.05rem, 2.2vw, 1.2rem);
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.map-quick-dek {
  margin: 0 0 1rem;
  max-width: 44rem;
  font-size: 0.875rem;
  line-height: 1.55;
  color: var(--color-text-muted);
}

.map-foot-links {
  margin: 1.5rem 0 0;
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}

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
  margin: 0 0 0.75rem;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-weight: 700;
  font-size: clamp(1.85rem, 4vw, 2.35rem);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text);
}

.map-pitch {
  margin: 0 0 1rem;
  padding: 0.85rem 1rem 0.95rem 1.15rem;
  max-width: 48rem;
  border-radius: 12px;
  border: 1px solid color-mix(in srgb, var(--color-accent) 28%, var(--color-border));
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--color-bg-panel) 92%, var(--color-accent) 4%) 0%,
    color-mix(in srgb, var(--color-bg-deep) 94%, transparent) 100%
  );
  box-shadow: 0 12px 28px color-mix(in srgb, #000 22%, transparent);
  color: var(--color-text-muted);
  font-size: 0.9375rem;
  line-height: 1.65;
  border-left: 3px solid color-mix(in srgb, var(--color-accent) 70%, var(--color-border));
}

.map-pitch strong {
  color: color-mix(in srgb, var(--color-text) 90%, var(--color-accent));
  font-weight: 700;
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
  position: relative;
  margin-bottom: 1.75rem;
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
  z-index: 8;
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

.map-intel-dl {
  margin: 0;
}

.map-intel-dl__group + .map-intel-dl__group {
  margin-top: 0.85rem;
  padding-top: 0.75rem;
  border-top: 1px solid color-mix(in srgb, var(--color-border) 85%, transparent);
}

.map-intel-dl__dt {
  margin: 0 0 0.35rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-text);
  letter-spacing: 0.02em;
}

.map-intel-dl__dd {
  margin: 0;
}

.map-intel-dl__list {
  margin: 0;
  padding-left: 1.1rem;
  color: var(--color-text-muted);
  font-size: 0.8125rem;
  line-height: 1.58;
}

.map-intel-dl__list li + li {
  margin-top: 0.3rem;
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

.map-jump {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.map-jump__band {
  padding: 0.85rem 1rem 1rem;
  border-radius: 12px;
  border: 1px solid color-mix(in srgb, var(--color-border) 88%, transparent);
  background: color-mix(in srgb, var(--color-bg-panel) 92%, var(--color-bg-deep));
}

.map-jump__head {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.65rem;
}

.map-jump__label {
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--color-text);
}

.map-jump__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.map-jump-chip {
  display: inline-flex;
  align-items: center;
  padding: 0.38rem 0.72rem;
  font-family: inherit;
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  color: var(--color-text);
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--color-border) 80%, transparent);
  background: color-mix(in srgb, var(--color-bg-deep) 35%, transparent);
  cursor: pointer;
  transition:
    border-color 0.18s ease,
    background 0.18s ease,
    box-shadow 0.18s ease;
}

.map-jump-chip:hover,
.map-jump-chip:focus-visible {
  border-color: color-mix(in srgb, var(--color-frost) 35%, var(--color-border));
  background: color-mix(in srgb, var(--color-bg-panel) 70%, var(--color-frost) 8%);
}

.map-jump-chip--on {
  border-color: color-mix(in srgb, var(--color-accent) 40%, var(--color-frost));
  background: color-mix(in srgb, var(--color-bg-panel) 65%, var(--color-accent) 14%);
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--color-accent) 18%, transparent);
}

.map-jump-chip--area05.map-jump-chip--on {
  border-color: color-mix(in srgb, var(--color-frost) 50%, var(--color-border));
  background: color-mix(in srgb, var(--color-bg-panel) 78%, var(--color-frost) 10%);
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--color-frost) 22%, transparent);
}

.map-jump-chip--borderZone.map-jump-chip--on {
  border-color: color-mix(in srgb, #c9a227 45%, var(--color-border));
  background: color-mix(in srgb, var(--color-bg-panel) 82%, #c9a227 8%);
}

.map-jump-chip--vostok.map-jump-chip--on {
  border-color: color-mix(in srgb, var(--color-accent) 48%, var(--color-border));
  background: color-mix(in srgb, var(--color-bg-panel) 72%, var(--color-accent) 16%);
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

  .map-pitch {
    font-size: 0.9rem;
    padding: 0.75rem 0.85rem;
  }

  .map-pin__label {
    font-size: 0.58rem;
    max-width: 5.5rem;
  }

  .map-jump-chip {
    padding: 0.34rem 0.62rem;
    font-size: 0.78rem;
  }
}
</style>
