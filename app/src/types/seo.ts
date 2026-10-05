export type PageId = 'home' | 'privacy'

export interface PageSeo {
  id: PageId
  path: string
  title: string
  description: string
}

/** Structurally compatible with Vite's HtmlTagDescriptor (no vite import in src). */
export interface HeadTag {
  tag: string
  attrs?: Record<string, string>
  /** Raw HTML — must already be escaped. */
  children?: string
  injectTo?: 'head' | 'body-prepend'
}
