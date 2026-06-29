/**
 * Featured item dossiers — curated subset (not full 249-item database).
 */
export default [
  {
    slug: 'attic-key',
    name: 'Attic Key',
    kicker: 'Legendary key · Village',
    category: 'key',
    flags: ['Key', 'Legendary'],
    summary:
      'Unlocks the Attic player shelter above Village. Legendary rarity—track down via world loot or trader tasks before committing stash upgrades.',
    stats: [
      { label: 'Rarity', value: 'Legendary' },
      { label: 'Weight', value: '0.1 kg · 1 slot' },
      { label: 'Trader value', value: '250 € (250 €/VPS weighted)' },
      { label: 'Unlocks', value: 'Attic shelter (Village)' },
    ],
    sections: [
      {
        title: 'Related pages',
        links: [
          { href: '/wiki/shelters/attic', label: 'Attic shelter wiki' },
          { href: '/wiki/maps/village', label: 'Village map wiki' },
        ],
      },
    ],
  },
  {
    slug: 'bunker-key',
    name: 'Bunker Key',
    kicker: 'Legendary key · Outpost',
    category: 'key',
    flags: ['Key', 'Legendary'],
    summary: 'Opens the Outpost Bunker shelter with default Special crate furniture—high priority for military farmers.',
    stats: [
      { label: 'Rarity', value: 'Legendary' },
      { label: 'Weight', value: '0.1 kg · 1 slot' },
      { label: 'Unlocks', value: 'Bunker shelter (Outpost)' },
    ],
    sections: [
      {
        title: 'Related pages',
        links: [
          { href: '/wiki/shelters/bunker', label: 'Bunker shelter wiki' },
          { href: '/wiki/maps/outpost', label: 'Outpost map wiki' },
        ],
      },
    ],
  },
  {
    slug: 'classroom-key',
    name: 'Classroom Key',
    kicker: 'Legendary key · School',
    category: 'key',
    flags: ['Key', 'Legendary'],
    summary: 'Required for the Classroom shelter on School—pairs with Doctor medic runs and multi-floor clears.',
    stats: [
      { label: 'Rarity', value: 'Legendary' },
      { label: 'Weight', value: '0.1 kg · 1 slot' },
      { label: 'Unlocks', value: 'Classroom shelter (School)' },
    ],
    sections: [
      {
        title: 'Related pages',
        links: [
          { href: '/wiki/shelters/classroom', label: 'Classroom shelter wiki' },
          { href: '/wiki/npcs/doctor', label: 'Doctor trader dossier' },
        ],
      },
    ],
  },
  {
    slug: 'medkit',
    name: 'Medkit',
    kicker: 'Medical · rare heal',
    category: 'medical',
    flags: ['Medical', 'Rare'],
    summary:
      'Full medkit for heavy trauma—rare in medical cabinets and Doctor stock. Weighs 1.2 kg across 6 slots; sell value ~550 €.',
    stats: [
      { label: 'Rarity', value: 'Rare' },
      { label: 'Weight', value: '1.2 kg · 6 slots' },
      { label: 'Trader value', value: '550 € (91.7 €/VPS weighted)' },
      { label: 'Sources', value: 'Medical cabinets, Doctor trader, rare world spawns' },
    ],
    sections: [
      {
        title: 'Related pages',
        links: [
          { href: '/wiki/loot-containers/medical-cabinet', label: 'Medical Cabinet loot type' },
          { href: '/wiki/npcs/doctor', label: 'Doctor trader dossier' },
        ],
      },
    ],
  },
  {
    slug: 'bandage',
    name: 'Bandage',
    kicker: 'Medical · common heal',
    category: 'medical',
    flags: ['Medical', 'Common'],
    summary: 'Baseline bleed control—common in cabinets, bandit drops, and Generalist rotation. 150 € sell, 0.1 kg.',
    stats: [
      { label: 'Rarity', value: 'Common' },
      { label: 'Weight', value: '0.1 kg · 1 slot' },
      { label: 'Trader value', value: '150 €' },
    ],
  },
  {
    slug: 'batteries',
    name: 'Batteries',
    kicker: 'Electronics · quest staple',
    category: 'electronics',
    flags: ['Electronics', 'Rare'],
    summary:
      'Quest and barter staple—Generalist tasks and electronics crafts. Check fuseboxes, electric boxes, and trader restocks.',
    stats: [
      { label: 'Rarity', value: 'Rare' },
      { label: 'Weight', value: '0.1 kg · 1 slot' },
      { label: 'Trader value', value: '100 € (20 €/VPS weighted)' },
    ],
    sections: [
      {
        title: 'Related pages',
        links: [
          { href: '/wiki/npcs/generalist', label: 'Generalist task tiers' },
          { href: '/wiki/loot-containers/fusebox', label: 'Fusebox container type' },
        ],
      },
    ],
  },
  {
    slug: 'map',
    name: 'Map',
    kicker: 'Misc · navigation',
    category: 'misc',
    flags: ['Misc', 'Rare'],
    summary: 'In-world paper map item—250 € rarity sell. Distinct from this site’s /map interactive atlas.',
    stats: [
      { label: 'Rarity', value: 'Rare' },
      { label: 'Weight', value: '0.2 kg · 4 slots' },
      { label: 'Trader value', value: '250 € (62.5 €/VPS weighted)' },
    ],
    sections: [
      {
        title: 'Related pages',
        links: [{ href: '/map', label: 'Interactive world map (this site)' }],
      },
    ],
  },
  {
    slug: 'war-chocolate',
    name: 'War Chocolate',
    kicker: 'Legendary consumable',
    category: 'consumable',
    flags: ['Consumable', 'Rare'],
    summary: 'High-value morale consumable—350 € sell, 0.1 kg. Military/civilian flag mix in datamine pools.',
    stats: [
      { label: 'Rarity', value: 'Rare' },
      { label: 'Weight', value: '0.1 kg · 1 slot' },
      { label: 'Trader value', value: '350 € (70 €/VPS weighted)' },
    ],
  },
  {
    slug: 'sauna-hat',
    name: 'Sauna Hat',
    kicker: 'Legendary clothing',
    category: 'clothing',
    flags: ['Clothing', 'Legendary'],
    summary: 'Meme-tier legendary headwear—450 € value with heavy weighted sell penalty. Flex item more than meta gear.',
    stats: [
      { label: 'Rarity', value: 'Legendary' },
      { label: 'Weight', value: '0.3 kg · 4 slots' },
      { label: 'Trader value', value: '450 € (112.5 €/VPS · 1.13 €/VPS weighted)' },
    ],
  },
  {
    slug: 'cassette-player',
    name: 'Casette Player',
    kicker: 'Legendary electronics',
    category: 'electronics',
    flags: ['Electronics', 'Legendary'],
    summary:
      'Portable cassette player—legendary electronics with shelter ambiance use. 250 € base, extremely low weighted sell.',
    stats: [
      { label: 'Rarity', value: 'Legendary' },
      { label: 'Weight', value: '0.2 kg · 1 slot' },
      { label: 'Trader value', value: '250 € (2.5 €/VPS weighted)' },
    ],
  },
]
