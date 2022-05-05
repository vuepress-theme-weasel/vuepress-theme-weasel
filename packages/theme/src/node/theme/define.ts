/**
 * 常量定义
 */

import { App } from "@vuepress/core"
import { articleInfoLocales, backToTopLocales, paginationLocales } from '../locales'
import { logger } from "../utils";
import { WeaselThemeConfig, ThemePluginsOptions } from './../../typings';
import { getLocales } from '@mr-huang/vuepress-shared'

const defaultBackToTopOptions = {
  threshold: 300,
  backToTopLocales
}

/**
 * 全局常量定义
 * @param app
 * @param themeConfig
 * @returns
 */
export const getDefine = (app: App, plugins: ThemePluginsOptions, themeConfig: WeaselThemeConfig) => {
  if (app.env.isDebug) {
    logger.info('写入全局常量')
  }
  const enableBlog = Boolean(plugins.blog)

  const backToTopOptions = Object.assign({}, defaultBackToTopOptions, (themeConfig.backToTop || {}) )

  return {
    ENABLE_BLOG: enableBlog,
    ARTICLE_INFO_LOCALES: getLocales(
      app,
      articleInfoLocales,
      themeConfig.articleInfoLocales
    ),
    PAGINATION_LOCALES: getLocales(
      app,
      paginationLocales,
      themeConfig.paginationLocales
    ),
    BACK_TO_TOP_THRESHOLD: backToTopOptions.threshold || 300,
      BACK_TO_TOP_LOCALES: getLocales(
        app,
        backToTopLocales,
        backToTopOptions.backToTopLocales
      ),
  }
}
