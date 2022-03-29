import type { AutoLink, TextItem } from "./utils";

/**
 * Base nav group, has nav items children
 */
export interface WeaselThemeNavGroup<T> extends TextItem {
  prefix?: string;
  link?: string;
  children: T[];
}

/**
 * Base nav item, displayed as text
 */
export interface WeaselThemeNavLinkItem {
  text: string;
  icon?: string;
  ariaLabel?: string;
}

/**
 * Navbar types
 */
// user config
export type WeaselThemeNavbarItem = AutoLink;
export type WeaselThemeNavbarGroup = WeaselThemeNavGroup<
  WeaselThemeNavbarGroup | WeaselThemeNavbarItem | string
>;
export type WeaselThemeNavbarConfig = (
  | WeaselThemeNavbarItem
  | WeaselThemeNavbarGroup
  | string
)[];

// resolved
export type ResolvedWeaselThemeNavbarItem =
  | WeaselThemeNavbarItem
  | WeaselThemeNavGroup<AutoLink | WeaselThemeNavGroup<AutoLink>>;
