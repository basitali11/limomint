import {defineField, defineType} from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'Search and sharing settings',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Google title', type: 'string', description: 'Aim for 40 to 50 characters. The business name is added after it automatically.', validation: (rule) => rule.max(50).warning('Google may shorten titles longer than 50 characters.')}),
    defineField({name: 'description', title: 'Google description', type: 'text', rows: 3, description: 'The short summary shown under the title in search results. Aim for 120 to 160 characters.', validation: (rule) => rule.max(160).warning('Google may shorten descriptions longer than 160 characters.')}),
    defineField({name: 'ogImage', title: 'Share image', type: 'image', description: 'Image shown when this page is shared on social media or messaging apps. Use a clear image around 1200 x 630 pixels.'}),
    defineField({name: 'noIndex', title: 'Hide this page from Google', type: 'boolean', description: 'Turn this on to ask search engines not to show this page in search results.', initialValue: false}),
  ],
})
