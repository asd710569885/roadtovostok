export default {
  slug: 'bandits',
  name: 'Bandits',
  mapPinId: 'area-05',
  kicker: 'Hostiles',
  summary:
    'Bandits are the main hostile NPCs that spawn across maps. Loadouts and visuals vary by location and random pools when each bandit spawns.',
  image: 'images/wiki/npcs/bandits.png',
  equipment: [
    'They can spawn with a wide mix of weapons, gear, and loot—what you meet depends on the map and the roll when the NPC is created.',
    'Bandits can carry two firearms: one in hands and a second on a sling across the back.',
    'Beyond guns they may wear head gear such as Polaris, and backpacks you can strip from corpses.',
  ],
  behaviours: [
    {
      title: 'Running away',
      text: 'Triggers if the player has spooked them with gunfire or left them heavily wounded.',
    },
    {
      title: 'Taking cover',
      text: 'Often returns fire from windows or other hard cover.',
    },
    {
      title: 'Ambush mode',
      text: 'May crouch in place—commonly inside a building, sometimes behind a closed door—to surprise you on entry.',
    },
    {
      title: 'Stalking',
      text: 'Crouch-walks or slow-walks toward your last known position using sight or sound cues.',
    },
  ],
  notes: [
    'Some bandits fire a shot, then sprint for the nearest cover or structure.',
    'Vision cones are limited: approaching from behind can keep you off their radar until you are close.',
  ],
  quirks: [
    'Dense bushes or small trees can make you nearly invisible—bandits may still drift toward your rough position, which is risky.',
    'A bandit in ambush indoors may appear idle if you watch through an outside window.',
    'Footstep reactions can be sluggish; some wander away while you stand only meters off.',
  ],
}
