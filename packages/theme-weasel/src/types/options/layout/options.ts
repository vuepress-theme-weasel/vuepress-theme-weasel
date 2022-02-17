// import type { PageInfo } from "@mr-huang/vuepress-plugin-components";
import type { WeaselThemeFooterLocaleOptions } from "./footer";
import type {
  WeaselThemeMetaLocaleOptions,
  WeaselThemeMetaLocateData,
} from "./meta";
import type {
  WeaselThemeNavbarLocaleData,
  WeaselThemeNavbarLocaleOptions,
} from "./navbar";
import type { WeaselThemeSidebarLocaleOptions } from "./sidebar";
import type { WeaselThemeRouteLocaleData } from "./route";

export interface WeaselThemeLayoutLocaleData {
  navbarLocales: WeaselThemeNavbarLocaleData;
  /**
   * Page locate config
   */
  metaLocales: WeaselThemeMetaLocateData;

  routeLocales: WeaselThemeRouteLocaleData;
}

export interface WeaselThemeLayoutLocaleOptions {
  /**
   * Home path of current locale
   *
   * Used as the link of back-to-home and navbar logo
   */
  home?: string;
  /**
   * Navbar
   */
  navbar?: WeaselThemeNavbarLocaleOptions;

  /**
   * Sidebar
   */
  sidebar?: WeaselThemeSidebarLocaleOptions;

  /**
   * Page footer
   */
  footer?: WeaselThemeFooterLocaleOptions;

  /**
   * Page meta
   */
  meta?: WeaselThemeMetaLocaleOptions;
}

export interface WeaselThemeLayoutOptions {
  /**
   * Page Info display configuration
   *
   * @see https://vuepress-theme-Weasel.github.io/components/guide/pageinfo/
   *
   * 文章信息配置
   *
   * @see https://vuepress-theme-Weasel.github.io/components/zh/guide/pageinfo/
   *
   * @default ['author', 'visitor', 'time', 'category', 'tag', 'reading-time']
   */
  // pageInfo?: PageInfo[];
}
