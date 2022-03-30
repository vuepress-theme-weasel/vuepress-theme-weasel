import { WeaselThemeNavGroup } from "./navbar"
import { AutoLink, TextItem } from './utils'

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

export interface WeaselThemeSidebarStructureItem extends TextItem {
  prefix: string;
  link?: string;
  collapsable?: boolean;
  children: "structure";
}

export type WeaselThemeSidebarItem =
  | WeaselThemeSidebarPageItem
  | WeaselThemeSidebarGroupItem
  | WeaselThemeSidebarStructureItem
  | string;

export type WeaselThemeSidebarArrayConfig = WeaselThemeSidebarItem[];

export type WeaselThemeSidebarObjectConfig = Record<
  string,
  WeaselThemeSidebarArrayConfig | "structure" | false
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
