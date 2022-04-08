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
export interface TypeConfig {
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
  TypeConfig
>;
