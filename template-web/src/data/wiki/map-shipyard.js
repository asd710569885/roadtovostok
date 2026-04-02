export default {
  slug: 'shipyard',
  name: 'Shipyard',
  kicker: 'Industrial zone',
  summary:
    'Shipyard is reached from the Village and currently acts as a dead-end industrial map in Road to Vostok. It is dense with containers and tight buildings—strong for general loot farming—and hosts the Doctor medic trader for medkits and medical barter.',
  image: 'images/wiki/maps/shipyard.jpg',
  demoNote:
    'Community notes: as of early October (Steam Next Fest snapshot), Shipyard was not available in that demo build—confirm in your Steam library build before routing here.',
  highlights: [
    'Doctor trader: best on-map source to stack medkits and medical trades.',
    'Container-heavy layout favors rigs, plates, and random floor spawns inside logistics stacks.',
  ],
  npcs: [
    'Bandits use the standard spawn profile for the map.',
    'Doctor sells medicine-focused stock in the Hamikot Logistics basement (see NPC dossier for step-by-step directions).',
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
    'Tight urban sightlines—clear angles before you commit to long loot animations inside yards.',
    'Community warning: a softlock can occur on the barge; you may still escape in some situations—save often.',
  ],
  weaponsNote:
    'Similar weapon profile to Village for many rifles and SMGs; Mosin and Makarov abundant; mid-tier guns common through bandits and shelves; MP5SD very rare. Cross-check the live wiki table against your build.',
}
