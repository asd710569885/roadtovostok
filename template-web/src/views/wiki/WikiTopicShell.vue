<script setup>
import { computed, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { WIKI_NAV } from './wikiNav.js'
import { applyRouteSeo, clampMetaDescription } from '../../utils/seo.js'

const props = defineProps({
  meta: {
    type: Object,
    required: true,
  },
})

const route = useRoute()

const siblings = computed(() => WIKI_NAV.filter((c) => c.slug !== props.meta.slug))

watch(
  () => [route.path, props.meta],
  () => {
    const m = props.meta
    if (!m?.slug) return
    const baseKw =
      'road to vostok, road to vostok wiki, road to vostok steam, roadtovostok, Area 05, Border Zone, Vostok, early access, survival fps'
    const docTitle =
      m.seoTitle?.trim() ||
      (m.heading.startsWith('Road to Vostok')
        ? `${m.heading} | Field Manual Wiki`
        : `${m.heading} | Road to Vostok Wiki`)
    const descSource = (m.seoDescription || m.lead || '').trim()
    const description = clampMetaDescription(descSource)
    const keywords = (m.seoKeywords || `${baseKw}, ${m.slug}`).trim()
    applyRouteSeo({
      path: route.path,
      matched: [
        {
          meta: {
            title: docTitle,
            description,
            keywords,
          },
        },
      ],
      meta: {},
    })
  },
  { immediate: true },
)
</script>

<template>
  <div class="page-wiki-cat">
    <section class="wiki-cat-head section section--tight" aria-labelledby="wiki-cat-heading">
      <div class="container">
        <div class="wrap wrap--wide">
          <p class="wiki-cat-kicker">{{ meta.kicker }}</p>
          <nav class="wiki-cat-crumb" aria-label="Breadcrumb">
            <RouterLink to="/" class="wiki-cat-crumb__link">Road to Vostok Field Manual</RouterLink>
            <span class="wiki-cat-crumb__sep" aria-hidden="true">/</span>
            <RouterLink to="/wiki" class="wiki-cat-crumb__link">Wiki</RouterLink>
            <span class="wiki-cat-crumb__sep" aria-hidden="true">/</span>
            <span class="wiki-cat-crumb__here">{{ meta.heading }}</span>
          </nav>
          <h1 id="wiki-cat-heading" class="wiki-cat-title">{{ meta.heading }}</h1>
          <p class="wiki-cat-lead">{{ meta.lead }}</p>

          <nav class="wiki-cat-siblings" aria-label="Other wiki topics">
            <RouterLink v-for="c in siblings" :key="c.slug" class="wiki-cat-sib" :to="c.routePath">
              {{ c.title }}
            </RouterLink>
          </nav>
        </div>
      </div>
    </section>

    <section class="wiki-cat-body section" aria-label="Reference data">
      <div class="container">
        <div class="wrap wrap--wide">
          <slot />
          <p class="wiki-cat-back">
            <RouterLink class="wiki-cat-back__a" to="/wiki">← Back to wiki index</RouterLink>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.wiki-cat-kicker {
  margin: 0 0 0.5rem;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.wiki-cat-crumb {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem;
  margin: 0 0 0.85rem;
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}

.wiki-cat-crumb__link {
  color: var(--color-frost);
  text-decoration: none;
  font-weight: 600;
}

.wiki-cat-crumb__link:hover {
  color: var(--color-text);
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.wiki-cat-title {
  margin: 0 0 0.65rem;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-size: clamp(1.65rem, 3.5vw, 2.1rem);
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  line-height: 1.12;
  color: var(--color-text);
}

.wiki-cat-lead {
  margin: 0 0 1rem;
  max-width: 48rem;
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--color-text-muted);
}

.wiki-cat-siblings {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.wiki-cat-sib {
  display: inline-flex;
  padding: 0.32rem 0.65rem;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--color-text-muted);
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--color-border) 85%, transparent);
  background: color-mix(in srgb, var(--color-bg-panel) 88%, transparent);
  transition:
    border-color 0.15s ease,
    color 0.15s ease;
}

.wiki-cat-sib:hover {
  border-color: color-mix(in srgb, var(--color-frost) 30%, var(--color-border));
  color: var(--color-frost);
}

.wiki-cat-body {
  padding-bottom: 2.5rem;
}

.wiki-cat-back {
  margin: 2rem 0 0;
}

.wiki-cat-back__a {
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--color-frost);
  text-decoration: none;
}

.wiki-cat-back__a:hover {
  text-decoration: underline;
  text-underline-offset: 0.2em;
}
</style>
