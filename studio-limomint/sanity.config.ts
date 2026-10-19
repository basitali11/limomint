import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import type {StructureResolver} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'

const singletonIds = [
  'homePage',
  'siteSettings',
  'seoSettings',
  'aboutPage',
  'servicesPage',
  'fleetPage',
  'faqPage',
  'contactPage',
  'reservationsPage',
]
const singletonTypes = ['homePage', 'siteSettings', 'seoSettings', 'staticPage']

const singletonItem = (S: Parameters<StructureResolver>[0], type: string, id: string, title: string) =>
  S.listItem().title(title).id(id).child(S.document().schemaType(type).documentId(id).title(title))

const structure: StructureResolver = (S) => S.list().title('LimoMint website').items([
  S.listItem().title('Pages').id('pages').child(S.list().title('Pages').items([
    singletonItem(S, 'homePage', 'homePage', 'Home page'),
    singletonItem(S, 'staticPage', 'aboutPage', 'About page'),
    singletonItem(S, 'staticPage', 'servicesPage', 'Services page'),
    S.documentTypeListItem('servicePageCard').title('Services page cards'),
    singletonItem(S, 'staticPage', 'fleetPage', 'Vehicles page'),
    singletonItem(S, 'staticPage', 'faqPage', 'FAQs page'),
    singletonItem(S, 'staticPage', 'contactPage', 'Contact page'),
    singletonItem(S, 'staticPage', 'reservationsPage', 'Reservations page'),
  ])),
  S.listItem().title('Business info').id('business-info').child(S.list().title('Business info').items([
    singletonItem(S, 'siteSettings', 'siteSettings', 'Site settings'),
  ])),
  S.listItem().title('Content').id('content').child(S.list().title('Content').items([
    S.documentTypeListItem('vehicle').title('Vehicles'),
    S.listItem().title('Home page services').id('home-page-services').child(
      S.documentTypeList('service').title('Home page services'),
    ),
    S.documentTypeListItem('faq').title('FAQs'),
    S.documentTypeListItem('testimonial').title('Testimonials'),
  ])),
  S.listItem().title('Location pages').id('location-pages').child(S.documentTypeList('locationPage').title('Location pages')),
  S.listItem().title('SEO').id('seo').child(S.list().title('SEO').items([
    singletonItem(S, 'seoSettings', 'seoSettings', 'Global SEO settings'),
    S.documentTypeListItem('redirect').title('Redirects'),
  ])),
])

export default defineConfig({
  name: 'default',
  title: 'LimoMint',
  projectId: 'm0tz35ij',
  dataset: 'production',
  plugins: [
    structureTool({structure}),
    visionTool(),
  ],
  schema: {types: schemaTypes},
  document: {
    actions: (previous, context) => {
      const documentId = context.documentId?.replace(/^drafts\./, '')
      if (!documentId || !singletonIds.includes(documentId)) return previous
      return previous.filter((action) => !['delete', 'unpublish', 'duplicate'].includes(action.action || ''))
    },
    newDocumentOptions: (previous) => previous.filter((option) => !singletonTypes.includes(option.templateId || '')),
  },
})
