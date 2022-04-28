/**
 * 页面处理相关的工具
 */

import { App, Page } from "@vuepress/core";
import { BlogOptions, PageMap } from "../../typings";

/**
 * 默认的页面筛选函数
 * @param page
 * @returns
 */
const defaultPageFilter = (page: Page):boolean => Boolean(page.filePathRelative) && !page.frontmatter.home

/**
 * 筛选有内容的文章页面出来
 * @param options
 * @param app
 * @returns
 */
export const filterPages = (options: Partial<BlogOptions>, app: App): PageMap => {
  const { filter = defaultPageFilter } = options
  const pages: PageMap = {}

  app.pages.filter(filter).forEach(page => {
    const mapKey = page.pathLocale
    if (!pages[mapKey]) {
      pages[mapKey] = []
    }
    pages[mapKey].push(page)
  })

  return pages
}

/**
 * 去除斜杠
 * @param path
 * @returns
 */
export const removeLeadingSlash = (path: string): string => path.replace(/^\//, '')
