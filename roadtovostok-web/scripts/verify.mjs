import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'

const root = join(import.meta.dirname, '..')
const dist = join(root, 'dist')

function walkHtml(dir, base = '') {
  const out = []
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) {
      out.push(...walkHtml(full, `${base}/${name}`))
    } else if (name.endsWith('.html')) {
      const route = base || '/'
      out.push(route === '/' && name === 'index.html' ? '/' : `${base}/${name.replace(/index\.html$/, '').replace(/\.html$/, '')}`.replace(/\/$/, '') || base)
    }
  }
  return out
}

console.log('Running production build…')
const build = spawnSync('npm', ['run', 'build'], { cwd: root, stdio: 'inherit', shell: true })
if (build.status !== 0) process.exit(build.status ?? 1)

const routes = walkHtml(dist).sort()
console.log(`\n✓ ${routes.length} HTML routes in dist/:\n`)
for (const r of routes) console.log(`  ${r}`)

const sitemapIndex = join(dist, 'sitemap-index.xml')
if (!existsSync(sitemapIndex)) {
  console.error('\n✗ Missing dist/sitemap-index.xml — run with @astrojs/sitemap configured')
  process.exit(1)
}
console.log('\n✓ sitemap-index.xml present')

const sitemapBody = join(dist, 'sitemap-0.xml')
if (existsSync(sitemapBody)) {
  const xml = readFileSync(sitemapBody, 'utf8')
  const locCount = (xml.match(/<loc>/g) || []).length
  console.log(`✓ sitemap-0.xml contains ${locCount} URLs`)
  if (locCount < routes.length - 3) {
    console.warn(`⚠ sitemap URL count (${locCount}) is lower than HTML routes (${routes.length}) — check sitemap filter`)
  }
}
