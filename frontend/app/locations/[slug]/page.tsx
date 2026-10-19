import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import LocationPageBody from '@/components/LocationPageBody'
import PageHeader from '@/components/PageHeader'
import {faqJsonLd} from '@/lib/jsonLd'
import {pageMetadata} from '@/lib/seo'
import {getBusinessInfo, getLocationPage, getLocationPages, getSeoSettings} from '@/sanity/content'

export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams() {
  const pages = await getLocationPages()
  return pages.map(({slug}) => ({slug}))
}

export async function generateMetadata({params}: {params: {slug: string}}): Promise<Metadata> {
  const [page, businessInfo, defaults] = await Promise.all([
    getLocationPage(params.slug), getBusinessInfo(), getSeoSettings(),
  ])
  if (!page) return {title: 'Page not found | LimoMint', robots: {index: false, follow: false}}

  return pageMetadata({
    pathname: `/locations/${page.slug}`,
    fallbackTitle: `${page.title} | ${businessInfo.name}`,
    fallbackDescription: page.intro || defaults.defaultDescription,
    seo: page.seo,
    defaults,
    businessName: businessInfo.name,
  })
}

export default async function LocationPage({params}: {params: {slug: string}}) {
  const page = await getLocationPage(params.slug)
  if (!page) notFound()

  const faqs = (page.faqs || []).filter((faq) => faq.question?.trim() && faq.answer?.trim())
  const breadcrumbs = [
    {name: 'Home', path: '/'},
    {name: 'Locations', path: '/locations'},
    {name: page.areaName || page.title, path: `/locations/${page.slug}`},
  ]

  return (
    <>
      {faqs.length > 0 && <JsonLd data={faqJsonLd(faqs.map(({question, answer}) => ({q: question, a: answer})))} />}
      <PageHeader
        title={page.title}
        subtitle={page.intro}
        image="/contact/contact-banner-v2.png"
        breadcrumbs={breadcrumbs}
      />
      <nav aria-label="Breadcrumb" className="container-x py-5 text-sm text-paper-dim">
        <ol className="flex flex-wrap items-center gap-2">
          {breadcrumbs.map((item, index) => (
            <li key={item.path} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true">/</span>}
              {index === breadcrumbs.length - 1
                ? <span aria-current="page" className="text-paper">{item.name}</span>
                : <Link href={item.path} className="transition-colors hover:text-gold">{item.name}</Link>}
            </li>
          ))}
        </ol>
      </nav>
      <section className="bg-ink py-8 md:py-12">
        <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(240px,1fr)]">
          <article className="min-w-0 space-y-6">
            {page.body?.length ? <LocationPageBody value={page.body} /> : null}
            {page.highlights?.length ? (
              <section aria-labelledby="location-highlights-heading" className="border-t border-ink-line pt-7">
                <h2 id="location-highlights-heading" className="font-display text-2xl text-paper">Useful trip details</h2>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-paper-dim">
                  {page.highlights.map((highlight, index) => <li key={`${index}-${highlight}`}>{highlight}</li>)}
                </ul>
              </section>
            ) : null}
            {faqs.length > 0 && (
              <section aria-labelledby="location-faq-heading" className="border-t border-ink-line pt-7">
                <h2 id="location-faq-heading" className="font-display text-2xl text-paper">Questions about {page.areaName || page.title}</h2>
                <div className="mt-4 divide-y divide-ink-line">
                  {faqs.map((faq, index) => (
                    <details key={`${index}-${faq.question}`} className="py-4">
                      <summary className="cursor-pointer text-sm font-semibold text-paper">{faq.question}</summary>
                      <p className="mt-3 text-sm leading-7 text-paper-dim">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}
          </article>
          {page.relatedServices?.length ? (
            <aside aria-labelledby="location-services-heading" className="h-fit border-t border-gold pt-5">
              <h2 id="location-services-heading" className="font-display text-xl text-paper">Related services</h2>
              <ul className="mt-4 space-y-4">
                {page.relatedServices.map((service) => <li key={service.title} className="text-sm text-paper-dim">{service.title}{service.description && <p className="mt-1 leading-6">{service.description}</p>}</li>)}
              </ul>
            </aside>
          ) : null}
        </div>
      </section>
    </>
  )
}
