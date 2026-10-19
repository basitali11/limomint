import {sanityClient} from './client'
import {business, faqs, fleet, serviceCards, services, staticPageDefaults, testimonials} from '@/lib/data'
import type {FleetCar, Service, ServiceCard, Testimonial} from '@/lib/data'

export type SeoContent = {
  title?: string
  description?: string
  ogImage?: string
  noIndex?: boolean
}

export type HomePageContent = {
  eyebrow?: string
  headline?: string
  headlineAccent?: string
  description?: string
  heroImage?: string
  heroImageAlt?: string
  primaryCtaLabel?: string
  seo?: SeoContent
}

export type StaticPageId = keyof typeof staticPageDefaults
export type StaticPageContent = {heading: string; intro: string; seo?: SeoContent}

export type OpeningHours = {
  days?: string[]
  opens?: string
  closes?: string
}

export type BusinessInfo = Omit<typeof business, 'phoneHref'> & {
  phoneHref: string
  streetAddress?: string
  postalCode?: string
  country?: string
  hideStreetAddress?: boolean
  serviceAreas?: string[]
  open24Hours?: boolean
  openingHours?: OpeningHours[]
  priceRange?: string
  latitude?: number
  longitude?: number
  logo?: string
  googleBusinessProfileUrl?: string
  facebookUrl?: string
  instagramUrl?: string
  xUrl?: string
  linkedinUrl?: string
  shortDescription?: string
}

export type SeoSettings = {
  titleSuffix: string
  defaultDescription: string
  defaultOgImage: string
  googleSiteVerification?: string
  ga4MeasurementId?: string
}

export type LocationPageSummary = {
  title: string
  slug: string
  areaName?: string
  intro?: string
  updatedAt?: string
  seo?: SeoContent
}

export function normalizeRedirectPath(path: string) {
  const normalized = path.trim().toLowerCase().replace(/\/+$/, '')
  return normalized || '/'
}

export type LocationPageContent = LocationPageSummary & {
  body?: unknown[]
  highlights?: string[]
  faqs?: Array<{question: string; answer: string}>
  relatedServices?: Service[]
}

export type RedirectContent = {
  from: string
  to: string
  permanent: boolean
}

type CmsVehicle = {
  _id: string
  name?: string
  tagline?: string
  pricePerHour?: number
  seats?: string
  bags?: string
  transmission?: string
  icon?: FleetCar['icon']
  features?: string[]
  images?: Array<{url?: string | null; alt?: string} | null>
}

type CmsService = Service & {description?: string}

async function readSanity<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  try {
    return await sanityClient.fetch<T>(query, params, {next: {revalidate: 60}})
  } catch (error) {
    console.error('Sanity content request failed; using the site defaults.', error)
    return null
  }
}

function telHref(phone: string) {
  const normalized = phone.trim().replace(/[^\d+]/g, '')
  return normalized ? `tel:${normalized}` : business.phoneHref
}

export async function getHomePageContent() {
  return readSanity<HomePageContent>(`*[_type == "homePage" && _id == "homePage"][0]{
    eyebrow,
    headline,
    headlineAccent,
    description,
    "heroImage": heroImage.asset->url,
    "heroImageAlt": heroImage.alt,
    primaryCtaLabel,
    "seo": seo{title, description, noIndex, "ogImage": ogImage.asset->url}
  }`)
}

export async function getBusinessInfo(): Promise<BusinessInfo> {
  const settings = await readSanity<{
    businessName?: string
    phone?: string
    phoneHref?: string
    email?: string
    city?: string
    region?: string
    address?: string
    streetAddress?: string
    postalCode?: string
    country?: string
    hideStreetAddress?: boolean
    serviceAreas?: string[]
    open24Hours?: boolean
    openingHours?: OpeningHours[]
    priceRange?: string
    latitude?: number
    longitude?: number
    logo?: string
    googleBusinessProfileUrl?: string
    facebookUrl?: string
    instagramUrl?: string
    xUrl?: string
    linkedinUrl?: string
    shortDescription?: string
  }>(`*[_type == "siteSettings" && _id == "siteSettings"][0]{
    businessName, phone, phoneHref, email, city, region, address,
    streetAddress, postalCode, country, hideStreetAddress, serviceAreas,
    open24Hours, openingHours[]{days, opens, closes}, priceRange, latitude, longitude,
    "logo": logo.asset->url, googleBusinessProfileUrl,
    facebookUrl, instagramUrl, xUrl, linkedinUrl, shortDescription
  }`)

  if (!settings) {
    return {
      ...business,
      country: 'CA',
      hideStreetAddress: false,
      serviceAreas: [],
      open24Hours: false,
      openingHours: [],
    }
  }

  const phone = settings.phone || business.phone
  const regionAndPostalCode = [settings.region, settings.postalCode]
    .map((part) => part?.trim())
    .filter((part): part is string => Boolean(part))
    .join(' ')
  const addressParts = [settings.streetAddress, settings.city, regionAndPostalCode]
    .map((part) => part?.trim())
    .filter((part): part is string => Boolean(part))
  const address = settings.streetAddress?.trim()
    ? addressParts.join(', ')
    : settings.address || business.address

  return {
    ...business,
    name: settings.businessName || business.name,
    phone,
    phoneHref: settings.phoneHref || (settings.phone ? telHref(phone) : business.phoneHref),
    email: settings.email || business.email,
    city: settings.city || business.city,
    state: settings.region || business.state,
    address,
    streetAddress: settings.streetAddress || business.streetAddress,
    postalCode: settings.postalCode || business.postalCode,
    country: settings.country || 'CA',
    hideStreetAddress: settings.hideStreetAddress || false,
    serviceAreas: settings.serviceAreas || [],
    open24Hours: settings.open24Hours || false,
    openingHours: settings.openingHours || [],
    priceRange: settings.priceRange,
    latitude: settings.latitude,
    longitude: settings.longitude,
    logo: settings.logo,
    googleBusinessProfileUrl: settings.googleBusinessProfileUrl,
    facebookUrl: settings.facebookUrl,
    instagramUrl: settings.instagramUrl,
    xUrl: settings.xUrl,
    linkedinUrl: settings.linkedinUrl,
    shortDescription: settings.shortDescription,
  }
}

export async function getStaticPage(id: StaticPageId): Promise<StaticPageContent> {
  const fallback = staticPageDefaults[id]
  const page = await readSanity<Partial<StaticPageContent>>(`*[_type == "staticPage" && _id == $id][0]{
    heading, intro, "seo": seo{title, description, noIndex, "ogImage": ogImage.asset->url}
  }`, {id})

  return {
    ...fallback,
    ...page,
    heading: page?.heading || fallback.heading,
    intro: page?.intro ?? fallback.intro,
  }
}

const defaultSeoSettings: SeoSettings = {
  titleSuffix: ' | LimoMint',
  defaultDescription: 'Book a private, chauffeur-driven ride in Toronto with LimoMint. Arrange point-to-point trips, airport transfers, and hourly service.',
  defaultOgImage: '/og.jpg',
}

export async function getSeoSettings(): Promise<SeoSettings> {
  const settings = await readSanity<Partial<SeoSettings>>(`*[_type == "seoSettings" && _id == "seoSettings"][0]{
    titleSuffix, defaultDescription, "defaultOgImage": defaultOgImage.asset->url,
    googleSiteVerification, ga4MeasurementId
  }`)

  return {
    titleSuffix: settings?.titleSuffix || defaultSeoSettings.titleSuffix,
    defaultDescription: settings?.defaultDescription || defaultSeoSettings.defaultDescription,
    defaultOgImage: settings?.defaultOgImage || defaultSeoSettings.defaultOgImage,
    googleSiteVerification: settings?.googleSiteVerification || undefined,
    ga4MeasurementId: settings?.ga4MeasurementId || undefined,
  }
}

export async function getLocationPages(): Promise<LocationPageSummary[]> {
  const pages = await readSanity<LocationPageSummary[]>(`*[_type == "locationPage" && defined(slug.current)] | order(title asc){
    title, "slug": slug.current, areaName, intro, "updatedAt": _updatedAt,
    "seo": seo{title, description, noIndex}
  }`)
  return pages || []
}

export async function getLocationPage(slug: string): Promise<LocationPageContent | null> {
  return readSanity<LocationPageContent>(`*[_type == "locationPage" && slug.current == $slug][0]{
    title, "slug": slug.current, areaName, intro, body, highlights,
    "faqs": faqs[]{question, answer},
    "relatedServices": relatedServices[]->{title, icon, description, points},
    "seo": seo{title, description, noIndex, "ogImage": ogImage.asset->url}
  }`, {slug})
}

export async function getRedirect(path: string): Promise<RedirectContent | null> {
  const redirects = await readSanity<RedirectContent[]>(`*[_type == "redirect"]{from, to, permanent}`)
  const normalizedPath = normalizeRedirectPath(path)
  return redirects?.find((redirect) => normalizeRedirectPath(redirect.from) === normalizedPath) || null
}

export async function getVehicles(): Promise<FleetCar[]> {
  const documents = await readSanity<CmsVehicle[]>(`*[_type == "vehicle"] | order(sortOrder asc, name asc){
    _id, name, tagline, pricePerHour, seats, bags, transmission, icon, features,
    "images": images[]{"url": asset->url, alt}
  }`)

  if (!documents?.length) return fleet

  return documents
    .filter((vehicle) => vehicle.name)
    .map((vehicle, index) => ({
      id: vehicle._id,
      name: vehicle.name || `Vehicle ${index + 1}`,
      tagline: vehicle.tagline || '',
      pricePerHour: vehicle.pricePerHour ?? 0,
      seats: vehicle.seats || 'Ask about capacity',
      bags: vehicle.bags || 'Ask about luggage',
      transmission: vehicle.transmission || 'Professional Driver Included',
      icon: vehicle.icon || 'sedan',
      features: vehicle.features || [],
      images: vehicle.images?.filter((image): image is {url: string; alt?: string} => Boolean(image?.url)).map((image) => image.url) || [],
      imageAlts: vehicle.images?.filter((image): image is {url: string; alt?: string} => Boolean(image?.url)).map((image) => image.alt?.trim() || `${vehicle.name} shown as a LimoMint chauffeur vehicle`) || [],
    }))
    .map((vehicle, index) => ({
      ...vehicle,
      images: vehicle.images.length ? vehicle.images : [fleet[index % fleet.length].images[0]],
      imageAlts: vehicle.imageAlts?.length ? vehicle.imageAlts : [fleet[index % fleet.length].imageAlts?.[0] || `${vehicle.name} chauffeur vehicle`],
    }))
}

export async function getServices(): Promise<CmsService[]> {
  const documents = await readSanity<CmsService[]>(`*[_type == "service"] | order(sortOrder asc, title asc){
    title, icon, description, points
  }`)
  return documents?.length ? documents : services
}

export async function getServiceCards(): Promise<ServiceCard[]> {
  const documents = await readSanity<Array<{title?: string; description?: string; icon?: ServiceCard['icon']}>>(
    `*[_type == "servicePageCard"] | order(sortOrder asc, title asc){title, description, icon}`,
  )
  if (!documents?.length) return serviceCards
  return documents
    .filter((item): item is {title: string; description: string; icon?: ServiceCard['icon']} => Boolean(item.title && item.description))
    .map(({title, description, icon}) => ({title, icon: icon || 'compass', text: description}))
}

export async function getFaqs() {
  const documents = await readSanity<Array<{question?: string; answer?: string}>>(
    `*[_type == "faq"] | order(sortOrder asc, question asc){question, answer}`,
  )
  if (!documents?.length) return faqs
  return documents
    .filter((item): item is {question: string; answer: string} => Boolean(item.question && item.answer))
    .map(({question, answer}) => ({q: question, a: answer}))
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const documents = await readSanity<Testimonial[]>(`*[_type == "testimonial"] | order(sortOrder asc, name asc){
    quote, name
  }`)
  return documents?.length ? documents : testimonials
}
