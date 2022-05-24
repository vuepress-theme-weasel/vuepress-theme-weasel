/**
 * page info hooks
 */
import { getDate } from '@mr-huang/vuepress-shared/lib/client'
import { usePageData, usePageFrontmatter, usePageLang } from '@vuepress/client';
import { GitData } from '@vuepress/plugin-git';
import { computed, ComputedRef, inject, reactive } from 'vue'
import { getAuthor, getCategory, getTag } from '../utils';
import { usePure, useThemeLocaleData } from './themeData';

import type { PageTitleProps, BasePageFrontMatter, ThemeNormalPageFrontmatter, ArticleCategory, ArticleTag, ArticleInfoComponent } from './../../typings';
import type { CategoryMapRef } from './categoryMap'
import type { AuthorInfo, DateInfo, DateOptions } from '@mr-huang/vuepress-shared'
import { usePageMeate } from './articleInfo';

declare const ENABLE_BLOG: boolean;

/**
 * 获取页面author
 */
export const usePageAuthor = (): ComputedRef<AuthorInfo[]> => {
  const themeLocale = useThemeLocaleData()
  const frontmatter = usePageFrontmatter<BasePageFrontMatter>()
  return computed(() => {
    const { author } = frontmatter.value

    if (author) return getAuthor(author!)

    return getAuthor(themeLocale.value.author, false)
  })
}

/**
 * 获取页面分类
 * @returns
 */
export const usePageCategory = (): ComputedRef<ArticleCategory[]> => {
  const frontmatter = usePageFrontmatter<BasePageFrontMatter>();

  return computed(() =>
    getCategory(frontmatter.value.category).map((name) => ({
      name,
      path: ENABLE_BLOG ? inject<CategoryMapRef>(Symbol.for("categoryMap"))?.value.map[name]?.path || "" : "",
    }))
  )
}

/**
 * 获取页面标签
 * @returns
 */
export const usePageTag = (): ComputedRef<ArticleTag[]> => {
  const frontmatter = usePageFrontmatter<BasePageFrontMatter>();

  return computed(() =>
    getTag(frontmatter.value.tag).map((name) => ({
      name,
      // this is a hack
      path: ENABLE_BLOG
        ? inject<CategoryMapRef>(Symbol.for("tagMap"))?.value.map[name]?.path ||
          ""
        : ""
    }))
  )
}

/**
 * 获取日期创建时间
 * @returns
 */
export const usePageDate = (): ComputedRef<DateInfo | null> => {
  const frontmatter = usePageFrontmatter<BasePageFrontMatter>();
  const page = usePageData<{ git?: GitData }>();
  const pageLang = usePageLang();

  return computed(() => {
    const { date } = frontmatter.value;
    const options: DateOptions = { lang: pageLang.value, type: "date" };

    if (date) return getDate(date, options);

    const { createdTime } = page.value.git || {};

    if (createdTime) return getDate(new Date(createdTime), options);

    return null;
  });
};

/**
 * 获取页面数据
 * @returns
 */
export const usePageInfo = ():{
  config: PageTitleProps;
  items: ComputedRef<ArticleInfoComponent[] | false | undefined>;
} => {
  const themeLocale = useThemeLocaleData()
  const frontmatter = usePageFrontmatter<ThemeNormalPageFrontmatter>()
  const author = usePageAuthor()
  const category = usePageCategory()
  const tag = usePageTag();
  const date = usePageDate();
  const pure = usePure();
  // const page = usePageData();
  const meta = usePageMeate()
  const cover = meta.value && meta.value.cover ? meta.value.cover as string : null

  const config = reactive<PageTitleProps>({
    config:
      frontmatter.value.pageInfo === false
        ? false
        : frontmatter.value.pageInfo || themeLocale.value.pageInfo,
    author: author.value,
    category: category.value,
    date: date.value,
    tag: tag.value,
    cover,
    isOriginal: frontmatter.value.isOriginal,
    // readingTime: page.value.readingTime,
    // pageview: "pageview" in frontmatter.value ? frontmatter.value.pageview : true,
    // color: !pure.value,
    hint: !pure.value,
  });

  const items = computed(() =>
    frontmatter.value.pageInfo === false
      ? false
      : frontmatter.value.pageInfo || themeLocale.value.pageInfo
  );

  return { config, items };
}
