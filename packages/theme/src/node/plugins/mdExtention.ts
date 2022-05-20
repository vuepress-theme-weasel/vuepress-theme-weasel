import { mdExtentionPlugin as _mdExtentionPlugin } from "@mr-huang/vuepress-plugin-md-extention";

import type { Plugin } from "@vuepress/core";
import type { MdExtentionOptions } from "@mr-huang/vuepress-plugin-md-extention";

export const mdExtentionPlugin = (
  options?: Partial<MdExtentionOptions> | false
): Plugin | null => {
  if (options === false) return null;

  return _mdExtentionPlugin({
    container: true,
    ...(options || {}),
  });
};
