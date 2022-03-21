import {
  getAuthor,
  getCategory,
  getDate,
  getTag,
} from "@mr-huang/vuepress-shared/lib/client";
import { usePageData, usePageFrontmatter, usePageLang } from "@vuepress/client";
import { computed, inject, reactive } from "vue";
import { usePure, useThemeLocaleData } from "./themeData";

import type {
  ArticleCategory,
  ArticleTag,
  PageTitleProps,
} from "@mr-huang/vuepress-plugin-components";
import type {
  AuthorInfo,
  BasePageFrontMatter,
  DateInfo,
  DateOptions,
} from "@mr-huang/vuepress-shared";
import type { GitData } from "@vuepress/plugin-git";
import type { ComputedRef, UnwrapNestedRefs } from "vue";
// import type { ReadingTime } from "vuepress-plugin-reading-time2";
import type { CategoryMapRef } from "@theme-weasel/modules/blog/composables";
import type { WeaselThemeNormalPageFrontmatter } from "../../typings";

declare const ENABLE_BLOG: boolean;

export const usePageAuthor = (): ComputedRef<AuthorInfo[]> => {
  const themeLocale = useThemeLocaleData();
  const frontmatter = usePageFrontmatter<BasePageFrontMatter>();

  return computed(() => {
    const { author } = frontmatter.value;

    if (author) return getAuthor(author);
    if (author) return [];

    return getAuthor(themeLocale.value.author, false);
  });
};

export const usePageCategory = (): ComputedRef<ArticleCategory[]> => {
  const frontmatter = usePageFrontmatter<BasePageFrontMatter>();

  return computed(() =>
    getCategory(frontmatter.value.category).map((name) => ({
      name,
      // this is a hack
      path: ENABLE_BLOG
        ? inject<CategoryMapRef>(Symbol.for("categoryMap"))?.value.map[name]
            ?.path || ""
        : "",
    }))
  );
};

export const usePageTag = (): ComputedRef<ArticleTag[]> => {
  const frontmatter = usePageFrontmatter<BasePageFrontMatter>();

  return computed(() =>
    getTag(frontmatter.value.tag).map((name) => ({
      name,
      // this is a hack
      path: ENABLE_BLOG
        ? inject<CategoryMapRef>(Symbol.for("tagMap"))?.value.map[name]?.path ||
          ""
        : "",
    }))
  );
};

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

export const usePageInfo = (): UnwrapNestedRefs<PageTitleProps> => {
  const themeLocale = useThemeLocaleData();
  const page = usePageData();
  const frontmatter = usePageFrontmatter<WeaselThemeNormalPageFrontmatter>();
  const author = usePageAuthor();
  const category = usePageCategory();
  const tag = usePageTag();
  const date = usePageDate();
  const pure = usePure();

  return reactive<PageTitleProps>({
    config:
      frontmatter.value.pageInfo === false
        ? false
        : frontmatter.value.pageInfo || themeLocale.value.pageInfo,
    author: author.value,
    category: category.value,
    date: date.value,
    tag: tag.value,
    isOriginal: frontmatter.value.isOriginal,
    // readingTime: page.value.readingTime,
    // pageview: "pageview" in frontmatter.value ? frontmatter.value.pageview : true,
    // color: !pure.value,
    hint: !pure.value,
  });
};
