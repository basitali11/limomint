const defaultSiteUrl = 'https://limomint.vercel.app'

export function siteUrl(path = '') {
  const base = (process.env.NEXT_PUBLIC_SITE_URL?.trim() || defaultSiteUrl).replace(/\/+$/, '')
  const normalizedPath = path ? `/${path.replace(/^\/+/, '')}` : ''
  return `${base}${normalizedPath}`
}
