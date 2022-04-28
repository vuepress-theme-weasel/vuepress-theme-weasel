/**
 * blog plugin
 */
import { App, Plugin } from '@vuepress/core'
import { BlogOptions, PageMap } from '../typings'
import { filterPages, logger } from './utils'
import { preparePageType, prepareFrontmatter } from './classifier'
import { path } from '@vuepress/utils';

/**
 * 开发时热更新
 */
const HMR_CODE = `
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateBlogType) {
    __VUE_HMR_RUNTIME__.updateBlogType(directoryMap)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ directoryMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(directoryMap)
  })
}
`

const filterDir = (options: BlogOptions, pages: PageMap) => {
  const { directoryClassifier = [] } = options
  return directoryClassifier.map(classfifier => {
    const map: Record<string, string[]> = {}
    map[classfifier.key] = []
    for (const localPath in pages) {
      const classifierKey = pages[localPath].filter(page => page.frontmatter && page.frontmatter.classifier === classfifier.key).map(({ key }) => key)
      map[classfifier.key] = classifierKey
    }
    return map
  })
}

const prepareDirectories = (app: App, options: BlogOptions, pages: PageMap) => {
  return Promise.all(filterDir(options, pages)).then(async (result) => {
    if (app.env.isDebug) logger.info('目录分配器', result)
      const finalMap: Record<string, string[]> = {}
      result.forEach(res => {
        Object.assign(finalMap, res)
      })
      await app.writeTemp(
        `blog/pageClassfier.js`,
        `export const directoryMap = ${JSON.stringify(finalMap)}\n${HMR_CODE}`
      )
  })
}

export const blogPlugin: Plugin<BlogOptions> = (options) => {
  const { metaScope = '_blog' } = options
  return {
    name: '@mr-huang/vuepress-plugin-blog',

    define: () => ({
      BLOG_META_SCOPE: metaScope,
    }),

    extendsPage(page): void {
      const { getInfo = (): Record<string, never> => ({}) } = options

      // const { indexPath, dirname } = page.frontmatter

      // if (indexPath && dirname) {
      //   const reg = new RegExp(`@source/${dirname}/`, 'ig')
      //   const source = `@source${indexPath}`
      //   page.excerpt = page.excerpt.replace(reg, source)
      //   page.content = page.content.replace(reg, source)
      //   page.contentRendered = page.contentRendered.replace(reg, source)
      // }

      page.routeMeta = {
        ...(metaScope === '' ? getInfo(page) : { [metaScope]: getInfo(page) }),
        ...page.routeMeta,
      }
    },

    // 为页面增强
    extendsPageOptions: (pageOptions, app) => {
    // prepareDirectories(app, options, pages)
      const { directoryClassifier = [] } = options
      directoryClassifier.forEach(classifier => {
        const {
          key,
          path: indexPath = `/${classifier.key}/`,
          dirname,
          layout,
          itemLayout,
          itemPermalink = '',
          frontmatter
        } = classifier
        const { filePath } = pageOptions
        const sourceDir = app.dir.source(dirname)
        if (filePath && filePath.startsWith(sourceDir)) {
          const reg = /[readme|index].md$/gi
          const isIndex = reg.test(filePath)
          pageOptions.frontmatter = pageOptions.frontmatter ?? {}
          // pageOptions.frontmatter.permalinkPattern = '/:year/:month/:day/:slug.html'
          pageOptions.frontmatter = {
            ...pageOptions.frontmatter,
            layout: isIndex ? layout : itemLayout,
            ...frontmatter,
            classifier: key
          }
          const filePathRelative = filePath.replace(sourceDir + '/', '')
          const pathDir = path.dirname(filePathRelative)

          if (isIndex) {
            pageOptions.path = indexPath + pathDir
          } else {
            // const _prefix = indexPath.endsWith('/') ? indexPath.substring(0, indexPath.length - 1) : indexPath
            pageOptions.frontmatter.permalinkPattern = itemPermalink ? itemPermalink : `${indexPath}${pathDir}/:slug.html`
          }
          pageOptions.frontmatter.indexPath = indexPath
          pageOptions.frontmatter.dirname = dirname
        }

        // 筛选出对应的pages
      })
    },

    // 初始化时创建页面
    onInitialized(app) {
      const pages = filterPages(options, app)
      return Promise.all([
          preparePageType(app, options, pages),
          prepareDirectories(app, options, pages),
          prepareFrontmatter(app, options, pages)
        ]).then(() => {
          console.log(app.pages)
        })
    }
  }
}
