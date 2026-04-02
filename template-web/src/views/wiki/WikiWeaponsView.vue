<script setup>
import weapons from '../../data/wiki/weapons.js'
import WikiTopicShell from './WikiTopicShell.vue'
import WikiWeaponTables from './WikiWeaponTables.vue'

const meta = {
  slug: 'weapons',
  heading: 'Road to Vostok Weapons',
  kicker: 'Combat',
  lead:
    'Grouped weapon tables with on-site thumbnails—built for fast lookup. Numbers can shift with patches; trust what you see in-game when stakes are high.',
  seoTitle: 'Road to Vostok Weapons Wiki | Reloads, Calibers & Tables',
  seoDescription:
    'Road to Vostok weapons wiki: realistic reload flow, caliber and magazine tables, thumbnails, loot and trader context. Links to ammo guides. Unofficial—verify in your Steam build.',
  seoKeywords:
    'road to vostok weapons, road to vostok guns, road to vostok reloading, road to vostok calibers, road to vostok magazines, road to vostok wiki, road to vostok steam, survival fps, field manual',
}
</script>

<template>
  <WikiTopicShell :meta="meta">
    <WikiWeaponTables :items="weapons" />
  </WikiTopicShell>
</template>
