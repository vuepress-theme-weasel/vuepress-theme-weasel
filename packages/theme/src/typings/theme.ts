import { LocaleData } from "@vuepress/core";
import { ThemeData } from "@vuepress/plugin-theme-data";
import { ThemePluginsOptions } from "./options";

export interface ThemeLocaleConfig extends LocaleData {}

export interface WeaselThemeConfig extends ThemeData<ThemeLocaleConfig> {
}

export interface WeaselThemeOptions {
  plugin?: ThemePluginsOptions
}
