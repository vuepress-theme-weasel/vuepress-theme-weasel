import { ResolvedSidebarItem, ResolvedThemeSidebarGroupItem, ResolvedThemeSidebarHeaderItem, ResolvedThemeSidebarPageItem, ThemeNormalPageFrontmatter, ThemeSidebarArrayConfig, ThemeSidebarItem } from "../../../../typings";
import { sidebarData } from "@temp/theme-weasel/sidebar";
import { usePageData, usePageFrontmatter, useRouteLocale, PageHeader } from "@vuepress/client";
import { useAutoLink, useThemeLocaleData } from "@theme-weasel/composables";
import { isString, isPlainObject, isLinkExternal, isArray } from "@vuepress/shared";
import { resolvePrefix } from "./utils"
import { useRoute } from 'vue-router'

/**
 * 转换page的header为sidebar data
 */
export const headerToSidebarItem = (
  header: PageHeader,
  headerDepth: number
): ResolvedThemeSidebarHeaderItem => {
  const page = usePageData();

  return {
    type: "heading",
    text: header.title,
    link: `${page.value.path}#${header.slug}`,
    children: headersToSidebarItemChildren(header.children, headerDepth),
  };
};

/**
 * 转换header
 * @param headers
 * @param headerDepth
 * @returns
 */
export const headersToSidebarItemChildren = (
  headers: PageHeader[],
  headerDepth: number
): ResolvedThemeSidebarHeaderItem[] => headerDepth > 0 ? headers.map((header) => headerToSidebarItem(header, headerDepth - 1)) : [];

/**
 * Resolve sidebar items if the config is an array
 */
export const resolveArraySidebarItems = (
  sidebarConfig: ThemeSidebarArrayConfig,
  headerDepth: number,
  prefix = ""
): ResolvedSidebarItem[] => {
  const page = usePageData();
  const route = useRoute();

  if (!Array.isArray(sidebarConfig)) {
    console.warn(`Expecting array, but getting invalid sidebar config${ prefix ? ` under ${prefix}` : "" } with:`, sidebarConfig);
    return [];
  }

  const handleChildItem = (
    item: ThemeSidebarItem,
    pathPrefix = prefix
  ): ResolvedThemeSidebarPageItem | ResolvedThemeSidebarGroupItem => {
    const childItem = isString(item)
      ? useAutoLink(resolvePrefix(pathPrefix, item))
      : item.link
      ? {
          ...item,
          ...(!isLinkExternal(item.link) ? { link: useAutoLink(resolvePrefix(pathPrefix, item.link)).link } : {}),
        }
      : item;

    // resolved group item
    if ("children" in childItem) {
      const prefix = resolvePrefix(pathPrefix, childItem.prefix);

      const children = childItem.children === "structure" ? sidebarData[prefix] : childItem.children;

      if (!Array.isArray(children)) {
        console.warn(`Expecting array, but getting invalid sidebar config${ prefix ? ` under ${prefix}` : "" } with:`, children);

        return {
          type: "group",
          ...childItem,
          children: [],
        };
      }

      return {
        type: "group",
        ...childItem,
        children: children.map((item) => handleChildItem(item, prefix)),
      };
    }

    return {
      type: "page",
      ...childItem,
      children:
        // 如果当前的sidebar item是当前页，并且没有子项，则使用当前页的headers为子项
        childItem.link === route.path
          ? headersToSidebarItemChildren(
              // skip h1 header
              page.value.headers[0]?.level === 1
                ? page.value.headers[0].children
                : page.value.headers,
              headerDepth
            )
          : [],
    };
  };

  return sidebarConfig.map((item) => handleChildItem(item));
};

/**
 * 获取sidebar data
 */
export const resolveSidebarItems = (): ResolvedSidebarItem[] => {
  const routeLocale = useRouteLocale()
  const frontmatter = usePageFrontmatter<ThemeNormalPageFrontmatter>()
  const themeLocale = useThemeLocaleData()

  const sidebarConfig = frontmatter.value.home ? false : frontmatter.value.sidebar ?? themeLocale.value.sidebar ?? 'structure'
  const headerDepth = frontmatter.value.headerDepth ?? themeLocale.value.headerDepth ?? 2

  if (sidebarConfig === false) return []
  if (sidebarConfig === 'heading') return [] // 返回header
  if (sidebarConfig === 'structure') return resolveArraySidebarItems(
        sidebarData[routeLocale.value],
        headerDepth,
        routeLocale.value
      ) // 返回sidebar
  if (isArray(sidebarConfig)) return [] // 返回 array sidebar
  if (isPlainObject(sidebarConfig)) return [] // 返回 多个 sidebar
  return []
}
