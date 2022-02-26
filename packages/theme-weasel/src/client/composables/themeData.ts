import {
  useThemeData as _useThemeData,
  useThemeLocaleData as _useThemeLocaleData,
} from '@vuepress/plugin-theme-data/lib/client'
import { computed } from 'vue'

import type {
  ThemeDataRef,
  ThemeLocaleDataRef,
} from '@vuepress/plugin-theme-data/lib/client'
import type { ComputedRef } from 'vue'
import type { WeaselThemeConfig, WeaselThemeLocaleConfig } from '../../typings'

// 主题数据
export const useThemeData = (): ThemeDataRef<WeaselThemeConfig> =>
  _useThemeData<WeaselThemeConfig>()

// 本地化数据
export const useThemeLocaleData =
  (): ThemeLocaleDataRef<WeaselThemeLocaleConfig> =>
    _useThemeLocaleData<WeaselThemeLocaleConfig>()

// 图标前缀
export const useIconPrefix = (): ComputedRef<string> =>
  computed(() => useThemeData().value.iconPrefix)

// 是否是纯净模式
export const usePure = (): ComputedRef<boolean> =>
  computed(() => Boolean(useThemeData().value.pure))
