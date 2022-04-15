/**
 * 插件参数相关的类型
 */
import { DirectoryClassifierOption } from './directoryClassifier';
import { Page } from "@vuepress/core";

/**
 * page type classifier
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
 * frontmatter 分类器
 */
export interface FrontmatterClassifierOptions {
  /**
   * Unique category name
   *
   * 唯一的分类名称
   */
  key: string;

  /**
   * Function getting category from page
   *
   * 从页面中获取分类的函数
   */
  getter: (page: Page) => string[];

  /**
   * A custom function to sort the pages
   *
   * 页面排序器
   */
  sorter?: (pageA: Page, pageB: Page) => number;

  /**
   * Path pattern
   *
   * @description `:key` will be replaced by the "slugify" result of the orginal key
   *
   * 路径图案
   *
   * @description `:key` 将会被替换为原 key 的 slugify 结果
   *
   * @default `/:key/`
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

  /**
   * Path pattern or custom function
   *
   * @description When filling in a string, `:key` and `:name` will be replaced by the "slugify" result of the orginal key and name
   *
   * 路径图案或自定义函数
   *
   * @description 当填入字符串的时候, `:key` 和 `:name` 会被自动替换为原始的 key、name 的 slugify 结果。
   *
   * @default `/:key/:name/`
   */
  itemPath?: string | ((name: string) => string);

  /**
   * Item layout name
   *
   * 项目布局组件名称
   *
   * @default 'Layout'
   */
  itemLayout?: string;
}

/**
 * 插件参数
 */
export interface BlogOptions {

  /**
   * frontmatter 分类器配置
   *
   * frontmatter classifier
   */
  frontmatterClassifier?: FrontmatterClassifierOptions[];

  /**
   * 页面分类器配置
   *
   * Types config
   *
   * @default []
   */
  pageTypeClassifier?: PageTypeOptions[];

  /**
   * 目录分类器 根据目录统一管理页面
   *
   * directory classifier
   *
   * @default []
   */
  directoryClassifier?: DirectoryClassifierOption[];

  /**
   * Key used when injecting info to route meta.
   *
   * 注入文章信息至路由元数据时使用的键名。
   *
   * @default '_blog'
   */
  metaScope?: string;

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
