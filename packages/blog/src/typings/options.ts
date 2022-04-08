/**
 * 插件参数相关的类型
 */
import { Page } from "@vuepress/core";

/**
 * page type
 */
export interface PageTypeOptions {
  /**
   * Unique type name
   *
   * 唯一的类型名称
   */
  key: string;

  /**
   * A filter function to determine whether a page should be the type
   *
   * 一个过滤函数来决定页面是否满足此类型
   */
  filter: (page: Page) => boolean;

  /**
   * A custom function to sort the pages
   *
   * 页面排序器
   */
  sorter?: (pageA: Page, pageB: Page) => number;

  /**
   * Path to register
   *
   * 需要注册的页面路径
   *
   * @default '/:key/'
   */
  path?: string;

  /**
   * Layout name
   *
   * 布局组件名称
   *
   * @default 'Layout'
   */
  layout?: string;
}

/**
 * 插件参数
 */
export interface BlogOptions {
  /**
   * 页面类型配置
   *
   * Types config
   *
   * @default []
   */
  type?: PageTypeOptions[];
  /**
   * Page filter, determine whether a page should be included.
   *
   * 页面过滤器，此函数用于鉴别页面是否作为文章。
   *
   * @default (page) => Boolean(page.filePathRelative) && !page.frontmatter.home
   */
  filter?: (page: Page) => boolean;
  /**
   * Slugify function
   *
   * Slugify 函数
   *
   * @default (name) => name.replace(/ _/g, '-').toLowerCase()
   */
  slugify?: (name: string) => string;
}
