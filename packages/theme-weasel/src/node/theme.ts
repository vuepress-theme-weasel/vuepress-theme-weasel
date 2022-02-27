import type { Theme } from '@vuepress/core'
import { WeaselThemeOptions } from '../typings'
import { path } from '@vuepress/utils'
import { getLayoutConfig } from './utils'
import { usePlugins, getPluginConfig } from './plugins'
import { getAlias } from './alias'

export const WeaselTheme: Theme<WeaselThemeOptions> = ({ plugins = {}, ...themeData }, app) => {
  console.log('主题参数plugins:', plugins)
  console.log('主题参数localOptions:', themeData)
  console.log('主题参数app:', app)

  // 是否开启blog
  const enableBlog = Boolean(plugins.blog);
  // 使用前置插件
  usePlugins(app, plugins)
  return {
    name: 'vuepress-theme-weasel',
    alias: getAlias(app),
    // 主题默认的插件
    plugins: getPluginConfig(app, plugins, themeData),
    // 主题布局
    layouts: getLayoutConfig(app, plugins),
    // 主题客户端注入入口，主要用于插件和样式注入
    clientAppEnhanceFiles: [
      path.resolve(__dirname, '../client/appEnhance.js'),
      ...(enableBlog
        ? [path.resolve(__dirname, "../client/modules/blog/appEnhance.js")]
        : []),
    ]
  }
}
