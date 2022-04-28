import { Author } from "@mr-huang/vuepress-shared";
import { ThemeFeatureConfig } from "./feature";
import { ThemeLayoutOptions } from "./layout";
import { ThemeLocaleConfig } from "./locales";

export interface ThemeRootConfig extends ThemeFeatureConfig, ThemeLocaleConfig, ThemeLayoutOptions {
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
