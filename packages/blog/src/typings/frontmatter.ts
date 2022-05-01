import { BasePageFrontMatter } from '@mr-huang/vuepress-shared'

/**
 * 博客分类frontmatter选项
 */
export interface BlogFrontmatterOptions {
  type: "frontmatter";
  /**
   * Unique key under current category
   *
   * 在当前分类下全局唯一的 key
   */
  key: string;
  /**
   * Current category name
   *
   * @description Only available in category item page
   *
   * 当前的分类名称
   *
   * @description 仅在分类子项目页面中可用
   */
  name?: string;
}

/**
 * 博客类型选项
 */
export interface BlogPageTypeFrontmatterOptions {
  type: "type";
  /**
   * Unique key under current category
   *
   * 在当前分类下全局唯一的 key
   */
  key: string;
}

export interface BlogPluginCategoryFrontmatter extends BasePageFrontMatter {
  blog: BlogFrontmatterOptions;
}

export interface BlogPluginTypeFrontmatter extends BasePageFrontMatter {
  blog: BlogPageTypeFrontmatterOptions;
}

/**
 * 博客frontmatter
 */
export type BlogPluginFrontmatter =
  | BlogPluginCategoryFrontmatter
  | BlogPluginTypeFrontmatter;
