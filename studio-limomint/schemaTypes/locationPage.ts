import {defineArrayMember, defineField, defineType} from 'sanity'
import {seoStatus} from './seoStatus'

export const locationPage = defineType({
  name: 'locationPage',
  title: 'Location page',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Page heading', type: 'string', description: 'The main heading visitors see on this area page. Write a useful, specific heading for people.', validation: (rule) => rule.required()}),
    defineField({name: 'slug', title: 'Page address ending', type: 'slug', description: 'The final part of this page address. Generate it from the page heading, then use lowercase words joined by hyphens.', options: {source: 'title', maxLength: 96}, validation: (rule) => rule.required().custom(async (value, context) => {
      const slug = value?.current
      if (!slug) return true
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return 'Use lowercase letters and numbers separated by single hyphens.'
      const currentId = context.document?._id?.replace(/^drafts\./, '')
      const client = context.getClient({apiVersion: '2026-10-14'})
      const duplicates = await client.fetch<number>('count(*[_type == "locationPage" && slug.current == $slug && _id != $id])', {slug, id: currentId})
      return duplicates === 0 || 'This page address is already in use.'
    })}),
    defineField({name: 'areaName', title: 'Area name', type: 'string', description: 'The neighbourhood, airport, or city covered by this page.'}),
    defineField({name: 'intro', title: 'Short introduction', type: 'text', rows: 3, description: 'A concise introduction explaining the service for this area. Aim for two or three useful sentences.'}),
    defineField({name: 'body', title: 'Area page content', type: 'array', description: 'Write original, helpful information about serving this area. Use headings and links where they help readers.', of: [defineArrayMember({type: 'block', styles: [{title: 'Paragraph', value: 'normal'}, {title: 'Heading 2', value: 'h2'}, {title: 'Heading 3', value: 'h3'}], lists: [{title: 'Bullet list', value: 'bullet'}], marks: {decorators: [], annotations: [defineArrayMember({name: 'link', title: 'Web link', type: 'object', fields: [defineField({name: 'href', title: 'Web address', type: 'url', description: 'The complete web address visitors open when they follow this link.', validation: (rule) => rule.uri({scheme: ['http', 'https']})})]})]}})]}),
    defineField({name: 'highlights', title: 'Useful trip details', type: 'array', description: 'Add genuine pickup points, routes, or area details that help visitors plan a ride. Leave empty if you have none.', of: [defineArrayMember({type: 'string', title: 'Trip detail'})]}),
    defineField({name: 'faqs', title: 'Questions about this area', type: 'array', description: 'Add questions and answers that are specific to this area. Do not copy the same set across multiple pages.', of: [defineArrayMember({type: 'object', title: 'Question and answer', fields: [
      defineField({name: 'question', title: 'Question', type: 'string', description: 'A question visitors may genuinely have about rides in this area.', validation: (rule) => rule.required()}),
      defineField({name: 'answer', title: 'Answer', type: 'text', rows: 3, description: 'A clear, accurate answer to this question.', validation: (rule) => rule.required()}),
    ]})]}),
    defineField({name: 'relatedServices', title: 'Related services', type: 'array', description: 'Select services that are actually available for this area.', of: [defineArrayMember({type: 'reference', to: [{type: 'service'}]})]}),
    defineField({name: 'seo', title: 'Google and sharing settings', type: 'seo', description: 'Optional search title, summary, share image, and Google visibility setting for this page.'}),
  ],
  validation: (rule) => rule.custom((document) => {
    const body = (document as {body?: Array<{children?: Array<{text?: string}>}>} | undefined)?.body
    const length = body?.flatMap((block) => block.children || []).map((child) => child.text || '').join(' ').trim().length || 0
    return length > 0 && length < 250 ? {message: 'This page has very little main text. Add useful, original details for visitors before publishing.', level: 'warning'} : true
  }),
  preview: {select: {title: 'title', area: 'areaName', seoTitle: 'seo.title', seoDescription: 'seo.description', noIndex: 'seo.noIndex'}, prepare: ({title, area, seoTitle, seoDescription, noIndex}) => ({title: title || area || 'Location page', subtitle: seoStatus(seoTitle, seoDescription, noIndex)})},
})
