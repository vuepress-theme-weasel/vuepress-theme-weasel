import { path } from "@vuepress/utils";

import type { App } from "@vuepress/core";
import type { WeaselThemePluginsOptions } from "../../typings";

export const getLayoutConfig = (
  app: App,
  plugins: WeaselThemePluginsOptions
): Record<string, string> => {
  const layoutConfig: Record<string, string> = {
    Layout: path.resolve(__dirname, "../../client/layouts/Layout.vue"),
    404: path.resolve(__dirname, "../../client/layouts/404.vue"),
  };

  // if (
  //   plugins.mdEnhance &&
  //   (plugins.mdEnhance.enableAll || plugins.mdEnhance.presentation)
  // )
  //   layoutConfig.Slide = "vuepress-plugin-md-enhance/lib/client/SlidePage.js";

  if (plugins.blog)
    layoutConfig.Blog = path.resolve(
      __dirname,
      "../../client/modules/blog/layouts/Blog.vue"
    );

  if (app.env.isDebug) console.log("Theme layout config:", layoutConfig);

  return layoutConfig;
};
