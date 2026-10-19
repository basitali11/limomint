import {defineField, defineType} from 'sanity'

export const seoSettings = defineType({
  name: 'seoSettings',
  title: 'Global SEO settings',
  type: 'document',
  fields: [
    defineField({name: 'titleSuffix', title: 'Text added after page titles', type: 'string', description: 'Optional wording added after page titles in Google and browser tabs, for example " | LimoMint".'}),
    defineField({name: 'defaultDescription', title: 'Default search description', type: 'text', rows: 3, description: 'Used only for pages that have no description at all.', validation: (rule) => rule.max(160).warning('Google may shorten descriptions longer than 160 characters.')}),
    defineField({name: 'defaultOgImage', title: 'Default share image', type: 'image', description: 'Used when a page has no custom share image. A clear landscape image around 1200 x 630 pixels works best.'}),
    defineField({name: 'googleSiteVerification', title: 'Google Search Console verification code', type: 'string', description: 'Paste only the verification code provided by Google Search Console. Leave empty until the site is ready to verify.', validation: (rule) => rule.custom((value) => !value || (!/[<\s]/.test(value)) || 'Enter only the verification code, without spaces or HTML angle brackets.')}),
    defineField({name: 'ga4MeasurementId', title: 'Google Analytics measurement ID', type: 'string', description: 'Optional Google Analytics 4 ID, usually beginning with G-. Tracking stays off while this is empty.', validation: (rule) => rule.custom((value) => !value || /^G-[A-Z0-9]+$/.test(value) || 'Enter a valid ID in the format G- followed by uppercase letters or numbers.')}),
  ],
  preview: {prepare: () => ({title: 'Global SEO settings', subtitle: 'Search defaults, verification, and analytics'})},
})
