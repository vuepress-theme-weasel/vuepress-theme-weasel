/**
 * local config
 */

import { LocaleData } from "@vuepress/core";
import { ThemeBlogLocaleData, ThemeFeatureConfig, ThemeFeatureLocaleConfig, ThemeFeatureLocaleData } from "./feature";
import { ThemeLayoutLocaleData, ThemeLayoutLocaleOptions, ThemeRouteLocaleData } from "./layout";
import { ThemeMetaLocateData } from "./layout/meta";
import { ThemeNavbarLocaleOptions } from './../navbar';

export interface ThemeLocaleOptions extends LocaleData {}

export interface ThemeLocaleData extends ThemeFeatureLocaleData, ThemeLayoutLocaleData, ThemeNavbarLocaleOptions {
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

  /**
   * 页面相关的local config
   */
  routeLocales?: ThemeRouteLocaleData;

  /**
   * 外观
   */
  outlookLocales?: {
    /**
     * Theme Color
     *
     * 主题色
     */
    themeColor: string;

    /**
     * Theme mode
     *
     * 夜间模式
     */
    darkmode: string;

    /**
     * Fullscreen text
     *
     * 全屏文字
     */
    fullscreen: string;

    /**
     * pure model text
     *
     * 沉浸模式文字
     */
    pure: string
  };
}

/**
 * 主题相关的locale配置
 */
export type ThemeLocaleConfig = ThemeLocaleData & ThemeFeatureLocaleConfig & ThemeFeatureConfig & ThemeLayoutLocaleData & ThemeLayoutLocaleOptions & LocaleData
