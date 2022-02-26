import type { ThemeData } from '@vuepress/plugin-theme-data'
import type { LocaleData } from "@vuepress/shared";

export interface WeaselThemeLocaleConfig extends LocaleData {

}

export interface WeaselThemeConfig extends ThemeData<WeaselThemeLocaleConfig>{

}
