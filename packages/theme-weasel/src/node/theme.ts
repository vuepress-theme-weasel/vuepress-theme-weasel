import type { Theme } from "@vuepress/core"
import { path } from '@vuepress/utils'
import { getPluginConfig } from './plugins'
import type { WeaselThemeOptions } from "../types";

export const WeaselTheme: Theme<WeaselThemeOptions> = (
  { plugins = {}, ...localeOptions },
  app
) => {
  console.log('app', app)
  return {
    name: 'vuepress-theme-weasel',
    layouts: path.resolve(__dirname, "../client/layouts"),
    clientAppEnhanceFiles: path.resolve(__dirname, '../client/appEnhance.js'),
    plugins: getPluginConfig(plugins, localeOptions)
  }
}

export default WeaselTheme