import type { ComponentOptions } from '@mr-huang/vuepress-plugin-components'
import type { WeaselThemePluginsOptions, WeaselThemeOptions } from '../../typings'

export const resolveComponentsOptions = (
  plugins: WeaselThemePluginsOptions,
  themeConfig: WeaselThemeOptions
): ComponentOptions => ({
  articleInfo: true,
  backToTop: themeConfig.backToTop !== false,
  backToTopThreshold:
    typeof themeConfig.backToTop === "number" ? themeConfig.backToTop : 300,
  breadcrumb: true,
  badge: true,
  fullScreen: themeConfig.fullScreen !== false,
  pagination: Boolean(plugins.blog),
  toc: true
})
