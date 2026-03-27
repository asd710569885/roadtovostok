/**
 * Title / Description / Keywords + Open Graph / Twitter after each client navigation.
 * For maximum crawl reliability, pair with SSR or prerender for public URLs.
 */

const SITE_NAME = 'Road to Vostok Field Manual'

/** Default social preview (public/); crawlers need an absolute URL. */
const DEFAULT_OG_IMAGE_PATH = '/images/logo.png'

/** Production host for canonical / og:url (avoids www vs apex duplicate signals). Dev uses current origin. */
const DEFAULT_SITE_ORIGIN = 'https://roadtovostok.net'

function canonicalOrigin() {
  if (import.meta.env.DEV) {
    return typeof window !== 'undefined' ? window.location.origin : DEFAULT_SITE_ORIGIN
  }
  return import.meta.env.VITE_SITE_ORIGIN || DEFAULT_SITE_ORIGIN
}

function mergeRouteMeta(to) {
  return to.matched.reduce((acc, record) => {
    const m = record.meta
    if (!m || typeof m !== 'object') return acc
    return { ...acc, ...m }
  }, {})
}

function setOrCreateMetaByName(name, content) {
  if (content == null || content === '') return
  let el = document.head.querySelector(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setOrCreateMetaByProperty(property, content) {
  if (content == null || content === '') return
  let el = document.head.querySelector(`meta[property="${property}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('property', property)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setOrCreateLinkRel(rel, href) {
  if (!href) return
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function removeLinkRel(rel) {
  document.head.querySelector(`link[rel="${rel}"]`)?.remove()
}

function removeMetaByProperty(property) {
  document.head.querySelector(`meta[property="${property}"]`)?.remove()
}

function removeMetaByName(name) {
  document.head.querySelector(`meta[name="${name}"]`)?.remove()
}

/** Absolute URL for a path served from site root (e.g. public/). Respects Vite `base`. */
export function absoluteUrlFromRootPath(rootPath) {
  const origin = canonicalOrigin()
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
  const path = rootPath.startsWith('/') ? rootPath : `/${rootPath}`
  if (!base) {
    return `${origin}${path}`
  }
  return `${origin}${base}${path}`
}

function defaultOgImageUrl() {
  const p = import.meta.env.VITE_OG_IMAGE_PATH || DEFAULT_OG_IMAGE_PATH
  if (/^https?:\/\//i.test(p)) {
    return p
  }
  return absoluteUrlFromRootPath(p)
}

/** @param {string} path e.g. /blog/slug */
export function canonicalUrlForPath(path) {
  const origin = canonicalOrigin()
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
  const p = path.startsWith('/') ? path : `/${path}`
  if (!base) {
    return `${origin}${p}` || `${origin}/`
  }
  return `${origin}${base}${p}`
}

function canonicalUrlForRoute(to) {
  return canonicalUrlForPath(to.path)
}

/**
 * @param {import('vue-router').RouteLocationNormalizedLoaded} to
 */
export function applyRouteSeo(to) {
  const meta = mergeRouteMeta(to)

  document.title = typeof meta.title === 'string' && meta.title.trim() ? meta.title.trim() : SITE_NAME

  if (meta.description) {
    setOrCreateMetaByName('description', meta.description)
  }
  if (meta.keywords) {
    setOrCreateMetaByName('keywords', meta.keywords)
  }

  setOrCreateMetaByName('robots', meta.robots || 'index, follow')
  if (meta.author) {
    setOrCreateMetaByName('author', meta.author)
  }

  const canonical = meta.canonical === false ? null : meta.canonical || canonicalUrlForRoute(to)
  if (meta.canonical === false) {
    removeLinkRel('canonical')
    removeMetaByProperty('og:url')
    removeMetaByProperty('og:image')
    removeMetaByProperty('og:image:alt')
    removeMetaByName('twitter:image')
    removeMetaByName('twitter:image:alt')
  } else {
    setOrCreateLinkRel('canonical', canonical)
  }

  const ogTitle = meta.ogTitle || document.title
  const ogDescription = meta.ogDescription || meta.description || ''
  const ogUrl = meta.ogUrl != null ? meta.ogUrl : canonical

  setOrCreateMetaByProperty('og:type', meta.ogType || 'website')
  setOrCreateMetaByProperty('og:site_name', meta.ogSiteName || SITE_NAME)
  setOrCreateMetaByProperty('og:title', ogTitle)
  if (ogDescription) {
    setOrCreateMetaByProperty('og:description', ogDescription)
  }
  if (ogUrl) {
    setOrCreateMetaByProperty('og:url', ogUrl)
  }

  setOrCreateMetaByName('twitter:card', meta.twitterCard || 'summary')
  setOrCreateMetaByName('twitter:title', meta.twitterTitle || ogTitle)
  if (ogDescription) {
    setOrCreateMetaByName('twitter:description', meta.twitterDescription || ogDescription)
  }

  if (meta.canonical !== false) {
    const ogImage = meta.ogImage || defaultOgImageUrl()
    const ogImageAlt =
      typeof meta.ogImageAlt === 'string' && meta.ogImageAlt.trim()
        ? meta.ogImageAlt.trim()
        : `${SITE_NAME} · preview`
    setOrCreateMetaByProperty('og:image', ogImage)
    setOrCreateMetaByProperty('og:image:alt', ogImageAlt)

    const twitterImage = meta.twitterImage || ogImage
    setOrCreateMetaByName('twitter:image', twitterImage)
    if (meta.twitterImageAlt != null && meta.twitterImageAlt !== '') {
      setOrCreateMetaByName('twitter:image:alt', meta.twitterImageAlt)
    } else {
      setOrCreateMetaByName('twitter:image:alt', ogImageAlt)
    }
  }
}

/**
 * Apply title/description/keywords/OG for a blog post (detail routes).
 * Call from BlogDetailView when the active post changes; router afterEach will overwrite on the next navigation.
 *
 * @param {{ seo?: { title: string; description: string; keywords: string }; title: string; imageUrl?: string; imageAlt?: string; publishDate?: string } | null | undefined} post
 * @param {string} path Route path (e.g. /blog/slug)
 */
export function applyBlogPostSeo(post, path) {
  if (!post?.seo) return

  const p = path.startsWith('/') ? path : `/${path}`
  const meta = {
    title: post.seo.title.trim(),
    description: post.seo.description,
    keywords: post.seo.keywords,
    ogTitle: post.seo.title.trim(),
    ogDescription: post.seo.description,
    ogType: 'article',
    robots: 'index, follow',
  }

  if (post.imageUrl) {
    meta.ogImage = absoluteUrlFromRootPath(post.imageUrl)
    meta.ogImageAlt = (post.imageAlt && post.imageAlt.trim()) || post.title
    meta.twitterCard = 'summary_large_image'
  }

  applyRouteSeo({
    path: p,
    matched: [{ meta }],
    meta: {},
  })
}
