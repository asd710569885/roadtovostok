<script setup>
import { RouterLink } from 'vue-router'
import { WIKI_NAV } from './wikiNav.js'

const intro = {
  dek1:
    'Road to Vostok Field Manual is a player-first guide: curated wiki tables, an interactive world map, and Start/Updates hubs that stay close to official Steam and roadtovostok.com messaging—without dumping you into a wall of third-party tabs.',
  dek2:
    'Pick a topic below. Numbers are labeled with build caveats where it matters; when in doubt, trust your installed client.',
}

const strengths = [
  {
    title: 'One atlas, one manual',
    text: 'The /map view and these wiki tables live beside /start and /updates so orientation, reference data, and patch context stay in a single site chrome.',
  },
  {
    title: 'Tables you can scan',
    text: 'Weapons, ammo, maps, and NPCs use the same grouped-table pattern—fast to read on desktop or phone, no nested article noise.',
  },
  {
    title: 'Honest scope',
    text: 'We label stubs, cite external references only on data-heavy pages, and prefer “verify in client” over guessing patch deltas.',
  },
  {
    title: 'SEO without clutter',
    text: 'Pages are structured for search, but the index focuses on what this site does—not an outbound link farm.',
  },
]
</script>

<template>
  <div class="page-wiki-hub">
    <section class="wiki-hub-head section section--tight" aria-labelledby="wiki-heading">
      <div class="container">
        <div class="wrap wrap--wide">
          <p class="wiki-hub-kicker">Index · Wiki hub</p>
          <nav class="wiki-hub-crumb" aria-label="Breadcrumb">
            <RouterLink to="/" class="wiki-hub-crumb__link">Road to Vostok Field Manual</RouterLink>
            <span class="wiki-hub-crumb__sep" aria-hidden="true">/</span>
            <span class="wiki-hub-crumb__here">Wiki</span>
          </nav>
          <h1 id="wiki-heading" class="wiki-hub-title">Road to Vostok Wiki</h1>
          <p class="wiki-hub-dek">{{ intro.dek1 }}</p>
          <p class="wiki-hub-dek wiki-hub-dek--muted">{{ intro.dek2 }}</p>
        </div>
      </div>
    </section>

    <section class="wiki-hub-cats section section--tight" aria-label="Wiki categories">
      <div class="container">
        <div class="wrap wrap--wide">
          <h2 class="wiki-hub-section-title">Browse by topic</h2>
          <p class="wiki-hub-section-lead">Four data tracks—each on its own URL. Tables group rows by an internal category field.</p>
          <ul class="wiki-hub-grid">
            <li v-for="c in WIKI_NAV" :key="c.slug" class="wiki-hub-grid__cell">
              <RouterLink class="wiki-hub-card" :to="c.routePath">
                <span class="wiki-hub-card__kicker">{{ c.kicker }}</span>
                <span class="wiki-hub-card__title">{{ c.title }}</span>
                <span class="wiki-hub-card__blurb">{{ c.blurb }}</span>
                <span class="wiki-hub-card__go">Open →</span>
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="wiki-hub-why section section--tight" aria-labelledby="wiki-why-h">
      <div class="container">
        <div class="wrap wrap--wide">
          <h2 id="wiki-why-h" class="wiki-hub-section-title">Why use this site</h2>
          <p class="wiki-hub-why__lead">
            Built for players who want structure: reference tables, map tooling, and onboarding in one place—optimized for quick lookup, not endless outbound reading lists.
          </p>
          <ul class="wiki-hub-why-grid">
            <li v-for="(s, i) in strengths" :key="i" class="wiki-hub-why-card">
              <h3 class="wiki-hub-why-card__title">{{ s.title }}</h3>
              <p class="wiki-hub-why-card__text">{{ s.text }}</p>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="wiki-hub-foot section section--tight" aria-labelledby="wiki-foot-h">
      <div class="container">
        <div class="wrap wrap--wide">
          <h2 id="wiki-foot-h" class="wiki-hub-foot__title">Using the wiki</h2>
          <ul class="wiki-hub-foot__list">
            <li>Each topic page renders one flat data array, split into sections by a <code class="inline-code">category</code> field.</li>
            <li>
              Cross-link to
              <RouterLink class="wiki-hub-foot__inline" to="/map">/map</RouterLink>,
              <RouterLink class="wiki-hub-foot__inline" to="/start">/start</RouterLink>, and
              <RouterLink class="wiki-hub-foot__inline" to="/updates">/updates</RouterLink>
              when you need atlas, onboarding, or patch context.
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.wiki-hub-kicker {
  margin: 0 0 0.5rem;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.wiki-hub-crumb {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem;
  margin: 0 0 0.85rem;
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}

.wiki-hub-crumb__link {
  color: var(--color-frost);
  text-decoration: none;
  font-weight: 600;
}

.wiki-hub-crumb__link:hover {
  color: var(--color-text);
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.wiki-hub-title {
  margin: 0 0 0.75rem;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-size: clamp(1.85rem, 4vw, 2.35rem);
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  line-height: 1.12;
  color: var(--color-text);
}

.wiki-hub-dek {
  margin: 0 0 0.65rem;
  max-width: 48rem;
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--color-text-muted);
}

.wiki-hub-dek--muted {
  font-size: 0.875rem;
  opacity: 0.95;
}

.wiki-hub-section-title {
  margin: 0 0 0.35rem;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--color-text);
}

.wiki-hub-section-lead {
  margin: 0 0 1.1rem;
  max-width: 42rem;
  font-size: 0.875rem;
  line-height: 1.55;
  color: var(--color-text-muted);
}

.wiki-hub-grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.75rem;
  grid-template-columns: 1fr;
}

@media (min-width: 600px) {
  .wiki-hub-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .wiki-hub-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.wiki-hub-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  padding: 1rem 1.1rem 1.05rem;
  border-radius: 12px;
  border: 1px solid color-mix(in srgb, var(--color-border) 82%, var(--color-frost) 8%);
  background: color-mix(in srgb, var(--color-bg-panel) 94%, var(--color-bg-deep));
  text-decoration: none;
  color: inherit;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s cubic-bezier(0.22, 1, 0.36, 1);
}

.wiki-hub-card:hover {
  border-color: color-mix(in srgb, var(--color-frost) 35%, var(--color-border));
  box-shadow: 0 12px 32px color-mix(in srgb, #000 30%, transparent);
  transform: translateY(-2px);
}

.wiki-hub-card__kicker {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.55rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: 0.35rem;
}

.wiki-hub-card__title {
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text);
  margin-bottom: 0.45rem;
}

.wiki-hub-card__blurb {
  font-size: 0.8125rem;
  line-height: 1.5;
  color: var(--color-text-muted);
  flex: 1;
}

.wiki-hub-card__go {
  margin-top: 0.75rem;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-frost);
}

.wiki-hub-why__lead {
  margin: 0 0 1.1rem;
  max-width: 44rem;
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--color-text-muted);
}

.wiki-hub-why-grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.75rem;
}

@media (min-width: 720px) {
  .wiki-hub-why-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.wiki-hub-why-card {
  margin: 0;
  padding: 1rem 1.1rem;
  border-radius: 12px;
  border: 1px solid color-mix(in srgb, var(--color-border) 78%, transparent);
  background: color-mix(in srgb, var(--color-bg-panel) 90%, transparent);
}

.wiki-hub-why-card__title {
  margin: 0 0 0.4rem;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--color-text);
}

.wiki-hub-why-card__text {
  margin: 0;
  font-size: 0.8125rem;
  line-height: 1.55;
  color: var(--color-text-muted);
}

.wiki-hub-foot__title {
  margin: 0 0 0.65rem;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text);
}

.wiki-hub-foot__list {
  margin: 0;
  padding-left: 1.15rem;
  max-width: 48rem;
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--color-text-muted);
}

.wiki-hub-foot__list li + li {
  margin-top: 0.45rem;
}

.wiki-hub-foot__inline {
  color: var(--color-frost);
  font-weight: 600;
  text-underline-offset: 0.2em;
}

.wiki-hub-foot__inline:hover {
  color: var(--color-text);
}

.inline-code {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.78em;
  padding: 0.1em 0.35em;
  border-radius: 4px;
  background: color-mix(in srgb, var(--color-bg-deep) 80%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-border) 70%, transparent);
}
</style>
