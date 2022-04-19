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
