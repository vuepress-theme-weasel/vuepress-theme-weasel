import type { Author } from "@mr-huang/vuepress-shared";
import type { LocaleData } from "@vuepress/shared";
import type { WeaselThemeAppearanceOptions } from "./appearance";
import type {
  WeaselThemeFeatureLocaleData,
  WeaselThemeFeatureLocaleOptions,
  WeaselThemeFeatureOptions,
} from "./feature";
import type { LocaleData2Option } from "./helpers";
import type {
  WeaselThemeLayoutLocaleData,
  WeaselThemeLayoutLocaleOptions,
  WeaselThemeLayoutOptions,
} from "./layout";

export type WeaselThemeLocaleOptions =
  LocaleData2Option<WeaselThemeFeatureLocaleData> &
    WeaselThemeFeatureLocaleOptions &
    LocaleData2Option<WeaselThemeLayoutLocaleData> &
    WeaselThemeLayoutLocaleOptions &
    LocaleData;

export interface WeaselThemeRootOptions
  extends WeaselThemeAppearanceOptions,
    WeaselThemeFeatureOptions,
    WeaselThemeLayoutOptions {
  /**
   * 作者
   */
  author?: Author;
}

// /**
//  * Custom block config
//  *
//  * Default title of TIP custom block
//  */
// tip?: string;

// /**
//  * Custom block config
//  *
//  * Default title of WARNING custom block
//  */
// warning?: string;

// /**
//  * Custom block config
//  *
//  * Default title of DANGER custom block
//  */
// danger?: string;
