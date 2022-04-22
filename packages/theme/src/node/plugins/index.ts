/**
 * 创建主题默认的插件配置
 */
import { App, PluginConfig, PluginOptions } from '@vuepress/core'
import { logger } from './../utils/logger'
import { resolveGitPluginOptions } from './git'
import { ThemePluginsOptions, WeaselThemeOptions } from '../../typings'
import { blogPluginInit } from '@mr-huang/vuepress-plugin-blog'
import { resolveBlogOptions } from './blog'

export const createPluginConfig = (
  app: App,
  plugins: ThemePluginsOptions,
  themeData: Omit<WeaselThemeOptions, 'plugins'>
): PluginConfig<PluginOptions>[] => {

  /**
   * 博客插件
   */
  const blogConfig = resolveBlogOptions(plugins.blog)

  const pluginConfig: PluginConfig<PluginOptions>[] = [
    ['@vuepress/git', resolveGitPluginOptions(plugins, themeData)],
    ['@vuepress/theme-data', { themeData }],
    blogPluginInit(blogConfig)
  ]

  if (app.env.isDebug) {
    logger.info('主题默认的插件', pluginConfig.map(plugin => Array.isArray(plugin) ? plugin[0] : ''))
  }

  return pluginConfig
}
