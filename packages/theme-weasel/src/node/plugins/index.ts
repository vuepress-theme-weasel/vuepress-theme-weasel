import {
  resolveActiveHeaderLinksPluginOptions,
  resolveContainerPluginOptionsForCodeGroup,
  resolveContainerPluginOptionsForCodeGroupItem,
  resolveGitPluginOptions,
} from "./vuepressDefaultPlugins";

import type { PluginConfig, PluginOptions } from "@vuepress/core";
import type { WeaselThemeOptions, WeaselThemePluginsOptions } from "../../types";

export const getPluginConfig = (
  plugins: WeaselThemePluginsOptions,
  themeData: Omit<WeaselThemeOptions, "plugins">
): PluginConfig<PluginOptions>[] => {
  return [
    [
      "@vuepress/active-header-links",
      resolveActiveHeaderLinksPluginOptions(plugins),
    ],
    ["@vuepress/container", resolveContainerPluginOptionsForCodeGroup(plugins)],
    [
      "@vuepress/container",
      resolveContainerPluginOptionsForCodeGroupItem(plugins),
    ],
    ["@vuepress/git", resolveGitPluginOptions(plugins, themeData)],
    ["@vuepress/nprogress", plugins.nprogress !== false],
    ["@vuepress/prismjs", plugins.prismjs !== false],
    ["@vuepress/theme-data", { themeData }]
  ];
};
