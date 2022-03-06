import { computed } from "vue"
import { useThemeData, useThemeLocaleData } from "@theme-weasel/composables"

import type { ComputedRef } from "vue"
import type { WeaselThemeBlogConfig } from "../../../../typings"

export const useBlogOptions = (): ComputedRef<WeaselThemeBlogConfig> => {
  const themeData = useThemeData()
  const themeLocale = useThemeLocaleData()

  return computed(() => ({
    ...themeData.value.blog,
    ...themeLocale.value.blog
  }))
}
