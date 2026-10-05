import type { HeadTag, PageId, PageSeo } from '../types/seo'
import { APP_NAME, DEVELOPER_NAME, DEVELOPER_URL, PLAY_STORE_URL, SITE_URL } from './site'

export const OG_IMAGE: { path: '/og-image.jpg'; width: 1024; height: 500; alt: string } = {
  path: '/og-image.jpg',
  width: 1024,
  height: 500,
  alt: 'myStandby app icon on the blue brand gradient',
}

export const SCREENSHOT_IDS: readonly string[] = [
  'standby',
  'home',
  'widget-apps',
  'widget-previews',
  'settings',
]

export const pages: Record<PageId, PageSeo> = {
  home: {
    id: 'home',
    path: '/',
    title: 'myStandby – Any Widget on Your Android Standby Screen',
    description:
      'Turn your charging Android phone into a smart display: put any widget on the standby screen and build swipeable widget stacks. Free on Google Play.',
  },
  privacy: {
    id: 'privacy',
    path: '/privacy/',
    title: 'Privacy Policy – myStandby',
    description:
      'How the myStandby app and website process personal data: Firebase Crashlytics and Analytics, in-app feedback via Cloudflare and Jira, and Google Play.',
  },
}

const HTML_PATHS: Record<string, PageId> = {
  '/index.html': 'home',
  '/privacy/index.html': 'privacy',
}

const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path}`
}

export function escapeHtml(text: string): string {
  return text.replace(/[&<>"']/g, (char) => HTML_ESCAPES[char] ?? char)
}

export function buildStructuredData(): Record<string, unknown> {
  const home = pages.home
  const homeUrl = absoluteUrl(home.path)
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: APP_NAME,
        url: homeUrl,
      },
      {
        '@type': 'MobileApplication',
        name: APP_NAME,
        description: home.description,
        operatingSystem: 'Android 10+',
        applicationCategory: 'UtilitiesApplication',
        url: homeUrl,
        installUrl: PLAY_STORE_URL,
        image: absoluteUrl(OG_IMAGE.path),
        screenshot: SCREENSHOT_IDS.map((id) => absoluteUrl(`/screenshots/${id}-960.webp`)),
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
        },
        author: {
          '@type': 'Person',
          name: DEVELOPER_NAME,
          url: DEVELOPER_URL,
        },
      },
    ],
  }
}

export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

function meta(attr: 'name' | 'property', key: string, content: string): HeadTag {
  return { tag: 'meta', attrs: { [attr]: key, content }, injectTo: 'head' }
}

function buildNoscript(page: PageSeo): HeadTag {
  const link =
    page.id === 'home'
      ? `<a href="${escapeHtml(PLAY_STORE_URL)}">Get ${escapeHtml(APP_NAME)} on Google Play</a>`
      : `<a href="/">${escapeHtml(APP_NAME)} home page</a>`
  return {
    tag: 'noscript',
    children: `<p>${escapeHtml(page.description)} ${link}</p>`,
    injectTo: 'body-prepend',
  }
}

export function buildHeadTags(page: PageId): HeadTag[] {
  const seo = pages[page]
  const url = absoluteUrl(seo.path)
  const tags: HeadTag[] = [
    { tag: 'title', children: escapeHtml(seo.title), injectTo: 'head' },
    meta('name', 'description', seo.description),
    { tag: 'link', attrs: { rel: 'canonical', href: url }, injectTo: 'head' },
    meta('property', 'og:type', 'website'),
    meta('property', 'og:site_name', APP_NAME),
    meta('property', 'og:locale', 'en_US'),
    meta('property', 'og:title', seo.title),
    meta('property', 'og:description', seo.description),
    meta('property', 'og:url', url),
    meta('property', 'og:image', absoluteUrl(OG_IMAGE.path)),
    meta('property', 'og:image:width', String(OG_IMAGE.width)),
    meta('property', 'og:image:height', String(OG_IMAGE.height)),
    meta('property', 'og:image:alt', OG_IMAGE.alt),
    meta('name', 'twitter:card', 'summary_large_image'),
  ]
  if (page === 'home') {
    tags.push({
      tag: 'script',
      attrs: { type: 'application/ld+json' },
      children: serializeJsonLd(buildStructuredData()),
      injectTo: 'head',
    })
  }
  tags.push(buildNoscript(seo))
  return tags
}

export function buildRobotsTxt(): string {
  return ['User-agent: *', 'Allow: /', '', `Sitemap: ${absoluteUrl('/sitemap.xml')}`, ''].join(
    '\n',
  )
}

export function buildSitemapXml(): string {
  const urls = Object.values(pages)
    .map((page) => `  <url>\n    <loc>${escapeHtml(absoluteUrl(page.path))}</loc>\n  </url>`)
    .join('\n')
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    '</urlset>',
    '',
  ].join('\n')
}

export function pageIdForHtmlPath(path: string): PageId {
  const page = HTML_PATHS[path]
  if (!page) {
    throw new Error(`No SEO data for HTML page "${path}"`)
  }
  return page
}
