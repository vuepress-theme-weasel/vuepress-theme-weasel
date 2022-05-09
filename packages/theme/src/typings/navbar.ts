import { AutoLink, TextItem } from "./utils";

/**
 * Base nav group, has nav items children
 */
export interface ThemeNavGroup<T> extends TextItem {
  prefix?: string;
  link?: string;
  children: T[];
}

/**
 * 本地化数据配置
 */
export interface ThemeNavbarLocaleData {
  /**
   * Navbar language selection config
   *
   * Text of the language selection dropdown
   */
  selectLangText: string;

  /**
   * Navbar language selection config
   *
   * Aria label of of the language selection dropdown
   */
  selectLangAriaLabel: string;

  /**
   * Navbar language selection config
   *
   * Language name of current locale
   *
   * Displayed inside the language selection dropdown
   */
  langName: string;
}

/**
 * 导航栏配置
 */
export interface ThemeNavbarLocaleOptions {
  /**
   * Navbar config
   *
   * @description Set to `false` to disable navbar in current locale
   * @see https://vuepress-theme-hope.github.io/v2/guide/layout/navbar.html
   *
   * 导航栏配置
   *
   * @description 设置 `false` 以在当前语言中禁用导航栏
   * @see https://vuepress-theme-hope.gitee.io/v2/zh/guide/layout/navbar.html
   */
  navbar?: ThemeNavbarConfig | false;

  /**
   * Navbar logo
   *
   * should be absolute path relative to `.vuepress/public` folder
   *
   * 导航栏图标
   *
   * 应为基于 `.vuepress/public` 文件夹的绝对路径
   */
  logo?: string | null;

  /**
   * Navbar logo under darkmode
   *
   * should be absolute path relative to `.vuepress/public` folder
   *
   * 夜间模式下导航栏图标
   *
   * 应为基于 `.vuepress/public` 文件夹的绝对路径
   */
  logoDark?: string | null;

  /**
   * Repository link
   *
   * 仓库链接
   */
  repo?: string | null;

  /**
   * Whether display repo link in navbar.
   *
   * 是否在导航栏显示仓库链接。
   *
   * @default true
   */
  repoDisplay?: boolean;

  /**
   * Repository aria label of navbar
   *
   * 导航栏仓库按钮的无障碍标签
   */
  repoLabel?: string | null;

  /**
   * Whether show icon in navbar
   *
   * 是否在导航栏中显示图标
   *
   * @default true
   */
  navbarIcon?: boolean;

  /**
   * Whether to hide navbar when scrolling down
   *
   * 是否在向下滚动时自动隐藏导航栏
   *
   * @default 'mobile'
   */
  navbarAutoHide?: "always" | "mobile" | "none";

  /**
   * Whether hide site title on mobile
   *
   * 是否在移动视图下隐藏站点名称
   *
   * @default true
   */
  hideSiteNameonMobile?: boolean;
}

/**
 * Navbar types
 */
// user config
export type ThemeNavbarItem = AutoLink;
export type ThemeNavbarGroup = ThemeNavGroup<ThemeNavbarGroup | ThemeNavbarItem | string>;
export type ThemeNavbarConfig = (
  | ThemeNavbarItem
  | ThemeNavbarGroup
  | string
)[];

// resolved
export type ResolvedThemeNavbarItem =
  | ThemeNavbarItem
  | ThemeNavGroup<AutoLink | ThemeNavGroup<AutoLink>>;
