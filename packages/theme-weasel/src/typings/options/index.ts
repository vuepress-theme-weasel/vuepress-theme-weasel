/**
 * weasel theme config options
 */
import type { ThemeData } from '@vuepress/plugin-theme-data'
import { WeaselThemePluginsOptions } from './plugins'
export interface WeaselThemeOptions extends ThemeData {
  plugins?: WeaselThemePluginsOptions
}

export * from './feature'

export * from './plugins'

export * from './layout'

export * from './locales'

export * from './options'
