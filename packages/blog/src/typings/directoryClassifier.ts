/**
 * 目录分类器
 */
export interface DirectoryClassifierOption {
  /**
   * Unique id for current classifier.
   */
  id: string;
  /**
   * Matched directory name.
   */
  dirname: string;
  /**
   * Entry page for current classifier.
   */
  path: string;
  /**
   * Entry and pagination page titles for current classifier.
   */
  title?: string;
  /**
   * Layout component name for entry page.
   */
  layout?: string;
  /**
   * Frontmatter for entry page.
   */
  frontmatter?: Record<string, any>;
  /**
   * Layout for matched page.
   */
  itemLayout?: string;
  /**
   * Permalink for matched page.
   */
  itemPermalink?: string;
  /**
   * Pagination config for current classifier.
   */
  // pagination?: PaginationConfig;
}
