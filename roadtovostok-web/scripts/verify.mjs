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

const sitemapPath = join(dist, 'sitemap.xml')
if (!existsSync(sitemapPath)) {
  console.error('\n✗ Missing dist/sitemap.xml — run npm run build (normalize-sitemap step)')
  process.exit(1)
}

const xml = readFileSync(sitemapPath, 'utf8')
const locCount = (xml.match(/<loc>/g) || []).length
console.log(`\n✓ sitemap.xml present (${locCount} URLs)`)
if (locCount < routes.length - 3) {
  console.warn(`⚠ sitemap URL count (${locCount}) is lower than HTML routes (${routes.length}) — check sitemap filter`)
}
