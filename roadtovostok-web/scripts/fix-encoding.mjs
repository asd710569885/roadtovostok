import fs from 'node:fs'
import path from 'node:path'

const root = path.join(import.meta.dirname, '..', 'src')

const reps = [
  ['Jump to\uFFFD?/h2>', 'Jump to</h2>'],
  ['Open \uFFFD?/span>', 'Open \u2192</span>'],
  ['\u00C2\u00B7', '\u00B7'],
  ['\uFFFD?', '\u2014'],
  ['Finland\uFFFDRussia', 'Finland\u2013Russia'],
  ['Finland\uFFFDRussia', 'Finland\u2013Russia'],
  ['aren\uFFFDt', "aren't"],
  ['developer\uFFFDs', "developer's"],
  ['Don\uFFFDt', "Don't"],
  ['you\uFFFDre', "you're"],
  ['we\uFFFDre', "we're"],
  ['what\uFFFDs', "what's"],
  ['zone\uFFFDs', "zone's"],
  ['companies\uFFFD', "companies'"],
  ['Redirecting\uFFFD?', 'Redirecting\u2026'],
  ['\uFFFD\u201c', '\u201c'],
  ['\uFFFD\u201d', '\u201d'],
  ['\uFFFD\u2019', '\u2019'],
  ['\uFFFD\u2192', '\u2192'],
  ['\uFFFD\u2026', '\u2026'],
]

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name)
    if (fs.statSync(p).isDirectory()) walk(p)
    else if (name.endsWith('.astro')) fixFile(p)
  }
}

function fixFile(file) {
  let c = fs.readFileSync(file, 'utf8')
  const o = c
  for (const [a, b] of reps) c = c.split(a).join(b)
  if (c !== o) {
    fs.writeFileSync(file, c, 'utf8')
    console.log('fixed', path.relative(root, file))
  }
}

walk(root)
