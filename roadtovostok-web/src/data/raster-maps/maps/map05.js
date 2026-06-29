/**
 * Map 05 — 栅格图 /map/minefield-map（MapRasterM05View）。
 * 与 map01 及其它图完全独立。
 * 图钉自 roadtovostok.wiki 页内嵌数据解析（无 AI 路点），归一化：
 * nx=(x-world_center_x)/world_size+0.5，ny=(z-world_center_z)/world_size+0.5。
 * @see https://roadtovostok.wiki/maps/minefield-interactive-map
 */

export const mapLegend = [
  { id: 'poi', label: 'Map' },
  { id: 'fire', label: 'Fire' },
  { id: 'lootContainer', label: 'Loot Container' },
  { id: 'groundLoot', label: 'Ground Loot' },
]

export const mapCategories = [
  {
    id: 'poi',
    label: 'Map',
    kinds: [{ id: 'road', label: 'Map Transition', pinIcon: 'location', pinColor: '#4a9eff' }],
  },
  {
    id: 'fire',
    label: 'Fire',
    kinds: [{ id: 'fire-barrel', label: 'Barrel Fire', pinIcon: 'fire_barrel', pinColor: '#c23b22' }],
  },
  {
    id: 'lootContainer',
    label: 'Loot Container',
    kinds: [
      { id: 'lc-bandit-corpse', label: 'Bandit Corpse', pinIcon: 'loot_corpse', pinColor: '#8b7355' },
      { id: 'lc-crate-military', label: 'Crate Military', pinIcon: 'loot_mil_crate', pinColor: '#e85d2c' },
    ],
  },
  {
    id: 'groundLoot',
    label: 'Ground Loot',
    kinds: [
      { id: 'gl-industrial', label: 'Industrial', pinIcon: 'ground_industrial', pinColor: '#6b9ec9' },
    ],
  },
]

const pins = [
  { id: 'minefield-road-outpost-1', title: 'Outpost', category: 'poi', kind: 'road', x: 0.1811, y: 0.5085, content: `<p>Map Transition</p><a href="/map/outpost-map">View Map</a>` },
  { id: 'minefield-road-apartments-1', title: 'Apartments', category: 'poi', kind: 'road', x: 0.8147, y: 0.5085, content: `<p>Map Transition</p><a href="/map/apartments-map">View Map</a>` },
  { id: 'minefield-lc-crate-military-1', title: 'Crate Military', category: 'lootContainer', kind: 'lc-crate-military', x: 0.6588, y: 0.3365, content: `` },
  { id: 'minefield-lc-crate-military-2', title: 'Crate Military', category: 'lootContainer', kind: 'lc-crate-military', x: 0.6588, y: 0.3365, content: `` },
  { id: 'minefield-lc-crate-military-3', title: 'Crate Military', category: 'lootContainer', kind: 'lc-crate-military', x: 0.6525, y: 0.3463, content: `` },
  { id: 'minefield-gl-industrial-1', title: 'Industrial', category: 'groundLoot', kind: 'gl-industrial', x: 0.6563, y: 0.3422, content: `` },
  { id: 'minefield-gl-industrial-2', title: 'Industrial', category: 'groundLoot', kind: 'gl-industrial', x: 0.6563, y: 0.3422, content: `` },
  { id: 'minefield-lc-crate-military-4', title: 'Crate Military', category: 'lootContainer', kind: 'lc-crate-military', x: 0.6588, y: 0.4474, content: `` },
  { id: 'minefield-lc-crate-military-5', title: 'Crate Military', category: 'lootContainer', kind: 'lc-crate-military', x: 0.6588, y: 0.4474, content: `` },
  { id: 'minefield-lc-crate-military-6', title: 'Crate Military', category: 'lootContainer', kind: 'lc-crate-military', x: 0.6525, y: 0.4572, content: `` },
  { id: 'minefield-gl-industrial-3', title: 'Industrial', category: 'groundLoot', kind: 'gl-industrial', x: 0.6563, y: 0.4531, content: `` },
  { id: 'minefield-gl-industrial-4', title: 'Industrial', category: 'groundLoot', kind: 'gl-industrial', x: 0.6563, y: 0.4531, content: `` },
  { id: 'minefield-lc-crate-military-7', title: 'Crate Military', category: 'lootContainer', kind: 'lc-crate-military', x: 0.6588, y: 0.5424, content: `` },
  { id: 'minefield-lc-crate-military-8', title: 'Crate Military', category: 'lootContainer', kind: 'lc-crate-military', x: 0.6588, y: 0.5424, content: `` },
  { id: 'minefield-lc-crate-military-9', title: 'Crate Military', category: 'lootContainer', kind: 'lc-crate-military', x: 0.6525, y: 0.5522, content: `` },
  { id: 'minefield-gl-industrial-5', title: 'Industrial', category: 'groundLoot', kind: 'gl-industrial', x: 0.6563, y: 0.5481, content: `` },
  { id: 'minefield-gl-industrial-6', title: 'Industrial', category: 'groundLoot', kind: 'gl-industrial', x: 0.6563, y: 0.5481, content: `` },
  { id: 'minefield-lc-crate-military-10', title: 'Crate Military', category: 'lootContainer', kind: 'lc-crate-military', x: 0.6588, y: 0.6533, content: `` },
  { id: 'minefield-lc-crate-military-11', title: 'Crate Military', category: 'lootContainer', kind: 'lc-crate-military', x: 0.6588, y: 0.6533, content: `` },
  { id: 'minefield-lc-crate-military-12', title: 'Crate Military', category: 'lootContainer', kind: 'lc-crate-military', x: 0.6525, y: 0.6631, content: `` },
  { id: 'minefield-gl-industrial-7', title: 'Industrial', category: 'groundLoot', kind: 'gl-industrial', x: 0.6563, y: 0.659, content: `` },
  { id: 'minefield-gl-industrial-8', title: 'Industrial', category: 'groundLoot', kind: 'gl-industrial', x: 0.6563, y: 0.659, content: `` },
  { id: 'minefield-lc-crate-military-13', title: 'Crate Military', category: 'lootContainer', kind: 'lc-crate-military', x: 0.668, y: 0.5389, content: `` },
  { id: 'minefield-lc-crate-military-14', title: 'Crate Military', category: 'lootContainer', kind: 'lc-crate-military', x: 0.6696, y: 0.5389, content: `` },
  { id: 'minefield-lc-crate-military-15', title: 'Crate Military', category: 'lootContainer', kind: 'lc-crate-military', x: 0.6664, y: 0.5389, content: `` },
  { id: 'minefield-gl-industrial-9', title: 'Vostok', category: 'groundLoot', kind: 'gl-industrial', x: 0.6658, y: 0.537, content: `` },
  { id: 'minefield-fire-barrel-1', title: 'Barrel Fire', category: 'fire', kind: 'fire-barrel', x: 0.3072, y: 0.3932, content: `` },
  { id: 'minefield-lc-bandit-corpse-1', title: 'Bandit Corpse', category: 'lootContainer', kind: 'lc-bandit-corpse', x: 0.3233, y: 0.4208, content: `` },
  { id: 'minefield-lc-crate-military-16', title: 'Crate Military', category: 'lootContainer', kind: 'lc-crate-military', x: 0.307, y: 0.404, content: `` },
  { id: 'minefield-lc-crate-military-17', title: 'Crate Military', category: 'lootContainer', kind: 'lc-crate-military', x: 0.307, y: 0.4024, content: `` },
  { id: 'minefield-lc-crate-military-18', title: 'Crate Military', category: 'lootContainer', kind: 'lc-crate-military', x: 0.307, y: 0.404, content: `` },
  { id: 'minefield-gl-industrial-10', title: 'Industrial', category: 'groundLoot', kind: 'gl-industrial', x: 0.2999, y: 0.3976, content: `` },
  { id: 'minefield-gl-industrial-11', title: 'Industrial', category: 'groundLoot', kind: 'gl-industrial', x: 0.3158, y: 0.3739, content: `` },
  { id: 'minefield-gl-industrial-12', title: 'Industrial', category: 'groundLoot', kind: 'gl-industrial', x: 0.3158, y: 0.4214, content: `` },
  { id: 'minefield-lc-bandit-corpse-2', title: 'Bandit Corpse', category: 'lootContainer', kind: 'lc-bandit-corpse', x: 0.3055, y: 0.5958, content: `` },
  { id: 'minefield-lc-crate-military-19', title: 'Crate Military', category: 'lootContainer', kind: 'lc-crate-military', x: 0.3037, y: 0.5963, content: `` },
  { id: 'minefield-lc-crate-military-20', title: 'Crate Military', category: 'lootContainer', kind: 'lc-crate-military', x: 0.3021, y: 0.5963, content: `` },
  { id: 'minefield-gl-industrial-13', title: 'Industrial', category: 'groundLoot', kind: 'gl-industrial', x: 0.2999, y: 0.6035, content: `` },
  { id: 'minefield-gl-industrial-14', title: 'Industrial', category: 'groundLoot', kind: 'gl-industrial', x: 0.3158, y: 0.5798, content: `` },
  { id: 'minefield-gl-industrial-15', title: 'Industrial', category: 'groundLoot', kind: 'gl-industrial', x: 0.3158, y: 0.6273, content: `` },
  { id: 'minefield-gl-industrial-16', title: 'Industrial', category: 'groundLoot', kind: 'gl-industrial', x: 0.3791, y: 0.6511, content: `` },
  { id: 'minefield-lc-bandit-corpse-3', title: 'Bandit Corpse', category: 'lootContainer', kind: 'lc-bandit-corpse', x: 0.4631, y: 0.594, content: `` },
  { id: 'minefield-gl-industrial-17', title: 'Industrial', category: 'groundLoot', kind: 'gl-industrial', x: 0.4662, y: 0.5956, content: `` },
  { id: 'minefield-gl-industrial-18', title: 'Industrial', category: 'groundLoot', kind: 'gl-industrial', x: 0.5296, y: 0.4452, content: `` },
  { id: 'minefield-gl-industrial-19', title: 'Industrial', category: 'groundLoot', kind: 'gl-industrial', x: 0.6484, y: 0.5085, content: `` }
]

export default {
  mapId: 'map05',
  imageUrl: '/images/map/map-05.png',
  pinCategoryField: 'category',
  mapLegend,
  mapCategories,
  pins,
}
