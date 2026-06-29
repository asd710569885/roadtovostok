export default {
  slug: 'gunsmith',
  name: 'Gunsmith',
  mapPinId: 'outpost',
  kicker: 'Weapons trader',
  summary:
    'Weapon Specialist (Gunsmith) on the Outpost map in EA Build 1—sells firearms, attachments, armor plates, and weapon-focused barter. Pure barter like other traders; stock rotates on a timer.',
  image: 'images/wiki/npcs/generalist.png',
  tradeNotes: [
    'Stock includes weapons, optics, suppressors, armor plates, and related parts—exact offers vary each restock.',
    'Community notes: he often appears around in-game Day 10 in the Outpost bunker; verify event timing in your client.',
  ],
  restockNotes: [
    '10-minute restock timer; at 0:00 the shelf resets with a new random selection.',
    'Higher trader level adjusts fees, not the underlying weapon pool.',
  ],
  taskTiers: [
    {
      level: 1,
      tasks: [
        { name: 'Sidearm check', deliver: 'Makarov (any condition)', receive: 'Pistol suppressor' },
        { name: 'Ammo run', deliver: '3× 9×19 FMJ', receive: 'Magazine pouch' },
      ],
    },
    {
      level: 2,
      tasks: [
        { name: 'Long gun delivery', deliver: 'SKS (any condition)', receive: 'PU scope' },
        { name: 'Mod parts', deliver: 'Duct tape, wire spool', receive: 'Rail mount' },
      ],
    },
  ],
  locationSteps: [
    'Transit from Village → School → Highway → Outpost using the yellow-tape boundaries (EA map chain).',
    'On Outpost, hug the left rock line past the tent shelter (second save point for many routes).',
    'Find the broken tank in front of a bunker entrance carved into the rocks—the Gunsmith is inside.',
    'Pair with /map/outpost-map for raster pins and /wiki/maps for macro zone context.',
  ],
}
