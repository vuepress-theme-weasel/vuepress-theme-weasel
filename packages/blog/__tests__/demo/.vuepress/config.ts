import { defineUserConfig } from "@vuepress/cli";
import { blogPluginInit } from "../../../lib/node/index.js";
import { path } from '@vuepress/utils'
import type { DefaultThemeOptions } from "@vuepress/theme-default";

export default defineUserConfig<DefaultThemeOptions>({
  base: process.env.VuePress_BASE || "/",
  dest: "./dist",


  locales: {
    "/": {
      lang: "zh-CN",
      title: "Blog2",
      description: "VuePress 的博客插件",
    },
  },

  theme: path.resolve(__dirname, './theme'),

  themeConfig: {
    logo: "/logo.svg",

    locales: {
      "/": {
        navbar: [{ text: "主页", link: "/" }],
        lang: "zh-CN",
        selectText: "选择语言",
        lastUpdatedText: "上次编辑于",
        label: "简体中文",
      },
    },
  },


  plugins: [
    blogPluginInit({
      frontmatterClassifier: [
        {
          key: "category",
          getter: (page) => {
            return (page.frontmatter.category as string[]) || [];
          },
          // path: '/categories/',
          // itemPath: "/category/:name/",
          layout: "Layout",
        },
        {
          key: "tag",
          getter: (page) => {
            return (page.frontmatter.tag as string[]) || [];
          },
          path: '/tags/',
          itemPath: "/tag/:name/",
          itemLayout: "Layout",
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
          key: "slide",
          filter: (page) => page.frontmatter.layout === "Slide",
          path: "/slides/",
          layout: "Layout"
        },
        {
          key: "picture",
          filter: (page) => page.frontmatter.layout === 'Picture',
          path: '/images/',
          layout: 'Layout'
        }
      ]
    })
  ]
});
