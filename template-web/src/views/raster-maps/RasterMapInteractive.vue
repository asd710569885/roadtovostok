<script setup>
import { nextTick, ref, computed } from 'vue'
import { useRasterMapPage } from '../../composables/useRasterMapPage.js'
import { RASTER_PIN_QUERY } from '../../data/raster-maps/rasterMapPages.js'

const props = defineProps({
  /** map01…map07 的 default，且 imageUrl 已含 BASE_URL 前缀 */
  bundle: { type: Object, required: true },
})

const coordHud = ref('—')

const {
  mapContainer,
  filterRailRef,
  mapError,
  mapReady,
  listedPins,
  kindVisible,
  categoryExpanded,
  mapCategories,
  categoryChevron,
  countForKind,
  categoryAllOn,
  focusKindPins,
  selectPoiFromList,
  syncCategoryMasterCheckboxes,
  pinSearchQuery,
  searchMatchCount,
  focusNextSearchMatch,
  selectedPoi,
  kindLabelById,
} = useRasterMapPage(props.bundle, {
  coordHud,
  queryParam: RASTER_PIN_QUERY,
  syncQuery: true,
})

const searchMeta = computed(() => {
  if (!mapReady.value) return ''
  const q = pinSearchQuery.value.trim()
  if (!q) return ''
  if (searchMatchCount.value === 0) return 'No results'
  if (searchMatchCount.value === 1) return '1 hit — Enter'
  return `${searchMatchCount.value} hits — Enter cycles`
})

function kindLabel(pin) {
  const m = kindLabelById.value
  const id = pin?.kind
  if (id == null) return ''
  return (m && typeof m === 'object' && id in m ? m[id] : '') || String(id)
}
</script>

<template>
  <div class="atlas atlas-embed atlas--workspace" role="region" aria-label="Area map">
    <aside
      class="atlas__rail"
      ref="filterRailRef"
      aria-label="Search, layers, and pin list"
    >
      <div class="atlas__rail-top">
        <label class="atlas__search-label" for="atlas-pin-search">Find</label>
        <div class="atlas__search-bar">
          <span class="atlas__search-ico" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="10.5" cy="10.5" r="6" />
              <path d="M16 16l4.5 4.5" stroke-linecap="round" />
            </svg>
          </span>
          <input
            id="atlas-pin-search"
            v-model="pinSearchQuery"
            type="search"
            class="atlas__search-input"
            enterkeyhint="search"
            placeholder="Filter list…"
            :disabled="!mapReady"
            autocomplete="off"
            spellcheck="false"
            @keydown.enter.prevent="focusNextSearchMatch"
          />
        </div>
        <p v-if="searchMeta" class="atlas__search-hint">
          {{ searchMeta }}
        </p>
      </div>

      <div class="atlas__layers" role="group" aria-label="Map layers">
        <p class="atlas__layers-kicker">Layers</p>
        <div class="atlas__bands">
          <div
            v-for="cat in mapCategories"
            :key="cat.id"
            class="atlas-b"
            :data-vcat="cat.id"
          >
            <div class="atlas-b__row">
              <button
                type="button"
                class="atlas-b__toggle"
                :aria-expanded="categoryExpanded[cat.id] ? 'true' : 'false'"
                @click="categoryExpanded[cat.id] = !categoryExpanded[cat.id]"
              >
                <span class="atlas-b__chev" aria-hidden="true">{{
                  categoryChevron(categoryExpanded[cat.id])
                }}</span>
                <span class="atlas-b__name">{{ cat.label }}</span>
              </button>
              <input
                class="atlas-b__all"
                type="checkbox"
                :data-village-master="cat.id"
                :checked="categoryAllOn(cat.id)"
                :aria-label="`All ${cat.label}`"
                @change="
                  (e) => {
                    const el = e.target
                    if (!el || el.tagName !== 'INPUT') return
                    const wantOn = !!el.checked
                    for (const row of cat.kinds) kindVisible[row.id] = wantOn
                    nextTick(syncCategoryMasterCheckboxes)
                  }
                "
              />
            </div>
            <ul v-show="categoryExpanded[cat.id]" class="atlas-b__kinds" role="list">
              <li v-for="row in cat.kinds" :key="row.id" class="atlas-b__li">
                <label class="atlas-b__gate" :for="`k-${row.id}`">
                  <input
                    :id="`k-${row.id}`"
                    v-model="kindVisible[row.id]"
                    type="checkbox"
                    class="atlas-b__ck"
                  />
                  <span class="atlas-b__ck-ui" aria-hidden="true" />
                </label>
                <button
                  type="button"
                  class="atlas-b__go"
                  :disabled="countForKind(row.id) === 0 || !kindVisible[row.id]"
                  @click="focusKindPins(row.id)"
                >
                  <span class="atlas-b__go-name">{{ row.label }}</span>
                  <span class="atlas-b__go-pill">{{ countForKind(row.id) }}</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="atlas__listhead">
        <span class="atlas__listhead-title">Pins</span>
        <span v-if="mapReady" class="atlas__listhead-count" aria-live="polite">{{ listedPins.length }}</span>
        <span v-else class="atlas__listhead-count">—</span>
      </div>
      <ul
        class="atlas__pinlist"
        role="listbox"
        :aria-label="`Visible pins, ${listedPins.length} items`"
      >
        <li v-for="p in listedPins" :key="p.id" role="none" class="atlas__pinli">
          <button
            type="button"
            class="atlas__pinrow"
            :class="{ 'atlas__pinrow--active': selectedPoi?.id === p.id }"
            role="option"
            :aria-selected="selectedPoi?.id === p.id ? 'true' : 'false'"
            @click="selectPoiFromList(p.id)"
          >
            <span class="atlas__pinrow-title">{{ p.title }}</span>
            <span class="atlas__pinrow-meta">{{ kindLabel(p) }}</span>
          </button>
        </li>
        <li v-if="mapReady && listedPins.length === 0" class="atlas__pinempty" role="status">
          No pins match. Adjust search or layers.
        </li>
        <li v-else-if="!mapReady" class="atlas__pinempty" role="status">Loading map…</li>
      </ul>
    </aside>

    <div class="atlas__mapcol">
      <div
        class="atlas__frame"
        :class="{ 'atlas__frame--loading': !mapReady && !mapError }"
        aria-label="Map"
      >
        <div
          v-show="mapReady"
          class="atlas__hud"
          aria-hidden="true"
        >
          {{ coordHud }}
        </div>
        <div
          ref="mapContainer"
          class="atlas__leaflet rtv-map-host"
          role="application"
          aria-label="Pan and zoom; wheel zooms"
          tabindex="0"
        />
      </div>
      <p v-if="mapError" class="atlas__alert" role="alert">
        {{ mapError }}
      </p>
    </div>
  </div>
</template>

<style src="../../styles/raster-atlas-leaflet.css"></style>

<style scoped>
.atlas--workspace {
  display: grid;
  grid-template-columns: minmax(0, 18rem) minmax(0, 1fr);
  grid-template-rows: minmax(0, 1fr);
  align-items: stretch;
  min-width: 0;
  min-height: 0;
  height: 100%;
  max-height: none;
  border-radius: 0;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--color-border) 75%, var(--color-frost) 8%);
  background: color-mix(in srgb, #050708 80%, var(--color-bg-panel) 20%);
  box-shadow: 0 0 0 1px #0002 inset, 0 20px 50px -20px #0006;
}
@media (max-width: 899px) {
  .atlas--workspace {
    grid-template-columns: 1fr;
    grid-template-rows: minmax(0, 1fr) minmax(0, 1fr);
    min-height: 0;
    height: 100%;
  }
  .atlas__rail {
    order: 2;
    max-height: none;
    min-height: 0;
  }
  .atlas__mapcol {
    order: 1;
    min-height: 0;
  }
}
@media (min-width: 900px) and (max-width: 1099px) {
  .atlas--workspace {
    grid-template-columns: minmax(0, 15.5rem) minmax(0, 1fr);
  }
}

.atlas__rail {
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  border-right: 1px solid color-mix(in srgb, var(--color-border) 65%, transparent);
  background: color-mix(in srgb, var(--color-bg-deep) 50%, #000 35%);
}
@media (max-width: 899px) {
  .atlas__rail {
    border-right: none;
    border-top: 1px solid color-mix(in srgb, var(--color-border) 65%, transparent);
  }
}

.atlas__rail-top {
  flex: 0 0 auto;
  padding: 0.7rem 0.7rem 0.5rem;
  border-bottom: 1px solid color-mix(in srgb, var(--color-border) 50%, transparent);
}
.atlas__search-label {
  display: block;
  margin: 0 0 0.35rem;
  font-size: 0.58rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}
.atlas__search-bar {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.32rem 0.5rem 0.32rem 0.55rem;
  border-radius: 10px;
  background: #0a0c0d;
  border: 1px solid color-mix(in srgb, var(--color-border) 80%, #fff 4%);
}
.atlas__search-ico {
  flex-shrink: 0;
  color: var(--color-text-muted);
  opacity: 0.75;
}
.atlas__search-input {
  flex: 1 1 auto;
  min-width: 0;
  border: none;
  background: transparent;
  color: var(--color-text);
  font: inherit;
  font-size: 0.82rem;
  outline: none;
}
.atlas__search-hint {
  margin: 0.3rem 0 0;
  font-size: 0.68rem;
  color: var(--color-text-muted);
}

.atlas__layers {
  flex: 0 1 auto;
  min-height: 0;
  overflow-y: auto;
  padding: 0.55rem 0.5rem 0.65rem;
  border-bottom: 1px solid color-mix(in srgb, var(--color-border) 45%, transparent);
  max-height: min(28vh, 220px);
}
.atlas__layers-kicker {
  margin: 0 0 0.45rem 0.15rem;
  font-size: 0.55rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-frost);
  opacity: 0.7;
}
.atlas__bands {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.atlas-b {
  min-width: 0;
  padding: 0.4rem 0.45rem 0.5rem;
  border-radius: 8px;
  background: #080a0b;
  border: 1px solid color-mix(in srgb, var(--color-border) 55%, transparent);
}
.atlas-b__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.35rem;
  margin-bottom: 0.3rem;
}
.atlas-b__toggle {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  color: var(--color-text);
  font: inherit;
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-align: left;
  cursor: pointer;
  min-width: 0;
  flex: 1;
}
.atlas-b__toggle:hover {
  color: var(--color-frost);
}
.atlas-b__chev {
  font-size: 0.45rem;
  opacity: 0.7;
  flex-shrink: 0;
}
.atlas-b__name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.atlas-b__all {
  width: 0.8rem;
  height: 0.8rem;
  flex-shrink: 0;
  accent-color: var(--color-accent);
  cursor: pointer;
}
.atlas-b__kinds {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.22rem;
}
.atlas-b__li {
  display: flex;
  align-items: stretch;
  border-radius: 6px;
  border: 1px solid color-mix(in srgb, var(--color-border) 50%, transparent);
  overflow: hidden;
  min-height: 0;
  background: color-mix(in srgb, #000 20%, transparent);
}
.atlas-b__gate {
  position: relative;
  flex: 0 0 1.9rem;
  min-height: 1.9rem;
  margin: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background: color-mix(in srgb, var(--color-frost) 4%, #000 40%);
  border-right: 1px solid color-mix(in srgb, var(--color-border) 45%, transparent);
}
.atlas-b__ck {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: 0;
  padding: 0;
  border: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}
.atlas-b__ck-ui {
  display: block;
  width: 0.6rem;
  height: 0.6rem;
  border: 1.5px solid color-mix(in srgb, var(--color-border) 80%, #fff 8%);
  border-radius: 2px;
  background: #0a0b0b;
  transition: border-color 0.12s, background 0.12s, box-shadow 0.12s;
}
.atlas-b__ck:focus-visible + .atlas-b__ck-ui {
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--color-frost) 50%, transparent);
}
.atlas-b__ck:checked + .atlas-b__ck-ui {
  border-color: var(--color-frost);
  background: color-mix(in srgb, var(--color-frost) 22%, #0a0b0b);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, #000 50%, var(--color-frost) 50%);
}
.atlas-b__go {
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.3rem;
  min-width: 0;
  margin: 0;
  padding: 0.3rem 0.4rem;
  border: none;
  background: transparent;
  color: var(--color-text);
  font: inherit;
  font-size: 0.7rem;
  text-align: left;
  cursor: pointer;
  transition: background 0.1s;
}
.atlas-b__go:hover:not(:disabled) {
  background: color-mix(in srgb, var(--color-frost) 6%, transparent);
}
.atlas-b__go:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}
.atlas-b__go-name {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--color-text-muted);
  font-weight: 600;
}
.atlas-b__go-pill {
  flex-shrink: 0;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-size: 0.6rem;
  font-weight: 800;
  padding: 0.1rem 0.32rem;
  border-radius: 999px;
  background: #121518;
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.atlas__listhead {
  flex: 0 0 auto;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 0.45rem 0.7rem 0.35rem;
  border-bottom: 1px solid color-mix(in srgb, var(--color-border) 50%, transparent);
  background: color-mix(in srgb, #000 15%, transparent);
}
.atlas__listhead-title {
  font-size: 0.58rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-accent);
}
.atlas__listhead-count {
  font-size: 0.65rem;
  font-weight: 800;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  color: var(--color-text-muted);
}

.atlas__pinlist {
  list-style: none;
  margin: 0;
  padding: 0.25rem 0.2rem 0.5rem;
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}
.atlas__pinli {
  margin: 0 0 0.2rem;
}
.atlas__pinrow {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.12rem;
  margin: 0;
  padding: 0.45rem 0.5rem 0.48rem;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: inherit;
  text-align: left;
  cursor: pointer;
  font: inherit;
  border: 1px solid transparent;
  transition:
    background 0.12s,
    border-color 0.12s;
}
.atlas__pinrow:hover {
  background: color-mix(in srgb, var(--color-frost) 6%, #000 20%);
}
.atlas__pinrow--active {
  background: color-mix(in srgb, var(--color-frost) 10%, #000 25%);
  border-color: color-mix(in srgb, var(--color-frost) 35%, var(--color-border) 30%);
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--color-accent) 20%, transparent);
}
.atlas__pinrow-title {
  font-size: 0.78rem;
  font-weight: 600;
  line-height: 1.3;
  color: var(--color-text);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.atlas__pinrow-meta {
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-muted);
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.atlas__pinempty {
  margin: 0.75rem 0.5rem;
  font-size: 0.75rem;
  line-height: 1.4;
  color: var(--color-text-muted);
  list-style: none;
}

.atlas__mapcol {
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  position: relative;
}
.atlas__frame {
  position: relative;
  flex: 1 1 auto;
  min-height: 0;
  width: 100%;
  height: 100%;
  border-radius: 0;
  overflow: hidden;
  background: #030405;
}
.atlas__frame--loading::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  background: linear-gradient(110deg, transparent 40%, color-mix(in srgb, var(--color-frost) 5%, transparent) 50%, transparent 60%);
  background-size: 200% 100%;
  animation: atlas-sh 1.1s ease-in-out infinite;
  pointer-events: none;
  opacity: 0.4;
}
@keyframes atlas-sh {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
}
@media (prefers-reduced-motion: reduce) {
  .atlas__frame--loading::after {
    animation: none;
  }
}
.atlas__leaflet {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  min-height: 240px;
}
.atlas__hud {
  position: absolute;
  z-index: 500;
  right: 0.5rem;
  bottom: 0.5rem;
  max-width: min(100% - 0.8rem, 15rem);
  padding: 0.3rem 0.45rem 0.35rem;
  border-radius: 6px;
  border: 1px solid color-mix(in srgb, var(--color-border) 70%, var(--color-frost) 12%);
  background: color-mix(in srgb, #0a0c0c 90%, #000 10%);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  font-family: ui-monospace, 'Cascadia Code', 'Consolas', monospace;
  font-size: 0.6rem;
  line-height: 1.25;
  color: color-mix(in srgb, var(--color-text) 88%, #8aa0);
  word-break: break-all;
  pointer-events: none;
  box-shadow: 0 4px 16px #0003;
}
.atlas__alert {
  margin: 0;
  padding: 0.55rem 0.7rem;
  font-size: 0.8rem;
  color: #f0b8b4;
  border-top: 1px solid color-mix(in srgb, #a44 40%, var(--color-border) 20%);
  background: color-mix(in srgb, #300 20%, #0a0a0a 80%);
  flex: 0 0 auto;
}
</style>
