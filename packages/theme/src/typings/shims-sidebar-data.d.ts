declare module "@temp/theme-weasel/sidebar" {
  import type { ThemeSidebarGroupItem } from "vuepress-theme-weasel/src/typings";
  export const sidebarData: Record<string, (ThemeSidebarGroupItem | string)[]>;
}
