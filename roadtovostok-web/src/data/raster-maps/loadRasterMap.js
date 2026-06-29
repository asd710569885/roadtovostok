/** Vite bundler: all raster map datasets (map01–map07). */
const mapModules = import.meta.glob('./maps/map0*.js')

/**
 * @param {string} id e.g. 'map01' … 'map07'
 * @returns {Promise<{ default: object }['default']>}
 */
export async function loadRasterMapData(id) {
  const key = Object.keys(mapModules).find((k) => k.endsWith(`/${id}.js`))
  if (!key || !mapModules[key]) {
    throw new Error(`Unknown raster map: ${id}`)
  }
  const mod = await mapModules[key]()
  return mod.default
}
