import fs from 'node:fs'
import path from 'node:path'

const root = path.join(import.meta.dirname, '..', 'src')
const R = '\uFFFD'

const reps = [
  [`Shipyard${R}'`, "Shipyard…'"],
  [`thumbnails${R}cross`, 'thumbnails—cross'],
  [`Minefield${R}loot`, 'Minefield—loot'],
  [`Doctor${R}tasks`, 'Doctor—tasks'],
  [`commentary${R}Area`, 'commentary—Area'],
  [`page${R}same`, 'page—same'],
  [`first${R}we`, 'first—we'],
  [` ${R} barter ${R} `, ' · barter · '],
  [` ${R} tasks ${R} `, ' · tasks · '],
  [` ${R} death `, ' · death '],
  [`zone${R}s`, "zone's"],
  [`author${R}s`, "author's"],
  [`what${R}s`, "what's"],
  [` ${R}last checked${R}build`, ' "last checked" build'],
  [`${R}the guide lied${R}when`, ' "the guide lied" when'],
  [` ${R} Changelog`, ' · Changelog'],
  [` ${R} Minefield ${R} `, ' · Minefield · '],
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
  if (!c.includes(R)) return
  const o = c
  for (const [a, b] of reps) c = c.split(a).join(b)
  // Remaining lone replacement chars → em dash (common case)
  c = c.split(R).join('—')
  // Fix over-corrections
  c = c.split('—s ').join("'s ")
  c = c.split('—s.').join("'s.")
  c = c.split('—s,').join("'s,")
  c = c.split('—s public').join("'s public")
  c = c.split('—s stakes').join("'s stakes")
  c = c.split('Loot — barter — tasks — shelter').join('Loot · barter · tasks · multi-shelter')
  if (c !== o) {
    fs.writeFileSync(file, c, 'utf8')
    console.log('fixed', path.relative(root, file))
  }
}

walk(root)
