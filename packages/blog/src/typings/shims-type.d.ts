declare module "@temp/blog/pageType" {
  interface PageTypeMap {
    path: string;
    keys: string[];
  }

  type TypeMap = Record<
    /** Locale Path */
    string,
    /** Locale Type config */
    PageTypeMap
  >;

  export const pageTypeMap: Record<string, TypeMap>;
}

declare module "@temp/blog/frontmatter" {
  interface FrontmatterConfig {
    path: string;
    keys: string[];
  }

  type FrontmatterLocaleMap = Record<
    /** Frontmatter name */
    string,
    /** Frontmatter config */
    FrontmatterConfig
  >;

  interface FrontmatterLocaleConfig {
    /** Main page of frontmatter */
    path: string;
    /** frontmatter map for current locale */
    map: FrontmatterLocaleMap;
  }

  type FrontmatterMap = Record<
    /** Locale Path */
    string,
    /** Locale category config */
    FrontmatterLocaleConfig
  >;

  export const frontmatterMap: Record<string, FrontmatterMap>;
}
