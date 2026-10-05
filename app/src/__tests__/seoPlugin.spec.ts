/*
 * Testing concept (MYSL-1, plugin level):
 * `vite-plugin-seo.ts` wires the SEO data into the build. These tests call the plugin hooks
 * directly against the real `index.html` and `privacy/index.html`:
 * - the source HTML files keep lang, theme-color and icons and contain no hand-written
 *   title, description, og:* or twitter:* tags (AC7);
 * - `transformIndexHtml` returns the unchanged HTML plus tags; the tags are serialized and
 *   injected the way Vite does (attributes escaped, children raw, head / body-prepend) and the
 *   result is parsed, so the assertions run against the page a crawler sees (AC1–AC5, AC8);
 * - an unknown HTML path throws (AC11);
 * - `generateBundle` emits robots.txt and sitemap.xml (AC6), and the static robots.txt is gone.
 * A full `vite build` is not run in Vitest; `npm run build` covers it (AC12).
 */
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it, vi } from 'vitest'
import type { HtmlTagDescriptor, IndexHtmlTransformContext } from 'vite'
import { seoPlugin } from '../../vite-plugin-seo'
import { buildRobotsTxt, buildSitemapXml, escapeHtml, pages } from '@/data/seo'
import { PLAY_STORE_URL } from '@/data/content'

type TransformResult = { html: string; tags: HtmlTagDescriptor[] }
type Transform = (html: string, ctx: IndexHtmlTransformContext) => TransformResult
type EmitContext = { emitFile: ReturnType<typeof vi.fn> }
type GenerateBundle = (this: EmitContext) => void

const appDir = process.cwd()

const htmlFiles = [
  { page: 'home', ctxPath: '/index.html', file: resolve(appDir, 'index.html') },
  { page: 'privacy', ctxPath: '/privacy/index.html', file: resolve(appDir, 'privacy/index.html') },
] as const

function transform(html: string, ctxPath: string): TransformResult {
  const hook = seoPlugin().transformIndexHtml as unknown as Transform
  return hook(html, { path: ctxPath, filename: resolve(appDir, `.${ctxPath}`) })
}

function parse(html: string): Document {
  return new DOMParser().parseFromString(html, 'text/html')
}

function sourceDocument(file: string): Document {
  return parse(readFileSync(file, 'utf-8'))
}

const VOID_TAGS = new Set(['link', 'meta'])

/** Serializes a descriptor like Vite: attributes escaped, children inserted raw. */
function serializeTag(tag: HtmlTagDescriptor): string {
  const attrs = Object.entries(tag.attrs ?? {})
    .map(([name, value]) => ` ${name}="${escapeHtml(String(value))}"`)
    .join('')
  const children = typeof tag.children === 'string' ? tag.children : ''
  return VOID_TAGS.has(tag.tag) ? `<${tag.tag}${attrs}>` : `<${tag.tag}${attrs}>${children}</${tag.tag}>`
}

/**
 * Builds the HTML a crawler receives: head tags before </head>, body-prepend tags after
 * <body>, then parses it with scripting disabled (like a crawler without JavaScript).
 */
function renderPage(ctxPath: string, file: string): Document {
  const result = transform(readFileSync(file, 'utf-8'), ctxPath)
  const head = result.tags.filter((tag) => tag.injectTo === 'head').map(serializeTag).join('')
  const body = result.tags
    .filter((tag) => tag.injectTo === 'body-prepend')
    .map(serializeTag)
    .join('')
  return parse(result.html.replace('</head>', `${head}</head>`).replace('<body>', `<body>${body}`))
}

function content(doc: Document, selector: string): string | null | undefined {
  return doc.querySelector(selector)?.getAttribute('content')
}

describe('source HTML files', () => {
  describe.each(htmlFiles)('$file', ({ file }) => {
    const doc = sourceDocument(file)

    it('keeps lang="en"', () => {
      expect(doc.documentElement.getAttribute('lang')).toBe('en')
    })

    it('keeps the theme color', () => {
      expect(content(doc, 'meta[name="theme-color"]')).toBe('#0b0d17')
    })

    it('keeps the SVG favicon', () => {
      expect(doc.querySelector('link[rel="icon"]')?.getAttribute('type')).toBe('image/svg+xml')
    })

    it('keeps the apple-touch icon', () => {
      expect(doc.querySelector('link[rel="apple-touch-icon"]')?.getAttribute('href')).toBe(
        '/apple-touch-icon.png',
      )
    })

    it('has no hand-written title', () => {
      expect(doc.querySelectorAll('title')).toHaveLength(0)
    })

    it('has no hand-written description', () => {
      expect(doc.querySelectorAll('meta[name="description"]')).toHaveLength(0)
    })

    it('has no hand-written Open Graph or Twitter tags', () => {
      expect(doc.querySelectorAll('meta[property^="og:"], meta[name^="twitter:"]')).toHaveLength(0)
    })

    it('has no hand-written canonical link or JSON-LD', () => {
      expect(
        doc.querySelectorAll('link[rel="canonical"], script[type="application/ld+json"]'),
      ).toHaveLength(0)
    })
  })

  it('no longer ships a static robots.txt', () => {
    expect(existsSync(resolve(appDir, 'public/robots.txt'))).toBe(false)
  })
})

describe('seoPlugin', () => {
  it('is named mystandby-seo', () => {
    expect(seoPlugin().name).toBe('mystandby-seo')
  })

  it('registers transformIndexHtml as a plain function', () => {
    expect(seoPlugin().transformIndexHtml).toBeTypeOf('function')
  })

  it('returns the HTML unchanged', () => {
    const html = readFileSync(htmlFiles[0].file, 'utf-8')

    expect(transform(html, '/index.html').html).toBe(html)
  })

  it('throws for an unknown HTML path', () => {
    expect(() => transform('<html></html>', '/imprint/index.html')).toThrow()
  })

  describe.each(htmlFiles)('transformed $page page', ({ page, ctxPath, file }) => {
    const doc = renderPage(ctxPath, file)
    const seo = pages[page]
    const url = `https://www.mystandby.app${seo.path}`

    it('has exactly one title with the page title', () => {
      expect(Array.from(doc.querySelectorAll('title')).map((title) => title.textContent)).toEqual([
        seo.title,
      ])
    })

    it('has exactly one description with the page description', () => {
      expect(
        Array.from(doc.querySelectorAll('meta[name="description"]')).map((meta) =>
          meta.getAttribute('content'),
        ),
      ).toEqual([seo.description])
    })

    it('has exactly one canonical link with the absolute page URL', () => {
      expect(
        Array.from(doc.querySelectorAll('link[rel="canonical"]')).map((link) =>
          link.getAttribute('href'),
        ),
      ).toEqual([url])
    })

    it('sets og:url to the canonical URL', () => {
      expect(content(doc, 'meta[property="og:url"]')).toBe(
        doc.querySelector('link[rel="canonical"]')?.getAttribute('href'),
      )
    })

    it('sets an absolute og:image with its size', () => {
      expect([
        content(doc, 'meta[property="og:image"]'),
        content(doc, 'meta[property="og:image:width"]'),
        content(doc, 'meta[property="og:image:height"]'),
      ]).toEqual(['https://www.mystandby.app/og-image.jpg', '1024', '500'])
    })

    it('sets the remaining Open Graph and Twitter tags', () => {
      expect([
        content(doc, 'meta[property="og:type"]'),
        content(doc, 'meta[property="og:site_name"]'),
        content(doc, 'meta[property="og:locale"]'),
        content(doc, 'meta[property="og:title"]'),
        content(doc, 'meta[property="og:description"]'),
        content(doc, 'meta[name="twitter:card"]'),
      ]).toEqual([
        'website',
        'myStandby',
        'en_US',
        seo.title,
        seo.description,
        'summary_large_image',
      ])
    })

    it('sets a non-empty og:image:alt', () => {
      expect(content(doc, 'meta[property="og:image:alt"]')).toMatch(/\S/)
    })

    it('puts the noscript fallback first in the body', () => {
      expect(doc.body.firstElementChild?.tagName).toBe('NOSCRIPT')
    })

    it('keeps the noscript fallback free of headings', () => {
      expect(doc.querySelectorAll('noscript h1, noscript h2, noscript h3')).toHaveLength(0)
    })

    it('keeps the app mount point', () => {
      expect(doc.querySelector('#app')).not.toBeNull()
    })
  })

  it('adds one parseable JSON-LD script with WebSite and MobileApplication to home', () => {
    const doc = renderPage(htmlFiles[0].ctxPath, htmlFiles[0].file)
    const scripts = Array.from(doc.querySelectorAll('script[type="application/ld+json"]'))
    const types = scripts.map((script) =>
      JSON.parse(script.textContent ?? '')['@graph'].map((node: { '@type': string }) => node['@type']),
    )

    expect(types).toEqual([['WebSite', 'MobileApplication']])
  })

  it('adds no aggregateRating to the home JSON-LD', () => {
    const doc = renderPage(htmlFiles[0].ctxPath, htmlFiles[0].file)

    expect(doc.querySelector('script[type="application/ld+json"]')?.textContent).not.toContain(
      'aggregateRating',
    )
  })

  it('adds no JSON-LD to privacy', () => {
    const doc = renderPage(htmlFiles[1].ctxPath, htmlFiles[1].file)

    expect(doc.querySelectorAll('script[type="application/ld+json"]')).toHaveLength(0)
  })

  it('links the home noscript fallback to Google Play', () => {
    const doc = renderPage(htmlFiles[0].ctxPath, htmlFiles[0].file)

    expect(doc.querySelector('noscript a')?.getAttribute('href')).toBe(PLAY_STORE_URL)
  })

  it('links the privacy noscript fallback to the home page', () => {
    const doc = renderPage(htmlFiles[1].ctxPath, htmlFiles[1].file)

    expect(doc.querySelector('noscript a')?.getAttribute('href')).toBe('/')
  })

  describe('generateBundle', () => {
    function emittedFiles(): unknown[] {
      const emitFile = vi.fn()
      const hook = seoPlugin().generateBundle as unknown as GenerateBundle
      hook.call({ emitFile })
      return emitFile.mock.calls.map(([file]) => file)
    }

    it('emits robots.txt and sitemap.xml as assets', () => {
      expect(emittedFiles()).toEqual([
        { type: 'asset', fileName: 'robots.txt', source: buildRobotsTxt() },
        { type: 'asset', fileName: 'sitemap.xml', source: buildSitemapXml() },
      ])
    })
  })
})
