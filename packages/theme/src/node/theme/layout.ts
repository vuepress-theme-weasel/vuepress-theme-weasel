/**
 * 整合laypout统一输出
 */
import { App } from '@vuepress/core'
import { path } from '@vuepress/utils'
import { logger } from './../utils/logger'

/**
 * 为主题创建layout
 * @param app
 * @returns
 */
export const createLayout = (app: App): Record<string, string> => {
  const layoutConfig: Record<string, string> = {
    Layout: path.resolve(__dirname, '../../client/layouts/Default.vue'),
    404: path.resolve(__dirname, '../../client/layouts/404.vue'),
    Blog: path.resolve(__dirname, '../../client/modules/blog/layouts/Blog.vue')
  }

  if (app.env.isDebug) {
    logger.info('主题集成的layot:', layoutConfig)
  }

  return layoutConfig
}
