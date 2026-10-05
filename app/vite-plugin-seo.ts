import type { HtmlTagDescriptor, IndexHtmlTransformContext, Plugin } from 'vite'

import {
  buildHeadTags,
  buildRobotsTxt,
  buildSitemapXml,
  pageIdForHtmlPath,
} from './src/data/seo'

export function seoPlugin(): Plugin {
  return {
    name: 'mystandby-seo',
    transformIndexHtml(html: string, ctx: IndexHtmlTransformContext) {
      const tags: HtmlTagDescriptor[] = buildHeadTags(pageIdForHtmlPath(ctx.path))
      return { html, tags }
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: buildRobotsTxt() })
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: buildSitemapXml() })
    },
  }
}
