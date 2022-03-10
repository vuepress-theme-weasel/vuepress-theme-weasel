import { inject, provide } from 'vue'
import { useBlogCategory } from '@mr-huang/vuepress-plugin-blog/lib/client'

import type { ComputedRef, InjectionKey } from 'vue'
import type { BlogCategoryData } from '@mr-huang/vuepress-plugin-blog'
import type { ArticleInfo } from '../../../../typings'

export type TagMapRef = ComputedRef<BlogCategoryData<ArticleInfo>>

export const tagMapSymbol: InjectionKey<TagMapRef> = Symbol.for('tagMap')

/**
 * Inject tagMap
 */
export const useTagMap = (): TagMapRef => {
  const tagMap = inject(tagMapSymbol)

  if (!tagMap) {
    throw new Error('useTagMap() is called without provider.')
  }

  return tagMap
}

/**
 * Provide tagMap
 */
export const setupTagMap = (): void => {
  const tagMap = useBlogCategory<ArticleInfo>('tag')

  provide(tagMapSymbol, tagMap)
}