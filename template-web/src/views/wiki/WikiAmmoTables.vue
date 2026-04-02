<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
})

const baseUrl = import.meta.env.BASE_URL

const CATEGORY_ORDER = ['pistol_smg', 'rifle', 'full_power', 'shotgun']

const CATEGORY_LABELS = {
  pistol_smg: 'Pistol, SMG & PDW rounds',
  rifle: 'Rifle calibers',
  full_power: 'Full-power rifle',
  shotgun: 'Shotgun shells',
}

const groups = computed(() => {
  const byCat = new Map()
  for (const row of props.items) {
    const k = row.category || 'other'
    if (!byCat.has(k)) byCat.set(k, [])
    byCat.get(k).push(row)
  }
  const out = []
  for (const key of CATEGORY_ORDER) {
    const rows = byCat.get(key)
    if (rows?.length) out.push({ key, label: CATEGORY_LABELS[key] || key, rows })
    byCat.delete(key)
  }
  for (const [key, rows] of byCat) {
    if (rows.length) out.push({ key, label: CATEGORY_LABELS[key] || key, rows })
  }
  return out
})

function fmtEuro(n) {
  if (n === null || n === undefined) return '—'
  return `${n}€`
}

function fmtWeight(n) {
  if (n === null || n === undefined) return '—'
  return Number(n).toFixed(2)
}

function imgSrc(path) {
  if (!path) return ''
  const p = path.startsWith('/') ? path.slice(1) : path
  return `${baseUrl}${p}`
}
</script>

<template>
  <div class="wiki-ammo">
    <section
      v-for="g in groups"
      :key="g.key"
      class="wiki-ammo__panel"
      :aria-labelledby="'wiki-ammo-cat-' + g.key"
    >
      <header class="wiki-ammo__panel-head">
        <div class="wiki-ammo__panel-head-text">
          <h2 :id="'wiki-ammo-cat-' + g.key" class="wiki-ammo__h2">{{ g.label }}</h2>
          <p class="wiki-ammo__panel-dek">Per-round value @ 100% condition · scroll sideways on narrow viewports</p>
        </div>
        <span class="wiki-ammo__count" :aria-label="`${g.rows.length} entries`">{{ g.rows.length }}</span>
      </header>

      <div class="wiki-ammo__table-wrap">
        <table class="wiki-ammo__table">
          <thead>
            <tr>
              <th scope="col" class="wiki-ammo__th wiki-ammo__th--photo">Icon</th>
              <th scope="col" class="wiki-ammo__th wiki-ammo__th--name">Caliber</th>
              <th scope="col" class="wiki-ammo__th wiki-ammo__th--num">Value (€)</th>
              <th scope="col" class="wiki-ammo__th wiki-ammo__th--num">Wt. (kg)</th>
              <th scope="col" class="wiki-ammo__th wiki-ammo__th--num">Max stack</th>
              <th scope="col" class="wiki-ammo__th wiki-ammo__th--compat">Compatibility</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in g.rows" :key="row.id" class="wiki-ammo__tr">
              <td class="wiki-ammo__td wiki-ammo__td--photo">
                <div class="wiki-ammo__photo">
                  <img
                    v-if="row.image"
                    class="wiki-ammo__img"
                    :src="imgSrc(row.image)"
                    :alt="row.name"
                    width="48"
                    height="48"
                    loading="lazy"
                  />
                  <span v-else class="wiki-ammo__photo-ph" aria-hidden="true" />
                </div>
              </td>
              <th scope="row" class="wiki-ammo__td wiki-ammo__td--name">{{ row.name }}</th>
              <td class="wiki-ammo__td wiki-ammo__td--num">{{ fmtEuro(row.valueEuro) }}</td>
              <td class="wiki-ammo__td wiki-ammo__td--num">{{ fmtWeight(row.weightKg) }}</td>
              <td class="wiki-ammo__td wiki-ammo__td--num">{{ row.maxStack ?? '—' }}</td>
              <td class="wiki-ammo__td wiki-ammo__td--compat">{{ row.compatibility }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <div class="wiki-ammo__intro" role="region" aria-labelledby="wiki-ammo-intro-h">
      <div class="wiki-ammo__intro-accent" aria-hidden="true" />
      <h2 id="wiki-ammo-intro-h" class="wiki-ammo__intro-title">About this ammo table</h2>
      <p class="wiki-ammo__intro-lead">
        Values, weights, stack caps, and weapon pairing are kept in lockstep with our
        <RouterLink class="wiki-ammo__intro-a" to="/wiki/weapons">weapons</RouterLink>
        hub—same card layout as that page so you can flip between “what shoots” and “what it eats” without relearning the UI.
      </p>
      <ul class="wiki-ammo__intro-list">
        <li>
          <span class="wiki-ammo__intro-dot" aria-hidden="true" />
          <span>
            <strong>Economy &amp; stash.</strong>
            Per-round € assumes full condition like the reference sheet; stacks matter when you plan extracts and barter—patch notes can nudge both.
          </span>
        </li>
        <li>
          <span class="wiki-ammo__intro-dot" aria-hidden="true" />
          <span>
            <strong>Verify in client.</strong>
            HUD build string wins if anything disagrees; use this table to pre-flight a loadout, not to argue with your inventory screen.
          </span>
        </li>
        <li>
          <span class="wiki-ammo__intro-dot" aria-hidden="true" />
          <span>
            <strong>Elsewhere on the manual.</strong>
            <RouterLink class="wiki-ammo__intro-a" to="/wiki">Wiki index</RouterLink>,
            <RouterLink class="wiki-ammo__intro-a" to="/map">Map</RouterLink>,
            <RouterLink class="wiki-ammo__intro-a" to="/updates">Updates</RouterLink>.
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.wiki-ammo {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.wiki-ammo__panel {
  position: relative;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--color-border) 72%, var(--color-frost) 14%);
  background: linear-gradient(
    165deg,
    color-mix(in srgb, var(--color-bg-panel) 96%, var(--color-frost) 3%) 0%,
    color-mix(in srgb, var(--color-bg-deep) 88%, #0e1418) 100%
  );
  box-shadow:
    0 1px 0 color-mix(in srgb, var(--color-frost) 12%, transparent),
    0 18px 40px color-mix(in srgb, #000 35%, transparent);
}

.wiki-ammo__panel::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--color-accent) 85%, transparent),
    color-mix(in srgb, var(--color-frost) 45%, transparent)
  );
  opacity: 0.9;
  pointer-events: none;
}

.wiki-ammo__panel-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.15rem 0.85rem 1.35rem;
  border-bottom: 1px solid color-mix(in srgb, var(--color-border) 55%, transparent);
}

.wiki-ammo__panel-head-text {
  min-width: 0;
}

.wiki-ammo__h2 {
  margin: 0 0 0.2rem;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-size: clamp(1.12rem, 2.5vw, 1.35rem);
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--color-text);
  line-height: 1.15;
}

.wiki-ammo__panel-dek {
  margin: 0;
  font-size: 0.72rem;
  letter-spacing: 0.04em;
  color: var(--color-text-muted);
}

.wiki-ammo__count {
  flex-shrink: 0;
  min-width: 2.25rem;
  height: 2.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-accent);
  background: color-mix(in srgb, var(--color-bg-deep) 65%, var(--color-accent) 8%);
  border: 1px solid color-mix(in srgb, var(--color-accent) 28%, var(--color-border));
  border-radius: 10px;
}

.wiki-ammo__table-wrap {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.wiki-ammo__table {
  width: 100%;
  min-width: 560px;
  border-collapse: collapse;
  font-size: 0.8125rem;
}

.wiki-ammo__th {
  position: sticky;
  top: 0;
  z-index: 2;
  text-align: left;
  padding: 0.7rem 0.65rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-size: 0.6rem;
  color: color-mix(in srgb, var(--color-text-muted) 88%, var(--color-frost));
  background: color-mix(in srgb, #1a2228 94%, var(--color-bg-deep));
  border-bottom: 1px solid color-mix(in srgb, var(--color-frost) 15%, var(--color-border));
  box-shadow: 0 1px 0 color-mix(in srgb, var(--color-border) 40%, transparent);
}

.wiki-ammo__th:first-child {
  padding-left: 1.25rem;
}

.wiki-ammo__th:last-child {
  padding-right: 1.15rem;
}

.wiki-ammo__th--photo {
  width: 4.5rem;
}

.wiki-ammo__th--name {
  min-width: 7rem;
}

.wiki-ammo__th--num {
  text-align: right;
}

.wiki-ammo__th--compat {
  min-width: 12rem;
}

.wiki-ammo__tr {
  transition: background 0.15s ease;
}

.wiki-ammo__tr:hover .wiki-ammo__td {
  background: color-mix(in srgb, var(--color-frost) 6%, transparent);
}

.wiki-ammo__tr:last-child .wiki-ammo__td {
  border-bottom: none;
}

.wiki-ammo__td {
  padding: 0.55rem 0.65rem;
  vertical-align: middle;
  color: var(--color-text);
  border-bottom: 1px solid color-mix(in srgb, var(--color-border) 38%, transparent);
  background: color-mix(in srgb, var(--color-bg-deep) 25%, transparent);
  transition: background 0.15s ease;
}

.wiki-ammo__td:first-child {
  padding-left: 1.1rem;
}

.wiki-ammo__td:last-child {
  padding-right: 1.1rem;
}

.wiki-ammo__td--photo {
  width: 4.5rem;
}

.wiki-ammo__photo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.25rem;
  height: 3.25rem;
  margin: 0 auto;
  background: radial-gradient(ellipse at 50% 80%, #151a1f 0%, #07090b 75%);
  border-radius: 10px;
  border: 1px solid color-mix(in srgb, var(--color-border) 55%, transparent);
  box-shadow: inset 0 1px 0 color-mix(in srgb, #fff 6%, transparent);
}

.wiki-ammo__img {
  display: block;
  max-width: 48px;
  max-height: 48px;
  width: auto;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 2px 6px color-mix(in srgb, #000 50%, transparent));
}

.wiki-ammo__photo-ph {
  display: block;
  width: 2rem;
  height: 2rem;
  border-radius: 6px;
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--color-border) 35%, transparent),
    color-mix(in srgb, var(--color-border) 15%, transparent)
  );
}

.wiki-ammo__td--name {
  text-align: left;
  font-weight: 700;
  font-size: 0.84rem;
  letter-spacing: 0.02em;
  color: color-mix(in srgb, var(--color-text) 96%, var(--color-frost));
}

.wiki-ammo__td--num {
  text-align: right;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.78rem;
  font-variant-numeric: tabular-nums;
  color: color-mix(in srgb, var(--color-text) 92%, var(--color-text-muted));
}

.wiki-ammo__td--compat {
  font-size: 0.78rem;
  line-height: 1.45;
  color: var(--color-text-muted);
}

.wiki-ammo__intro {
  position: relative;
  margin-top: 0.25rem;
  padding: 1.35rem 1.35rem 1.35rem 1.5rem;
  max-width: 48rem;
  border-radius: 14px;
  border: 1px solid color-mix(in srgb, var(--color-border) 70%, transparent);
  background: color-mix(in srgb, var(--color-bg-panel) 88%, var(--color-bg-deep));
}

.wiki-ammo__intro-accent {
  position: absolute;
  left: 0;
  top: 1rem;
  bottom: 1rem;
  width: 3px;
  border-radius: 0 3px 3px 0;
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--color-frost) 55%, transparent),
    color-mix(in srgb, var(--color-accent) 40%, transparent)
  );
  opacity: 0.85;
}

.wiki-ammo__intro-title {
  margin: 0 0 0.55rem;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--color-text);
}

.wiki-ammo__intro-lead {
  margin: 0 0 1rem;
  font-size: 0.875rem;
  line-height: 1.65;
  color: var(--color-text-muted);
}

.wiki-ammo__intro-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.wiki-ammo__intro-list li {
  display: flex;
  gap: 0.65rem;
  align-items: flex-start;
  font-size: 0.8125rem;
  line-height: 1.55;
  color: var(--color-text-muted);
}

.wiki-ammo__intro-dot {
  flex-shrink: 0;
  width: 6px;
  height: 6px;
  margin-top: 0.45rem;
  border-radius: 50%;
  background: var(--color-accent);
  box-shadow: 0 0 10px color-mix(in srgb, var(--color-accent) 45%, transparent);
}

.wiki-ammo__intro-list strong {
  color: color-mix(in srgb, var(--color-text) 90%, var(--color-text-muted));
  font-weight: 600;
}

.wiki-ammo__intro-a {
  color: var(--color-frost);
  font-weight: 600;
  text-decoration: none;
}

.wiki-ammo__intro-a:hover {
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

@media (max-width: 540px) {
  .wiki-ammo__panel-head {
    flex-direction: column;
    align-items: stretch;
  }

  .wiki-ammo__count {
    align-self: flex-end;
  }
}
</style>
