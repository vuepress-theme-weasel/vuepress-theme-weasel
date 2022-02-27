import { BasePageFrontMatter } from "@mr-huang/vuepress-theme-weasel/lib/typings/frontmatter"

export interface BlogCategoryFrontmatterOptions {
  type: "category";
  key: string;
  name?: string;
}

export interface BlogTypeFrontmatterOptions {
  type: "type";
  key: string;
}

export interface BlogPluginFrontmatter extends BasePageFrontMatter {
  blog: BlogCategoryFrontmatterOptions | BlogTypeFrontmatterOptions;
}
