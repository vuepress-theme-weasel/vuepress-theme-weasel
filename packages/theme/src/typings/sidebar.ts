/**
 * side bar interface
 */

import { ThemeNavGroup } from "./navbar";
import { AutoLink, TextItem } from "./utils"

/**
 * sidebar page item
 */
export type ThemeSidebarPageItem = AutoLink

/**
 * weasel Theme sidebar group item
 */
export interface ThemeSidebarGroupItem extends ThemeNavGroup<ThemeSidebarPageItem | ThemeSidebarGroupItem | string> {
  collapsable?: boolean;
}

/**
 * 自动构造配置
 */
export interface ThemeSidebarStructureItem extends TextItem {
  prefix: string;
  link?: string;
  collapsable?: boolean;
  children: "structure";
}

/**
 * theme sidebar item
 */
export type ThemeSidebarItem =
  | ThemeSidebarPageItem
  | ThemeSidebarGroupItem
  | ThemeSidebarStructureItem
  | string;

/**
 * sidebar configs
 */
export type ThemeSidebarArrayConfig = ThemeSidebarItem[];

export interface ResolvedThemeSidebarGroupItem extends ThemeSidebarGroupItem {
  type: "group";
  children: ResolvedSidebarItem[];
}

export interface ResolvedThemeSidebarHeaderItem extends ThemeSidebarPageItem {
  type: "heading";
  children: ResolvedThemeSidebarHeaderItem[];
}

export interface ResolvedThemeSidebarPageItem extends ThemeSidebarPageItem {
  type: "page";
  children: ResolvedThemeSidebarHeaderItem[];
}

export type ResolvedSidebarItem =
  | ResolvedThemeSidebarHeaderItem
  | ResolvedThemeSidebarPageItem
  | ResolvedThemeSidebarGroupItem;
