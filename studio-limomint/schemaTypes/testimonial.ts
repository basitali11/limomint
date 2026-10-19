import { defineField, defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Client testimonial',
  type: 'document',
  fields: [
    defineField({name: 'quote', title: 'Client comment', type: 'text', rows: 4, description: 'The client comment shown on the website. Publish only a real comment with permission.', validation: (rule) => rule.required()}),
    defineField({name: 'name', title: 'Client display name', type: 'string', description: 'The name shown with the client comment. Use only the name or initials the client agreed to share.', validation: (rule) => rule.required()}),
    defineField({name: 'source', title: 'Where the comment came from', type: 'string', description: 'Optional source label, such as Google or Direct. Use only when the source is known.'}),
    defineField({name: 'sortOrder', title: 'Display order', type: 'number', description: 'Optional number used to order comments on the website; lower numbers appear first.'}),
  ],
  preview: {select: {title: 'name', subtitle: 'quote'}, prepare: ({title, subtitle}) => ({title: title || 'Client comment', subtitle: subtitle || 'No comment added'})},
})
