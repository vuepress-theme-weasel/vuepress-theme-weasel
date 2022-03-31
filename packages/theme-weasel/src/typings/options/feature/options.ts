import type {
  WeaselThemeBlogConfig,
  WeaselThemeBlogLocaleData,
  WeaselThemeBlogOptions,
} from './blog'
import type {
  WeaselThemeEncryptLocaleData,
  WeaselThemeEncryptOptions,
} from './encrypt'

export interface WeaselThemeFeatureLocaleData {
  blogLocales?: WeaselThemeBlogLocaleData

  /**
   * Encrypt
   */
  // encryptLocales: WeaselThemeEncryptLocaleData
}

export interface WeaselThemeFeatureLocaleOptions {
  /**
   * Blog feature
   */
  blog?: WeaselThemeBlogOptions
}

export interface WeaselThemeFeatureLocaleConfig {
  blog: WeaselThemeBlogConfig
}

export interface WeaselThemeFeatureOptions {
  /**
   * Encrypt config
   *
   * 加密配置
   */
  encrypt?: WeaselThemeEncryptOptions
}

export type WeaselThemeFeatureConfig = Required<WeaselThemeFeatureOptions>
