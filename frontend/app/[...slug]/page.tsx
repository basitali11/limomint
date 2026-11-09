import {notFound, permanentRedirect, redirect} from 'next/navigation'
import type {Metadata} from 'next'
import {getRedirect, normalizeRedirectPath} from '@/sanity/content'
import {siteUrl} from '@/lib/site'

export const revalidate = 60

export async function generateMetadata({params}: {params: Promise<{slug: string[]}>}): Promise<Metadata> {
  const {slug} = await params
  const title = 'Page not found | LimoMint'
  const description = 'The page you requested could not be found.'
  const canonical = siteUrl(`/${slug.join('/')}`)
  const image = siteUrl('/og.jpg')

  return {
    title: {absolute: title},
    description,
    alternates: {canonical},
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'LimoMint',
      locale: 'en_CA',
      type: 'website',
      images: [{url: image, width: 1200, height: 630}],
    },
    twitter: {card: 'summary_large_image', title, description, images: [image]},
    robots: {index: false, follow: false},
  }
}

const reservedPaths = new Set([
  'about', 'fleet', 'services', 'faq', 'reservations', 'contact', 'locations', 'api',
  'sitemap.xml', 'robots.txt',
])

function isReservedPath(path: string) {
  return reservedPaths.has(normalizeRedirectPath(path).slice(1).split('/')[0])
}

export default async function RedirectOrNotFound({params}: {params: Promise<{slug: string[]}>}) {
  const {slug} = await params
  const path = `/${slug.join('/')}`
  if (isReservedPath(path)) notFound()

  const match = await getRedirect(path).catch(() => null)
  if (!match || normalizeRedirectPath(match.to) === normalizeRedirectPath(path)) notFound()

  if (/^https?:\/\//i.test(match.to) || (match.to.startsWith('/') && !match.to.startsWith('//'))) {
    if (match.permanent) permanentRedirect(match.to)
    redirect(match.to)
  }

  notFound()
}
