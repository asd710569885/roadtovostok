import RasterMapPageView from '../views/raster-maps/RasterMapPageView.vue'
import { RASTER_MAP_PAGES } from '../data/raster-maps/rasterMapPages.js'

export const rasterMapRoutes = RASTER_MAP_PAGES.map((p) => ({
  path: p.path,
  name: p.routeName,
  component: RasterMapPageView,
  props: { mapModule: p.mapModule },
  meta: {
    title: p.title,
    description: p.description,
    keywords: p.keywords,
    ogImage: p.fullMap,
    ogImageAlt: p.ogImageAlt,
    twitterCard: 'summary_large_image',
  },
}))
