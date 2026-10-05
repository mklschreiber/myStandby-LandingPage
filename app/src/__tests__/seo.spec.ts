/*
 * Testing concept (MYSL-1, data level):
 * `src/data/seo.ts` is the single source of truth for all SEO output, so its pure builders
 * are unit-tested here: copy lengths (AC1, AC2), canonical / Open Graph URLs (AC3, AC4),
 * JSON-LD structure and escaping (AC5, AC11), robots.txt and sitemap.xml (AC6), the noscript
 * fallback (AC8) and the HTML-path mapping (AC11). The plugin wiring against the real HTML
 * files is covered in `seoPlugin.spec.ts`.
 */
import { describe, expect, it } from 'vitest'
import {
  absoluteUrl,
  buildHeadTags,
  buildRobotsTxt,
  buildSitemapXml,
  buildStructuredData,
  escapeHtml,
  OG_IMAGE,
  pageIdForHtmlPath,
  pages,
  SCREENSHOT_IDS,
  serializeJsonLd,
} from '@/data/seo'
import { PLAY_STORE_URL, screenshots } from '@/data/content'
import { DEVELOPER_NAME, DEVELOPER_URL, SITE_URL } from '@/data/site'
import type { HeadTag, PageId } from '@/types/seo'

const pageIds: PageId[] = ['home', 'privacy']

function metaContent(tags: HeadTag[], key: string): string | undefined {
  return tags.find((tag) => tag.attrs?.name === key || tag.attrs?.property === key)?.attrs
    ?.content
}

function tagsNamed(tags: HeadTag[], name: string): HeadTag[] {
  return tags.filter((tag) => tag.tag === name)
}

function graphNode(type: string): Record<string, unknown> | undefined {
  const graph = buildStructuredData()['@graph'] as Record<string, unknown>[]
  return graph.find((node) => node['@type'] === type)
}

function domFromNoscript(page: PageId): HTMLElement {
  const container = document.createElement('div')
  container.innerHTML = tagsNamed(buildHeadTags(page), 'noscript')[0]?.children ?? ''
  return container
}

describe('site constants', () => {
  it('uses the live www host without a trailing slash as site URL', () => {
    expect(SITE_URL).toBe('https://www.mystandby.app')
  })
})

describe('pages', () => {
  it.each(pageIds)('%s title contains the app name', (page) => {
    expect(pages[page].title).toContain('myStandby')
  })

  it.each(pageIds)('%s title is at most 60 characters', (page) => {
    expect(pages[page].title.length).toBeLessThanOrEqual(60)
  })

  it('home title is at least 30 characters', () => {
    expect(pages.home.title.length).toBeGreaterThanOrEqual(30)
  })

  it.each(pageIds)('%s description is at least 70 characters', (page) => {
    expect(pages[page].description.length).toBeGreaterThanOrEqual(70)
  })

  it.each(pageIds)('%s description is at most 160 characters', (page) => {
    expect(pages[page].description.length).toBeLessThanOrEqual(160)
  })

  it('uses trailing-slash paths', () => {
    expect([pages.home.path, pages.privacy.path]).toEqual(['/', '/privacy/'])
  })

  it('lists the same screenshots as the gallery content', () => {
    expect([...SCREENSHOT_IDS]).toEqual(screenshots.map((shot) => shot.id))
  })
})

describe('absoluteUrl', () => {
  it('prefixes the path with the site URL', () => {
    expect(absoluteUrl('/privacy/')).toBe('https://www.mystandby.app/privacy/')
  })
})

describe('escapeHtml', () => {
  it('escapes all HTML special characters', () => {
    expect(escapeHtml(`<a href="x">Tom & Jerry's</a>`)).toBe(
      '&lt;a href=&quot;x&quot;&gt;Tom &amp; Jerry&#39;s&lt;/a&gt;',
    )
  })

  it('leaves plain text unchanged', () => {
    expect(escapeHtml('myStandby – Android')).toBe('myStandby – Android')
  })
})

describe('serializeJsonLd', () => {
  it('replaces every "<" so a "</script>" cannot close the script element', () => {
    expect(serializeJsonLd({ text: '</script><b>' })).not.toContain('<')
  })

  it('still parses back to the original data', () => {
    expect(JSON.parse(serializeJsonLd({ text: '</script><b>' }))).toEqual({
      text: '</script><b>',
    })
  })
})

describe('buildStructuredData', () => {
  it('uses the schema.org context', () => {
    expect(buildStructuredData()['@context']).toBe('https://schema.org')
  })

  it('describes the website', () => {
    expect(graphNode('WebSite')).toEqual({
      '@type': 'WebSite',
      name: 'myStandby',
      url: 'https://www.mystandby.app/',
    })
  })

  it('describes the mobile application', () => {
    expect(graphNode('MobileApplication')).toMatchObject({
      name: 'myStandby',
      description: pages.home.description,
      operatingSystem: 'Android 10+',
      applicationCategory: 'UtilitiesApplication',
      url: 'https://www.mystandby.app/',
      installUrl: PLAY_STORE_URL,
      image: 'https://www.mystandby.app/og-image.jpg',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
      author: { '@type': 'Person', name: DEVELOPER_NAME, url: DEVELOPER_URL },
    })
  })

  it('lists absolute URLs of the five 960 px screenshots', () => {
    expect(graphNode('MobileApplication')?.screenshot).toEqual([
      'https://www.mystandby.app/screenshots/standby-960.webp',
      'https://www.mystandby.app/screenshots/home-960.webp',
      'https://www.mystandby.app/screenshots/widget-apps-960.webp',
      'https://www.mystandby.app/screenshots/widget-previews-960.webp',
      'https://www.mystandby.app/screenshots/settings-960.webp',
    ])
  })

  it('does not invent a rating', () => {
    expect(JSON.stringify(buildStructuredData())).not.toContain('aggregateRating')
  })

  it('has no FAQPage node', () => {
    expect(graphNode('FAQPage')).toBeUndefined()
  })
})

describe('buildHeadTags', () => {
  it.each(pageIds)('%s has exactly one title', (page) => {
    expect(tagsNamed(buildHeadTags(page), 'title')).toHaveLength(1)
  })

  it.each(pageIds)('%s title text is the escaped page title', (page) => {
    expect(tagsNamed(buildHeadTags(page), 'title')[0]?.children).toBe(
      escapeHtml(pages[page].title),
    )
  })

  it.each(pageIds)('%s has exactly one description', (page) => {
    expect(
      buildHeadTags(page).filter((tag) => tag.attrs?.name === 'description'),
    ).toHaveLength(1)
  })

  it.each(pageIds)('%s description equals the page description', (page) => {
    expect(metaContent(buildHeadTags(page), 'description')).toBe(pages[page].description)
  })

  it.each([
    ['home', 'https://www.mystandby.app/'],
    ['privacy', 'https://www.mystandby.app/privacy/'],
  ] as const)('%s canonical URL is %s', (page, url) => {
    expect(
      buildHeadTags(page).find((tag) => tag.attrs?.rel === 'canonical')?.attrs?.href,
    ).toBe(url)
  })

  it.each(pageIds)('%s og:url equals the canonical URL', (page) => {
    const tags = buildHeadTags(page)
    const canonical = tags.find((tag) => tag.attrs?.rel === 'canonical')?.attrs?.href

    expect(metaContent(tags, 'og:url')).toBe(canonical)
  })

  it.each(pageIds)('%s has the Open Graph and Twitter card tags', (page) => {
    const tags = buildHeadTags(page)

    expect({
      type: metaContent(tags, 'og:type'),
      siteName: metaContent(tags, 'og:site_name'),
      locale: metaContent(tags, 'og:locale'),
      title: metaContent(tags, 'og:title'),
      description: metaContent(tags, 'og:description'),
      image: metaContent(tags, 'og:image'),
      imageWidth: metaContent(tags, 'og:image:width'),
      imageHeight: metaContent(tags, 'og:image:height'),
      imageAlt: metaContent(tags, 'og:image:alt'),
      twitterCard: metaContent(tags, 'twitter:card'),
    }).toEqual({
      type: 'website',
      siteName: 'myStandby',
      locale: 'en_US',
      title: pages[page].title,
      description: pages[page].description,
      image: 'https://www.mystandby.app/og-image.jpg',
      imageWidth: '1024',
      imageHeight: '500',
      imageAlt: OG_IMAGE.alt,
      twitterCard: 'summary_large_image',
    })
  })

  it.each(pageIds)('%s uses only absolute https URLs in URL tags', (page) => {
    const tags = buildHeadTags(page)
    const urls = [
      tags.find((tag) => tag.attrs?.rel === 'canonical')?.attrs?.href,
      metaContent(tags, 'og:url'),
      metaContent(tags, 'og:image'),
    ]

    expect(urls.every((url) => url?.startsWith('https://www.mystandby.app/'))).toBe(true)
  })

  it('home has one JSON-LD script that parses to the structured data', () => {
    const scripts = buildHeadTags('home').filter(
      (tag) => tag.attrs?.type === 'application/ld+json',
    )

    expect(scripts.map((tag) => JSON.parse(tag.children ?? ''))).toEqual([
      buildStructuredData(),
    ])
  })

  it('privacy has no JSON-LD script', () => {
    expect(
      buildHeadTags('privacy').filter((tag) => tag.attrs?.type === 'application/ld+json'),
    ).toHaveLength(0)
  })

  it.each(pageIds)('%s injects the noscript fallback at the start of the body', (page) => {
    expect(tagsNamed(buildHeadTags(page), 'noscript').map((tag) => tag.injectTo)).toEqual([
      'body-prepend',
    ])
  })

  it.each(pageIds)('%s noscript contains the page description', (page) => {
    expect(domFromNoscript(page).textContent).toContain(pages[page].description)
  })

  it.each(pageIds)('%s noscript contains no heading', (page) => {
    expect(domFromNoscript(page).querySelectorAll('h1, h2, h3, h4, h5, h6')).toHaveLength(0)
  })

  it('home noscript links to Google Play', () => {
    expect(domFromNoscript('home').querySelector('a')?.getAttribute('href')).toBe(PLAY_STORE_URL)
  })

  it('privacy noscript links to the home page', () => {
    expect(domFromNoscript('privacy').querySelector('a')?.getAttribute('href')).toBe('/')
  })

  it.each(pageIds)('%s injects every other tag into the head', (page) => {
    expect(
      buildHeadTags(page)
        .filter((tag) => tag.tag !== 'noscript')
        .every((tag) => tag.injectTo === 'head'),
    ).toBe(true)
  })
})

describe('buildRobotsTxt', () => {
  it('allows all crawlers and names the sitemap', () => {
    expect(buildRobotsTxt().split('\n')).toEqual(
      expect.arrayContaining([
        'User-agent: *',
        'Allow: /',
        'Sitemap: https://www.mystandby.app/sitemap.xml',
      ]),
    )
  })

  it('does not disallow anything', () => {
    expect(buildRobotsTxt()).not.toContain('Disallow')
  })
})

describe('buildSitemapXml', () => {
  const xml = new DOMParser().parseFromString(buildSitemapXml(), 'application/xml')

  it('is well-formed XML', () => {
    expect(xml.getElementsByTagName('parsererror')).toHaveLength(0)
  })

  it('uses the sitemap 0.9 urlset namespace', () => {
    expect(xml.documentElement.namespaceURI).toBe('http://www.sitemaps.org/schemas/sitemap/0.9')
  })

  it('lists exactly the home and privacy URLs', () => {
    expect(Array.from(xml.getElementsByTagName('loc')).map((loc) => loc.textContent)).toEqual([
      'https://www.mystandby.app/',
      'https://www.mystandby.app/privacy/',
    ])
  })

  it('has no lastmod', () => {
    expect(xml.getElementsByTagName('lastmod')).toHaveLength(0)
  })
})

describe('pageIdForHtmlPath', () => {
  it.each([
    ['/index.html', 'home'],
    ['/privacy/index.html', 'privacy'],
  ] as const)('maps %s to %s', (path, page) => {
    expect(pageIdForHtmlPath(path)).toBe(page)
  })

  it('throws for an unknown HTML path', () => {
    expect(() => pageIdForHtmlPath('/imprint/index.html')).toThrow('/imprint/index.html')
  })
})
