/**
 * vitpress 配置文件
 */
import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
// import nav from './configs/nav'
// import sidebar from './configs/sidebar'
import * as navbar from "./configs/navbar";
import * as sidebar from "./configs/sidebar";
const base = '/note/'
const path = require('path')
const isProd = process.env.NODE_ENV === "production"

/**
 * vuepress 配置文件
 */
export default defineUserConfig<DefaultThemeOptions>({
  base,
  lang: 'zh-CN',
  locales: {
    '/': {
      title: 'CavinHuangNote笔记',
      description: '愿世界和平！',
    }
  },
  public: path.resolve(__dirname, '../public'),
  debug: true,
  theme: '@mr-huang/vuepress-theme-weasel',
  themeConfig: {
    // 编辑连接
    editLink: true,
    nextLinks: true,
    prevLinks: true,
    plugins: {
      // 开启blog
      blog: true
    },
    // navbar: nav,
    // sidebar,
    locales: {
    "/": {
      // navbar
      navbar: navbar.en,

      // sidebar
      sidebar: sidebar.en,

      footer: "Default footer",

      displayFooter: true,

      blog: {
        description: "A FrontEnd programmer",
        intro: "/intro.html",
      },

      metaLocales: {
        editLink: "Edit this page on GitHub",
      },
    },

    /**
     * Chinese locale config
     */
    "/zh/": {
      // navbar
      navbar: navbar.zh,

      // sidebar
      sidebar: sidebar.zh,

      footer: "默认页脚",

      displayFooter: true,

      blog: {
        description: "一个前端开发者",
        intro: "/zh/intro.html",
      },

      // page meta
      metaLocales: {
        editLink: "在 GitHub 上编辑此页",
      },
    },
  },
  },
  plugins: [
  ]
})
