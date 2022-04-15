import { prepareDirectories } from './classifier/prepareDirectories';
/**
 * blog plugin
 */

import { preparePageType } from './classifier'
import { Plugin } from '@vuepress/core'
import { BlogOptions } from '../typings'
import { filterPages } from './utils'

export const blogPlugin: Plugin<BlogOptions> = (options) => {

  return {
    name: '@mr-huang/vuepress-plugin-blog',
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
          itemPermalink = '/:year/:month/:day/:slug.html',
          frontmatter
        } = classifier
        const { filePath } = pageOptions
        if (filePath && filePath.startsWith(app.dir.source(dirname))) {
          const reg = /[readme|index].md$/gi
          const isIndex = reg.test(filePath)
          pageOptions.frontmatter = pageOptions.frontmatter ?? {}
          // pageOptions.frontmatter.permalinkPattern = '/:year/:month/:day/:slug.html'
          pageOptions.frontmatter = {
            ...pageOptions.frontmatter,
            layout: isIndex ? layout : itemLayout,
            ...frontmatter
          }
          if (isIndex) {
            pageOptions.path = indexPath
          } else {
            const _prefix = indexPath.endsWith('/') ? indexPath.substring(indexPath.length - 2, indexPath.length - 1) : indexPath
            pageOptions.frontmatter.permalinkPattern = `${_prefix}${itemPermalink}`
          }
        }
      })
    },
    // 初始化时创建页面
    onInitialized(app) {
      const pages = filterPages(options, app)
      return Promise.all([
          preparePageType(app, options, pages),
        ]).then(() => {
          console.log(app.pages)
        })
    }
  }
}
