export default {
  slug: 'shipyard',
  name: 'Shipyard',
  kicker: 'Legacy demo map',
  legacy: true,
  zone: 'Demo archive',
  summary:
    'Shipyard was a dense industrial dead-end in several public Steam demos—not part of the seven-map Early Access Build 1 roster (April 7, 2026). The Doctor medic trader now lives on the School map in EA; keep this page for demo-era container counts and historical routing only.',
  image: 'images/wiki/maps/shipyard.jpg',
  demoNote:
    'EA Build 1 maps: Village, School, Highway, Outpost (Area 05), Minefield (Border), Apartments & Terminal (Vostok). Shipyard and the Hamikot Logistics Doctor basement belong to older demo slices—confirm your build string in Steam before you route here.',
  highlights: [
    'Demo-era container farm: lockers, stacked containers, office cabinets—still useful if you are on a legacy demo branch.',
    'Doctor no longer spawns here in EA—use the School map guide and /wiki/npcs/doctor for the current medic trader.',
  ],
  npcs: [
    'Bandits used the standard spawn profile when Shipyard shipped in demo builds.',
    'Legacy note: Doctor sold medicine from Hamikot Logistics basement in demo marketing—EA moved him to School Build 1, 3rd floor.',
  ],
  lootContainers: [
    { name: 'Bandit corpse', quantity: 16, loot: 'Food, clothes, ammo, guns' },
    { name: 'Fridge', quantity: 1, loot: 'Food' },
    { name: 'Wooden crate', quantity: 15, loot: 'Common food, ammo, medicine, guns, materials, modules' },
    { name: 'Garbage', quantity: 36, loot: 'Food, materials, clothes' },
    { name: 'Office cabinet', quantity: 54, loot: 'Common mixed loot' },
    { name: 'Fusebox', quantity: 1, loot: 'Duct tape, wires' },
    { name: 'Civilian tent', quantity: 3, loot: 'Common mixed loot' },
    { name: 'Locker', quantity: 16, loot: 'Common mixed loot' },
    { name: 'Container', quantity: 38, loot: 'Floor randoms—often rigs and plates' },
    { name: 'Stacked / truck containers', quantity: 25, loot: 'Rare floor loot; some stacks need parkour' },
  ],
  lootTips: [
    'Tight urban sightlines—clear angles before long loot animations inside yards.',
    'Community warning: a barge softlock was reported in some demo builds—save often if you still play legacy slices.',
  ],
  weaponsNote:
    'Similar weapon profile to Village for many rifles and SMGs when Shipyard was active. EA players should treat numbers as archive-only until verified against a demo build.',
}
