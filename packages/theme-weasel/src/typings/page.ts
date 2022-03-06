import type { GitPluginPageData } from '@vuepress/plugin-git'
// import type { ReadingTimePluginPageData } from "vuepress-plugin-reading-time2";

export interface WeaselThemePageData
  extends Partial<GitPluginPageData> {
  filePathRelative: string | null;
}
