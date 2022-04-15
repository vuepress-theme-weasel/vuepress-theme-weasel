/**
 * 目录分类器 根据目录管理文章
 */

import { App, createPage, Page } from "@vuepress/core"
import { upperFirstChar } from '@mr-huang/vuepress-shared'
import { BlogOptions, PageMap, DirectoryClassifierOption, ExtraPage, PageTypeMap } from "../../typings"
import { logger, removeLeadingSlash } from "../utils"

/**
 * 开发时热更新
 */
const HMR_CODE = `
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateBlogType) {
    __VUE_HMR_RUNTIME__.updateBlogType(pageTypeMap)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ pageTypeMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(pageTypeMap)
  })
}
`

/**
 * filter
 * @param param0 。
 * @param indexPath
 * @param dirname
 * @returns
 */
const filter = ({ filePathRelative }: Page, indexPath: string, dirname: string) => {
  const regex = new RegExp(`^${dirname}/page/`);
  return (
    filePathRelative &&
    filePathRelative !== indexPath &&
    filePathRelative.startsWith(`${dirname}/`)
  )
}

/**
 * 创建分类器
 * @param app
 * @param options
 * @param pages
 */
const createDirectoriesClassifier = (app: App, directoryClassifiers: DirectoryClassifierOption[], pages: PageMap) => {
  return directoryClassifiers.map(async(classifier) => {

    /**
     * 1. Directory-based classification
     */
     const {
      key,
      dirname,
      path: indexPath = `/${classifier.key}/`,
      layout: indexLayout = 'Layout',
      frontmatter,
      itemLayout = 'Layout',
      itemPermalink = '/:year/:month/:day/:slug',
      title = upperFirstChar(classifier.key)
    } = classifier

    const finalExtraPages: ExtraPage[] = []

    for(const routeLocale in pages) {
      pages[routeLocale].filter(page => filter(page, indexPath, dirname)).map(page => {
        if (page.path === `/${dirname}/`) {
          // 首页
          page.frontmatter = {
            ...page.frontmatter,
            layout: indexLayout,
            ...frontmatter
          }
        }
      })
    }

    // console.log('===================', pages)


    // key 不对或者不存在
    if (typeof key !== 'string' || !key) {
      logger.error(`Invalid 'key' option ${key} in directory classifier.`)
      return null
    }

    if (app.env.isDebug) logger.info('====')

    return true
  })
}

export const prepareDirectories = (app: App, options: Partial<BlogOptions>, pages: PageMap) => {
  const {
    directoryClassifier = []
  } = options
  return Promise.all(createDirectoriesClassifier(app, directoryClassifier, pages)).then(async() => {
    // console.log(JSON.stringify(result, null, 2))
  })
}
