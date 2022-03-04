import {
  addViteSsrNoExternal,
  includeViteOptimizeDeps,
  excludeViteOptimizeDeps,
} from '@mr-huang/vuepress-shared'
import {
  preparePagesComponents,
  preparePagesData,
  preparePagesRoutes,
} from '@vuepress/core'
import { prepareCategory } from './category'
import { prepareType } from './type'
import { getPageMap, logger } from './utils'

import type { Plugin, PluginConfig } from '@vuepress/core'
import type { BlogOptions } from '../shared'

export const blogPlugin: Plugin<BlogOptions> = (options, app) => {
  if (app.env.isDev)
    includeViteOptimizeDeps(app, '@mr-huang/vuepress-shared/lib/client')

  addViteSsrNoExternal(app, [
    '@mr-huang/vuepress-shared',
    '@mr-huang/vuepress-plugin-blog',
  ])
  excludeViteOptimizeDeps(app, '@mr-huang/vuepress-plugin-blog')

  const { metaScope = '_blog' } = options

  let generatePages: string[] = []

  return {
    name: '@mr-huang/vuepress-plugin-blog',

    define: () => ({
      BLOG_META_SCOPE: metaScope,
    }),

    extendsPage(page): void {
      const { getInfo = (): Record<string, never> => ({}) } = options

      page.routeMeta = {
        ...(metaScope === '' ? getInfo(page) : { [metaScope]: getInfo(page) }),
        ...page.routeMeta,
      }
    },

    onInitialized(app): Promise<void> {
      const pageMap = getPageMap(options, app)
      return Promise.all([
        prepareCategory(app, options, pageMap).then((pageKeys) => {
          generatePages.push(...pageKeys)
        }),
        prepareType(app, options, pageMap).then((pageKeys) => {
          generatePages.push(...pageKeys)
        }),
      ]).then(() => {
        if (app.env.isDebug) logger.info('temp file generated')
      })
    },

    onWatched(app): Promise<void> {
      const newGeneratedPages: string[] = []

      const pageMap = getPageMap(options, app)

      return Promise.all([
        prepareCategory(app, options, pageMap).then((pageKeys) => {
          newGeneratedPages.push(...pageKeys)
        }),
        prepareType(app, options, pageMap).then((pageKeys) => {
          newGeneratedPages.push(...pageKeys)
        }),
      ]).then(async () => {
        if (newGeneratedPages.length !== generatePages.length) {
          // prepare pages entry
          await preparePagesComponents(app)
          await preparePagesData(app)
          await preparePagesRoutes(app)
        } else {
          for (const path of newGeneratedPages) {
            if (!generatePages.includes(path)) {
              // prepare pages entry
              await preparePagesComponents(app)
              await preparePagesData(app)
              await preparePagesRoutes(app)
            }
          }
        }

        generatePages = newGeneratedPages

        if (app.env.isDebug) logger.info('temp file updated')
      })
    },
  }
}

export const blog = (
  options: BlogOptions | false
): PluginConfig<BlogOptions> => ['@mr-huang/vuepress-plugin-blog', options]
