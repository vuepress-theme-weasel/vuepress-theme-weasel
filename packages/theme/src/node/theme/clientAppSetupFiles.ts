/**
 * setup注册
 */
import { App } from '@vuepress/core'
import { path } from '@vuepress/utils'
import { logger } from './../utils/logger'

export const createClientAppSetupFiles = (app: App): string[] => {
  const appSetupFiles: string[] = [
    path.resolve(__dirname, '../../client/appSetup.js'),
    path.resolve(__dirname, '../../client/modules/blog/appSetup.js'),
    path.resolve(__dirname, '../../client/modules/sidebar/appSetup.js'),
    path.resolve(__dirname, '../../client/modules/outlook/appSetup.js')
  ]
  if (app.env.isDebug) {
    logger.info('setup注册文件', appSetupFiles)
  }
  return appSetupFiles
}
