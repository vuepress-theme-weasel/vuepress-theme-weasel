import { ConvertLocaleConfig } from "./locales";

/**
 * Type of article infomation
 *
 * 文章信息类型
 */
export type ArticleInfo =
  | "Author"
  | "Category"
  | "Date"
  | "Original"
  | "PageView"
  | "Tag"
  | "ReadingTime"
  | "Word";


/**
 * about article local config
 *
 * 文章相关的local配置
 */
export interface ArticleInfoLocaleData {
  /**
   * Author label text
   *
   * 作者文字
   */
  author: string;

  /**
   * Writing date label text
   *
   * 写作日期文字
   */
  date: string;

  /**
   * Label text marked as original
   *
   * 标记原创的文字
   */
  isOrigin: string;

  /**
   * Page views label text
   *
   * 访问量文字
   */
  views: string;

  /**
   * Tag label text
   *
   * 标签文字
   */
  tag: string;

  /**
   * Category label text
   *
   * 分类文字
   */
  category: string;

  /**
   * Expect reading time label text
   *
   * 期望阅读时间文字
   */
  readingTime: string;

  /**
   * Words label Text
   *
   * 文章字数
   */
  words: string;
}

/**
 * 文章locale配置
 */
export type ArticleInfoLocaleConfig = ConvertLocaleConfig<ArticleInfoLocaleData>;

/**
 * 文章分类
 */
export interface ArticleCategory {
  /**
   * Category name
   *
   * 分类名称
   */
  name: string;

  /**
   * Category path
   *
   * 分类路径
   */
  path?: string;
}

/**
 * 文章标签
 */
export type ArticleTag = ArticleCategory;
