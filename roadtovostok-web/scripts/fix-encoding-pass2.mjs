import fs from 'node:fs'
import path from 'node:path'

const root = path.join(import.meta.dirname, '..', 'src')

/** Second-pass fixes after aggressive U+FFFD cleanup. */
const reps = [
  ['Build 8 ?Silent Night', 'Build 8 — Silent Night'],
  ['404?use', '404—use'],
  ['flow?primary', 'flow—primary'],
  ['review?always', 'review—always'],
  ['Finland?Russia', 'Finland–Russia'],
  ['Outpost ? Minefield ? Apartments', 'Outpost · Minefield · Apartments'],
  ['bunker?community', 'bunker—community'],
  ['2?4 years', '2–4 years'],
  ['Build 1 ?Road', 'Build 1 — Road'],
  ['Build 2 ?Nomads', 'Build 2 — Nomads'],
  ['Build 3 ?Signal', 'Build 3 — Signal'],
  ['Build 4 ?Gunslinger', 'Build 4 — Gunslinger'],
  ['Build 5 ?North', 'Build 5 — North'],
  ['Build 6 ?Abyss', 'Build 6 — Abyss'],
  ['Build 7 ?Enigma', 'Build 7 — Enigma'],
  ['Official sources ? Changelog', 'Official sources · Changelog'],
  ['Steam?s', "Steam's"],
  ['what?s', "what's"],
  ['developer?s', "developer's"],
  ['aren?t', "aren't"],
  ['Don?t', "Don't"],
  ['you?re', "you're"],
  ['we?re', "we're"],
  ['zone?s', "zone's"],
  ['slip?treat', 'slip—treat'],
  ['Builds and dates slip?treat', 'Builds and dates slip—treat'],
  ['?last checked?build', '"last checked" build'],
  ['Steam ?Library ?Road to Vostok ?Properties', 'Steam → Library → Road to Vostok → Properties'],
  ['recon ?plan ?execute', 'recon → plan → execute'],
  ['Target release Apr 7, 2026', 'Released Apr 7, 2026 (live)'],
  ['â€"', '—'],
  ['Â·', '·'],
  ['â€™', "'"],
  ['Finlandâ€"Russia', 'Finland–Russia'],
  ['Finlandâ€“Russia', 'Finland–Russia'],
  ['zoneâ€™s', "zone's"],
  ['Shipyardâ€"', 'Shipyard…'],
  ['thumbnailsâ€"', 'thumbnails—'],
  ['commentaryâ€"', 'commentary—'],
  ['pageâ€"', 'page—'],
  ['firstâ€"', 'first—'],
  ['Independent projectâ€"', 'Independent project—'],
  ['sectionsâ€"', 'sections—'],
  ['routeâ€"', 'route—'],
  ['borderâ€"', 'border—'],
  ['farm.â€"', 'farm."'],
  ['carry right now</strong>â€"', 'carry right now</strong>—'],
  ['anywhere elseâ€"', 'anywhere else—'],
  ['Obstaclesâ€"', 'Obstacles—'],
  ['â†?', '→'],
  ['Open â†?', 'Open →'],
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
