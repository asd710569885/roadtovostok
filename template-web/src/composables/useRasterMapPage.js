import { useRoute, useRouter } from 'vue-router'
import { reactive, ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { buildMapPinHtml } from '../data/raster-maps/pinIcons.js'

/** 与 roadtovostok-web 一致：仅 Map 大类默认开；子类由用户筛选 */
const DEFAULT_ON_CATEGORY_IDS = new Set(['poi'])

const ERR_DIM = 'Could not read image dimensions.'
const ERR_LOAD = 'Failed to load map image.'

/**
 * Leaflet CRS.Simple + imageOverlay + 图钉。bundle 为 map01.js…map07.js 的 default 导出并含绝对 imageUrl。
 *
 * @param bundle
 * @param {{ coordHud?: import('vue').Ref<string>; queryParam?: string; syncQuery?: boolean }} [options]
 *   queryParam: URL 查询键，默认 'loc'；本站用 'pin'。syncQuery: 点标时写回 ?pin=。
 */
export function useRasterMapPage(bundle, options = {}) {
  const { coordHud: coordHudRef, queryParam: optQueryParam, syncQuery = true } = options
  const {
    imageUrl,
    pins,
    mapCategories,
    mapLegend,
    pinCategoryField = 'category',
  } = bundle

  const queryParam = optQueryParam ?? 'loc'

  const filterCategoryOrder = mapCategories.map((c) => c.id)
  const kindsByCategory = Object.fromEntries(
    mapCategories.map((c) => [c.id, c.kinds.map((k) => k.id)]),
  )

  const route = useRoute()
  const router = useRouter()

  const mapPoints = computed(() => (Array.isArray(pins) ? pins : []))

  const pinSearchQuery = ref('')
  const searchCycleIndex = ref(0)

  const kindVisible = reactive(
    Object.fromEntries(
      mapCategories.flatMap((c) =>
        c.kinds.map((k) => [k.id, DEFAULT_ON_CATEGORY_IDS.has(c.id)]),
      ),
    ),
  )

  const categoryExpanded = reactive(
    Object.fromEntries(
      mapCategories.map((c) => [c.id, DEFAULT_ON_CATEGORY_IDS.has(c.id)]),
    ),
  )

  const kindCycle = reactive({})

  const kindPinAppearance = computed(() => {
    const m = Object.create(null)
    for (const c of mapCategories) {
      for (const k of c.kinds || []) {
        m[k.id] = { pinIcon: k.pinIcon, pinColor: k.pinColor }
      }
    }
    return m
  })

  const kindLabelById = computed(() => {
    const m = Object.create(null)
    for (const c of mapCategories) {
      for (const k of c.kinds || []) {
        m[k.id] = k.label
      }
    }
    return m
  })

  function pinMatchesQueryRaw(p, qLower) {
    if (!qLower) return true
    if (String(pinTitle(p)).toLowerCase().includes(qLower)) return true
    if (String(p?.id ?? '').toLowerCase().includes(qLower)) return true
    if (String(p?.kind ?? '').toLowerCase().includes(qLower)) return true
    const kl = String(kindLabelById.value[p?.kind] ?? '').toLowerCase()
    if (kl && kl.includes(qLower)) return true
    const plain = String(p?.content ?? '')
      .replace(/<[^>]+>/g, ' ')
      .toLowerCase()
    if (plain.includes(qLower)) return true
    return false
  }

  function pinMatchesSearch(p) {
    const q = pinSearchQuery.value.trim().toLowerCase()
    if (!q) return true
    return pinMatchesQueryRaw(p, q)
  }

  const searchMatches = computed(() => {
    const q = pinSearchQuery.value.trim().toLowerCase()
    if (!q) return []
    return mapPoints.value.filter((p) => pinMatchesQueryRaw(p, q))
  })

  const searchMatchCount = computed(() => searchMatches.value.length)

  function ensurePinKindVisible(p) {
    const k = p?.kind
    if (k != null && !kindVisible[k]) {
      kindVisible[k] = true
      const catId = p[pinCategoryField] ?? p.category
      if (typeof catId === 'string' && catId in categoryExpanded) {
        categoryExpanded[catId] = true
      }
    }
  }

  function focusNextSearchMatch() {
    const list = searchMatches.value
    if (!list.length) return
    const idx = searchCycleIndex.value % list.length
    const p = list[idx]
    searchCycleIndex.value = (idx + 1) % list.length
    ensurePinKindVisible(p)
    applyMarkerVisibility()
    nextTick(() => focusPoi(p.id))
  }

  function clearPinSearch() {
    pinSearchQuery.value = ''
    searchCycleIndex.value = 0
  }

  watch(pinSearchQuery, () => {
    searchCycleIndex.value = 0
    nextTick(() => applyMarkerVisibility())
  })

  const mapContainer = ref(null)
  const filterRailRef = ref(null)
  const mapError = ref('')
  const mapReady = ref(false)
  const selectedPoiId = ref(null)

  let mapInstance = null
  let resizeObserver = null
  let markersLayer = null
  const markerById = new Map()

  function getQueryString() {
    const raw = route.query[queryParam]
    if (raw == null || raw === '') return ''
    return String(Array.isArray(raw) ? raw[0] : raw)
  }

  function writePinQuery(id) {
    if (!syncQuery) return
    const q = { ...route.query }
    if (id) q[queryParam] = id
    else delete q[queryParam]
    router.replace({ path: route.path, query: q })
  }

  function categoryChevron(expanded) {
    return expanded ? String.fromCodePoint(0x25bc) : String.fromCodePoint(0x25b6)
  }

  function pinTitle(p) {
    return p?.title ?? ''
  }

  function heroForPin(p) {
    if (!p?.image) return null
    return { src: p.image, alt: p.imageAlt || pinTitle(p) }
  }

  function countForKind(kind) {
    return mapPoints.value.filter((p) => p.kind === kind).length
  }

  function categoryAllOn(catId) {
    const kinds = kindsByCategory[catId]
    if (!kinds?.length) return false
    return kinds.every((k) => kindVisible[k])
  }

  function syncCategoryMasterCheckboxes() {
    const root = filterRailRef.value
    if (!root) return
    for (const catId of filterCategoryOrder) {
      const el = root.querySelector(`input[data-village-master="${catId}"]`)
      if (!el || el.tagName !== 'INPUT') continue
      const kinds = kindsByCategory[catId]
      if (!kinds?.length) {
        el.indeterminate = false
        continue
      }
      const nOn = kinds.filter((k) => kindVisible[k]).length
      el.indeterminate = nOn > 0 && nOn < kinds.length
    }
  }

  const selectedPoi = computed(() => mapPoints.value.find((p) => p.id === selectedPoiId.value) ?? null)

  function syncMarkerSelectionClass() {
    const id = selectedPoiId.value
    for (const [mid, marker] of markerById) {
      const el = marker.getElement?.()
      if (!el) continue
      el.classList.toggle('rtv-map-marker--selected', mid === id)
    }
  }

  function focusPoi(id) {
    selectedPoiId.value = id
    const map = mapInstance
    const marker = markerById.get(id)
    if (!map || !marker) return
    if (!markersLayer?.hasLayer(marker)) return
    const ll = marker.getLatLng()
    const z = Math.max(map.getZoom(), 0.5)
    map.flyTo(ll, z, { duration: 0.42, easeLinearity: 0.22 })
    marker.openPopup()
  }

  function focusKindPins(kind) {
    if (!kindVisible[kind]) return
    const pinsList = mapPoints.value.filter((p) => p.kind === kind && kindVisible[p.kind])
    if (!pinsList.length) return
    const idx = (kindCycle[kind] ?? 0) % pinsList.length
    kindCycle[kind] = idx + 1
    focusPoi(pinsList[idx].id)
  }

  /** 与图钉在地图上可见性一致，供左栏列表使用 */
  const listedPins = computed(() =>
    mapPoints.value.filter((p) => kindVisible[p.kind] === true && pinMatchesSearch(p)),
  )

  function selectPoiFromList(id) {
    const p = mapPoints.value.find((x) => x.id === id)
    if (!p) return
    if (p.kind != null && kindVisible[p.kind] !== true) return
    writePinQuery(id)
    nextTick(() => focusPoi(id))
  }

  watch(selectedPoiId, () => {
    nextTick(() => syncMarkerSelectionClass())
  })

  watch(
    kindVisible,
    () => {
      applyMarkerVisibility()
      const sel = selectedPoi.value
      if (sel && !kindVisible[sel.kind]) {
        selectedPoiId.value = null
      }
      nextTick(() => syncCategoryMasterCheckboxes())
    },
    { deep: true },
  )

  function syncRouteLocQuery() {
    const raw = getQueryString()
    if (raw === '' || !mapReady.value) return
    const match = mapPoints.value.find((x) => String(x.id) === String(raw))
    if (!match) return
    if (match.kind != null && !kindVisible[match.kind]) {
      ensurePinKindVisible(match)
      nextTick(() => focusPoi(match.id))
      return
    }
    focusPoi(match.id)
  }

  watch(
    () => [getQueryString(), mapReady.value],
    () => nextTick(() => syncRouteLocQuery()),
  )

  function escapeHtml(text) {
    return String(text)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
  }

  function buildPopupHtml(p) {
    const title = pinTitle(p)
    const hero = heroForPin(p)
    const thumb = hero
      ? `<div class="rtv-map-popup__thumb"><img src="${escapeHtml(hero.src)}" alt="${escapeHtml(hero.alt)}" width="88" height="88" loading="lazy" decoding="async"></div>`
      : ''
    const cls = thumb ? 'rtv-map-popup rtv-map-popup--with-media' : 'rtv-map-popup'
    const body = p.content
      ? `<div class="rtv-map-popup__html">${String(p.content)}</div>`
      : ''
    return `<div class="${cls}"><div class="rtv-map-popup__body"><strong>${escapeHtml(title)}</strong>${body}</div>${thumb}</div>`
  }

  function normalizedToLatLng(xNorm, yNorm, w, h) {
    const xPx = xNorm * w
    const yFromTop = yNorm * h
    return L.latLng(h - yFromTop, xPx)
  }

  function markerModifierForPin(p) {
    const raw = p?.[pinCategoryField] ?? p?.category ?? 'locations'
    const slug = String(raw).replace(/[^a-z0-9_-]/gi, '') || 'locations'
    return `rtv-map-marker--vcat-${slug}`
  }

  function applyMarkerVisibility() {
    if (!markersLayer) return
    for (const [id, marker] of markerById) {
      const p = mapPoints.value.find((x) => x.id === id)
      if (!p) continue
      const vis = kindVisible[p.kind] === true && pinMatchesSearch(p)
      if (vis) {
        if (!markersLayer.hasLayer(marker)) markersLayer.addLayer(marker)
      } else {
        if (markersLayer.hasLayer(marker)) markersLayer.removeLayer(marker)
        marker.closePopup()
      }
    }
  }

  function teardownMap() {
    resizeObserver?.disconnect()
    resizeObserver = null
    if (mapInstance) {
      mapInstance.remove()
      mapInstance = null
    }
    markersLayer = null
    markerById.clear()
    mapReady.value = false
    selectedPoiId.value = null
    clearPinSearch()
    if (coordHudRef) coordHudRef.value = '—'
  }

  function setupMap() {
    const el = mapContainer.value
    if (!el) return

    teardownMap()
    mapError.value = ''

    const probe = new Image()
    probe.decoding = 'async'

    probe.onload = () => {
      const h = probe.naturalHeight
      const w = probe.naturalWidth
      if (!h || !w) {
        mapError.value = ERR_DIM
        return
      }

      const bounds = L.latLngBounds(L.latLng(0, 0), L.latLng(h, w))

      mapInstance = L.map(el, {
        crs: L.CRS.Simple,
        minZoom: -3,
        maxZoom: 5,
        zoomSnap: 0.25,
        zoomDelta: 0.5,
        wheelPxPerZoomLevel: 100,
        maxBounds: bounds.pad(0.02),
        maxBoundsViscosity: 0.9,
        attributionControl: false,
        zoomControl: false,
      })

      L.imageOverlay(imageUrl, bounds).addTo(mapInstance)
      L.control.zoom({ position: 'topright' }).addTo(mapInstance)

      if (coordHudRef) {
        mapInstance.on('mousemove', (e) => {
          const lat = e.latlng.lat
          const lng = e.latlng.lng
          const x = Math.min(1, Math.max(0, lng / w))
          const y = Math.min(1, Math.max(0, (h - lat) / h))
          coordHudRef.value = `x: ${x.toFixed(4)}, y: ${y.toFixed(4)}`
        })
        mapInstance.on('mouseout', () => {
          coordHudRef.value = '—'
        })
      }

      markerById.clear()
      markersLayer = L.layerGroup()
      for (const p of mapPoints.value) {
        const latlng = normalizedToLatLng(p.x, p.y, w, h)
        const icon = L.divIcon({
          className: `rtv-map-marker ${markerModifierForPin(p)}`,
          html: buildMapPinHtml(p, kindPinAppearance.value[p.kind]),
          iconSize: [40, 48],
          iconAnchor: [20, 46],
          popupAnchor: [0, -22],
        })
        const marker = L.marker(latlng, { icon, title: pinTitle(p) })
        const hasRichPopup = Boolean(heroForPin(p))
        const popupW = hasRichPopup ? 380 : 300
        marker.bindPopup(buildPopupHtml(p), {
          className: 'rtv-map-popup-wrap',
          maxWidth: popupW,
          offset: L.point(0, -6),
        })
        marker.on('click', () => {
          selectedPoiId.value = p.id
          writePinQuery(p.id)
        })
        marker.on('popupopen', () => {
          selectedPoiId.value = p.id
          writePinQuery(p.id)
        })
        markerById.set(p.id, marker)
        markersLayer.addLayer(marker)
      }
      markersLayer.addTo(mapInstance)

      applyMarkerVisibility()

      mapInstance.fitBounds(bounds)
      mapReady.value = true
      nextTick(() => {
        syncMarkerSelectionClass()
        syncCategoryMasterCheckboxes()
      })

      resizeObserver = new ResizeObserver(() => {
        mapInstance?.invalidateSize({ animate: false })
      })
      resizeObserver.observe(el)
    }

    probe.onerror = () => {
      mapError.value = ERR_LOAD
    }

    probe.src = imageUrl
  }

  onMounted(() => {
    setupMap()
  })

  onUnmounted(() => {
    teardownMap()
  })

  return {
    mapContainer,
    filterRailRef,
    mapError,
    mapReady,
    mapPoints,
    listedPins,
    kindVisible,
    categoryExpanded,
    kindCycle,
    mapCategories,
    mapLegend,
    filterCategoryOrder,
    kindLabelById,
    kindsByCategory,
    categoryChevron,
    countForKind,
    categoryAllOn,
    focusKindPins,
    focusPoi,
    selectPoiFromList,
    syncCategoryMasterCheckboxes,
    pinSearchQuery,
    searchMatchCount,
    focusNextSearchMatch,
    clearPinSearch,
    selectedPoi,
  }
}
