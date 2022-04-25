import {
  getAuthor,
  getCategory,
  getTag,
} from '../utils'
import { getDate } from '@mr-huang/vuepress-shared/lib/client'
import { usePageLang } from '@vuepress/client'
import { computed, reactive, Ref } from 'vue'
import { useCategoryMap } from './categoryMap'
import { useBlogOptions } from '@theme-weasel/modules/blog/composables'
import { useTagMap } from './tagMap'
import { usePure, useThemeData } from '@theme-weasel/composables'

import type { DateInfo } from '@mr-huang/vuepress-shared'
import type { ComputedRef, UnwrapNestedRefs } from 'vue'
import type { AuthorInfo, ArticleInfo, ArticleCategory, ArticleInfoProps, ArticleTag } from '../../typings'

export type AuthorRef = ComputedRef<AuthorInfo[]>

export const useArticleAuthor = (info: Ref<ArticleInfo>): AuthorRef => {
  const themeData = useThemeData()

  return computed(() => {
    const { author } = info.value

    if (author) return getAuthor(author)
    if (author === false) return []

    return getAuthor(themeData.value.author, false)
  })
}

export type CategoryRef = ComputedRef<ArticleCategory[]>

export const useArticleCategory = (info: Ref<ArticleInfo>): CategoryRef => {
  const categoryMap = useCategoryMap()

  return computed(() =>
    getCategory(info.value.category).map((name) => ({
      name,
      path: categoryMap.value.map[name].path,
    }))
  )
}

export type TagRef = ComputedRef<ArticleTag[]>

export const useArticleTag = (info: Ref<ArticleInfo>): TagRef => {
  const tagMap = useTagMap()

  return computed(() =>
    getTag(info.value.tag).map((name) => ({
      name,
      path: tagMap.value.map[name].path,
    }))
  )
}

export type DateRef = ComputedRef<DateInfo | null>

export const useArticleDate = (info: Ref<ArticleInfo>): DateRef => {
  const pageLang = usePageLang()

  return computed(() => {
    const { date } = info.value

    return date ? getDate(date, { lang: pageLang.value, type: 'date' }) : null
  })
}

export const useArticleInfo = (
  info: Ref<ArticleInfo>
): UnwrapNestedRefs<ArticleInfoProps> => {
  const blogOptions = useBlogOptions()
  const author = useArticleAuthor(info)
  const category = useArticleCategory(info)
  const tag = useArticleTag(info)
  const date = useArticleDate(info)
  const pure = usePure()

  return reactive<ArticleInfoProps>({
    config: blogOptions.value.articleInfo,
    author: author.value,
    category: category.value,
    date: date.value,
    tag: tag.value,
    isOriginal: info.value.isOriginal,
    // readingTime: info.value.readingTime,
    hint: !pure.value,
  })
}