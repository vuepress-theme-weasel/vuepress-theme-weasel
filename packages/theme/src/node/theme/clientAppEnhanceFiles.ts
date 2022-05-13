/**
 * 主题组件注册
 */
import { App } from '@vuepress/core'
import { path } from '@vuepress/utils'
import { logger } from './../utils/logger'

export const createClientAppEnhanceFiles = (app: App): string[] => {
  const appEnhanceFiles: string[] = [
    path.resolve(__dirname, '../../client/appEnhance.js'),
    path.resolve(__dirname, '../../client/modules/blog/appEnhance.js'),
    path.resolve(__dirname, '../../client/modules/navbar/appEnhance.js'),
    path.resolve(__dirname, '../../client/modules/outlook/appEnhance.js'),
    path.resolve(__dirname, '../../client/modules/sidebar/appEnhance.js')
  ]
  if (app.env.isDebug) {
    logger.info('组件注入文件', appEnhanceFiles)
  }
  return appEnhanceFiles
}
