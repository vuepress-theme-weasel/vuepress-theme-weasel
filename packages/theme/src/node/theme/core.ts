import { handleThemeData } from './themeData';
import { prepareSidebarData } from './../plugins/sidebar';
import { createPluginConfig } from './../plugins/index';
import { createClientAppSetupFiles } from './clientAppSetupFiles';
import { createClientAppEnhanceFiles } from './clientAppEnhanceFiles';
import { createLayout } from './layout';
import { createAlias } from './alias';
import type { Page, Theme } from '@vuepress/core'
import { ThemePageData, WeaselThemeConfig, WeaselThemeOptions } from '../../typings'
import { getThemeConfig, logger } from '../utils'
import { getDefine } from './define';
import { extendsPage } from './extends';
import { usePlugin } from './usePlugin';

// @ts-ignore
export const weaselTheme: Theme<WeaselThemeOptions> = ({ plugins = {}, ...themeOptions }, app) => {
  logger.info("========= 主题阶段开始 ===========")
  logger.info(app.options.source)
  // 主题数据注入
  handleThemeData(app, themeOptions)
  const themeConfig = getThemeConfig(app, themeOptions);
  // 前置插件
  usePlugin(app, plugins, themeConfig)
  return {
    name: 'vuepress-theme-weasel',
    alias: createAlias(app),
    define: getDefine(app, plugins, themeConfig),
    // 初始化之前的配置
    onPrepared: () => {
      prepareSidebarData(app, themeConfig)
    },
    extendsPage: (page) => extendsPage(app, themeOptions as WeaselThemeConfig, plugins, page as Page<ThemePageData>, app.env.isDev),
    // 主题默认的插件
    plugins: createPluginConfig(app, plugins, themeConfig),
    // 主题布局
    layouts: createLayout(app),
    // 主题客户端注入入口，主要用于插件和样式注入
    clientAppEnhanceFiles: createClientAppEnhanceFiles(app),
    // 主题客户端注入入口，主要用于注入hooks
    clientAppSetupFiles: createClientAppSetupFiles(app)
  }
}

export default weaselTheme
