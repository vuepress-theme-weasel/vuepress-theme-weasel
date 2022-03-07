import type { Page, Theme } from '@vuepress/core'
import { WeaselThemeConfig, WeaselThemeOptions, WeaselThemePageData } from '../typings'
import { path } from '@vuepress/utils'
import { getLayoutConfig } from './utils'
import { usePlugins, getPluginConfig } from './plugins'
import { getAlias } from './alias'
import { extendsPage } from './extends'
import { handleThemeData } from './handleThemeData'

export const WeaselTheme: Theme<WeaselThemeOptions> = ({ plugins = {}, ...themeOptions }, app) => {
  // 是否开启blog
  const enableBlog = Boolean(plugins.blog);
  // 使用前置插件
  handleThemeData(app, themeOptions)
  usePlugins(app, plugins)
  return {
    name: 'vuepress-theme-weasel',
    alias: getAlias(app),
    extendsPage: (page) => extendsPage(
      app,
      themeOptions as WeaselThemeConfig,
      plugins,
      page as Page<WeaselThemePageData>,
      app.env.isDev
    ),
    // 主题默认的插件
    plugins: getPluginConfig(app, plugins, themeOptions),
    // 主题布局
    layouts: getLayoutConfig(app, plugins),
    // 主题客户端注入入口，主要用于插件和样式注入
    clientAppEnhanceFiles: [
      path.resolve(__dirname, '../client/appEnhance.js'),
      ...(enableBlog
        ? [path.resolve(__dirname, "../client/modules/blog/appEnhance.js")]
        : []),
    ],
    clientAppSetupFiles: [
      ...(enableBlog
        ? [path.resolve(__dirname, "../client/modules/blog/appSetup.js")]
        : []),
      // path.resolve(__dirname, "../client/modules/outlook/appSetup.js"),
      // path.resolve(__dirname, "../client/modules/sidebar/appSetup.js"),
    ],
  }
}
