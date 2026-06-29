/**
 * Maps weapon caliber strings to ammo catalog ids.
 */
export function caliberToAmmoId(caliber: string | null | undefined): string | null {
  if (!caliber || caliber === '—') return null
  const c = caliber.toLowerCase()
  if (c.includes('5.45')) return '5-45x39'
  if (c.includes('7.62x39')) return '7-62x39'
  if (c.includes('7.62x54')) return '7-62x54r'
  if (c.includes('9x39')) return null
  if (c.includes('9x19')) return '9x19'
  if (c.includes('4.6')) return '4-6x30'
  if (c.includes('.308')) return '308'
  if (c.includes('.223') || c.includes('5.56')) return '308'
  if (c.includes('12')) return '12-ga'
  return null
}

const CATEGORY_KICKER: Record<string, string> = {
  rifle: 'Assault rifle',
  knife: 'Melee',
  smg: 'SMG / PDW',
  shotgun: 'Shotgun',
  bolt_action: 'Bolt-action',
  semi_auto: 'Semi-automatic DMR',
}

const CATEGORY_CONTEXT: Record<string, string> = {
  rifle:
    'Service and assault rifles anchor mid-game loadouts—balance RPM, recoil, and ammo weight before pushing Border or Vostok.',
  knife:
    'Melee stays relevant for silent clears and weight savings; damage values assume clean hits without armor mitigation quirks.',
  smg: 'SMGs excel in building clears and Highway transits—magazine discipline matters when bandits push during reloads.',
  shotgun:
    'Shotguns trade RPM for burst damage in CQB; count shells before committing to multi-floor School or Apartments clears.',
  bolt_action:
    'Bolt-actions reward positioning with high per-shot damage—pair with full-power ammo and avoid panic re-peeks.',
  semi_auto:
    'Semi-auto marksman rifles bridge sniper lanes and medium range—manage recoil between shots on open Highway sightlines.',
}

export function weaponKicker(category?: string) {
  return CATEGORY_KICKER[category || ''] || 'Weapon'
}

export function weaponSummary(name: string, category?: string, caliber?: string | null) {
  const ctx = CATEGORY_CONTEXT[category || ''] || 'Field-tested notes for EA Build 1 loadout planning.'
  const cal = caliber && caliber !== '—' ? ` Uses ${caliber}.` : ''
  return `${name} — ${ctx}${cal}`
}

/** Parse "AKM, RK-95" compatibility lines into weapon ids where possible. */
export function weaponIdsFromNames(names: string, weaponNameToId: Map<string, string>): string[] {
  return names
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((n) => weaponNameToId.get(n))
    .filter((id): id is string => Boolean(id))
}

export function buildWeaponNameMap(
  weapons: { id: string; name: string }[],
): Map<string, string> {
  const m = new Map<string, string>()
  for (const w of weapons) m.set(w.name, w.id)
  return m
}
