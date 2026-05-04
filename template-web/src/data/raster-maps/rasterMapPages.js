/**
 * High-resolution in-game style maps (map01–07) with wiki-derived pins.
 * Routes mirror roadtovostok.com-style slugs; copy is unique for SEO.
 */
export const RASTER_PIN_QUERY = 'pin'

export const RASTER_MAP_PAGES = [
  {
    mapModule: 'map01',
    path: '/map/village-map',
    routeName: 'map-raster-village',
    label: 'Village (Area 05)',
    navLabel: 'Village',
    thumb: '/images/map/map-img-01.png',
    fullMap: '/images/map/map-01.png',
    accent: '#5a9f6e',
    title: 'Road to Vostok Village Map | Interactive Area 05 POI & Loot Atlas',
    description:
      'Interactive Road to Vostok Village map: Area 05 starter zone, traders, fish pools, ground loot, containers & transitions—clickable pins on the full raster. Field Manual, not the developer.',
    keywords:
      'road to vostok village map, road to vostok Area 05 map, road to vostok interactive map, road to vostok loot map, road to vostok Generalist, road to vostok fish pool, road to vostok wiki, survival fps',
    ogImageAlt: 'Road to Vostok Village (Area 05) full map with location pins',
    article:
      'The Village in Road to Vostok is the primary Area 05 safe hub and early progression anchor. This full-resolution raster—distinct from the zoomable world promo atlas—uses normalized pins aligned with the community map data: shelters and transitions, the Generalist trader, fish pools, and dense loot (containers, ground spawns) so you can plan routes before you deploy. For narrative context and build-specific notes, pair this page with our wiki walkthroughs; pins are a field guide, not in-game GPS. Trademarks belong to the developer; this atlas is an independent player manual.',
  },
  {
    mapModule: 'map02',
    path: '/map/highway-map',
    routeName: 'map-raster-highway',
    label: 'Highway',
    navLabel: 'Highway',
    thumb: '/images/map/map-img-02.png',
    fullMap: '/images/map/map-02.png',
    accent: '#c97d4a',
    title: 'Road to Vostok Highway Map | Interactive Connector Route & Loot Pins',
    description:
      'Road to Vostok Highway area map: connector roads, long sightlines, cover spots, and loot / POI pins on the high-res raster. Unofficial Field Manual.',
    keywords:
      'road to vostok highway map, road to vostok connector map, road to vostok transit, road to vostok loot, road to vostok bandits, road to vostok interactive map, Area 05',
    ogImageAlt: 'Road to Vostok Highway zone map with POI pins',
    article:
      'The Highway map stitches major Area 05 locations with exposed asphalt and flanking cover—ideal for fire-and-move or cautious night movement. The pins here reflect transitions, stashes, and hot loot rolls from community-sourced data; use filters to focus on map-critical POIs versus raw container spam. Check our wiki for faction notes and the world atlas for cross-zone navigation.',
  },
  {
    mapModule: 'map03',
    path: '/map/school-map',
    routeName: 'map-raster-school',
    label: 'School',
    navLabel: 'School',
    thumb: '/images/map/map-img-03.png',
    fullMap: '/images/map/map-03.png',
    accent: '#6eb8d4',
    title: 'Road to Vostok School Map | Building Interior & Loot Guide Pins',
    description:
      'Interactive School map in Road to Vostok: classrooms, vertical sightlines, loot clusters, and shelter/transitions on the full raster. Fan-made atlas, not in-game UI.',
    keywords:
      'road to vostok school map, road to vostok building map, road to vostok interior map, road to vostok loot, road to vostok container map, road to vostok wiki',
    ogImageAlt: 'Road to Vostok School interior map with pins',
    article:
      'The School is a multi-floor combat puzzle: tight lines of sight, audio telegraphs, and loot layered through offices and service rooms. This raster view keeps every community pin in context so you can rehearse a sweep path or find a missing transition. Use category toggles to separate mission-critical map markers from ambient loot; verify behaviour against your installed Early Access or Demo build.',
  },
  {
    mapModule: 'map04',
    path: '/map/outpost-map',
    routeName: 'map-raster-outpost',
    label: 'Outpost',
    navLabel: 'Outpost',
    thumb: '/images/map/map-img-04.png',
    fullMap: '/images/map/map-04.png',
    accent: '#d970a8',
    title: 'Road to Vostok Outpost Map | Tactical Grid & Resource Pins',
    description:
      'Outpost area map: defensive angles, cover, loot, and map transitions on the high-resolution grid. Unofficial Road to Vostok Field Manual.',
    keywords:
      'road to vostok outpost map, road to vostok military map, road to vostok loot, road to vostok transitions, road to vostok interactive map',
    ogImageAlt: 'Road to Vostok Outpost map with location pins',
    article:
      'Outposts condense PvE pressure into a compact footprint. Pins highlight transitions, stashes, and flammable or light sources (fires) to help you plan breach order and exfil. Cross-link to our NPC and weapons wikis for loadout ideas; the Field Manual is player-maintained and not affiliated with Road to Vostok Ltd.',
  },
  {
    mapModule: 'map05',
    path: '/map/minefield-map',
    routeName: 'map-raster-minefield',
    label: 'Minefield',
    navLabel: 'Minefield',
    thumb: '/images/map/map-img-05.png',
    fullMap: '/images/map/map-05.png',
    accent: '#9bc49a',
    title: 'Road to Vostok Minefield Map | Border Zone Mines & Military Loot',
    description:
      'Minefield interactive map: mine belts, bandit vectors, military crates, and industrial ground loot on the official-style raster. Deep links with ?pin= for sharing.',
    keywords:
      'road to vostok minefield map, road to vostok border map, road to vostok mines, road to vostok military crate, road to vostok RK-95, Border Zone, road to vostok wiki',
    ogImageAlt: 'Road to Vostok Minefield map with pins',
    article:
      'The Minefield rewards patience: lane control matters more than raw DPS. Use the pin layers to map hazard bands versus high-tier crates, then read our dedicated Minefield wiki for seasonal visibility and quest hooks. This page is optimized for “road to vostok minefield map” and related Border Zone search intent—content is a guide, not a guarantee of spawn tables after patches.',
  },
  {
    mapModule: 'map06',
    path: '/map/apartments-map',
    routeName: 'map-raster-apartments',
    label: 'Apartments',
    navLabel: 'Apartments',
    thumb: '/images/map/map-img-06.png',
    fullMap: '/images/map/map-06.png',
    accent: '#e4d9c4',
    title: 'Road to Vostok Apartments Map | Dense Urban Loot & Elevation',
    description:
      'Apartments / housing block map: stairwells, rooms, and dense loot and container markers on a full-size raster. Click pins for the Field Manual view.',
    keywords:
      'road to vostok apartments map, road to vostok building loot, road to vostok urban map, road to vostok containers, road to vostok interactive map',
    ogImageAlt: 'Road to Vostok Apartments map with POI pins',
    article:
      'Verticality defines the Apartments: audio staging, room-by-room clearing, and loot tucked into kitchens, closets, and service corridors. With hundreds of pins, lean on category filters—Map vs Ground Loot vs Containers—to keep the overlay readable. Pair with the Site world atlas when you need macro routing between major zones.',
  },
  {
    mapModule: 'map07',
    path: '/map/terminal-map',
    routeName: 'map-raster-terminal',
    label: 'Terminal',
    navLabel: 'Terminal',
    thumb: '/images/map/map-img-07.png',
    fullMap: '/images/map/map-07.png',
    accent: '#b8a8d8',
    title: 'Road to Vostok Terminal Map | Port Logistics & Extraction Pins',
    description:
      'Terminal / port map: shipping lanes, cover, and loot on the high-res raster, with ?pin= deep links. Road to Vostok Field Manual (unofficial).',
    keywords:
      'road to vostok terminal map, road to vostok port map, road to vostok shipyard adjacent, road to vostok loot, road to vostok traders, road to vostok wiki',
    ogImageAlt: 'Road to Vostok Terminal map with location pins',
    article:
      'The Terminal area mixes long exterior sightlines with interior choke points. Pins capture transitions, stashes, and key loot rolls—use the interactive layer before committing gear on Hardcore. Traders, Doctor, and Generalist context lives in our NPC hub; the interactive world map on /map still shows macro geography across Area 05, the Border Zone, and Vostok.',
  },
]

export function pageByModule(mapModule) {
  return RASTER_MAP_PAGES.find((p) => p.mapModule === mapModule) ?? null
}

export function pageByPath(path) {
  return RASTER_MAP_PAGES.find((p) => p.path === path) ?? null
}
