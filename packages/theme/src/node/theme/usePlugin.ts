import { App } from "@vuepress/core";
import { checkSocialMediaIcons } from "../utils";
import { WeaselThemeConfig, ThemePluginsOptions } from './../../typings'

export const usePlugin = (app: App,  plugins: ThemePluginsOptions, themeConfig: WeaselThemeConfig) => {

  if (plugins.blog) {
    const icons = checkSocialMediaIcons(themeConfig);

    void app.writeTemp(
      `theme-weasel/socialMedia.js`,
      `export const icons = ${JSON.stringify(icons)}`
    );
  }
}
