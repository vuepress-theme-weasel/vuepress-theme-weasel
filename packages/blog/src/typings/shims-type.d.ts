declare module "@temp/blog/type" {
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
