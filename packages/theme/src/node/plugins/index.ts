/**
 * 创建主题默认的插件配置
 */
import { activeHeaderLinksPlugin } from '@vuepress/plugin-active-header-links'
import { externalLinkIconPlugin } from "@vuepress/plugin-external-link-icon"
import { nprogressPlugin } from "@vuepress/plugin-nprogress"
import { prismjsPlugin } from "@vuepress/plugin-prismjs"
import { themeDataPlugin } from "@vuepress/plugin-theme-data"
import { gitPlugin } from '@vuepress/plugin-git'
import { resolveGitPluginOptions } from './git'
import { resolveBlog } from './blog'
import { getCommentPlugin } from './comment'
import { sitemapPlugin } from "./sitemap"

import type { PluginConfig } from '@vuepress/core'
import type { ThemePluginsOptions, WeaselThemeConfig } from '../../typings'

export const createPluginConfig = (
  hostname: string,
  plugins: ThemePluginsOptions,
  themeData: WeaselThemeConfig
): PluginConfig => {

  const pluginConfig = [
    plugins.activeHeaderLinks === false ? null : activeHeaderLinksPlugin({
      headerLinkSelector: ".sidebar-link, .toc-link",
      headerAnchorSelector: ".header-anchor",
    }),
    plugins.externalLinkIcon === false ? null : externalLinkIconPlugin(),
    plugins.nprogress === false ? null : nprogressPlugin(),
    plugins.prismjs === false ? null : prismjsPlugin(),
    gitPlugin(resolveGitPluginOptions(plugins, themeData)),
    themeDataPlugin({ themeData }),
    resolveBlog(themeData, plugins.blog),
    getCommentPlugin(plugins.comment),
    sitemapPlugin(hostname, plugins.sitemap)
  ].filter((item) => item !== null) as PluginConfig;

  return pluginConfig
}
