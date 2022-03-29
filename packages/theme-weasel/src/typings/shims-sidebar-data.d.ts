declare module "@temp/theme-weasel/sidebar" {
  import type { WeaselThemeSidebarGroupItem } from "vuepress-theme-weasel/src/typings";

  export const sidebarData: Record<
    string,
    (WeaselThemeSidebarGroupItem | string)[]
  >;
}
