import {defineField, defineType} from 'sanity'
import {seoStatus} from './seoStatus'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Small label above the headline', type: 'string', description: 'A brief label shown above the main homepage headline.'}),
    defineField({name: 'headline', title: 'Main headline', type: 'string', description: 'The main homepage message shown over the banner image.', validation: (rule) => rule.required()}),
    defineField({name: 'headlineAccent', title: 'Second line of the headline', type: 'string', description: 'Optional second line shown in the highlighted headline style.'}),
    defineField({name: 'description', title: 'Supporting text', type: 'text', rows: 3, description: 'The short introduction beneath the homepage headline. Aim for one or two clear sentences.', validation: (rule) => rule.required()}),
    defineField({name: 'heroImage', title: 'Homepage banner image', type: 'image', description: 'The wide background image behind the homepage headline. Choose a high-quality landscape image.', options: {hotspot: true}, fields: [defineField({name: 'alt', title: 'Image description', type: 'string', description: 'Describe the meaningful subject of this image for visitors who cannot see it.'})]}),
    defineField({name: 'primaryCtaLabel', title: 'Main button label', type: 'string', description: 'The words shown on the main booking button. Keep the label short.'}),
    defineField({name: 'seo', title: 'Google and sharing settings', type: 'seo', description: 'Optional search title, summary, share image, and Google visibility setting for the homepage.'}),
  ],
  preview: {select: {title: 'headline', seoTitle: 'seo.title', seoDescription: 'seo.description', noIndex: 'seo.noIndex'}, prepare: ({title, seoTitle, seoDescription, noIndex}) => ({title: title || 'Home page', subtitle: seoStatus(seoTitle, seoDescription, noIndex)})},
})
