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
    const keys:string[] = []
    for (const localPath in pages) {
      const classifierKey = pages[localPath].filter(page => page.frontmatter && page.frontmatter.classifier === classfifier.key).map(({ key }) => key)
      map[classfifier.key] = classifierKey
      keys.push(...classifierKey)
    }
    return {
      map,
      keys
    }
  })
}

/**
 * 目录分配器
 * @param app
 * @param options
 * @param pages
 * @returns
 */
export const prepareDirectories = (app: App, options: BlogOptions, pages: PageMap) => {
  return Promise.all(filterDir(options, pages)).then(async (result) => {
    if (app.env.isDebug) logger.info('目录分配器', result)
      const finalMap: Record<string, string[]> = {}
      const keys: string[] = []
      result.forEach(({ map, keys }) => {
        Object.assign(finalMap, map)
        keys.push(...keys)
      })
      await app.writeTemp(
        `blog/pageClassfier.js`,
        `export const directoryMap = ${JSON.stringify(finalMap)}\n${HMR_CODE}`
      )
      return keys
  })
}

/**
 * 目录 extends page
 */
export const directoriesExtendsPageOptions = (app:App, pageOptions: PageOptions, options: BlogOptions) => {
  const { directoryClassifier = [] } = options
  const appLayouts = Object.keys(app.layouts)
  const defaultAppLayout = appLayouts.length ? appLayouts[0] : 'Layout'
  directoryClassifier.forEach(classifier => {
    const {
      key,
      path: indexPath = `/${classifier.key}/`,
      dirname,
      layout = defaultAppLayout,
      itemLayout = defaultAppLayout,
      itemPermalink = '',
      frontmatter
    } = classifier
    const { filePath } = pageOptions
    const sourceDir = app.dir.source(dirname)
    if (filePath && filePath.startsWith(sourceDir)) {
      const reg = /[readme|index].md$/gi
      const isIndex = reg.test(filePath)
      pageOptions.frontmatter = pageOptions.frontmatter ?? {}
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
        pageOptions.frontmatter.permalinkPattern = itemPermalink ? itemPermalink : `${indexPath}${pathDir}/:slug.html`
      }
      pageOptions.frontmatter.indexPath = indexPath
      pageOptions.frontmatter.dirname = dirname
    }
  })
}
