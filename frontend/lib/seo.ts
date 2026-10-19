import type {Metadata} from 'next'
import type {SeoContent, SeoSettings} from '@/sanity/content'
import {siteUrl} from '@/lib/site'

export function isVercelPreview() {
  return Boolean(process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production')
}

export function validGa4MeasurementId(value?: string) {
  return value && /^G-[A-Z0-9]+$/.test(value) ? value : undefined
}

export function googleVerificationContent(value?: string) {
  if (!value) return undefined
  const trimmed = value.trim()
  let content = trimmed
  if (/^<meta\b/i.test(trimmed)) {
    const contentAttribute = trimmed.match(/\bcontent\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i)
    content = contentAttribute?.[1] || contentAttribute?.[2] || contentAttribute?.[3] || ''
  }
  content = content.trim()
  return content && !/[<\s]/.test(content) ? content : undefined
}

export function shareImageUrl(image: string) {
  if (!image.startsWith('https://cdn.sanity.io/images/')) return image
  const url = new URL(image)
  url.searchParams.set('w', '1200')
  url.searchParams.set('h', '630')
  url.searchParams.set('fit', 'crop')
  return url.toString()
}

export function pageMetadata({
  pathname,
  fallbackTitle,
  fallbackDescription,
  seo,
  defaults,
  businessName,
  noIndex = false,
}: {
  pathname: string
  fallbackTitle: string
  fallbackDescription: string
  seo?: SeoContent
  defaults: SeoSettings
  businessName: string
  noIndex?: boolean
}): Metadata {
  const customTitle = seo?.title?.trim()
  const title = customTitle
    ? `${customTitle}${defaults.titleSuffix && !customTitle.endsWith(defaults.titleSuffix) ? defaults.titleSuffix : ''}`
    : fallbackTitle
  const description = seo?.description?.trim() || fallbackDescription || defaults.defaultDescription
  const image = shareImageUrl(seo?.ogImage || defaults.defaultOgImage || '/og.jpg')
  const hidden = noIndex || Boolean(seo?.noIndex) || isVercelPreview()
  const url = siteUrl(pathname)

  return {
    title,
    description,
    alternates: {canonical: url},
    openGraph: {
      title,
      description,
      url,
      siteName: businessName,
      locale: 'en_CA',
      type: 'website',
      images: [{url: image, width: 1200, height: 630}],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    ...(hidden ? {robots: {index: false, follow: false}} : {}),
  }
}
