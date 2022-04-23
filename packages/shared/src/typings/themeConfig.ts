import type { ThemeConfig } from '@vuepress/core'

/**
 * 基础的主题配置
 */
export interface BaseThemeConfig extends ThemeConfig {
  /**
   * Theme locales config
   *
   * 主题多语言配置
   */
  locales?: Record<string, Record<string, unknown> & { lang?: string }>
}
