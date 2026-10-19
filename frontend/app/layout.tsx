import type {Metadata} from 'next'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'
import {businessJsonLd} from '@/lib/jsonLd'
import {googleVerificationContent, isVercelPreview, shareImageUrl, validGa4MeasurementId} from '@/lib/seo'
import {siteUrl} from '@/lib/site'
import {getBusinessInfo, getLocationPages, getSeoSettings} from '@/sanity/content'

export async function generateMetadata(): Promise<Metadata> {
  const [businessInfo, seoSettings] = await Promise.all([getBusinessInfo(), getSeoSettings()])
  const verification = googleVerificationContent(seoSettings.googleSiteVerification)
  const defaultImage = shareImageUrl(seoSettings.defaultOgImage || '/og.jpg')
  const siteTitle = `${businessInfo.name} | Private Chauffeur Service in Toronto`

  return {
    metadataBase: new URL(siteUrl()),
    title: siteTitle,
    description: seoSettings.defaultDescription,
    alternates: {canonical: siteUrl('/')},
    openGraph: {
      title: siteTitle,
      description: seoSettings.defaultDescription,
      url: siteUrl('/'),
      siteName: businessInfo.name,
      locale: 'en_CA',
      type: 'website',
      images: [{url: defaultImage, width: 1200, height: 630}],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteTitle,
      description: seoSettings.defaultDescription,
      images: [defaultImage],
    },
    ...(verification ? {verification: {google: verification}} : {}),
    ...(isVercelPreview() ? {robots: {index: false, follow: false}} : {}),
  }
}

export default async function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  const [businessInfo, seoSettings, locationPages] = await Promise.all([getBusinessInfo(), getSeoSettings(), getLocationPages()])
  const ga4Id = validGa4MeasurementId(seoSettings.ga4MeasurementId)

  return (
    <html lang="en-CA">
      <body className="bg-ink text-paper font-body antialiased">
        <JsonLd data={businessJsonLd(businessInfo, shareImageUrl(seoSettings.defaultOgImage || '/og.jpg'))} />
        <Header businessInfo={businessInfo} />
        <main>{children}</main>
        <Footer businessInfo={businessInfo} locationPages={locationPages} />
        {ga4Id && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive" dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || []; function gtag(){window.dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${ga4Id}');`,
            }} />
          </>
        )}
      </body>
    </html>
  )
}
