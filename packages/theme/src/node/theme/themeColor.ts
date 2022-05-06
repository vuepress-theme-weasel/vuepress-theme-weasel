import type { App } from "@vuepress/core";
import type { WeaselThemeConfig } from "../../typings";

export const prepareThemeColorScss = async (
  app: App,
  themeConfig: WeaselThemeConfig
): Promise<void> => {
  await app.writeTemp(
    "theme-weasel/theme-color.scss",
    `$picker: (${Object.entries(themeConfig.themeColor || {})
      .map(([color, value]) => `"${color}": ${value}`)
      .join(",")});`
  );
};
