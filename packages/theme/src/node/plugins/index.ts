import { activeHeaderLinksPlugin } from '@vuepress/plugin-active-header-links';
/**
 * 创建主题默认的插件配置
 */
import { App, PluginConfig, PluginOptions } from '@vuepress/core'
import { logger } from './../utils/logger'
import { resolveGitPluginOptions } from './git'
import { ThemePluginsOptions, WeaselThemeOptions } from '../../typings'
import { blogPluginInit } from '@mr-huang/vuepress-plugin-blog'
import { resolveBlogOptions } from './blog'
import { resolveCommentPlugin } from './comment'

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
    ['@vuepress/plugin-active-header-links', plugins.activeHeaderLinks ? {
      headerLinkSelector: ".sidebar-link, .toc-link",
      headerAnchorSelector: ".header-anchor",
    } : false],
    ['@vuepress/plugin-external-link-icon', plugins.externalLinkIcon !== false],
    ['@vuepress/plugin-nprogress', plugins.nprogress !== false],
    ["@vuepress/prismjs", plugins.prismjs !== false],
    ['@vuepress/git', resolveGitPluginOptions(plugins, themeData)],
    ['@vuepress/theme-data', { themeData }],
    blogPluginInit(blogConfig),
    resolveCommentPlugin(plugins.comment),
  ]

  if (app.env.isDebug) {
    logger.info('主题默认的插件', pluginConfig.map(plugin => Array.isArray(plugin) ? plugin[0] : ''))
  }

  return pluginConfig
}
