<script setup>
import { ref, computed, watch } from 'vue'
import RasterMapInteractive from './RasterMapInteractive.vue'
import { loadRasterMapData } from '../../data/raster-maps/loadRasterMap.js'
import { RASTER_MAP_PAGES, pageByModule } from '../../data/raster-maps/rasterMapPages.js'

const props = defineProps({
  mapModule: { type: String, required: true },
})

const page = computed(() => pageByModule(props.mapModule))
const mapData = ref(null)
const loadError = ref(null)

const base = () => (import.meta.env.BASE_URL || '/').replace(/\/$/, '')

function resolveImage(url) {
  if (!url) return ''
  if (/^https?:\/\//i.test(url)) return url
  return `${base()}${url.startsWith('/') ? url : `/${url}`}`
}

/** 交给 Leaflet：含 BASE_URL 前缀的图地址 */
const leafBundle = computed(() => {
  const d = mapData.value
  if (!d) return null
  return { ...d, imageUrl: resolveImage(d.imageUrl) }
})

watch(
  () => props.mapModule,
  async (id) => {
    mapData.value = null
    loadError.value = null
    try {
      mapData.value = await loadRasterMapData(id)
    } catch (e) {
      loadError.value = e instanceof Error ? e.message : 'Failed to load map'
    }
  },
  { immediate: true },
)

</script>

<template>
  <div v-if="page" class="raster-page">
    <div v-if="leafBundle" class="raster-work" :aria-label="`Map: ${page.label}`">
      <RasterMapInteractive :key="leafBundle.mapId" :bundle="leafBundle" />
    </div>
    <p v-else-if="loadError" class="raster-err" role="alert">{{ loadError }}</p>

    <section v-if="page" class="raster-crawl section" aria-labelledby="raster-areas-heading">
      <h2 id="raster-areas-heading" class="raster-crawl__h2">Other zones</h2>
      <p class="raster-crawl__lead">Swipe on small screens, or use the row below to switch the interactive raster.</p>
      <ul class="raster-tiles" role="list">
          <li v-for="m in RASTER_MAP_PAGES" :key="m.path" class="raster-tile-li">
            <a
              :href="m.path"
              class="raster-tile"
              :class="{ 'raster-tile--current': m.mapModule === page.mapModule }"
              :style="{ '--tile-accent': m.accent }"
            >
              <img
                :src="resolveImage(m.thumb)"
                class="raster-tile__img"
                :alt="`Thumbnail: ${m.label}`"
                width="200"
                height="120"
                loading="lazy"
                decoding="async"
              />
              <span class="raster-tile__cap">{{ m.navLabel }}</span>
            </a>
          </li>
        </ul>
    </section>
  </div>
</template>

<style scoped>
.raster-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
}

.raster-work {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  min-height: min(72vh, 720px);
}
.raster-work :deep(.atlas--workspace) {
  flex: 1 1 auto;
  min-height: min(72vh, 720px);
  height: auto;
  width: 100%;
  border-radius: 12px;
}

.raster-err {
  color: #f07178;
  margin: 0.5rem 0 0;
  font-size: 0.9rem;
}

.raster-crawl {
  background: color-mix(in srgb, var(--color-bg) 100%, #000 0%);
  border-top: 1px solid color-mix(in srgb, var(--color-border) 60%, transparent);
  padding-top: 1.5rem;
}
.raster-crawl__h2 {
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin: 0 0 0.35rem;
  color: var(--color-text);
}
.raster-crawl__lead {
  margin: 0 0 1.1rem;
  color: var(--color-text-muted);
  font-size: 0.9rem;
  max-width: 40rem;
  line-height: 1.5;
}

.raster-tiles {
  list-style: none;
  margin: 0;
  padding: 0 0 0.25rem;
  display: flex;
  flex-wrap: nowrap;
  gap: 0.65rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-gutter: stable;
}
.raster-tiles::-webkit-scrollbar {
  height: 6px;
}
.raster-tiles::-webkit-scrollbar-thumb {
  background: color-mix(in srgb, var(--color-border) 80%, #000 10%);
  border-radius: 4px;
}
.raster-tile-li {
  flex: 0 0 min(8.5rem, 44vw);
  max-width: 9.5rem;
  scroll-snap-align: start;
}
@media (min-width: 1100px) {
  .raster-tiles {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    overflow: visible;
    flex-wrap: unset;
    scroll-snap-type: none;
    gap: 0.6rem;
  }
  .raster-tile-li {
    flex: unset;
    max-width: none;
  }
}

.raster-tile {
  display: block;
  text-decoration: none;
  color: inherit;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid color-mix(in srgb, var(--tile-accent, #888) 45%, var(--color-border) 50%);
  background: #08090b;
  transition:
    border-color 0.18s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
  box-shadow: 0 8px 24px #0003;
}
.raster-tile:hover {
  transform: translateY(-2px);
  border-color: color-mix(in srgb, var(--tile-accent) 80%, #fff 10%);
  box-shadow: 0 12px 32px #0004;
}
.raster-tile--current {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 1px var(--color-accent);
  pointer-events: none;
  opacity: 0.85;
}
.raster-tile__img {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
}
.raster-tile__cap {
  display: block;
  padding: 0.4rem 0.5rem 0.5rem;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-align: center;
  background: color-mix(in srgb, var(--color-bg-panel) 92%, #000 8%);
  color: var(--color-text);
}
</style>
