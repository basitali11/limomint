import type {MetadataRoute} from 'next'
import {isVercelPreview} from '@/lib/seo'
import {siteUrl} from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  if (isVercelPreview()) {
    return {rules: {userAgent: '*', disallow: '/'}}
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: siteUrl('/sitemap.xml'),
  };
}
