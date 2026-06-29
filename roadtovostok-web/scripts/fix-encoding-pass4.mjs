import fs from 'node:fs'
import path from 'node:path'

const root = path.join(import.meta.dirname, '..', 'src')

const reps = [
  ['\u00C2\u00B7', '\u00B7'],
  ['\u00e2\u0080\u0094', '\u2014'],
  ['\u00e2\u0080\u0093', '\u2013'],
  ['\u00e2\u0080\u0099', '\u2019'],
  ['\u00e2\u0080\u009c', '\u201c'],
  ['\u00e2\u0080\u009d', '\u201d'],
  ['\u00e2\u0080\u0098', '\u2018'],
  ['\u00e2\u0080\u0099', '\u2019'],
  ['\u00e2\u0080\u00A6', '\u2026'],
  ['\u00e2\u0086\u0092', '\u2192'],
  ['\uFFFD', '\u2014'],
  ['\u2014s ', '\u2019s '],
  ['\u2014s.', '\u2019s.'],
  ['\u2014s,', '\u2019s,'],
  ['\u2014s public', '\u2019s public'],
  ['\u2014s stakes', '\u2019s stakes'],
  ['\u2014About', '\u2014 About'],
  ['\u2014Privacy', '\u2014 Privacy'],
  ['\u2014Contact', '\u2014 Contact'],
  ['\u2014demo', '\u2014 demo'],
  ['\u2014weapons', '\u2014 weapons'],
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
