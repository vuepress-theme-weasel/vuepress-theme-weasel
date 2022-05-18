import { prepareClientConfigFile } from './clientConfig';
import { prepareSidebarData } from './../plugins/sidebar';
import { createPluginConfig } from './../plugins/index';
import { createLayout } from './layout';
import { createAlias } from './alias';
import type { Page, ThemeFunction } from '@vuepress/core'
import { ThemePageData, WeaselThemeConfig, WeaselThemeOptions } from '../../typings'
import { logger } from '../utils'
import { getDefine } from './define';
import { extendsPage } from './extends';
import { usePlugin } from './usePlugin';
import { prepareThemeColorScss } from './themeColor';
import { path } from '@vuepress/utils';
import { getThemeConfig } from './themeConfig';
import { getStatus } from './state';

export const weaselTheme = (options: WeaselThemeOptions): ThemeFunction => (app) => {
  const { plugins = {}, hostname = '', ...themeOptions } = options
  logger.info("========= 主题阶段开始 ===========")
  logger.info(app.options.source)

  const status = getStatus(options);
  // 主题数据注入
  const themeConfig = getThemeConfig(app, themeOptions, status.enableBlog);
  // 前置插件
  usePlugin(app, plugins, themeConfig)
  return {
    name: 'vuepress-theme-weasel',
    alias: createAlias(app),
    define: getDefine(app, plugins, themeConfig),
    // 初始化之前的配置
    onPrepared: () => {
      prepareSidebarData(app, themeConfig),
      prepareThemeColorScss(app, themeConfig)
    },
    extendsPage: (page) => extendsPage(app, themeOptions as WeaselThemeConfig, plugins, page as Page<ThemePageData>, app.env.isDev),
    // 主题默认的插件
    plugins: createPluginConfig(plugins, themeConfig),
    // 主题布局
    layouts: createLayout(app),
    clientConfigFile: (app) => prepareClientConfigFile(app, status)
  }
}

export default weaselTheme
