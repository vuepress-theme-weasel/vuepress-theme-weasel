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
  locales: {
    '/': {
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
