export default {
  slug: 'generalist',
  name: 'Generalist',
  mapPinId: 'village',
  kicker: 'Trader',
  summary:
    'Friendly trader who buys almost anything of value from your inventory and sells a rotating mix of consumables, quest items, crafting parts, meds, and weapons.',
  image: 'images/wiki/npcs/generalist.png',
  tradeNotes: [
    'Stock often includes consumables (food, water), quest items (e.g. Polaris), crafting materials (wire spool, cooking plate), medicaments (bandages, medkits), and weapons (e.g. Makarov).',
  ],
  restockNotes: [
    'Inventory refreshes on a 10-minute timer; at 0:00 the offer resets and the countdown starts again—items are random each restock.',
    'Re-entering the Shelter and leaving immediately can roll a fresh Generalist loadout faster than waiting out the timer.',
    'Higher trader level adjusts fees only; it does not swap the underlying stock table.',
  ],
  taskTiers: [
    {
      level: 1,
      tasks: [
        { name: 'Duty Calls', deliver: 'Toilet paper', receive: 'Jeans' },
        { name: 'Coffee Break', deliver: 'Coffee, crackers', receive: 'Duct tape' },
        { name: 'Canned Goods', deliver: 'Tuna, meat, peaches', receive: 'Bandage' },
        { name: 'Weapon delivery I', deliver: 'Makarov, AKM (any condition)', receive: 'Duffel (Retro)' },
      ],
    },
    {
      level: 2,
      tasks: [
        { name: 'Bookworm', deliver: 'B. Fishing, B. Cooking, B. Religion', receive: 'PBS' },
        { name: 'Leather goods', deliver: 'Leather gloves, fabric leather', receive: 'Peanuts (salted)' },
        { name: 'Finnish dinner', deliver: 'Pea soup (cooked), mustard', receive: 'Jacket M62, Armor III+' },
      ],
    },
    {
      level: 3,
      tasks: [
        { name: 'High voltage', deliver: '3× battery', receive: 'Mosin' },
        { name: 'Fishing supplies', deliver: 'Tackle box', receive: 'Splint, windbreaker (green)' },
        { name: 'Weapon delivery II', deliver: 'RK-95, AK-12 (any condition)', receive: 'PRO, medkit' },
        {
          name: 'Swedish delights',
          deliver: 'Snus original, Snus mint, Snus licorice, Snus strong',
          receive: 'Field ration',
        },
      ],
    },
    {
      level: 4,
      tasks: [
        {
          name: 'Bad Santa',
          deliver: 'Santa jacket, KP-31 (any condition)',
          receive: 'Monster, ACOG, MK-18',
        },
      ],
    },
  ],
  locationSteps: [
    'From the Village shelter exit, go down the ramp.',
    'Turn right into the passage between the building garages.',
    'Turn right again and walk straight along the garages.',
    'Take the last right into half-open doors near a skip filled with rocks—the Generalist is inside.',
  ],
}
