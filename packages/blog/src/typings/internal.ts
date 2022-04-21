/**
 * 内部类型
 */

import { Page } from "@vuepress/core";

/**
 * 页面集合
 */
export type PageMap = Record<
  /** Locale Path **/
  string,
  /** Pages **/
  Page[]
>

/**
 * page type config
 */
export interface PageTypeConfig {
  path: string;
  keys: string[];
}

/**
 * page type 集合
 */
export type PageTypeMap = Record<
  /** Locale Path */
  string,
  /** Locale Type config */
  PageTypeConfig
>;

export interface FrontmatterConfig {
  path: string;
  keys: string[];
}

export type FrontmatterLocaleMap = Record<
  /** Frontmatter name */ string,
  /** Frontmatter config */ FrontmatterConfig
>;

export interface FrontmatterLocaleConfig {
  /** Main page of Frontmatter */
  path: string;
  /** Frontmatter map for current locale */
  map: FrontmatterLocaleMap;
}

export type FrontmatterMap = Record<
  /** Locale Path */ string,
  /** Locale Frontmatter config */ FrontmatterLocaleConfig
>
