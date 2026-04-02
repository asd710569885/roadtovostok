<script setup>
import ammo from '../../data/wiki/ammo.js'
import WikiTopicShell from './WikiTopicShell.vue'
import WikiAmmoTables from './WikiAmmoTables.vue'

const meta = {
  slug: 'ammo',
  heading: 'Road to Vostok Ammo & Magazines',
  kicker: 'Ammunition',
  lead:
    'Per-round economy, weight, stack size, and which platforms eat each caliber—mirrors the Field Manual weapons hub, with icons hosted here.',
  seoTitle: 'Road to Vostok Ammo & Magazines Wiki | Calibers & Stacks',
  seoDescription:
    'Road to Vostok ammo wiki: round weight, stack sizes, caliber-to-weapon pairing, loot notes, and cross-links to the weapons table hub. Unofficial player reference.',
  seoKeywords:
    'road to vostok ammo, road to vostok ammunition, road to vostok magazines, road to vostok calibers, road to vostok loot, road to vostok weapons wiki, road to vostok steam, survival fps',
}
</script>

<template>
  <WikiTopicShell :meta="meta">
    <WikiAmmoTables :items="ammo" />
  </WikiTopicShell>
</template>
