/**
 * World map pins on the promo JPG (`pin` x/y are fan %, not in-game coordinates).
 * Main blurbs follow the official three-band model from Road to Vostok Ltd.:
 *   https://www.roadtovostok.com/game
 *   https://store.steampowered.com/app/1963610/Road_to_Vostok/
 * Village / School / Highway / Sea / Island / North are labels on that artwork; copy ties them
 * to real game systems where it makes sense, without inventing per-POI spawn data.
 *
 * Optional `intel`: { npcs?, supplies?, tasks? } — each value is a string[]. Empty arrays omit UI rows.
 * Optional `npcLinks`: { label, role?, blurb, to }[] — traders/hostiles with a teaser; UI shows big tappable rows → wiki NPC pages.
 * Optional `wikiLinks`: { label, to }[] — hubs & topics that are not a single NPC page. `wikiRoute` = full location guide.
 */
const mapLocations = [
  {
    id: 'area-05',
    name: 'Area 05',
    type: 'area05',
    pin: { x: 49, y: 37 },
    npcLinks: [
      {
        label: 'Bandits',
        role: 'Hostile faction',
        blurb:
          'Official Area 05 copy calls them anarchists; the wiki page covers weapons, loot patterns, and how they fight.',
        to: '/wiki/npcs/bandits',
      },
    ],
    wikiLinks: [
      { label: 'All NPCs & traders', to: '/wiki/npcs' },
      { label: 'Playable map guides (Village, Shipyard…)', to: '/wiki/maps' },
    ],
    content:
      'This is the Finland starter band: shelters, traders, tasks, and your first serious loot. If you die you only lose what you carried—nothing like Vostok permadeath later. Pick a named pin (Village, Shipyard, Highway…) for a full walkthrough; use the cards below to jump straight to NPC write-ups.',
    intel: {
      npcs: [
        'Traders — Steam lists specializations (tools, medical, weapons, furniture) and pure barter economy.',
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
    pin: { x: 32.5, y: 53 },
    wikiRoute: '/wiki/maps/village',
    npcLinks: [
      {
        label: 'Generalist',
        role: 'Trader',
        blurb:
          'Food, meds, guns, junk—wiki notes that popping back into the Shelter can roll a fresh table faster than waiting out the restock timer.',
        to: '/wiki/npcs/generalist',
      },
      {
        label: 'Bandits',
        role: 'Hostiles',
        blurb: 'You will trade shots house-to-house; the wiki breaks down what they tend to carry.',
        to: '/wiki/npcs/bandits',
      },
    ],
    wikiLinks: [],
    content:
      'Spawn hub: cramped houses, cabinets everywhere, and civilian loot loops. If you methodically clear bandits and vacuum containers you can bankroll early raids without feeding every coin to the trader—but he is right here when you need him. Pin is fan-placed on the promo art.',
    intel: {
      npcs: [],
      supplies: [
        'Strong civilian container mix: dozens of cabinets, fridges/freezers, crates, garbage, fuse boxes, tents—see wiki table for counts.',
        'Rare modules, quest items (e.g. batteries), helmets/rigs/plates can spawn on floors under roofs (wiki loot tips).',
      ],
      tasks: [
        'Shelter-centric flow matches the starter sandbox pacing described on the Village wiki page.',
      ],
    },
  },
  {
    id: 'school',
    name: 'School',
    type: 'area05',
    pin: { x: 35.8, y: 47 },
    wikiLinks: [
      { label: 'Village (nearby starter loot)', to: '/wiki/maps/village' },
      { label: 'Map guides hub', to: '/wiki/maps' },
    ],
    content:
      'Poster label only—no dedicated School page in the Field Manual wiki. Expect building-style loot patterns similar to the Village guide (cabinets, mixed civilian containers) if the building exists in your build; verify in-game.',
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
    id: 'shipyard',
    name: 'Shipyard',
    type: 'area05',
    pin: { x: 17.5, y: 76.5 },
    wikiRoute: '/wiki/maps/shipyard',
    npcLinks: [
      {
        label: 'Doctor',
        role: 'Medic trader',
        blurb:
          'Stacks medkits and medical barter—basement entrance is inside Hamikot Logistics. Open his wiki for step-by-step directions, task tiers, and fees.',
        to: '/wiki/npcs/doctor',
      },
      {
        label: 'Bandits',
        role: 'Hostiles',
        blurb: 'Standard spawns for this map—bodies and kits still follow the faction write-up on the wiki.',
        to: '/wiki/npcs/bandits',
      },
    ],
    wikiLinks: [],
    content:
      'Industrial dead-end reached from Village: container yards, tight corners, great general loot. The Doctor is the reason med runners come here—he is underground in Hamikot Logistics. Some Next Fest demos skipped Shipyard entirely; double-check your Steam build before routing.',
    intel: {
      npcs: [],
      supplies: [
        'Container-heavy: lockers, office cabinets, stacked/truck containers—wiki lists 38+ “container” tiles plus floor randoms (often rigs/plates).',
        'Tight CQB sightlines; community warns a barge softlock is possible—save often (wiki loot tips).',
      ],
      tasks: [
        'Doctor tasks and barter tiers are detailed on the Doctor wiki page.',
      ],
    },
  },
  {
    id: 'highway',
    name: 'Highway',
    type: 'area05',
    pin: { x: 32.5, y: 44.2 },
    wikiRoute: '/wiki/maps/highway',
    npcLinks: [
      {
        label: 'Bandits',
        role: 'Hostiles',
        blurb:
          'Open pavement means you get seen from far away—wiki covers how fights tend to play on this connector map.',
        to: '/wiki/npcs/bandits',
      },
    ],
    wikiLinks: [{ label: 'Browse every map guide', to: '/wiki/maps' }],
    content:
      'The open road between Village and Minefield: cars, scattered crates, fewer jackpot tiles than Village or Shipyard. Treat it as a transit lane—rotate carefully, expect long shots. Certain demo builds never shipped Highway; verify yours.',
    intel: {
      npcs: [],
      supplies: [
        'Loot is thinner per tile than Village/Shipyard—cars, crates, garbage, tents, a few containers (wiki table).',
        'Not the best map for rare weapon farming; prioritize safe rotation (wiki loot tips).',
      ],
      tasks: [
        'Shelter exists but may be locked depending on build—plan without assuming a save bed (wiki highlights).',
      ],
    },
  },
  {
    id: 'sea',
    name: 'Sea',
    type: 'area05',
    pin: { x: 41, y: 83 },
    wikiLinks: [
      { label: 'Minefield guide (border crossings)', to: '/wiki/maps/minefield' },
      { label: 'All NPCs & traders', to: '/wiki/npcs' },
    ],
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
    pin: { x: 54, y: 93 },
    wikiLinks: [
      { label: 'Map guides hub', to: '/wiki/maps' },
      { label: 'All NPCs & traders', to: '/wiki/npcs' },
    ],
    content:
      'Coastal label on the poster. Steam pitches a remote island fisherman as a chill sandbox path—no forced combat, no Vostok rush. We do not have a dedicated “fisherman” article yet; the NPC index is the best place to browse traders while you wait for a deeper write-up.',
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
    pin: { x: 64.2, y: 53 },
    npcLinks: [
      {
        label: 'Bandits',
        role: 'Finland-side reference',
        blurb:
          'Still the faction write-up for guns, rigs, and corpse loot when you are prepping runs west of the wire—useful context before you commit to Minefield.',
        to: '/wiki/npcs/bandits',
      },
    ],
    wikiLinks: [{ label: 'Minefield walkthrough', to: '/wiki/maps/minefield' }],
    content:
      'Poster landmark on the border approach. Each playable crossing has its own hazard mix—mines, chokepoints, boats—and corrupt Guards who can call air support. When you are ready for tile-by-tile notes, jump to the Minefield guide; the card below keeps bandit loot math one tap away.',
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
    pin: { x: 85, y: 30 },
    npcLinks: [
      {
        label: 'Bandits',
        role: 'Finland-side reference',
        blurb:
          'Guards own the wire, but bandit-style kits still describe a lot of what you farm before pushing east—open the wiki when you want drop tables, not border patrol AI.',
        to: '/wiki/npcs/bandits',
      },
    ],
    wikiLinks: [
      { label: 'Minefield walkthrough', to: '/wiki/maps/minefield' },
      { label: 'All NPCs & traders', to: '/wiki/npcs' },
    ],
    content:
      'Finland–Russia band: mines, blocked roads, or boat crossings depending on the map; corrupt Guards and possible air support. Dying here still only strips what you brought—Vostok is the permadeath band later. For a concrete playable tile, use Minefield; tap the NPC card if you need hostile loot context from earlier maps.',
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
    pin: { x: 79.2, y: 45.5 },
    wikiRoute: '/wiki/maps/minefield',
    npcLinks: [
      {
        label: 'Bandits',
        role: 'Loot reference',
        blurb:
          'Corpses still drop bandit-style kits; live pressure skews toward border patrol instead—full encounter notes stay in the Minefield guide above.',
        to: '/wiki/npcs/bandits',
      },
    ],
    wikiLinks: [{ label: 'NPC index (all traders & hostiles)', to: '/wiki/npcs' }],
    content:
      'Border tile laced with mines toward radar. Patrol cadence feels different from Village clears, and there are only two military crates—think 7.62×39 and RK-95 loops rather than chasing every ultra-rare. Players note winter lighting can make tripwires easier to spot than dense summer foliage.',
    intel: {
      npcs: [],
      supplies: [
        'Two military crates: military mix with spikes into rare weapons, modules, rigs, and several plates (wiki).',
        'Six bandit corpses and sparse garbage piles per wiki container table.',
        'Mines toward radar—move slowly and scan cues; winter runs may make tripwires/mines slightly easier to read than summer foliage (wiki).',
      ],
      tasks: [],
    },
  },
  {
    id: 'vostok',
    name: 'Vostok',
    type: 'vostok',
    pin: { x: 88, y: 46 },
    wikiLinks: [
      { label: 'Weapons', to: '/wiki/weapons' },
      { label: 'Ammo', to: '/wiki/ammo' },
      { label: 'All NPCs & traders', to: '/wiki/npcs' },
    ],
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

/** Vue Router location for `/map` with optional deep-link to a pin (`?pin=village`). */
export const MAP_PAGE = '/map'
export const MAP_PIN_QUERY = 'pin'

export function mapRouteForPin(pinId) {
  const id =
    typeof pinId === 'string' && /^[a-z][a-z0-9-]*$/i.test(pinId) ? pinId.toLowerCase() : ''
  return id ? { path: MAP_PAGE, query: { [MAP_PIN_QUERY]: id } } : { path: MAP_PAGE }
}

export default mapLocations
