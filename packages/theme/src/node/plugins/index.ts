/**
 * 创建主题默认的插件配置
 */
import { App, PluginConfig } from '@vuepress/core'
import { logger } from './../utils/logger'
import { resolveGitPluginOptions } from './git'
import { ThemePluginsOptions, WeaselThemeConfig } from '../../typings'
import { resolveBlog } from './blog'
import { getCommentPlugin } from './comment'
import { activeHeaderLinksPlugin } from '@vuepress/plugin-active-header-links';
import { externalLinkIconPlugin } from "@vuepress/plugin-external-link-icon";
import { nprogressPlugin } from "@vuepress/plugin-nprogress";
import { prismjsPlugin } from "@vuepress/plugin-prismjs";
import { themeDataPlugin } from "@vuepress/plugin-theme-data";
import { gitPlugin } from '@vuepress/plugin-git'
import { sitemapPlugin } from "./sitemap";

export const createPluginConfig = (
  hostname: string,
  plugins: ThemePluginsOptions,
  themeData: WeaselThemeConfig
): PluginConfig => {

  const pluginConfig = [
    plugins.activeHeaderLinks === false ? null : activeHeaderLinksPlugin(),
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
