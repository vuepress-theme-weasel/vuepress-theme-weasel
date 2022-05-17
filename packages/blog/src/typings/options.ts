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
  filter: <
    ExtraPageData extends Record<string | number | symbol, unknown> = Record<
      never,
      never
    >,
    ExtraPageFrontmatter extends Record<
      string | number | symbol,
      unknown
    > = Record<string, unknown>,
    ExtraPageFields extends Record<string | number | symbol, unknown> = Record<
      never,
      never
    >
  >(
    page: Page<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>
  ) => boolean;

  /**
   * A custom function to sort the pages
   *
   * 页面排序器
   */
  sorter?: <
    ExtraPageData extends Record<string | number | symbol, unknown> = Record<
      never,
      never
    >,
    ExtraPageFrontmatter extends Record<
      string | number | symbol,
      unknown
    > = Record<string, unknown>,
    ExtraPageFields extends Record<string | number | symbol, unknown> = Record<
      never,
      never
    >
  >(
    pageA: Page<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>,
    pageB: Page<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>
  ) => number;

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

  /**
   * Frontmatter
   *
   * Front Matter 配置
   */
  frontmatter?: (localePath: string) => Record<string, unknown>;
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
  getter: <
    ExtraPageData extends Record<string | number | symbol, unknown> = Record<
      never,
      never
    >,
    ExtraPageFrontmatter extends Record<
      string | number | symbol,
      unknown
    > = Record<string, unknown>,
    ExtraPageFields extends Record<string | number | symbol, unknown> = Record<
      never,
      never
    >
  >(
    page: Page<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>
  ) => string[];

  /**
   * A custom function to sort the pages
   *
   * 页面排序器
   */
  sorter?: <
    ExtraPageData extends Record<string | number | symbol, unknown> = Record<
      never,
      never
    >,
    ExtraPageFrontmatter extends Record<
      string | number | symbol,
      unknown
    > = Record<string, unknown>,
    ExtraPageFields extends Record<string | number | symbol, unknown> = Record<
      never,
      never
    >
  >(
    pageA: Page<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>,
    pageB: Page<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>
  ) => number;

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
   * Frontmatter
   *
   * Front Matter 配置
   */
  frontmatter?: (localePath: string) => Record<string, unknown>;

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

  /**
   * Items Frontmatter
   *
   * 项目 Front Matter 配置
   */
  itemFrontmatter?: (
    name: string,
    localePath: string
  ) => Record<string, unknown>;
}

/**
 * 插件参数
 */
export interface BlogOptions {
  /**
   * Function getting article info.
   *
   * 获取文章信息的函数。
   */
  getInfo?: <
    ExtraPageData extends Record<string | number | symbol, unknown> = Record<
      never,
      never
    >,
    ExtraPageFrontmatter extends Record<
      string | number | symbol,
      unknown
    > = Record<string, unknown>,
    ExtraPageFields extends Record<string | number | symbol, unknown> = Record<
      never,
      never
    >
  >(
    page: Page<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>
  ) => Record<string, unknown>;

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
  filter?: <
    ExtraPageData extends Record<string | number | symbol, unknown> = Record<
      never,
      never
    >,
    ExtraPageFrontmatter extends Record<
      string | number | symbol,
      unknown
    > = Record<string, unknown>,
    ExtraPageFields extends Record<string | number | symbol, unknown> = Record<
      never,
      never
    >
  >(
    page: Page<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>
  ) => boolean;

  /**
   * Slugify function
   *
   * Slugify 函数
   *
   * @default (name) => name.replace(/ _/g, '-').toLowerCase()
   */
  slugify?: (name: string) => string;

  /**
   * Whether enable hotReload
   *
   * @description This may have performance impact in large sites
   *
   * 是否启用热更新
   *
   * @description 在大型站点上，这可能会有性能影响
   *
   * @default false
   */
  hotReload?: boolean;
}
