import type { ThemeData } from "@vuepress/plugin-theme-data";

import type {
  WeaselThemeLocaleOptions,
  WeaselThemePluginsOptions,
  WeaselThemeRootOptions,
} from "./options";

export interface WeaselThemeOptions
  extends WeaselThemeRootOptions,
    ThemeData<WeaselThemeLocaleOptions> {
  plugins?: WeaselThemePluginsOptions;
}
