import { isLinkExternal, isString } from "@vuepress/shared";
import { computed } from "vue";

import { useAutoLink, useThemeLocaleData } from "@theme-weasel/composables";

import type { ComputedRef } from "vue";
import type {
  AutoLink,
  ThemeNavbarItem,
  ThemeNavbarGroup,
  ThemeNavGroup,
  ResolvedThemeNavbarItem,
} from "../../../../typings";

export const resolveNavbarItem = (
  item: ThemeNavbarItem | ThemeNavbarGroup | string,
  prefix = ""
): ResolvedThemeNavbarItem => {
  if (isString(item)) return useAutoLink(`${prefix}${item}`);

  if ("children" in item)
    return {
      ...item,
      ...(item.link && !isLinkExternal(item.link)
        ? useAutoLink(`${prefix}${item.link}`)
        : {}),
      children: item.children.map((child) =>
        resolveNavbarItem(child, `${prefix}${item.prefix || ""}`)
      ) as (ThemeNavGroup<AutoLink> | AutoLink)[],
    };

  return {
    ...item,
    link: isLinkExternal(item.link)
      ? item.link
      : useAutoLink(`${prefix}${item.link}`).link,
  };
};

export const useNavbarConfig = (): ComputedRef<ResolvedThemeNavbarItem[]> =>
  computed(() =>
    (useThemeLocaleData().value.navbar || []).map((item) => resolveNavbarItem(item))
  );
