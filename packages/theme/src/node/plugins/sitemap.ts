import { sitemapPlugin as _sitemapPlugin } from '@mr-huang/vuepress-plugin-sitemap'

import type { Plugin } from "@vuepress/core";
import type { SitemapOptions } from "@mr-huang/vuepress-plugin-sitemap";

export const sitemapPlugin = (
  hostname: string,
  options?: Omit<SitemapOptions, "hostname"> | false
): Plugin | null => {
  if (options === false) return null;

  // disable sitemap if `hostname` is not set and no options for sitemap plugin
  if (!Object.keys(options || {}).length && !hostname) return null;

  return _sitemapPlugin({
    hostname,
    ...(options || {}),
  } as SitemapOptions);
};
