/**
 * Loot container types — EA Build 1 summary.
 */
export default [
  {
    slug: 'airdrop',
    name: 'Airdrop',
    kicker: 'Event container',
    category: 'event',
    flags: ['Event drop', 'Airdrop'],
    summary:
      'Timed event container delivered to Area 05—guaranteed high-tier loot when the Day 6 airdrop event fires. Compete with AI and other players for the crate.',
    stats: [
      { label: 'Spawn trigger', value: 'Day 6: Airdrops event (Area 05)' },
      { label: 'Maps', value: 'Event placement (Area 05)' },
    ],
    sections: [
      {
        title: 'Field notes',
        text: 'Treat airdrops as PvE/PvP hotspots—clear surroundings before looting and expect Military-grade rolls in the pool.',
      },
    ],
  },
  {
    slug: 'bandit-corpse',
    name: 'Bandit Corpse',
    kicker: 'Civilian loot source',
    category: 'civilian',
    flags: ['Civilian'],
    summary:
      'Primary weapon and gear source from defeated bandits—food, clothes, ammo, and guns across most maps.',
    stats: [
      { label: 'Maps', value: 'Village, Highway, School, Outpost, Minefield, Apartments, Terminal' },
      { label: 'Typical loot', value: 'Food, clothes, ammo, pistols, SMGs, occasional rifles' },
    ],
    sections: [
      {
        title: 'Related pages',
        links: [
          { href: '/wiki/npcs/bandits', label: 'Bandits NPC dossier' },
          { href: '/wiki/weapons', label: 'Weapons reference tables' },
        ],
      },
    ],
  },
  {
    slug: 'boxes',
    name: 'Boxes',
    kicker: 'Civilian · no weapons',
    category: 'civilian',
    flags: ['Civilian', 'No weapon'],
    summary: 'Small cardboard-style boxes—consumables and materials without weapon rolls.',
    stats: [
      { label: 'Maps', value: 'Village, Highway' },
      { label: 'Filter', value: 'No weapon flag' },
    ],
  },
  {
    slug: 'cabinet',
    name: 'Cabinet',
    kicker: 'High-volume civilian stash',
    category: 'civilian',
    flags: ['Civilian'],
    summary:
      '48-slot cabinets with the largest total spawn count in the game—dense in Village and Apartments. Common ammo, food, attachments, and occasional weapons.',
    stats: [
      { label: 'Container size', value: '6 × 8 (48 slots)' },
      { label: 'Total spawns', value: '~415 (community datamine)' },
      { label: 'Maps', value: 'Village, Apartments' },
    ],
    sections: [
      {
        title: 'Map wiki counts',
        links: [
          { href: '/wiki/maps/village', label: 'Village container table' },
          { href: '/wiki/maps/apartments', label: 'Apartments map wiki' },
        ],
      },
    ],
  },
  {
    slug: 'crate-military',
    name: 'Crate Military',
    kicker: 'Military-grade rolls',
    category: 'military',
    flags: ['Military'],
    summary: 'Olive military crates—ammo, attachments, armor plates, and service rifles on every major map.',
    stats: [
      { label: 'Maps', value: 'Village, Highway, School, Outpost, Minefield, Apartments, Terminal' },
      { label: 'Typical loot', value: '5.45/7.62 ammo, plates, optics, RK-95 cadence items' },
    ],
    sections: [
      {
        title: 'Related pages',
        links: [
          { href: '/wiki/maps/minefield', label: 'Minefield military crate notes' },
          { href: '/wiki/ammo', label: 'Ammo reference tables' },
        ],
      },
    ],
  },
  {
    slug: 'crate-special',
    name: 'Crate Special',
    kicker: 'Military · stash · joker',
    category: 'military',
    flags: ['Military', 'Stash', 'Joker'],
    summary:
      'Rare special crate with stash/joker flags—roughly 10% chance to appear on eligible map loads. High-value modules and outliers.',
    stats: [
      { label: 'Maps', value: 'Village, Highway, School, Outpost, Apartments, Terminal' },
      { label: 'Stash note', value: '~10% spawn chance per map load (community estimate)' },
    ],
  },
  {
    slug: 'electric-box',
    name: 'Electric Box',
    kicker: 'Electronics only',
    category: 'civilian',
    flags: ['Civilian', 'Only electronics'],
    summary: 'Wall-mounted electric boxes—wires, duct tape, batteries, and electronics without food or weapons.',
    stats: [{ label: 'Maps', value: 'Village, School' }],
  },
  {
    slug: 'fireplace',
    name: 'Fireplace',
    kicker: 'Matches source',
    category: 'civilian',
    flags: ['Civilian'],
    summary: 'Interior fireplaces—reliable matches for cooking and shelter upgrades.',
    stats: [{ label: 'Maps', value: 'Village' }],
  },
  {
    slug: 'freezer',
    name: 'Freezer',
    kicker: 'Consumables only',
    category: 'civilian',
    flags: ['Civilian', 'Only consumable'],
    summary: 'Standalone freezers—food and drink without weapon or medical rolls.',
    stats: [{ label: 'Maps', value: 'Village, School, Apartments' }],
  },
  {
    slug: 'fridge',
    name: 'Fridge',
    kicker: 'Consumables only',
    category: 'civilian',
    flags: ['Civilian', 'Only consumable'],
    summary: 'Kitchen fridges—canned goods, drinks, and cooking ingredients.',
    stats: [{ label: 'Maps', value: 'Village, Apartments' }],
  },
  {
    slug: 'fusebox',
    name: 'Fusebox',
    kicker: 'Electronics only',
    category: 'civilian',
    flags: ['Civilian', 'Only electronics'],
    summary: 'Fuseboxes and breaker panels—duct tape, wires, and electronics.',
    stats: [{ label: 'Maps', value: 'Village, Highway, School, Apartments' }],
  },
  {
    slug: 'garbage',
    name: 'Garbage',
    kicker: 'Bulk civilian filler',
    category: 'civilian',
    flags: ['Civilian', 'No weapon'],
    summary: 'Dumpsters and trash piles—materials, clothes, and food without weapon spawns.',
    stats: [
      { label: 'Maps', value: 'Village, Highway, School, Outpost, Apartments, Terminal' },
      { label: 'Village count', value: '31 spawns (map wiki table)' },
    ],
  },
  {
    slug: 'locker',
    name: 'Locker',
    kicker: 'School & Highway storage',
    category: 'civilian',
    flags: ['Civilian'],
    summary: 'Metal lockers—mixed civilian loot in School hallways and Highway transit points.',
    stats: [{ label: 'Maps', value: 'Highway, School' }],
  },
  {
    slug: 'mailbox',
    name: 'Mailbox',
    kicker: 'Books & materials',
    category: 'civilian',
    flags: ['Civilian', 'Only book'],
    summary: 'Street mailboxes—books and crafting materials, Village-only in EA Build 1.',
    stats: [{ label: 'Maps', value: 'Village' }],
  },
  {
    slug: 'medical-cabinet',
    name: 'Medical Cabinet',
    kicker: 'Medical-only rolls',
    category: 'civilian',
    flags: ['Civilian', 'Only medical'],
    summary:
      'Wall med cabinets—bandages, painkillers, and rare IFAK/medkit rolls. Critical before Doctor stock unlocks.',
    stats: [
      { label: 'Maps', value: 'Village, Highway, School, Outpost, Apartments' },
      { label: 'Village count', value: '6 spawns (map wiki table)' },
    ],
    sections: [
      {
        title: 'Related pages',
        links: [
          { href: '/wiki/items/medkit', label: 'Medkit item page' },
          { href: '/wiki/npcs/doctor', label: 'Doctor trader dossier' },
        ],
      },
    ],
  },
  {
    slug: 'nightstand',
    name: 'Nightstand',
    kicker: 'Bedroom civilian loot',
    category: 'civilian',
    flags: ['Civilian', 'No weapon'],
    summary: 'Bedside tables—same broad civilian pool as cabinets without weapon flag emphasis.',
    stats: [{ label: 'Maps', value: 'Village, Apartments' }],
  },
  {
    slug: 'office-cabinet',
    name: 'Office Cabinet',
    kicker: 'Office interiors',
    category: 'civilian',
    flags: ['Civilian', 'No weapon'],
    summary: 'Office filing cabinets—consumables and materials in School and Outpost admin wings.',
    stats: [{ label: 'Maps', value: 'Village, Highway, School, Outpost, Apartments' }],
  },
  {
    slug: 'stove',
    name: 'Stove',
    kicker: 'Kitchen consumables',
    category: 'civilian',
    flags: ['Civilian', 'Only consumable'],
    summary: 'Kitchen stoves—cooking ingredients and consumables only.',
    stats: [{ label: 'Maps', value: 'Village, Apartments' }],
  },
  {
    slug: 'tent',
    name: 'Tent (container)',
    kicker: 'Outdoor civilian stash',
    category: 'civilian',
    flags: ['Civilian'],
    summary: 'Lootable civilian tents—not to be confused with the Outpost player shelter. Mixed common loot.',
    stats: [{ label: 'Maps', value: 'Village, Highway, School, Apartments' }],
    sections: [
      {
        title: 'Related pages',
        links: [{ href: '/wiki/shelters/tent', label: 'Outpost Tent shelter (player hideout)' }],
      },
    ],
  },
  {
    slug: 'wooden-crate',
    name: 'Wooden Crate',
    kicker: 'Transit & port crates',
    category: 'civilian',
    flags: ['Civilian'],
    summary: 'Wooden shipping crates—ammo, food, medicine, guns, and modules on connector maps.',
    stats: [{ label: 'Maps', value: 'Village, Highway, Outpost, Terminal' }],
  },
]
