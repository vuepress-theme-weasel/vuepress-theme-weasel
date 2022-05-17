/**
 * blog plugin
 */
import { filterPages, logger } from './utils'
import { preparePageType, prepareFrontmatter, prepareDirectories, directoriesExtendsPageOptions } from './classifier'

import type { PluginFunction } from '@vuepress/core'
import type { BlogOptions } from '../typings'

export const blogPlugin = (options: BlogOptions):PluginFunction => (app) => {
  const {
    getInfo = (): Record<string, never> => ({}),
    metaScope = '_blog'
  } = options
  let generatePageKeys: string[] = [];

  if (app.env.isDebug) logger.info(`Options: ${options.toString()}`);
  return {
    name: '@mr-huang/vuepress-plugin-blog',

    define: () => ({
      BLOG_META_SCOPE: metaScope,
    }),

    extendsPage(page): void {
      page.routeMeta = {
        ...(metaScope === '' ? getInfo(page) : { [metaScope]: getInfo(page) }),
        ...page.routeMeta,
      }
    },

    // 为页面增强
    extendsPageOptions: (pageOptions) => {
      directoriesExtendsPageOptions(app, pageOptions, options)
    },

    // 初始化时创建页面
    onInitialized(app) {
      const pages = filterPages(options, app)
      return Promise.all([
          preparePageType(app, options, pages, true),
          prepareDirectories(app, options, pages),
          prepareFrontmatter(app, options, pages, true)
        ]).then(() => {
          // console.log(app.pages)
        })
    }
  }
}
