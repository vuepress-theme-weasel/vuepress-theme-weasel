import { comment } from "@mr-huang/vuepress-plugin-comment";

import type { PluginConfig } from "@vuepress/core";
import type { CommentOptions } from '@mr-huang/vuepress-plugin-comment';

export const resolveCommentPlugin = (
  options?: Partial<CommentOptions> | false
): PluginConfig => {
  if (options === false) return ["", false];

  return comment({
    type: "disable",
    ...(options?.type === "waline" ? { dark: 'html[data-theme="dark"]' } : {}),
    ...(options || {}),
  } as CommentOptions);
};
