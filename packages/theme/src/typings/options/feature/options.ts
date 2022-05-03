import { ThemeBlogConfig, ThemeBlogLocaleData } from "./blog"

export interface ThemeFeatureLocaleData {
  blogLocales?: ThemeBlogLocaleData;
}

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
