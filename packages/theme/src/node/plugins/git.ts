import { GitPluginOptions } from "@vuepress/plugin-git"
import { ThemeLocaleOptions, ThemePluginsOptions } from "../../typings"

/**
 * Resolve options for @vuepress/plugin-git
 */
export const resolveGitPluginOptions = (
  themePlugins: ThemePluginsOptions,
  localeOptions: ThemeLocaleOptions
): GitPluginOptions | boolean => {
  if (themePlugins?.git === false) {
    return false
  }

  const enableUpdatedTime = localeOptions.lastUpdated !== false
  const enableContributors = localeOptions.contributors !== false

  if (!enableUpdatedTime && !enableContributors) {
    return false
  }

  return {
    createdTime: true,
    updatedTime: enableUpdatedTime,
    contributors: enableContributors,
  }
}
