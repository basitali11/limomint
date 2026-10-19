import { defineArrayMember, defineField, defineType } from 'sanity'

export const vehicle = defineType({
  name: 'vehicle',
  title: 'Vehicle',
  type: 'document',
  orderings: [{ title: 'Name', name: 'nameAsc', by: [{ field: 'name', direction: 'asc' }] }],
  fields: [
    defineField({name: 'name', title: 'Vehicle name', type: 'string', description: 'The vehicle name shown on the fleet page.', validation: (rule) => rule.required()}),
    defineField({name: 'tagline', title: 'Short vehicle description', type: 'string', description: 'A short line describing this vehicle, shown below its name.'}),
    defineField({name: 'pricePerHour', title: 'Hourly rate', type: 'number', description: 'The hourly rate shown on the fleet page. Enter a confirmed amount of at least 1.', validation: (rule) => rule.required().min(1)}),
    defineField({name: 'seats', title: 'Passenger capacity', type: 'string', description: 'The confirmed number of passengers this vehicle can carry.'}),
    defineField({name: 'bags', title: 'Luggage capacity', type: 'string', description: 'The confirmed luggage capacity shown with this vehicle.'}),
    defineField({name: 'transmission', title: 'Included service', type: 'string', description: 'A short note about the service included with this vehicle.'}),
    defineField({name: 'icon', title: 'Vehicle symbol', type: 'string', description: 'Choose the symbol that best represents this vehicle on the website.', options: {list: ['sedan', 'suv', 'luxury']}}),
    defineField({name: 'features', title: 'Vehicle features', type: 'array', description: 'Confirmed features shown in the vehicle details.', of: [defineArrayMember({type: 'string', title: 'Feature'})]}),
    defineField({name: 'images', title: 'Vehicle photographs', type: 'array', description: 'Photos shown in the fleet gallery. Add a useful image description to each photo.', of: [defineArrayMember({type: 'image', options: {hotspot: true}, fields: [defineField({name: 'alt', title: 'Image description', type: 'string', description: 'Describe this vehicle photo for visitors who cannot see it.'})]})]}),
    defineField({name: 'sortOrder', title: 'Display order', type: 'number', description: 'Optional number used to order vehicles on the website; lower numbers appear first.'}),
  ],
  preview: {select: {title: 'name', subtitle: 'tagline', rate: 'pricePerHour'}, prepare: ({title, subtitle, rate}) => ({title: title || 'Vehicle', subtitle: [subtitle, rate ? `$${rate} per hour` : undefined].filter(Boolean).join(' · ') || 'Vehicle details'})},
})
