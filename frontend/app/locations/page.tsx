import type {Metadata} from 'next'
import Link from 'next/link'
import PageHeader from '@/components/PageHeader'
import {pageMetadata} from '@/lib/seo'
import {getBusinessInfo, getLocationPages, getSeoSettings} from '@/sanity/content'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const [businessInfo, defaults] = await Promise.all([getBusinessInfo(), getSeoSettings()])
  return pageMetadata({
    pathname: '/locations',
    fallbackTitle: `Areas We Serve | ${businessInfo.name}`,
    fallbackDescription: `Browse published service area pages from ${businessInfo.name}.`,
    defaults,
    businessName: businessInfo.name,
  })
}

export default async function LocationsPage() {
  const locations = await getLocationPages()
  return (
    <>
      <PageHeader
        title="Areas We Serve"
        subtitle="Browse our published area pages."
        image="/contact/contact-banner-v2.png"
      />
      <section className="bg-ink py-14 md:py-20">
        <div className="container-x">
          {locations.length ? (
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {locations.map((location) => (
                <li key={location.slug} className="border-b border-ink-line pb-6">
                  <h2 className="font-display text-2xl text-paper">
                    <Link href={`/locations/${location.slug}`} className="transition-colors hover:text-gold">{location.areaName || location.title}</Link>
                  </h2>
                  {location.intro && <p className="mt-3 text-sm leading-7 text-paper-dim">{location.intro}</p>}
                  <Link href={`/locations/${location.slug}`} className="mt-4 inline-flex text-sm font-semibold text-gold transition-colors hover:text-gold-bright">View area details <span className="ml-2" aria-hidden="true">→</span></Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm leading-7 text-paper-dim">Area pages will appear here when published.</p>
          )}
        </div>
      </section>
    </>
  )
}
