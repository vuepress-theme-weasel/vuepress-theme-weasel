import { path } from '@vuepress/utils'
import type { App, PageOptions } from '@vuepress/core';
import type { BlogOptions, PageMap } from '../../typings';
import { logger } from '../utils';
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

export const prepareDirectories = (app: App, options: BlogOptions, pages: PageMap) => {
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

export const directoriesExtendsPageOptions = (app:App, pageOptions: PageOptions, options: BlogOptions) => {
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
}