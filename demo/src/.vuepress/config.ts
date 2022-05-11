/**
 * vitpress 配置文件
 */
import { defineUserConfig } from 'vuepress'
import themeConfig from './themeConfig';
import type { DefaultThemeOptions } from 'vuepress'
const base = '/'
const path = require('path')
const isProd = process.env.NODE_ENV === "production"

/**
 * vuepress 配置文件
 */
export default defineUserConfig<DefaultThemeOptions>({
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
  debug: true,
  theme: '@mr-huang/vuepress-theme-weasel',
  themeConfig,
  plugins: [
  ]
})
