/** Legacy SPA URL compatibility (from template-web/src/router/index.js). */

export type LegacyDest = { path: string; hash?: string }

export const LEGACY_WIKI_SECTION: Record<string, LegacyDest> = {
  'pillar-weapons': { path: '/wiki/weapons' },
  'pillar-survival': { path: '/wiki/ammo' },
  'pillar-tasks': { path: '/wiki/npcs' },
  'pillar-maps': { path: '/wiki/maps' },
  'quick-finder': { path: '/wiki' },
  'community-wiki': { path: '/wiki', hash: '#wiki-community' },
  closing: { path: '/wiki' },
  'finder-official': { path: '/wiki', hash: '#hub-official' },
  'finder-versions': { path: '/wiki', hash: '#hub-builds' },
  'finder-weapons': { path: '/wiki/weapons' },
  'finder-armor-gear': { path: '/wiki' },
  'finder-items': { path: '/wiki/ammo' },
  'finder-ammo': { path: '/wiki/ammo' },
  'finder-world': { path: '/wiki/maps' },
  'finder-npcs': { path: '/wiki/npcs' },
}

export const LEGACY_GUIDES_HASH: Record<string, LegacyDest> = {
  '#weapons': { path: '/wiki/weapons' },
  '#survival': { path: '/wiki/ammo' },
  '#tasks': { path: '/wiki/npcs' },
  '#maps': { path: '/wiki/maps' },
  '#wiki-index': { path: '/wiki' },
  '#guides-community-wiki': { path: '/wiki', hash: '#wiki-community' },
}

export const LEGACY_WIKI_FINDER_HASH: Record<string, LegacyDest> = {
  '#wiki-official': { path: '/wiki', hash: '#hub-official' },
  '#wiki-versions': { path: '/wiki', hash: '#hub-builds' },
  '#wiki-weapons': { path: '/wiki/weapons' },
  '#wiki-armor-gear': { path: '/wiki' },
  '#wiki-items': { path: '/wiki/ammo' },
  '#wiki-ammo': { path: '/wiki/ammo' },
  '#wiki-world': { path: '/wiki/maps' },
  '#wiki-npcs': { path: '/wiki/npcs' },
}

export function resolveLegacyWikiSection(key: string | null | undefined): LegacyDest | null {
  if (!key || typeof key !== 'string') return null
  if (LEGACY_WIKI_SECTION[key]) return LEGACY_WIKI_SECTION[key]
  if (key.startsWith('finder-')) {
    const mapped = LEGACY_WIKI_SECTION[`finder-${key.slice(7)}`]
    if (mapped) return mapped
  }
  return null
}

export function resolveLegacyHash(
  hash: string,
  maps: Record<string, LegacyDest>[],
): LegacyDest | null {
  if (!hash) return null
  for (const map of maps) {
    const dest = map[hash]
    if (dest) return dest
  }
  if (hash.startsWith('#wiki-')) {
    const dest = LEGACY_WIKI_FINDER_HASH[hash]
    if (dest) return dest
  }
  return null
}

export function legacyRedirectUrl(dest: LegacyDest): string {
  return dest.hash ? `${dest.path}${dest.hash}` : dest.path
}
