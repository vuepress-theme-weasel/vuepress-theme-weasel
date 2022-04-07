/**
 * 创建主题默认的插件配置
 */
import { WeaselThemeOptions } from '../../typings'
import { App, PluginConfig, PluginOptions } from '@vuepress/core'
import { logger } from './../utils/logger'

export const createPluginConfig = (app: App, themeData: Omit<WeaselThemeOptions, 'plugins'>): PluginConfig<PluginOptions>[] => {
  const pluginConfig: PluginConfig<PluginOptions>[] = [
    ['@vuepress/theme-data', { themeData }],
  ]

  if (app.env.isDebug) {
    logger.info('主题默认的插件', pluginConfig.map(plugin => Array.isArray(plugin) ? plugin[0] : ''))
  }

  return pluginConfig
}
