import { getLocales } from "@mr-huang/vuepress-shared";
// import { resolveEncrypt } from "./encrypt";
import { themeLocalesData } from "../locales";

import type { App } from "@vuepress/core";
import {
  WeaselThemeConfig,
  WeaselThemeLocaleConfig,
  WeaselThemeLocaleOptions,
  WeaselThemeOptions,
  WeaselThemeRootConfig,
} from "../../typings";

const rootAllowConfig = [
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

const defaultRootOptions: WeaselThemeRootConfig = {
  // features
  blog: {},
  encrypt: {},

  // appearance
  pure: false,
  iconPrefix: "",
  darkmode: "auto-switch",
  themeColor: {
    red: "#e74c3c",
    blue: "#3498db",
    green: "#3eaf7c",
    orange: "#f39c12",
    purple: "#8e44ad",
  },
  fullscreen: true,
};

const defaultLocaleOptions: WeaselThemeLocaleOptions = {
  // features
  blog: {},
  // layouts
  repoDisplay: true,
  navbarIcon: true,
  navbarAutoHide: "mobile",
  hideSiteNameonMobile: true,
  sidebar: "structure",
  sidebarIcon: true,
  headerDepth: 2,
};

/**
 * Get client-side `themeConfig`
 */
export const getThemeConfig = (
  app: App,
  themeOptions: WeaselThemeOptions
): WeaselThemeConfig => {
  const themeData: WeaselThemeConfig = {
    ...defaultRootOptions,
    ...Object.fromEntries(
      Object.entries(themeOptions).filter(([key]) =>
        rootAllowConfig.includes(key)
      )
    ),
    locales:
      // assign locale data to `themeConfig`
      getLocales(
        app,
        themeLocalesData,
        // extract localeConfig
        Object.fromEntries(
          [
            ["/", {}] as [string, WeaselThemeLocaleOptions],
            ...Object.entries(themeOptions.locales || {}),
          ].map<[string, WeaselThemeLocaleConfig]>(
            ([localePath, localeConfig]) => [
              localePath,
              {
                // defauilt config
                ...defaultLocaleOptions,
                // root config
                ...Object.fromEntries(
                  Object.entries(themeOptions).filter(
                    ([key]) =>
                      key === "blog" ||
                      (key !== "locales" && !rootAllowConfig.includes(key))
                  )
                ),
                // locale options
                ...localeConfig,
              } as WeaselThemeLocaleConfig,
            ]
          )
        )
      ) as WeaselThemeLocaleConfig,
  };

  // handle encrypt options
  // resolveEncrypt(themeData.encrypt);

  if (app.env.isDebug) console.log("Theme config: ", themeData);

  return themeData;
};
