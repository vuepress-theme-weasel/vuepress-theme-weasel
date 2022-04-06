/**
 * page frontmatter base
 */

import { PageFrontmatter } from "@vuepress/core"

/**
 * 页面frontmatter
 */
export interface WeaselThemePageFrontmatter extends PageFrontmatter {

  /**
   * Whether is home page
   *
   * 是否是主页
   */
  home?: boolean;
}
