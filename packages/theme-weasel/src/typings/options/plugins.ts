/**
 * weasel theme plugins options
 */
export interface WeaselThemePluginsOptions {
  /**
   * Enable @vuepress/plugin-active-header-links or not
   */
  activeHeaderLinks?: boolean;

  /**
   * Enable @vuepress/plugin-back-to-top or not
   */
  backToTop?: boolean;

  /**
   * Enable @vuepress/plugin-container or not
   */
  container?: {
    tip?: boolean;
    warning?: boolean;
    danger?: boolean;
    details?: boolean;
    codeGroup?: boolean;
    codeGroupItem?: boolean;
  };

  /**
   * Enable @vuepress/plugin-git or not
   */
  git?: boolean;

  /**
   * Enable @vuepress/plugin-nprogress or not
   */
  nprogress?: boolean;

  /**
   * Enable @vuepress/plugin-prismjs or not
   */
  prismjs?: boolean;
}
