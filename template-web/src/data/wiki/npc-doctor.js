export default {
  slug: 'doctor',
  name: 'Doctor',
  /** World-map pin id for “view on atlas” from this NPC page. */
  mapPinId: 'shipyard',
  kicker: 'Medic trader',
  summary:
    'Friendly NPC who buys and sells medical supplies—bandages, medkits, tourniquets, and similar kit only.',
  image: 'images/wiki/npcs/doctor.png',
  tradeNotes: ['Trade pool is limited to medical items and related consumables.'],
  restockNotes: [
    '10-minute restock timer; at 0:00 the shelf resets with a new random selection.',
    'Higher level changes fees, not which items can appear in the table.',
  ],
  taskTiers: [
    {
      level: 1,
      tasks: [
        { name: 'Flu season', deliver: 'Cold medicine', receive: 'Tomatoes' },
        { name: 'Bad plumbing', deliver: 'Duct tape', receive: 'Bandage' },
        { name: 'Burning sensation', deliver: 'Lotion', receive: 'Matches, gas canister' },
        { name: 'Drug delivery I', deliver: '3× painkillers', receive: 'Mess kit' },
      ],
    },
    {
      level: 2,
      tasks: [
        { name: 'Night surgery', deliver: 'Polaris', receive: 'Hybrid' },
        { name: 'Deep sleep', deliver: 'Melatonin', receive: 'EXPS' },
        { name: 'Drug delivery II', deliver: '3× antibiotics', receive: 'Inverter' },
      ],
    },
    {
      level: 3,
      tasks: [
        { name: 'Steady hands', deliver: 'Cigar box', receive: 'Jääkäri backpack (M05)' },
        { name: 'Field trauma', deliver: '3× IFAK', receive: 'Plate carrier, Armor III' },
      ],
    },
    {
      level: 4,
      tasks: [{ name: 'Patient report', deliver: 'Doctor notes', receive: 'VSS, 3× medkit' }],
    },
  ],
  locationSteps: [
    'On the Shipyard map, enter the Hamikot Logistics building—the first building on the left when coming from the village.',
    'Move forward to the first gated grille entrance, go in, then turn left.',
    'Enter carefully; hostiles may be inside.',
    'Take the stairs down in the far corner of the building.',
    'Doctor is in the last room of the basement.',
  ],
}
