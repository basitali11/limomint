import {defineField, defineType} from 'sanity'
import {seoStatus} from './seoStatus'

export const staticPage = defineType({
  name: 'staticPage',
  title: 'Website page',
  type: 'document',
  fields: [
    defineField({name: 'heading', title: 'Page heading', type: 'string', description: 'The main heading shown in the image banner at the top of this page.'}),
    defineField({name: 'intro', title: 'Introductory text', type: 'text', rows: 3, description: 'The short sentence shown below the page heading. Keep it clear and concise.'}),
    defineField({name: 'seo', title: 'Google and sharing settings', type: 'seo', description: 'Optional search title, summary, share image, and Google visibility setting for this page.'}),
  ],
  preview: {select: {title: 'heading', seoTitle: 'seo.title', seoDescription: 'seo.description', noIndex: 'seo.noIndex'}, prepare: ({title, seoTitle, seoDescription, noIndex}) => ({title: title || 'Website page', subtitle: seoStatus(seoTitle, seoDescription, noIndex)})},
})
