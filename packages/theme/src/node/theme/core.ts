import { prepareSidebarData } from './../plugins/sidebar';
import { createPluginConfig } from './../plugins/index';
import { createClientAppSetupFiles } from './clientAppSetupFiles';
import { createClientAppEnhanceFiles } from './clientAppEnhanceFiles';
import { createLayout } from './layout';
import { createAlias } from './alias';
import type { Theme } from '@vuepress/core'
import { WeaselThemeOptions } from '../../typings'
import { getThemeConfig, logger } from '../utils'
import { getDefine } from './define';

// @ts-ignore
export const weaselTheme: Theme<WeaselThemeOptions> = ({ plugins = {}, ...themeOptions }, app) => {
  logger.info("========= 主题阶段开始 ===========")
  logger.info(app.options.source)
  const themeConfig = getThemeConfig(app, themeOptions);

  return {
    name: 'vuepress-theme-weasel',
    alias: createAlias(app),
    define: getDefine(app, themeConfig),
    // 初始化之前的配置
    onPrepared: () => {
      prepareSidebarData(app, themeConfig)
    },
    // 主题默认的插件
    plugins: createPluginConfig(app, plugins, themeOptions),
    // 主题布局
    layouts: createLayout(app),
    // 主题客户端注入入口，主要用于插件和样式注入
    clientAppEnhanceFiles: createClientAppEnhanceFiles(app),
    // 主题客户端注入入口，主要用于注入hooks
    clientAppSetupFiles: createClientAppSetupFiles(app)
  }
}

export default weaselTheme
