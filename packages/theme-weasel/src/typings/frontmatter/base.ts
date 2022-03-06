import type { BasePageFrontMatter } from '@mr-huang/vuepress-shared'
// import type { WeaselThemeSidebarConfig } from "../sidebar";

export interface WeaselThemePageFrontmatter extends BasePageFrontMatter {
  /**
   * Whether enable navbar
   *
   * 是否启用导航栏
   */
  navbar?: boolean;

  /**
   * Sidebar configuration
   *
   * 侧边栏配置
   */
  // sidebar?: "auto" | false | WeaselThemeSidebarConfig;

  /**
   * Addtional Class for Page container
   *
   * 页面容器的额外类名
   */
  containerClass?: string;

  /**
   * Whether show toc list in desktop mode
   *
   * 是否在桌面模式下展示标题列表
   */
  toc?: boolean;
}
