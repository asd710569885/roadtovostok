/**
 * 地图图钉：内联 SVG（统一 24×24，`currentColor` 随气泡上的白色字形）+
 * 气泡渐变由各图 `mapCategories[].kinds[].pinColor` 提供。
 */

const VIEWBOX_24 = '0 0 24 24'

/* —— Map / POI —— */

const SVG_LOCATION =
  '<path fill="currentColor" d="M12 2.25c-3.35 0-6 2.65-6 5.9 0 3.35 4.85 9.55 6 11.05 1.15-1.5 6-7.7 6-11.05 0-3.25-2.65-5.9-6-5.9zm0 8.35a2.45 2.45 0 110-4.9 2.45 2.45 0 010 4.9z"/>'

const SVG_HIDEOUT =
  '<path fill="currentColor" d="M4 11L12 4l8 7v9H13.5v-6h-3v6H4V11z"/>'

const SVG_TRADER =
  '<path fill="currentColor" d="M12 10.2a2.9 2.9 0 100-5.8 2.9 2.9 0 000 5.8zm-6.2 9.1v-.9c0-2.6 3.1-4.2 6.2-4.2s6.2 1.6 6.2 4.2v.9H5.8z"/><path fill="currentColor" d="M3.5 8.8l1.4-.5 1.1 3.1-1.4.5-1.1-3.1zm15.6 0l-1.4-.5-1.1 3.1 1.4.5 1.1-3.1z" opacity=".85"/>'

const SVG_KEY =
  '<path fill="currentColor" d="M15.2 2.4a3.4 3.4 0 00-3.2 4.6L3.4 15.6V21h5.4l8.6-8.6a3.4 3.4 0 10-2.2-6zm0 1.9a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM6.8 16.8h2.2v2.4H6.8v-2.4z"/>'

const SVG_RADIO =
  '<path fill="currentColor" d="M9 3.2h5.2v1.6H9V3.2zm-3.2 3.6h11.6c.9 0 1.6.7 1.6 1.6v11.2c0 .9-.7 1.6-1.6 1.6H5.8c-.9 0-1.6-.7-1.6-1.6V8.4c0-.9.7-1.6 1.6-1.6zm1.8 3.4V17h8V10.2h-8zm2.4 2.2h3.2v2.6h-3.2v-2.6z"/><path fill="currentColor" d="M11.2 2.4h1.6v2.4h-1.6V2.4z"/>'

const SVG_FISHING =
  '<path fill="currentColor" d="M2.4 12c2.4-.9 4.8-1.3 6.9-1.3 2.6 0 5 .7 7 2l1.3-1v1.3l-1.3 1c-2-1.3-4.4-2-7-2-2.1 0-4.5.4-6.9 1.3v-1.3zm7.5-4.5a1.7 1.7 0 113.4 0 1.7 1.7 0 01-3.4 0z"/><path fill="currentColor" d="M19.2 11.3v1.4l-2.2 1.6v-4.6l2.2 1.6z" opacity=".9"/>'

const SVG_LOCK =
  '<path fill="currentColor" d="M17 10.2V8.4a5 5 0 00-10 0v1.8H5.6c-1 0-1.8.8-1.8 1.8v8.4c0 1 .8 1.8 1.8 1.8h12.8c1 0 1.8-.8 1.8-1.8V12c0-1-.8-1.8-1.8-1.8H17zm-7.8-1.8a3.8 3.8 0 017.6 0v1.8H9.2V8.4zm3.8 6.4a1.8 1.8 0 11-.001 3.601A1.8 1.8 0 0113 14.8z"/>'

/* —— Fire —— */

const SVG_FIRE_CANDLE =
  '<path fill="currentColor" d="M12 3.2s-1.4 1.8-1.4 3.2c0 1.1.7 1.8 1.4 1.8s1.4-.7 1.4-1.8c0-1.4-1.4-3.2-1.4-3.2zm-1.8 6.4h3.6V21h-3.6V9.6z"/>'

const SVG_FIRE_POT =
  '<path fill="currentColor" d="M12 4.4s2.8 2.4 2.8 5.2c0 .5-.4.9-.9.9H10.1c-.5 0-.9-.4-.9-.9 0-2.8 2.8-5.2 2.8-5.2zm-3.6 7.2h7.2a2 2 0 012 2v.8H6.4v-.8a2 2 0 012-2zm1.2 3.6h5.6v4a2.2 2.2 0 01-2.2 2.2h-1.2a2.2 2.2 0 01-2.2-2.2v-4z"/>'

const SVG_FIRE_BARREL =
  '<path fill="currentColor" d="M12 3.6s-.8 1.4-.3 2.4c.4.8 1.2.8 1.8.3.6 1.2.2 2.4-.4 3.2H10.9c-.6-.8-1-2-.4-3.2.6.5 1.4.5 1.8-.3.5-1-.3-2.4-.3-2.4z"/><path fill="currentColor" d="M7.2 10.8h9.6v1.6c0 2-2.2 3.6-4.8 3.6s-4.8-1.6-4.8-3.6v-1.6zm1.6-2.4c1 .4 2.2.6 3.2.6s2.2-.2 3.2-.6c-.6-.6-1.8-1-3.2-1s-2.6.4-3.2 1zm0 10.4h6.4V20a2 2 0 01-2 2h-2.4a2 2 0 01-2-2v-1.2z"/>'

const SVG_BOLT =
  '<path fill="currentColor" d="M13.2 2L4.8 14.4h6.4l-1.6 9.6L17.6 12h-6.4L13.2 2z"/>'

/* —— Loot containers（村庄图细分）—— */

const SVG_LOOT_CORPSE =
  '<path fill="currentColor" d="M7.2 5.6h9.6a2.4 2.4 0 012.4 2.4v9.6a2.4 2.4 0 01-2.4 2.4H7.2a2.4 2.4 0 01-2.4-2.4V8a2.4 2.4 0 012.4-2.4zm1.2 3.6h7.2v1.4H8.4V9.2zm0 3.4h7.2v1.4H8.4v-1.4zm0 3.2h7.2v1.4H8.4v-1.4z"/>'

const SVG_LOOT_BOXES =
  '<path fill="currentColor" d="M3.6 8.8h7.2v7.2H3.6V8.8zm9.6 4h7.2v9.6h-7.2v-9.6zM5.2 10.4h4v4h-4v-4zm11.2 5.6h4v4h-4v-4z"/>'

const SVG_LOOT_CABINET =
  '<path fill="currentColor" d="M4.8 3.6h14.4v16.8H4.8V3.6zm2.4 2.4h4.8v12H7.2V6zm7.2 0h4.8v12h-4.8V6zm-6 5.6h2v2h-2v-2zm7.2 0h2v2h-2v-2z"/>'

const SVG_LOOT_MIL_CRATE =
  '<path fill="currentColor" d="M4.8 7.2h14.4v10.8H4.8V7.2zm2.4 2.4v6h9.6v-6H7.2zm4.8-5.6V7.2h2.4V4h-2.4z"/><path fill="currentColor" d="M9.6 10.8h4.8v4.8H9.6v-4.8zM7.2 12.6h9.6v1.2H7.2v-1.2z"/>'

const SVG_LOOT_SPEC_CRATE =
  '<path fill="currentColor" d="M4.8 7.2h14.4v10.8H4.8V7.2zm2.4 2.4v6h9.6v-6H7.2z"/><path fill="currentColor" d="M12 9.6l1.8 1.8-1.8 1.8-1.8-1.8 1.8-1.8z"/>'

const SVG_LOOT_ELECTRIC =
  '<path fill="currentColor" d="M4.8 5.6h14.4v12.8H4.8V5.6zm2.4 2.4v8h9.6v-8H7.2zm3.6 1.2h2.4l-1.2 3.2h2.4l-3.6 5.6h-2.4l2.4-3.6H9.6l1.2-5.2z"/>'

const SVG_LOOT_FIREPLACE =
  '<path fill="currentColor" d="M6.4 20V9.6c0-3.1 2.5-5.6 5.6-5.6s5.6 2.5 5.6 5.6V20H6.4zm4-9.6c0 1.4.6 2.6 1.6 3.2.4-1.2.6-2.6.2-4-.4-1-1.2-1.4-1.8-.8-.8 1-1 2.6 0 2.4z"/>'

const SVG_LOOT_FREEZER =
  '<path fill="currentColor" d="M5.6 3.6h12.8v16.8H5.6V3.6zm2.4 2.4v12h8V6h-8zm4 2.4h1.6v8H12V8.4zm-3.2 2.4h6.4v1.2H8.8v-1.2z"/><path fill="currentColor" d="M9.2 4.8h5.6v1.2H9.2V4.8z" opacity=".7"/>'

const SVG_LOOT_FRIDGE =
  '<path fill="currentColor" d="M7.2 3.6h9.6v16.8H7.2V3.6zm2.4 2.4v12h4.8V6H9.6zm2.4 3.6h1.6v6.4h-1.6V9.6z"/>'

const SVG_LOOT_FUSEBOX =
  '<path fill="currentColor" d="M4.8 6h14.4v12H4.8V6zm2.4 2.4v7.2h9.6v-7.2H7.2zm1.6 1.2h6.4v1.2H8.8v-1.2zm0 2.4h6.4v1.2H8.8v-1.2zm0 2.4h6.4v1.2H8.8v-1.2z"/>'

const SVG_LOOT_GARBAGE =
  '<path fill="currentColor" d="M18.4 6.4h-4l-1.2-1.2H10l-1.2 1.2H5.6v2.4h12.8V6.4zM7.2 10v9.6a2 2 0 002 2h5.6a2 2 0 002-2V10H7.2zm2.4 2.4H12v6.4H9.6v-6.4zm3.6 0h2.4v6.4h-2.4v-6.4z"/>'

const SVG_LOOT_MAILBOX =
  '<path fill="currentColor" d="M4.8 9.6h14.4v9.6H4.8V9.6zm2.4 2.4v4.8h9.6v-4.8H7.2zm4.8-7.2v4.8h2.4V4.8h-2.4zm5.6 4.8h2l-2-4h-4l-2 4h4z"/>'

const SVG_LOOT_MEDICAL =
  '<path fill="currentColor" d="M4.8 4.8h14.4v14.4H4.8V4.8zm2.4 2.4v9.6h9.6V7.2H7.2zm4 1.6h2.4v3.2h3.2v2.4h-3.2v3.2H11.2v-3.2H8v-2.4h3.2V8.8z"/>'

const SVG_LOOT_NIGHTSTAND =
  '<path fill="currentColor" d="M8 7.2h8v13.6H8V7.2zm2.4 2.4v8.8h3.2V9.6h-3.2zm2.4 4.8h1.6v2.4h-1.6v-2.4z"/>'

const SVG_LOOT_OFFICE =
  '<path fill="currentColor" d="M5.6 2.4h12.8v19.2H5.6V2.4zm2.4 2.4v14.4h3.2V4.8H8zm5.6 0v14.4h3.2V4.8h-3.2zm-4.8 4.8h1.6v2.4h-1.6V9.6zm5.6 0h1.6v2.4h-1.6V9.6z"/>'

const SVG_LOOT_STOVE =
  '<path fill="currentColor" d="M4.8 8.8h14.4v10.4H4.8V8.8zm2.4 2.4a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4zm4 0a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4zm4 0a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4zM7.2 14.4h9.6v2.4H7.2v-2.4z"/>'

const SVG_LOOT_TENT =
  '<path fill="currentColor" d="M12 4L4 20h16L12 4zm0 5.5L8 18.2h8L12 9.5z"/>'

const SVG_LOOT_WOOD_CRATE =
  '<path fill="currentColor" d="M4.8 8.4l7.2 4 7.2-4v9.2l-7.2 4-7.2-4V8.4zm2.4 1.8v5.8l4.8 2.6v-6.4l-4.8-2zm9.6 0l-4.8 2v6.4l4.8-2.6v-5.8z"/><path fill="currentColor" d="M12 6.4 6.8 8.4 12 11.2 17.2 8.4 12 6.4z"/>'

const SVG_ITEM_PICKUP =
  '<path fill="currentColor" d="M4.4 8.8l7.6-3.2 7.6 3.2v9.6l-7.6 3.2-7.6-3.2V8.8zm2.4 2v6.4l5.2 2.2v-7.2l-5.2-1.4zm7.6 1.4l5.2 1.4v7.2l-5.2-2.2v-6.4z"/><path fill="currentColor" d="M12 5.2 7.2 7.2 12 9.2 16.8 7.2 12 5.2z"/>'

/* —— Ground loot —— */

const SVG_GROUND_CIVILIAN =
  '<path fill="currentColor" d="M4.8 17.6c0-1.2 1.6-2.2 3.4-2.2s3.4 1 3.4 2.2H4.8zm6.8-6.4c0-1.1 1.4-2 3-2s3 .9 3 2h-6zm-7.6-5.6c0-1 1.2-1.8 2.6-1.8s2.6.8 2.6 1.8H4z"/><circle fill="currentColor" cx="17.2" cy="15.2" r="1.4" opacity=".85"/><circle fill="currentColor" cx="19.2" cy="18.4" r="1" opacity=".75"/>'

const SVG_GROUND_INDUSTRIAL =
  '<path fill="currentColor" d="M12 7l1.1-2 2 .8.7 2.2H18l.6 2.2-1.6 1.4 1.6 1.4-.6 2.2h-3.2l-.7 2.2-2 .8L12 17l-1.1 2-2-.8-.7-2.2H5l-.6-2.2 1.6-1.4-1.6-1.4.6-2.2h3.2l.7-2.2 2-.8L12 7zm0 3.6a3 3 0 100 6 3 3 0 000-6z"/>'

/* —— 通用 / 其它地图 —— */

const SVG_CRATE =
  '<path fill="currentColor" d="M4.8 8.4l7.2 4 7.2-4v9.2l-7.2 4-7.2-4V8.4zm2.4 1.8v5.8l4.8 2.6v-6.4l-4.8-2zm9.6 0l-4.8 2v6.4l4.8-2.6v-5.8z"/>'

const SVG_FRIDGE =
  '<path fill="currentColor" d="M7.2 3.6h9.6v16.8H7.2V3.6zm2.4 2.4v12h4.8V6H9.6zm2.4 3.6h1.6v6.4h-1.6V9.6z"/>'

const SVG_CABINET =
  '<path fill="currentColor" d="M4.8 3.6h14.4v16.8H4.8V3.6zm2.4 2.4h4.8v12H7.2V6zm7.2 0h4.8v12h-4.8V6zm-6 5.6h2v2h-2v-2zm7.2 0h2v2h-2v-2z"/>'

const SVG_TRASH =
  '<path fill="currentColor" d="M18.4 6.4h-4l-1.2-1.2H10l-1.2 1.2H5.6v2.4h12.8V6.4zM7.2 10v9.6a2 2 0 002 2h5.6a2 2 0 002-2V10H7.2zm2.4 2.4H12v6.4H9.6v-6.4zm3.6 0h2.4v6.4h-2.4v-6.4z"/>'

const SVG_WRENCH =
  '<path fill="currentColor" d="M22.2 18.4l-8.4-8.4c.8-2.1.4-4.6-1.4-6.4-1.8-1.8-4.6-2.2-6.8-1.2L8.4 6l-2.8 2.8-3.8-3.6C.8 7.4 1.2 10.2 3 12c1.8 1.8 4.2 2.2 6.4 1.4l8.4 8.4c.4.4 1 .4 1.4 0l2.2-2.2c.4-.4.4-1 0-1.2z"/>'

const SVG_PERSON =
  '<path fill="currentColor" d="M12 10.2a2.9 2.9 0 100-5.8 2.9 2.9 0 000 5.8zm-6.2 9.1v-.9c0-2.6 3.1-4.2 6.2-4.2s6.2 1.6 6.2 4.2v.9H5.8z"/>'

const SVG_CLIPBOARD =
  '<path fill="currentColor" d="M16.8 3.6h-3.4c-.4-1.2-1.4-2-2.4-2s-2 .8-2.4 2H5.2c-1 0-1.8.8-1.8 1.8v14.4c0 1 .8 1.8 1.8 1.8h12.8c1 0 1.8-.8 1.8-1.8V5.4c0-1-.8-1.8-1.8-1.8zm-4.8 0c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zm-1.2 14.4H8.4v-2.4h6v2.4zm2.4-4.8H8.4v-2.4h8.4v2.4zm0-4.8H8.4V8.4h8.4v2.4z"/>'

const SVG_EXTRACTION =
  '<g fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4"/><path d="M12 3l-1.2 2.2M12 3l1.2 2.2M12 21l-1.2-2.2M12 21l1.2-2.2M3 12l2.2-1.2M3 12l2.2 1.2M21 12l-2.2-1.2M21 12l-2.2 1.2"/></g>'

const SVG_ALERT =
  '<path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>'

/**
 * `pinIcon` → 内联 SVG（仅 path/g，勿包外层 `<svg>`）。
 */
export const PIN_ICON_BY_ID = {
  location: { viewBox: VIEWBOX_24, inner: SVG_LOCATION },
  landmark: { viewBox: VIEWBOX_24, inner: SVG_LOCATION },
  hideout: { viewBox: VIEWBOX_24, inner: SVG_HIDEOUT },
  classroom: { viewBox: VIEWBOX_24, inner: SVG_HIDEOUT },
  trader: { viewBox: VIEWBOX_24, inner: SVG_TRADER },
  key: { viewBox: VIEWBOX_24, inner: SVG_KEY },
  radio: { viewBox: VIEWBOX_24, inner: SVG_RADIO },
  fishing_spot: { viewBox: VIEWBOX_24, inner: SVG_FISHING },
  locked_structure: { viewBox: VIEWBOX_24, inner: SVG_LOCK },

  fire_candle: { viewBox: VIEWBOX_24, inner: SVG_FIRE_CANDLE },
  fire_pot: { viewBox: VIEWBOX_24, inner: SVG_FIRE_POT },
  fire_barrel: { viewBox: VIEWBOX_24, inner: SVG_FIRE_BARREL },
  bolt: { viewBox: VIEWBOX_24, inner: SVG_BOLT },

  loot_corpse: { viewBox: VIEWBOX_24, inner: SVG_LOOT_CORPSE },
  loot_boxes: { viewBox: VIEWBOX_24, inner: SVG_LOOT_BOXES },
  loot_cabinet: { viewBox: VIEWBOX_24, inner: SVG_LOOT_CABINET },
  loot_mil_crate: { viewBox: VIEWBOX_24, inner: SVG_LOOT_MIL_CRATE },
  loot_spec_crate: { viewBox: VIEWBOX_24, inner: SVG_LOOT_SPEC_CRATE },
  loot_electric: { viewBox: VIEWBOX_24, inner: SVG_LOOT_ELECTRIC },
  loot_fireplace: { viewBox: VIEWBOX_24, inner: SVG_LOOT_FIREPLACE },
  loot_freezer: { viewBox: VIEWBOX_24, inner: SVG_LOOT_FREEZER },
  loot_fridge: { viewBox: VIEWBOX_24, inner: SVG_LOOT_FRIDGE },
  loot_fusebox: { viewBox: VIEWBOX_24, inner: SVG_LOOT_FUSEBOX },
  loot_garbage: { viewBox: VIEWBOX_24, inner: SVG_LOOT_GARBAGE },
  loot_mailbox: { viewBox: VIEWBOX_24, inner: SVG_LOOT_MAILBOX },
  loot_medical: { viewBox: VIEWBOX_24, inner: SVG_LOOT_MEDICAL },
  loot_nightstand: { viewBox: VIEWBOX_24, inner: SVG_LOOT_NIGHTSTAND },
  loot_office: { viewBox: VIEWBOX_24, inner: SVG_LOOT_OFFICE },
  loot_stove: { viewBox: VIEWBOX_24, inner: SVG_LOOT_STOVE },
  loot_tent: { viewBox: VIEWBOX_24, inner: SVG_LOOT_TENT },
  loot_wood_crate: { viewBox: VIEWBOX_24, inner: SVG_LOOT_WOOD_CRATE },

  ground_civilian: { viewBox: VIEWBOX_24, inner: SVG_GROUND_CIVILIAN },
  ground_industrial: { viewBox: VIEWBOX_24, inner: SVG_GROUND_INDUSTRIAL },

  item_pickup: { viewBox: VIEWBOX_24, inner: SVG_ITEM_PICKUP },
  electronics: { viewBox: VIEWBOX_24, inner: SVG_ITEM_PICKUP },

  crate: { viewBox: VIEWBOX_24, inner: SVG_CRATE },
  fridge: { viewBox: VIEWBOX_24, inner: SVG_FRIDGE },
  cabinet: { viewBox: VIEWBOX_24, inner: SVG_CABINET },
  garbage_bag: { viewBox: VIEWBOX_24, inner: SVG_GROUND_CIVILIAN },
  trash: { viewBox: VIEWBOX_24, inner: SVG_TRASH },
  tools: { viewBox: VIEWBOX_24, inner: SVG_WRENCH },
  tasks: { viewBox: VIEWBOX_24, inner: SVG_CLIPBOARD },
  quest: { viewBox: VIEWBOX_24, inner: SVG_CLIPBOARD },
  extraction: { viewBox: VIEWBOX_24, inner: SVG_EXTRACTION },
  enemy_spawn: { viewBox: VIEWBOX_24, inner: SVG_ALERT },
}

function safeIconToken(raw) {
  const s = String(raw ?? '')
    .trim()
    .replace(/[^a-z0-9_-]/gi, '')
  return s || 'location'
}

function escapeAttr(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
    .replaceAll('<', '&lt;')
}

/** 仅允许十六进制色，避免把任意字符串写进 style */
function isSafeHexColor(s) {
  return typeof s === 'string' && /^#[0-9a-f]{3,8}$/i.test(s.trim())
}

function bubbleStyleFromColor(hex) {
  const c = hex.trim()
  return `background:linear-gradient(145deg,color-mix(in srgb,${c} 88%,#fff),color-mix(in srgb,${c} 42%,#020810));border-color:color-mix(in srgb,#000 32%,${c})`
}

function dataKindAttr(pin) {
  const s = String(pin?.kind ?? '')
    .trim()
    .replace(/[^a-z0-9_-]/gi, '')
  return s || 'default'
}

/**
 * @param {{ kind?: string, pinIcon?: string }} pin
 * @param {{ pinIcon?: string, pinColor?: string }} [fromKind] 来自 `mapCategories[].kinds[]`（或世界图等调用方手写）
 * @returns {string} Leaflet divIcon 用 HTML
 */
export function buildMapPinHtml(pin, fromKind) {
  const iconId = safeIconToken(fromKind?.pinIcon ?? pin?.pinIcon ?? 'location')
  const spec = PIN_ICON_BY_ID[iconId] ?? PIN_ICON_BY_ID.location
  const vb = escapeAttr(spec.viewBox)
  const kindAttr = escapeAttr(dataKindAttr(pin))

  const colorRaw = fromKind?.pinColor ?? pin?.pinColor
  const bubbleAttrs =
    colorRaw && isSafeHexColor(colorRaw)
      ? ` style="${escapeAttr(bubbleStyleFromColor(colorRaw.trim()))}"`
      : ''

  return `<div class="rtv-map-pin" data-kind="${kindAttr}"><div class="rtv-map-pin__bubble"${bubbleAttrs}><svg class="rtv-map-pin__svg" viewBox="${vb}" width="15" height="15" aria-hidden="true" focusable="false">${spec.inner}</svg></div></div>`
}
