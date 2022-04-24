import { ThemeBlogConfig } from "./blog"

export interface ThemeFeatureLocaleData {}

/**
 * feature options
 */
export interface ThemeFeatureOptions {
}

/**
 * feature config
 */
export type ThemeFeatureConfig = Required<ThemeFeatureOptions>

/**
 * feature locale config
 */
export interface ThemeFeatureLocaleConfig {
  blog: ThemeBlogConfig
}
