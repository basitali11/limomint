import {defineField, defineType} from 'sanity'

export const servicePageCard = defineType({
  name: 'servicePageCard',
  title: 'Services page card',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Service title',
      type: 'string',
      description: 'The short title shown on one of the Services page cards.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short description',
      type: 'text',
      rows: 3,
      description: 'The one-line explanation shown under the title on the Services page.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Card icon',
      type: 'string',
      description: 'Choose the small symbol displayed beside this service on the Services page.',
      options: {list: [
        {title: 'Calendar', value: 'calendar'},
        {title: 'Briefcase', value: 'briefcase'},
        {title: 'Plane', value: 'plane'},
        {title: 'Map', value: 'map'},
        {title: 'Heart', value: 'heart'},
        {title: 'Swap', value: 'swap'},
        {title: 'Van', value: 'van'},
        {title: 'Compass', value: 'compass'},
        {title: 'Shield', value: 'shield'},
      ]},
    }),
    defineField({
      name: 'sortOrder',
      title: 'Display order',
      type: 'number',
      description: 'A smaller number places this card earlier in the Services page list.',
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'description', icon: 'icon'},
    prepare: ({title, subtitle, icon}) => ({
      title: title || 'Untitled service card',
      subtitle: [icon, subtitle].filter(Boolean).join(' · ') || 'No description added',
    }),
  },
})
