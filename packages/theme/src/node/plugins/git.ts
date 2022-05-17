import { GitPluginOptions } from "@vuepress/plugin-git"
import { ThemeLocaleOptions, ThemePluginsOptions } from "../../typings"

/**
 * Resolve options for @vuepress/plugin-git
 */
export const resolveGitPluginOptions = (
  themePlugins: ThemePluginsOptions,
  localeOptions: ThemeLocaleOptions
): GitPluginOptions | undefined => {
  if (themePlugins?.git === false) {
    return undefined
  }

  const enableUpdatedTime = localeOptions.lastUpdated !== false
  const enableContributors = localeOptions.contributors !== false

  if (!enableUpdatedTime && !enableContributors) {
    return undefined
  }

  return {
    createdTime: true,
    updatedTime: enableUpdatedTime,
    contributors: enableContributors,
  }
}
