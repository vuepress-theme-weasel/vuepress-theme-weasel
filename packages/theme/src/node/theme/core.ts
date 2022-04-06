import { createAlias } from './alias';
import type { Theme } from '@vuepress/core'
import { WeaselThemeConfig } from '../../typings'
import { logger } from '../utils'

// @ts-ignore
export const weaselTheme: Theme<WeaselThemeConfig> = (plugins, app) => {
  logger.info("========= 主题阶段开始 ===========")
  logger.info(app.options.source)
  return {
    name: 'vuepress-theme-weasel',
    alias: createAlias(app),
    onPrepared() {
    },
    async extendsPage() {
    }
  }
}

export default weaselTheme
