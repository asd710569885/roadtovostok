import { rmSync } from 'node:fs'
import { join } from 'node:path'

const root = join(import.meta.dirname, '..')
for (const dir of ['node_modules/.vite', '.astro', 'dist']) {
  rmSync(join(root, dir), { recursive: true, force: true })
}
console.log('Cleaned .astro, node_modules/.vite, dist')
