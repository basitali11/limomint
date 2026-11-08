import { createClient } from 'next-sanity'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'm0tz35ij',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-10-14',
  // Avoid a second stale cache layer in front of Next.js ISR. The Next data
  // cache below still limits published-content requests to one per 60 seconds.
  useCdn: false,
})
