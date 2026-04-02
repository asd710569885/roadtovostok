<script setup>
import { computed } from 'vue'

const props = defineProps({
  items: { type: Array, required: true },
  groupOrder: { type: Array, required: true },
  groupLabels: { type: Object, required: true },
  columns: { type: Array, required: true },
})

const groups = computed(() => {
  const byCat = new Map()
  for (const row of props.items) {
    const k = row.category || 'other'
    if (!byCat.has(k)) byCat.set(k, [])
    byCat.get(k).push(row)
  }
  const out = []
  for (const key of props.groupOrder) {
    const rows = byCat.get(key)
    if (rows?.length) out.push({ key, label: props.groupLabels[key] || key, rows })
    byCat.delete(key)
  }
  for (const [key, rows] of byCat) {
    if (rows.length) out.push({ key, label: props.groupLabels[key] || key, rows })
  }
  return out
})

function cell(v) {
  if (v === null || v === undefined || v === '') return '—'
  return String(v)
}
</script>

<template>
  <div class="wiki-gtable">
    <section
      v-for="g in groups"
      :key="g.key"
      class="wiki-gtable__block"
      :aria-labelledby="'wiki-gtable-' + g.key"
    >
      <h2 :id="'wiki-gtable-' + g.key" class="wiki-gtable__h2">{{ g.label }}</h2>
      <div class="wiki-gtable__scroll">
        <table class="wiki-gtable__table">
          <thead>
            <tr>
              <th v-for="col in columns" :key="col.key" scope="col" class="wiki-gtable__th">{{ col.label }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, ri) in g.rows" :key="row.id || ri" class="wiki-gtable__tr">
              <td v-for="col in columns" :key="col.key" class="wiki-gtable__td">{{ cell(row[col.key]) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<style scoped>
.wiki-gtable__block + .wiki-gtable__block {
  margin-top: 2rem;
}

.wiki-gtable__h2 {
  margin: 0 0 0.65rem;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text);
}

.wiki-gtable__scroll {
  overflow-x: auto;
  border-radius: 10px;
  border: 1px solid color-mix(in srgb, var(--color-border) 75%, transparent);
  background: color-mix(in srgb, #1e1e1e 92%, var(--color-bg-deep));
}

.wiki-gtable__table {
  width: 100%;
  min-width: 480px;
  border-collapse: collapse;
  font-size: 0.8125rem;
}

.wiki-gtable__th {
  text-align: left;
  padding: 0.65rem 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-size: 0.65rem;
  color: color-mix(in srgb, var(--color-text-muted) 90%, var(--color-text));
  background: color-mix(in srgb, #2a2a2a 88%, transparent);
  border-bottom: 1px solid color-mix(in srgb, var(--color-border) 70%, transparent);
}

.wiki-gtable__tr:nth-child(even) .wiki-gtable__td {
  background: color-mix(in srgb, #1a1a1a 55%, transparent);
}

.wiki-gtable__td {
  padding: 0.5rem 0.75rem;
  vertical-align: top;
  color: var(--color-text);
  border-bottom: 1px solid color-mix(in srgb, var(--color-border) 45%, transparent);
}
</style>
