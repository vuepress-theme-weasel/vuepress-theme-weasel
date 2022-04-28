import { usePageFrontmatter, useRouteLocale } from '@vuepress/client';
import { useRoute, useRouter } from 'vue-router';
import { computed, ref } from 'vue'
import { frontmatterMap } from '@temp/blog/frontmatter'

import { BlogFrontmatterData, BlogFrontmatterOptions, FrontmatterMap } from '../../typings';
import type { ComputedRef } from 'vue'
import { resolveRouteWithRedirect } from '../utils';

declare const __VUE_HMR_RUNTIME__: Record<string, any>
declare const BLOG_META_SCOPE: string
export const blogFrontmatterMap = ref(frontmatterMap)


/**
 * blog frontmatter
 * @param key
 */
export const useBlogFrontmatter = <T extends Record<string, unknown> = Record<string, unknown>>(key = ''): ComputedRef<BlogFrontmatterData> => {
  const router = useRouter()
  const route = useRoute()
  const routeLocale = useRouteLocale()

  return computed(() => {
    const mapKey =
      key ||
      usePageFrontmatter<{ blog?: BlogFrontmatterOptions }>().value.blog
        ?.key ||
      ''

    const routes = router.getRoutes()
    const currentMap = blogFrontmatterMap.value[mapKey][routeLocale.value]
    const result: BlogFrontmatterData<T> = {
      path: currentMap.path,
      map: {},
    }

    for (const frontmatter in currentMap.map) {
      const categoryMap = currentMap.map[frontmatter]

      result.map[frontmatter] = { path: categoryMap.path, items: [] }

      for (const pageKey of categoryMap.keys) {
        const route = routes.find(({ name }) => name === pageKey)

        if (route) {
          const finalRoute = resolveRouteWithRedirect(router, route.path)

          result.map[frontmatter].items.push({
            path: finalRoute.path,
            info:
              BLOG_META_SCOPE === ''
                ? (finalRoute.meta as T)
                : (finalRoute.meta[BLOG_META_SCOPE] as T),
          })
        }
      }

      if (route.path === categoryMap.path) {
        result.currentItems = result.map[frontmatter].items
      }
    }

    return result
  })
}

// @ts-ignore
if (import.meta.webpackHot || import.meta.hot) {
  __VUE_HMR_RUNTIME__.updateBlogCategory = (
    map: Record<string, FrontmatterMap>
  ): void => {
    blogFrontmatterMap.value = map
  }
}
