import { resolveRouteWithRedirect } from "@mr-huang/vuepress-plugin-blog/lib/client";
import { useRouter } from "vue-router";

import type { AutoLink } from "../../typings";

/**
 * Resolve AutoLink props from string
 *
 * @example
 * - Input: '/README.md'
 * - Output: { text: 'Home', link: '/' }
 */
export const useAutoLink = (item: string): AutoLink => {
  const router = useRouter();
  const resolved = resolveRouteWithRedirect(router, item);

  return {
    icon: resolved.meta.icon as string,
    text: resolved.meta.title as string || item,
    link: resolved.name === "404" ? item : resolved.fullPath,
  };
};
