import { mapHrefForPin } from '../data/maps.js'
import { caliberToAmmoId, weaponKicker, weaponSummary } from './wikiCombat'
import weapons from '../data/wiki/weapons.js'

export interface WikiEntryPeer {
  slug: string
  routePath: string
  title: string
}

export interface WikiEntryStat {
  label: string
  value: string
}

export interface WikiEntryLink {
  href: string
  label: string
}

export interface WikiEntryTableRow {
  rowHeader?: string
  cells: string[]
}

export interface WikiEntryTask {
  name: string
  deliver: string
  receive: string
}

export interface WikiEntryTaskTier {
  level: number | string
  tasks: WikiEntryTask[]
}

export type WikiEntrySection =
  | { kind: 'list'; title: string; items: string[]; soft?: boolean }
  | { kind: 'paragraphs'; title: string; paragraphs: string[] }
  | { kind: 'links'; title: string; links: WikiEntryLink[] }
  | { kind: 'ordered'; title: string; items: string[] }
  | { kind: 'definitions'; title: string; pairs: { term: string; desc: string }[] }
  | {
      kind: 'table'
      title: string
      dek?: string
      columns: string[]
      rows: WikiEntryTableRow[]
    }
  | { kind: 'taskTiers'; tiers: WikiEntryTaskTier[] }

export interface WikiEntryCallout {
  label: string
  text: string
}

export interface WikiEntryCta {
  href: string
  label: string
  secondary?: boolean
}

export interface WikiEntryFooter {
  title: string
  html: string
  backHref: string
  backLabel: string
}

export type WikiEntryHeroMode = 'default' | 'weapon' | 'icon' | 'map' | 'portrait'

export interface WikiEntry {
  slug: string
  name: string
  headline?: string
  kicker: string
  summary: string
  topicSlug: string
  topicTitle: string
  topicIndexPath: string
  image?: string
  imageAlt?: string
  heroMode?: WikiEntryHeroMode
  badge?: string
  flags?: string[]
  callout?: WikiEntryCallout
  ctas?: WikiEntryCta[]
  stats?: WikiEntryStat[]
  sections?: WikiEntrySection[]
  footer?: WikiEntryFooter
  peerLimit?: number
  statsTitle?: string
}

export interface WikiTopicMeta {
  topicSlug: string
  topicTitle: string
  topicIndexPath: string
}

export function enrichDbPage(
  page: {
    slug: string
    name: string
    kicker: string
    summary: string
    image?: string
    flags?: string[]
    stats?: WikiEntryStat[]
    sections?: {
      title: string
      text?: string
      items?: string[]
      links?: WikiEntryLink[]
    }[]
  },
  topic: WikiTopicMeta,
): WikiEntry {
  const sections: WikiEntrySection[] = (page.sections ?? []).map((sec) => {
    if (sec.links?.length) return { kind: 'links', title: sec.title, links: sec.links }
    if (sec.items?.length) return { kind: 'list', title: sec.title, items: sec.items }
    if (sec.text) return { kind: 'paragraphs', title: sec.title, paragraphs: [sec.text] }
    return { kind: 'list', title: sec.title, items: [] }
  })

  return {
    slug: page.slug,
    name: page.name,
    kicker: page.kicker,
    summary: page.summary,
    topicSlug: topic.topicSlug,
    topicTitle: topic.topicTitle,
    topicIndexPath: topic.topicIndexPath,
    image: page.image,
    flags: page.flags,
    stats: page.stats,
    sections,
  }
}

function cell(v: unknown) {
  if (v === null || v === undefined || v === '') return '—'
  return String(v)
}

export function weaponToEntry(weapon: {
  id: string
  name: string
  category?: string
  image?: string
  weightKg?: number | string | null
  damage?: number | string | null
  caliber?: string | null
  magazine?: number | string | null
  rpm?: number | string | null
  value?: number | string | null
  cost?: number | string | null
  summary?: string
  fieldNotes?: string[]
  relatedMaps?: WikiEntryLink[]
}): WikiEntry {
  const ammoId = caliberToAmmoId(weapon.caliber)
  const sections: WikiEntrySection[] = []

  if (ammoId && weapon.caliber) {
    sections.push({
      kind: 'links',
      title: 'Ammunition',
      links: [{ href: `/wiki/ammo/${ammoId}`, label: `${weapon.caliber} ammo dossier` }],
    })
  }

  const defaultNotes: string[] = []
  if (weapon.category === 'rifle' || weapon.category === 'smg') {
    defaultNotes.push(
      'Bandit corpses and wooden crates are early sources—check Village and Highway before buying from traders.',
    )
  }
  if (weapon.caliber?.includes('7.62x39')) {
    defaultNotes.push('Minefield military crates and RK-95 cadence make 7.62×39 a border-progression caliber.')
  }
  const fieldNotes = weapon.fieldNotes?.length ? weapon.fieldNotes : defaultNotes
  if (fieldNotes.length) sections.push({ kind: 'list', title: 'Field notes', items: fieldNotes })
  if (weapon.relatedMaps?.length) sections.push({ kind: 'links', title: 'Map context', links: weapon.relatedMaps })

  return {
    slug: weapon.id,
    name: weapon.name,
    kicker: weaponKicker(weapon.category),
    summary: weapon.summary || weaponSummary(weapon.name, weapon.category, weapon.caliber),
    topicSlug: 'weapons',
    topicTitle: 'Weapons',
    topicIndexPath: '/wiki/weapons',
    image: weapon.image,
    heroMode: 'weapon',
    peerLimit: 8,
    statsTitle: 'Combat stats',
    stats: [
      { label: 'Weight', value: `${cell(weapon.weightKg)} kg` },
      { label: 'Damage', value: cell(weapon.damage) },
      { label: 'Caliber', value: cell(weapon.caliber) },
      { label: 'Magazine', value: cell(weapon.magazine) },
      { label: 'RPM', value: cell(weapon.rpm) },
      { label: 'Trader value', value: cell(weapon.value) },
      { label: 'Trader cost', value: cell(weapon.cost) },
    ],
    sections,
  }
}

export function ammoToEntry(row: {
  id: string
  name: string
  category?: string
  image?: string
  valueEuro?: number | null
  weightKg?: number | null
  maxStack?: number | null
  compatibility?: string
  summary?: string
  stashNotes?: string[]
}): WikiEntry {
  const CATEGORY_KICKER: Record<string, string> = {
    pistol_smg: 'Pistol & SMG round',
    rifle: 'Intermediate rifle round',
    full_power: 'Full-power rifle round',
    shotgun: 'Shotgun shell',
  }

  const weaponMap = new Map(weapons.map((w) => [w.name, w.id]))
  const compatLinks: WikiEntryLink[] = (row.compatibility ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((name) => {
      const id = weaponMap.get(name)
      return id ? { href: `/wiki/weapons/${id}`, label: name } : null
    })
    .filter((l): l is WikiEntryLink => Boolean(l))

  const sections: WikiEntrySection[] = []
  if (compatLinks.length) sections.push({ kind: 'links', title: 'Compatible weapons', links: compatLinks })

  const stashText =
    row.stashNotes?.join(' ') ||
    `Stack caps affect extract planning—full stacks of ${row.name} are heavy; split between rig, backpack, and shelter stash before Vostok permadeath runs.`
  sections.push({ kind: 'paragraphs', title: 'Stash notes', paragraphs: [stashText] })

  return {
    slug: row.id,
    name: row.name,
    kicker: CATEGORY_KICKER[row.category || ''] || 'Ammunition',
    summary:
      row.summary ||
      `${row.name} — per-round economy and stack limits for EA Build 1 stash planning. Pair with compatible weapons before long extracts.`,
    topicSlug: 'ammo',
    topicTitle: 'Ammo',
    topicIndexPath: '/wiki/ammo',
    image: row.image,
    heroMode: 'icon',
    stats: [
      {
        label: 'Value (100% condition)',
        value: row.valueEuro != null ? `${row.valueEuro} € per round` : '—',
      },
      { label: 'Weight', value: row.weightKg != null ? `${row.weightKg} kg per round` : '—' },
      { label: 'Max stack', value: row.maxStack != null ? `${row.maxStack} rounds` : '—' },
    ],
    sections,
  }
}

export function mapToEntry(page: {
  slug: string
  name: string
  kicker: string
  summary: string
  image?: string
  demoNote?: string
  highlights?: string[]
  npcs?: string[]
  lootContainers?: { name: string; quantity: number | string; loot: string }[]
  lootTips?: string[]
  weaponsNote?: string
  rasterPath?: string
  worldPinId?: string
  showWorldAtlas?: boolean
  legacy?: boolean
}): WikiEntry {
  const showWorldAtlas = page.showWorldAtlas !== false && !page.legacy
  const atlasPinId = page.worldPinId ?? page.slug
  const ctas: WikiEntryCta[] = []

  if (page.rasterPath) {
    ctas.push({
      href: page.rasterPath,
      label: `Open interactive raster map — ${page.name}`,
    })
  }
  if (showWorldAtlas) {
    ctas.push({
      href: mapHrefForPin(atlasPinId),
      label: `World atlas pin — ${page.name}`,
      secondary: true,
    })
  }

  const sections: WikiEntrySection[] = []
  if (page.highlights?.length) {
    sections.push({ kind: 'list', title: 'Why this map matters', items: page.highlights })
  }
  if (page.npcs?.length) {
    sections.push({ kind: 'paragraphs', title: 'NPCs, traders, and threats', paragraphs: page.npcs })
  }
  if (page.lootContainers?.length) {
    sections.push({
      kind: 'table',
      title: 'Notable loot containers',
      dek: 'Quantities are orientation data for EA Build 1—verify after major patches.',
      columns: ['Container', 'Qty', 'Typical loot'],
      rows: page.lootContainers.map((row) => ({
        rowHeader: row.name,
        cells: [String(row.quantity), row.loot],
      })),
    })
  }
  if (page.lootTips?.length) {
    sections.push({ kind: 'list', title: 'Loot and movement tips', items: page.lootTips, soft: true })
  }
  if (page.weaponsNote) {
    sections.push({
      kind: 'paragraphs',
      title: 'Weapon spawn snapshot',
      paragraphs: [page.weaponsNote],
    })
  }

  return {
    slug: page.slug,
    name: page.name,
    headline: `Road to Vostok ${page.name} Map`,
    kicker: page.kicker,
    summary: page.summary,
    topicSlug: 'maps',
    topicTitle: 'Maps',
    topicIndexPath: '/wiki/maps',
    image: page.image,
    imageAlt: `Road to Vostok ${page.name} map overview`,
    heroMode: 'map',
    badge: page.legacy ? 'Legacy' : undefined,
    callout: page.demoNote ? { label: 'Build note', text: page.demoNote } : undefined,
    ctas,
    sections,
    footer: {
      title: 'Pair with the field manual',
      html: `Cross-check this ${page.name} write-up with our <a href="/map">interactive world map</a>, <a href="/wiki/weapons">weapons</a> dossiers, and <a href="/wiki/ammo">ammo</a> guides.`,
      backHref: '/wiki/maps',
      backLabel: 'Maps index',
    },
  }
}

export function npcToEntry(page: {
  slug: string
  name: string
  kicker: string
  summary: string
  image?: string
  mapPinId?: string
  equipment?: string[]
  behaviours?: { title: string; text: string }[]
  notes?: string[]
  quirks?: string[]
  tradeNotes?: string[]
  restockNotes?: string[]
  taskTiers?: WikiEntryTaskTier[]
  locationSteps?: string[]
}): WikiEntry {
  const isBandit = Boolean(page.equipment?.length)
  const sections: WikiEntrySection[] = []
  const ctas: WikiEntryCta[] = []

  if (page.mapPinId) {
    ctas.push({
      href: mapHrefForPin(page.mapPinId),
      label: 'Show this context on the world map',
    })
  }

  if (isBandit) {
    if (page.equipment?.length) sections.push({ kind: 'list', title: 'Equipment & loot', items: page.equipment })
    if (page.behaviours?.length) {
      sections.push({
        kind: 'definitions',
        title: 'Behaviours',
        pairs: page.behaviours.map((b) => ({ term: b.title, desc: b.text })),
      })
    }
    if (page.notes?.length) sections.push({ kind: 'list', title: 'Field notes', items: page.notes })
    if (page.quirks?.length) {
      sections.push({ kind: 'list', title: 'Reported quirks', items: page.quirks, soft: true })
    }
  } else {
    if (page.tradeNotes?.length) sections.push({ kind: 'list', title: 'Trade', items: page.tradeNotes })
    if (page.restockNotes?.length) sections.push({ kind: 'list', title: 'Restocking', items: page.restockNotes })
    if (page.taskTiers?.length) sections.push({ kind: 'taskTiers', tiers: page.taskTiers })
    if (page.locationSteps?.length) sections.push({ kind: 'ordered', title: 'Location', items: page.locationSteps })
  }

  return {
    slug: page.slug,
    name: page.name,
    headline: `Road to Vostok ${page.name}`,
    kicker: page.kicker,
    summary: page.summary,
    topicSlug: 'npcs',
    topicTitle: 'NPCs',
    topicIndexPath: '/wiki/npcs',
    image: page.image,
    imageAlt: page.name,
    heroMode: 'portrait',
    ctas,
    sections,
    footer: {
      title: 'On this manual',
      html: `NPC dossiers cross-link <a href="/wiki/weapons">weapons</a>, <a href="/wiki/ammo">ammo</a>, and <a href="/wiki/maps">maps</a> on the same site. Tasks and stock can change with builds—confirm in your client.`,
      backHref: '/wiki/npcs',
      backLabel: 'NPC index',
    },
  }
}

export function peersFromCatalog<T extends { slug: string; name: string }>(
  items: T[],
  basePath: string,
  idKey: keyof T = 'slug' as keyof T,
): WikiEntryPeer[] {
  return items.map((item) => ({
    slug: String(item[idKey]),
    routePath: `${basePath}/${String(item[idKey])}`,
    title: item.name,
  }))
}
