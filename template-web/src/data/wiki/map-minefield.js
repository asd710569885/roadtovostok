export default {
  slug: 'minefield',
  name: 'Minefield',
  kicker: 'Border zone',
  summary:
    'Minefield is a border map laced with mines along the treeline toward radar. Border patrol replaces ordinary bandit pacing in places, and a pair of military crates anchor higher-tier rolls—plan for 7.62×39 farming and RK-95 drops more than exotic rifle jackpots.',
  image: 'images/wiki/maps/minefield.jpg',
  demoNote: null,
  highlights: [
    'Mines line the border and forest approaches—move slowly and scan ground cues; winter lighting can make tripwires easier to read than summer foliage.',
    'Only two military crates: great for ammo and mid-tier kits, less so for chasing every rare platform.',
  ],
  npcs: [
    'Border patrol spawns replace the generic bandit cadence for this map—expect different pressure than Village clears.',
  ],
  lootContainers: [
    { name: 'Bandit corpse', quantity: 6, loot: 'Food, clothes, ammo, guns' },
    {
      name: 'Military crate',
      quantity: 2,
      loot: 'Common military mix; can spike into rare weapons, modules, rigs, and 3–4 plates',
    },
    { name: 'Garbage', quantity: 4, loot: 'Food, materials, clothes' },
  ],
  lootTips: [
    'Community advice: winter runs can make buried mines easier to spot—still no substitute for careful pathing.',
    'Strong for 7.62×39 and RK-95 cadence off patrols; temper expectations for crate-only god rolls.',
  ],
  weaponsNote:
    'Minefield shifts the weapon chart: RK-95 abundant from border patrol; AK-12, VSS, SVD, MK18, KAR-21 variants, MP7, MP5SD lean rare from military crates or trenches; G17 listed uncommon in community tables. Validate every line against your build string.',
}
