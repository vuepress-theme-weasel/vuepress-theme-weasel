import { PluginConfig } from "@vuepress/core";
import { BlogOptions } from "../typings";

/**
 * blog 插件初始化
 */
export const blogPluginInit = (options: BlogOptions | false): PluginConfig<BlogOptions> => {
  return ['@mr-huang/vuepress-plugin-blog', options]
}
