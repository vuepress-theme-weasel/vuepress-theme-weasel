import { BasePageFrontMatter } from '@mr-huang/vuepress-shared'

/**
 * 博客分类frontmatter选项
 */
export interface BlogCategoryFrontmatterOptions {
  type: "category";
  key: string;
  name?: string;
}

/**
 * 博客类型选项
 */
export interface BlogTypeFrontmatterOptions {
  type: "type";
  key: string;
}

/**
 * 博客frontmatter
 */
export interface BlogPluginFrontmatter extends BasePageFrontMatter {
  blog: BlogCategoryFrontmatterOptions | BlogTypeFrontmatterOptions;
}
