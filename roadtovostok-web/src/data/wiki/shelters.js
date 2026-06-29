/**
 * Player shelters — EA Build 1 (Road).
 */
export default [
  {
    slug: 'cabin',
    name: 'Cabin',
    kicker: 'Village · default shelter',
    summary:
      'The Cabin is your default Village hideout—outside placement, unlocked from the start, and stocked with the largest default furniture set of any shelter. Ideal for early stash expansion and Generalist restock loops.',
    stats: [
      { label: 'Map', value: 'Village (Area 05)' },
      { label: 'Access', value: 'Unlocked by default' },
      { label: 'Default furniture', value: '17 items' },
      { label: 'Placement', value: 'Outside · 1/4' },
    ],
    sections: [
      {
        title: 'Default furniture',
        items: [
          'Bed (Civilian)',
          'Cabinet (Medical)',
          'Cabinet (Wood)',
          'Carpet (Rag)',
          'Curtain (Long)',
          'Curtain (Mini)',
          'Fireplace Brick',
          'Fridge',
          'Nightstand',
          'Painting (Lake)',
          'Rack (Coat)',
          'Rya (Maria)',
          'Shelf (Wall)',
          'Shelf (Wood)',
          'Sofa (Leather)',
          'Stool (Padded)',
          'Table (Cabin)',
        ],
      },
      {
        title: 'Related pages',
        links: [
          { href: '/wiki/maps/village', label: 'Village map wiki' },
          { href: '/map/village-map', label: 'Interactive Village raster map' },
          { href: '/wiki/npcs/generalist', label: 'Generalist trader dossier' },
        ],
      },
    ],
  },
  {
    slug: 'tent',
    name: 'Tent',
    kicker: 'Outpost · default shelter',
    summary:
      'The Outpost Tent is unlocked by default—a compact military-style shelter with furnace heat and minimal furniture. Pair with Gunsmith runs and tower clears.',
    stats: [
      { label: 'Map', value: 'Outpost (Area 05)' },
      { label: 'Access', value: 'Unlocked by default' },
      { label: 'Default furniture', value: '4 items' },
      { label: 'Placement', value: 'Outside · 1/2' },
    ],
    sections: [
      {
        title: 'Default furniture',
        items: ['Crate (Military)', 'Stool (Military)', 'Table (Canteen)', 'Tent Furnace'],
      },
      {
        title: 'Related pages',
        links: [
          { href: '/wiki/maps/outpost', label: 'Outpost map wiki' },
          { href: '/map/outpost-map', label: 'Interactive Outpost raster map' },
          { href: '/wiki/npcs/gunsmith', label: 'Gunsmith trader dossier' },
        ],
      },
    ],
  },
  {
    slug: 'attic',
    name: 'Attic',
    kicker: 'Village · key-locked',
    summary:
      'The Attic shelter sits above Village rooftops and requires an Attic Key. Smaller than the Cabin but adds vertical stash space once unlocked—often a mid-game objective after you stabilize Village loot.',
    stats: [
      { label: 'Map', value: 'Village (Area 05)' },
      { label: 'Access', value: 'Requires Attic Key' },
      { label: 'Default furniture', value: '5 items' },
      { label: 'Placement', value: 'Outside · 1/3' },
    ],
    sections: [
      {
        title: 'Required key',
        text: 'Find or earn the Attic Key in the world or via trader tasks—verify spawn notes in your build.',
        items: ['Attic Key'],
      },
      {
        title: 'Default furniture',
        items: ['Carpet (Rag)', 'Dartboard', 'Shelf (Wood)', 'Stool (Military)', 'Table (Canteen)'],
      },
      {
        title: 'Related pages',
        links: [
          { href: '/wiki/items/attic-key', label: 'Attic Key item page' },
          { href: '/wiki/maps/village', label: 'Village map wiki' },
          { href: '/map/village-map', label: 'Interactive Village raster map' },
        ],
      },
    ],
  },
  {
    slug: 'bunker',
    name: 'Bunker',
    kicker: 'Outpost · key-locked',
    summary:
      'The Outpost Bunker is a keyed shelter behind the military landmark cluster. Includes a Special crate slot in default furniture—high value once you secure the Bunker Key.',
    stats: [
      { label: 'Map', value: 'Outpost (Area 05)' },
      { label: 'Access', value: 'Requires Bunker Key' },
      { label: 'Default furniture', value: '4 items' },
      { label: 'Placement', value: 'Outside · 1/2' },
    ],
    sections: [
      {
        title: 'Required key',
        items: ['Bunker Key'],
      },
      {
        title: 'Default furniture',
        items: ['Crate (Military)', 'Crate (Special)', 'Stool (Military)', 'Table (Canteen)'],
      },
      {
        title: 'Related pages',
        links: [
          { href: '/wiki/items/bunker-key', label: 'Bunker Key item page' },
          { href: '/wiki/maps/outpost', label: 'Outpost map wiki' },
          { href: '/wiki/npcs/gunsmith', label: 'Gunsmith trader dossier' },
        ],
      },
    ],
  },
  {
    slug: 'classroom',
    name: 'Classroom',
    kicker: 'School · key-locked',
    summary:
      'The Classroom shelter anchors School progression—key-gated office furniture and a Nomad bed default. Natural pairing with Doctor medic runs on the 3rd floor.',
    stats: [
      { label: 'Map', value: 'School (Area 05)' },
      { label: 'Access', value: 'Requires Classroom Key' },
      { label: 'Default furniture', value: '8 items' },
      { label: 'Placement', value: 'Outside · 1/2' },
    ],
    sections: [
      {
        title: 'Required key',
        items: ['Classroom Key'],
      },
      {
        title: 'Default furniture',
        items: [
          'Bed (Nomad)',
          'Cabinet (Office)',
          'Carpet (Persian)',
          'Chair (Office)',
          'Chair (School)',
          'Locker',
          'Shelf (Metal)',
          'Table (Office)',
        ],
      },
      {
        title: 'Related pages',
        links: [
          { href: '/wiki/items/classroom-key', label: 'Classroom Key item page' },
          { href: '/wiki/maps/school', label: 'School map wiki' },
          { href: '/map/school-map', label: 'Interactive School raster map' },
          { href: '/wiki/npcs/doctor', label: 'Doctor trader dossier' },
        ],
      },
    ],
  },
]
