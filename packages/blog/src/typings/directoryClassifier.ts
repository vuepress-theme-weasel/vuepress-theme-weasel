/**
 * 目录分类器
 */
export interface DirectoryClassifierOption {

  /**
   * Unique id for current classifier.
   *
   * 当前分类器的唯一 ID，例如 post
   */
  key: string;

  /**
   * Matched directory name.
   *
   * 匹配的目录名称，例如 _post.
   */
  dirname: string;

  /**
   * Entry page for current classifier.
   *
   * 当前分类器的输入页面，例如 / 或者 /post/
   * 设置为 /, 则意味着你要访问在 / 列出的处的匹配页面列表。设置到 /post/ 也是一样的
   */
  path: string;

  /**
   * Entry and pagination page titles for current classifier.
   *
   * 当前分类器的条目和分页页面标题。
   */
  title?: string;

  /**
   * Layout component name for entry page.
   *
   * 入口页面的布局组件名称。
   *
   * @default 'Layout'
   */
  layout?: string;

  /**
   * Frontmatter for entry page.
   *
   * 注入页面的frontmatter
   */
  frontmatter?: Record<string, any>;

  /**
   * Layout for matched page.
   *
   * 匹配页面的布局
   *
   * @default 'Layout'
   */
  itemLayout?: string;

  /**
   * Permalink for matched page.
   *
   * 匹配页面的永久链接。
   */
  itemPermalink?: string;
  /**
   * Pagination config for current classifier.
   */
  // pagination?: PaginationConfig;
}
