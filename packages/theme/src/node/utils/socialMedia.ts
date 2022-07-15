import { fs, path } from "@vuepress/utils";
import { logger } from "./logger";

import type { WeaselThemeConfig } from "../../typings";

export const checkSocialMediaIcons = (
  themeConfig: WeaselThemeConfig
): Record<string, string> => {
  const icons: Record<string, string> = {};

  const checkIcon = (
    key: string,
    value: string | [string, string]
  ): string | false => {
    if (typeof value === "string") {
      const templatePath = path.resolve(
        __dirname,
        `../../../templates/socialMediaIcons/${key.toLocaleLowerCase()}.svg`
      );

      if (fs.existsSync(templatePath)) {
        icons[key] = fs.readFileSync(templatePath, { encoding: "utf-8" });

        return value;
      }

      logger.warn(`${key} icon in blog media config not found!`);

      return false;
    }

    if (Array.isArray(value)) {
      // it’s a svg string
      if (value[1].startsWith("<svg")) {
        icons[key] = value[1];

        return value[0];
      }

      // it’s probably a path
      if (fs.existsSync(value[1])) {
        icons[key] = fs.readFileSync(value[1], { encoding: "utf-8" });

        return value[0];
      }

      logger.warn(`${key}'s icon ${value[1]} in blog media config is invalid!`);

      return false;
    }

    logger.warn(`${key} icon in blog media config has an invalid config!`);

    return false;
  };

  Object.entries(themeConfig.blog?.medias || {}).forEach(([key, value]) => {
    const result = checkIcon(key, value);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (result) themeConfig.blog.medias![key] = result;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    else delete themeConfig.blog.medias![key];
  });

  for (const locales in themeConfig.locales || {}) {
    Object.entries(themeConfig.locales?.[locales].blog?.medias || {}).forEach(
      ([key, value]) => {
        const result = checkIcon(key, value);

        // @ts-ignore
        if (result) themeConfig.locales[locales].blog.medias![key] = result;
        // @ts-ignore
        else delete themeConfig.locales[locales].blog.medias![key];
      }
    );
  }

  return icons;
};
