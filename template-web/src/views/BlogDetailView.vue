<script setup>
import { computed, watch, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import blogPosts from '../data/blog.js'
import { absoluteUrlFromRootPath, canonicalUrlForPath } from '../utils/seo.js'

const props = defineProps({
  addressBar: {
    type: String,
    required: true,
  },
})

const route = useRoute()
const post = computed(() => blogPosts.find((p) => p.addressBar === props.addressBar))

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

let jsonLdEl = null

function removeJsonLd() {
  jsonLdEl?.remove()
  jsonLdEl = null
}

function syncJsonLd() {
  removeJsonLd()
  const p = post.value
  if (!p) return

  const pageUrl = canonicalUrlForPath(route.path)
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: p.title,
    datePublished: p.publishDate,
    dateModified: p.publishDate,
    author: {
      '@type': 'Organization',
      name: 'Road to Vostok Field Manual',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Road to Vostok Field Manual',
    },
    description: p.seo.description,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
  }

  if (p.imageUrl) {
    data.image = [absoluteUrlFromRootPath(p.imageUrl)]
  }

  jsonLdEl = document.createElement('script')
  jsonLdEl.type = 'application/ld+json'
  jsonLdEl.setAttribute('data-blog-jsonld', '1')
  jsonLdEl.textContent = JSON.stringify(data)
  document.head.appendChild(jsonLdEl)
}

watch(
  () => [props.addressBar, route.path],
  () => syncJsonLd(),
  { immediate: true },
)

onUnmounted(removeJsonLd)
</script>

<template>
  <div v-if="post" class="page-blog-detail">
    <article itemscope itemtype="https://schema.org/BlogPosting">
      <meta itemprop="headline" :content="post.title">
      <meta itemprop="datePublished" :content="post.publishDate">
      <meta itemprop="description" :content="post.seo.description">

      <section class="page-head-section section section--tight" :aria-labelledby="'article-heading-' + post.id">
        <div class="container">
          <div class="wrap wrap--wide">
            <p class="page-kicker">Blog · {{ post.category || 'Article' }}</p>
            <nav class="blog-crumb" aria-label="Breadcrumb">
              <RouterLink to="/" class="blog-crumb__link">Road to Vostok Field Manual</RouterLink>
              <span class="blog-crumb__sep" aria-hidden="true">/</span>
              <RouterLink to="/blog" class="blog-crumb__link">Blog</RouterLink>
              <span class="blog-crumb__sep" aria-hidden="true">/</span>
              <span class="blog-crumb__here">{{ post.title }}</span>
            </nav>
            <h1 :id="'article-heading-' + post.id" class="page-title" itemprop="name">{{ post.title }}</h1>
            <p class="article-meta">
              <time itemprop="datePublished" :datetime="post.publishDate">{{ formatDate(post.publishDate) }}</time>
              <span v-if="post.readingTime" class="article-meta__sep" aria-hidden="true">·</span>
              <span v-if="post.readingTime">{{ post.readingTime }}</span>
            </p>
            <p class="page-dek">{{ post.excerpt }}</p>
          </div>
        </div>
      </section>

      <section class="article-hero section section--tight" aria-hidden="false">
        <div class="container">
          <div class="wrap wrap--wide">
            <figure class="article-figure">
              <img
                itemprop="image"
                class="article-hero__img"
                :src="publicAssetUrl(post.imageUrl)"
                :alt="post.imageAlt"
                width="1200"
                height="675"
                fetchpriority="high"
                decoding="async"
              >
            </figure>
          </div>
        </div>
      </section>

      <section class="article-body-section section">
        <div class="container">
          <div class="wrap wrap--wide">
            <div class="blog-prose" itemprop="articleBody" v-html="post.detailsHtml" />
            <nav class="article-nav" aria-label="Related on this site">
              <RouterLink class="article-nav__link" to="/blog">← All posts</RouterLink>
              <RouterLink class="article-nav__link" to="/start">Start hub</RouterLink>
              <RouterLink class="article-nav__link" to="/wiki">Wiki index</RouterLink>
            </nav>
          </div>
        </div>
      </section>
    </article>
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
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: color-mix(in srgb, var(--color-text) 75%, var(--color-text-muted));
  font-weight: 600;
}

.page-title {
  margin: 0 0 0.65rem;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-weight: 700;
  font-size: clamp(1.65rem, 3.8vw, 2.35rem);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  line-height: 1.15;
  color: var(--color-text);
}

.article-meta {
  margin: 0 0 0.85rem;
  font-size: 0.8125rem;
  color: var(--color-text-muted);
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  letter-spacing: 0.05em;
}

.article-meta__sep {
  margin: 0 0.35rem;
  opacity: 0.5;
}

.page-dek {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.9375rem;
  line-height: 1.65;
  max-width: 48rem;
}

.article-figure {
  margin: 0;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid var(--color-border);
  box-shadow: 0 18px 48px color-mix(in srgb, #000 38%, transparent);
}

.article-hero__img {
  display: block;
  width: 100%;
  height: auto;
  vertical-align: middle;
}

.article-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.25rem;
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
}

.article-nav__link {
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--color-frost);
  text-decoration: none;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.article-nav__link:hover {
  color: var(--color-text);
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.blog-prose :deep(p) {
  margin: 0 0 1rem;
  color: var(--color-text-muted);
  font-size: 0.9375rem;
  line-height: 1.7;
  max-width: 48rem;
}

.blog-prose :deep(p.blog-lead) {
  font-size: 1rem;
  color: color-mix(in srgb, var(--color-text) 22%, var(--color-text-muted));
}

.blog-prose :deep(p.blog-note) {
  margin-top: 1.75rem;
  padding: 0.85rem 1rem;
  border-left: 3px solid var(--color-accent);
  background: color-mix(in srgb, var(--color-bg-panel) 90%, transparent);
  font-size: 0.875rem;
}

.blog-prose :deep(h2) {
  margin: 2rem 0 0.65rem;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-weight: 700;
  font-size: clamp(1.05rem, 2vw, 1.25rem);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text);
}

.blog-prose :deep(h2:first-child) {
  margin-top: 0;
}

.blog-prose :deep(ul),
.blog-prose :deep(ol) {
  margin: 0 0 1rem;
  padding-left: 1.25rem;
  color: var(--color-text-muted);
  font-size: 0.9375rem;
  line-height: 1.65;
  max-width: 48rem;
}

.blog-prose :deep(li + li) {
  margin-top: 0.45rem;
}

.blog-prose :deep(a) {
  color: var(--color-frost);
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.blog-prose :deep(a:hover) {
  color: var(--color-text);
}

.blog-prose :deep(strong) {
  color: color-mix(in srgb, var(--color-text) 85%, var(--color-text-muted));
  font-weight: 600;
}
</style>
