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

const CATEGORY_ORDER = ['rifle', 'knife', 'smg', 'shotgun', 'bolt_action', 'semi_auto']

const CATEGORY_LABELS = {
  rifle: 'Rifles',
  knife: 'Knives & melee',
  smg: 'SMGs & PDWs',
  shotgun: 'Shotguns',
  bolt_action: 'Bolt-action rifles',
  semi_auto: 'Semi-automatic rifles',
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

function cell(v) {
  if (v === null || v === undefined || v === '') return '—'
  return String(v)
}

function imgSrc(path) {
  if (!path) return ''
  const p = path.startsWith('/') ? path.slice(1) : path
  return `${baseUrl}${p}`
}
</script>

<template>
  <div class="wiki-weapons">
    <section
      v-for="g in groups"
      :key="g.key"
      class="wiki-weapons__panel"
      :aria-labelledby="'wiki-weapons-cat-' + g.key"
    >
      <header class="wiki-weapons__panel-head">
        <div class="wiki-weapons__panel-head-text">
          <h2 :id="'wiki-weapons-cat-' + g.key" class="wiki-weapons__h2">{{ g.label }}</h2>
          <p class="wiki-weapons__panel-dek">Reference rows · scroll horizontally on small screens</p>
        </div>
        <span class="wiki-weapons__count" :aria-label="`${g.rows.length} entries`">{{ g.rows.length }}</span>
      </header>

      <div class="wiki-weapons__table-wrap">
        <table class="wiki-weapons__table">
          <thead>
            <tr>
              <th scope="col" class="wiki-weapons__th wiki-weapons__th--photo">Photo</th>
              <th scope="col" class="wiki-weapons__th wiki-weapons__th--name">Weapon</th>
              <th scope="col" class="wiki-weapons__th wiki-weapons__th--num">Wt. kg</th>
              <th scope="col" class="wiki-weapons__th wiki-weapons__th--num">Dmg</th>
              <th scope="col" class="wiki-weapons__th">Caliber</th>
              <th scope="col" class="wiki-weapons__th wiki-weapons__th--num">Mag</th>
              <th scope="col" class="wiki-weapons__th wiki-weapons__th--num">RPM</th>
              <th scope="col" class="wiki-weapons__th wiki-weapons__th--narrow">Value</th>
              <th scope="col" class="wiki-weapons__th wiki-weapons__th--narrow">Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="w in g.rows" :key="w.id" class="wiki-weapons__tr">
              <td class="wiki-weapons__td wiki-weapons__td--photo">
                <div class="wiki-weapons__photo">
                  <img
                    v-if="w.image"
                    class="wiki-weapons__img"
                    :src="imgSrc(w.image)"
                    :alt="w.name"
                    width="80"
                    height="52"
                    loading="lazy"
                  />
                  <span v-else class="wiki-weapons__photo-ph" aria-hidden="true" />
                </div>
              </td>
              <th scope="row" class="wiki-weapons__td wiki-weapons__td--name">{{ w.name }}</th>
              <td class="wiki-weapons__td wiki-weapons__td--num">{{ cell(w.weightKg) }}</td>
              <td class="wiki-weapons__td wiki-weapons__td--num">{{ cell(w.damage) }}</td>
              <td class="wiki-weapons__td wiki-weapons__td--cal">{{ cell(w.caliber) }}</td>
              <td class="wiki-weapons__td wiki-weapons__td--num">{{ cell(w.magazine) }}</td>
              <td class="wiki-weapons__td wiki-weapons__td--num">{{ cell(w.rpm) }}</td>
              <td class="wiki-weapons__td wiki-weapons__td--narrow">{{ cell(w.value) }}</td>
              <td class="wiki-weapons__td wiki-weapons__td--narrow">{{ cell(w.cost) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <div class="wiki-weapons__intro" role="region" aria-labelledby="wiki-weapons-intro-h">
      <div class="wiki-weapons__intro-accent" aria-hidden="true" />
      <h2 id="wiki-weapons-intro-h" class="wiki-weapons__intro-title">About this reference</h2>
      <p class="wiki-weapons__intro-lead">
        Road to Vostok Field Manual keeps weapon data in one scannable place: grouped tables, thumbnails served from this site, and the same layout you’ll see on our other wiki tabs (ammo, maps, NPCs). We optimize for quick lookup on phone or desktop—no nested article chrome.
      </p>
      <ul class="wiki-weapons__intro-list">
        <li>
          <span class="wiki-weapons__intro-dot" aria-hidden="true" />
          <span>
            <strong>Build-first mindset.</strong>
            Patch tuning can move damage, RPM, and economy. Use the HUD build string as ground truth; treat this table as a convenience snapshot you can compare before a run.
          </span>
        </li>
        <li>
          <span class="wiki-weapons__intro-dot" aria-hidden="true" />
          <span>
            <strong>Stay on the manual.</strong>
            Pair loadouts with
            <RouterLink class="wiki-weapons__intro-a" to="/map">the interactive map</RouterLink>,
            <RouterLink class="wiki-weapons__intro-a" to="/start">Start</RouterLink>
            for Demo vs EA context, and
            <RouterLink class="wiki-weapons__intro-a" to="/updates">Updates</RouterLink>
            when a patch drops.
          </span>
        </li>
        <li>
          <span class="wiki-weapons__intro-dot" aria-hidden="true" />
          <span>
            <strong>More topics.</strong>
            Jump back to the
            <RouterLink class="wiki-weapons__intro-a" to="/wiki">wiki index</RouterLink>
            for ammo, maps, and NPCs, or open the
            <RouterLink class="wiki-weapons__intro-a" to="/">home overview</RouterLink>
            for the full field manual layout.
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.wiki-weapons {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

/* —— Category panels —— */
.wiki-weapons__panel {
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

.wiki-weapons__panel::before {
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

.wiki-weapons__panel-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.15rem 0.85rem 1.35rem;
  border-bottom: 1px solid color-mix(in srgb, var(--color-border) 55%, transparent);
}

.wiki-weapons__panel-head-text {
  min-width: 0;
}

.wiki-weapons__h2 {
  margin: 0 0 0.2rem;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-size: clamp(1.12rem, 2.5vw, 1.35rem);
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--color-text);
  line-height: 1.15;
}

.wiki-weapons__panel-dek {
  margin: 0;
  font-size: 0.72rem;
  letter-spacing: 0.04em;
  color: var(--color-text-muted);
}

.wiki-weapons__count {
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

.wiki-weapons__table-wrap {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.wiki-weapons__table {
  width: 100%;
  min-width: 720px;
  border-collapse: collapse;
  font-size: 0.8125rem;
}

.wiki-weapons__th {
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

.wiki-weapons__th:first-child {
  padding-left: 1.25rem;
}

.wiki-weapons__th:last-child {
  padding-right: 1.15rem;
}

.wiki-weapons__th--photo {
  width: 6.25rem;
}

.wiki-weapons__th--name {
  min-width: 7.5rem;
}

.wiki-weapons__th--num {
  text-align: right;
}

.wiki-weapons__th--narrow {
  white-space: nowrap;
}

.wiki-weapons__tr {
  transition: background 0.15s ease;
}

.wiki-weapons__tr:hover .wiki-weapons__td {
  background: color-mix(in srgb, var(--color-frost) 6%, transparent);
}

.wiki-weapons__tr:last-child .wiki-weapons__td {
  border-bottom: none;
}

.wiki-weapons__td {
  padding: 0.55rem 0.65rem;
  vertical-align: middle;
  color: var(--color-text);
  border-bottom: 1px solid color-mix(in srgb, var(--color-border) 38%, transparent);
  background: color-mix(in srgb, var(--color-bg-deep) 25%, transparent);
  transition: background 0.15s ease;
}

.wiki-weapons__td:first-child {
  padding-left: 1.1rem;
}

.wiki-weapons__td:last-child {
  padding-right: 1.1rem;
}

.wiki-weapons__td--photo {
  width: 6.25rem;
  padding-top: 0.65rem;
  padding-bottom: 0.65rem;
}

.wiki-weapons__photo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5.25rem;
  height: 3.35rem;
  margin: 0 auto;
  background: radial-gradient(ellipse at 50% 80%, #151a1f 0%, #07090b 75%);
  border-radius: 10px;
  border: 1px solid color-mix(in srgb, var(--color-border) 55%, transparent);
  box-shadow: inset 0 1px 0 color-mix(in srgb, #fff 6%, transparent);
}

.wiki-weapons__img {
  display: block;
  max-width: 80px;
  max-height: 52px;
  width: auto;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 2px 6px color-mix(in srgb, #000 50%, transparent));
}

.wiki-weapons__photo-ph {
  display: block;
  width: 3rem;
  height: 2rem;
  border-radius: 6px;
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--color-border) 35%, transparent),
    color-mix(in srgb, var(--color-border) 15%, transparent)
  );
}

.wiki-weapons__td--name {
  text-align: left;
  font-weight: 700;
  font-size: 0.84rem;
  letter-spacing: 0.02em;
  color: color-mix(in srgb, var(--color-text) 96%, var(--color-frost));
}

.wiki-weapons__td--num {
  text-align: right;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.78rem;
  font-variant-numeric: tabular-nums;
  color: color-mix(in srgb, var(--color-text) 92%, var(--color-text-muted));
}

.wiki-weapons__td--cal {
  font-size: 0.78rem;
  color: var(--color-text-muted);
  max-width: 7rem;
}

.wiki-weapons__td--narrow {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.74rem;
  font-variant-numeric: tabular-nums;
  color: var(--color-text-muted);
  white-space: nowrap;
}

/* —— Intro below tables —— */
.wiki-weapons__intro {
  position: relative;
  margin-top: 0.25rem;
  padding: 1.35rem 1.35rem 1.35rem 1.5rem;
  max-width: 48rem;
  border-radius: 14px;
  border: 1px solid color-mix(in srgb, var(--color-border) 70%, transparent);
  background: color-mix(in srgb, var(--color-bg-panel) 88%, var(--color-bg-deep));
}

.wiki-weapons__intro-accent {
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

.wiki-weapons__intro-title {
  margin: 0 0 0.55rem;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--color-text);
}

.wiki-weapons__intro-lead {
  margin: 0 0 1rem;
  font-size: 0.875rem;
  line-height: 1.65;
  color: var(--color-text-muted);
}

.wiki-weapons__intro-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.wiki-weapons__intro-list li {
  display: flex;
  gap: 0.65rem;
  align-items: flex-start;
  font-size: 0.8125rem;
  line-height: 1.55;
  color: var(--color-text-muted);
}

.wiki-weapons__intro-dot {
  flex-shrink: 0;
  width: 6px;
  height: 6px;
  margin-top: 0.45rem;
  border-radius: 50%;
  background: var(--color-accent);
  box-shadow: 0 0 10px color-mix(in srgb, var(--color-accent) 45%, transparent);
}

.wiki-weapons__intro-list strong {
  color: color-mix(in srgb, var(--color-text) 90%, var(--color-text-muted));
  font-weight: 600;
}

.wiki-weapons__intro-a {
  color: var(--color-frost);
  font-weight: 600;
  text-decoration: none;
}

.wiki-weapons__intro-a:hover {
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

@media (max-width: 540px) {
  .wiki-weapons__panel-head {
    flex-direction: column;
    align-items: stretch;
  }

  .wiki-weapons__count {
    align-self: flex-end;
  }
}
</style>
