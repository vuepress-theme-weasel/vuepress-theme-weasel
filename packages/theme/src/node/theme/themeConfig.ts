import { deepAssign, getLocales } from "@mr-huang/vuepress-shared";
import { themeLocalesData } from "../locales";

import type { App } from "@vuepress/core";
import {
  WeaselThemeConfig,
  ThemeLocaleConfig,
  ThemeLocaleOptions,
  WeaselThemeOptions,
  ThemeRootConfig,
} from "../../typings";

const rootAllowConfig = [
  "author",
  "blog",
  "encrypt",
  "pure",
  "iconPrefix",
  "darkmode",
  "themeColor",
  "fullscreen",
  "backToTop",
  "mobileBreakPoint",
];

const defaultRootOptions: ThemeRootConfig = {
  blog: {
    articleInfo: [
      "Author",
      "Original",
      "Date",
      "Category",
      "Tag",
      "ReadingTime",
    ],
    articlePerPage: 10,
    sidebarDisplay: "mobile",
  },

  encrypt: {
    global: false,
  },

  // layouts
  repoDisplay: true,
  navbarIcon: true,
  navbarAutoHide: "mobile",
  hideSiteNameonMobile: true,

  sidebar: "structure",
  sidebarIcon: true,
  headingDepth: 2,

  // appearance
  pure: false,
  iconPrefix: "iconfont icon-",
  darkmode: "auto-switch",
  themeColor: {
    red: "#e74c3c",
    blue: "#3498db",
    green: "#3eaf7c",
    orange: "#f39c12",
    purple: "#8e44ad",
    default: '#000000'
  },
  fullScreen: true,
  plugins: {}
};

const defaultLocaleOptions: WeaselThemeOptions = {
  // features
  blog: {},
  // layouts
  repoDisplay: true,
  navbarIcon: true,
  navbarAutoHide: "mobile",
  hideSiteNameonMobile: true,
  sidebar: "structure",
  sidebarIcon: true,
  headerDepth: 2
};

/**
 * Get client-side `themeConfig`
 */
export const getThemeConfig = (
  app: App,
  themeOptions: WeaselThemeOptions,
  enableBlog = false
): WeaselThemeConfig => {

  const locales = getLocales({
        app,
        name: "vuepress-theme-weasel",
        default: Object.fromEntries(
          Object.entries(themeLocalesData).map(([locale, config]) => {
            if (!enableBlog) {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              delete config.blogLocales;
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              delete config.paginationLocales;
            }

            return [locale, config];
          })
        ),
        // extract localeConfig
        config: Object.fromEntries(
          [
            ["/", {}] as [string, ThemeLocaleOptions],
            ...Object.entries(themeOptions.locales || {}),
          ].map<[string, ThemeLocaleOptions]>(
            ([localePath, localeConfig]) => [
              localePath,
              {
                // defauilt config
                ...defaultLocaleOptions,
                // root config
                ...Object.fromEntries(
                  Object.entries(themeOptions).filter(
                    ([key]) =>
                      key !== "locales" && !rootAllowConfig.includes(key)
                  )
                ),
                // locale options
                ...localeConfig,
              } as ThemeLocaleConfig,
            ]
          )
        ),
      }) as ThemeLocaleConfig
  const userThemeOptions = Object.fromEntries(Object.entries(themeOptions).filter(([key]) => rootAllowConfig.includes(key)))
  const themeData: WeaselThemeConfig = deepAssign(defaultRootOptions, userThemeOptions, { locales })

  // handle encrypt options
  // themeData.encrypt = resolveEncrypt(themeData.encrypt);

  if (app.env.isDebug) console.log("Theme config: ", themeData);

  return themeData;
};
