export function seoStatus(title?: string, description?: string, noIndex?: boolean) {
  let status = 'SEO: complete'
  if (!title) status = 'SEO: missing title'
  else if (!description) status = 'SEO: missing description'
  else status = `SEO: title ${title.length}/50${title.length > 50 ? ' (long)' : ''}, description ${description.length}/160${description.length > 160 ? ' (long)' : ''}`
  return noIndex ? `HIDDEN FROM GOOGLE · ${status}` : status
}
