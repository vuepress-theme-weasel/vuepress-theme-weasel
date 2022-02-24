import type { PageFrontmatter } from "@vuepress/core";
// import { Author } from "./author";

export interface HomeFeature {
  title: string
  details?: string
}

export interface BasePageFrontMatter extends PageFrontmatter {
  /** Page icon */
  icon?: string;
  /** Page Author(s) */
  // author?: Author | false;
  /** Whether the content is original */
  original?: boolean;
  /**
   * Page Category(ies)
   */
  category?: string | string[];
  /**
   * Writting Date
   */
  date?: Date;

  /**
   * Page Tag(s)
   */
  tag?: string[] | string;

  /**
   * Whether the page is an article
   */
  article?: boolean;
  /**
   * Page Cover
   */
  cover?: string;
  /**
   * Page Banner
   */
  banner?: string;
  /**
   * 页脚文字
   */
  footer?: string | boolean;
  /**
   * 版权文字
   */
  copyrightText?: string | false;

  /**
   * 是否是主页
   *
   * Whether is home page
   */
  home?: boolean;

  /**
   * 是否是项目主页
   */
  project?: boolean;

  /**
   * 是否是博客的主页
   */
  blog?: boolean;

  /**
   * @deprecated use `date` instead
   */
  time?: Date | string;

  /**
   * @deprecated use `category` instead
   */
  categories?: string[];
  /**
   * @deprecated use `tag` instead
   */
  tags?: string[];
  /**
   * 特性
   */
  features?: HomeFeature[]
}

export interface WeaselThemePageFrontmatter extends BasePageFrontMatter {
  navbar?: boolean;
  // pageClass?: string;
  // medialinks?: MediaLinksConfig | false;
}
