export default {
  slug: 'highway',
  name: 'Highway',
  kicker: 'Transit route',
  summary:
    'Highway connects the Village and Minefield in Road to Vostok—an open transit map with cars, scattered containers, and fewer rare rolls than denser urban tiles. Expect long sightlines and bandit contact while you move between hubs.',
  image: 'images/wiki/maps/highway.jpg',
  demoNote:
    'Community notes: Steam Next Fest demo builds around early October omitted Highway—verify map availability on your installed version.',
  highlights: [
    'Shelter exists on the map but may be locked depending on build—plan extracts without assuming a save bed.',
    'Loot per tile is thinner than Village or Shipyard; prioritize safe rotation over jackpot farming.',
  ],
  npcs: ['Bandits at the usual encounter rate—open ground makes flanking and long shots more common.'],
  lootContainers: [
    { name: 'Bandit corpse', quantity: 11, loot: 'Food, clothes, ammo, guns' },
    { name: 'Wooden crate', quantity: 4, loot: 'Common mixed loot' },
    { name: 'Garbage', quantity: 19, loot: 'Food, materials, clothes' },
    { name: 'Car', quantity: 15, loot: 'Common mixed loot' },
    { name: 'Electric box', quantity: 4, loot: 'Duct tape, wires' },
    { name: 'Civilian tent', quantity: 2, loot: 'Common mixed loot' },
    { name: 'Container', quantity: 3, loot: 'Floor randoms—rigs/plates possible' },
    { name: 'Inaccessible container', quantity: 1, loot: 'Parkour-dependent' },
    { name: 'Truck container', quantity: 8, loot: 'Floor random rares' },
  ],
  lootTips: [
    'Not the best map for rare weapon farming—open lanes mean you can be engaged from multiple bearings.',
  ],
  weaponsNote:
    'Weapon rarity largely mirrors other civilian-bandit maps: Mosin/Makarov abundant, MP5 and pistols common, RM-870 and MP5K uncommon, AKM/RK-95 rare, top-tier DMRs absent. Confirm in-client.',
}
