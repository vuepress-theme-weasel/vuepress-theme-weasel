import { computed } from "vue"
import { useThemeData, useThemeLocaleData } from "@theme-weasel/composables"

import type { ComputedRef } from "vue"
import type { ThemeBlogConfig } from "../../../../typings"

/**
 * 博客插件配置
 * @returns
 */
export const useBlogOptions = (): ComputedRef<ThemeBlogConfig> => {
  const themeData = useThemeData()
  const themeLocale = useThemeLocaleData()
  return computed(() => ({
    ...themeData.value.blog,
    ...themeLocale.value.blog
  }))
}
