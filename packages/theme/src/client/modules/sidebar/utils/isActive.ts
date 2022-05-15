import { isActiveLink } from "@mr-huang/vuepress-shared/lib/client";
import { RouteLocationNormalized } from 'vue-router'

import type { RouteLocationNormalizedLoaded } from "vue-router";
import type { ResolvedSidebarItem } from "../../../../typings";

export const isActiveSidebarItem = (
  route: RouteLocationNormalizedLoaded,
  item: ResolvedSidebarItem,
  exact = false
): boolean => {
  if (isActiveLink(route, item.link)) return true;

  if (item.children && !exact) {
    return item.children.some((child) => isActiveSidebarItem(route, child));
  }

  return false;
};


export const isDescendantActive = (
  route: RouteLocationNormalized,
  item: ResolvedSidebarItem
): boolean => {
  if (item.type === "group")
    return item.children.some((child) => {
      if (child.type === "group") return isDescendantActive(route, child);

      return child.type === "page" && isActiveSidebarItem(route, child, true);
    });

  return false;
};

export const resolveOpenGroupIndex = (
  route: RouteLocationNormalized,
  items: ResolvedSidebarItem[]
): number => {
  for (let i = 0; i < items.length; i++)
    if (isDescendantActive(route, items[i])) return i;

  return -1;
};
