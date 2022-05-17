import { defaultTheme } from "@vuepress/theme-default";
import { path } from "@vuepress/utils";
import { blogPlugin } from "@mr-huang/vuepress-plugin-blog";

import type { Theme } from "@vuepress/core";
import type { DefaultThemeOptions } from "@vuepress/theme-default";

export const blogTheme = (options: DefaultThemeOptions): Theme => ({
  name: "blog-theme",

  // we are extending @vuepress/theme-default
  extends: defaultTheme(options),

  // we provide some blog layouts
  layouts: {
    Article: path.resolve(__dirname, "./layouts/Article.vue"),
    Category: path.resolve(__dirname, "./layouts/Category.vue"),
    Tag: path.resolve(__dirname, "./layouts/Tag.vue"),
    Timeline: path.resolve(__dirname, "./layouts/Timeline.vue"),
  },

  plugins: [
    blogPlugin({
       // only files under posts are articles
      filter: ({ filePathRelative }) =>
        filePathRelative && filePathRelative.startsWith("posts/"),

      // getting article info
      getInfo: ({ frontmatter, title }) => ({
        title,
        author: frontmatter.author || "",
        date: frontmatter.date || null,
        category: frontmatter.category || [],
        tag: frontmatter.tag || [],
      }),
      frontmatterClassifier: [
        {
          key: "category",
          getter: (page) => {
            return (page.frontmatter.category as string[]) || [];
          },
          // path: '/categories/',
          // itemPath: "/category/:name/",
          layout: "Category",
          itemLayout: "Category",
        },
        {
          key: "tag",
          getter: (page) => {
            return (page.frontmatter.tag as string[]) || [];
          },
          path: '/tag/',
          layout: "Tag",
          itemPath: "/tag/:name/",
          itemLayout: "Tag",
        },
      ],
      directoryClassifier: [
        {
          key: 'post',
          dirname: '_post',
          path: '/post/',
          layout: 'Blog',
          itemLayout: 'Blog'
        },
        {
          key: 'project',
          dirname: '_project',
          path: '/project/',
          layout: 'Blog',
          itemLayout: 'Blog'
        }
      ],
      pageTypeClassifier: [
        {
          key: "article",
          filter: (page) => !page.frontmatter.archive,
          path: "/article/",
          layout: "Article",
          frontmatter: () => ({ title: "Articles", sidebar: false }),
          sorter: (pageA, pageB) => {
            if (pageA.frontmatter.sticky && pageB.frontmatter.sticky)
              return pageB.frontmatter.sticky - pageA.frontmatter.sticky;

            if (pageA.frontmatter.sticky && !pageB.frontmatter.sticky)
              return -1;

            if (!pageA.frontmatter.sticky && pageB.frontmatter.sticky) return 1;

            if (!pageB.frontmatter.date) return 1;
            if (!pageA.frontmatter.date) return -1;

            return (
              new Date(pageB.frontmatter.date).getTime() -
              new Date(pageA.frontmatter.date).getTime()
            );
          },
        },
        {
          key: "timeline",
          filter: (page) => page.frontmatter.date,
          sorter: (pageA, pageB) =>
            new Date(pageB.frontmatter.date).getTime() -
            new Date(pageA.frontmatter.date).getTime(),
          path: '/timeline/',
          layout: 'Timeline',
          frontmatter: () => ({ title: "Timeline", sidebar: false }),
        }
      ],
      hotReload: true
    }),
  ],
});
