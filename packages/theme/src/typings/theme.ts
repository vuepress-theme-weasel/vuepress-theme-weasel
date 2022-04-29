import { LocaleConfig } from "@vuepress/core";
import { ThemeData } from "@vuepress/plugin-theme-data";
import { ArticleInfoLocaleData } from "./articleInfo";
import { ThemeLocaleConfig, ThemePluginsOptions } from "./options";
import { PaginationLocaleData } from "./pagination";

export interface WeaselThemeConfig extends ThemeData<ThemeLocaleConfig> {
  // locales: Record<string, ThemeLocaleConfig>;
   /**
   * Locales config for pagination
   *
   * 分页的国际化配置
   */
  paginationLocales?: LocaleConfig<PaginationLocaleData>;

  /**
   * Locales config for articleInfo
   *
   * 文章信息的国际化配置
   */
  articleInfoLocales?: LocaleConfig<ArticleInfoLocaleData>;
}

export interface WeaselThemeOptions extends ThemeData {
  plugin?: ThemePluginsOptions
}
