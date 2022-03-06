import { inject, provide } from 'vue'
import { useBlogType } from '@mr-huang/vuepress-plugin-blog/lib/client'

import type { ComputedRef, InjectionKey } from 'vue'
import type { BlogTypeData } from '@mr-huang/vuepress-plugin-blog'
import type { ArticleInfo } from '../../../../typings'

export type ArticlesRef = ComputedRef<BlogTypeData<ArticleInfo>>

export const articlesSymbol: InjectionKey<ArticlesRef> = Symbol.for('articles')

/**
 * Inject articles
 */
export const useArticles = (): ArticlesRef => {
  const articles = inject(articlesSymbol)

  if (!articles) {
    throw new Error('useArticles() is called without provider.')
  }

  return articles
}

export const setupArticles = (): void => {
  const articles = useBlogType<ArticleInfo>('article')

  provide(articlesSymbol, articles)
}
