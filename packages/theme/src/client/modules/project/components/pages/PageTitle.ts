import { usePageData, usePageFrontmatter } from "@vuepress/client";
import { defineComponent, h, unref } from "vue";

import { useIconPrefix, useThemeLocaleData } from "@theme-weasel/composables";

import PageInfo from "@theme-weasel/modules/blog/components/article/ArticleInfo.vue";
import { usePageInfo } from "@theme-weasel/composables";

import type { VNode } from "vue";
import type { ThemeNormalPageFrontmatter } from "../../../../../typings";

import "../styles/page-title.scss";

export default defineComponent({
  name: "PageTitle",

  setup() {
    const page = usePageData();
    const frontmatter = usePageFrontmatter<ThemeNormalPageFrontmatter>();
    const themeLocale = useThemeLocaleData();
    const iconPrefix = useIconPrefix();
    const { config, items } = usePageInfo();

    return (): VNode =>
      h("div", { class: "page-title" }, [
        h("h1", [
          themeLocale.value.titleIcon !== false && frontmatter.value.icon
            ? h("i", {
                class: ["icon", `${iconPrefix.value}${frontmatter.value.icon}`],
              })
            : null,
          page.value.title,
        ]),
        h(PageInfo, { config: unref(config), items: items.value }),
        h("hr"),
      ]);
  },
});
