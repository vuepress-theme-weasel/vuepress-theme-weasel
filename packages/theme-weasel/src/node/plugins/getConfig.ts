import { App } from '@vuepress/core';
import {
  resolveActiveHeaderLinksPluginOptions
  // resolveContainerPluginOptionsForCodeGroup,
  // resolveContainerPluginOptionsForCodeGroupItem,
  // resolveGitPluginOptions,
} from './defaultPluginConfig'

import type { PluginConfig, PluginOptions } from '@vuepress/core'
import type { WeaselThemeOptions, WeaselThemePluginsOptions } from '../../typings'

export const getPluginConfig = (
  app: App,
  plugins: WeaselThemePluginsOptions,
  themeData: Omit<WeaselThemeOptions, 'plugins'>
): PluginConfig<PluginOptions>[] => {
  const pluginConfig : PluginConfig<PluginOptions>[] =  [
    ['@vuepress/active-header-links', resolveActiveHeaderLinksPluginOptions(plugins)],
    // ['@vuepress/container', resolveContainerPluginOptionsForCodeGroup(plugins)],
    // ['@vuepress/container', resolveContainerPluginOptionsForCodeGroupItem(plugins)],
    // ['@vuepress/git', resolveGitPluginOptions(plugins, themeData)],
    // ['@vuepress/nprogress', plugins.nprogress !== false],
    // ['@vuepress/prismjs', plugins.prismjs !== false],
    ['@vuepress/theme-data', { themeData }]
  ]

  // debug log
  if (app.env.isDebug) console.log("Theme plugin options:", pluginConfig)

  return pluginConfig
}
