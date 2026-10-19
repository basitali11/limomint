import type {MetadataRoute} from 'next'
import {getHomePageContent, getLocationPages, getStaticPage} from '@/sanity/content'
import type {StaticPageId} from '@/sanity/content'
import {siteUrl} from '@/lib/site'

export const revalidate = 60

const staticRoutes: Array<{path: string; id: StaticPageId}> = [
  {path: '/about', id: 'aboutPage'},
  {path: '/services', id: 'servicesPage'},
  {path: '/fleet', id: 'fleetPage'},
  {path: '/faq', id: 'faqPage'},
  {path: '/contact', id: 'contactPage'},
  {path: '/reservations', id: 'reservationsPage'},
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [home, locationPages, ...pages] = await Promise.all([
    getHomePageContent(),
    getLocationPages(),
    ...staticRoutes.map(({id}) => getStaticPage(id)),
  ])

  const routes: MetadataRoute.Sitemap = []
  if (!home?.seo?.noIndex) routes.push({url: siteUrl('/')})
  routes.push({url: siteUrl('/locations')})

  staticRoutes.forEach(({path}, index) => {
    if (!pages[index]?.seo?.noIndex) routes.push({url: siteUrl(path)})
  })

  for (const location of locationPages) {
    if (location.seo?.noIndex) continue
    routes.push({
      url: siteUrl(`/locations/${location.slug}`),
      ...(location.updatedAt ? {lastModified: new Date(location.updatedAt)} : {}),
    })
  }

  return routes
}
