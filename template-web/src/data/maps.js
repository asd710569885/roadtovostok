/**
 * World map pins & plain-text blurbs. Three official layers: Area 05, Border Zone, Vostok
 * (see https://www.roadtovostok.com/game). `pin` is fan % on the promo JPG, not GIS.
 */
export default [
  {
    id: 'north',
    name: 'North',
    type: 'area05',
    pin: { x: 14, y: 12 },
    content:
      'Regional label on the developer’s world-map artwork. It situates the Finnish landmass above Area 05—not an in-game coordinate. Use your HUD build string and patch notes for anything that affects loot or AI.',
  },
  {
    id: 'area-05',
    name: 'Area 05',
    type: 'area05',
    pin: { x: 44, y: 44 },
    content:
      'Evacuated southeastern Finland where runs begin: shelters, traders, tasks, starter loot, and hostile Bandits (official game page). Death here is described as less punishing than Vostok—you mainly lose what you carry; confirm in your build. Long-term plans have cited 10 maps and 10 shelters in this band—verify on Steam when content drops.',
  },
  {
    id: 'village',
    name: 'Village',
    type: 'area05',
    pin: { x: 22, y: 38 },
    content:
      'Named on the promotional map image. Community chatter may tie it to trading or routing; this site does not publish loot tables or quest steps. Validate spawns, traders, and stash rules only in your installed client.',
  },
  {
    id: 'school',
    name: 'School',
    type: 'area05',
    pin: { x: 26, y: 48 },
    content:
      'Cartography label on the public artwork—reading aid only, not a verified waypoint. If another guide promises a static spawn, demand their build string before you risk a run.',
  },
  {
    id: 'highway',
    name: 'Highway',
    type: 'area05',
    pin: { x: 38, y: 52 },
    content:
      'Major route printed on the poster map. Useful for orientation next to long-form crossing notes on the wiki hub. Patrol timing and ambush density are versioned—expect Demo vs Early Access drift.',
  },
  {
    id: 'sea',
    name: 'Sea',
    type: 'area05',
    pin: { x: 48, y: 82 },
    content:
      'Coastal water on the artwork. Official copy references boats and water crossings as part of border challenges elsewhere; fishing and shoreline gameplay depend on your patch. Re-read notes whenever maritime systems change.',
  },
  {
    id: 'island',
    name: 'Island',
    type: 'area05',
    pin: { x: 55, y: 88 },
    content:
      'Littoral label for orientation on the promo file—not a promise of interactable landings in every demo slice. Check the live game after major updates.',
  },
  {
    id: 'outpost',
    name: 'Outpost',
    type: 'borderZone',
    pin: { x: 58, y: 46 },
    content:
      'Sits on the approach to the Finland–Russia border band where crossings mix mines, obstacles, or boat routes (official overview). Expect the Guards faction and occasional air support in marketing copy—actual pacing is build-specific.',
  },
  {
    id: 'border-zone',
    name: 'Border Zone',
    type: 'borderZone',
    pin: { x: 68, y: 44 },
    content:
      'Guarded frontier between Finland and Russia. Each border map is pitched with different crossing problems—mine belts, physical blocks, or boat lines—before you burn meds and time. Guards are armed, corrupt in tone, and can call air assets in public materials. FAQ-era text referenced ten crossing-style maps long-term; confirm current numbers on the live site.',
  },
  {
    id: 'minefield',
    name: 'Minefield',
    type: 'borderZone',
    pin: { x: 74, y: 40 },
    content:
      'Hazard label on the world image in the border belt. Mine UX and boundaries can change patch to patch. Do not use this fan overlay as a safe routing tool—observe in-game and follow guides that cite a build string.',
  },
  {
    id: 'vostok',
    name: 'Vostok',
    type: 'vostok',
    pin: { x: 88, y: 46 },
    content:
      'Russian interior beyond the border: highest loot stakes in official messaging. Vostok maps are described as permadeath—losses can exceed “drop your backpack” rules from Area 05 or the Border Zone (verify per build). Military faction fields heavy weapons and vehicles. Roadmap/FAQ language once cited ten Vostok maps as a target—treat counts as directional. Re-read Steam “About this game” after every major patch.',
  },
]
