import type { Theme } from '@vuepress/core'
import { WeaselThemeOptions } from '../typings'
import { path } from '@vuepress/utils'

export const WeaselTheme: Theme<WeaselThemeOptions> = ({ plugins = {}, ...localOptions }, app) => {
  console.log('主题参数plugins:', plugins)
  console.log('主题参数localOptions:', localOptions)
  console.log('主题参数app:', app)

  return {
    name: 'vuepress-theme-weasel',
    // 主题布局
    layouts: path.resolve(__dirname, '../client/layouts'),
    // 主题客户端注入入口，主要用于插件和样式注入
    clientAppEnhanceFiles: path.resolve(__dirname, '../client/appEnhance.js'),
    // 主题默认的插件
    plugins: []
  }
}
