import { EDITORIAL_BYLINE, SITE_CONTENT_PUBLISHED, WIKI_LAST_VERIFIED } from './contentMeta'

export const SITE_NAME = 'Road to Vostok Field Manual'
export const BRAND_NAME = 'Road to Vostok'
export const DEFAULT_SITE_ORIGIN = 'https://roadtovostok.net'
export const DEFAULT_OG_IMAGE_PATH = '/images/logo.png'
export const META_DESCRIPTION_MAX = 158

/** Always included in meta keywords unless already present. */
export const CORE_KEYWORDS = [
  'road to vostok',
  'road to vostok wiki',
  'roadtovostok',
] as const

export interface SeoInput {
  title?: string
  description?: string
  keywords?: string
  ogImage?: string
  ogImageAlt?: string
  ogTitle?: string
  ogDescription?: string
  ogType?: string
  ogUrl?: string
  ogSiteName?: string
  twitterCard?: string
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
  twitterImageAlt?: string
  robots?: string
  author?: string
  /** Path for canonical (e.g. /wiki/weapons). Set false to omit canonical/og. */
  canonical?: string | false
}

export interface BuiltSeo {
  title: string
  description: string
  keywords: string
  robots: string
  author?: string
  canonical: string | null
  og: {
    type: string
    siteName: string
    title: string
    description: string
    url: string | null
    image: string | null
    imageAlt: string
  }
  twitter: {
    card: string
    title: string
    description: string
    image: string | null
    imageAlt: string
  }
}

export function clampMetaDescription(text: string | null | undefined, max = META_DESCRIPTION_MAX): string {
  if (text == null || typeof text !== 'string') return ''
  const t = text.replace(/\s+/g, ' ').trim()
  if (t.length <= max) return t
  const cut = t.slice(0, max - 1)
  const lastSpace = cut.lastIndexOf(' ')
  const base = lastSpace > Math.min(50, max - 24) ? cut.slice(0, lastSpace) : cut
  return `${base.trimEnd()}…`
}

/** Merge comma-separated keyword lists; dedupe and always include core brand terms. */
export function mergeKeywords(...parts: (string | undefined | null)[]): string {
  const tokens = new Set<string>()
  for (const part of parts) {
    if (!part) continue
    for (const token of part.split(',').map((s) => s.trim().toLowerCase()).filter(Boolean)) {
      tokens.add(token)
    }
  }
  for (const core of CORE_KEYWORDS) tokens.add(core)
  return [...tokens].join(', ')
}

/** Ensure primary brand appears in the document title. */
export function ensureBrandTitle(title: string, brand = BRAND_NAME): string {
  const t = title.trim()
  if (!t) return `${brand} Field Manual`
  if (/road to vostok/i.test(t)) return t
  return `${t} | ${brand}`
}

/** Ensure description mentions Road to Vostok for topical relevance. */
export function ensureBrandDescription(text: string, brand = BRAND_NAME): string {
  const t = text.replace(/\s+/g, ' ').trim()
  if (!t) return clampMetaDescription(`${brand} player wiki and strategy guide.`)
  if (/road to vostok/i.test(t)) return clampMetaDescription(t)
  return clampMetaDescription(`${t} Part of the ${brand} Field Manual.`)
}

/** Absolute URL for a path served from site root (e.g. public/). */
export function absoluteUrlFromRootPath(rootPath: string, siteOrigin = DEFAULT_SITE_ORIGIN): string {
  const path = rootPath.startsWith('/') ? rootPath : `/${rootPath}`
  return `${siteOrigin}${path}`
}

export function canonicalUrlForPath(path: string, siteOrigin = DEFAULT_SITE_ORIGIN): string {
  const p = path.startsWith('/') ? path : `/${path}`
  return `${siteOrigin}${p}` || `${siteOrigin}/`
}

function defaultOgImageUrl(siteOrigin = DEFAULT_SITE_ORIGIN): string {
  return absoluteUrlFromRootPath(DEFAULT_OG_IMAGE_PATH, siteOrigin)
}

function resolveOgImage(raw: string | undefined, siteOrigin: string): string {
  if (raw && String(raw).trim()) {
    const s = String(raw).trim()
    if (/^https?:\/\//i.test(s)) return s
    return absoluteUrlFromRootPath(s, siteOrigin)
  }
  return defaultOgImageUrl(siteOrigin)
}

/** Build normalized SEO object for BaseLayout from route meta or blog post. */
export function buildSeo(input: SeoInput, path = '/', siteOrigin = DEFAULT_SITE_ORIGIN): BuiltSeo {
  const rawTitle =
    typeof input.title === 'string' && input.title.trim() ? input.title.trim() : SITE_NAME
  const title = ensureBrandTitle(rawTitle)
  const description = input.description
    ? ensureBrandDescription(input.description)
    : ''
  const keywords = input.keywords ? mergeKeywords(input.keywords) : mergeKeywords()
  const robots = input.robots ?? 'index, follow'

  const canonical =
    input.canonical === false
      ? null
      : input.canonical
        ? canonicalUrlForPath(input.canonical, siteOrigin)
        : canonicalUrlForPath(path, siteOrigin)

  const ogTitle = input.ogTitle || title
  const ogDescription = ensureBrandDescription(input.ogDescription || input.description || '')
  const ogUrl = input.ogUrl != null ? input.ogUrl : canonical

  const ogImage = input.canonical === false ? null : resolveOgImage(input.ogImage, siteOrigin)
  const ogImageAlt =
    typeof input.ogImageAlt === 'string' && input.ogImageAlt.trim()
      ? input.ogImageAlt.trim()
      : `${SITE_NAME} · preview`

  const twitterImage = input.twitterImage
    ? resolveOgImage(input.twitterImage, siteOrigin)
    : ogImage

  return {
    title,
    description,
    keywords,
    robots,
    author: input.author,
    canonical,
    og: {
      type: input.ogType || 'website',
      siteName: input.ogSiteName || SITE_NAME,
      title: ogTitle,
      description: ogDescription,
      url: ogUrl,
      image: ogImage,
      imageAlt: ogImageAlt,
    },
    twitter: {
      card: input.twitterCard || (ogImage && ogImage !== defaultOgImageUrl(siteOrigin) ? 'summary_large_image' : 'summary'),
      title: input.twitterTitle || ogTitle,
      description: input.twitterDescription || ogDescription,
      image: twitterImage,
      imageAlt: input.twitterImageAlt ?? ogImageAlt,
    },
  }
}

export interface BreadcrumbItem {
  name: string
  path: string
}

/** Schema.org BreadcrumbList for JSON-LD. */
export function breadcrumbJsonLd(
  items: BreadcrumbItem[],
  siteOrigin = DEFAULT_SITE_ORIGIN,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: canonicalUrlForPath(item.path, siteOrigin),
    })),
  }
}

/** Shared Organization publisher for JSON-LD (E-E-A-T). */
export function organizationPublisher(siteOrigin = DEFAULT_SITE_ORIGIN): Record<string, unknown> {
  return {
    '@type': 'Organization',
    name: SITE_NAME,
    url: `${siteOrigin}/legal/about`,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrlFromRootPath(DEFAULT_OG_IMAGE_PATH, siteOrigin),
    },
  }
}

/** Schema.org WebPage for hub / index routes. */
export function webPageJsonLd(input: {
  name: string
  description?: string
  path: string
  image?: string
  dateModified?: string
  siteOrigin?: string
}): Record<string, unknown> {
  const siteOrigin = input.siteOrigin ?? DEFAULT_SITE_ORIGIN
  const url = canonicalUrlForPath(input.path, siteOrigin)
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: input.name,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    publisher: organizationPublisher(siteOrigin),
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: `${siteOrigin}/`,
    },
  }
  if (input.description) data.description = clampMetaDescription(input.description)
  if (input.image) data.primaryImageOfPage = absoluteUrlFromRootPath(input.image, siteOrigin)
  if (input.dateModified) data.dateModified = input.dateModified
  return data
}

/** Schema.org Article for wiki detail pages. */
export function articleJsonLd(input: {
  headline: string
  description?: string
  path: string
  image?: string
  datePublished?: string
  dateModified?: string
  authorName?: string
  siteOrigin?: string
}): Record<string, unknown> {
  const siteOrigin = input.siteOrigin ?? DEFAULT_SITE_ORIGIN
  const url = canonicalUrlForPath(input.path, siteOrigin)
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.headline,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    publisher: organizationPublisher(siteOrigin),
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: `${siteOrigin}/`,
    },
  }
  if (input.description) data.description = clampMetaDescription(input.description)
  if (input.image) data.image = absoluteUrlFromRootPath(input.image, siteOrigin)
  if (input.datePublished) data.datePublished = input.datePublished
  if (input.dateModified) data.dateModified = input.dateModified
  if (input.authorName) {
    data.author = {
      '@type': 'Organization',
      name: input.authorName,
      url: `${siteOrigin}/legal/about`,
    }
  }
  return data
}

/** Schema.org page types for Legal routes. */
export function legalPageJsonLd(input: {
  name: string
  description?: string
  path: string
  pageType?: 'WebPage' | 'AboutPage' | 'ContactPage'
  siteOrigin?: string
}): Record<string, unknown> {
  const siteOrigin = input.siteOrigin ?? DEFAULT_SITE_ORIGIN
  const url = canonicalUrlForPath(input.path, siteOrigin)
  return {
    '@context': 'https://schema.org',
    '@type': input.pageType ?? 'WebPage',
    name: input.name,
    url,
    description: input.description ? clampMetaDescription(input.description) : undefined,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    publisher: organizationPublisher(siteOrigin),
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: `${siteOrigin}/`,
    },
  }
}

/** Schema.org CollectionPage for list hubs (blog index, etc.). */
export function collectionPageJsonLd(input: {
  name: string
  description?: string
  path: string
  siteOrigin?: string
}): Record<string, unknown> {
  const siteOrigin = input.siteOrigin ?? DEFAULT_SITE_ORIGIN
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: input.name,
    url: canonicalUrlForPath(input.path, siteOrigin),
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: `${siteOrigin}/`,
    },
  }
  if (input.description) data.description = clampMetaDescription(input.description)
  return data
}

/** Blog post SEO helper. */
export function buildBlogPostSeo(
  post: {
    seo?: { title: string; description: string; keywords: string }
    title: string
    imageUrl?: string
    imageAlt?: string
  },
  path: string,
  siteOrigin = DEFAULT_SITE_ORIGIN,
): BuiltSeo {
  if (!post?.seo) {
    return buildSeo({ title: post.title }, path, siteOrigin)
  }
  return buildSeo(
    {
      title: post.seo.title.trim(),
      description: post.seo.description,
      keywords: post.seo.keywords,
      ogTitle: post.seo.title.trim(),
      ogDescription: post.seo.description,
      ogType: 'article',
      ogImage: post.imageUrl,
      ogImageAlt: (post.imageAlt && post.imageAlt.trim()) || post.title,
      twitterCard: post.imageUrl ? 'summary_large_image' : 'summary',
      robots: 'index, follow',
      canonical: path,
    },
    path,
    siteOrigin,
  )
}

/** Wiki dossier Article + Breadcrumb JSON-LD bundle. */
export function wikiDetailArticleJsonLd(input: {
  headline: string
  description?: string
  path: string
  image?: string
  breadcrumbs: BreadcrumbItem[]
  siteOrigin?: string
}): Record<string, unknown>[] {
  return [
    breadcrumbJsonLd(input.breadcrumbs, input.siteOrigin),
    articleJsonLd({
      headline: input.headline,
      description: input.description,
      path: input.path,
      image: input.image,
      authorName: EDITORIAL_BYLINE,
      datePublished: SITE_CONTENT_PUBLISHED,
      dateModified: WIKI_LAST_VERIFIED,
      siteOrigin: input.siteOrigin,
    }),
  ]
}

/** Default WebSite JSON-LD for pages without custom structured data. */
export function webSiteJsonLd(siteOrigin = DEFAULT_SITE_ORIGIN): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    alternateName: [BRAND_NAME, 'Road to Vostok Wiki', 'roadtovostok.net'],
    url: `${siteOrigin}/`,
    description:
      'Road to Vostok strategy guide: weapons and ammo wiki, interactive map, NPCs, map walkthroughs, Start hub and updates.',
    inLanguage: 'en',
    publisher: organizationPublisher(siteOrigin),
  }
}
