/**
 * 常量定义
 */

import { App } from "@vuepress/core"
import { getLocales } from "../locales"
import { articleInfoLocales } from '../locales'
import { logger } from "../utils";
import { WeaselThemeConfig } from './../../typings';

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
    )
  }
}
