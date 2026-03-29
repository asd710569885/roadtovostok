<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import blogPosts from '../data/blog.js'

const posts = computed(() => [...blogPosts].sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1)))

function publicAssetUrl(path) {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/')
  const p = path.replace(/^\//, '')
  return `${base}${p}`
}

function formatDate(iso) {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(iso + 'T12:00:00'))
  } catch {
    return iso
  }
}
</script>

<template>
  <div class="page-blog">
    <section class="page-head-section section section--tight" aria-labelledby="blog-heading">
      <div class="container">
        <div class="wrap wrap--wide">
          <p class="page-kicker">Field manual · Blog</p>
          <nav class="blog-crumb" aria-label="Breadcrumb">
            <RouterLink to="/" class="blog-crumb__link">Road to Vostok Field Manual</RouterLink>
            <span class="blog-crumb__sep" aria-hidden="true">/</span>
            <span class="blog-crumb__here">Blog</span>
          </nav>
          <h1 id="blog-heading" class="page-title">Road to Vostok Blog</h1>
          <p class="page-dek">
            Longer reads and orientation pieces for players—always cross-check dates and mechanics on the official site and Steam.
            For structured lookups, use the
            <RouterLink class="blog-dek__link" to="/wiki">wiki index</RouterLink>
            and
            <RouterLink class="blog-dek__link" to="/start">Start</RouterLink>
            hub.
          </p>
        </div>
      </div>
    </section>

    <section class="blog-list-section section" aria-label="Articles">
      <div class="container">
        <div class="wrap wrap--wide blog-list-wrap">
          <ul class="blog-card-list">
            <li v-for="p in posts" :key="p.id" class="blog-card-item">
              <RouterLink
                :to="'/blog/' + p.addressBar"
                class="blog-card"
                :aria-labelledby="'blog-card-title-' + p.id"
              >
                <div class="blog-card__media">
                  <img
                    class="blog-card__img"
                    :src="publicAssetUrl(p.imageUrl)"
                    :alt="p.imageAlt"
                    width="640"
                    height="360"
                    loading="lazy"
                    decoding="async"
                  >
                </div>
                <div class="blog-card__body">
                  <p v-if="p.category" class="blog-card__meta">
                    <span class="blog-card__cat">{{ p.category }}</span>
                    <time class="blog-card__date" :datetime="p.publishDate">{{ formatDate(p.publishDate) }}</time>
                    <span v-if="p.readingTime" class="blog-card__time">{{ p.readingTime }}</span>
                  </p>
                  <h2 :id="'blog-card-title-' + p.id" class="blog-card__title">{{ p.title }}</h2>
                  <p class="blog-card__excerpt">{{ p.excerpt }}</p>
                  <span class="blog-card__read">Read article</span>
                </div>
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-kicker {
  margin: 0 0 0.5rem;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.blog-crumb {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem;
  margin: 0 0 0.85rem;
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}

.blog-crumb__link {
  color: var(--color-frost);
  text-decoration: none;
  font-weight: 600;
}

.blog-crumb__link:hover {
  color: var(--color-text);
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.blog-crumb__sep {
  opacity: 0.55;
  user-select: none;
}

.blog-crumb__here {
  color: color-mix(in srgb, var(--color-text) 75%, var(--color-text-muted));
  font-weight: 600;
}

.page-title {
  margin: 0 0 0.75rem;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-weight: 700;
  font-size: clamp(1.85rem, 4vw, 2.45rem);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text);
}

.page-dek {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.9375rem;
  line-height: 1.65;
  max-width: 46rem;
}

.blog-dek__link {
  color: var(--color-frost);
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.blog-dek__link:hover {
  color: var(--color-text);
}

.blog-list-wrap {
  min-width: 0;
}

.blog-card-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-width: 0;
}

.blog-card-item {
  min-width: 0;
}

.blog-card {
  display: grid;
  gap: 1.25rem;
  min-width: 0;
  max-width: 100%;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  overflow: hidden;
  background: color-mix(in srgb, var(--color-bg-panel) 88%, transparent);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--color-border-bright) 18%, transparent);
  text-decoration: none;
  color: inherit;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.blog-card:hover {
  border-color: color-mix(in srgb, var(--color-frost) 38%, var(--color-border));
  box-shadow:
    inset 0 0 0 1px color-mix(in srgb, var(--color-border-bright) 28%, transparent),
    0 14px 40px color-mix(in srgb, #000 32%, transparent);
  transform: translateY(-1px);
}

.blog-card:focus-visible {
  outline: 2px solid var(--color-frost);
  outline-offset: 3px;
}

@media (min-width: 768px) {
  .blog-card {
    grid-template-columns: minmax(0, 280px) minmax(0, 1fr);
    align-items: stretch;
  }
}

.blog-card__media {
  display: block;
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
  aspect-ratio: 16 / 10;
  background: var(--color-bg-deep);
}

.blog-card__img {
  width: 100%;
  max-width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

.blog-card__body {
  min-width: 0;
  padding: 1.15rem 1.25rem 1.35rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.blog-card__meta {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 0.85rem;
  font-size: 0.72rem;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.blog-card__cat {
  color: var(--color-accent);
  font-weight: 600;
}

.blog-card__title {
  margin: 0;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-size: clamp(1.15rem, 2.2vw, 1.45rem);
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  line-height: 1.2;
  color: var(--color-text);
}

.blog-card:hover .blog-card__title {
  color: var(--color-frost);
}

.blog-card__excerpt {
  margin: 0;
  flex: 1;
  color: var(--color-text-muted);
  font-size: 0.9rem;
  line-height: 1.6;
  max-width: 42rem;
}

.blog-card__read {
  margin-top: 0.35rem;
  align-self: flex-start;
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--color-frost);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: underline;
  text-decoration-color: color-mix(in srgb, var(--color-frost) 45%, transparent);
  text-underline-offset: 0.25em;
}

.blog-card:hover .blog-card__read {
  color: var(--color-text);
  text-decoration-color: var(--color-text);
}
</style>
