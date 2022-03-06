/**
 * Base nav item, displayed as text
 */
export interface WeaselThemeNavLinkItem {
  text: string;
  icon?: string;
  ariaLabel?: string;
}

/**
 * Base nav group, has nav items children
 */
export interface WeaselThemeNavGroup<T> extends WeaselThemeNavLinkItem {
  prefix?: string;
  link?: string;
  children: T[];
}

/**
 * Props for `<AutoLink>`
 */
export interface AutoLink extends WeaselThemeNavLinkItem {
  link: string;
  rel?: string;
  target?: string;
  activeMatch?: string;
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
