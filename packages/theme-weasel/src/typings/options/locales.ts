import type { LocaleData } from "@vuepress/shared";
// import type { WeaselThemeAppearanceLocaleData } from "./appearance";
import type {
  WeaselThemeFeatureConfig,
  WeaselThemeFeatureLocaleConfig,
  WeaselThemeFeatureLocaleData,
  WeaselThemeFeatureLocaleOptions,
} from "./feature";
import type { LocaleData2Option } from "./helpers";
import type {
  WeaselThemeLayoutLocaleData,
  WeaselThemeLayoutLocaleOptions,
} from "./layout";

export interface WeaselThemeLocaleData extends WeaselThemeFeatureLocaleData, WeaselThemeLayoutLocaleData {
  /**
   * Current lang code
   */
  lang: string;
}

export type WeaselThemeLocaleOptions =
    LocaleData2Option<WeaselThemeFeatureLocaleData> &
    WeaselThemeFeatureLocaleOptions &
    LocaleData2Option<WeaselThemeLayoutLocaleData> &
    WeaselThemeLayoutLocaleOptions &
    LocaleData;

export type WeaselThemeLocaleConfig = WeaselThemeLocaleData &
  WeaselThemeFeatureLocaleConfig &
  WeaselThemeFeatureConfig &
  WeaselThemeLayoutLocaleData &
  WeaselThemeLayoutLocaleOptions &
  LocaleData;
