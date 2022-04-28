import {
  // addViteSsrExternal,
  // addViteSsrNoExternal,
  // addViteOptimizeDepsExclude,
  // addViteOptimizeDepsInclude,
  getLocales,
  noopModule,
} from "@mr-huang/vuepress-shared";
import { path } from "@vuepress/utils";
import { walineLocales } from "./locales";

import type { CommentOptions } from "../shared";
import type { Plugin, PluginConfig } from "@vuepress/core";

/** Comment Plugin */
export const commentPlugin: Plugin<CommentOptions> = (options, app) => {
  const isGiscus = options.type === "giscus";
  const isTwikoo = options.type === "twikoo";
  const isWaline = options.type === "waline";

  const userWalineLocales = isWaline
    ? getLocales(app, walineLocales, options.walineLocales)
    : {};

  // remove locales so that they won’t be injected in client twice
  if ("walineLocales" in options) delete options.walineLocales;

  // TODO: Wait for Vssue to support vue3
  // if (options.type === "vssue")
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  // app.use("@vssue/vuepress-plugin-vssue", options);

  return {
    name: "vuepress-plugin-comment2",

    alias: {
      "@Giscus": isGiscus
        ? path.resolve(__dirname, "../client/components/Giscus.js")
        : noopModule,
      "@Twikoo": isTwikoo
        ? path.resolve(__dirname, "../client/components/Twikoo.js")
        : noopModule,
      "@Waline": isWaline
        ? path.resolve(__dirname, "../client/components/Waline.js")
        : noopModule,
    },

    define: () => ({
      COMMENT_OPTIONS: options,
      WALINE_LOCALES: userWalineLocales,
    }),

    onInitialized: (app): void => {
      // addViteSsrNoExternal(app, [
      //   "@mr-huang/vuepress-shared",
      //   "@mr-huang/vuepress-plugin-comment",
      // ]);
      // addViteOptimizeDepsExclude(app, "@mr-huang/vuepress-plugin-comment");

      // if (isGiscus) {
      //   addViteOptimizeDepsInclude(app, "@giscus/vue");
      //   addViteSsrExternal(app, "@giscus/vue");
      // }

      // if (isTwikoo) {
      //   addViteOptimizeDepsInclude(app, "twikoo");
      //   addViteSsrExternal(app, "twikoo");
      // }

      // if (isWaline) {
      //   addViteOptimizeDepsInclude(app, "@waline/client");
      //   addViteSsrExternal(app, "@waline/client");
      // }
    },

    clientAppEnhanceFiles: path.resolve(__dirname, "../client/appEnhance.js"),
  };
};

export const comment = (
  options: CommentOptions | false
): PluginConfig<CommentOptions> => ["@mr-huang/vuepress-plugin-comment", options];
