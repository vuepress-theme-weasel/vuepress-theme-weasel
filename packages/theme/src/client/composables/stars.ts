import { inject, provide } from 'vue'
import { useBlogPageType } from '@mr-huang/vuepress-plugin-blog/lib/client'

import type { ComputedRef, InjectionKey } from 'vue'
import type { BlogPageTypeData } from '@mr-huang/vuepress-plugin-blog'
import type { ArticleInfo } from '../../typings'

export type StarsRef = ComputedRef<BlogPageTypeData<ArticleInfo>>

export const starsSymbol: InjectionKey<StarsRef> = Symbol.for('stars')

/**
 * Inject stars
 */
export const useStars = (): StarsRef => {
  const stars = inject(starsSymbol)

  if (!stars) {
    throw new Error('useStars() is called without provider.')
  }

  return stars
}

export const setupStars = (): void => {
  const stars = useBlogPageType<ArticleInfo>('star')

  provide(starsSymbol, stars)
}
