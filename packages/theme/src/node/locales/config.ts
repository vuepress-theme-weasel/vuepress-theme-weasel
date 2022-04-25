import { WeaselLang } from './types'
import { ArticleInfoLocaleConfig, ThemeLocaleData } from '../../typings'

export const lang2PathConfig = {
  'en-US': '/en/',
  'zh-CN': '/',
  'zh-TW': '/zh-tw/',
  'de-AT': '/de/',
  'vi-VN': '/vi/',
  'ru-RU': '/ru/',
  'uk-UA': '/uk/',
  'pt-BR': '/br/'
}

export const supportedLangs = Object.keys(lang2PathConfig)

export const path2langConfig = Object.fromEntries(
  (supportedLangs as WeaselLang[]).map((lang) => [lang2PathConfig[lang], lang])
)

export const themeLocalesData: Record<string, ThemeLocaleData> = {
  "/en/": {
    lang: "en-US",

    // navbarLocales: {
    //   langName: "English",
    //   selectLangText: "Language",
    //   selectLangAriaLabel: "Select language",
    // },

    // metaLocales: {
    //   prev: "Prev",
    //   next: "Next",
    //   lastUpdated: "Last update",
    //   contributors: "Contributors",
    //   editLink: "Edit this page",
    // },

    // blogLocales: {
    //   article: "Articles",
    //   articleList: "Article List",
    //   category: "Category",
    //   tag: "Tags",
    //   timeline: "Timeline",
    //   timelineTitle: "Yesterday Once More!",
    //   all: "All",
    //   intro: "Personal Intro",
    //   star: "Star",
    //   slides: "Slides",
    //   encrypt: "Encrypted",
    // },

    // outlookLocales: {
    //   themeColor: "Theme Color",
    //   darkmode: "Theme Mode",
    //   fullscreen: "Full Screen",
    // },

    // encryptLocales: {
    //   title: "Please enter password",
    //   errorHint: "Please enter the correct password!",
    // },

    // routeLocales: {
    //   "404msg": [
    //     "There’s nothing here.",
    //     "How did we get here?",
    //     "That’s a Four-Oh-Four.",
    //     "Looks like we've got some broken links.",
    //   ],
    //   back: "Go back",
    //   home: "Take me home",
    // },
  },

  "/": {
    lang: "zh-CN",

    // navbarLocales: {
    //   langName: "简体中文",
    //   selectLangText: "选择语言",
    //   selectLangAriaLabel: "选择语言",
    // },

    // metaLocales: {
    //   prev: "上一页",
    //   next: "下一页",
    //   lastUpdated: "上次编辑于",
    //   contributors: "贡献者",
    //   editLink: "编辑此页",
    // },

    // blogLocales: {
    //   article: "文章",
    //   articleList: "文章列表",
    //   category: "分类",
    //   tag: "标签",
    //   timeline: "时间轴",
    //   timelineTitle: "昨日不在",
    //   all: "全部",
    //   intro: "个人介绍",
    //   star: "收藏",
    //   slides: "幻灯片",
    //   encrypt: "加密",
    // },

    // outlookLocales: {
    //   themeColor: "主题色",
    //   darkmode: "外观",
    //   fullscreen: "全屏",
    // },

    // encryptLocales: {
    //   title: "请输入密码",
    //   errorHint: "请输入正确密码",
    // },

    // routeLocales: {
    //   "404msg": [
    //     "这里什么也没有",
    //     "我们是怎么来到这儿的？",
    //     "这 是 四 零 四 !",
    //     "看起来你访问了一个失效的链接",
    //   ],
    //   back: "返回上一页",
    //   home: "带我回家",
    // },
  }
}

/**
 * Default locales config for Article Info
 */
export const articleInfoLocales: ArticleInfoLocaleConfig = {
  '/en/': {
    author: 'Author🖊',
    date: 'Writing Date📅',
    isOrigin: 'Original💡',
    views: 'Page views🔢',
    category: 'Category🌈',
    tag: 'Tags🏷',
    readingTime: 'Reading Time⌛',
    words: 'Words🔠',
  },

  '/zh/': {
    author: '作者🖊',
    date: '写作日期📅',
    isOrigin: '原创💡',
    views: '访问量🔢',
    category: '分类🌈',
    tag: '标签🏷',
    readingTime: '阅读时间⌛',
    words: '字数🔠',
  }
}
