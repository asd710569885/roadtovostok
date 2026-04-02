export default {
  slug: 'village',
  name: 'Village',
  kicker: 'Starting map',
  summary:
    'Village is the Road to Vostok starting area where you spawn before pushing into the rest of the world. Cleared carefully and looted thoroughly, it can fund early raids without buying much from the Generalist—ideal for learning loot routes, bandit density, and shelter flow.',
  image: 'images/wiki/maps/village.jpg',
  demoNote: null,
  highlights: [
    'Central sandbox starter: dense houses, cabinets, and civilian loot loops.',
    'Strong early economy if you clear bandits and sweep containers before longer trips.',
  ],
  npcs: [
    'Bandits spawn at the usual rate for the map—expect contact while you clear blocks and interiors.',
    'The Generalist trader lives here, selling weapons, medkits, food, clothes, quest items, and more—re-entering his space can refresh stock faster than waiting on the restock timer alone.',
  ],
  lootContainers: [
    { name: 'Medical cabinet', quantity: 6, loot: 'Medicine (IFAK extremely rare)' },
    { name: 'Bandit corpse', quantity: 14, loot: 'Food, clothes, ammo, guns' },
    { name: 'Fridge', quantity: 9, loot: 'Food' },
    { name: 'Freezer', quantity: 10, loot: 'Food' },
    { name: 'Wooden crate', quantity: 9, loot: 'Food, ammo, medicine, guns, materials, modules' },
    { name: 'Garbage', quantity: 31, loot: 'Food, materials, clothes' },
    { name: 'Cabinet', quantity: 54, loot: 'Common food, ammo, medicine, guns, materials, modules' },
    { name: 'Nightstand', quantity: 10, loot: 'Same mix as cabinets' },
    { name: 'Fireplace', quantity: 8, loot: 'Matches' },
    { name: 'Fusebox / electric box', quantity: 14, loot: 'Duct tape, wires' },
    { name: 'Mailbox', quantity: 7, loot: 'Materials' },
    { name: 'Civilian tent', quantity: 3, loot: 'Mixed common loot' },
  ],
  lootTips: [
    'Rare modules (e.g. Monster, Rider), quest items such as batteries, and armor (helmets, rigs, plates) can appear on the ground—check floors under roofs, including attic-adjacent passages.',
    'Selling in bulk: stepping out and back to the Generalist often beats sitting on the restock clock and can surface batteries, guns, and ammo in his rotation.',
  ],
  weaponsNote:
    'Community-sourced spawn chart: Mosin and Makarov are abundant from bandits and shelves; G17, C1911, MP5 common; RM-870, MP5K, AKS-74U uncommon; AKM, RK-95 rare; MP5SD and KP-31 very rare on shelves or ground; many top-tier rifles absent here. Always verify against your HUD build.',
}
