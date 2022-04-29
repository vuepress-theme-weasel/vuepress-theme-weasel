/**
 * 常量定义
 */

import { App } from "@vuepress/core"
import { articleInfoLocales, paginationLocales } from '../locales'
import { logger } from "../utils";
import { WeaselThemeConfig } from './../../typings';
import { getLocales } from '@mr-huang/vuepress-shared'

/**
 * 全局常量定义
 * @param app
 * @param themeConfig
 * @returns
 */
export const getDefine = (app: App, themeConfig: WeaselThemeConfig) => {
  if (app.env.isDebug) {
    logger.info('写入全局常量')
  }
  return {
    ARTICLE_INFO_LOCALES: getLocales(
      app,
      articleInfoLocales,
      themeConfig.articleInfoLocales
    ),
    PAGINATION_LOCALES: getLocales(
      app,
      paginationLocales,
      themeConfig.paginationLocales
    )
  }
}
