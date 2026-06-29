import type { SeoInput } from './seo'
import { resolveDynamicSeo } from './wikiSeo'

/** Wiki section nav (from wikiNav.js). */
export const WIKI_NAV = [
  {
    slug: 'weapons',
    routePath: '/wiki/weapons',
    kicker: 'Combat',
    title: 'Weapons',
    entryCount: 19,
    blurb: 'Reference tables by weapon class—each weapon has its own stats dossier.',
  },
  {
    slug: 'ammo',
    routePath: '/wiki/ammo',
    kicker: 'Ammunition',
    title: 'Ammo',
    entryCount: 8,
    blurb: 'Calibers and pairing notes—each ammo type has a dedicated dossier with compatible weapons.',
  },
  {
    slug: 'maps',
    routePath: '/wiki/maps',
    kicker: 'Atlas',
    title: 'Maps',
    entryCount: 8,
    blurb: 'Village, Highway, Minefield (+ School/Outpost in EA)—each with guide and raster map links.',
  },
  {
    slug: 'npcs',
    routePath: '/wiki/npcs',
    kicker: 'People',
    title: 'NPCs',
    entryCount: 4,
    blurb: 'Bandits, Generalist, Doctor, Gunsmith—each with its own profile page.',
  },
  {
    slug: 'items',
    routePath: '/wiki/items',
    kicker: 'Database',
    title: 'Items',
    entryCount: 10,
    blurb: 'Featured keys, medical, and high-value loot dossiers—plus links to weapons/ammo tables.',
  },
  {
    slug: 'shelters',
    routePath: '/wiki/shelters',
    kicker: 'Hideouts',
    title: 'Shelters',
    entryCount: 5,
    blurb: 'Five player hideouts: default Cabin/Tent and keyed Attic, Bunker, Classroom.',
  },
  {
    slug: 'loot-containers',
    routePath: '/wiki/loot-containers',
    kicker: 'Loot',
    title: 'Containers',
    entryCount: 20,
    blurb: 'Twenty container types—civilian, military, stash, and event airdrops.',
  },
] as const

/** Cross-links between map detail routes (from mapNav.js). */
export const MAP_NAV = [
  { slug: 'village', routePath: '/wiki/maps/village', title: 'Village' },
  { slug: 'school', routePath: '/wiki/maps/school', title: 'School' },
  { slug: 'highway', routePath: '/wiki/maps/highway', title: 'Highway' },
  { slug: 'outpost', routePath: '/wiki/maps/outpost', title: 'Outpost' },
  { slug: 'minefield', routePath: '/wiki/maps/minefield', title: 'Minefield' },
  { slug: 'apartments', routePath: '/wiki/maps/apartments', title: 'Apartments' },
  { slug: 'terminal', routePath: '/wiki/maps/terminal', title: 'Terminal' },
  { slug: 'shipyard', routePath: '/wiki/maps/shipyard', title: 'Shipyard (legacy)' },
] as const

/** Cross-links between NPC detail routes (from npcNav.js). */
export const NPC_NAV = [
  { slug: 'bandits', routePath: '/wiki/npcs/bandits', title: 'Bandits' },
  { slug: 'generalist', routePath: '/wiki/npcs/generalist', title: 'Generalist' },
  { slug: 'doctor', routePath: '/wiki/npcs/doctor', title: 'Doctor' },
  { slug: 'gunsmith', routePath: '/wiki/npcs/gunsmith', title: 'Gunsmith' },
] as const

/** Route path → SEO meta (from router/index.js). */
export const ROUTE_SEO: Record<string, SeoInput> = {
  '/': {
    title: 'Road to Vostok Guide | Wiki, Weapons, Maps, NPCs & Interactive Map',
    description:
      'Road to Vostok strategy guide: EA Build 1 live on Steam since April 7, 2026. Weapons, ammo, seven-map atlas, traders (Generalist, Doctor, Gunsmith), interactive world map.',
    keywords:
      'road to vostok, road to vostok wiki, road to vostok guide, road to vostok weapons, road to vostok map, road to vostok interactive map, road to vostok npcs, road to vostok steam, road to vostok demo, early access, Area 05, Border Zone, Vostok, field manual',
  },
  '/wiki': {
    title: 'Road to Vostok Wiki | Weapons, Maps, Items, Shelters & NPCs',
    description:
      'Road to Vostok wiki hub: weapons, ammo, maps, NPCs, items, shelters, loot containers. Build 1 Early Access live on Steam since April 7, 2026.',
    keywords:
      'road to vostok wiki, road to vostok weapons, road to vostok maps, road to vostok items, road to vostok shelters, road to vostok npcs, roadtovostok, early access',
  },
  '/wiki/weapons': {
    title: 'Road to Vostok Weapons Wiki | Stats & Weapon Guides',
    description:
      'Road to Vostok weapons reference: grouped tables plus individual weapon dossiers—reload stats, caliber pairing, RPM, and field notes for EA Build 1.',
    keywords:
      'road to vostok weapons, road to vostok guns, road to vostok reloading, road to vostok wiki, road to vostok ammo, road to vostok steam, survival fps',
  },
  '/wiki/ammo': {
    title: 'Road to Vostok Ammo Wiki | Caliber Guides & Pairing',
    description:
      'Road to Vostok ammo reference: stack sizes, per-round economy, and dedicated caliber dossiers with compatible weapon links for EA Build 1.',
    keywords:
      'road to vostok ammo, road to vostok magazines, road to vostok calibers, road to vostok wiki, road to vostok weapons, road to vostok loot, road to vostok steam',
  },
  '/wiki/maps': {
    title: 'Road to Vostok Maps Wiki | All Locations & Atlas',
    description:
      'Road to Vostok map guides: all seven EA Build 1 maps (Village, School, Highway, Outpost, Minefield, Apartments, Terminal) plus legacy Shipyard demo archive.',
    keywords:
      'road to vostok maps, road to vostok wiki maps, road to vostok world map, road to vostok interactive map, road to vostok Village, road to vostok Shipyard, road to vostok loot, road to vostok traders',
  },
  '/wiki/maps/village': {
    title: 'Road to Vostok Village Map Wiki | Starter Zone & Generalist',
    description:
      'Village map guide for Road to Vostok: spawn shelter, Generalist trader, bandit clears, container counts & early loot. Links to interactive /map?pin=village.',
    keywords:
      'road to vostok village map, road to vostok starting area, road to vostok Generalist, road to vostok trader, road to vostok bandits, road to vostok loot, road to vostok wiki, Area 05, field manual',
  },
  '/wiki/maps/shipyard': {
    title: 'Road to Vostok Shipyard Map Wiki | Demo-Era Loot Archive',
    description:
      'Legacy Shipyard map notes from public demos—Doctor moved to School in EA Build 1. Container tables kept for demo players; verify your Steam build before routing.',
    keywords:
      'road to vostok shipyard map, road to vostok demo map, road to vostok Doctor legacy, road to vostok containers, Hamikot Logistics, road to vostok wiki, Area 05',
  },
  '/wiki/maps/highway': {
    title: 'Road to Vostok Highway Map Wiki | School to Outpost Connector',
    description:
      'Highway map guide (EA Build 1): open connector between School and Outpost, cars, crates, long sightlines, bandits. Raster /map/highway-map + world atlas pin.',
    keywords:
      'road to vostok highway map, road to vostok transit map, road to vostok Village, road to vostok Outpost, road to vostok bandits, road to vostok loot, road to vostok wiki',
  },
  '/wiki/maps/school': {
    title: 'Road to Vostok School Map Wiki | Doctor Trader & Interiors',
    description:
      'School map guide (EA Build 1): multi-floor building, Doctor medic trader on 3rd floor, transit from Village. Interactive /map/school-map + NPC dossier.',
    keywords:
      'road to vostok school map, road to vostok Doctor, road to vostok medic trader, road to vostok building map, road to vostok loot, Area 05, road to vostok wiki',
  },
  '/wiki/maps/outpost': {
    title: 'Road to Vostok Outpost Map Wiki | Gunsmith Bunker & Military Loot',
    description:
      'Outpost map guide (EA Build 1): Gunsmith bunker behind tank landmark, towers, trenches, tent shelter. /map/outpost-map raster + wiki NPC links.',
    keywords:
      'road to vostok outpost map, road to vostok gunsmith, road to vostok weapons trader, road to vostok military loot, Area 05, road to vostok wiki',
  },
  '/wiki/maps/apartments': {
    title: 'Road to Vostok Apartments Map Wiki | Vostok Permadeath Urban Loot',
    description:
      'Apartments map guide (Vostok permadeath): dense housing block, vertical clears, high-tier loot stakes. /map/apartments-map raster atlas—verify save wipe rules.',
    keywords:
      'road to vostok apartments map, road to vostok vostok permadeath, road to vostok urban loot, road to vostok containers, road to vostok wiki',
  },
  '/wiki/maps/terminal': {
    title: 'Road to Vostok Terminal Map Wiki | Vostok Port & Endgame Loot',
    description:
      'Terminal / port map guide (Vostok permadeath): logistics lanes, Military pressure, high-value loot. /map/terminal-map interactive raster.',
    keywords:
      'road to vostok terminal map, road to vostok port map, road to vostok vostok, road to vostok military, road to vostok permadeath, road to vostok wiki',
  },
  '/wiki/maps/minefield': {
    title: 'Road to Vostok Minefield Map Wiki | Mines & Military Crates',
    description:
      'Minefield map: border mines, patrol cadence, military crates, RK-95 & 7.62×39 tips, seasonal visibility. /map?pin=minefield. Border Zone guide.',
    keywords:
      'road to vostok minefield map, road to vostok border map, road to vostok mines, road to vostok military crate, road to vostok RK-95, Border Zone, road to vostok wiki',
  },
  '/wiki/npcs': {
    title: 'Road to Vostok NPCs Wiki | Bandits, Traders & Gunsmith',
    description:
      'NPC index: Bandits, Generalist (Village), Doctor (School), Gunsmith (Outpost)—tasks, barter, locations & map deep links. EA Build 1 on Steam.',
    keywords:
      'road to vostok npcs, road to vostok traders, road to vostok Bandits, road to vostok Generalist, road to vostok Doctor, road to vostok tasks, road to vostok wiki, road to vostok map',
  },
  '/wiki/npcs/bandits': {
    title: 'Road to Vostok Bandits Wiki | Enemies, Loot & AI',
    description:
      'Bandits in Road to Vostok: loadouts, dual weapons, gear strips, AI behaviours (cover, ambush, flee) & field quirks. Linked from map atlas & walkthroughs.',
    keywords:
      'road to vostok bandits, road to vostok enemies, road to vostok hostile npcs, road to vostok combat AI, road to vostok loot, road to vostok wiki, Area 05',
  },
  '/wiki/npcs/generalist': {
    title: 'Road to Vostok Generalist Wiki | Trader, Tasks & Location',
    description:
      'Generalist trader guide: barter stock, 10m restock, shelter refresh tip, tasks L1–4, step-by-step Village location. Road to Vostok Field Manual NPC page.',
    keywords:
      'road to vostok Generalist, road to vostok trader, road to vostok barter, road to vostok tasks, road to vostok Village trader, road to vostok wiki, road to vostok npcs',
  },
  '/wiki/npcs/doctor': {
    title: 'Road to Vostok Doctor Wiki | Med Trader & School Route',
    description:
      'Doctor NPC: medical barter, restock timer, task tiers & fees, School 3rd floor (Build 1) directions. Road to Vostok wiki with /map?pin=school.',
    keywords:
      'road to vostok Doctor, road to vostok medic trader, road to vostok medkit, road to vostok School, road to vostok wiki, road to vostok npcs',
  },
  '/wiki/npcs/gunsmith': {
    title: 'Road to Vostok Gunsmith Wiki | Outpost Weapons Trader',
    description:
      'Gunsmith (Weapon Specialist) in EA Build 1: Outpost bunker behind the tank, weapon barter, restock timer & task tiers. Often appears around in-game Day 10—verify in-client.',
    keywords:
      'road to vostok gunsmith, road to vostok weapons trader, road to vostok barter, road to vostok tasks, road to vostok wiki, road to vostok npcs',
  },
  '/wiki/items': {
    title: 'Road to Vostok Items Wiki | Keys, Medical & Gear',
    description:
      'Road to Vostok item dossiers: shelter keys, medical supplies, legendary gear, and cross-links to weapons, ammo, shelters, and map wikis.',
    keywords:
      'road to vostok items, road to vostok keys, road to vostok medkit, road to vostok loot, road to vostok wiki, road to vostok database',
  },
  '/wiki/items/attic-key': {
    title: 'Attic Key | Road to Vostok Item Wiki',
    description: 'Attic Key legendary item: unlocks Village Attic shelter. Stats, trader value, and links to shelter/map wikis.',
    keywords: 'road to vostok attic key, road to vostok shelter key, road to vostok village, road to vostok items wiki',
  },
  '/wiki/items/medkit': {
    title: 'Medkit | Road to Vostok Item Wiki',
    description: 'Medkit rare medical item: weight, trader value, medical cabinet spawns, and Doctor trader cross-links.',
    keywords: 'road to vostok medkit, road to vostok medical, road to vostok doctor, road to vostok items wiki',
  },
  '/wiki/shelters': {
    title: 'Road to Vostok Shelters Wiki | All 5 Hideouts',
    description:
      'All five Road to Vostok player shelters: Cabin & Tent (default), Attic, Bunker, Classroom (key-locked). Furniture lists and map links.',
    keywords:
      'road to vostok shelters, road to vostok hideout, road to vostok cabin, road to vostok attic key, road to vostok wiki',
  },
  '/wiki/shelters/cabin': {
    title: 'Cabin Shelter | Road to Vostok Wiki',
    description: 'Village Cabin shelter: default unlock, 17 default furniture pieces, Generalist proximity, and map links.',
    keywords: 'road to vostok cabin shelter, road to vostok village hideout, road to vostok furniture, road to vostok wiki',
  },
  '/wiki/loot-containers': {
    title: 'Road to Vostok Loot Containers Wiki | All 20 Types',
    description:
      'Twenty loot container types in EA Build 1: cabinets, corpses, military crates, stashes, airdrops. Map coverage and loot character summaries.',
    keywords:
      'road to vostok loot containers, road to vostok cabinet, road to vostok military crate, road to vostok stash, road to vostok wiki',
  },
  '/wiki/loot-containers/cabinet': {
    title: 'Cabinet Loot Container | Road to Vostok Wiki',
    description: 'Cabinet container: 48 slots, ~415 spawns, Village & Apartments. Civilian loot pool summary and map wiki links.',
    keywords: 'road to vostok cabinet loot, road to vostok containers, road to vostok village loot, road to vostok wiki',
  },
  '/wiki/loot-containers/medical-cabinet': {
    title: 'Medical Cabinet | Road to Vostok Wiki',
    description: 'Medical-only wall cabinets across Area 05 maps. IFAK/medkit rarity notes and Doctor trader links.',
    keywords: 'road to vostok medical cabinet, road to vostok medkit spawn, road to vostok loot wiki',
  },
  '/updates': {
    title: 'Road to Vostok Updates | EA Build 1 & Steam News',
    description:
      'Road to Vostok entered Steam Early Access April 7, 2026 (Build 1 Road). Official patch notes, roadmap, YouTube devlogs—always verify live on Steam & roadtovostok.com.',
    keywords:
      'road to vostok updates, road to vostok patch notes, road to vostok steam news, road to vostok roadmap, road to vostok early access, roadtovostok, road to vostok release date',
  },
  '/start': {
    title: 'Road to Vostok Start Guide | EA Build 1, Demo & PC Specs',
    description:
      'New-player Start hub: EA live since April 7, 2026 (Build 1 Road), free Steam demo still available, solo sandbox, Demo vs EA matrix, checklist & PC requirements.',
    keywords:
      'road to vostok start guide, road to vostok new player, road to vostok steam, road to vostok demo, road to vostok early access, road to vostok system requirements, road to vostok download, roadtovostok',
  },
  '/blog': {
    title: 'Road to Vostok Blog | Guides, Tips & Field Manual',
    description:
      'Editorial posts for Road to Vostok players: beginner onboarding, Vostok permadeath & Border loadouts, zone guides—with links to wiki, /map atlas, Start page & official Steam / developer site.',
    keywords:
      'road to vostok blog, road to vostok guide, road to vostok vostok guide, road to vostok permadeath, road to vostok beginner tips, road to vostok wiki, road to vostok steam, Area 05, Border Zone, Vostok, survival fps, field manual',
  },
  '/map': {
    title: 'Road to Vostok Interactive Map | Atlas & Wiki Pins',
    description:
      'Zoomable Road to Vostok world map: Area 05, Border Zone, and Vostok pins with wiki summaries, NPC cards, loot notes, and ?pin= deep links. Plus high-res area rasters for Village, Highway, School, Outpost, Minefield, Apartments, and Terminal.',
    keywords:
      'road to vostok map, road to vostok interactive map, road to vostok world map, road to vostok atlas, road to vostok area maps, road to vostok village map, road to vostok minefield map, Area 05, Border Zone, Vostok, road to vostok loot',
  },
  '/about': {
    title: 'About | Road to Vostok Field Manual',
    description:
      'About roadtovostok.net: the Road to Vostok Field Manual—scope, editorial standards, and site policies.',
    keywords:
      'road to vostok about, road to vostok field manual, road to vostok guide, road to vostok wiki, roadtovostok.net',
  },
  '/legal/about': {
    title: 'About | Road to Vostok Field Manual',
    description:
      'About roadtovostok.net: the Road to Vostok Field Manual—scope, editorial standards, and site policies.',
    keywords:
      'road to vostok about, road to vostok field manual, road to vostok guide, road to vostok wiki, roadtovostok.net',
  },
  '/contact': {
    title: 'Contact | Road to Vostok Field Manual (Email)',
    description:
      'Email the Road to Vostok Field Manual team: guide corrections, permissions, and privacy. Text and email only—no forms.',
    keywords:
      'road to vostok contact, road to vostok field manual email, roadtovostok.net contact, wiki corrections, guide support',
  },
  '/legal/contact': {
    title: 'Contact | Road to Vostok Field Manual (Email)',
    description:
      'Email the Road to Vostok Field Manual team: guide corrections, permissions, and privacy. Text and email only—no forms.',
    keywords:
      'road to vostok contact, road to vostok field manual email, roadtovostok.net contact, wiki corrections, guide support',
  },
  '/privacy': {
    title: 'Privacy Policy | roadtovostok.net Field Manual',
    description:
      'Privacy policy for roadtovostok.net: logs, fonts, analytics, Google AdSense, cookies, retention, and your rights (GDPR-style). How to contact the site operator.',
    keywords:
      'roadtovostok.net privacy, road to vostok field manual privacy, cookies policy, GDPR, fan site data policy, AdSense disclosure',
  },
  '/legal/privacy': {
    title: 'Privacy Policy | Road to Vostok Field Manual',
    description:
      'Privacy policy for roadtovostok.net: logs, fonts, analytics, cookies, retention, and your rights. How to contact the site operator.',
    keywords:
      'roadtovostok.net privacy, road to vostok field manual privacy, cookies policy, GDPR, fan site data policy',
  },
  '/legal/terms': {
    title: 'Terms of Use | Road to Vostok Field Manual',
    description:
      'Terms of use for roadtovostok.net: acceptable use, disclaimers, limitation of liability, and unofficial fan-site status for Road to Vostok guides.',
    keywords:
      'road to vostok terms, road to vostok field manual terms of use, roadtovostok.net legal, fan site disclaimer',
  },
  '/legal/copyright': {
    title: 'Copyright & Trademarks | Road to Vostok Field Manual',
    description:
      'Copyright and trademark notice for roadtovostok.net: fan-site text, game assets, fair use, and how to submit takedown or permission requests.',
    keywords:
      'road to vostok copyright, road to vostok trademark, fan site fair use, roadtovostok.net copyright, DMCA',
  },
  '/404': {
    title: '404 Not Found | Road to Vostok Field Manual',
    description:
      'Page not found on roadtovostok.net. Try the wiki index, Start guide, or interactive map from the home page.',
    keywords: 'road to vostok, 404, field manual, roadtovostok.net',
    robots: 'noindex, follow',
    canonical: false,
  },
}

const FALLBACK_SEO: SeoInput = {
  title: 'Road to Vostok Field Manual | Wiki, Maps & Interactive Atlas',
  description:
    'Road to Vostok strategy guide: EA Build 1 weapons and ammo wiki, seven-map atlas, NPC dossiers, shelters, loot containers, and interactive world map on Steam Early Access.',
  keywords:
    'road to vostok, road to vostok wiki, road to vostok guide, road to vostok map, road to vostok weapons, roadtovostok, early access',
}

export function seoForPath(path: string): SeoInput {
  const staticSeo = ROUTE_SEO[path]
  if (staticSeo) return staticSeo
  return resolveDynamicSeo(path) ?? FALLBACK_SEO
}

export const PRIMARY_NAV = [
  { href: '/', label: 'Home' },
  { href: '/start', label: 'Start', title: 'Onboarding · Demo / EA / PC specs' },
  { href: '/wiki', label: 'Wiki' },
  { href: '/map', label: 'Map' },
  { href: '/updates', label: 'Updates' },
  { href: '/blog', label: 'Blog' },
] as const

export const HEADER_EXTERNALS = [
  { href: 'https://www.roadtovostok.com/', label: 'Official site' },
  { href: 'https://www.youtube.com/roadtovostok', label: 'Devlogs' },
] as const
