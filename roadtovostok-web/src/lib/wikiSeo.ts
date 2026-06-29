/**
 * Dynamic TDK for wiki detail routes not listed in ROUTE_SEO.
 * Ensures every page includes "Road to Vostok" in title, description, and keywords.
 */
import { weaponSummary } from './wikiCombat'
import weapons from '../data/wiki/weapons.js'
import ammo from '../data/wiki/ammo.js'
import items from '../data/wiki/items-catalog.js'
import shelters from '../data/wiki/shelters.js'
import containers from '../data/wiki/loot-containers.js'
import { RASTER_MAP_PAGES } from '../data/raster-maps/rasterMapPages.js'
import {
  clampMetaDescription,
  ensureBrandDescription,
  ensureBrandTitle,
  mergeKeywords,
  type SeoInput,
} from './seo'

type DbPage = { slug: string; name: string; summary?: string; kicker?: string; category?: string }

function slugFromPath(path: string, prefix: string): string | null {
  if (!path.startsWith(prefix)) return null
  const rest = path.slice(prefix.length)
  return rest && !rest.includes('/') ? rest : null
}

export function buildWeaponDetailSeo(
  weapon: { id: string; name: string; category?: string; caliber?: string | null },
  summary: string,
): SeoInput {
  const path = `/wiki/weapons/${weapon.id}`
  const category = weapon.category?.replace(/_/g, ' ') ?? 'weapon'
  return {
    title: ensureBrandTitle(`${weapon.name} Weapon Stats & Guide`),
    description: ensureBrandDescription(summary),
    keywords: mergeKeywords(
      `road to vostok ${weapon.name.toLowerCase()}`,
      `road to vostok ${category}`,
      weapon.caliber ? `road to vostok ${weapon.caliber}` : '',
      'road to vostok weapons',
      'road to vostok guns',
      'road to vostok ammo pairing',
      'road to vostok EA build 1',
    ),
    canonical: path,
    ogType: 'article',
  }
}

export function buildAmmoDetailSeo(row: {
  id: string
  name: string
  compatibility?: string
}): SeoInput {
  const path = `/wiki/ammo/${row.id}`
  const desc = `${row.name} ammo in Road to Vostok: per-round value, stack size, weight, and compatible weapons for EA Build 1 (Road). Verify stats in your Steam client HUD.`
  return {
    title: ensureBrandTitle(`${row.name} Ammo Stats & Weapon Pairing`),
    description: clampMetaDescription(desc),
    keywords: mergeKeywords(
      `road to vostok ${row.name.toLowerCase()}`,
      'road to vostok ammo',
      'road to vostok calibers',
      'road to vostok magazines',
      row.compatibility ? `road to vostok ${row.compatibility.toLowerCase()}` : '',
      'road to vostok weapons',
    ),
    canonical: path,
    ogType: 'article',
  }
}

export function buildItemDetailSeo(page: DbPage): SeoInput {
  const path = `/wiki/items/${page.slug}`
  const summary =
    page.summary ??
    `${page.name} item dossier for Road to Vostok EA Build 1—stats, spawn notes, and wiki cross-links.`
  return {
    title: ensureBrandTitle(`${page.name} Item Wiki`),
    description: ensureBrandDescription(summary),
    keywords: mergeKeywords(
      `road to vostok ${page.name.toLowerCase()}`,
      'road to vostok items',
      page.category ? `road to vostok ${page.category}` : '',
      page.kicker ? `road to vostok ${page.kicker.split('·')[0]?.trim().toLowerCase()}` : '',
      'road to vostok loot',
      'road to vostok database',
    ),
    canonical: path,
    ogType: 'article',
  }
}

export function buildShelterDetailSeo(page: DbPage): SeoInput {
  const path = `/wiki/shelters/${page.slug}`
  const summary =
    page.summary ??
    `${page.name} player shelter in Road to Vostok—unlock requirements, furniture, and map links for EA Build 1.`
  return {
    title: ensureBrandTitle(`${page.name} Shelter Wiki`),
    description: ensureBrandDescription(summary),
    keywords: mergeKeywords(
      `road to vostok ${page.name.toLowerCase()} shelter`,
      'road to vostok shelters',
      'road to vostok hideout',
      'road to vostok furniture',
      page.kicker ? `road to vostok ${page.kicker.split('·')[0]?.trim().toLowerCase()}` : '',
    ),
    canonical: path,
    ogType: 'article',
  }
}

export function buildLootContainerDetailSeo(page: DbPage): SeoInput {
  const path = `/wiki/loot-containers/${page.slug}`
  const summary =
    page.summary ??
    `${page.name} loot container in Road to Vostok—spawn maps, typical loot pool, and EA Build 1 field notes.`
  return {
    title: ensureBrandTitle(`${page.name} Loot Container Wiki`),
    description: ensureBrandDescription(summary),
    keywords: mergeKeywords(
      `road to vostok ${page.name.toLowerCase()}`,
      'road to vostok loot containers',
      'road to vostok containers',
      page.category ? `road to vostok ${page.category} loot` : '',
      'road to vostok loot table',
    ),
    canonical: path,
    ogType: 'article',
  }
}

export function buildRasterMapSeo(path: string): SeoInput | null {
  const page = RASTER_MAP_PAGES.find((p) => p.path === path)
  if (!page) return null
  return {
    title: ensureBrandTitle(page.title.replace(/^Road to Vostok\s*/i, '').trim() || page.label),
    description: clampMetaDescription(page.description),
    keywords: mergeKeywords(page.keywords, 'road to vostok interactive map', 'road to vostok field manual'),
    ogImage: page.fullMap,
    ogImageAlt: page.ogImageAlt,
    canonical: path,
  }
}

/** Resolve SEO for paths missing from ROUTE_SEO static table. */
export function resolveDynamicSeo(path: string): SeoInput | null {
  const weaponSlug = slugFromPath(path, '/wiki/weapons/')
  if (weaponSlug) {
    const weapon = weapons.find((w) => w.id === weaponSlug)
    if (weapon) {
      return buildWeaponDetailSeo(
        weapon,
        weaponSummary(weapon.name, weapon.category, weapon.caliber),
      )
    }
  }

  const ammoSlug = slugFromPath(path, '/wiki/ammo/')
  if (ammoSlug) {
    const row = ammo.find((a) => a.id === ammoSlug)
    if (row) return buildAmmoDetailSeo(row)
  }

  const itemSlug = slugFromPath(path, '/wiki/items/')
  if (itemSlug) {
    const page = items.find((i) => i.slug === itemSlug)
    if (page) return buildItemDetailSeo(page)
  }

  const shelterSlug = slugFromPath(path, '/wiki/shelters/')
  if (shelterSlug) {
    const page = shelters.find((s) => s.slug === shelterSlug)
    if (page) return buildShelterDetailSeo(page)
  }

  const containerSlug = slugFromPath(path, '/wiki/loot-containers/')
  if (containerSlug) {
    const page = containers.find((c) => c.slug === containerSlug)
    if (page) return buildLootContainerDetailSeo(page)
  }

  if (path.startsWith('/map/') && path !== '/map') {
    return buildRasterMapSeo(path)
  }

  return null
}
