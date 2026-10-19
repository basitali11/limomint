import type {BusinessInfo} from '@/sanity/content'
import {siteUrl} from '@/lib/site'

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const textValue = (value?: string) => value?.trim() || undefined

function absoluteUrl(value?: string) {
  const candidate = textValue(value)
  if (!candidate) return undefined
  try {
    return new URL(candidate).toString()
  } catch {
    return siteUrl(candidate)
  }
}

function postalAddress(business: BusinessInfo) {
  const address: Record<string, unknown> = {'@type': 'PostalAddress'}
  if (!business.hideStreetAddress) {
    const streetAddress = textValue(business.streetAddress)
    if (streetAddress) address.streetAddress = streetAddress
  }
  if (textValue(business.city)) address.addressLocality = textValue(business.city)
  if (textValue(business.state)) address.addressRegion = textValue(business.state)
  if (textValue(business.postalCode)) address.postalCode = textValue(business.postalCode)
  if (Object.keys(address).length === 1) return undefined
  address.addressCountry = textValue(business.country) || 'CA'
  return address
}

function validTime(value?: string) {
  const time = textValue(value)
  return time && /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(time) ? time : undefined
}

function formattedTelephone(phoneHref: string, fallback?: string) {
  const digits = phoneHref.replace(/^tel:/i, '').replace(/\D/g, '')
  const northAmericanNumber = digits.length === 10 ? `1${digits}` : digits.length === 11 && digits.startsWith('1') ? digits : undefined
  return northAmericanNumber ? `+${northAmericanNumber}` : textValue(fallback)
}

function openingHours(business: BusinessInfo) {
  if (business.open24Hours) {
    return weekdays.map((day) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${day}`,
      opens: '00:00',
      closes: '23:59',
    }))
  }

  return (business.openingHours || []).flatMap((entry) => {
    const opens = validTime(entry.opens)
    const closes = validTime(entry.closes)
    const days = entry.days?.map(textValue).filter((day): day is string => Boolean(day && weekdays.includes(day)))
    if (!opens || !closes || !days?.length) return []
    return days.map((day) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${day}`,
      opens,
      closes,
    }))
  })
}

export function businessJsonLd(business: BusinessInfo, defaultImage?: string) {
  const areaServed = business.serviceAreas?.map(textValue).filter((area): area is string => Boolean(area))
  const sameAs = [
    business.googleBusinessProfileUrl,
    business.facebookUrl,
    business.instagramUrl,
    business.xUrl,
    business.linkedinUrl,
  ].map(textValue).filter((url): url is string => Boolean(url))
  const hours = openingHours(business)

  const localBusiness: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl()}/#business`,
    name: textValue(business.name) || 'LimoMint',
    url: siteUrl(),
    ...(formattedTelephone(business.phoneHref, business.phone) ? {telephone: formattedTelephone(business.phoneHref, business.phone)} : {}),
    ...(textValue(business.email) ? {email: textValue(business.email)} : {}),
    ...(textValue(business.shortDescription) ? {description: textValue(business.shortDescription)} : {}),
    ...(absoluteUrl(business.logo) ? {logo: absoluteUrl(business.logo)} : {}),
    ...(absoluteUrl(business.logo || defaultImage) ? {image: absoluteUrl(business.logo || defaultImage)} : {}),
    ...(textValue(business.priceRange) ? {priceRange: textValue(business.priceRange)} : {}),
    ...(areaServed?.length ? {areaServed} : {}),
    ...(sameAs.length ? {sameAs} : {}),
    ...(hours.length ? {openingHoursSpecification: hours} : {}),
  }

  const address = postalAddress(business)
  if (address) localBusiness.address = address
  if (Number.isFinite(business.latitude) && Number.isFinite(business.longitude)) {
    localBusiness.geo = {
      '@type': 'GeoCoordinates',
      latitude: business.latitude,
      longitude: business.longitude,
    }
  }

  const website: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl()}/#website`,
    name: textValue(business.name) || 'LimoMint',
    url: siteUrl(),
    ...(textValue(business.shortDescription) ? {description: textValue(business.shortDescription)} : {}),
  }

  return [localBusiness, website]
}

export function breadcrumbJsonLd(items: Array<{name: string; path: string}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(({name, path}, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name,
      item: siteUrl(path),
    })),
  }
}

export function faqJsonLd(items: Array<{q: string; a: string}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({q, a}) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: {'@type': 'Answer', text: a},
    })),
  }
}
