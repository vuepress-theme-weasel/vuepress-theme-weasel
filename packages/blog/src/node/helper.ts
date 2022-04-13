import { PluginConfig } from "@vuepress/core";
import { BlogOptions, DirectoryClassifierOption } from "../typings";

/**
 * 文章分类器->目录分类器
 * @param options
 */
export const directoryClassifier = (options: DirectoryClassifierOption) => {
  console.log(options)
}

/**
 * blog 插件初始化
 */
export const blogPluginInit = (options: BlogOptions | false): PluginConfig<BlogOptions> => {
  return ['@mr-huang/vuepress-plugin-blog', options]
}
