export default {
  slug: 'school',
  name: 'School',
  kicker: 'Area 05 · Doctor trader',
  zone: 'Area 05',
  summary:
    'Second stop on the EA map chain after Village: transit through the yellow-tape boundary, clear multi-floor interiors, and reach the Doctor on Build 1’s 3rd floor for medical barter, lockers, and trauma tasks.',
  image: 'images/map/map-img-03.png',
  rasterPath: '/map/school-map',
  demoNote:
    'EA Build 1: Doctor replaced the demo-era Shipyard basement location. Pair with /wiki/npcs/doctor and the School raster for pin-level navigation.',
  highlights: [
    'Multi-floor CQB: audio and vertical sightlines—clear lower floors before committing to the Doctor room.',
    'Transit hub toward Highway and Outpost; shelter access depends on your task/unlock progress—verify in-client.',
  ],
  npcs: [
    'Doctor (medic trader) — Build 1, 3rd floor, first room on the right after the central stairwell (see NPC dossier).',
    'Bandits on lower floors and around the exterior—same faction write-up as Village clears.',
  ],
  lootTips: [
    'Office cabinets and classroom containers follow civilian mixed-loot patterns similar to Village, with building-style density.',
    'Doctor sells weapon lockers—high value for stash organization; restock timer matches other traders (~10 minutes).',
    'Use /map/school-map for community pin layers; this prose page stays patch-agnostic.',
  ],
  weaponsNote:
    'Mid-tier civilian and bandit drops; not the primary map for RK-95 farming—that shifts to Minefield Guards and Vostok military loot.',
}
