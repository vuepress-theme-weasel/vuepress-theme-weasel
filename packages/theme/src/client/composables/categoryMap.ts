import { inject, provide } from 'vue'
import { useBlogFrontmatter } from '@mr-huang/vuepress-plugin-blog/lib/client'
import type { InjectionKey, ComputedRef } from 'vue'
import type { ArticleInfo } from '../../typings'
import { BlogFrontmatterData } from '@mr-huang/vuepress-plugin-blog'

/**
 * 分类集合
 */
export type CategoryMapRef = ComputedRef<BlogFrontmatterData<ArticleInfo>>

export const categoryMapSymbol: InjectionKey<CategoryMapRef> =
  Symbol.for('categoryMap')

/**
 * Inject categoryMap
 */
export const useCategoryMap = (): CategoryMapRef => {
  const categoryMap = inject(categoryMapSymbol)

  if (!categoryMap) {
    throw new Error('useCategoryMap() is called without provider.')
  }

  return categoryMap
}

/**
 * Provide categoryMap
 */
export const setupCategoryMap = (): void => {
  const categoryMap = useBlogFrontmatter<ArticleInfo>('category')

  provide(categoryMapSymbol, categoryMap)
}
