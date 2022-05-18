import { chalk } from "@vuepress/utils";
import { createSitemap } from "./generator";
import { logger } from "./utils";

import type { PluginObject, PluginFunction } from "@vuepress/core";
import type { SitemapOptions } from "../typings";

export const sitemapPlugin =
  (options: SitemapOptions): PluginFunction =>
  (app) => {
    if (app.env.isDebug) logger.info(`Options: ${options.toString()}`);

    const plugin: PluginObject = {
      name: "vuepress-plugin-sitemap2",
    };

    if (!options.hostname) {
      logger.error(`Option ${chalk.magenta("hostname")} is required!`);

      return plugin;
    }

    return {
      ...plugin,

      onGenerated: (app): Promise<void> => createSitemap(app, options),
    };
  };
