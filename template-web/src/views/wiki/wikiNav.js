/** In-app wiki section nav (kept out of /data/wiki so data files stay default-export-only). */
export const WIKI_NAV = [
  {
    slug: 'weapons',
    routePath: '/wiki/weapons',
    kicker: 'Combat',
    title: 'Weapons',
    blurb: 'Reference tables by weapon class—verify values in your installed build.',
  },
  {
    slug: 'ammo',
    routePath: '/wiki/ammo',
    kicker: 'Ammunition',
    title: 'Ammo',
    blurb: 'Calibers and pairing notes as we expand the table.',
  },
  {
    slug: 'maps',
    routePath: '/wiki/maps',
    kicker: 'Atlas',
    title: 'Maps',
    blurb: 'Village, Shipyard, Highway, Minefield—each with its own guide and map art.',
  },
  {
    slug: 'npcs',
    routePath: '/wiki/npcs',
    kicker: 'People',
    title: 'NPCs',
    blurb: 'Bandits, Generalist, and Doctor—each with its own profile page.',
  },
]
