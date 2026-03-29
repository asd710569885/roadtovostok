/**
 * World map pins on the promo JPG (`pin` x/y are fan %, not in-game coordinates).
 * Main blurbs follow the official three-band model from Road to Vostok Ltd.:
 *   https://www.roadtovostok.com/game
 *   https://store.steampowered.com/app/1963610/Road_to_Vostok/
 * Village / School / Highway / Sea / Island / North are labels on that artwork; copy ties them
 * to real game systems where it makes sense, without inventing per-POI spawn data.
 *
 * Optional `intel`: { npcs?, supplies?, tasks? } — each value is a string[]. Empty arrays omit UI rows.
 */
export default [
  {
    id: 'north',
    name: 'North',
    type: 'area05',
    pin: { x: 14, y: 12 },
    content:
      'This text sits on the published world-map image and reads as “north” on the Finnish landmass. The game’s described starting ground is Area 05 in southeastern Finland—see the official game page—not this compass-style label. Pin position here is only a fan placement on the JPG.',
  },
  {
    id: 'area-05',
    name: 'Area 05',
    type: 'area05',
    pin: { x: 44, y: 44 },
    content:
      'Area 05 is an evacuated zone in southeastern Finland where your road begins. The developer describes shelters, traders, tasks, and starting loot for early survival, interrupted by hostile Bandits—an anarchist faction exploiting weak authority. If you die here you lose the equipment and loot you are carrying (not full permadeath like Vostok). When you are ready, progression continues east toward the Border Zone.',
    intel: {
      npcs: [
        'Bandits — hostile anarchist group in official Area 05 fiction.',
        'Traders — in-game characters; Steam describes specialization (tools, medical, weapons, furniture) and barter-only trade.',
      ],
      supplies: [
        'Physics-based loot and containers; Steam states loot does not spawn in the same places each run.',
        'Consumables, clothing, meds, tools, electronics, weapons and attachments are cited as example item types.',
      ],
      tasks: [
        'Tasks and trader services (e.g. medical care, weapon maintenance) are described on Steam.',
        'Task progress ties to trader levels; tasks can yield rare items, shelter keys, and lore clues (Steam).',
      ],
    },
  },
  {
    id: 'village',
    name: 'Village',
    type: 'area05',
    pin: { x: 22, y: 38 },
    content:
      'Named on the promotional map. It reads as a settlement-scale landmark on the art, not a guarantee of one fixed layout in every build. Area 05 as a whole is where shelters, traders, tasks, and early survival loot are officially placed; verify any village-sized location only in your installed game.',
    intel: {
      npcs: [
        'Traders use bartering (no money); item values reflect post-apocalyptic usefulness (Steam).',
      ],
      supplies: [
        'Loot is tied to logical containers and physical placement—not a static list per map label.',
      ],
      tasks: [
        'Tasks flow through traders; some shelters unlock via keys earned through trader tasks (Steam).',
      ],
    },
  },
  {
    id: 'school',
    name: 'School',
    type: 'area05',
    pin: { x: 26, y: 48 },
    content:
      'A building-style label on the poster map for orientation. The game advertises hundreds of loot items per map and interactable storage wherever it logically fits—nothing on this fan site pins exact rooms or tables to this artwork text.',
    intel: {
      npcs: [],
      supplies: [
        'Steam: “anything that logically looks like storage for loot is an interactable loot container.”',
        'Scavenge, trade, and craft across many item types; placement is physics-based in shelters.',
      ],
      tasks: [],
    },
  },
  {
    id: 'highway',
    name: 'Highway',
    type: 'area05',
    pin: { x: 38, y: 52 },
    content:
      'Major road printed on the world image. Official features include map-to-map travel from Area 05 toward the Border Zone and beyond, day/night, weather, and dynamic events—use those systems in-game rather than this overlay for routing.',
    intel: {
      npcs: [
        'Faction pressure and patrol logic are part of the survival FPS pitch; specifics are build-dependent.',
      ],
      supplies: [
        'Road-adjacent loot still follows procedural / physical loot rules, not this static graphic.',
      ],
      tasks: [
        'Travel east is framed as gathering loot and gear before facing the Border Zone (roadtovostok.com/game).',
      ],
    },
  },
  {
    id: 'sea',
    name: 'Sea',
    type: 'area05',
    pin: { x: 48, y: 82 },
    content:
      'Open water on the artwork. The Border Zone is officially described as sometimes requiring waterways and boats to cross. A future roadmap build (public site) also outlines a fuller sea system with patrol boats and scuba—treat coastlines on the poster as thematic, and boats as a documented crossing tool where the game implements them.',
    intel: {
      npcs: [
        'Border Zone: foreign Guards are armed, corrupt, and may call air support (roadtovostok.com/game).',
      ],
      supplies: [
        'Boats are called out for certain border crossings in official copy.',
      ],
      tasks: [
        'Crossing the border is a core progression beat; each Border map is said to have its own crossing challenge.',
      ],
    },
  },
  {
    id: 'island',
    name: 'Island',
    type: 'area05',
    pin: { x: 55, y: 88 },
    content:
      'Island label on the coast of the promo map. The Steam page uses a remote island fisherman as a sandbox example—you are not forced into combat or the permadeath zone. Whether this exact ink corresponds to a playable landmass in your build is something only the client can confirm.',
    intel: {
      npcs: [],
      supplies: [
        'Fishing-forward playstyles are mentioned as a valid sandbox path on Steam.',
      ],
      tasks: [],
    },
  },
  {
    id: 'outpost',
    name: 'Outpost',
    type: 'borderZone',
    pin: { x: 58, y: 46 },
    content:
      'Sits on the approach to the Finland–Russia border band in the artwork. Officially, each Border Zone map includes a crossing with different hazards—mines, physical obstacles, or boat routes—and the Guards faction blocking passage, sometimes with air support.',
    intel: {
      npcs: [
        'Guards — foreign border guards, armed and corrupt, per roadtovostok.com/game.',
      ],
      supplies: [
        'Prepare meds, repair gear, and boat resources when the crossing demands it (official crossing descriptions).',
      ],
      tasks: [
        'Crossing the border is the gate between Finland-side bands and Vostok.',
      ],
    },
  },
  {
    id: 'border-zone',
    name: 'Border Zone',
    type: 'borderZone',
    pin: { x: 68, y: 44 },
    content:
      'The guarded border between Finland and Russia. Official text stresses varied crossings per map: minefields, blocked routes, or water segments needing boats, layered under corrupt Guards who may call air assets. Death in the Border Zone still only strips what you carry—unlike Vostok’s permadeath maps.',
    intel: {
      npcs: [
        'Guards are the primary border antagonists in marketing copy.',
        'Air support is explicitly mentioned as something they can rely on.',
      ],
      supplies: [
        'High consumption of meds and repair supplies is implied when crossings go wrong.',
      ],
      tasks: [
        'Successful runs are framed as prepping enough loot and equipment before pushing east (official game page).',
      ],
    },
  },
  {
    id: 'minefield',
    name: 'Minefield',
    type: 'borderZone',
    pin: { x: 74, y: 40 },
    content:
      'Hazard wording on the world image aligned with official Border Zone examples that include minefields at crossing points. Treat any fan-drawn pin as non-authoritative: mine placement and UX can change patch to patch.',
    intel: {
      npcs: [
        'Guards remain the human obstacle class at the border in official descriptions.',
      ],
      supplies: [
        'Steam highlights consumables, medical gear, and tools among hundreds of lootable items—plan for recovery and traversal.',
      ],
      tasks: [
        'Crossing challenges differ per Border map; mines are one cited hazard type.',
      ],
    },
  },
  {
    id: 'vostok',
    name: 'Vostok',
    type: 'vostok',
    pin: { x: 88, y: 46 },
    content:
      'Vostok lies in Russia beyond the border: officially billed as the highest-risk, highest-reward band with the most valuable loot. Every Vostok map is a permadeath map—dying there costs everything, whereas Area 05 and Border Zone deaths only cost carried gear and loot. The Military faction controls Vostok with heavy weapons and armored vehicles, and is described as the most dangerous faction, focused on pushing you back.',
    intel: {
      npcs: [
        'Military — heavy armament and vehicles; top threat tier in official copy.',
      ],
      supplies: [
        'Best loot stakes in the game per developer description; inventory Tetris and barter economy still apply elsewhere.',
      ],
      tasks: [
        'Steam states you are never forced into the permadeath zone—sandbox choice.',
        'Shelters remain save points; multi-shelter use matters when pushing east (Steam “Shelters & Customization”).',
      ],
    },
  },
]
