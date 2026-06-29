import { existsSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

/** Merge @astrojs/sitemap chunks into a single dist/sitemap.xml. */
const root = join(import.meta.dirname, '..')
const dist = join(root, 'dist')

if (!existsSync(dist)) {
  console.error('✗ dist/ missing — run astro build first')
  process.exit(1)
}

const chunkFiles = readdirSync(dist)
  .filter((name) => /^sitemap-\d+\.xml$/.test(name))
  .sort((a, b) => Number(a.match(/\d+/)[0]) - Number(b.match(/\d+/)[0]))

if (chunkFiles.length === 0) {
  console.error('✗ No sitemap-*.xml in dist/ — is @astrojs/sitemap configured?')
  process.exit(1)
}

const urlBlocks = []
for (const file of chunkFiles) {
  const xml = readFileSync(join(dist, file), 'utf8')
  const matches = xml.match(/<url>[\s\S]*?<\/url>/g)
  if (matches) urlBlocks.push(...matches)
}

const sitemapXml =
  '<?xml version="1.0" encoding="UTF-8"?>' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">' +
  urlBlocks.join('') +
  '</urlset>'

writeFileSync(join(dist, 'sitemap.xml'), sitemapXml, 'utf8')

for (const file of chunkFiles) {
  unlinkSync(join(dist, file))
}

const indexPath = join(dist, 'sitemap-index.xml')
if (existsSync(indexPath)) unlinkSync(indexPath)

console.log(`✓ sitemap.xml written (${urlBlocks.length} URLs)`)
