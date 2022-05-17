import { commentPlugin } from "@mr-huang/vuepress-plugin-comment";

import type { PluginObject } from "@vuepress/core";
import type { CommentOptions } from "@mr-huang/vuepress-plugin-comment";

export const getCommentPlugin = (
  options?: Partial<CommentOptions> | false
): PluginObject | null => {
  if (options === false || !options?.type) return null;

  return commentPlugin({
    type: "disable",
    ...(options?.type === "waline" ? { dark: 'html[data-theme="dark"]' } : {}),
    ...(options || {}),
  } as CommentOptions);
};
