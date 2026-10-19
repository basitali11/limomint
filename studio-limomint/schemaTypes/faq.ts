import { defineField, defineType } from 'sanity'

export const faq = defineType({
  name: 'faq',
  title: 'Frequently asked question',
  type: 'document',
  fields: [
    defineField({name: 'question', title: 'Question', type: 'string', description: 'The question shown in the FAQ list. Keep it clear and focused on one topic.', validation: (rule) => rule.required()}),
    defineField({name: 'answer', title: 'Answer', type: 'text', rows: 4, description: 'A helpful, accurate answer displayed when a visitor opens this question.', validation: (rule) => rule.required()}),
    defineField({name: 'sortOrder', title: 'Display order', type: 'number', description: 'Optional number used to order questions on the website; lower numbers appear first.'}),
  ],
  preview: {select: {title: 'question', subtitle: 'answer'}, prepare: ({title, subtitle}) => ({title: title || 'FAQ', subtitle: subtitle || 'No answer added'})},
})
