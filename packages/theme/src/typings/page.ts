import type { GitPluginPageData } from '@vuepress/plugin-git'

export interface ThemePageData
  extends Partial<GitPluginPageData> {
  filePathRelative: string | null;
}
