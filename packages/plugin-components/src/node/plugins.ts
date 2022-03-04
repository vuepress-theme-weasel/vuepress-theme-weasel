import {
  addViteSsrNoExternal,
  excludeViteOptimizeDeps,
  includeViteOptimizeDeps,
  getLocales,
  noopModule,
} from '@mr-huang/vuepress-shared'
import { path } from '@vuepress/utils'
import { useSassPalettePlugin } from '@mr-huang/vuepress-plugin-sass-palette'
import {
  backToTopLocales,
  articleInfoLocales,
  paginationLocales,
} from './locales'

import type { Plugin, PluginConfig } from '@vuepress/core'
import type { ComponentOptions } from '../typings'

export const componentsPlugin: Plugin<ComponentOptions> = (options, app) => {
  if (app.env.isDev)
    includeViteOptimizeDeps(app, '@mr-huang/vuepress-shared/lib/client')

  addViteSsrNoExternal(app, [
    '@mr-huang/vuepress-shared',
    '@mr-huang/vuepress-plugin-components',
  ])
  excludeViteOptimizeDeps(app, '@mr-huang/vuepress-plugin-components')

  if (options.backToTop) includeViteOptimizeDeps(app, 'lodash.debounce')
  if (options.fullScreen) includeViteOptimizeDeps(app, 'screenfull')

  useSassPalettePlugin(app, { id: 'weasel' })

  return {
    name: '@mr-huang/vuepress-plugin-components',

    alias: {
      '@ArticleInfo': options.articleInfo
        ? path.resolve(__dirname, '../client/components/ArticleInfo.js')
        : noopModule,
      '@BreadCrumb': options.breadcrumb
        ? path.resolve(__dirname, '../client/components/BreadCrumb.js')
        : noopModule,
      '@Badge': options.badge
        ? path.resolve(__dirname, '../client/components/Badge.js')
        : noopModule,
      '@FullScreen': options.fullScreen
        ? path.resolve(__dirname, '../client/components/FullScreen.js')
        : noopModule,
      '@Pagination': options.pagination
        ? path.resolve(__dirname, '../client/components/Pagination.js')
        : noopModule,
      '@TOC': options.toc
        ? path.resolve(__dirname, '../client/components/TOC.js')
        : noopModule,
    },

    define: {
      ARTICLE_INFO_LOCALES: getLocales(
        app,
        articleInfoLocales,
        options.articleInfoLocales
      ),
      BACK_TO_TOP_THRESHOLD: options.backToTopThreshold || 300,
      BACK_TO_TOP_LOCALES: getLocales(
        app,
        backToTopLocales,
        options.backToTopLocales
      ),
      PAGINATION_LOCALES: getLocales(
        app,
        paginationLocales,
        options.paginationLocales
      ),
    },

    clientAppEnhanceFiles: path.resolve(__dirname, '../client/appEnhance.js'),

    clientAppRootComponentFiles: options.backToTop
      ? path.resolve(__dirname, '../client/root-components/BackToTop.js')
      : undefined,
  }
}

export const components = (
  options: ComponentOptions | false
): PluginConfig<ComponentOptions> => ['@mr-huang/components', options]
