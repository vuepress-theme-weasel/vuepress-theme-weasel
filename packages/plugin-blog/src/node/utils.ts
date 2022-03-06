import { Logger } from '@mr-huang/vuepress-shared'
import type { App } from '@vuepress/core'
import type { BlogOptions, PageMap } from '../typings'

export const logger = new Logger('@mr-huang/vuepress-plugin-blog')

export const getPageMap = (
  options: Partial<BlogOptions>,
  app: App
): PageMap => {
  const {
    filter = (page): boolean =>
      Boolean(page.filePathRelative) && !page.frontmatter.home,
  } = options
  const pageMap: PageMap = {}

  app.pages.filter(filter).forEach((page) => {
    if (!pageMap[page.pathLocale]) pageMap[page.pathLocale] = []
    pageMap[page.pathLocale].push(page)
  })

  return pageMap
}

export const removeLeadingSlash = (path: string): string => path.replace(/^\//, '')
