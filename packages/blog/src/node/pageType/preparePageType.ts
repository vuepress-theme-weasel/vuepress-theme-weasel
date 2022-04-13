/**
 * 页面按类型整理
 * {[type]: [key, key, ...]}
 */

import { App, createPage } from "@vuepress/core";
import { BlogOptions, PageTypeOptions, PageMap, PageTypeMap } from "../../typings";
import { logger, removeLeadingSlash } from "../utils";

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
 * 默认的 slugify
 * @param name
 * @returns
 */
const defaultSlugify = (name: string): string => name.replace(/[ _]/g, '-').toLowerCase()

/**
 * 创建页面
 * @param app
 * @param typePages
 * @param pages
 * @param slugify
 * @returns
 */
const createTypePage = (app: App, typePages: PageTypeOptions[], pages: PageMap, slugify: (name: string) => string) => {
  return typePages.map( async (typePage) => {
    const {
      key,
      sorter = () => -1,
      filter = () => true,
      path = '',
      layout = 'Layout'
    } = typePage

    // key 不对或者不存在
    if (typeof key !== 'string' || !key) {
      logger.error(`Invalid 'key' option ${key} in page type.`)
      return null
    }

    const pageTypeMap: PageTypeMap = {}
    const pagePaths: string[] = []

    if (app.env.isDebug) logger.info(`Generating ${key} type.\n`)

    for (const routeLocale in pages) {
      // 拿出所有需要创建的key
      const keys = pages[routeLocale].filter(filter).sort(sorter).map(({ key }) => key)
      if (path) {
        // 创建页面
        const pagePath = `${routeLocale}${removeLeadingSlash(slugify(path.replace(/:key/g, key)))}`
        const page = await createPage(app, {
          path: pagePath,
          frontmatter: {
            blog: {
              type: 'type',
              key,
            },
            layout
          }
        })

        // 加入到app pages
        app.pages.push(page)
        pagePaths.push(pagePath)

        pageTypeMap[routeLocale] = {
          path: pagePath,
          keys
        }

        if (app.env.isDebug) {
          logger.info(`Route ${routeLocale} in ${key} type: path: ${page.path} items: ${keys.length}`)
        }
      } else {
        pageTypeMap[routeLocale] = { path: '', keys }

        if (app.env.isDebug) {
          logger.info(`Route ${routeLocale} in ${key} type: items: ${keys.length}`)
        }
      }
    }
    return {
      key,
      map: pageTypeMap,
      pagePaths
    }
  })
}

/**
 * 分类函数
 * @param app
 * @param options
 * @param pages
 */
export const preparePageType = (app: App, options: Partial<BlogOptions>, pages: PageMap): Promise<string[]> => {
  const {
    pageTypeClassifier = [],
    slugify = defaultSlugify
  } = options

  return Promise.all(createTypePage(app, pageTypeClassifier, pages, slugify)).then(async (result) => {
    const finalMap: Record<string, PageTypeMap> = {}
    const paths: string[] = []

    result.filter(item => item !== null).forEach(item => {
      const { key, map, pagePaths } = item!
      finalMap[key] = map
      paths.push(...pagePaths)
    })

    await app.writeTemp(
      `blog/pageType.js`,
      `export const pageTypeMap = ${JSON.stringify(finalMap)}\n${HMR_CODE}`
    )
    return paths
  })
}
