import type { Theme } from "@vuepress/core"
import { path } from '@vuepress/utils'

type WeaselThemeOptions = {}

export const WeaselTheme: Theme<WeaselThemeOptions> = () => {
  return {
    name: 'vuepress-theme-weasel',
    layouts: path.resolve(__dirname, "../client/layouts"),
    clientAppEnhanceFiles: path.resolve(__dirname, '../client/appEnhance.js')
  }
}

export default WeaselTheme