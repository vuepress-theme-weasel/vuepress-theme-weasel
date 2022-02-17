import type { LocaleData } from "@vuepress/shared";
import type {
  WeaselThemeFeatureLocaleData,
  WeaselThemeFeatureLocaleOptions,
  WeaselThemeLayoutLocaleData,
  WeaselThemeLayoutLocaleOptions,
} from "./options";

export interface DefaultWeaselThemeLocaleData
  extends WeaselThemeFeatureLocaleData,
    WeaselThemeLayoutLocaleData {
  /**
   * Current lang code
   */
  lang: string;
  /**
   * Theme Color
   */
  themeColorText: string;
  /**
   * Theme mode
   */
  darkmodeText: string;
  /**
   * Encrypt
   */
  encryptLocales: {
    /**
     * Encrypt title
     */
    title: string;
    /**
     * Passwrod error hint
     */
    errorHint: string;
  };
}

export type WeaselThemeLocaleData = WeaselThemeFeatureLocaleData &
  WeaselThemeFeatureLocaleOptions &
  WeaselThemeLayoutLocaleData &
  WeaselThemeLayoutLocaleOptions &
  LocaleData;
