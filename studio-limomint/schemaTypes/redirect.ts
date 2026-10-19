import {defineField, defineType} from 'sanity'

export const redirect = defineType({
  name: 'redirect',
  title: 'URL redirect',
  type: 'document',
  fields: [
    defineField({name: 'from', title: 'Old page address', type: 'string', description: 'The old path visitors may use, beginning with a slash, for example /old-page.', validation: (rule) => rule.required().custom(async (value, context) => {
      if (!value) return true
      if (!/^\/(?!\/)/.test(value) || /[?#]/.test(value)) return 'Enter a site path beginning with /, without a query or fragment.'
      if (value === context.document?.to) return 'Choose a different destination; a page cannot redirect to itself.'
      const currentId = context.document?._id?.replace(/^drafts\./, '')
      const count = await context.getClient({apiVersion: '2026-10-14'}).fetch<number>(
        'count(*[_type == "redirect" && from == $from && !(_id in path("drafts.**")) && _id != $id])',
        {from: value, id: currentId},
      )
      return count === 0 || 'This old page address is already used by another redirect.'
    })}),
    defineField({name: 'to', title: 'New destination', type: 'string', description: 'The new site path (beginning with /) or a complete https:// address.', validation: (rule) => rule.required().custom((value, context) => {
      if (!value) return true
      if (!value.startsWith('/') && !/^https:\/\//.test(value)) return 'Enter a path beginning with / or a full https:// address.'
      return value !== context.document?.from || 'Choose a different destination; a page cannot redirect to itself.'
    })}),
    defineField({name: 'permanent', title: 'Tell search engines this move is permanent', type: 'boolean', description: 'Keep this on for a permanent move so browsers and search engines use the new address.', initialValue: true}),
  ],
  preview: {select: {title: 'from', subtitle: 'to'}, prepare: ({title, subtitle}) => ({title: title || 'Redirect', subtitle: subtitle ? `To: ${subtitle}` : 'Destination not set'})},
})
