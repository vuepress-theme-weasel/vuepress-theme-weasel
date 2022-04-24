/**
 * local config
 */

import { LocaleData } from "@vuepress/core";
import { ThemeFeatureConfig, ThemeFeatureLocaleConfig, ThemeFeatureLocaleData } from "./feature";
import { ThemeLayoutLocaleData, ThemeLayoutLocaleOptions } from "./layout";

export interface ThemeLocaleOptions extends LocaleData {}

export interface ThemeLocaleData extends ThemeFeatureLocaleData, ThemeLayoutLocaleData {
  /**
   * Current lang code
   */
  lang?: string;
}

/**
 * 主题相关的locale配置
 */
export type ThemeLocaleConfig = ThemeLocaleData & ThemeFeatureLocaleConfig & ThemeFeatureConfig & ThemeLayoutLocaleData & ThemeLayoutLocaleOptions & LocaleData
