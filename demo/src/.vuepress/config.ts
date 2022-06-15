/**
 * vitpress 配置文件
 */
import { defineUserConfig } from '@vuepress/cli'
import weaselTheme from './themeConfig';
import { docsearchPlugin } from "@vuepress/plugin-docsearch";

const base = (process.env.BASE as "/" | `/${string}/`) || "/";
const path = require('path')
// const isProd = process.env.NODE_ENV === "production"

/**
 * vuepress 配置文件
 */
export default defineUserConfig({
  base,
  lang: 'zh-CN',
  head: [
    [
      "link",
      {
        rel: "stylesheet",
        href: "//at.alicdn.com/t/font_2410206_mfj6e1vbwo.css",
      },
    ],
  ],
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'CavinHuangNote笔记',
      description: '愿世界和平！',
    }
  },
  public: path.resolve(__dirname, '../public'),
  debug: false,
  theme: weaselTheme,
  plugins: [
    docsearchPlugin({
      appId: "5P9BW2R9ZW",
      apiKey: "5f77c908d890c1ccd9f211caddb10395",
      indexName: "vuepress-theme-weasel",
      locales: {
        "/zh/": {
          placeholder: "搜索文档",
          translations: {
            button: {
              buttonText: "搜索文档",
              buttonAriaLabel: "搜索文档",
            },
            modal: {
              searchBox: {
                resetButtonTitle: "清除查询条件",
                resetButtonAriaLabel: "清除查询条件",
                cancelButtonText: "取消",
                cancelButtonAriaLabel: "取消",
              },
              startScreen: {
                recentSearchesTitle: "搜索历史",
                noRecentSearchesText: "没有搜索历史",
                saveRecentSearchButtonTitle: "保存至搜索历史",
                removeRecentSearchButtonTitle: "从搜索历史中移除",
                favoriteSearchesTitle: "收藏",
                removeFavoriteSearchButtonTitle: "从收藏中移除",
              },
              errorScreen: {
                titleText: "无法获取结果",
                helpText: "你可能需要检查你的网络连接",
              },
              footer: {
                selectText: "选择",
                navigateText: "切换",
                closeText: "关闭",
                searchByText: "搜索提供者",
              },
              noResultsScreen: {
                noResultsText: "无法找到相关结果",
                suggestedQueryText: "你可以尝试查询",
                reportMissingResultsText: "你认为该查询应该有结果？",
                reportMissingResultsLinkText: "点击反馈",
              },
            },
          },
        },
      },
    })
  ]
})
