import { inject, provide } from 'vue'
import { useBlogFrontmatter } from '@mr-huang/vuepress-plugin-blog/lib/client'
import type { InjectionKey } from 'vue'
import type { ArticleInfo, CategoryMapRef } from '../../typings'


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
