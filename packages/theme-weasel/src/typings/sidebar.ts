import { WeaselThemeNavGroup } from "./navbar"
import { AutoLink } from './utils'

/**
 * Sidebar types
 */
// user config
export type WeaselThemeSidebarPageItem = AutoLink;

export interface WeaselThemeSidebarGroupItem
  extends WeaselThemeNavGroup<
    WeaselThemeSidebarPageItem | WeaselThemeSidebarGroupItem | string
  > {
  collapsable?: boolean;
}

export type WeaselThemeSidebarItem =
  | WeaselThemeSidebarPageItem
  | WeaselThemeSidebarGroupItem
  | string;

export type WeaselThemeSidebarArrayConfig = WeaselThemeSidebarItem[];

export type WeaselThemeSidebarObjectConfig = Record<
  string,
  WeaselThemeSidebarArrayConfig
>;

export type WeaselThemeSidebarConfig =
  | WeaselThemeSidebarArrayConfig
  | WeaselThemeSidebarObjectConfig;

// resolved
export interface ResolvedWeaselThemeSidebarHeaderItem
  extends WeaselThemeSidebarPageItem {
  type: "heading";
  children: ResolvedWeaselThemeSidebarHeaderItem[];
}

export interface ResolvedWeaselThemeSidebarPageItem
  extends WeaselThemeSidebarPageItem {
  type: "page";
  children: ResolvedWeaselThemeSidebarHeaderItem[];
}

export interface ResolvedWeaselThemeSidebarGroupItem
  extends WeaselThemeSidebarGroupItem {
  type: "group";
  children: ResolvedSidebarItem[];
}

export type ResolvedSidebarItem =
  | ResolvedWeaselThemeSidebarHeaderItem
  | ResolvedWeaselThemeSidebarPageItem
  | ResolvedWeaselThemeSidebarGroupItem;
