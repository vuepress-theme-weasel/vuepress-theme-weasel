/**
 * vitpress 配置文件
 */
import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
import nav from './configs/nav'
import sidebar from './configs/sidebar'
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
  theme: 'weasel',
  themeConfig: {
    // 编辑连接
    editLink: true,
    nextLinks: true,
    prevLinks: true,
    navbar: nav,
    sidebar
  },
  plugins: [
  ]
})
