/**
 * 文章
 */
export interface Article<
  T extends Record<string, unknown> = Record<string, unknown>
> {
  /**
   * Article path
   *
   * 文章路径
   */
  path: string;
  /**
   * Article info
   *
   * 文章信息
   */
  info: T;
}

/**
 * 文章列表
 */
export type Articles<
  T extends Record<string, unknown> = Record<string, unknown>
> = Article<T>[];

/**
 * frontmatter classifier data
 */
export interface BlogFrontmatterData<T extends Record<string, unknown> = Record<string, unknown>> {

  /**
   * Category path
   *
   * 分类路径
   */
  path: string;

  /**
   * Only available when current route matches an item path
   *
   * 仅当当前路径和某个子项目匹配时可用
   */
  currentItems?: Articles<T>;

  /**
   * Category map
   *
   * 分类映射
   */
  map: Record<

    /**
     * Unique key under current category
     *
     * 当前分类下全局唯一的 key
     */
    string, {

      /**
       * Category path of the key
       *
       * 对应键值的分类路径
       */
      path: string;

       /**
       * Category items of the key
       *
       * 对应键值的项目
       */
      items: Articles<T>
    }>;
}

/**
 * page type classifier data
 */
export interface BlogPageTypeData<
  T extends Record<string, unknown> = Record<string, unknown>
> {
  
  /**
   * Category path
   *
   * 分类路径
   */
  path: string;

  /**
   * Items under current type
   *
   * 当前类别下的项目
   */
  items: Articles<T>;
}
