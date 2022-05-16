import { BlogOptions } from "@mr-huang/vuepress-plugin-blog"
import type { CommentOptions } from '@mr-huang/vuepress-plugin-comment'

/**
 * blog plugin option
 */
export interface ThemeBlogPluginOptions extends Pick<BlogOptions, 'filter'> {
  /**
   * Path of article list
   *
   * 文章列表的路径
   *
   * @default '/article/'
   */
  article?: string

  /**
   * Path of category map
   *
   * 分类地图页的地址
   *
   * @default '/category/'
   */
  category?: string

  /**
   * Path to navigate when clicking category label
   *
   * `:name` will be automatically replaced by currect category name
   *
   * 点击分类标签时跳转的路径。
   *
   * 其中 `:name` 会被自动替换为当前分类名称
   *
   * @default '/category/:name/'
   */
  categoryItem?: string

  /**
   * Path of tag map
   *
   * 标签地图页的地址
   *
   * @default '/tag/'
   */
  tag?: string

  /**
   * Path to navigate when clicking tag label
   *
   * `:name` will be automatically replaced by currect tag name
   *
   * 点击标签跳转的路径。
   *
   * 其中 `:name` 会被自动替换为当前分类名称
   *
   * @default '/tag/:name/'
   */
  tagItem?: string

  /**
   * Path of encrypted article list
   *
   * 加密文章列表的路径
   *
   * @default '/encrypted/'
   */
  encrypted?: string

  /**
   * Path of slide list
   *
   * 幻灯片列表的路径
   *
   * @default '/slide/'
   */
  slides?: string

  /**
   * Path of picture list
   *
   * 图片列表的路径
   *
   * @default '/pictures/'
   */
  pictures?: string

  /**
   * Path of star article list
   *
   * 星标文章列表的路径
   *
   * @default '/star/''
   */
  star?: string

  /**
   * Path of timeline
   *
   * 时间线路径
   *
   * @default '/timeline/'
   */
  timeline?: string

  /**
   * Whether generate a excerpt automatically
   *
   * 是否自动生成摘要
   *
   * @default false
   */
  autoExcerpt?: boolean
}


export interface ThemePluginsOptions {
  /**
   * Enable @vuepress/active-header-links or not
   *
   * 是否启用 @vuepress/active-header-links 插件
   */
  activeHeaderLinks?: boolean;

  /**
   * Enable @vuepress/external-link-icon or not
   *
   * 是否启用 @vuepress/external-link-icon 插件
   */
  externalLinkIcon?: boolean;

  /**
   * Enable @vuepress/nprogress or not
   *
   * 是否启用 @vuepress/nprogress 插件
   */
  nprogress?: boolean;

  /**
   * Enable @vuepress/plugin-git or not
   *
   * 是否开启git插件
   *
   * @default true
   */
  git?: boolean

  /**
   * Blog plugin options
   *
   * 博客插件选项
   *
   * @default false
   */
  blog?: ThemeBlogPluginOptions | false

  /**
   * Enable @vuepress/prismjs or not
   *
   * 是否启用 @vuepress/prismjs 插件
   */
  prismjs?: boolean;

  /**
   * Comment plugin options
   *
   * 评论插件配置
   */
  comment?: CommentOptions | false;
}
