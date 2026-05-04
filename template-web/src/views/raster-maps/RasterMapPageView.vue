<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import RasterMapInteractive from './RasterMapInteractive.vue'
import { loadRasterMapData } from '../../data/raster-maps/loadRasterMap.js'
import { RASTER_MAP_PAGES, RASTER_PIN_QUERY, pageByModule } from '../../data/raster-maps/rasterMapPages.js'

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

function injectJsonLd() {
  const p = page.value
  if (!p) return
  const origin =
    typeof window !== 'undefined' ? window.location.origin : 'https://roadtovostok.net'
  const path = p.path.startsWith('/') ? p.path : `/${p.path}`
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.setAttribute('data-raster-ld', '1')
  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${origin}/` },
      { '@type': 'ListItem', position: 2, name: 'Map', item: `${origin}/map` },
      { '@type': 'ListItem', position: 3, name: p.label, item: `${origin}${path}` },
    ],
  })
  document.head.appendChild(script)
}

function removeJsonLd() {
  document.head.querySelector('script[data-raster-ld="1"]')?.remove()
}

onMounted(injectJsonLd)
onUnmounted(removeJsonLd)
</script>

<template>
  <div v-if="page" class="raster-page">
    <!-- 首屏：在顶栏以下铺满视口宽、高，地图区吃满剩余空间 -->
    <div class="raster-first">
      <header class="raster-hero" :aria-label="page.label">
        <div class="container">
          <div class="raster-hero__inner wrap wrap--wide">
            <nav class="raster-crumb" aria-label="Breadcrumb">
              <RouterLink to="/" class="raster-crumb__a">Field Manual</RouterLink>
              <span class="raster-crumb__sep" aria-hidden="true">/</span>
              <RouterLink to="/map" class="raster-crumb__a">World map</RouterLink>
              <span class="raster-crumb__sep" aria-hidden="true">/</span>
              <span class="raster-crumb__here">{{ page.navLabel }}</span>
            </nav>
            <div class="raster-hero__title-row">
              <p class="raster-kicker">Area raster</p>
              <h1 class="raster-h1">Road to Vostok — {{ page.label }}</h1>
            </div>
            <p class="raster-dek">
              Pan / zoom · 左侧图层与钉点列表。
              <code class="raster-code raster-code--inline">{{ page.path }}?{{ RASTER_PIN_QUERY }}=…</code>
            </p>
            <p v-if="loadError" class="raster-err" role="alert">{{ loadError }}</p>
          </div>
        </div>
      </header>

      <div v-if="leafBundle" class="raster-work" :aria-label="`Map: ${page.label}`">
        <RasterMapInteractive :key="leafBundle.mapId" :bundle="leafBundle" />
      </div>
    </div>

    <section v-if="page" class="raster-crawl section" aria-labelledby="raster-areas-heading">
      <div class="container">
        <h2 id="raster-areas-heading" class="raster-crawl__h2">Other zones</h2>
        <p class="raster-crawl__lead">Swipe on small screens, or use the row below to switch the interactive raster.</p>
        <ul class="raster-tiles" role="list">
          <li v-for="m in RASTER_MAP_PAGES" :key="m.path" class="raster-tile-li">
            <RouterLink
              :to="m.path"
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
            </RouterLink>
          </li>
        </ul>
      </div>
    </section>

    <article v-if="page" class="raster-article section section--tight" lang="en">
      <div class="container">
        <div class="wrap wrap--wide">
          <h2 class="raster-article__h2">Map guide: {{ page.navLabel }}</h2>
          <p class="raster-article__p">{{ page.article }}</p>
        </div>
      </div>
    </article>
  </div>
</template>

<style scoped>
.raster-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100vw;
  background: var(--color-bg-deep, #0c0e10);
}

/* 主内容区在顶栏下，本块 = 一屏高（不滚动即见地图 + 紧标题） */
.raster-first {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: calc(100dvh - var(--app-header-offset, 4.25rem));
  box-sizing: border-box;
}

.raster-hero {
  flex: 0 0 auto;
  padding: 0.4rem 0 0.35rem;
  width: 100%;
}
.raster-hero__inner {
  max-width: 100%;
}
.raster-hero__title-row {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.35rem 0.75rem;
  margin-top: 0.15rem;
}
.raster-hero__title-row .raster-kicker {
  margin: 0;
  flex: 0 0 auto;
}
.raster-hero__title-row .raster-h1 {
  margin: 0;
  flex: 1 1 12rem;
}

.raster-kicker {
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-accent);
  opacity: 0.95;
}
.raster-crumb {
  font-size: 0.78rem;
  color: var(--color-text-muted);
  margin: 0 0 0.4rem;
}
.raster-crumb__a {
  color: var(--color-frost);
  text-decoration: none;
}
.raster-crumb__a:hover {
  text-decoration: underline;
}
.raster-crumb__sep {
  margin: 0 0.3rem;
  opacity: 0.5;
}
.raster-crumb__here {
  color: var(--color-text);
}

.raster-h1 {
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-size: clamp(1.35rem, 3.5vw, 1.9rem);
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin: 0 0 0.4rem;
  line-height: 1.1;
  color: var(--color-text);
}

.raster-dek {
  margin: 0.35rem 0 0;
  max-width: 100%;
  font-size: 0.8rem;
  line-height: 1.4;
  color: var(--color-text-muted);
}
@media (min-width: 700px) {
  .raster-dek {
    max-width: 46rem;
  }
}
.raster-code--inline {
  display: inline;
  font-size: 0.86em;
  margin-left: 0.1rem;
  vertical-align: baseline;
  word-break: break-all;
}

.raster-code {
  font-size: 0.78em;
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
  background: color-mix(in srgb, var(--color-bg-panel) 80%, #000 10%);
  color: var(--color-frost);
  word-break: break-all;
}
.raster-err {
  color: #f07178;
  margin: 0.5rem 0 0;
}

.raster-work {
  flex: 1 1 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
}
/* 与首屏同高：在 hero 下撑满 `raster-first` 剩余高度，全宽 */
.raster-work :deep(.atlas--workspace) {
  flex: 1 1 auto;
  min-height: 0;
  height: 100%;
  max-height: none;
  width: 100%;
  align-self: stretch;
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

.raster-article {
  background: var(--color-bg);
}
.raster-article__h2 {
  font-size: 1.05rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
  color: var(--color-text);
}
.raster-article__p {
  margin: 0;
  max-width: 50rem;
  font-size: 0.92rem;
  line-height: 1.7;
  color: var(--color-text-muted);
}
</style>
