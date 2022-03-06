import type { Author } from "@mr-huang/vuepress-shared";
import type { ThemeData } from "@vuepress/plugin-theme-data";
import type {
  WeaselThemeFeatureConfig,
  WeaselThemeFeatureOptions,
} from "./feature";
import type { WeaselThemeLayoutOptions } from "./layout";
import type { WeaselThemeLocaleConfig, WeaselThemeLocaleOptions } from "./locales";
import type { WeaselThemePluginsOptions } from "./plugins";

export interface WeaselThemeRootOptions
  extends WeaselThemeFeatureOptions,
    WeaselThemeLayoutOptions {
  /**
   * Global default author
   *
   * 全局默认作者
   */
  author?: Author;

  /**
   * domain which to be deployed to
   *
   * 网站部署域名
   */
  hostname?: string;
}

export interface WeaselThemeRootConfig
  extends WeaselThemeFeatureConfig,
    WeaselThemeLayoutOptions {
  /**
   * Global default author
   *
   * 全局默认作者
   */
  author?: Author;

  /**
   * domain which to be deployed to
   *
   * 网站部署域名
   */
  hostname?: string;
}

export interface WeaselThemeOptions
  extends WeaselThemeRootOptions,
    ThemeData<WeaselThemeLocaleOptions> {
  plugins?: WeaselThemePluginsOptions;
}

export type WeaselThemeConfig = WeaselThemeRootConfig &
  ThemeData<WeaselThemeLocaleConfig>;
