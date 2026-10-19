import { defineArrayMember, defineField, defineType } from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Home page service',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Service name', type: 'string', description: 'The name shown on a home page service card with its bullet points.', validation: (rule) => rule.required()}),
    defineField({name: 'icon', title: 'Service symbol', type: 'string', description: 'Choose the symbol that best matches this service on the website.', options: {list: ['calendar', 'briefcase', 'plane', 'map', 'shield', 'compass', 'heart', 'swap', 'van']}}),
    defineField({name: 'description', title: 'Short description', type: 'text', rows: 3, description: 'A brief explanation shown with this service. Aim for one or two sentences.'}),
    defineField({name: 'points', title: 'Key details', type: 'array', description: 'Short helpful details about this service, shown where service information is listed.', of: [defineArrayMember({type: 'string', title: 'Detail'})]}),
    defineField({name: 'sortOrder', title: 'Display order', type: 'number', description: 'Optional number used to place this service in a list; lower numbers appear first.'}),
  ],
  preview: {select: {title: 'title', subtitle: 'description'}, prepare: ({title, subtitle}) => ({title: title || 'Service', subtitle: subtitle || 'No description added'})},
})
