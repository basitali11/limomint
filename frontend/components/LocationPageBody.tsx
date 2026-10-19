import {PortableText} from '@portabletext/react'
import type {PortableTextBlock} from '@portabletext/types'

type TextSpan = { _type?: string; text?: string; marks?: string[] }
type PortableBlock = {
  _type?: string
  _key?: string
  style?: string
  listItem?: string
  children?: TextSpan[]
  markDefs?: Array<{_key?: string; _type?: string; href?: string}>
}

function safeWebAddress(value?: string) {
  if (!value) return undefined
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.toString() : undefined
  } catch {
    return undefined
  }
}

function safePortableText(value: unknown[]): PortableTextBlock[] {
  const blocks = value.filter((item): item is PortableBlock => Boolean(item && typeof item === 'object' && (item as PortableBlock)._type === 'block'))

  return blocks.flatMap((block) => {
    const style = block.style || 'normal'
    if (!['normal', 'h2', 'h3'].includes(style) || (block.listItem && block.listItem !== 'bullet')) return []

    const definitions = (block.markDefs || []).flatMap((definition) => {
      const href = definition._type === 'link' ? safeWebAddress(definition.href) : undefined
      return definition._key && href ? [{...definition, href}] : []
    })
    const allowedMarks = new Set(definitions.map((definition) => definition._key))
    const children = (block.children || [])
      .filter((child) => child._type === 'span' && typeof child.text === 'string')
      .map((child) => ({...child, marks: (child.marks || []).filter((mark) => allowedMarks.has(mark))}))

    return [{...block, style, markDefs: definitions, children} as unknown as PortableTextBlock]
  })
}

export default function LocationPageBody({value}: {value: unknown[]}) {
  const components = {
    block: {
      normal: ({children}: {children?: React.ReactNode}) => <p className="text-sm leading-7 text-paper-dim">{children}</p>,
      h2: ({children}: {children?: React.ReactNode}) => <h2 className="font-display text-2xl text-paper md:text-3xl">{children}</h2>,
      h3: ({children}: {children?: React.ReactNode}) => <h3 className="font-display text-xl text-paper">{children}</h3>,
    },
    list: {bullet: ({children}: {children?: React.ReactNode}) => <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-paper-dim">{children}</ul>},
    listItem: {bullet: ({children}: {children?: React.ReactNode}) => <li>{children}</li>},
    marks: {
      link: ({children, value: linkValue}: {children?: React.ReactNode; value?: {href?: string}}) => {
        const href = safeWebAddress(linkValue?.href)
        return href ? <a href={href} rel="noopener noreferrer" className="text-gold underline underline-offset-4 hover:text-gold-bright">{children}</a> : <>{children}</>
      },
    },
  }

  return <PortableText value={safePortableText(value)} components={components} />
}
