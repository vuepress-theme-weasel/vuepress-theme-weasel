/**
 * 文章
 */
export interface Article<
  T extends Record<string, unknown> = Record<string, unknown>
> {
  path: string;
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
export interface BlogFrontmatterData<
  T extends Record<string, unknown> = Record<string, unknown>
> {
  path: string;
  currentItems?: Articles<T>;
  map: Record<string, { path: string; items: Articles<T> }>;
}

/**
 * page type classifier data
 */
export interface BlogPageTypeData<
  T extends Record<string, unknown> = Record<string, unknown>
> {
  path: string;
  items: Articles<T>;
}
