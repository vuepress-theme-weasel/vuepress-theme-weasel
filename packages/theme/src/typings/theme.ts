import { ThemeData } from "@vuepress/plugin-theme-data";
import { ThemeLocaleConfig, ThemePluginsOptions } from "./options";

export interface WeaselThemeConfig extends ThemeData<ThemeLocaleConfig> {
  // locales: Record<string, ThemeLocaleConfig>;
}

export interface WeaselThemeOptions extends ThemeData {
  plugin?: ThemePluginsOptions
}
