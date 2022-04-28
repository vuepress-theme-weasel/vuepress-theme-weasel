import { pageTypeMap } from '@temp/blog/pageType'
import { useRouter } from 'vue-router'
import { useRouteLocale, usePageFrontmatter } from '@vuepress/client'
import { computed, ref } from 'vue'
import { resolveRouteWithRedirect } from './../utils';

import type { ComputedRef } from 'vue'
import { BlogPageTypeData, BlogPageTypeFrontmatterOptions, PageTypeMap } from '../../typings'

export const blogPageTypeMap = ref(pageTypeMap)
declare const BLOG_META_SCOPE: string
declare const __VUE_HMR_RUNTIME__: Record<string, any>

/**
 * page type hooks
 * @param key
 * @returns
 */
export const useBlogPageType = <T extends Record<string, unknown> = Record<string, unknown>>(key = ''):ComputedRef<BlogPageTypeData> => {
  const router = useRouter()
  const routerLocale = useRouteLocale()

  return computed(() => {
    const mapKey = key || usePageFrontmatter<{blog: BlogPageTypeFrontmatterOptions}>().value.blog?.key || ''
    const routes = router.getRoutes()
    const configMap = blogPageTypeMap.value[mapKey][routerLocale.value]
    const result: BlogPageTypeData<T> = {
      path: configMap.path,
      items: []
    }

    for (const pageKey of configMap.keys) {
      const route = routes.find(({ name }) => name === pageKey)

      if (route) {
        const finalRoute = resolveRouteWithRedirect(router, route.path)
        result.items.push({
          path: finalRoute.path,
          info: BLOG_META_SCOPE === '' ? (finalRoute.meta as T) : (finalRoute.meta[BLOG_META_SCOPE] as T)
        })
      }
    }

    return result
  })
}

// @ts-ignore
if (import.meta.webpack || import.meta.hot) {
  __VUE_HMR_RUNTIME__.updateBlogType = (map: Record<string, PageTypeMap>): void => {
    blogPageTypeMap.value = map
  }
}
