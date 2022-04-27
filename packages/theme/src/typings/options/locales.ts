/**
 * local config
 */

import { LocaleData } from "@vuepress/core";
import { ThemeBlogLocaleData, ThemeFeatureConfig, ThemeFeatureLocaleConfig, ThemeFeatureLocaleData } from "./feature";
import { ThemeLayoutLocaleData, ThemeLayoutLocaleOptions } from "./layout";
import { ThemeMetaLocateData } from "./layout/meta";

export interface ThemeLocaleOptions extends LocaleData {}

export interface ThemeLocaleData extends ThemeFeatureLocaleData, ThemeLayoutLocaleData {
  /**
   * Current lang code
   */
  lang?: string;

  /**
   * blog相关的locale
   */
  blogLocales?: ThemeBlogLocaleData;

  /**
   * Page locate config
   */
  metaLocales?: ThemeMetaLocateData;
}

/**
 * 主题相关的locale配置
 */
export type ThemeLocaleConfig = ThemeLocaleData & ThemeFeatureLocaleConfig & ThemeFeatureConfig & ThemeLayoutLocaleData & ThemeLayoutLocaleOptions & LocaleData
