/**
 * weasel theme config options
 */
import type { ThemeData } from '@vuepress/plugin-theme-data'
import { WeaselThemePluginsOptions } from './plugins'
export * from './plugins'
export interface WeaselThemeOptions extends ThemeData {
  plugins: WeaselThemePluginsOptions
}

