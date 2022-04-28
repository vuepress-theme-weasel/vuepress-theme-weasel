
/**
 * vuepress frontmatter base for all packages
 */
import { PageFrontmatter } from "@vuepress/core"
import { Author } from "@mr-huang/vuepress-shared";

/**
 * 页面frontmatter
 */
export interface BasePageFrontMatter extends PageFrontmatter {
  /**
   * Page icon
   *
   * 页面图标
   */
  icon?: string;

  /**
   * Page Author(s)
   *
   * 页面作者
   */
  author?: Author | false;

  /**
   * Writting Date
   *
   * 写作日期
   */
  date?: Date;

  /**
   * Page Category(ies)
   *
   * 页面分类
   */
  category?: string | string[];

  /**
   * Page Tag(s)
   *
   * 页面标签
   */
  tag?: string[] | string;

  /**
   * Whether the content is original
   *
   * 是否原创
   */
  isOriginal?: boolean;

  /**
   * Page summary
   *
   * 页面摘要
   */
  summary?: string;

  /**
   * Whether the page is an article
   *
   * 页面是否是文章
   */
  article?: boolean;

  /**
   * Page Cover
   *
   * 页面封面
   */
  cover?: string;

  /**
   * Page Banner
   *
   * 页面 Banner 图
   */
  banner?: string;

  /**
   * Footer text
   *
   * 页脚文字
   */
  footer?: string | boolean;

  /**
   * Copyright text
   *
   * 版权文字
   */
  copyright?: string | false;

  /**
   * Whether is home page
   *
   * 是否是主页
   */
  home?: boolean;

  /**
   * @deprecated use `date` instead
   */
  time?: Date | string;

  /**
   * 版权文字
   */
  copyrightText?: string | false;

  /**
   * 特性
   */
  // features?: HomeFeature[]
}
